"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Equipment",
      path: "/equipments",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide cursor-pointer">
          <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
        </div>

        {/* Desktop Right Side Menu */}
        <div className="hidden md:flex items-center gap-8 text-[#4B5563] font-medium">
          <ul className="flex items-center gap-8">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="cursor-pointer hover:text-[#4B5563] hover:font-semibold"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/cart">
            <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#f4a100] transition-colors" />
          </Link>

          <Link href={`/login`}>
            <button className="bg-primary text-white px-6 py-3 rounded-md font-medium cursor-pointer">
              Log In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t">
          <ul className="flex flex-col items-start gap-4 px-6 py-4 text-[#4B5563] font-medium">
            <li className="cursor-pointer hover:text-[#4B5563] hover:font-semibold">
              Home
            </li>
            <li className="cursor-pointer hover:text-[#4B5563] hover:font-semibold">
              Equipment
            </li>
            <li className="cursor-pointer hover:text-[#4B5563] hover:font-semibold">
              About Us
            </li>
            <li className="cursor-pointer hover:text-[#4B5563] hover:font-semibold">
              Contact Us
            </li>

            <div className="flex items-center gap-4 pt-2 cursor-pointer">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#f4a100] transition-colors" />
              </Link>
              <Link href={`/login`}>
                <button className="bg-primary text-white px-6 py-3 rounded-md font-medium cursor-pointer">
                  Log In
                </button>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
