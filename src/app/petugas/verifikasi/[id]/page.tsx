import DashboardLayout from "@/components/layouts/DashboardLayout";
import VerifikasiDetail from "@/components/views/Petugas/verifikasi/VerifikasiDetail";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const page = async (props: PropTypes) => {
  const { id } = await props.params;

  return (
    <DashboardLayout title="Detail Verifikasi" type="petugas">
      <VerifikasiDetail id={id} />
    </DashboardLayout>
  );
};

export default page;
