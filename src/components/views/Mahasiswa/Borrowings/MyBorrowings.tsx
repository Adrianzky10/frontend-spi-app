"use client";

import { Button, Chip, Modal, Spinner, Table } from "@heroui/react";
import { FaFilePdf } from "react-icons/fa";
import useMyBorrowings from "./useMyBorrowing";
import { useState } from "react";

const MyBorrowings = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const { borrowings, isLoading } = useMyBorrowings();

  const renderStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Chip color="warning" variant="primary">
            Pending
          </Chip>
        );

      case "Approved":
        return (
          <Chip color="success" variant="primary">
            Approved
          </Chip>
        );

      case "Borrowed":
        return <Chip className="bg-slate-800 text-white">Borrowed</Chip>;

      case "Returned":
        return (
          <Chip color="accent" variant="soft">
            Returned
          </Chip>
        );

      case "Rejected":
        return (
          <Chip color="danger" variant="soft">
            Rejected
          </Chip>
        );

      default:
        return <Chip>{status}</Chip>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Peminjaman Saya</h1>

        <p className="mt-2 text-slate-500">
          Riwayat seluruh pengajuan peminjaman inventaris.
        </p>
      </div>

      <Table aria-label="Peminjaman Saya">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[1100px]">
            <Table.Header>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column>Barang</Table.Column>
              <Table.Column>Tanggal Pinjam</Table.Column>
              <Table.Column>Tanggal Kembali</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Dokumen</Table.Column>
              <Table.Column className="text-end">Aksi</Table.Column>
            </Table.Header>

            <Table.Body items={borrowings}>
              {borrowings.map((item) => (
                <Table.Row key={item.id} id={item.id.toString()}>
                  <Table.Cell>#{item.id}</Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      {/* <Avatar name={item.item_name.charAt(0)} size="sm" /> */}

                      <div>
                        <p className="font-medium">{item.item_name}</p>

                        <p className="text-sm text-slate-500">
                          {item.user_name}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{item.borrow_date}</Table.Cell>

                  <Table.Cell>{item.return_date}</Table.Cell>

                  <Table.Cell>{renderStatus(item.status)}</Table.Cell>

                  <Table.Cell>
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-2 text-red-500 hover:text-red-700"
                    >
                      <FaFilePdf />
                      PDF
                    </a>
                  </Table.Cell>

                  <Table.Cell className="text-end">
                    {item.status === "Rejected" && (
                      <Button
                        size="sm"
                        variant="primary"
                        onPress={() => setSelectedReason(item.rejection_reason)}
                      >
                        Lihat Keterangan
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {selectedReason ? (
        <Modal
          isOpen={!!selectedReason}
          onOpenChange={() => setSelectedReason(null)}
        >
          <div className="space-y-6 p-6">
            <div>
              <h2 className="text-xl font-semibold">Alasan Penolakan</h2>
              <p className="mt-1 text-sm text-slate-500">
                Keterangan yang diberikan oleh admin.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-slate-700">
              {selectedReason}
            </div>

            <div className="flex justify-end">
              <Button onPress={() => setSelectedReason(null)}>Tutup</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </main>
  );
};

export default MyBorrowings;
