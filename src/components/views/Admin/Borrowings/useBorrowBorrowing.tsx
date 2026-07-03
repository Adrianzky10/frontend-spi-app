"use client";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";

const useBorrowBorrowing = () => {
  const queryClient = useQueryClient();

  const borrowBorrowingService = async (id: string) => {
    const result = await borrowingServices.borrowBorrowing(id);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateBorrowBorrowing,
    isPending: isPendingBorrowBorrowing,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: borrowBorrowingService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["borrowings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["borrowing"],
      });
    },
  });

  const handleBorrowBorrowing = (id: string) => {
    mutateBorrowBorrowing(id);
  };

  return {
    handleBorrowBorrowing,
    isPendingBorrowBorrowing,
    isSuccessBorrowBorrowing: isSuccess,
    errorBorrowBorrowing:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,
    resetBorrowBorrowing: reset,
  };
};

export default useBorrowBorrowing;