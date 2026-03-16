"use client";

import Image from "next/image";

export default function GetStarted() {
  return (
    <section className="relative w-full h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/GetStarted.png"
        alt="Get Started"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-7xl">
          Are you prepared to{" "}
          <span className="text-[#f4a100]">Get Started?</span>
        </h1>

        <p className="text-gray-200 mt-4 max-w-2xl text-sm md:text-lg">
          Supporting contractors and businesses with flexible rental options and
          industry-grade equipment.
        </p>

        <button className="mt-8 bg-[#f4a100] hover:bg-[#e69100] text-white font-semibold px-8 py-3 rounded-md transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
