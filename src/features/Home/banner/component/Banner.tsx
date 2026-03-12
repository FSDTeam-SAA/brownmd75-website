"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FindMyRentals from "./FindMyRentals";

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      } as const,
    },
  };

  return (
    <section className="relative h-screen w-full font-(family-name:--font-poppins) ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 h-[80vh]">
        <Image
          src="/images/banner.png"
          alt="Hero Banner"
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 flex h-full flex-col items-center justify-between px-4 pb-12 pt-32 text-center text-white md:pb-20 mx-auto container"
      >
        <div className="flex flex-col items-center mt-8">
          <motion.h1
            variants={itemVariants}
            className="max-w-6xl text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Top-Quality Instruments <br />
            Ready To Rent At{" "}
            <span className="text-amber-500">Flexible Rates</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl"
          >
            From guitars to grand pianos — find the perfect instrument for
            practice, performance, or recording without the heavy investment.
          </motion.p>
        </div>

        {/* Search Card Section */}
        <FindMyRentals />
      </motion.div>
    </section>
  );
}
