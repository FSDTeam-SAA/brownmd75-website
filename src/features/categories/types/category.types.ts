// src/features/categories/types/category.types.ts

export interface Category {
  _id: string;
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Category[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
