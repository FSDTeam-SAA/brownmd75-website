// src/features/review/component/ReviewList.tsx

"use client";

import { useTopRatedReviews } from "../hooks/useReview";
import { Star } from "lucide-react";

export default function ReviewList() {
  const { data, isLoading } = useTopRatedReviews();

  if (isLoading) {
    return <div className="py-10 text-center">Loading reviews...</div>;
  }

  const reviews = data?.data?.result || [];

  // Calculate summary data dynamically
  const total = reviews.length;
  const average =
    total > 0
      ? (
          reviews.reduce(
            (acc: number, r: { rating: number }) => acc + r.rating,
            0,
          ) / total
        ).toFixed(1)
      : "0.0";

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter(
      (r: { rating: number }) => r.rating === stars,
    ).length;
    return {
      stars,
      percentage: total > 0 ? (count / total) * 100 : 0,
    };
  });

  const ratingSummary = {
    average,
    total,
    distribution,
  };

  // Helper to get initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + (parts.at(-1) as string)[0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-12">
      {/* Review & Ratings Summary */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#1d2433]">Review & Ratings</h2>
        <div className="mt-6 flex flex-col md:flex-row md:items-start gap-12">
          {/* Left: Score */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-[#1d2433]">
                {ratingSummary.average}
              </span>
              <span className="text-2xl font-bold text-gray-400">/ 5</span>
            </div>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={`sum-star-${star}`}
                  size={24}
                  className={
                    star <= Math.round(Number(ratingSummary.average))
                      ? "fill-[#f4a100] text-[#f4a100]"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <p className="mt-3 text-sm font-bold text-gray-500">
              {ratingSummary.total} Ratings
            </p>
          </div>

          {/* Right: Breakdown */}
          <div className="flex-1 max-w-md space-y-2">
            {ratingSummary.distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex gap-0.5 w-24">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={`dist-star-${item.stars}-${star}`}
                      size={14}
                      className={
                        star <= item.stars
                          ? "fill-[#f4a100] text-[#f4a100]"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-[#f4a100]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-8">
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map(
            (review: {
              _id: string;
              rating: number;
              comment: string;
              user?: { name?: string };
            }) => {
              const userName = review.user?.name || "Alex Johnson"; // Fallback to provided example name
              const initials = getInitials(userName);

              return (
                <div key={review._id} className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={`rev-star-${review._id}-${star}`}
                        size={18}
                        className={
                          star <= review.rating
                            ? "fill-[#f4a100] text-[#f4a100]"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-[#1d2433] leading-relaxed font-medium">
                    &quot;{review.comment}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fceec7] text-sm font-bold text-[#f4a100]">
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1d2433]">
                        {userName}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        BUSINESS OWNER
                      </p>
                    </div>
                  </div>
                </div>
              );
            },
          )
        )}
      </div>
    </div>
  );
}
