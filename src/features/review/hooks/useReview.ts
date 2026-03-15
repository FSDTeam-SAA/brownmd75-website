// src/features/review/hooks/useReview.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  getTopRatedReviews,
  CreateReviewData,
} from "../api/review.api";
import { toast } from "sonner";

export const useTopRatedReviews = () => {
  return useQuery({
    queryKey: ["reviews", "top-rated"],
    queryFn: () => getTopRatedReviews(),
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewData) => createReview(data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Review submitted successfully!");
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    },
  });
};
