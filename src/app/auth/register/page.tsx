import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const page = () => {
  return (
    <AuthLayout title="SPI | Register">
      <Register />
    </AuthLayout>
  );
};

export default page;
