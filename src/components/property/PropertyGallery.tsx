"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { PropertyImage } from "@/lib/properties";

export function PropertyGallery({ images }: { images: PropertyImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden cursor-pointer group rounded-sm"
          onClick={() => setIsLightboxOpen(true)}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Image
              src={images[currentIndex].image_url}
              alt="Property view"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={currentIndex === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white uppercase tracking-widest text-sm font-semibold">Chouf la galerie</span>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-24 h-24 md:w-32 md:h-24 shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all ${idx === currentIndex ? "border-2 border-[var(--color-gold)]" : "opacity-60 hover:opacity-100"}`}
              >
                <Image
                  src={img.image_url}
                  alt="Thumbnail"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button onClick={prevImage} className="absolute left-4 md:left-12 p-3 bg-white/5 hover:bg-[var(--color-gold)] text-white rounded-full transition-colors backdrop-blur-md">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl px-4 md:px-0 h-[85vh]">
              <Image
                src={images[currentIndex].image_url}
                alt="Property lightbox"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </div>

            <button onClick={nextImage} className="absolute right-4 md:right-12 p-3 bg-white/5 hover:bg-[var(--color-gold)] text-white rounded-full transition-colors backdrop-blur-md">
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 text-white/50 text-sm tracking-widest">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
