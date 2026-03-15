// src/features/review/api/review.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

export interface CreateReviewData {
  reviewType: "equipment" | "website";
  equipment?: string;
  rating: number;
  comment: string;
}

// Create Review
export const createReview = async (data: CreateReviewData) => {
  const res = await axiosInstance.post("/review/create-review", data);
  return res.data;
};

// Get Top Rated Reviews
export const getTopRatedReviews = async () => {
  const res = await axiosInstance.get("/review/get-all-reviews");
  return res.data;
};
