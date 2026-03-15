/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Camera, User, Lock, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import PersonalInfoForm from "./personal-information";
import OrderHistoryTable from "./order-history-table";
import ChangePasswordForm from "./change-password";

// API response এর জন্য টাইপ ডিফাইন
interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  location?: string;
  phone?: string;
  postalCode?: string;
  image?: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserProfile;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "password" | "orders">(
    "info",
  );
  const { data: session } = useSession();
  const token = session?.accessToken; // আপনার token কোথায় আছে সেটা অনুযায়ী পরিবর্তন করুন

  // React Query দিয়ে প্রোফাইল ডেটা fetch
  const { data: profileResponse, isLoading } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    enabled: !!token, // token থাকলেই শুধু fetch করবে
  });

  const profileData = profileResponse?.data;

  // ফুল নাম তৈরি
  const fullName = profileData
    ? `${profileData.firstName} ${profileData.lastName}`.trim()
    : session?.user?.name || "User Name";

  // ফোন নম্বর ফরম্যাট
  const displayPhone = profileData?.phone || "+1 (555) 123-4567";

  // ইউজার আইডি ফরম্যাট
  const formatUserId = (id: string) => {
    if (!id) return "#1234567890";
    const lastFour = id.slice(-4);
    return `#...${lastFour}`;
  };

  // Navigation items
  const navItems = [
    { id: "info", label: "Personal Information", icon: <User size={18} /> },
    { id: "password", label: "Change Password", icon: <Lock size={18} /> },
    { id: "orders", label: "Order History", icon: <ShoppingBag size={18} /> },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto mt-16 min-h-screen px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-16 min-h-[calc(100vh-220px)] px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={
                    profileData?.image ||
                    session?.user?.image ||
                    "/images/avatar-placeholder.webp"
                  }
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-[#F59E0B] p-2 rounded-full text-white hover:bg-orange-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-[#F59E0B] text-center mb-6">
              {fullName}
            </h2>

            <div className="w-full space-y-4 text-sm border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Name:</span>
                <span className="text-gray-800">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Email:</span>
                <span className="text-gray-800 truncate ml-4">
                  {profileData?.email || session?.user?.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Phone:</span>
                <span className="text-gray-800">{displayPhone}</span>
              </div>
            </div>

            {/* TAB NAVIGATION BUTTONS */}
            <div className="w-full mt-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                    activeTab === item.id
                      ? "bg-[#F59E0B] text-white shadow-md shadow-orange-100"
                      : "text-gray-600 hover:bg-orange-50 hover:text-[#F59E0B]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[600px]">
          {activeTab === "info" && <PersonalInfoForm />}
          {activeTab === "password" && <ChangePasswordForm />}
          {activeTab === "orders" && <OrderHistoryTable />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
