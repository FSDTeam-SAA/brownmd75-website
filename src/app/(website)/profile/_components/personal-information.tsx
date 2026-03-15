/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Edit3 } from "lucide-react";
import { toast } from "sonner"; // Optional for notifications

type ProfileInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  postalCode: string;
};

const PersonalInfoForm = () => {
  const session = useSession();
  const token = session?.data?.accessToken;
  const queryClient = useQueryClient();

  // React Hook Form setup
  const { register, handleSubmit, reset } = useForm<ProfileInputs>();

  // Get Profile Data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    enabled: !!token,
  });

  // Update Profile Mutation
  const mutation = useMutation({
    mutationFn: async (updatedData: ProfileInputs) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  // Pre-fill form values once data is fetched
  useEffect(() => {
    if (profile?.data) {
      reset({
        firstName: profile.data.firstName,
        lastName: profile.data.lastName,
        email: profile.data.email,
        phone: profile.data.phone || "",
        location: profile.data.location || "",
        postalCode: profile.data.postalCode || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileInputs) => {
    mutation.mutate(data);
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-orange-500 font-bold">
        Loading...
      </div>
    );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#333333] font-serif">
            Personal Information
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your personal information and profile details.
          </p>
        </div>
        <button
          type="button"
          className="bg-[#F59E0B] hover:bg-[#d98b06] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium text-sm"
        >
          <Edit3 size={18} />
          Edit Profile
        </button>
      </div>

      {/* Gender Selection (Figma Design) */}
      <div className="flex gap-6 mb-8 text-sm font-medium">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            className="accent-[#F59E0B] w-4 h-4"
          />
          <span>Male</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            defaultChecked
            className="accent-[#10B981] w-4 h-4"
          />
          <span>Female</span>
        </label>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white transition-all text-gray-700"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white transition-all text-gray-700"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">
              Email Address
            </label>
            <input
              {...register("email")}
              disabled // Email logic usually disabled in profile update
              className="w-full p-3.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">
              Phone Number
            </label>
            <input
              {...register("phone")}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white transition-all text-gray-700"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">Location</label>
            <input
              {...register("location")}
              placeholder="State, Country"
              className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white transition-all text-gray-700"
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#333333]">
              Postal Code
            </label>
            <input
              {...register("postalCode")}
              placeholder="Zip Code"
              className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white transition-all text-gray-700"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-12">
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
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
