"use client";
import { Search, Calendar, Clock, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function FindMyRentals() {
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

  return (
    <motion.div
      variants={itemVariants}
      className="absolute bottom-0 left-1/2 w-full max-w-[1240px] -translate-x-1/2 translate-y-1/2 rounded-[2rem] bg-black p-10 shadow-2xl z-50 md:p-14 md:mb-48 mb-20"
    >
      <h3 className="mb-12 text-center text-2xl font-bold uppercase tracking-[0.05em] text-white md:text-3xl">
        Find Your Perfect Instrument
      </h3>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
        {/* Field: Select Equipment */}
        <div className="group relative flex items-center rounded-xl bg-white px-6 py-4 transition-all hover:ring-2 hover:ring-amber-500">
          <Truck className="h-6 w-6 text-[#94a3b8] group-hover:text-amber-500" />
          <input
            type="text"
            placeholder="Select Equipment"
            className="ml-4 w-full bg-transparent text-[15px] font-medium text-gray-900 placeholder-[#94a3b8] outline-none"
          />
        </div>

        {/* Field: Date Range */}
        <div className="group relative flex items-center rounded-xl bg-white px-6 py-4 transition-all hover:ring-2 hover:ring-amber-500">
          <Calendar className="h-6 w-6 text-[#94a3b8] group-hover:text-amber-500" />
          <div className="ml-4 flex w-full items-center justify-between text-[14px] font-medium text-gray-600">
            <span className="text-[#94a3b8]">mm/dd/yyyy</span>
            <span className="mx-4 text-[#cbd5e1]">-</span>
            <span className="text-[#94a3b8]">mm/dd/yyyy</span>
          </div>
        </div>

        {/* Field: Time Range */}
        <div className="group relative flex items-center rounded-xl bg-white px-6 py-4 transition-all hover:ring-2 hover:ring-amber-500">
          <Clock className="h-6 w-6 text-[#94a3b8] group-hover:text-amber-500" />
          <div className="ml-4 flex w-full items-center justify-between text-[14px] font-medium text-gray-600">
            <div className="flex items-center">
              <span className="text-[#94a3b8]">--:--</span>
              <select className="ml-2 bg-transparent text-[11px] font-bold uppercase text-gray-500 hover:text-gray-900 outline-none">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <span className="mx-4 text-[#cbd5e1]">-</span>
            <div className="flex items-center">
              <span className="text-[#94a3b8]">--:--</span>
              <select className="ml-2 bg-transparent text-[11px] font-bold uppercase text-gray-500 hover:text-gray-900 outline-none">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full min-w-[280px] items-center justify-center gap-3 rounded-xl bg-[#F59E0B] py-5 text-[17px] font-bold text-white shadow-lg transition-colors hover:bg-[#D97706] md:w-auto px-12 cursor-pointer"
        >
          <Search className="h-6 w-6" />
          Find My Rentals
        </motion.button>
      </div>
    </motion.div>
  );
}
