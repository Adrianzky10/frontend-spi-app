"use client";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useDeleteInventory from "../useDeleteInventory";
import { IoArrowBack } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import useDetailInventory from "../useDetailInventory";

interface PropTypes {
  id: string;
}

const DetailInventory = ({ id }: PropTypes) => {
  const { handleDeleteInventory, isPendingDeleteInventory } =
    useDeleteInventory();
  const { inventory, isLoading } = useDetailInventory(id);
  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Detail Inventaris</h1>

          <p className="mt-1 text-sm text-slate-500">
            Informasi lengkap inventaris yang tersimpan pada sistem.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/inventory`}>
            <Button variant="primary" size="sm">
              <IoArrowBack />
              Kembali
            </Button>
          </Link>

          <Link href={`/admin/inventory/${inventory?.id}/edit`}>
            <Button variant="primary" size="sm">
              <FiEdit2 />
              Edit
            </Button>
          </Link>

          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              const confirmed = window.confirm(
                `Yakin ingin menghapus inventaris "${inventory.name}"?`,
              );

              if (!confirmed) return;

              handleDeleteInventory(inventory.id.toString());
            }}
          >
            {isPendingDeleteInventory ? <Spinner /> : <FaRegTrashAlt />}
            Hapus
          </Button>
        </div>
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-xl border bg-white">
            <Image
              src={inventory.image_url}
              alt={inventory.name}
              width={320}
              height={320}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="rounded-xl border bg-white p-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500">Nama Barang</p>

                <h2 className="text-2xl font-semibold">{inventory.name}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Kategori</p>

                  <p className="font-medium">{inventory.category_name}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Stok</p>

                  <p className="font-medium">{inventory.stock}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">ID Inventaris</p>

                  <p className="font-medium">{inventory.id}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Tanggal Dibuat</p>

                  <p className="font-medium">{inventory.created_at}</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-500">Deskripsi</p>

                <div className="rounded-lg bg-slate-50 p-4 whitespace-pre-line">
                  {inventory.description}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default DetailInventory;