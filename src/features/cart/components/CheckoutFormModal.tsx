// src/features/cart/components/CheckoutFormModal.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Truck, Loader2 } from "lucide-react";
import {
  PaymentMethod,
  CheckoutPayload,
  ShippingAddress,
} from "../types/cart.types";
import { postCheckout } from "../api/checkout.api";

interface CheckoutFormModalProps {
  isOpen: boolean;
  paymentMethod: PaymentMethod | null;
  onClose: () => void;
  onBack: () => void;
}

const emptyAddress: ShippingAddress = {
  fullName: "",
  houseNumber: "",
  streetAddress: "",
  cityName: "",
  stateName: "",
  zipCode: "",
  phone: "",
  email: "",
};

const CheckoutFormModal: React.FC<CheckoutFormModalProps> = ({
  isOpen,
  paymentMethod,
  onClose,
  onBack,
}) => {
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [orderNotes, setOrderNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) return;

    const payload: CheckoutPayload = {
      shippingAddress: address,
      orderNotes,
      paymentMethod,
    };

    setIsLoading(true);
    try {
      const result = await postCheckout(payload);
      console.log("Checkout Response:", result);

      if (
        result?.success &&
        paymentMethod === "stripe" &&
        result?.data?.checkoutUrl
      ) {
        window.location.href = result.data.checkoutUrl;
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStripe = paymentMethod === "stripe";
  const title = isStripe ? "Card Payment Details" : "Cash on Delivery Details";
  const Icon = isStripe ? CreditCard : Truck;

  const fields: {
    label: string;
    field: keyof ShippingAddress;
    type?: string;
    placeholder: string;
  }[] = [
    { label: "Full Name", field: "fullName", placeholder: "John Doe" },
    { label: "House Number", field: "houseNumber", placeholder: "A-12" },
    {
      label: "Street Address",
      field: "streetAddress",
      placeholder: "Green Road",
    },
    { label: "City Name", field: "cityName", placeholder: "Dhaka" },
    { label: "State Name", field: "stateName", placeholder: "Dhaka" },
    { label: "Zip Code", field: "zipCode", placeholder: "1205" },
    {
      label: "Phone",
      field: "phone",
      type: "tel",
      placeholder: "+8801700000000",
    },
    {
      label: "Email",
      field: "email",
      type: "email",
      placeholder: "you@example.com",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && paymentMethod && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 rounded-t-2xl bg-[#1d2433] px-8 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4a100]">
                <Icon size={18} className="text-white" />
              </div>
              <h2 className="flex-1 text-lg font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-h-[75vh] overflow-y-auto px-8 py-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map(({ label, field, type = "text", placeholder }) => (
                  <div
                    key={field}
                    className={field === "streetAddress" ? "sm:col-span-2" : ""}
                  >
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={address[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#1d2433] placeholder-gray-400 outline-none transition focus:border-[#f4a100] focus:bg-white focus:ring-2 focus:ring-[#f4a100]/20"
                    />
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Order Notes{" "}
                  <span className="normal-case text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Please deliver after 2 PM."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#1d2433] placeholder-gray-400 outline-none transition focus:border-[#f4a100] focus:bg-white focus:ring-2 focus:ring-[#f4a100]/20"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 rounded-xl border-2 border-gray-200 py-3 text-sm font-bold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f4a100] py-3 text-sm font-bold text-white transition hover:bg-[#d97706] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutFormModal;
