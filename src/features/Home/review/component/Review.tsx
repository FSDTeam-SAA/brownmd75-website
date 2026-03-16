"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useTopRatedReviews } from "@/features/review/hooks/useReview";
import { TReview } from "@/features/review/api/review.api";

export default function Review() {
  const { data, isLoading } = useTopRatedReviews();
  const reviews = data?.data?.result || [];
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4a100] sm:text-sm">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
            What Users Say
          </h2>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-lg font-medium text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center text-lg font-medium text-gray-500">
            No reviews available.
          </div>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".custom-swiper-pagination",
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className="review-swiper"
            >
              {reviews.map((review: TReview) => {
                const userName = review.user?.name || "Anonymous User";
                const userImage =
                  review.user?.profileImage ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop";

                return (
                  <SwiperSlide key={review._id}>
                    <div className="h-full rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                      <div className="mb-4 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-[#f4a100] text-[#f4a100]" : "text-gray-200"}`}
                          />
                        ))}
                      </div>

                      <p className="min-h-[95px] text-[15px] leading-6 text-[#6b7280]">
                        &quot;{review.comment}&quot;
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
                          <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <h3 className="text-[15px] font-bold text-[#111827]">
                          {userName}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="custom-swiper-pagination mt-8 flex items-center justify-center gap-2" />
          </>
        )}

        <style jsx global>{`
          .custom-bullet {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: #d1d5db;
            display: inline-block;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .custom-bullet-active {
            width: 20px;
            height: 10px;
            border-radius: 9999px;
            background: #f4a100;
          }

          .custom-swiper-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </section>
  );
}
