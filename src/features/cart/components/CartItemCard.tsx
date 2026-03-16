// src/features/cart/components/CartItemCard.tsx

import React from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem } from "../types/cart.types";
import { Button } from "@/components/ui/button";

interface CartItemCardProps {
  item: CartItem;
  // onUpdateQuantity?: (itemId: string, quantity: number) => void;
  // onRemove?: (itemId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { equipment, quantity, rentalType, totalPrice } = item;
  const mainImage = equipment.images?.[0]?.url || "/images/placeholder.png";

  const getRentalLabel = (type: string) => {
    switch (type) {
      case "price_per_hour":
        return "Hour";
      case "price_per_day":
        return "Day";
      case "price_per_week":
        return "Week";
      case "price_per_month":
        return "Month";
      default:
        return type;
    }
  };

  const getUnitPrice = () => {
    switch (rentalType) {
      case "price_per_hour":
        return equipment.price_per_hour;
      case "price_per_day":
        return equipment.price_per_day;
      case "price_per_week":
        return equipment.price_per_week;
      case "price_per_month":
        return equipment.price_per_month;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300">
      {/* Equipment Image */}
      <div className="relative w-full md:w-32 aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
        <Image
          src={mainImage}
          alt={equipment.title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 space-y-2 w-full">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[#1d2433] line-clamp-1">
            {equipment.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </Button>
        </div>

        <p className="text-sm text-gray-500 font-medium capitalize">
          {equipment.brand} {equipment.model}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Rental Type
            </span>
            <span className="text-sm font-bold text-[#f4a100]">
              {getRentalLabel(rentalType)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Unit Price
            </span>
            <span className="text-sm font-bold text-[#1d2433]">
              ${getUnitPrice().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity & Total */}
      <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/50">
          <button className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 disabled:opacity-50">
            <Minus size={16} />
          </button>
          <div className="flex h-9 w-10 items-center justify-center text-sm font-bold text-[#1d2433]">
            {quantity}
          </div>
          <button className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100">
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
            Subtotal
          </span>
          {/* <span className="text-2xl font-black text-[#f4a100]">${totalPrice.toFixed(2)}</span> */}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
