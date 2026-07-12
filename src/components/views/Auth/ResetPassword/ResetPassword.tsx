"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import useResetPassword from "./useResetPassword";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    handleResetPassword,
    errors,
    isDirty,
    isPendingResetPassword,
    isSuccessResetPassword,
    successMessageResetPassword,
    setValue,
  } = useResetPassword();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (token) {
      setValue("token", token);
    }
  }, [token, setValue]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <section className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <HiOutlineLockClosed size={42} className="text-[#0066FF]" />
          </div>
        </div>

        <h1 className="mt-8 text-center text-3xl font-bold text-slate-900">
          Buat Password Baru
        </h1>

        <p className="mt-4 text-center leading-7 text-slate-500">
          Password baru harus berbeda dari password sebelumnya agar akun Anda
          tetap aman.
        </p>

        {!token && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              Token tidak ditemukan atau sudah kedaluwarsa.
            </p>
          </div>
        )}

        {isSuccessResetPassword && (
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            <HiOutlineCheckCircle size={22} />
            <p>{successMessageResetPassword}</p>
          </div>
        )}

        {(errors.root || errors.password || errors.confirm_password) && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              {errors.root?.message ||
                errors.password?.message ||
                errors.confirm_password?.message}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="mt-10 space-y-6"
        >
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-slate-700"
            >
              Password Baru
            </label>

            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={field.value ?? ""}
                    id="password"
                    aria-label="Password Baru"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    className="w-full rounded-2xl border border-slate-300 px-5 py-4 pr-14 outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-blue-100"
                  />
                )}
              />

              <button
                type="button"
                aria-label="Toggle Password"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="mb-2 block font-semibold text-slate-700"
            >
              Konfirmasi Password
            </label>

            <div className="relative">
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={field.value ?? ""}
                    id="confirm_password"
                    aria-label="Konfirmasi Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    className="w-full rounded-2xl border border-slate-300 px-5 py-4 pr-14 outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-blue-100"
                  />
                )}
              />

              <button
                type="button"
                aria-label="Toggle Konfirmasi Password"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={22} />
                ) : (
                  <FiEye size={22} />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="h-14 w-full text-base font-semibold"
            isDisabled={!isDirty || isPendingResetPassword}
          >
            {isPendingResetPassword ? (
              <>
                <Spinner size="sm" />
                Menyimpan...
              </>
            ) : (
              "Simpan Password Baru"
            )}
          </Button>
        </form>

        <div className="my-8 border-t border-slate-200" />

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 font-medium text-slate-600 transition hover:text-[#0066FF]"
        >
          <HiOutlineArrowLeft size={18} />
          Kembali ke Login
        </Link>
      </section>
    </main>
  );
};

export default ResetPassword;
