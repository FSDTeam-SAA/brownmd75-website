"use client";

import Image from "next/image";

type HeroProps = {
  image: string;
  heading: string;
  description: string;
};

export default function Hero({ image, heading, description }: HeroProps) {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
      {/* Background Image */}
      <Image src={image} alt={heading} fill priority className="object-cover" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/10 via-[#111827]/60 to-[#111827]/90" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-6xl">
          {heading}
        </h1>

        <p className="text-gray-200 mt-4 max-w-2xl text-sm md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
