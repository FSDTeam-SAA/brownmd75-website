"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Terms & Condition", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact Us", href: "#" },
];

const accountLinks = [
  { label: "Sign Up", href: "#" },
  { label: "Sign In", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f4f1] py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Left info */}
          <div>
            <h3 className="text-[28px] font-extrabold leading-none text-[#111827]">
              MachineM8.com
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#111827]" />
                <p className="text-[16px] leading-7 text-[#2f2f2f]">
                  8819 Ohio St. South Gate,
                  <br />
                  CA 90280
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#111827]" />
                <a
                  href="mailto:ourstudio@hello.com"
                  className="text-[16px] text-[#2f2f2f] transition hover:text-[#f4a100]"
                >
                  Ourstudio@hello.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#111827]" />
                <a
                  href="tel:+13866883295"
                  className="text-[16px] text-[#2f2f2f] transition hover:text-[#f4a100]"
                >
                  +1 386-688-3295
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[24px] font-extrabold text-[#111827]">
              Company
            </h4>
            <ul className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[16px] text-[#2f2f2f] transition hover:text-[#f4a100]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[24px] font-extrabold text-[#111827]">
              Account
            </h4>
            <ul className="mt-6 space-y-4">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[16px] text-[#2f2f2f] transition hover:text-[#f4a100]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[24px] font-extrabold text-[#111827]">
              Join a Newsletter
            </h4>

            <div className="mt-6">
              <label
                htmlFor="email"
                className="mb-3 block text-[16px] text-[#2f2f2f]"
              >
                Your Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="h-12 rounded-xl border border-[#d6d6d6] bg-white px-4 text-[15px] placeholder:text-[#9ca3af] focus-visible:ring-1 focus-visible:ring-[#f4a100]"
              />

              <Button className="mt-5 h-12 rounded-md bg-[#f4a100] px-6 text-[15px] font-semibold text-white hover:bg-[#db9200]">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
