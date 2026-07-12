"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { Button, Spinner } from "@heroui/react";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";

import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    handleForgotPassword,
    isPendingForgotPassword,
    isSuccessForgotPassword,
    successMessageForgotPassword,
    errors,
    isDirty,
  } = useForgotPassword();

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 p-6">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <HiOutlineLockClosed size={42} className="text-[#0066FF]" />
          </div>
        </div>

        <h1 className="mt-8 text-center text-3xl font-bold text-slate-900">
          Lupa Password?
        </h1>

        <p className="mt-4 text-center leading-7 text-slate-500">
          Jangan khawatir. Masukkan email yang terdaftar pada akun Anda. Kami
          akan mengirimkan tautan untuk membuat password baru.
        </p>

        {isSuccessForgotPassword && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
            <HiOutlineCheckCircle
              size={24}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <h3 className="font-semibold text-green-700">
                Email berhasil dikirim
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-600">
                {successMessageForgotPassword}
              </p>
            </div>
          </div>
        )}

        {(errors.root || errors.email) && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
            <HiOutlineExclamationCircle
              size={24}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <h3 className="font-semibold text-red-700">Terjadi Kesalahan</h3>

              <p className="mt-1 text-sm leading-6 text-red-600">
                {errors.root?.message || errors.email?.message}
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="mt-10 space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  aria-label="Email"
                  placeholder="Masukkan email Anda"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#0066FF] focus:ring-4 focus:ring-blue-100"
                />
              )}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="h-14 w-full text-base font-semibold"
            isDisabled={!isDirty || isPendingForgotPassword}
          >
            {isPendingForgotPassword ? (
              <>
                <Spinner size="sm" />
                Mengirim...
              </>
            ) : (
              "Kirim Link Reset Password"
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

export default ForgotPassword;
