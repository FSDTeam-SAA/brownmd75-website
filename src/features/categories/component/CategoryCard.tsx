// src/features/categories/component/CategoryCard.tsx

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "../types/category.types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer">
      <Image
        src={category.image.url}
        alt={category.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 p-4 sm:p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4a100] text-white shadow-md">
          <ArrowUpRight className="h-5 w-5" />
        </div>

        <div>
          <h3 className="line-clamp-1 text-base font-bold text-white sm:text-lg">
            {category.title}
          </h3>
          {/* Note: items available is not present in the new API response, removing it or using placeholder */}
          <p className="mt-1 text-sm text-white/85 uppercase tracking-wider font-semibold">
            Explore Category
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
