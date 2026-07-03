"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const { status } = props;
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.png"
              : "/images/illustration/pending.png"
          }
          alt={
            status === "success"
              ? "Success Illustration"
              : "Pending Illustration"
          }
          width={800}
          height={800}
          priority
          className="w-[240px] md:w-[320px] lg:w-[380px]"
        />

        <div className="mb-8 flex max-w-7xl flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-[#0066ff] md:text-5xl">
            {status === "success" ? "Aktivasi Berhasil" : "Aktivasi Gagal"}
          </h1>

          <p className="mt-4 text-center text-sm leading-7 text-slate-600 md:text-base">
            {status === "success"
              ? "Akun Anda berhasil diaktifkan,silahkan login untuk memulai."
              : "Mohon maaf, kami tidak dapat mengaktifkan akun Anda. Silakan cek kembali tautan aktivasi atau hubungi dukungan kami."}
          </p>

          <Button
            type="submit"
            className="text- mt-4 h-14 border-[#0066FF] text-base font-semibold text-white transition hover:scale-[1.01]"
            onClick={
              status === "success"
                ? () => router.push("/auth/login")
                : () => router.push("/")
            }
          >
            {status === "success" ? "Login To Start Explore" : "Back To Home"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Activation;
