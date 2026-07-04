import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListInventory from "@/components/views/Mahasiswa/ListInventory";

const page = () => {
  return (
    <DashboardLayout
      title="Ketersediaan Inventaris"
      description="Ketersediaan inventaris"
      type="mahasiswa"
    >
      <ListInventory />
    </DashboardLayout>
  );
};

export default page;
