"use client";
import Image from "next/image";
import {
  Button,
  Card,
  FieldError,
  InputGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import { cn } from "@/utils/cn";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import Link from "next/link";
const Register = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();
  return (
    <div className="grid w-full items-center justify-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_1fr] lg:gap-15">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
        <div className="mb-8 max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Selamat datang di
            <span className="text-[#0066FF]">
              {" "}
              Sistem Peminjaman Inventaris Kampus
            </span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Buat akun kamu sekarang dan mulailah meminjam inventaris kampus
          </p>
        </div>

        <Image
          src="/images/illustration/auth.png"
          alt="Authentication Illustration"
          width={800}
          height={800}
          priority
          className="hidden w-[240px] md:w-[320px] lg:block lg:w-[380px]"
        />
      </div>
      {/* Right Section */}
      <Card className="max-w-screen-sm border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/40 md:p-10">
        <Card.Header className="mb-3">
          <Card.Title className="text-3xl font-bold text-[#0066FF]">
            SPI-APP Register
          </Card.Title>
          <Card.Description className="mt-2 mb-4 text-sm leading-6 text-slate-500">
            Apakah sudah punya akun?
            <Link
              href="/auth/login"
              className="ml-1 font-semibold text-[#0066FF] transition hover:text-blue-700"
            >
              Login disini
            </Link>
          </Card.Description>
          {errors.root && (
            <div className="border-danger-200 bg-danger-50 flex items-start gap-3 rounded-xl border px-4 py-3">
              <FiAlertCircle className="text-danger mt-0.5 text-lg" />

              <p className="text-danger text-sm font-medium">
                {errors.root.message}
              </p>
            </div>
          )}
        </Card.Header>
        <Card.Content>
          <form
            className={cn(
              "flex flex-col",
              Object.keys(errors).length > 0 && "gap-2",
              Object.keys(errors).length === 0 && "gap-4",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <TextField
                  isInvalid={!!errors.full_name}
                  className="w-full"
                  aria-label="Nama Lengkap"
                >
                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-[#0066FF] focus-within:bg-white">
                    <InputGroup.Input
                      {...field}
                      placeholder="Nama Lengkap"
                      autoComplete="off"
                      type="text"
                      className="h-12 bg-transparent px-4 text-slate-900 placeholder:text-slate-400"
                    />
                  </InputGroup>

                  <FieldError>{errors.full_name?.message}</FieldError>
                </TextField>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  isInvalid={!!errors.email}
                  className="w-full"
                  aria-label="Email"
                >
                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-[#0066FF] focus-within:bg-white">
                    <InputGroup.Input
                      {...field}
                      placeholder="Email"
                      autoComplete="off"
                      type="email"
                      className="h-12 bg-transparent px-4 text-slate-900 placeholder:text-slate-400"
                    />
                  </InputGroup>

                  <FieldError>{errors.email?.message}</FieldError>
                </TextField>
              )}
            />

            <Controller
              name="nim"
              control={control}
              render={({ field }) => (
                <TextField
                  isInvalid={!!errors.nim}
                  className="w-full"
                  aria-label="Nomor Induk Mahasiswa"
                >
                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-[#0066FF] focus-within:bg-white">
                    <InputGroup.Input
                      {...field}
                      placeholder="Nomor Induk Mahasiswa"
                      autoComplete="off"
                      type="text"
                      className="h-12 bg-transparent px-4 text-slate-900 placeholder:text-slate-400"
                    />
                  </InputGroup>

                  <FieldError>{errors.nim?.message}</FieldError>
                </TextField>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  className="w-full"
                  aria-label="Password"
                  isInvalid={!!errors.password}
                >
                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-[#0066FF] focus-within:bg-white">
                    <InputGroup.Input
                      {...field}
                      className="h-12 bg-transparent px-4 text-slate-900 placeholder:text-slate-400"
                      placeholder="Password"
                      type={isVisible ? "text" : "password"}
                    />
                    <InputGroup.Suffix>
                      <button
                        type="button"
                        className="cursor-pointer"
                        aria-label={
                          isVisible
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FiEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FiEyeOff className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError>{errors.password?.message}</FieldError>
                </TextField>
              )}
            />

            <Button
              fullWidth
              size="lg"
              className={cn(
                "mt-3 h-14 bg-[#0066FF] text-base font-semibold text-white transition hover:scale-[1.01]",
                isPendingRegister &&
                  "disabled: cursor-not-allowed bg-[#0066FF] opacity-50",
              )}
              type="submit"
            >
              {isPendingRegister ? <Spinner size="sm" /> : "Buat Akun"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Register;
