"use client";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";

const useRejectBorrowing = () => {
  const queryClient = useQueryClient();

  const rejectBorrowingService = async ({
    id,
    rejection_reason,
  }: {
    id: string;
    rejection_reason: string;
  }) => {
    const result = await borrowingServices.rejectBorrowing(id, {
      rejection_reason,
    });

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateRejectBorrowing,
    isPending: isPendingRejectBorrowing,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: rejectBorrowingService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["borrowings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["borrowing"],
      });
    },
  });

  const handleRejectBorrowing = (id: string, rejection_reason: string) => {
    mutateRejectBorrowing({
      id,
      rejection_reason,
    });
  };

  return {
    handleRejectBorrowing,
    isPendingRejectBorrowing,
    isSuccessRejectBorrowing: isSuccess,
    errorRejectBorrowing:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,
    resetRejectBorrowing: reset,
  };
};

export default useRejectBorrowing;