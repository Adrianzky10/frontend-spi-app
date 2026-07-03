import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userServices from "@/services/user.service";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserService = async (id: string) => {
    const result = await userServices.deleteUser(id);

    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal menghapus pengguna");
    }

    return result;
  };

  const { mutate: mutateDeleteUser, isPending: isPendingDeleteUser } =
    useMutation({
      mutationFn: deleteUserService,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },

      onError(error: AxiosError<{ message: string }> | Error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;

        alert(message);
      },
    });

  const handleDeleteUser = (id: string) => {
    mutateDeleteUser(id);
  };

  return {
    handleDeleteUser,
    isPendingDeleteUser,
  };
};

export default useDeleteUser;
