"use client";

export default function ContactUs() {
  return (
    <section className="bg-[#f7f7f7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4a100]">
            Contact Us
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#111827] md:text-5xl">
            Get in Touch With Us
          </h1>

          <form className="mt-10 space-y-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-base font-semibold text-[#111827]"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="h-14 w-full rounded-md border border-[#d1d5db] bg-white px-4 text-base text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#f4a100]"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-base font-semibold text-[#111827]"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="h-14 w-full rounded-md border border-[#d1d5db] bg-white px-4 text-base text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#f4a100]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base font-semibold text-[#111827]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-14 w-full rounded-md border border-[#d1d5db] bg-white px-4 text-base text-[#111827] outline-none transition placeholder:text-[#94a3b8] focus:border-[#f4a100]"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-base font-semibold text-[#111827]"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="US  +1) (555) 000-0000"
                className="h-14 w-full rounded-md border border-[#d1d5db] bg-white px-4 text-base text-[#111827] outline-none transition placeholder:text-[#94a3b8] focus:border-[#f4a100]"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-base font-semibold text-[#111827]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full rounded-md border border-[#d1d5db] bg-white px-4 py-4 text-base text-[#111827] outline-none transition placeholder:text-[#94a3b8] focus:border-[#f4a100]"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <input
                id="privacy"
                type="checkbox"
                className="h-4 w-4 rounded border border-[#d1d5db] accent-[#f4a100]"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-[#6b7280] md:text-base"
              >
                You agree to our friendly{" "}
                <span className="font-semibold text-[#111827] underline">
                  privacy policy
                </span>
                .
              </label>
            </div>

            {/* Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="inline-flex h-12 min-w-[145px] items-center justify-center rounded-md bg-[#f4a100] px-8 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
