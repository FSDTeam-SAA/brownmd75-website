"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Star, ListFilter } from "lucide-react";
import { useEquipment } from "../hooks/useEquipment";

export interface EquipmentItem {
  _id: string;
  title: string;
  description: string;
  category?: {
    _id: string;
    title: string;
    image?: { url: string; public_id: string };
  };
  images?: { _id?: string; url: string; public_id?: string }[];
  rating: number;
  totalReviews: number;
  price_per_hour: number;
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
  deliveryCharge: string;
  setupCharge: string;
  quantity: number;
  model: string;
  manufacture_year: number;
  brand: string;
  status: string;
  availableDates: string[];
  total_taxes: number;
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Equipment() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, isLoading } = useEquipment();

  const [price, setPrice] = useState(200);
  const [weight, setWeight] = useState(7);
  const [year, setYear] = useState(2024);

  const equipmentData: EquipmentItem[] = data?.data || [];

  return (
    <section className="bg-[#f8f8f8] py-10 md:py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4a100]">
              Let&apos;s Choice
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#1d2433] md:text-4xl">
              Choice Your Preferred Equipment
            </h2>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
            {/* Search */}
            <div className="flex w-full overflow-hidden rounded-md border border-[#f4a100] bg-white lg:w-[420px]">
              <input
                type="text"
                placeholder="Search for products..."
                className="h-12 w-full px-4 text-sm text-gray-700 outline-none"
              />
              <button className="flex h-12 items-center justify-center bg-[#f4a100] px-6 text-sm font-semibold text-white transition hover:opacity-90">
                Search
              </button>
            </div>

            {/* Filter */}
            <div className="relative w-full lg:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex w-full lg:w-auto h-12 items-center justify-center gap-2 rounded-md bg-[#f4a100] px-5 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
              >
                <SlidersHorizontal size={16} />
                <span>Filter</span>
              </button>

              {/* Filter Modal */}
              {isFilterOpen && (
                <div className="absolute right-0 top-14 z-50 w-full md:w-[350px] rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
                  <div className="space-y-7">
                    {/* Price */}
                    <div>
                      <div className="flex items-center gap-3 text-lg font-bold text-[#1d2433]">
                        <ListFilter size={20} />
                        <h3>Price</h3>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full mt-4 cursor-pointer accent-[#f4a100]"
                      />
                      <p className="mt-3 text-[15px] font-medium text-[#1d2433]">
                        Range from $0 to $ {price}
                      </p>
                    </div>

                    {/* Operating Weight */}
                    <div>
                      <div className="flex items-center gap-3 text-lg font-bold text-[#1d2433]">
                        <ListFilter size={20} />
                        <h3>Operating Weight</h3>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full mt-4 cursor-pointer accent-[#f4a100]"
                      />
                      <p className="mt-3 text-[15px] font-medium text-[#1d2433]">
                        Range from 0.5tn to {weight}tn
                      </p>
                    </div>

                    {/* Manufacture Year */}
                    <div>
                      <div className="flex items-center gap-3 text-lg font-bold text-[#1d2433]">
                        <ListFilter size={20} />
                        <h3>Manufacture Year</h3>
                      </div>
                      <input
                        type="range"
                        min="2020"
                        max="2024"
                        step="1"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full mt-4 cursor-pointer accent-[#f4a100]"
                      />
                      <p className="mt-3 text-[15px] font-medium text-[#1d2433]">
                        Range from 2020 to {year}
                      </p>
                    </div>

                    {/* Category */}
                    <div>
                      <div className="flex items-center gap-3 text-lg font-bold text-[#1d2433]">
                        <ListFilter size={20} />
                        <h3>Category</h3>
                      </div>
                      <div className="relative mt-4">
                        <select className="w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 outline-none appearance-none cursor-pointer">
                          <option>All</option>
                          <option>Water Pump</option>
                          <option>Scissor Lift</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L5 5L9 1"
                              stroke="#9CA3AF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full rounded-xl bg-[#f4a100] py-4 text-center text-[15px] font-bold text-white transition hover:opacity-90"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 space-y-6">
          {isLoading && (
            <div className="py-20 text-center text-gray-500 font-medium">
              Loading equipment...
            </div>
          )}
          {!isLoading && equipmentData.length === 0 && (
            <div className="py-20 text-center text-gray-500 font-medium">
              No equipment found.
            </div>
          )}
          {!isLoading &&
            equipmentData.length > 0 &&
            equipmentData.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  {/* Left */}
                  <div className="flex flex-1 flex-col gap-5 md:flex-row">
                    {/* Image */}
                    <div className="flex h-[180px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white md:w-[180px]">
                      <div className="relative h-[130px] w-[130px] md:h-[140px] md:w-[140px]">
                        <Image
                          src={
                            item.images?.[0]?.url || "/images/placeholder.png"
                          }
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <h3 className="text-2xl font-extrabold text-[#1d2433]">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1 text-sm font-semibold text-[#1d2433]">
                          <Star
                            size={14}
                            className="fill-[#f4a100] text-[#f4a100]"
                          />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      {/* Prices */}
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-[#4b5563] md:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4a100] text-[10px] text-white">
                            $
                          </span>
                          <span>{item.price_per_hour}/Hour</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4a100] text-[10px] text-white">
                            $
                          </span>
                          <span>{item.price_per_day}/Day</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4a100] text-[10px] text-white">
                            $
                          </span>
                          <span>{item.price_per_week}/Week</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4a100] text-[10px] text-white">
                            $
                          </span>
                          <span>{item.price_per_month}/Monthly</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm font-medium text-[#4b5563] md:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>Model : {item.model}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>
                            Manufacture Year : {item.manufacture_year}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>Brand : {item.brand}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>Category : {item.category?.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>Delivery : ${item.deliveryCharge}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-[#f4a100]" />
                          <span>Setup : ${item.setupCharge}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="w-full xl:w-[170px]">
                    <div className="rounded-xl border border-gray-200 bg-[#fffdfa] p-5 text-center">
                      {/* <p className="text-lg font-semibold text-[#6b7280]">Total Taxes</p>
                    <h4 className="mt-2 text-4xl font-extrabold text-[#f4a100]">
                      ${item.total_taxes}
                    </h4> */}

                      <button
                        onClick={() => router.push(`/equipments/${item._id}`)}
                        className="mt-6 w-full rounded-md bg-[#f4a100] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
