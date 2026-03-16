// src/features/cart/components/AddToCartButton.tsx
"use client";

import { ShoppingCart, Loader2 } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";
import { RentalType } from "../types/cart.types";

interface AddToCartButtonProps {
  equipmentId: string;
  quantity: number;
  rentalType: RentalType;
  className?: string;
}

export default function AddToCartButton({
  equipmentId,
  quantity,
  rentalType,
  className = "",
}: Readonly<AddToCartButtonProps>) {
  const { mutate, isPending } = useAddToCart();

  const handleAddToCart = () => {
    mutate({
      equipmentId,
      quantity,
      rentalType,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className={`flex items-center justify-center gap-2 rounded-md bg-[#f4a100] py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          <span>Book Now</span>
        </>
      )}
    </button>
  );
}
