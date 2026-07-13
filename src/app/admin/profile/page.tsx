import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/ui/Profile";

const page = () => {
  return (
    <DashboardLayout title="Profil" type="admin">
      <Profile />
    </DashboardLayout>
  );
};

export default page;
