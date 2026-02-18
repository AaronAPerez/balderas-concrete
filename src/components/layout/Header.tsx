"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/src/store/uiStore";
import { navigation, siteConfig, contactInfo } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const { toggleMobileNav, mobileNavOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      {/* Top bar with contact info - hidden on mobile */}
      <div className="hidden sm:block bg-brand text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="hover:text-accent transition-colors"
          >
            Call: {contactInfo.phone}
          </a>
          <span>{contactInfo.hours}</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">BC</span>
            </div>
            <span className="font-bold text-xl text-brand hidden sm:block">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === item.href
                    ? "text-accent"
                    : "text-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA and mobile menu button */}
          <div className="flex items-center gap-4">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Get an Estimate
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileNav}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-700 hover:text-accent hover:bg-slate-100 transition-colors"
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
