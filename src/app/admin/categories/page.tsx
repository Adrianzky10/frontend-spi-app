import DashboardLayout from "@/components/layouts/DashboardLayout";
import Categories from "@/components/views/Admin/Categories";

const page = () => {
  return (
    <DashboardLayout title="Kelola Kategori" type="admin">
      <Categories />
    </DashboardLayout>
  );
};

export default page;
