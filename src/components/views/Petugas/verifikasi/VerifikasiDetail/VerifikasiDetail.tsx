"use client";

import Link from "next/link";
import { Button, Chip, Spinner } from "@heroui/react";
import {
  FaArrowLeft,
  FaCheck,
  FaFilePdf,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { IoMdDownload } from "react-icons/io";

import { MdAssignmentReturned } from "react-icons/md";
import { useState } from "react";


import useRejectBorrowing from "@/components/views/Admin/Borrowings/useRejectBorrowing";
import useApproveBorrowing from "@/components/views/Admin/Borrowings/useApproveBorrowing";
import useDetailBorrowing from "@/components/views/Admin/Borrowings/useDetailBorrowings";
import useBorrowBorrowing from "@/components/views/Admin/Borrowings/useBorrowBorrowing";
import useReturnBorrowing from "@/components/views/Admin/Borrowings/useReturnBorrowing";
import ActionAlert from "@/components/views/ui/ActionAlert";

interface PropTypes {
  id: string;
}

const VerifikasiDetail = ({ id }: PropTypes) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const {
    handleRejectBorrowing,
    isPendingRejectBorrowing,
    isSuccessRejectBorrowing,
    errorRejectBorrowing,
  } = useRejectBorrowing();
  const { borrowing, isLoading } = useDetailBorrowing(id);
  const {
    handleApproveBorrowing,
    isPendingApproveBorrowing,
    isSuccessApproveBorrowing,
    errorApproveBorrowing,
  } = useApproveBorrowing();
  const {
    handleBorrowBorrowing,
    isPendingBorrowBorrowing,
    isSuccessBorrowBorrowing,
    errorBorrowBorrowing,
  } = useBorrowBorrowing();

  const {
    handleReturnBorrowing,
    isPendingReturnBorrowing,
    isSuccessReturnBorrowing,
    errorReturnBorrowing,
  } = useReturnBorrowing();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!borrowing) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Data tidak ditemukan.
      </div>
    );
  }

  const renderStatus = () => {
    switch (borrowing.status) {
      case "Pending":
        return (
          <Chip color="warning" variant="primary" className="text-white">
            Pending
          </Chip>
        );

      case "Approved":
        return (
          <Chip color="success" variant="primary" className="text-white">
            Approved
          </Chip>
        );

      case "Rejected":
        return (
          <Chip color="danger" variant="primary" className="text-white">
            Rejected
          </Chip>
        );

      case "Borrowed":
        return <Chip className="bg-slate-800 text-white">Dipinjam</Chip>;

      default:
        return (
          <Chip color="accent" variant="primary" className="text-white">
            Dikembalikan
          </Chip>
        );
    }
  };

  return (
    <main className="space-y-6">
      <Link href="/petugas/verifikasi">
        <Button variant="ghost">
          <FaArrowLeft />
          Kembali
        </Button>
      </Link>

      <ActionAlert
        success={isSuccessApproveBorrowing}
        error={errorApproveBorrowing}
        successMessage="Peminjaman berhasil disetujui."
      />

      <ActionAlert
        success={isSuccessRejectBorrowing}
        error={errorRejectBorrowing}
        successMessage="Peminjaman berhasil ditolak."
      />

      <ActionAlert
        success={isSuccessBorrowBorrowing}
        error={errorBorrowBorrowing}
        successMessage="Barang berhasil dipinjamkan."
      />

      <ActionAlert
        success={isSuccessReturnBorrowing}
        error={errorReturnBorrowing}
        successMessage="Barang berhasil dikembalikan."
      />

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Status Peminjaman</h2>

          {renderStatus()}
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Nama Peminjam</p>

            <p className="mt-1 font-medium">{borrowing.user_name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Barang</p>

            <p className="mt-1 font-medium">{borrowing.item_name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Tanggal Pinjam</p>

            <p className="mt-1">{borrowing.borrow_date}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Tanggal Kembali</p>

            <p className="mt-1">{borrowing.return_date}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Dibuat Pada</p>

            <p className="mt-1">{borrowing.created_at}</p>
          </div>

          {borrowing.rejection_reason && (
            <div className="md:col-span-2">
              <p className="text-sm text-red-500">Alasan Penolakan</p>

              <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                {borrowing.rejection_reason}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Dokumen Pendukung</h2>

        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-100">
              <FaFilePdf className="text-3xl text-red-500" />
            </div>

            <div>
              <p className="font-medium">{borrowing.document.file_name}</p>

              <p className="text-sm text-slate-500">
                Dokumen pengajuan peminjaman inventaris.
              </p>
            </div>
          </div>

          <a
            href={borrowing.document.file_url}
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0052cc]"
          >
            <IoMdDownload />
            <span>Download</span>
          </a>
        </div>

        {showRejectForm && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className="mb-3 font-semibold text-red-600">
              Alasan Penolakan
            </h3>

            <textarea
              className="min-h-32 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-red-500"
              placeholder="Masukkan alasan penolakan..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-3">
              <Button
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectionReason("");
                }}
              >
                Batal
              </Button>

              <Button
                className="bg-red-500 text-white"
                isDisabled={!rejectionReason.trim() || isPendingRejectBorrowing}
                onClick={() => {
                  handleRejectBorrowing(borrowing.id, rejectionReason);
                  setShowRejectForm(false);
                  setRejectionReason("");
                }}
              >
                {isPendingRejectBorrowing ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  <>
                    <IoClose />
                    Konfirmasi Tolak
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {borrowing.status === "Pending" && (
          <>
            <Button
              className="rounded-lg bg-red-500 text-white"
              onClick={() => setShowRejectForm(true)}
            >
              <IoClose />
              Reject
            </Button>

            <Button
              className="rounded-lg bg-[#0066FF] text-white"
              onClick={() => {
                const confirmed = window.confirm(
                  `Yakin ingin menyetujui peminjaman "${borrowing.user_name}"?`,
                );

                if (!confirmed) return;
                handleApproveBorrowing(borrowing.id);
              }}
              isDisabled={isPendingApproveBorrowing}
            >
              {isPendingApproveBorrowing ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <>
                  <FaCheck />
                  Approve
                </>
              )}
            </Button>
          </>
        )}

        {borrowing.status === "Approved" && (
          <>
            <Button
              className="bg-slate-800 text-white"
              aria-label="Pinjamkan"
              onClick={() => {
                const confirmed = window.confirm(
                  `Pinjamkan "${borrowing.item_name}"?`,
                );

                if (!confirmed) return;

                handleBorrowBorrowing(borrowing.id);
              }}
            >
              {isPendingBorrowBorrowing ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <>
                  <FaHandHoldingUsd />
                  Tandai Dipinjamkan
                </>
              )}
            </Button>
            <Button
              className="bg-sky-500 text-white"
              aria-label="Tandai Barang Sudah Dikembalikan"
              onClick={() => {
                const confirmed = window.confirm(
                  `Tandai "${borrowing.item_name}" sudah dikembalikan?`,
                );

                if (!confirmed) return;

                handleReturnBorrowing(borrowing.id);
              }}
            >
              {isPendingReturnBorrowing ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <>
                  <MdAssignmentReturned />
                  Tandai Dikembalikan
                </>
              )}
            </Button>
          </>
        )}

        {borrowing.status === "Borrowed" && (
          <Button
            className="bg-sky-500 text-white"
            aria-label="Tandai Barang Sudah Dikembalikan"
            onClick={() => {
              const confirmed = window.confirm(
                `Tandai "${borrowing.item_name}" sudah dikembalikan?`,
              );

              if (!confirmed) return;

              handleReturnBorrowing(borrowing.id);
            }}
            isDisabled={isPendingReturnBorrowing}
          >
            <MdAssignmentReturned />
            {isPendingReturnBorrowing ? (
              <>
                <Spinner />
                Loading...
              </>
            ) : (
              "TandaiDikembalikan"
            )}
          </Button>
        )}
      </div>
    </main>
  );
};

export default VerifikasiDetail;