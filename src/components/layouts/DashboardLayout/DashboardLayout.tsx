"use client";

import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_MHS,
  SIDEBAR_PETUGAS,
} from "./DashboardLayout.constants";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { ArrowLeftFromLine, Person } from "@gravity-ui/icons";

interface Props {
  children: React.ReactNode;
  title?: string;
  type: "admin" | "petugas" | "mahasiswa";
}

export default function DashboardLayout({ children, title, type }: Props) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const profilePath =
    type === "admin"
      ? "/admin/profile"
      : type === "petugas"
        ? "/petugas/profile"
        : "/mahasiswa/profile";

  const handleMenuToggle = () => setOpen((prev) => !prev);

  const sidebarItems =
    type === "admin"
      ? SIDEBAR_ADMIN
      : type === "petugas"
        ? SIDEBAR_PETUGAS
        : SIDEBAR_MHS;

  return (
    <main className="flex h-screen bg-slate-100">
      <DashboardLayoutSidebar sidebarItems={sidebarItems} isOpen={open} />

      <section className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-slate-100"
              >
                <FaUserCircle className="text-3xl text-[#0066FF]" />

                <div className="text-left">
                  <p className="text-sm font-semibold">{session?.user.name}</p>

                  <p className="text-xs text-slate-500">
                    {session?.user.email}
                  </p>
                </div>
              </button>

              {showMenu && (
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  <Link
                    href={profilePath}
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <Person className="text-lg" />
                    Profil Saya
                  </Link>

                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <ArrowLeftFromLine className="text-lg" />
                    Keluar
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={handleMenuToggle}
            >
              <HiOutlineBars3 size={24} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-full">
            <div className="rounded-2xl p-6">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
