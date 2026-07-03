import DashboardLayout from "@/components/layouts/DashboardLayout";
import Inventory from "@/components/views/Admin/Inventory";

const page = () => {
  return (
    <DashboardLayout
      title="Kelola Inventaris"
      description="Kelola inventaris"
      type="admin"
    >
      <Inventory />
    </DashboardLayout>
  );
};

export default page;