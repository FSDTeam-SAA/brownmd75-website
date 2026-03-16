"use client";

import { useState } from "react";
import { Minus, Plus, MessageSquare } from "lucide-react";

const faqData = [
  {
    question: "What types of equipment do you offer for rent?",
    answer:
      "We offer a wide range of construction and industrial equipment including excavators, loaders, cranes, generators, and specialized tools. All equipment is regularly inspected and maintained for optimal performance.",
  },
  {
    question: "How can I request a rental quote?",
    answer:
      "You can request a rental quote by contacting our team, submitting an inquiry through the website, or selecting your preferred equipment and rental duration.",
  },
  {
    question: "Do you offer short-term and long-term rentals?",
    answer:
      "Yes, we provide flexible rental plans including daily, weekly, and monthly options based on your project needs.",
  },
  {
    question: "What happens if the equipment breaks down?",
    answer:
      "If equipment breaks down, our support team will assist promptly with troubleshooting, repair, or replacement to minimize downtime.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major payment methods including bank transfer, cards, and other approved payment options depending on your location.",
  },
];

export default function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-[#f7f7f7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4a100]">
            Frequently Asked Questions
          </p>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#111827] md:text-5xl">
            Clear Information to Rent With Confidence
          </h1>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_0.95fr]">
          {/* FAQ Left */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#ececec] bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
                  >
                    <div>
                      <h3 className="text-lg font-extrabold leading-snug text-[#111827]">
                        {item.question}
                      </h3>

                      {isOpen && (
                        <p className="mt-3 max-w-4xl text-base leading-8 text-[#374151]">
                          {item.answer}
                        </p>
                      )}
                    </div>

                    <span className="mt-1 shrink-0 text-[#111827]">
                      {isOpen ? (
                        <Minus size={22} strokeWidth={1.8} />
                      ) : (
                        <Plus size={22} strokeWidth={1.8} />
                      )}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Card */}
          <div className="rounded-2xl border border-[#ececec] bg-white px-6 py-10 shadow-sm md:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-sm bg-[#f4a100] text-white">
              <MessageSquare size={30} strokeWidth={2} />
            </div>

            <div className="mt-10 text-center lg:text-left">
              <h3 className="text-2xl font-extrabold leading-tight text-[#111827]">
                Do you have more questions?
              </h3>

              <p className="mt-5 text-base leading-7 text-[#374151]">
                End-to-end payments and financial management in a single
                solution. Meet the right platform to help realize.
              </p>
            </div>

            <div className="mt-12">
              <button
                type="button"
                className="w-full rounded-md bg-[#f4a100] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
