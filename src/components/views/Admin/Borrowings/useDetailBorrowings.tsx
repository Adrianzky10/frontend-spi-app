"use client";

import { useQuery } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";
import { IDetailBorrowing } from "@/Types/Inventory";

const useDetailBorrowing = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["borrowing", id],
    queryFn: async () => {
      const result = await borrowingServices.getBorrowingById(id);

      return result.data.data as IDetailBorrowing;
    },
    enabled: !!id,
  });

  return {
    borrowing: data,
    isLoading,
    error,
    refetch,
  };
};

export default useDetailBorrowing;