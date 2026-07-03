"use client";

import { useQuery } from "@tanstack/react-query";

import dashboardServices from "@/services/dashboard.service";
import { IDashboard } from "@/Types/Dashboard";

const useDashboard = () => {
  const getDashboard = async (): Promise<IDashboard> => {
    const result = await dashboardServices.getDashboard();

    return result.data.data;
  };

  const {
    data: dashboard,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  return {
    dashboard,
    isLoading,
    isRefetching,
    refetch,
  };
};

export default useDashboard;
