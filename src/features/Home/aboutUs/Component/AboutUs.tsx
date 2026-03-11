"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Flexible rental plans (Daily, Weekly, Monthly)",
  "Professionally maintained & tuned instruments",
  "Quick delivery & pickup services",
  "Affordable pricing with no hidden fees",
];

export default function AboutUs() {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Image Side */}
          <div className="relative mx-auto w-full max-w-[680px]">
            {/* top left circle */}
            <div className="absolute -left-4 -top-4 z-0 h-16 w-16 rounded-full bg-[#f3e3a5] sm:h-20 sm:w-20" />

            {/* bottom right circle */}
            <div className="absolute -bottom-8 right-0 z-0 h-24 w-24 rounded-full bg-[#cfcfcf] sm:h-28 sm:w-28 md:h-32 md:w-32" />

            {/* orange frame */}
            <div className="absolute bottom-[-18px] left-[18px] right-[-18px] top-[18px] z-0 bg-[#f4a100] sm:bottom-[-24px] sm:left-[24px] sm:right-[-24px] sm:top-[24px]" />

            {/* image */}
            <div className="relative z-10 aspect-[1.12/1] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
                alt="Construction worker with equipment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Content Side */}
          <div className="max-w-[620px]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f4a100]">
              About Us
            </p>

            <h2 className="mt-4 max-w-[620px] text-3xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Delivering Equipment Solutions with Confidence
            </h2>

            <p className="mt-6 text-base leading-8 text-[#1f2937] sm:text-lg">
              We are a trusted provider of high-quality equipment rental
              solutions for construction and industrial projects. Our fleet is
              regularly inspected and maintained to ensure safety, reliability,
              and peak performance.
            </p>

            <div className="mt-8 space-y-5">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efe2ac] text-[#2f3b4c]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-base font-medium leading-7 text-[#4b5563] sm:text-[18px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button className="h-12 min-w-[190px] rounded-md bg-[#f4a100] px-8 text-base font-semibold text-white hover:bg-[#d99000]">
                See Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
