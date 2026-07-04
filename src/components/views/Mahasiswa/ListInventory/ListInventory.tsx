"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Card, Chip, Spinner } from "@heroui/react";

import { IInventory } from "@/Types/Inventory";
import useInventory from "../../Admin/Inventory/useInventory";

const ListInventory = () => {
  const { inventories, isLoading } = useInventory();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Daftar Inventaris</h1>

        <p className="mt-2 text-slate-500">
          Pilih barang inventaris yang ingin dipinjam.
        </p>
      </div>

      {inventories?.length === 0 ? (
        <Card>
          <Card.Content className="py-20 text-center">
            <h2 className="text-lg font-semibold">Belum ada inventaris.</h2>

            <p className="mt-2 text-slate-500">
              Inventaris akan muncul di halaman ini.
            </p>
          </Card.Content>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inventories?.map((inventory: IInventory) => (
            <Card
              key={inventory.id}
              className="overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 w-full bg-slate-100">
                <Image
                  src={inventory.image_url}
                  alt={inventory.name}
                  fill
                  sizes="(max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    (max-width: 1280px) 33vw,
                    25vw"
                  loading="eager"
                  className="object-cover"
                />
              </div>

              <Card.Content className="space-y-4 p-5">
                <div>
                  <Chip size="sm" variant="soft" color="accent">
                    {inventory.category_name}
                  </Chip>

                  <h2 className="mt-3 line-clamp-2 text-lg font-semibold">
                    {inventory.name}
                  </h2>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Ketersediaan</span>

                  {inventory.stock > 0 ? (
                    inventory.stock <= 5 ? (
                      <Chip
                        className="bg-yellow-500 text-white"
                        variant="primary"
                      >
                        {inventory.stock} terbatas
                      </Chip>
                    ) : (
                      <Chip
                        className="bg-emerald-500 text-white"
                        variant="primary"
                      >
                        {inventory.stock} tersedia
                      </Chip>
                    )
                  ) : (
                    <Chip color="danger" variant="primary">
                      Habis
                    </Chip>
                  )}
                </div>

                <Link
                  href={`/mahasiswa/list-inventory/${inventory.id}`}
                  className="block"
                >
                  <Button className="w-full bg-[#0066FF] text-white">
                    Lihat Detail
                  </Button>
                </Link>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default ListInventory;
