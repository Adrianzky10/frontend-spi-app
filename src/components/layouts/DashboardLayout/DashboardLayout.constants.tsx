import { BsBookmark } from "react-icons/bs";
import { CiGrid41, CiUser } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrDocumentVerified } from "react-icons/gr";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: GoHome,
  },
  {
    key: "users",
    label: "Data Pengguna",
    href: "/admin/users",
    icon: CiUser,
  },
  {
    key: "categories",
    label: "Kategori Barang",
    href: "/admin/categories",
    icon: CiGrid41,
  },
  {
    key: "inventory",
    label: "Inventaris",
    href: "/admin/inventory",
    icon: BsBookmark,
  },
  {
    key: "borrow",
    label: "Peminjaman",
    href: "/admin/borrowings",
    icon: FiShoppingCart,
  },
];

const SIDEBAR_PETUGAS = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/petugas/dashboard",
    icon: GoHome,
  },
  {
    key: "verifikasi",
    label: "Verifikasi",
    href: "/petugas/verifikasi",
    icon: GrDocumentVerified,
  },
];

const SIDEBAR_MHS = [
  {
    key: "list-inventory",
    label: "Daftar Inventaris",
    href: "/mahasiswa/list-inventory",
    icon: BsBookmark,
  },
  {
    key: "my-borrow",
    label: "Pinjaman Saya",
    href: "/mahasiswa/my-borrow",
    icon: FiShoppingCart,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_PETUGAS, SIDEBAR_MHS };
