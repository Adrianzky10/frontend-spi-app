"use client";

import { HiOutlineBars3 } from "react-icons/hi2";

interface Props {
  title: string;
  description?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function DashboardLayoutNavbar({
  title,
  description,
  isOpen,
  onToggle,
}: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
      >
        <HiOutlineBars3 size={24} />
      </button>
    </header>
  );
}
