import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const page = () => {
  return (
    <DashboardLayout title="Dashboard" type="petugas">
      <Dashboard />
    </DashboardLayout>
  );
};

export default page;
