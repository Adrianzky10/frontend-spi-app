"use client";

import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";

import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_MHS,
  SIDEBAR_PETUGAS,
} from "./DashboardLayout.constants";

interface Props {
  children: React.ReactNode;
  title?: string;
  description: string;
  type: "admin" | "petugas" | "mahasiswa";
}

export default function DashboardLayout({
  children,
  title,
  description,
  type,
}: Props) {
  const [open, setOpen] = useState(false);

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

            <p className="hidden text-sm text-slate-500 md:block">
              {description}
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
            aria-label={open ? "Close Menu" : "Open Menu"}
            onClick={handleMenuToggle}
          >
            <HiOutlineBars3 size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-full">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
