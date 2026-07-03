import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess";

const page = () => {
  return (
    <AuthLayout title="SPI | Register">
      <RegisterSuccess />
    </AuthLayout>
  );
};

export default page;
