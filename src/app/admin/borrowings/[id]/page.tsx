import DashboardLayout from "@/components/layouts/DashboardLayout";
import BorrowingDetail from "@/components/views/Admin/Borrowings/BorrowingDetail";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const page = async (props: PropTypes) => {
  const { id } = await props.params;
  return (
    <DashboardLayout title="Detail Peminjaman" type="admin">
      <BorrowingDetail id={id} />
    </DashboardLayout>
  );
};

export default page;
