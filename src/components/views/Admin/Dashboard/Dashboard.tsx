"use client";

import { Card, Chip, Spinner, Table } from "@heroui/react";
import { MdOutlineInventory, MdAssignmentReturned } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { PiStudentBold } from "react-icons/pi";
import { FaHandshake, FaCheck, FaClock, FaHandHolding } from "react-icons/fa";

import useDashboard from "./useDashboard";

const Dashboard = () => {
  const { dashboard, isLoading } = useDashboard();

  const renderStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Chip color="warning" variant="primary">
            Pending
          </Chip>
        );

      case "Rejected":
        return (
          <Chip color="danger" variant="primary">
            Ditolak
          </Chip>
        );

      case "Approved":
        return (
          <Chip color="success" variant="primary">
            Disetujui
          </Chip>
        );

      case "Borrowed":
        return <Chip className="bg-slate-800 text-white">Borrowed</Chip>;

      default:
        return (
          <Chip color="accent" variant="primary">
            Dikembalikan
          </Chip>
        );
    }
  };
  if (isLoading) {
    return (
      <main className="flex h-[70vh] items-center justify-center">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Monitoring inventaris dan aktivitas peminjaman kampus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <Card.Content className="flex items-center justify-between p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <MdOutlineInventory className="text-3xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Inventaris</p>

              <h2 className="mt-2 text-center text-4xl font-bold">
                {dashboard?.total_inventory}
              </h2>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <TbCategory className="text-3xl text-violet-600" />
            </div>
            <div>
              <p className="text-center text-sm text-slate-500">Kategori</p>

              <h2 className="mt-2 text-center text-4xl font-bold">
                {dashboard?.total_categories}
              </h2>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
              <PiStudentBold className="text-3xl text-orange-600" />
            </div>
            <div>
              <p className="text-center text-sm text-slate-500">Mahasiswa</p>

              <h2 className="mt-2 text-center text-4xl font-bold">
                {dashboard?.total_students}
              </h2>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <FaHandshake className="text-3xl text-emerald-600" />
            </div>
            <div>
              <p className="text-center text-sm text-slate-500">Peminjaman</p>

              <h2 className="mt-2 text-center text-4xl font-bold">
                {dashboard?.total_borrowings}
              </h2>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        <Card>
          <Card.Content className="flex items-center justify-between p-5">
            <FaClock className="text-2xl text-amber-500" />
            <div>
              <p className="text-center text-sm text-slate-500">Pending</p>

              <h3 className="mt-2 text-center text-3xl font-bold text-amber-500">
                {dashboard?.pending}
              </h3>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-5">
            <FaCheck className="text-2xl text-emerald-500" />
            <div>
              <p className="text-center text-sm text-slate-500">Disetujui</p>

              <h3 className="mt-2 text-center text-3xl font-bold text-emerald-500">
                {dashboard?.approved}
              </h3>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-5">
            <FaHandHolding className="text-2xl text-slate-700" />
            <div>
              <p className="text-center text-sm text-slate-500">Dipinjam</p>

              <h3 className="mt-2 text-center text-3xl font-bold text-slate-700">
                {dashboard?.borrowed}
              </h3>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center justify-between p-5">
            <MdAssignmentReturned className="text-2xl text-sky-500" />
            <div>
              <p className="text-center text-sm text-slate-500">Dikembalikan</p>

              <h3 className="mt-2 text-center text-3xl font-bold text-sky-500">
                {dashboard?.returned}
              </h3>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <Card.Content className="p-6">
            <h2 className="mb-5 text-xl font-semibold">Peminjaman Terbaru</h2>

            <Table aria-label="Peminjaman Terbaru">
              <Table.ScrollContainer>
                <Table.Content aria-label="Data Peminjaman Terbaru">
                  <Table.Header>
                    <Table.Column isRowHeader>Peminjam</Table.Column>
                    <Table.Column>Barang</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Tanggal Pinjam</Table.Column>
                  </Table.Header>

                  <Table.Body items={dashboard?.latest_borrowings ?? []}>
                    {(dashboard?.latest_borrowings ?? []).map((item) => (
                      <Table.Row key={item.id} id={item.id.toString()}>
                        <Table.Cell>{item.user_name}</Table.Cell>

                        <Table.Cell>{item.item_name}</Table.Cell>

                        <Table.Cell>{renderStatus(item.status)}</Table.Cell>

                        <Table.Cell>{item.borrow_date}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <h2 className="mb-5 text-xl font-semibold">Ringkasan Hari Ini</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div>
                  <p className="font-medium">Menunggu Persetujuan</p>

                  <p className="text-sm text-slate-500">Perlu ditinjau admin</p>
                </div>

                <span className="text-2xl font-bold text-amber-500">
                  {dashboard?.pending}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div>
                  <p className="font-medium">Sedang Dipinjam</p>

                  <p className="text-sm text-slate-500">
                    Barang masih digunakan
                  </p>
                </div>

                <span className="text-2xl font-bold text-emerald-600">
                  {dashboard?.borrowed}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
                <div>
                  <p className="font-medium">Inventaris Habis</p>

                  <p className="text-sm text-slate-500">Perlu pengadaan</p>
                </div>

                <span className="text-2xl font-bold text-red-500">
                  {dashboard?.out_of_stock}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50 p-4">
                <div>
                  <p className="font-medium">Dikembalikan Hari Ini</p>

                  <p className="text-sm text-slate-500">Transaksi selesai</p>
                </div>

                <span className="text-2xl font-bold text-sky-500">
                  {dashboard?.returned_today}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
