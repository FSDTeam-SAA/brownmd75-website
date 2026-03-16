"use client";

import Image from "next/image";
import Link from "next/link";

const instruments = [
  {
    id: 1,
    title: "Water Pumps",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Electric Heater",
    image:
      "https://images.unsplash.com/photo-1635774855536-972ff2d8f400?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Plate Compactor",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Demolition Hammer",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Pipe Cutter",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Step Ladders",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BrowseInstruments() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f59e0b] sm:text-sm">
            Our Collection
          </span>

          <h2 className="mt-2 text-[34px] font-extrabold leading-tight text-[#111827] sm:text-[42px] lg:text-[48px]">
            Browse Instruments
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {instruments.map((item) => (
            <div
              key={item.id}
              className="group relative h-[300px] overflow-hidden rounded-[16px] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.08)] sm:h-[200px] lg:h-[300px] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#111827]/85" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="text-[24px] font-extrabold leading-none text-white drop-shadow-md sm:text-[26px]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={"/equipments"}
            className="inline-flex min-w-[190px] items-center justify-center rounded-md bg-[#f59e0b] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#e6920a] cursor-pointer"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
