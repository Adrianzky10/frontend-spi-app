"use client";

import { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import authServices from "@/services/auth.service";
import { IChangePassword } from "@/Types/Auth";

const changePasswordSchema: yup.ObjectSchema<IChangePassword> = yup.object({
  current_password: yup.string().required("Password lama wajib diisi"),

  new_password: yup
    .string()
    .required("Password baru wajib diisi")
    .min(8, "Password minimal 8 karakter"),

  confirm_password: yup
    .string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("new_password")], "Konfirmasi password tidak sesuai"),
});

const useChangePassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<IChangePassword>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const changePasswordService = async (payload: IChangePassword) => {
    const session = await getSession();

    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    const result = await authServices.changePassword(
      session.accessToken as string,
      payload,
    );

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateChangePassword,
    isPending: isPendingChangePassword,
    isSuccess,
    error,
    data,
    reset: resetChangePassword,
  } = useMutation({
    mutationFn: changePasswordService,

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

  const handleChangePassword = (data: IChangePassword) => {
    mutateChangePassword(data);
  };

  return {
    control,
    handleSubmit,
    handleChangePassword,

    errors,

    isDirtyChangePassword: isDirty,

    isPendingChangePassword,

    isSuccessChangePassword: isSuccess,

    successMessageChangePassword: data?.data?.message,

    errorChangePassword:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,

    resetChangePassword,
  };
};

export default useChangePassword;
