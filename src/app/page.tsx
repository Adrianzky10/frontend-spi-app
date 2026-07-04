"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  const getDashboardUrl = () => {
    switch (session?.user.role_name) {
      case "Admin":
        return "/admin/dashboard";

      case "Mahasiswa":
        return "/mahasiswa/list-inventory";

      case "Petugas":
        return "/petugas/dashboard";

      default:
        return "/";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold text-[#0066FF]">
            SPI Campus
          </Link>

          <div className="flex items-center gap-3">
            {!session ? (
              <>
                <Link href="/auth/login">
                  <Button variant="primary">Masuk</Button>
                </Link>

                <Link href="/auth/register">
                  <Button className="bg-[#0066FF] text-white">Daftar</Button>
                </Link>
              </>
            ) : (
              <>
                <div className="hidden text-right md:block">
                  <p className="text-sm text-slate-500">Selamat Datang</p>

                  <p className="font-semibold">{session?.user.name}</p>
                </div>

                <Link href={getDashboardUrl()}>
                  <Button className="bg-[#0066FF] text-white">Dashboard</Button>
                </Link>

                <Button variant="danger" onClick={() => signOut()}>
                  Keluar
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#0066FF]">
            Sistem Peminjaman Inventaris Kampus
          </p>

          <h1 className="text-5xl leading-tight font-bold text-slate-900">
            Kelola Peminjaman Inventaris Kampus Dengan Mudah
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Ajukan peminjaman inventaris secara online, pantau status pengajuan,
            dan kelola seluruh proses peminjaman dalam satu sistem yang cepat,
            aman, dan mudah digunakan.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {!session ? (
              <>
                <Link href="/auth/register">
                  <Button size="lg" className="bg-[#0066FF] px-8 text-white">
                    Mulai Sekarang
                  </Button>
                </Link>

                <Link href="/auth/login">
                  <Button size="lg" variant="primary">
                    Masuk
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={getDashboardUrl()}>
                <Button size="lg" className="bg-[#0066FF] px-8 text-white">
                  Masuk ke Dashboard
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-[#0066FF]">100%</h3>

              <p className="mt-2 text-slate-600">
                Pengajuan dilakukan secara online.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-[#0066FF]">Real Time</h3>

              <p className="mt-2 text-slate-600">
                Status peminjaman dapat dipantau langsung.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-[#0066FF]">Aman</h3>

              <p className="mt-2 text-slate-600">
                Dokumen pengajuan tersimpan dengan baik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
