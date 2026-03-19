"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLang } from "@/lib/i18n";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectRatio?: string;
}

export function ImageCarousel({
  images,
  alt,
  aspectRatio = "aspect-[4/5]",
}: ImageCarouselProps) {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0) {
        setCurrentIndex(images.length - 1);
      } else if (index >= images.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(index);
      }
    },
    [images.length]
  );

  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(currentIndex - 1);
    },
    [currentIndex, goTo]
  );

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(currentIndex + 1);
    },
    [currentIndex, goTo]
  );

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) {
      goTo(currentIndex - 1);
    } else if (delta < -50) {
      goTo(currentIndex + 1);
    }
    setTouchStartX(null);
  }

  // No images -- show placeholder
  if (images.length === 0) {
    return (
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <ImagePlaceholder />
      </div>
    );
  }

  // Single image -- no controls
  if (!hasMultiple) {
    return (
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Multiple images -- full carousel
  return (
    <div
      className={`${aspectRatio} relative overflow-hidden group`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides track */}
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            draggable={false}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        type="button"
        onClick={goPrev}
        aria-label={t("carousel.prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-espresso-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white hover:shadow-md"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={goNext}
        aria-label={t("carousel.next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-espresso-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white hover:shadow-md"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            aria-label={`${t("carousel.goto")} ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === currentIndex
                ? "bg-white w-2 h-2 shadow-sm"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
