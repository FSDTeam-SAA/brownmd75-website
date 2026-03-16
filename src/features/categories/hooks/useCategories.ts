// src/features/categories/hooks/useCategories.ts

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";

export const useCategories = (page: number = 1, limit: number = 6) => {
  return useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories(page, limit),
  });
};
