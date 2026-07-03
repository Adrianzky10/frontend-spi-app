import { ILogin } from "@/Types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import * as yup from "yup";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Masukkan email"),
  password: yup
    .string()
    .min(8, "Password harus minimal 8 karakter")
    .required("Masukkan password"),
});

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVisible, setIsvisible] = useState(false);
  const toggleVisibility = useCallback(() => setIsvisible((prev) => !prev), []);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (!result) {
      throw new Error("Terjadi kesalahan.");
    }

    if (!result.ok) {
      throw new Error(result.error || "Login gagal");
    }
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error: AxiosError<{ message: string }> | Error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      setError("root", {
        message: message ?? "Terjadi kesalahan saat login",
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
