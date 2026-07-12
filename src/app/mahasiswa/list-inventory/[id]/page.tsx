import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailInventory from "@/components/views/Mahasiswa/ListInventory/DetailInventory";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const page = async (props: PropTypes) => {
  const { id } = await props.params;

  return (
    <DashboardLayout title="Detail Inventaris" type="mahasiswa">
      <DetailInventory id={id} />
    </DashboardLayout>
  );
};

export default page;
