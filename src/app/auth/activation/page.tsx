import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";

import authServices from "@/services/auth.service";

interface PageProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function ActivationPage({ searchParams }: PageProps) {
  const { code } = await searchParams;

  let status: "success" | "failed" = "failed";

  try {
    if (code) {
      const result = await authServices.activation({ code });
      console.log(result.data.status);

      if (result.data.status) {
        status = "success";
      }
    }
  } catch {}

  return (
    <AuthLayout title="Eventix | Activation Status">
      <Activation status={status} />
    </AuthLayout>
  );
}
