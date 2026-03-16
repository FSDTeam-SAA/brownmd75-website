// src/features/cart/hooks/useCart.ts

import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/getCart.api";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
