"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button, ListBox, Label, Avatar } from "@heroui/react";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface Props {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const getInitials = (name?: string | null | undefined) => {
  if (!name) return "U";

  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

export default function DashboardLayoutSidebar({
  sidebarItems,
  isOpen,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen w-72 -translate-x-full flex-col justify-between border-r bg-white px-4 py-5 shadow-xl transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      <div>
        <Link href="/" className="mb-8 block border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold tracking-wide text-[#0066FF]">
            SPI APP
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Sistem Peminjaman Inventaris Kampus
          </p>
        </Link>

        <ListBox
          aria-label="Sidebar Menu"
          selectionMode="none"
          onAction={(key) => {
            const menu = sidebarItems.find((item) => item.key === key);

            if (menu) {
              router.push(menu.href);
            }
          }}
        >
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <ListBox.Item
                aria-label={item.label}
                key={item.key}
                id={item.key}
                textValue={item.label}
                className={cn(
                  "mb-4 h-12 rounded-xl px-3 text-base font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#0066FF] text-white shadow-[inset_0_5px_12px_rgba(0,54,180,0.7),inset_0_-2px_5px_rgba(120,190,255,0.5),0_0_15px_rgba(0,102,255,0.45)]"
                    : "bg-white text-slate-700 shadow-[0_3px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_5px_12px_rgba(0,0,0,0.12)] active:translate-y-[2px] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)]",
                )}
              >
                <Icon size={22} />
                <Label className={isActive ? "text-white" : ""}>
                  {item.label}
                </Label>
              </ListBox.Item>
            );
          })}
        </ListBox>
      </div>

      <div className="border-t pt-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <Avatar size="lg">
            <Avatar.Image
              alt={session?.user?.name ?? "User"}
              src={session?.user?.image ?? ""}
            />

            <Avatar.Fallback>
              {getInitials(session?.user?.name)}
            </Avatar.Fallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {session?.user?.name}
            </p>

            <p className="truncate text-xs text-slate-500">
              {session?.user?.email}
            </p>

            <p className="mt-1 text-xs font-medium text-[#0066FF]">
              {session?.user?.role_name}
            </p>
          </div>
        </div>

        <Button
          className="w-full justify-center"
          variant="danger"
          onPress={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
