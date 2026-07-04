"use client";

import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import borrowingServices from "@/services/borrowing.service";
import { ICreateBorrowing, ICreateBorrowingForm } from "@/Types/Borrowings";

const createBorrowingSchema: yup.ObjectSchema<ICreateBorrowingForm> =
  yup.object({
    borrow_date: yup.string().required("Pilih tanggal pinjam"),
    return_date: yup.string().required("Pilih tanggal kembali"),
    document: yup
      .mixed<File>()
      .required("Upload surat pengajuan")
      .test("fileType", "File harus berupa PDF", (value) => {
        if (!value) return false;

        return value instanceof File && value.type === "application/pdf";
      }),
  });

const useCreateBorrowing = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateBorrowingForm>({
    resolver: yupResolver(createBorrowingSchema),
  });

  const createBorrowingService = async (payload: ICreateBorrowing) => {
    const formData = new FormData();

    formData.append("item_id", payload.item_id);
    formData.append("borrow_date", payload.borrow_date);
    formData.append("return_date", payload.return_date);
    formData.append("document", payload.document);

    const result = await borrowingServices.createBorrowing(formData);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result;
  };

  const {
    mutate: mutateCreateBorrowing,
    isPending: isPendingCreateBorrowing,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: createBorrowingService,

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

  const handleCreateBorrowing = (data: ICreateBorrowing) => {
    mutateCreateBorrowing(data);
  };

  return {
    control,
    handleSubmit,
    handleCreateBorrowing,
    isPendingCreateBorrowing,
    errors,

    isSuccessCreateBorrowing: isSuccess,
    errorCreateBorrowing:
      error instanceof AxiosError
        ? error.response?.data?.message
        : error?.message,
    resetCreateBorrowing: reset,
  };
};

export default useCreateBorrowing;
