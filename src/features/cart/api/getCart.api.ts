// src/features/cart/api/getCart.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { GetCartResponse } from "../types/cart.types";

export const getCart = async (): Promise<GetCartResponse> => {
  const res = await axiosInstance.get("/cart/get-cart");
  return res.data;
};
