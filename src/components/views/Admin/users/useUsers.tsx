import userServices from "@/services/user.service";
import { IUser } from "@/Types/User";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUsers = () => {
  const getUsersService = async (): Promise<IUser[]> => {
    const result = await userServices.getUsers();

    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal mengambil data pengguna");
    }

    return result.data.data;
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersService,
  });

  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message
      : error instanceof Error
        ? error.message
        : undefined;

  return {
    users,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
};

export default useUsers;
