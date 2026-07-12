import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailInventory from "@/components/views/Admin/Inventory/Detail";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const page = async (props: PropTypes) => {
  const { id } = await props.params;

  return (
    <DashboardLayout title="Detail Inventaris" type="admin">
      <DetailInventory id={id} />
    </DashboardLayout>
  );
};

export default page;
