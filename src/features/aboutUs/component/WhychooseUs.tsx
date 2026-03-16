"use client";

import { Users, TrendingUp, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Operational Excellence",
    desc: "We follow streamlined processes and strict quality standards to ensure every rental runs smoothly. From inspection to dispatch.",
  },
  {
    icon: TrendingUp,
    title: "Performance-Driven Fleet",
    desc: "Our modern, well-maintained equipment is selected for durability, power, and reliability ensuring optimal performance on every job site.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We understand that time is critical. That's why we prioritize prompt delivery and pickup to keep your project on schedule without delays.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Our experienced team is always ready to assist from equipment selection to technical guidance providing dependable support whenever you need it.",
  },
];

export default function WhychooseUs() {
  return (
    <section className="bg-[#f7f7f7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4a100]">
            Why Choose Us
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#111827] md:text-5xl">
            Delivering Reliable Equipment and Ensuring Safety
          </h1>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-xl bg-white p-7 shadow-sm border border-gray-200 relative"
              >
                {/* top orange border */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#f4a100] rounded-t-xl"></div>

                {/* Icon */}
                <div className="mb-5 text-[#f4a100]">
                  <Icon size={36} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#111827]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
