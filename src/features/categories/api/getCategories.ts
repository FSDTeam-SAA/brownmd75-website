// src/features/categories/api/getCategories.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { GetCategoriesResponse } from "../types/category.types";

export const getCategories = async (
  page: number = 1,
  limit: number = 10,
): Promise<GetCategoriesResponse> => {
  const res = await axiosInstance.get("/category", {
    params: { page, limit },
  });
  return res.data;
};
