"use client";
import { useState } from "react";
import { Search, Calendar, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { searchEquipment } from "@/features/equipment/api/equipment.api";

export default function FindMyRentals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      } as const,
    },
  };

  const handleSearch = async () => {
    try {
      const results = await searchEquipment(searchTerm, startDate, endDate);

      // Filter equipment whose available dates cover the user's selected rental period
      const filtered =
        startDate && endDate
          ? results.filter(
              (equipment: {
                availableDates?: { startDate?: string; endDate?: string };
              }) => {
                const available = equipment?.availableDates;
                if (!available?.startDate || !available?.endDate) return false;
                const availStart = new Date(available.startDate);
                const availEnd = new Date(available.endDate);
                const userStart = new Date(startDate);
                const userEnd = new Date(endDate);
                return availStart <= userStart && availEnd >= userEnd;
              },
            )
          : results;

      console.log("Search Results:", filtered);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="absolute bottom-0 left-1/2 w-full max-w-[1240px] -translate-x-1/2 translate-y-1/2 rounded-[2rem] bg-black p-10 shadow-2xl z-50 md:p-14 md:mb-48 mb-20"
    >
      <h3 className="mb-12 text-center text-2xl font-bold uppercase tracking-[0.05em] text-white md:text-3xl">
        Find Your Perfect Instrument
      </h3>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Field: Select Equipment */}
        <div className="group relative flex items-center rounded-xl bg-white px-6 py-4 transition-all hover:ring-2 hover:ring-amber-500">
          <Truck className="h-6 w-6 text-[#94a3b8] group-hover:text-amber-500" />
          <input
            type="text"
            placeholder="Select Equipment"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 w-full bg-transparent text-[15px] font-medium text-gray-900 placeholder-[#94a3b8] outline-none"
          />
        </div>

        {/* Field: Date Range */}
        <div className="group relative flex items-center rounded-xl bg-white px-6 py-4 transition-all hover:ring-2 hover:ring-amber-500">
          <Calendar className="h-6 w-6 shrink-0 text-[#94a3b8] group-hover:text-amber-500" />
          <div className="ml-4 flex w-full items-center gap-2 text-[14px] font-medium text-gray-600">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent text-[14px] font-medium text-gray-600 outline-none scheme-light placeholder-[#94a3b8]"
            />
            <span className="shrink-0 text-[#cbd5e1]">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent text-[14px] font-medium text-gray-600 outline-none scheme-light placeholder-[#94a3b8]"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="flex w-full min-w-[280px] items-center justify-center gap-3 rounded-xl bg-[#F59E0B] py-5 text-[17px] font-bold text-white shadow-lg transition-colors hover:bg-[#D97706] md:w-auto px-12 cursor-pointer"
        >
          <Search className="h-6 w-6" />
          Find My Rentals
        </motion.button>
      </div>
    </motion.div>
  );
}
