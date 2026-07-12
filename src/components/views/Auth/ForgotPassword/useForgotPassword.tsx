"use client";

import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import authServices from "@/services/auth.service";
import { IForgotPassword } from "@/Types/Auth";

const forgotPasswordSchema: yup.ObjectSchema<IForgotPassword> = yup.object({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
});

const useForgotPassword = () => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordService = async (payload: IForgotPassword) => {
    const result = await authServices.forgotPassword(payload);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgotPassword,
    isSuccess,
    error,
    data,
    reset: resetForgotPassword,
  } = useMutation({
    mutationFn: forgotPasswordService,

    onSuccess() {
      reset();
    },

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

  const handleForgotPassword = (data: IForgotPassword) => {
    mutateForgotPassword(data);
  };

  return {
    control,
    handleSubmit,
    handleForgotPassword,

    errors,

    isDirty,

    isPendingForgotPassword,

    isSuccessForgotPassword: isSuccess,

    successMessageForgotPassword: data?.data?.message,

    errorForgotPassword:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,

    resetForgotPassword,
  };
};

export default useForgotPassword;
