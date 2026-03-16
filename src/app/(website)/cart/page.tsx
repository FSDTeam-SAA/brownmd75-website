// src/app/(website)/cart/page.tsx

import CartPage from "@/features/cart/pages/CartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | BrownMD75 Equipment Rental",
  description: "Review and manage your equipment rentals in your cart.",
};

export default function Page() {
  return <CartPage />;
}
