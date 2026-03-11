"use client";

import Image from "next/image";

const steps = [
  {
    id: "01",
    title: "Discover the Right Equipment",
    description:
      "Explore a powerful marketplace of premium machinery tailored for every project size. With smart search and advanced filters, finding the exact equipment you need takes only moments - no endless browsing, no guesswork.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Book with Confidence",
    description:
      "Review detailed specifications, transparent pricing, and real-time availability before making your selection. Secure your equipment online in just a few clicks with a seamless, reliable checkout experience designed for professionals.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Delivered to Your Job Site",
    description:
      "Sit back while we take care of the logistics. Your equipment arrives on time, ready to perform - delivered directly to your worksite so you can stay focused on productivity and results.",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full  py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-10 md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4a100] sm:text-sm">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
            Process of Getting Service
          </h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={step.id}
                className={`grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16 ${
                  isReverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* text */}
                <div className="max-auto container">
                  <div className="flex items-center gap-2">
                    <span className="text-[30px] font-extrabold leading-none text-[#f4a100] md:text-[38px]">
                      {step.id}.
                    </span>

                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-[#1f2937] md:text-xl">
                        {step.title}
                      </h3>
                      <span className="mt-1 h-[3px] w-40 bg-[#f4a100]" />
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-7 text-[#2f2f2f] sm:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* image */}
                <div
                  className={`relative w-full ${
                    index === 0
                      ? "max-auto container"
                      : index === 1
                        ? "max-auto container"
                        : "max-auto container"
                  } ${isReverse ? "lg:ml-auto" : ""}`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-sm">
                    <div
                      className={`relative w-full ${
                        index === 1 ? "aspect-[1.28/1]" : "aspect-[1.5/1]"
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
