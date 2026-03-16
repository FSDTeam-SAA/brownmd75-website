"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "Flexible rental plans (Daily, Weekly, Monthly)",
  "Professionally maintained & tuned instruments",
  "Quick delivery & pickup services",
  "Affordable pricing with no hidden fees",
];

export default function AboutOurCompany() {
  return (
    <section className="bg-[#f7f7f7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f4a100]">
              About Our Company
            </p>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#111827] md:text-5xl">
              Driven by Quality and Trust
            </h1>

            <p className="mt-6 text-base leading-8 text-[#4b5563] md:text-lg">
              We are a trusted provider of high-quality equipment rental
              solutions for construction and industrial projects. Our fleet is
              regularly inspected and maintained to ensure safety, reliability,
              and peak performance.
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-5">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fef3c7]">
                    <Check className="h-4 w-4 text-[#111827]" />
                  </div>
                  <p className="text-base font-medium text-[#4b5563]">{item}</p>
                </div>
              ))}
            </div>

            {/* Author */}
            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src="/images/ceo.jpg"
                  alt="Michael"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#111827]">
                  Micheal
                </h3>
                <p className="text-lg font-semibold text-[#f4a100]">
                  CEO Founder
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* Orange Border Shape */}
              <div className="absolute bottom-[-14px] right-[-14px] h-full w-full bg-[#f4a100]" />

              {/* Main Image */}
              <div className="relative z-10 h-[380px] w-full overflow-hidden md:h-[500px]">
                <Image
                  src="/images/Container.png"
                  alt="About Our Company"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
