"use client";

import Link from "next/link";
import {
  siteConfig,
  contactInfo,
  navigation,
  services,
  serviceAreas,
  serviceAreaRadius,
} from "@/src/lib/constants";
import { trackPhoneClick, trackEmailClick } from "@/src/components/analytics/GoogleAnalytics";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6B6B6B]/10 backdrop-blur-sm border border-slate-200">
    {/* <footer className="bg-white/95 backdrop-blur-sm border border-slate-200 dark:bg-[#121212]/95  dark:border-slate-700"> */}
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 ">
          {/* Company info */}
          <div>
 {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/logo/logo.png"
              alt="Balderas Concrete"
              width={56}
              height={56}
              className="drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#1A2A3A] hidden sm:block drop-shadow-sm">
                BALDERAS
              </span>
              <span className="text-[#6B7280] text-sm font-semibold -mt-1 hidden sm:block drop-shadow-sm">
                CONCRETE
              </span>
            </div>
          </Link>
            <p className="text-slate-600 text-sm leading-relaxed pt-4 pb-5">
              {siteConfig.tagline} Serving the greater Houston area with
              quality concrete work for over 15 years.
            </p>
            <p className="text-slate-600 text-sm">{contactInfo.hours}</p>
          </div>

          {/* Services links */}
          <div>
            <h3 className="font-semibold text-lg pb-5 text-[#0F0F0F]">Our Services</h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-slate-600 hover:text-accent transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg pb-5 text-[#0F0F0F]">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-accent transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg pb-5 text-[#0F0F0F]">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="flex items-start gap-3 text-slate-600 hover:text-accent transition-colors text-sm"
                  onClick={() => trackPhoneClick("footer")}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-slate-600 hover:text-accent transition-colors text-sm"
                  onClick={() => trackEmailClick("footer")}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-600 text-sm">
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{contactInfo.address.full}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas */}
        <div className="mt-14 pt-10 border-t border-slate-700">
          <h3 className="font-semibold text-lg pb-5 text-[#0F0F0F]">Service Areas</h3>
          <p className="text-slate-700 text-sm pb-2">
            We service anything within {serviceAreaRadius}.
          </p>
          <p className="text-slate-700 text-sm">
            Including: {serviceAreas.join(" • ")}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-700">
            <p>
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
