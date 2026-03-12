"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    review:
      '"SoundRent saved my gig! My amp broke down hours before the show, and they delivered a replacement within 2 hours. Incredible service!"',
  },
  {
    id: 2,
    name: "Sarah Miller",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    review:
      '"Renting a grand piano for our wedding was seamless. The team handled delivery and setup perfectly. Highly recommended!"',
  },
  {
    id: 3,
    name: "David Chen",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    review: `"As a student, I couldn't afford a pro saxophone. SoundRent allowed me to practice on a high-end instrument for a fraction of the cost."`,
  },
  {
    id: 4,
    name: "Emma Watson",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    review:
      '"The booking process was simple and fast. Great support team and very reliable instruments."',
  },
  {
    id: 5,
    name: "Michael Lee",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=200&auto=format&fit=crop",
    review:
      '"Excellent service from start to finish. Delivery was on time and the equipment quality was top-notch."',
  },
];

export default function Review() {
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
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="h-full rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#f4a100] text-[#f4a100]"
                    />
                  ))}
                </div>

                <p className="min-h-[95px] text-[15px] leading-6 text-[#6b7280]">
                  {review.review}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-[15px] font-bold text-[#111827]">
                    {review.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-swiper-pagination mt-8 flex items-center justify-center gap-2" />

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
