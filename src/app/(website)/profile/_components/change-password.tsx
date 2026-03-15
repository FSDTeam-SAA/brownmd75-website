/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const PasswordInput = ({
  label,
  name,
  stateKey,
  register,
  showPass,
  setShowPass,
}: {
  label: string;
  name: string;
  stateKey: string;
  register: UseFormRegister<any>;
  showPass: any;
  setShowPass: any;
}) => (
  <div className="space-y-2 relative">
    <label className="text-sm font-bold text-[#333333]">{label}</label>
    <div className="relative">
      <input
        type={showPass[stateKey] ? "text" : "password"}
        {...register(name, { required: true })}
        className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none pr-12 text-gray-700"
        placeholder="********"
      />
      <button
        type="button"
        onClick={() =>
          setShowPass((prev: any) => ({ ...prev, [stateKey]: !prev[stateKey] }))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPass[stateKey] ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
);

const ChangePasswordForm = () => {
  const session = useSession();
  const token = session?.data?.accessToken;

  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: data.newPassword }),
        },
      );
      if (!res.ok) throw new Error("Failed to update password");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      reset();
    },
  });

  const onSubmit = (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    mutation.mutate(data);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#333333] font-serif uppercase tracking-tight">
          Change Password
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your personal information and profile details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-w-2xl space-y-5">
          {/* Props pass kore dite hobe */}
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            stateKey="current"
            register={register}
            showPass={showPass}
            setShowPass={setShowPass}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordInput
              label="Create New Password"
              name="newPassword"
              stateKey="new"
              register={register}
              showPass={showPass}
              setShowPass={setShowPass}
            />
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              stateKey="confirm"
              register={register}
              showPass={showPass}
              setShowPass={setShowPass}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <ul className="text-xs text-gray-500 space-y-2 list-disc ml-4">
              <li>Minimum 8 characters</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character (e.g. !@#$%)</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-12 border-t border-gray-100 pt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-8 py-3 bg-[#F59E0B] text-white rounded-lg font-semibold hover:bg-[#d98b06] transition-all disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
