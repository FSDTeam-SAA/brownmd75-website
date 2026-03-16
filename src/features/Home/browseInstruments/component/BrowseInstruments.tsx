"use client";

import Link from "next/link";
import { useEquipment } from "@/features/equipment/hooks/useEquipment";
import BrowseEquipmentCard from "@/features/equipment/component/BrowseEquipmentCard";
import { Loader2, AlertCircle } from "lucide-react";
import { EquipmentItem } from "@/features/equipment/types/equipment.types";

export default function BrowseInstruments() {
  const { data, isLoading, error } = useEquipment();

  // Get first 6 items
  const equipmentItems: EquipmentItem[] = data?.data?.slice(0, 6) || [];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f59e0b] sm:text-sm">
              Our Collection
            </span>

            <h2 className="mt-2 text-[34px] font-extrabold leading-tight text-[#111827] sm:text-[42px] lg:text-[48px]">
              Browse Instruments
            </h2>
          </div>

          {/* Desktop View All Link */}
          <Link
            href="/equipments"
            className="hidden md:flex items-center gap-2 text-[#f59e0b] font-bold hover:gap-3 transition-all underline underline-offset-8 decoration-[#f59e0b]/30 hover:decoration-[#f59e0b]"
          >
            Explore Full Catalog &rarr;
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-12 flex flex-col items-center justify-center py-20 gap-4 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200">
            <Loader2 className="h-12 w-12 animate-spin text-[#f4a100]" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
              Fetching Latest Equipment...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 px-6 bg-red-50 rounded-[32px] border border-red-100 text-center max-w-2xl mx-auto">
            <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-900">
              Unable to load collection
            </h3>
            <p className="text-red-700/70 mt-2 font-medium">
              We encountered an issue while retrieving our equipment catalog.
              Please check your connection.
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="mt-6 bg-red-100 text-red-700 px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-red-200 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Equipment Grid */}
        {!isLoading && !error && equipmentItems.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {equipmentItems.map((item) => (
              <BrowseEquipmentCard key={item._id} equipment={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && equipmentItems.length === 0 && (
          <div className="mt-12 text-center py-20 bg-gray-50 rounded-[32px] border border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              No equipment available right now.
            </p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href={"/equipments"}
            className="inline-flex min-w-[210px] items-center justify-center rounded-xl bg-[#f59e0b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#f59e0b]/20 transition hover:bg-[#e6920a] hover:-translate-y-1 active:translate-y-0"
          >
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
