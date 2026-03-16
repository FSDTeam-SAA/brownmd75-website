// src/features/cart/api/checkout.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { CheckoutPayload } from "../types/cart.types";

export const postCheckout = async (payload: CheckoutPayload) => {
  const res = await axiosInstance.post("/order/create-order", payload);
  return res.data;
};
