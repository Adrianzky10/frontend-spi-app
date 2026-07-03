import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login/Login";

const page = () => {
  return (
    <AuthLayout title="SPI | Login">
      <Login />
    </AuthLayout>
  );
};

export default page;
