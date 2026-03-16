"use client";

import { useCategories } from "@/features/categories/hooks/useCategories";
import CategoryCard from "@/features/categories/component/CategoryCard";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";

export default function ExploreCategories() {
  const { data, isLoading, error } = useCategories();

  return (
    <section className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f4a100] sm:text-sm">
            See Different Categories
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">
            Explore Categories
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#f4a100]" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">
              Discovering Categories...
            </p>
          </div>
        )}

        {/* Error State */}
        {(error || (data && !data.success)) && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 bg-red-50 rounded-2xl p-8 border border-red-100">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <div className="text-center">
              <h3 className="text-lg font-bold text-red-900">
                Failed to load categories
              </h3>
              <p className="text-red-600/80 text-sm mt-1">
                Please check your connection and try again.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => globalThis.location.reload()}
              className="mt-4 border-red-200 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Success State - cards */}
        {data?.success && data.data.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data.data.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {data?.success && data.data.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              No categories found.
            </p>
          </div>
        )}

        {/* button */}
        <div className="mt-8 flex justify-center md:mt-10">
          <Button className="h-12 min-w-[180px] rounded-lg bg-[#f4a100] px-8 text-base font-semibold text-white hover:bg-[#d99100]">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
