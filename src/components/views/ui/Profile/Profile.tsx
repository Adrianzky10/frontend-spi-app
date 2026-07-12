"use client";

import { Button, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

import useProfile from "./useProfile";
import { CircleCheckFill } from "@gravity-ui/icons";
import useChangePassword from "./useChangePassword";

const Profile = () => {
  const {
    control,
    handleSubmit,
    handleUpdateProfile,
    profile,
    isLoadingProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
    successMessageUpdateProfile,
    errors,
    isDirty,
  } = useProfile();

  const {
    control: passwordControl,
    handleSubmit: handleSubmitPassword,
    handleChangePassword,
    isPendingChangePassword,
    isSuccessChangePassword,
    successMessageChangePassword,
    errors: passwordErrors,
    isDirtyChangePassword,
  } = useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isLoadingProfile) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profil Saya</h1>

        <p className="mt-2 text-slate-500">
          Kelola informasi akun dan keamanan akun Anda.
        </p>
      </div>

      {isSuccessChangePassword && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-600">
          <CircleCheckFill width={16} />
          <p>{successMessageChangePassword}</p>
        </div>
      )}

      {(passwordErrors.root ||
        passwordErrors.current_password ||
        passwordErrors.new_password ||
        passwordErrors.confirm_password) && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">
            {passwordErrors.root?.message ||
              passwordErrors.current_password?.message ||
              passwordErrors.new_password?.message ||
              passwordErrors.confirm_password?.message}
          </p>
        </div>
      )}

      {isSuccessUpdateProfile && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-600">
          <CircleCheckFill width={16} />
          <p>{successMessageUpdateProfile}</p>
        </div>
      )}

      {(errors.root || errors.full_name || errors.email) && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">
            {errors.root?.message ||
              errors.full_name?.message ||
              errors.email?.message}
          </p>
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-8xl text-[#0066FF]" />

            <h2 className="mt-6 text-2xl font-bold">{profile?.full_name}</h2>

            <p className="mt-1 text-slate-500">{profile?.email}</p>

            <span className="mt-5 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {profile?.role_name}
            </span>
          </div>

          <div className="my-8 border-t" />

          <div className="space-y-5 text-sm">
            <div>
              <p className="text-slate-500">Status Akun</p>

              <p
                className={`mt-1 font-semibold ${
                  profile?.is_verified ? "text-green-600" : "text-red-600"
                }`}
              >
                {profile?.is_verified
                  ? "✓ Sudah Terverifikasi"
                  : "Belum Terverifikasi"}
              </p>
            </div>

            <div>
              <p className="text-slate-500">NIM</p>

              <p className="font-medium">{profile?.nim}</p>
            </div>

            <div>
              <p className="text-slate-500">Role</p>

              <p className="font-medium">{profile?.role_name}</p>
            </div>

            <div>
              <p className="text-slate-500">Bergabung</p>

              <p className="font-medium">
                {new Date(profile?.created_at ?? "").toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold">Informasi Profil</h2>

              <p className="mt-2 text-slate-500">
                Perbarui informasi akun Anda.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="full_name" className="font-medium">
                  Nama Lengkap
                </label>

                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value ?? ""}
                      id="full_name"
                      aria-label="Nama Lengkap"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                  )}
                />
              </div>

              <div>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value ?? ""}
                      id="email"
                      aria-label="Email"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isDisabled={!isDirty || isPendingUpdateProfile}
              >
                {isPendingUpdateProfile ? (
                  <>
                    <Spinner />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Profil"
                )}
              </Button>
            </div>
          </form>

          <div className="my-10 border-t" />

          <div>
            <h2 className="text-2xl font-bold">Ganti Password</h2>

            <p className="mt-2 text-slate-500">
              Fitur ini akan diimplementasikan menggunakan endpoint
              change-password.
            </p>
          </div>

          <form
            onSubmit={handleSubmitPassword(handleChangePassword)}
            className="mt-8 space-y-6"
          >
            <Controller
              name="current_password"
              control={passwordControl}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    value={field.value ?? ""}
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Password Lama"
                    aria-label="Password Lama"
                    className="w-full rounded-xl border px-4 py-3 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Controller
                name="new_password"
                control={passwordControl}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      value={field.value ?? ""}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Password Baru"
                      aria-label="Password Baru"
                      className="w-full rounded-xl border px-4 py-3 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                )}
              />

              <Controller
                name="confirm_password"
                control={passwordControl}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      value={field.value ?? ""}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi Password"
                      aria-label="Konfirmasi Password"
                      className="w-full rounded-xl border px-4 py-3 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isDisabled={!isDirtyChangePassword || isPendingChangePassword}
              >
                {isPendingChangePassword ? (
                  <>
                    <Spinner />
                    Mengubah...
                  </>
                ) : (
                  "Ganti Password"
                )}
              </Button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Profile;
