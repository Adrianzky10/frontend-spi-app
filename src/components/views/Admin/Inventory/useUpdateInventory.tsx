"use client";

import { useEffect } from "react";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import inventoryServices from "@/services/inventory.service";
import useDetailInventory from "./useDetailInventory";
import { IUpdateInventory } from "@/Types/Inventory";

const updateInventorySchema: yup.ObjectSchema<IUpdateInventory> = yup.object({
  name: yup.string().required("Masukkan nama inventaris"),
  category_id: yup.string().required("Pilih kategori"),
  description: yup.string().required("Masukkan deskripsi"),
  stock: yup
    .number()
    .typeError("Masukkan jumlah stok")
    .required("Masukkan jumlah stok")
    .min(1, "Stok minimal 1"),
  image: yup.mixed<File>().optional(),
});

const useUpdateInventory = (id: string) => {
  const queryClient = useQueryClient();

  const { inventory } = useDetailInventory(id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IUpdateInventory>({
    resolver: yupResolver(updateInventorySchema),
  });

  useEffect(() => {
    if (!inventory) return;

    reset({
      name: inventory.name,
      category_id: inventory.category_id.toString(),
      description: inventory.description,
      stock: inventory.stock,
      image: undefined,
    });
  }, [inventory, reset]);

  const updateInventoryService = async (payload: IUpdateInventory) => {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("category_id", payload.category_id);
    formData.append("description", payload.description);
    formData.append("stock", String(payload.stock));

    if (payload.image) {
      formData.append("image", payload.image);
    }

    const result = await inventoryServices.updateInventory(id, formData);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateUpdateInventory,
    isPending: isPendingUpdateInventory,
    isSuccess: isSuccessUpdateInventory,
  } = useMutation({
    mutationFn: updateInventoryService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["inventory", id],
      });
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

  const handleUpdateInventory = (data: IUpdateInventory) => {
    mutateUpdateInventory(data);
  };

  return {
    control,
    handleSubmit,
    handleUpdateInventory,
    isPendingUpdateInventory,
    isSuccessUpdateInventory,
    errors,
  };
};

export default useUpdateInventory;