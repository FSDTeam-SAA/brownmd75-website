"use client";

import { useState } from "react";
import Hero from "@/components/sheared/Hero";
import { useCategories } from "../hooks/useCategories";
import PageCategoryCard from "./PageCategoryCard";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useCategories(currentPage, 6);

  const meta = data?.meta;
  const totalPages = meta?.totalPage ?? 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build the array of page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Hero
        image="/images/hero-2.jpg"
        heading="Rent Smarter, Build Faster"
        description="Choose from our professionally maintained fleet across multiple categories to keep your work moving forward."
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f4a100]">
            EXPLORE CATEGORIES
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1d2433] md:text-5xl lg:max-w-3xl leading-[1.1]">
            Powering Every Project with the Right Equipment
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#f4a100]" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
              Loading Equipment Categories...
            </p>
          </div>
        )}

        {/* Error State */}
        {(error || (data && !data.success)) && (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-red-50/50 rounded-3xl border border-red-100 max-w-2xl mx-auto">
            <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-900">
              Unable to load categories
            </h3>
            <p className="text-red-700/70 text-center mt-2 font-medium">
              There was a problem communicating with our servers. Please check
              your connection and try again.
            </p>
            <Button
              variant="outline"
              onClick={() => globalThis.location.reload()}
              className="mt-6 border-red-200 text-red-700 hover:bg-red-100 rounded-xl px-8"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Categories Grid */}
        {data?.success && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.map((category) => (
                <PageCategoryCard key={category._id} category={category} />
              ))}
            </div>

            {/* Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#f4a100] hover:text-[#f4a100] transition-all disabled:opacity-40 disabled:cursor-not-allowed "
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-at-${idx}`}
                      className="px-2 text-gray-300 font-bold"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-10 w-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${
                        currentPage === page
                          ? "bg-[#f4a100] text-white shadow-md shadow-[#f4a100]/20"
                          : "border border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#f4a100] hover:text-[#f4a100] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {data?.success && data.data.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              No categories discovered yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
