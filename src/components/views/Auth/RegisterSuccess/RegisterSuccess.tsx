"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/illustration/email-send.png"
          alt="Authentication Illustration"
          width={800}
          height={800}
          priority
          className="w-[240px] md:w-[320px] lg:w-[380px]"
        />

        <div className="mb-8 flex max-w-7xl flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Buat Akun Berhasil!&nbsp;
            <span className="text-[#0066FF]">
              Silakan periksa email Anda untuk aktivasi akun
            </span>
          </h1>

          <p className="mt-4 text-center text-sm leading-7 text-slate-600 md:text-base">
            Kami telah mengirimkan email aktivasi ke alamat email terdaftar
            Anda. Silakan periksa kotak masuk Anda dan konfirmasikan akun Anda
            untuk melanjutkan. Pastikan email yang Anda gunakan sudah benar, dan
            <strong> jangan lupa untuk memeriksa folder spam</strong> atau
            sampah Anda.
          </p>

          <Button
            type="submit"
            className="text- mt-4 h-14 border-[#0066FF] text-base font-semibold text-white transition hover:scale-[1.01]"
            onClick={() => router.push("/")}
          >
            Kembali Ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
