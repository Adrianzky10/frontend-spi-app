"use client";

import {
  Button,
  Description,
  Input,
  ListBox,
  Select,
  Spinner,
  TextArea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { LuCircleAlert } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import Image from "next/image";

import useDetailInventory from "../useDetailInventory";
import useUpdateInventory from "../useUpdateInventory";
import useCategory from "../../Categories/useCategory";
import { IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";

interface PropTypes {
  id: string;
}

const EditInventory = ({ id }: PropTypes) => {
  const { categories } = useCategory();
  const { inventory, isLoading } = useDetailInventory(id);

  const {
    control,
    handleSubmit,
    handleUpdateInventory,
    isPendingUpdateInventory,
    isSuccessUpdateInventory,
    errors,
  } = useUpdateInventory(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Edit Inventaris</h1>

            <p className="mt-1 text-sm text-slate-500">
              Ubah informasi inventaris yang tersedia pada sistem.
            </p>
          </div>

          <Link href={`/admin/inventory`}>
            <Button variant="primary" size="sm">
              <IoArrowBack />
              Kembali
            </Button>
          </Link>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="bg-danger/10 text-danger mb-4 rounded-lg p-3 text-xs">
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
        {isSuccessUpdateInventory && (
          <div className="bg-success/10 text-success mb-4 rounded-lg p-3 text-xs">
            <div className="mb-2 flex items-center gap-2">
              <IoCheckmarkCircle className="text-lg" />
              <span>Inventaris berhasil diperbarui!</span>
            </div>
          </div>
        )}

        {inventory?.image_url && (
          <div className="mb-5">
            <p className="mb-2 text-sm font-medium">Gambar Saat Ini</p>

            <Image
              src={inventory.image_url}
              alt={inventory.name}
              width={180}
              height={180}
              className="rounded-lg border object-cover"
              priority
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleUpdateInventory)}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Masukkan nama inventaris"
                  aria-label="Nama Inventaris"
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
                  value={field.value || ""}
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
                rows={4}
                placeholder="Masukkan deskripsi inventaris"
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
                  type="number"
                  aria-label="Jumlah Stok"
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
                  <Description>Upload gambar baru (opsional)</Description>

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
          <Button type="submit" isDisabled={isPendingUpdateInventory}>
            {isPendingUpdateInventory ? (
              <>
                <Spinner color="danger" />
                Menyimpan...
              </>
            ) : (
              <>
                <MdOutlineInventory />
                Simpan Perubahan
              </>
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default EditInventory;