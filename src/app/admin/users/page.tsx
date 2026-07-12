import DashboardLayout from "@/components/layouts/DashboardLayout";
import Users from "@/components/views/Admin/users";

const page = () => {
  return (
    <DashboardLayout title="Daftar Pengguna" type="admin">
      <Users />
    </DashboardLayout>
  );
};

export default page;
