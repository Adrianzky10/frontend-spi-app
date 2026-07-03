"use client";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";

const useReturnBorrowing = () => {
  const queryClient = useQueryClient();

  const returnBorrowingService = async (id: string) => {
    const result = await borrowingServices.returnBorrowing(id);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateReturnBorrowing,
    isPending: isPendingReturnBorrowing,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: returnBorrowingService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["borrowings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["borrowing"],
      });
    },
  });

  const handleReturnBorrowing = (id: string) => {
    mutateReturnBorrowing(id);
  };

  return {
    handleReturnBorrowing,
    isPendingReturnBorrowing,
    isSuccessReturnBorrowing: isSuccess,
    errorReturnBorrowing:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,
    resetReturnBorrowing: reset,
  };
};

export default useReturnBorrowing;