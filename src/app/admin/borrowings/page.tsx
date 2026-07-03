import DashboardLayout from "@/components/layouts/DashboardLayout";
import Borrowings from "@/components/views/Admin/Borrowings";


const page = () => {
  return (
    <DashboardLayout
      title="Kelola Peminjaman"
      description="Kelola peminjaman inventaris"
      type="admin"
    >
      <Borrowings />
    </DashboardLayout>
  );
};

export default page;