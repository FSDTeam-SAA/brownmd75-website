// src/features/cart/pages/CartPage.tsx

"use client";

import React from "react";
import { useCart } from "../hooks/useCart";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const { data, isLoading, error } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#f4a100]" />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-sm">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
          <ShoppingCart className="text-red-400" size={32} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1d2433]">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            We couldn&apos;t fetch your cart items. Please try refreshing the
            page or check your connection.
          </p>
        </div>
        <Button
          onClick={() => globalThis.location.reload()}
          className="bg-[#1d2433] text-white px-8"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const cart = data.data;
  const hasItems = cart.items && cart.items.length > 0;

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1d2433] tracking-tight">
              My <span className="text-[#f4a100]">Cart</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Manage your selected equipment rentals
            </p>
          </div>
          <Link href="/equipments">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 text-[#1d2433] font-bold"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <CartItemCard key={item._id} item={item} />
              ))}

              <div className="pt-6 flex justify-between items-center text-sm text-gray-400 font-medium">
                <p>Showing {cart.items.length} items in your cart</p>
                <button className="hover:text-[#f4a100] transition-colors underline underline-offset-4 decoration-gray-200">
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Sticky Summary Section */}
            <div className="lg:sticky lg:top-24">
              <CartSummary totalPrice={cart.totalPrice} />

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    Fast
                    <br />
                    Delivery
                  </span>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    Secure
                    <br />
                    Pay
                  </span>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    24/7
                    <br />
                    Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-20 text-center space-y-8 shadow-sm">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart size={48} className="text-gray-200" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#1d2433]">
                Your cart is empty
              </h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                Looks like you haven&apos;t added any equipment to your cart
                yet.
              </p>
            </div>
            <Link href="/equipments" className="inline-block">
              <Button className="bg-[#f4a100] hover:bg-[#e09400] text-white h-14 px-10 rounded-xl text-lg font-bold shadow-lg shadow-[#f4a100]/20 transition-all hover:scale-105">
                Browse Equipment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
