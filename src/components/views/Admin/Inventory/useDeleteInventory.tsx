"use client";
import inventoryServices from "@/services/inventory.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteInventoryService = async (id: string) => {
    const result = await inventoryServices.deleteInventory(id);
    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal menghapus inventaris");
    }

    return result;
  };

  const { mutate: mutateDeleteInventory, isPending: isPendingDeleteInventory } =
    useMutation({
      mutationFn: deleteInventoryService,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["inventories"],
        });
        router.push("/admin/inventory");
      },

      onError: (error: AxiosError<{ message: string }> | Error) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        alert(message);
      },
    });

  const handleDeleteInventory = (id: string) => {
    mutateDeleteInventory(id);
  };

  return {
    handleDeleteInventory,
    isPendingDeleteInventory,
  };
};

export default useDeleteInventory;