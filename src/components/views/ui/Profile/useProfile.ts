"use client";

import { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import authServices from "@/services/auth.service";
import { IProfile, IUpdateProfile } from "@/Types/Auth";

const updateProfileSchema: yup.ObjectSchema<IUpdateProfile> = yup.object({
  full_name: yup.string().required("Nama lengkap wajib diisi"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
});

const useProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<IUpdateProfile>({
    resolver: yupResolver(updateProfileSchema),
    mode: "onChange",
  });

  const profileQuery = useQuery({
    queryKey: ["profile"],

    queryFn: async () => {
      const session = await getSession();

      if (!session?.accessToken) {
        throw new Error("Unauthorized");
      }

      const result = await authServices.getProfileWithToken(
        session.accessToken as string,
      );

      reset({
        full_name: result.data.data.full_name,
        email: result.data.data.email,
      });

      return result.data.data as IProfile;
    },
  });

  const updateProfileService = async (payload: IUpdateProfile) => {
    const session = await getSession();

    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    const result = await authServices.updateProfile(
      session.accessToken as string,
      payload,
    );

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateUpdateProfile,
    data,
    isPending: isPendingUpdateProfile,
    isSuccess,
    error,
    reset: resetUpdateProfile,
  } = useMutation({
    mutationFn: updateProfileService,

    onSuccess() {
      profileQuery.refetch();
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

  const handleUpdateProfile = (data: IUpdateProfile) => {
    mutateUpdateProfile(data);
  };

  return {
    control,
    handleSubmit,
    handleUpdateProfile,
    isDirty,

    errors,

    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isPending,

    isPendingUpdateProfile,

    isSuccessUpdateProfile: isSuccess,
    successMessageUpdateProfile: data?.data.message,

    errorUpdateProfile:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,

    resetUpdateProfile,
  };
};

export default useProfile;
