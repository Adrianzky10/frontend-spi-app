"use client";

import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import inventoryServices from "@/services/inventory.service";
import { ICreateInventory } from "@/Types/Inventory";

const createInventorySchema = yup.object({
  name: yup.string().required("Masukkan nama inventaris"),

  category_id: yup.string().required("Pilih kategori"),

  description: yup.string().required("Masukkan deskripsi"),

  stock: yup
    .number()
    .typeError("Masukkan jumlah stok")
    .required("Masukkan jumlah stok")
    .min(1, "Stok minimal 1"),

  image: yup.mixed<File>().required("Pilih gambar inventaris"),
});

const useCreateInventory = () => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ICreateInventory>({
    resolver: yupResolver(createInventorySchema),
  });

  const createInventoryService = async (payload: ICreateInventory) => {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("category_id", payload.category_id);
    formData.append("description", payload.description);
    formData.append("stock", String(payload.stock));
    formData.append("image", payload.image);

    const result = await inventoryServices.createInventory(formData);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const { mutate: mutateCreateInventory, isPending: isPendingCreateInventory } =
    useMutation({
      mutationFn: createInventoryService,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["inventories"],
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

  const handleCreateInventory = (data: ICreateInventory) => {
    mutateCreateInventory(data);
  };

  return {
    control,
    handleSubmit,
    handleCreateInventory,
    isPendingCreateInventory,
    errors,
  };
};

export default useCreateInventory;