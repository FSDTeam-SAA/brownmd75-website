// src/features/categories/api/getCategories.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { GetCategoriesResponse } from "../types/category.types";

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const res = await axiosInstance.get("/category");
  return res.data;
};
