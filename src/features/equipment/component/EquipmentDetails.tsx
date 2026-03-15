"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEquipmentById } from "../hooks/useEquipment";
import { EquipmentItem } from "./Equipment";
import { Star } from "lucide-react";
import ReviewList from "../../review/component/ReviewList";
import ReviewForm from "../../review/component/ReviewForm";

export default function EquipmentDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useEquipmentById(id as string);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedDuration, setSelectedDuration] = useState("hour");

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#f4a100] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-500">
        <p>Failed to load equipment details. Please try again later.</p>
      </div>
    );
  }

  const equipment: EquipmentItem = data.data;
  const images =
    equipment.images && equipment.images.length > 0
      ? equipment.images
      : [{ url: "/images/placeholder.png" }];

  const prices = [
    { label: "Hour", value: equipment.price_per_hour, key: "hour" },
    { label: "Day", value: equipment.price_per_day, key: "day" },
    { label: "Week", value: equipment.price_per_week, key: "week" },
    { label: "Month", value: equipment.price_per_month, key: "month" },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8">
              <Image
                src={images[activeImage]?.url || "/images/placeholder.png"}
                alt={equipment.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={img.url}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === index
                      ? "border-[#f4a100]"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${equipment.title} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-[#1d2433] md:text-4xl">
              {equipment.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {equipment.description}
            </p>

            {/* Categories & Reviews */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100">
                  <Image
                    src={
                      equipment.category?.image?.url ||
                      "/images/placeholder.png"
                    }
                    alt={equipment.category?.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[17px] font-bold text-[#1d2433]">
                  Category :{" "}
                  <span className="text-[#f4a100]">
                    {equipment.category?.title || "N/A"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={`hero-star-${star}`}
                      size={16}
                      className={
                        star <= Math.floor(equipment.rating)
                          ? "fill-[#f4a100] text-[#f4a100]"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500">
                  ({equipment.totalReviews} Reviews)
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#1d2433]">
                  $ Price :
                </span>
                <span className="text-lg font-bold text-gray-600">
                  {equipment.price_per_hour.toFixed(2)}/Hour
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1d2433]">
                  Status:
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    equipment.is_available
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {equipment.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1d2433]">
                  Available:
                </span>
                <span className="text-sm font-bold text-gray-600">
                  {equipment.quantity} Units
                </span>
              </div>
            </div>

            {/* Duration Selector */}
            {/* <div className="mt-8 grid grid-cols-4 gap-3">
              {prices.map((price) => (
                <button
                  key={price.key}
                  onClick={() => setSelectedDuration(price.key)}
                  className={`rounded-md border py-3 text-sm font-semibold transition-all ${
                    selectedDuration === price.key
                      ? "border-[#f4a100] bg-[#f4a100] text-white"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {price.label}
                </button>
              ))}
            </div> */}

            <button className="mt-8 w-full rounded-md bg-[#f4a100] py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.98]">
              Book
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-b border-gray-100">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-8 py-3 text-sm font-bold transition-all rounded-t-md ${
                activeTab === "description"
                  ? "bg-[#f4a100] text-white"
                  : "bg-white text-gray-600 border border-gray-100 border-b-0"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={`px-8 py-3 text-sm font-bold transition-all rounded-t-md ${
                activeTab === "review"
                  ? "bg-[#f4a100] text-white"
                  : "bg-white text-gray-600 border border-gray-100 border-b-0"
              }`}
            >
              Review
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-12">
          {activeTab === "description" ? (
            <div className="space-y-16">
              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#f4a100]">
                  Key Features
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1d2433]">
                      High Efficiency Motor
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Equipped with a powerful 4kW motor, the pump delivers
                      strong water pressure and efficient pumping performance,
                      ensuring smooth operation for extended periods.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1d2433]">
                      Reliable Water Flow
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      With an operating capacity of 4 liters per minute, the
                      pump maintains consistent water movement suitable for
                      drainage, irrigation, and construction needs.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1d2433]">
                      Extended Reach
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      The pump provides a maximum reach of 7 meters, allowing
                      effective water transfer across short to medium distances.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1d2433]">
                      Durable Construction
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Manufactured with high-quality industrial materials, the
                      pump is designed to withstand harsh environmental
                      conditions and continuous operation.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1d2433]">
                      Trusted Brand Engineering
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Built under the {equipment.brand} brand, known for
                      durability and reliability in industrial equipment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#f4a100]">
                  Technical Specifications
                </h2>
                <div className="mt-8 overflow-hidden rounded-xl border border-gray-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-sm font-bold text-[#1d2433]">
                          Specifications
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-[#1d2433]">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Model
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {equipment.model}
                        </td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Brand
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {equipment.brand}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Manufacture Year
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {equipment.manufacture_year}
                        </td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Rated Power
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          4 kW/hour
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Maximum Reach
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          7 Meter
                        </td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Operating Capacity
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          4 Litre/Minute
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Delivery Charge
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          ${equipment.deliveryCharge}
                        </td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Setup Charge
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          ${equipment.setupCharge}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          Total Taxes
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          ${equipment.total_taxes}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rental Pricing */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#f4a100]">
                  Rental Pricing
                </h2>
                <div className="mt-8 overflow-hidden rounded-xl border border-gray-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-sm font-bold text-[#1d2433]">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-[#1d2433]">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {prices.map((p, idx) => (
                        <tr
                          key={p.key}
                          className={idx % 2 === 0 ? "" : "bg-gray-50/50"}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-600">
                            {p.label}ly
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-600">
                            ${p.value.toFixed(2)}/{p.label}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ideal Applicants */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#f4a100]">
                  Ideal Applicants
                </h2>
                <p className="mt-6 text-gray-600 font-medium">
                  This {equipment.title} is Suitable For Multiple Industries And
                  Job Site Requirements:
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Construction Site Water Removal",
                    "Agricultural Irrigation Systems",
                    "Industrial Water Circulation",
                    "Flood Drainage Operations",
                    "Tank And Reservoir Water Transfer",
                  ].map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-4 text-sm font-medium text-gray-600"
                    >
                      <span>{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <ReviewList />
              <ReviewForm equipmentId={id as string} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
