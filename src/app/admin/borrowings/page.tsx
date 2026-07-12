import DashboardLayout from "@/components/layouts/DashboardLayout";
import Borrowings from "@/components/views/Admin/Borrowings";

const page = () => {
  return (
    <DashboardLayout title="Kelola Peminjaman" type="admin">
      <Borrowings />
    </DashboardLayout>
  );
};

export default page;
