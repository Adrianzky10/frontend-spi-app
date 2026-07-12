"use client";

import Link from "next/link";
import { Button, Chip, Spinner, Table } from "@heroui/react";
import useBorrowings from "../../Admin/Borrowings/useBorrowings";
import {
  ArrowUturnCcwDown,
  CircleCheckFill,
  Clock,
  Eye,
  Trolley,
  Xmark,
} from "@gravity-ui/icons";

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
                        <Chip color="warning">
                          <Clock width={12} />
                          <Chip.Label>Pending</Chip.Label>
                        </Chip>
                      )}

                      {borrowing.status === "Approved" && (
                        <Chip color="success">
                          <CircleCheckFill width={12} />
                          <Chip.Label>Disetujui</Chip.Label>
                        </Chip>
                      )}

                      {borrowing.status === "Rejected" && (
                        <Chip color="danger">
                          <Xmark width={12} />
                          <Chip.Label>Ditolak</Chip.Label>
                        </Chip>
                      )}

                      {borrowing.status === "Returned" && (
                        <Chip color="accent">
                          <ArrowUturnCcwDown width={12} />
                          <Chip.Label>Dikembalikan</Chip.Label>
                        </Chip>
                      )}

                      {borrowing.status === "Borrowed" && (
                        <Chip>
                          <Trolley width={12} />
                          <Chip.Label>Dipinjam</Chip.Label>
                        </Chip>
                      )}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Link href={`/petugas/verifikasi/${borrowing.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            isIconOnly
                            aria-label="Lihat Detail Peminjaman"
                          >
                            <Eye color="#0066FF" />
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
