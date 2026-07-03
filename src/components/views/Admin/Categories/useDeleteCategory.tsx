import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import categoryServices from "@/services/category.service";
import { useState } from "react";

const useDeleteCategory = () => {
  const [errorTable, setErrorTable] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const deleteCategoryService = async (id: string) => {
    const result = await categoryServices.deleteCategory(id);

    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal menghapus kategori");
    }

    return result;
  };

  const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory } =
    useMutation({
      mutationFn: deleteCategoryService,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      },

      onError(error: AxiosError<{ message: string }> | Error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;

        setErrorTable(message);
      },
    });

  const handleDeleteCategory = (id: string) => {
    mutateDeleteCategory(id);
  };

  return {
    handleDeleteCategory,
    isPendingDeleteCategory,
    errorTable,
  };
};

export default useDeleteCategory;
