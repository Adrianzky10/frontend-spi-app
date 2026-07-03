import DashboardLayout from "@/components/layouts/DashboardLayout";
import Categories from "@/components/views/Admin/Categories";

const page = () => {
  return (
    <DashboardLayout
      title="Kelola Kategori"
      description="Kelola kategori inventaris"
      type="admin"
    >
      <Categories />
    </DashboardLayout>
  );
};

export default page;
