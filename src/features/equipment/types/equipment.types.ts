// src/features/equipment/types/equipment.types.ts

export interface EquipmentImage {
  _id?: string;
  url: string;
  public_id?: string;
}

export interface EquipmentCategory {
  _id: string;
  title: string;
  image?: {
    url: string;
    public_id: string;
  };
}

export interface EquipmentItem {
  _id: string;
  title: string;
  description: string;
  category?: EquipmentCategory;
  images?: EquipmentImage[];
  rating: number;
  totalReviews: number;
  price_per_hour: number;
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
  deliveryCharge: string;
  setupCharge: string;
  quantity: number;
  model: string;
  manufacture_year: number;
  brand: string;
  status: string;
  availableDates: string[];
  total_taxes: number;
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetEquipmentResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EquipmentItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
