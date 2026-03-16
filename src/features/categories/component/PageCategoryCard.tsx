// src/features/categories/component/PageCategoryCard.tsx

import React from "react";
import Image from "next/image";
import { Category } from "../types/category.types";

interface PageCategoryCardProps {
  category: Category;
}

const PageCategoryCard: React.FC<PageCategoryCardProps> = ({ category }) => {
  return (
    <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer border border-gray-100/50">
      <Image
        src={category.image.url}
        alt={category.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Dark overlay with slight color tint */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
        <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-[#f4a100] transition-colors">
          {category.title}
        </h3>
        {/* API doesn't provide item count yet, using a consistent placeholder or removing if preferred */}
        <p className="text-sm font-medium text-white/70 tracking-wide uppercase">
          Explore category
        </p>
      </div>
    </div>
  );
};

export default PageCategoryCard;
