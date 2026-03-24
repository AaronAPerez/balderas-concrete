"use client";

import { useState } from "react";
import Link from "next/link";
import { contactInfo } from "@/src/lib/constants";
import { trackPhoneClick, trackCTAClick, trackEvent } from "@/src/components/analytics/GoogleAnalytics";

/**
 * FloatingContactButton - Floating action buttons for quick contact
 *
 * Features:
 * - Fixed position at bottom-right corner (visible on all screen sizes)
 * - Expandable menu with Call and Message options
 * - Subtle pulse animation to draw attention
 * - Accessible with proper ARIA labels and focus management
 * - Analytics tracking for all interactions
 * - Touch-friendly sizing (44px+ touch targets)
 */
export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the expanded menu state
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent("floating_contact_open", "Engagement", "mobile-fab");
    }
  };

  /**
   * Handle phone call click - tracks analytics and lets browser handle tel: link
   */
  const handleCallClick = () => {
    trackPhoneClick("floating-button");
    setIsOpen(false);
  };

  /**
   * Handle message click - tracks analytics and navigates to contact form
   */
  const handleMessageClick = () => {
    trackCTAClick("Message", "floating-button");
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay when menu is open - allows click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating button container - visible on all screen sizes */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded action buttons - shown when menu is open */}
        <div
          className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Message Button - links to contact form */}
          <Link
            href="/contact"
            onClick={handleMessageClick}
            className="flex items-center justify-center w-14 h-14 bg-white text-brand rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all"
            aria-label="Send a message"
          >
            {/* Message Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Link>

          {/* Call Button */}
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            onClick={handleCallClick}
            className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 active:scale-95 transition-all"
            aria-label={`Call ${contactInfo.phone}`}
          >
            {/* Phone Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </a>
        </div>

        {/* Main FAB (Floating Action Button) - toggles menu */}
        <div className="relative">
          {/* Subtle pulse ring animation - only shows when menu is closed */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full bg-brand/30 animate-pulse-ring"
              style={{
                animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          )}
          <style jsx>{`
            @keyframes pulse-ring {
              0%, 100% {
                transform: scale(1);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.15);
                opacity: 0;
              }
            }
          `}</style>
          <button
            onClick={toggleMenu}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-300 cursor-pointer ${
              isOpen
                ? "bg-slate-700 rotate-45"
                : "bg-brand hover:bg-brand-light"
            }`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close contact menu" : "Open contact options"}
            aria-controls="floating-contact-menu"
          >
          {/* Plus/Close Icon - rotates when open */}
          <svg
            className="w-7 h-7 text-white transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            )}
          </svg>
          </button>
        </div>
      </div>
    </>
  );
}
