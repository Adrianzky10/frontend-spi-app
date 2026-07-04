"use client";

import { useQuery } from "@tanstack/react-query";

import borrowingServices from "@/services/borrowing.service";
import { IMyBorrowing } from "@/Types/Borrowings";

const useMyBorrowings = () => {
  const getMyBorrowings = async (): Promise<IMyBorrowing[]> => {
    const result = await borrowingServices.getMyBorrowings();

    return result.data.data;
  };

  const {
    data: borrowings = [],
    isPending: isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["My Borrowings"],
    queryFn: getMyBorrowings,
  });

  return {
    borrowings,
    isLoading,
    isFetching,
    refetch,
  };
};

export default useMyBorrowings;
