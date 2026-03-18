"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/src/store/uiStore";
import { navigation, contactInfo } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/Button";
import { trackPhoneClick, trackCTAClick } from "@/src/components/analytics/GoogleAnalytics";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const { toggleMobileNav, mobileNavOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border border-[#8C8C8C]">
      {/* <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border border-slate-200 dark:bg-[#121212]/95  dark:border-slate-700"> */}
      {/* Top bar with contact info - hidden on mobile */}
      <div className="hidden sm:block bg-[#6C6C6C] text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1 flex justify-between items-center text-white font-medium">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="hover:text-white/80 transition-colors"
            onClick={() => trackPhoneClick("header-topbar")}
          >
            Call: {contactInfo.phone}
          </a>
          <span>{contactInfo.hours}</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white/95">
        <div className="flex h-15 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/logo/logo.png"
              alt="Balderas Concrete"
              width={56}
              height={56}
              className="drop-shadow-sm h-auto"
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

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md font-medium transition-colors hover:text-[#8C8C8C] ${pathname === item.href ? "text-[#1A2A3A]" : "text-slate-700"
                  // className={`text-md font-medium transition-colors hover:text-[#8C8C8C] ${pathname === item.href ? "text-[#8C8C8C]" : "text-slate-700 dark:text-slate-300"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA and mobile menu button */}
          <div className="flex items-center gap-4">
            <Button
              href="/contact"
              size="sm"
              className="hidden sm:inline-flex bg-[#1A2A3A] text-white hover:bg-[#1A2A3A]/90"
              onClick={() => trackCTAClick("Get a Quote", "header")}
            >
              Get a Quote
            </Button>

            <button
              type="button"
              onClick={toggleMobileNav}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-700 hover:text-shadow-[#1A2A3A]-600 hover:bg-slate-100 transition-colors"
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
