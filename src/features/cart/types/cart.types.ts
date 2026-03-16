// src/features/cart/types/cart.types.ts

export type RentalType =
  | "price_per_hour"
  | "price_per_day"
  | "price_per_week"
  | "price_per_month";

export interface AddToCartRequest {
  equipmentId: string;
  quantity: number;
  rentalType: RentalType;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface CartEquipment {
  _id: string;
  title: string;
  brand: string;
  model: string;
  images: { url: string; public_id: string }[];
  price_per_hour: number;
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
}

export interface CartItem {
  _id: string;
  equipment: CartEquipment;
  quantity: number;
  rentalType: RentalType;
  totalPrice: number;
}

export interface CartData {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCartResponse {
  success: boolean;
  message: string;
  data: CartData;
}
