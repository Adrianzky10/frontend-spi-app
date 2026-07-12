import DashboardLayout from "@/components/layouts/DashboardLayout";
import MyBorrowings from "@/components/views/Mahasiswa/Borrowings";

const page = () => {
  return (
    <DashboardLayout title="Riwayat Peminjaman" type="mahasiswa">
      <MyBorrowings />
    </DashboardLayout>
  );
};

export default page;
