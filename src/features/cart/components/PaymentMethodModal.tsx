// src/features/cart/components/PaymentMethodModal.tsx

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Truck } from "lucide-react";
import { PaymentMethod } from "../types/cart.types";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="mb-2 text-center text-2xl font-bold text-[#1d2433]">
              Select Payment Method
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              Choose how you would like to complete your order
            </p>

            <div className="flex flex-col gap-4">
              {/* Card Payment */}
              <button
                onClick={() => onSelect("stripe")}
                className="group flex items-center gap-5 rounded-xl border-2 border-gray-200 p-5 text-left transition-all hover:border-[#f4a100] hover:bg-amber-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1d2433] text-white transition group-hover:bg-[#f4a100]">
                  <CreditCard size={22} />
                </div>
                <div>
                  <p className="font-bold text-[#1d2433]">Card Payment</p>
                  <p className="text-sm text-gray-500">
                    Pay securely with your credit or debit card
                  </p>
                </div>
              </button>

              {/* Cash on Delivery */}
              <button
                onClick={() => onSelect("cod")}
                className="group flex items-center gap-5 rounded-xl border-2 border-gray-200 p-5 text-left transition-all hover:border-[#f4a100] hover:bg-amber-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1d2433] text-white transition group-hover:bg-[#f4a100]">
                  <Truck size={22} />
                </div>
                <div>
                  <p className="font-bold text-[#1d2433]">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay in cash when your order arrives
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentMethodModal;
