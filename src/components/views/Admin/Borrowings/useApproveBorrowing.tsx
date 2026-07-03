"use client";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";

const useApproveBorrowing = () => {
  const queryClient = useQueryClient();

  const approveBorrowingService = async (id: string) => {
    const result = await borrowingServices.approveBorrowing(id);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateApproveBorrowing,
    isPending: isPendingApproveBorrowing,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: approveBorrowingService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["borrowings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["borrowing"],
      });
    },
  });

  const handleApproveBorrowing = (id: string) => {
    mutateApproveBorrowing(id);
  };

  return {
    handleApproveBorrowing,
    isPendingApproveBorrowing,
    isSuccessApproveBorrowing: isSuccess,
    errorApproveBorrowing:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,
    resetApproveBorrowing: reset,
  };
};

export default useApproveBorrowing;