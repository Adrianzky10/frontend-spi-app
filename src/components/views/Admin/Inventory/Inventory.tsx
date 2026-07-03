"use client";

import {
  Button,
  Chip,
  Description,
  Input,
  ListBox,
  Select,
  Spinner,
  Table,
  TextArea,
} from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";

import Image from "next/image";
import { Controller } from "react-hook-form";

import { LuCircleAlert } from "react-icons/lu";

import { IoEyeOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import { MdOutlineInventory } from "react-icons/md";
import useInventory from "./useInventory";
import useCreateInventory from "./useCreateInventory";
import useDeleteInventory from "./useDeleteInventory";

interface Inventory {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  stock: number;
}
const Inventory = () => {
  const { inventories, isLoading } = useInventory();
  const { categories } = useCategory();
  const {
    control,
    handleSubmit,
    handleCreateInventory,
    isPendingCreateInventory,
    errors,
  } = useCreateInventory();
  const { handleDeleteInventory, isPendingDeleteInventory } =
    useDeleteInventory();
  return (
    <main className="flex flex-col gap-10">
      <section>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tambah Inventaris</h2>

            <p className="mt-1 text-sm text-slate-500">
              Tambah inventaris baru ke dalam sistem.
            </p>
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="bg-danger/10 text-danger mt-3 mb-3 rounded-lg p-3 text-xs">
            <div className="mb-2 flex items-center gap-2">
              <LuCircleAlert className="text-lg" />
              <span>Periksa kembali data yang Anda masukkan.</span>
            </div>

            <ul className="list-disc space-y-1 pl-6">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error?.message}</li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleCreateInventory)}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  aria-label="Nama Inventaris"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Masukkan nama inventaris"
                  className="w-full"
                />
              )}
            />

            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select
                  fullWidth
                  placeholder="Pilih Kategori"
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="Kategori"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {categories.map((category) => (
                        <ListBox.Item
                          key={category.id}
                          id={category.id}
                          textValue={category.name}
                        >
                          {category.name}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                value={field.value ?? ""}
                placeholder="Masukkan deskripsi inventaris"
                rows={4}
                aria-label="Deskripsi Inventaris"
              />
            )}
          />

          <div className="flex gap-4">
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Input
                  aria-label="Jumlah Stok"
                  type="number"
                  placeholder="Masukkan jumlah stok"
                  className="w-full"
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Description>Gambar (JPG/PNG)</Description>

                  <Input
                    aria-label="Gambar Inventaris"
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </div>
              )}
            />
          </div>

          <Button type="submit" isDisabled={isPendingCreateInventory}>
            {isPendingCreateInventory ? (
              <>
                <Spinner color="danger" /> Tambah Inventaris
              </>
            ) : (
              <>
                <MdOutlineInventory /> Tambah Inventaris
              </>
            )}
          </Button>
        </form>
      </section>
      <section>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Data Inventaris</h2>

            <p className="mt-1 text-sm text-slate-500">
              Kelola seluruh inventaris yang tersedia pada sistem.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Data Inventaris"
                className="min-w-[800px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader>Gambar</Table.Column>

                  <Table.Column>Nama Barang</Table.Column>

                  <Table.Column>Kategori</Table.Column>

                  <Table.Column>Stok</Table.Column>

                  <Table.Column className="text-start">Aksi</Table.Column>
                </Table.Header>

                <Table.Body items={inventories}>
                  {inventories.map((inventory) => (
                    <Table.Row key={inventory.id} id={inventory.id}>
                      <Table.Cell>
                        <Image
                          src={inventory.image_url}
                          alt={inventory.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </Table.Cell>

                      <Table.Cell>{inventory.name}</Table.Cell>

                      <Table.Cell>{inventory.category_name}</Table.Cell>

                      <Table.Cell>
                        {inventory.stock === 0 ? (
                          <Chip size="md" color="danger" variant="primary">
                            Habis
                          </Chip>
                        ) : (
                          <Chip
                            size="md"
                            variant="primary"
                            className="bg-emerald-500 text-white"
                          >
                            {inventory.stock}{" "}
                            <span className="text-sm opacity-80">tersedia</span>
                          </Chip>
                        )}
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/inventory/${inventory.id}`}>
                            <Button variant="tertiary" size="sm" isIconOnly>
                              <IoEyeOutline />
                            </Button>
                          </Link>

                          <Link href={`/admin/inventory/${inventory.id}/edit`}>
                            <Button variant="tertiary" size="sm" isIconOnly>
                              <FiEdit2 />
                            </Button>
                          </Link>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="danger-soft"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Yakin ingin menghapus inventaris "${inventory.name}"?`,
                              );

                              if (!confirmed) return;

                              handleDeleteInventory(inventory.id.toString());
                            }}
                          >
                            {isPendingDeleteInventory ? (
                              <Spinner size="sm" color="warning" />
                            ) : (
                              <FaRegTrashAlt />
                            )}
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </section>
    </main>
  );
};

export default Inventory;