import Equipment from "@/features/equipment/component/Equipment";
import Hero from "@/components/sheared/Hero";

export default function page() {
  return (
    <div>
      <Hero
        image="/images/hero-1.jpg"
        heading="Reliable Equipment. Flexible Rentals."
        description="Browse detailed specifications, real-time availability, and transparent pricing to choose the perfect equipment for your project."
      />
      <Equipment />
    </div>
  );
}
