import DashboardLayout from "@/components/layouts/DashboardLayout";
import EditInventory from "@/components/views/Admin/Inventory/Edit";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const page = async (props: PropTypes) => {
  const { id } = await props.params;

  return (
    <DashboardLayout title="Edit Inventaris" type="admin">
      <EditInventory id={id} />
    </DashboardLayout>
  );
};

export default page;
