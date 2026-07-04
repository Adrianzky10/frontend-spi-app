"use client";

import Link from "next/link";
import { Button, Chip, Spinner, Table } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import useBorrowings from "../../Admin/Borrowings/useBorrowings";

const Verifikasi = () => {
  const { borrowings, isLoading } = useBorrowings();
  return (
    <>
      <div className="mb-5 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Kelola Peminjaman</h2>

          <p className="mt-1 text-sm text-slate-500">
            Kelola peminjaman inventaris
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Table aria-label="Data Peminjaman">
          <Table.ScrollContainer>
            <Table.Content
              className="min-w-[900px]"
              aria-label="Tabel Data Peminjaman"
            >
              <Table.Header>
                <Table.Column isRowHeader>Nama Peminjam</Table.Column>

                <Table.Column>Barang</Table.Column>

                <Table.Column>Tanggal Pinjam</Table.Column>

                <Table.Column>Tanggal Kembali</Table.Column>

                <Table.Column>Status</Table.Column>

                <Table.Column className="text-start">Aksi</Table.Column>
              </Table.Header>

              <Table.Body items={borrowings}>
                {borrowings.map((borrowing) => (
                  <Table.Row
                    key={borrowing.id}
                    id={borrowing.id}
                    aria-label={borrowing.id}
                  >
                    <Table.Cell>{borrowing.user_name}</Table.Cell>

                    <Table.Cell>{borrowing.item_name}</Table.Cell>

                    <Table.Cell>{borrowing.borrow_date}</Table.Cell>

                    <Table.Cell>{borrowing.return_date}</Table.Cell>

                    <Table.Cell>
                      {borrowing.status === "Pending" && (
                        <Chip
                          variant="primary"
                          className="bg-amber-500 text-white"
                        >
                          Pending
                        </Chip>
                      )}

                      {borrowing.status === "Approved" && (
                        <Chip
                          variant="primary"
                          className="bg-emerald-500 text-white"
                        >
                          Disetujui
                        </Chip>
                      )}

                      {borrowing.status === "Rejected" && (
                        <Chip color="danger" variant="primary">
                          Ditolak
                        </Chip>
                      )}

                      {borrowing.status === "Returned" && (
                        <Chip
                          variant="primary"
                          className="bg-sky-500 text-white"
                        >
                          Dikembalikan
                        </Chip>
                      )}

                      {borrowing.status === "Borrowed" && (
                        <Chip
                          variant="primary"
                          className="bg-slate-800 text-white"
                        >
                          Dipinjam
                        </Chip>
                      )}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Link href={`/petugas/verifikasi/${borrowing.id}`}>
                          <Button
                            variant="tertiary"
                            size="sm"
                            isIconOnly
                            aria-label="Lihat Detail Peminjaman"
                          >
                            <IoEyeOutline />
                          </Button>
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </>
  );
};

export default Verifikasi;