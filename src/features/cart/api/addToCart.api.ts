// src/features/cart/api/addToCart.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { AddToCartRequest, AddToCartResponse } from "../types/cart.types";

export const postAddToCart = async (
  data: AddToCartRequest,
): Promise<AddToCartResponse> => {
  const res = await axiosInstance.post("/cart/add-to-cart", data);
  return res.data;
};
