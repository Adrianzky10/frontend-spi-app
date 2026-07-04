"use client";

import Image from "next/image";
import {
  Button,
  Chip,
  FieldError,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import useDetailInventory from "@/components/views/Admin/Inventory/useDetailInventory";
import { FaArrowLeft, FaFileSignature } from "react-icons/fa";
import Link from "next/link";
import useCreateBorrowing from "../useCreateBorrowing";
import { Controller } from "react-hook-form";
import ActionAlert from "@/components/views/ui/ActionAlert";

interface PropTypes {
  id: string;
}

const DetailInventory = ({ id }: PropTypes) => {
  const { inventory, isLoading } = useDetailInventory(id);
  const {
    control,
    handleSubmit,
    handleCreateBorrowing,
    isPendingCreateBorrowing,
    isSuccessCreateBorrowing,
    errorCreateBorrowing,
  } = useCreateBorrowing();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!inventory) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-500">
        Inventaris tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <Link
        href={"/mahasiswa/list-inventory"}
        className="flex items-center gap-2 text-lg text-blue-500 hover:text-blue-700"
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="relative h-[500px]">
            <Image
              src={inventory.image_url}
              alt={inventory.name}
              fill
              priority
              sizes="(max-width:1024px)100vw,50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border bg-white p-8">
          <Chip size="sm" variant="soft" color="accent">
            {inventory.category_name}
          </Chip>

          <h1 className="text-3xl font-bold">{inventory.name}</h1>

          <div>
            <p className="text-sm text-slate-500">Ketersediaan</p>

            {inventory.stock > 0 ? (
              inventory.stock <= 5 ? (
                <Chip className="bg-yellow-500 text-white" variant="primary">
                  {inventory.stock} terbatas
                </Chip>
              ) : (
                <Chip className="bg-emerald-500 text-white" variant="primary">
                  {inventory.stock} tersedia
                </Chip>
              )
            ) : (
              <Chip color="danger" variant="primary">
                Habis
              </Chip>
            )}
          </div>

          <div>
            <p className="text-sm text-slate-500">Deskripsi</p>

            <p className="mt-2 leading-7 text-slate-700">
              {inventory.description}
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
            <FaFileSignature className="text-2xl text-[#0066FF]" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Form Pengajuan Peminjaman</h2>

            <p className="mt-1 text-slate-500">
              Lengkapi data berikut untuk mengajukan peminjaman inventaris.
            </p>
          </div>
        </div>

        <ActionAlert
          success={isSuccessCreateBorrowing}
          error={errorCreateBorrowing}
          successMessage="Pengajuan peminjaman berhasil dikirim."
        />

        <form
          className="space-y-8"
          onSubmit={handleSubmit((data) =>
            handleCreateBorrowing({
              ...data,
              item_id: inventory.id.toString(),
            }),
          )}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Controller
                name="borrow_date"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    isRequired
                    isInvalid={fieldState.invalid}
                    validationBehavior="aria"
                    name={field.name}
                  >
                    <Label>Tanggal Pinjam</Label>

                    <Input {...field} type="date" value={field.value ?? ""} />

                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="return_date"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    isRequired
                    isInvalid={fieldState.invalid}
                    validationBehavior="aria"
                    name={field.name}
                  >
                    <Label>Tanggal Kembali</Label>

                    <Input {...field} type="date" value={field.value ?? ""} />

                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                )}
              />
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <Controller
              name="document"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  isRequired
                  isInvalid={fieldState.invalid}
                  validationBehavior="aria"
                  name={field.name}
                >
                  <Label>Surat Pengajuan</Label>

                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />

                  <FieldError>{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />

            <p className="mt-3 text-sm text-slate-500">
              Upload surat pengajuan dalam format PDF dengan ukuran maksimal 5
              MB.
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-[#0066FF]">
              Ketentuan Peminjaman
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>
                Pastikan data pada surat sesuai dengan barang yang dipinjam.
              </li>
              <li>Pengajuan akan ditinjau oleh admin atau petugas</li>
              <li>Barang hanya dapat diambil setelah status disetujui.</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="bg-[#0066FF] px-10 text-white"
              isDisabled={inventory.stock === 0 || isPendingCreateBorrowing}
            >
              {isPendingCreateBorrowing ? (
                <>
                  <Spinner size="sm" />
                  Mengajukan...
                </>
              ) : (
                "Ajukan Peminjaman"
              )}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default DetailInventory;
