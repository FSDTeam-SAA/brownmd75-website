// src/features/review/component/ReviewForm.tsx

"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useCreateReview } from "../hooks/useReview";

interface ReviewFormProps {
  readonly equipmentId?: string;
}

export default function ReviewForm({ equipmentId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const createReviewMutation = useCreateReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    createReviewMutation.mutate(
      {
        reviewType: equipmentId ? "equipment" : "website",
        equipment: equipmentId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
        },
      },
    );
  };

  return (
    <div className="mt-16 space-y-6 pt-12 border-t border-gray-100">
      <div>
        <h2 className="text-3xl font-extrabold text-[#1d2433]">Reviews</h2>
        <p className="mt-2 text-[15px] font-medium text-gray-500">
          Tell us about your experience. Your review helps future divers choose
          their next adventure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Selection */}
        <div className="flex gap-1" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={`${
                  star <= (hover || rating)
                    ? "fill-[#f4a100] text-[#f4a100]"
                    : "text-gray-200"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment Area */}
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-bold text-[#1d2433]">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Leave your comment......"
            className="w-full min-h-[150px] rounded-xl border border-gray-200 p-4 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#f4a100] transition-all bg-gray-50/30"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setRating(0);
              setComment("");
            }}
            className="rounded-md border border-[#f4a100] px-10 py-3 text-sm font-bold text-[#f4a100] transition hover:bg-[#fffdfa]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="rounded-md bg-[#f4a100] px-10 py-3 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
