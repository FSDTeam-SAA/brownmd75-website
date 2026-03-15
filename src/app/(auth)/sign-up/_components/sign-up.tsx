/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // TanStack Mutation for API Integration
  const mutation = useMutation({
    mutationFn: async (newUser: typeof formData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        newUser,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // বেসিক ভ্যালিডেশন
    if (!formData.firstName || !formData.email || !formData.password) {
      return toast.error("Please fill in all required fields");
    }
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF8F3]">
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-sm border border-gray-100 p-10 mx-4">
        {/* Logo/Brand Name */}
        <div className="text-center mb-2">
          <h2 className="text-2xl font-serif font-medium text-black tracking-tight">
            MachineM8.com
          </h2>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#F5A623] mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-[15px]">
            Create your account to start booking, hosting, and sharing kitchens
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-gray-700 font-semibold"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="First Name"
                className="h-12 border-gray-400 focus-visible:ring-[#F5A623]"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 font-semibold">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                className="h-12 border-gray-400 focus-visible:ring-[#F5A623]"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="h-12 border-gray-400 focus-visible:ring-[#F5A623]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="************"
              className="h-12 border-gray-400 focus-visible:ring-[#F5A623]"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#F5A623] hover:bg-[#e0961d] text-white font-bold h-12 text-lg rounded-md mt-4 transition-colors"
          >
            {mutation.isPending ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#F5A623] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
