import { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import categoryServices from "@/services/category.service";
import { ICreateCategory } from "@/Types/Category";

const categorySchema = yup.object().shape({
  name: yup.string().required("Masukkan nama kategori"),
});

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ICreateCategory>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const createCategoryService = async (payload: ICreateCategory) => {
    const result = await categoryServices.createCategory(payload);

    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal menambahkan kategori");
    }

    return result;
  };

  const { mutate: mutateCreateCategory, isPending: isPendingCreateCategory } =
    useMutation({
      mutationFn: createCategoryService,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        reset();
      },

      onError(error: AxiosError<{ message: string }> | Error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;

        setError("root", {
          message: message ?? "Terjadi kesalahan",
        });
      },
    });

  const handleCreateCategory = (data: ICreateCategory) => {
    mutateCreateCategory(data);
  };

  return {
    control,
    handleSubmit,
    handleCreateCategory,
    isPendingCreateCategory,
    errors,
  };
};

export default useCreateCategory;
