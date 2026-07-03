"use client";

import { useQuery } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";
import { IBorrowing } from "@/Types/Borrowings";

const useBorrowings = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["borrowings"],
    queryFn: async () => {
      const result = await borrowingServices.getBorrowings();

      return result.data.data as IBorrowing[];
    },
  });

  return {
    borrowings: data ?? [],
    isLoading,
    error,
    refetch,
  };
};

export default useBorrowings;