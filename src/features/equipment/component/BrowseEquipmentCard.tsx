// src/features/equipment/component/BrowseEquipmentCard.tsx

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { EquipmentItem } from "../types/equipment.types";
import { useRouter } from "next/navigation";

interface BrowseEquipmentCardProps {
  equipment: EquipmentItem;
}

const BrowseEquipmentCard: React.FC<BrowseEquipmentCardProps> = ({
  equipment,
}) => {
  const router = useRouter();
  const firstImage = equipment.images?.[0]?.url || "/images/placeholder.png";

  return (
    <div
      onClick={() => router.push(`/equipments/${equipment._id}`)}
      className="group relative h-[300px] overflow-hidden rounded-[16px] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.08)] cursor-pointer"
    >
      <Image
        src={firstImage}
        alt={equipment.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#111827]/90" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-center gap-1.5 mb-1">
          <Star size={14} className="fill-[#f4a100] text-[#f4a100]" />
          <span className="text-xs font-black text-white">
            {equipment.rating}
          </span>
        </div>

        <h3 className="text-[22px] font-extrabold leading-tight text-white drop-shadow-md sm:text-[24px] line-clamp-1">
          {equipment.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-white/80">
            From{" "}
            <span className="text-[#f4a100] text-lg">
              ${equipment.price_per_day}
            </span>
            /day
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#f4a100] border border-[#f4a100]/30 px-2 py-1 rounded bg-black/20">
            Rent Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrowseEquipmentCard;
