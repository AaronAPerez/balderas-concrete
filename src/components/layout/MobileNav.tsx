"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/src/store/uiStore";
import { navigation, contactInfo } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/Button";
import { useEffect } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const { mobileNavOpen, closeMobileNav } = useUIStore();

  // Close nav when route changes
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  if (!mobileNavOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl md:hidden">
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={closeMobileNav}
              className="inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-700 hover:text-accent hover:bg-slate-100 transition-colors"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-md text-lg font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-brand text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/contact" className="w-full">
                Get an Estimate
              </Button>
            </div>
          </nav>

          {/* Contact info at bottom */}
          <div className="border-t border-slate-200 p-4 space-y-3">
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex items-center gap-3 text-slate-700 hover:text-accent transition-colors py-2"
            >
              <svg
                className="w-5 h-5"
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
              <span className="font-medium">{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 text-slate-700 hover:text-accent transition-colors py-2"
            >
              <svg
                className="w-5 h-5"
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
              <span className="font-medium">{contactInfo.email}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
