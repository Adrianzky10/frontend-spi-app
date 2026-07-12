"use client";

import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import authServices from "@/services/auth.service";
import { IResetPassword } from "@/Types/Auth";

const resetPasswordSchema: yup.ObjectSchema<IResetPassword> = yup.object({
  token: yup.string().required(),

  password: yup
    .string()
    .required("Password baru wajib diisi")
    .min(8, "Password minimal 8 karakter"),

  confirm_password: yup
    .string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("password")], "Konfirmasi password tidak sesuai"),
});

const useResetPassword = () => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IResetPassword>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirm_password: "",
    },
  });

  const resetPasswordService = async (payload: IResetPassword) => {
    const result = await authServices.resetPassword(payload);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: resetPasswordService,

    onError(error: AxiosError<{ message: string }> | Error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;

      setError("root", {
        message: message ?? "Terjadi kesalahan",
      });
    },
  });

  const handleResetPassword = (data: IResetPassword) => {
    mutateResetPassword(data);
  };

  return {
    control,
    handleSubmit,
    handleResetPassword,
    setValue,

    errors,
    isDirty,

    isPendingResetPassword,

    isSuccessResetPassword: isSuccess,

    successMessageResetPassword: data?.data?.message,

    errorResetPassword:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,

    resetResetPassword: reset,
  };
};

export default useResetPassword;
