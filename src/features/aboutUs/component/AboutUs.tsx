import Hero from "@/components/sheared/Hero";
import React from "react";
import AboutOurCompany from "./AboutOurCompany";
import WhychooseUs from "./WhychooseUs";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

export default function AboutUs() {
  return (
    <div>
      <Hero
        image="/images/hero-3.png"
        heading="Built on Trust, Driven by Performance"
        description="From small tools to heavy machinery, we ensure every piece of equipment meets the highest standards of safety and performance."
      />
      <AboutOurCompany />
      <WhychooseUs />
      <FrequentlyAskedQuestions />
    </div>
  );
}
