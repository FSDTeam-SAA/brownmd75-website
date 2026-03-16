// src/features/cart/components/CartSummary.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { PaymentMethod } from "../types/cart.types";
import PaymentMethodModal from "./PaymentMethodModal";
import CheckoutFormModal from "./CheckoutFormModal";

interface CartSummaryProps {
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
    setShowCheckoutForm(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckoutForm(false);
    setSelectedPaymentMethod(null);
  };

  const handleBack = () => {
    setShowCheckoutForm(false);
    setShowPaymentModal(true);
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
        <h3 className="text-2xl font-bold text-[#1d2433] flex items-center gap-2">
          <ShoppingBag className="text-[#f4a100]" size={24} />
          Cart Summary
        </h3>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-[#1d2433]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          {/* <div className="flex justify-between items-center text-gray-600 pb-4 border-b border-dashed border-gray-200">
          <span className="font-medium">Shipping / Delivery</span>
          <span className="text-green-600 font-bold">
            Calculated at next step
          </span>
        </div> */}

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-[#1d2433]">
              Grant Total
            </span>
            <span className="text-3xl font-black text-[#f4a100]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={() => setShowPaymentModal(true)}
            className="w-full h-14 bg-[#1d2433] hover:bg-[#2d3648] text-white text-lg font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Proceed to Checkout
            <ArrowRight size={20} />
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 font-medium uppercase tracking-widest pt-2">
          Secure Checkout Guaranteed
        </p>
      </div>

      {/* Modals */}
      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelect={handlePaymentSelect}
      />

      <CheckoutFormModal
        isOpen={showCheckoutForm}
        paymentMethod={selectedPaymentMethod}
        onClose={handleCheckoutClose}
        onBack={handleBack}
      />
    </>
  );
};

export default CartSummary;
