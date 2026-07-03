import authServices from "@/services/auth.service";
import { IRegister } from "@/Types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  full_name: yup.string().required("Masukkan nama lengkap"),
  email: yup.string().email("Email tidak valid").required("Masukkan email"),
  nim: yup
    .string()
    .required("Masukkan NIM")
    .matches(/^\d+$/, "NIM hanya boleh berisi angka")
    .length(9, "NIM harus terdiri dari 9 angka"),
  password: yup
    .string()
    .min(8, "Password harus minimal 8 karakter")
    .required("Masukkan password"),
});

const useRegister = () => {
  const router = useRouter();
  const [isVisible, setIsvisible] = useState(false);
  const toggleVisibility = useCallback(() => setIsvisible((prev) => !prev), []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Registrasi gagal");
    }
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error: AxiosError<{ message: string }> | Error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      setError("root", {
        message: message ?? "Terjadi kesalahan saat registrasi",
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
