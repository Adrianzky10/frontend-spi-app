"use client";

import { Button, Chip, Modal, Spinner, Table } from "@heroui/react";
import { FaFilePdf } from "react-icons/fa";
import useMyBorrowings from "./useMyBorrowing";
import {
  ArrowUturnCcwDown,
  CircleCheckFill,
  Clock,
  TriangleExclamationFill,
  Trolley,
  Xmark,
} from "@gravity-ui/icons";

const MyBorrowings = () => {
  const { borrowings, isLoading } = useMyBorrowings();

  const renderStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Chip color="warning">
            <Clock width={12} />
            <Chip.Label>Pending</Chip.Label>
          </Chip>
        );

      case "Rejected":
        return (
          <Chip color="danger">
            <Xmark width={12} />
            <Chip.Label>Ditolak</Chip.Label>
          </Chip>
        );

      case "Approved":
        return (
          <Chip color="success">
            <CircleCheckFill width={12} />
            <Chip.Label>Disetujui</Chip.Label>
          </Chip>
        );

      case "Borrowed":
        return (
          <Chip>
            <Trolley width={12} />
            <Chip.Label>Dipinjam</Chip.Label>
          </Chip>
        );

      default:
        return (
          <Chip color="accent">
            <ArrowUturnCcwDown width={12} />
            <Chip.Label>Dikembalikan</Chip.Label>
          </Chip>
        );
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

      {borrowings.length ? (
        <Table aria-label="Peminjaman Saya">
          <Table.ScrollContainer>
            <Table.Content
              className="min-w-[1100px]"
              aria-label="Peminjaman Saya"
            >
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
                        <Modal>
                          <Button variant="secondary" size="sm">
                            Lihat Keterangan
                          </Button>

                          <Modal.Backdrop variant="blur">
                            <Modal.Container>
                              <Modal.Dialog className="sm:max-w-[420px]">
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                  <Modal.Icon className="bg-red-100">
                                    <TriangleExclamationFill className="size-5 text-red-500" />
                                  </Modal.Icon>

                                  <Modal.Heading>
                                    Alasan Penolakan
                                  </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body>
                                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                    <p className="leading-7 text-slate-700">
                                      {item.rejection_reason}
                                    </p>
                                  </div>
                                </Modal.Body>

                                <Modal.Footer>
                                  <Button className="w-full" slot="close">
                                    Tutup
                                  </Button>
                                </Modal.Footer>
                              </Modal.Dialog>
                            </Modal.Container>
                          </Modal.Backdrop>
                        </Modal>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center">
          <p>Belum ada riwayat peminjaman.</p>
        </div>
      )}
    </main>
  );
};

export default MyBorrowings;
