"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Drill,
  Forklift,
  Hammer,
  Package,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    title: "Construction & Heavy Equipment",
    items: 2,
    image:
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1200&auto=format&fit=crop",
    icon: ArrowUpRight,
  },
  {
    id: 2,
    title: "Earthmoving & Landscaping",
    items: 4,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    icon: Truck,
  },
  {
    id: 3,
    title: "Material Handling",
    items: 6,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    icon: Forklift,
  },
  {
    id: 4,
    title: "Concrete & Masonry",
    items: 4,
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
    icon: Package,
  },
  {
    id: 5,
    title: "Power Tools & Hand Tools",
    items: 2,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop",
    icon: Drill,
  },
  {
    id: 6,
    title: "Air & Power Equipment",
    items: 2,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
    icon: Zap,
  },
];

export default function ExploreCategories() {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f4a100] sm:text-sm">
            See Different Categories
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">
            Explore Categories
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="group relative h-[300px] overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4a100] text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="line-clamp-1 text-base font-bold text-white sm:text-lg">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/85">
                      {category.items} items available
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* button */}
        <div className="mt-8 flex justify-center md:mt-10">
          <Button className="h-12 min-w-[180px] rounded-lg bg-[#f4a100] px-8 text-base font-semibold text-white hover:bg-[#d99100]">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
