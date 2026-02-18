"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({
  images,
  title = "Our Work",
  subtitle = "Browse our portfolio of completed concrete projects.",
  showHeading = true,
  columns = 3,
}: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <section className="py-16 lg:py-24">
        <Container>
          {showHeading && <SectionHeading title={title} subtitle={subtitle} />}
          <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4 lg:gap-6`}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image.src)}
                className="relative aspect-4/3 overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
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
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
              sizes="100vw"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
