import DashboardLayout from "@/components/layouts/DashboardLayout";
import Verifikasi from "@/components/views/Petugas/verifikasi";


const page = () => {
  return (
    <DashboardLayout
      title="Verifikasi"
      description="Verifikasi Pengajuan Peminjaman"
      type="petugas"
    >
      <Verifikasi />
    </DashboardLayout>
  );
};

export default page;