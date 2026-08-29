"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PropertyData {
  id: string | number;
  slug: string;
  title: string;
  type: string;
  price: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  image: string;
}

interface FeaturedPropertiesSectionProps {
  properties: PropertyData[];
}

export function FeaturedPropertiesSection({ properties }: FeaturedPropertiesSectionProps) {
  return (
    <section
      id="properties"
      className="bg-[#050505] py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[var(--color-gold)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Portfolio exclusif
            </h2>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              A7san les propriétés
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <Button
              variant="outline"
              className="uppercase tracking-widest text-xs h-11 px-5 border-white/20 text-white hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)] active:scale-95 transition-all touch-manipulation"
            >
              Chouf ga3 les propriétés
            </Button>
          </motion.div>
        </div>

        {/* ─── Responsive Grid ─────────────────────────────────────────
            mobile  (< 640px)  : 2 columns
            tablet  (640–1023) : 3 columns
            desktop (1024px+)  : 4 columns
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              /* flex column + h-full makes every card in the same row
                 stretch to the tallest sibling */
              className="flex flex-col h-full"
            >
              <div className="flex flex-col h-full overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] hover:border-[var(--color-gold)]/50 transition-all duration-500 group touch-manipulation">

                {/* ── Image (1:1 square on mobile, 4:3 on larger) ── */}
                <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden shrink-0">
                  {/* Property type badge */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 border border-white/10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium">
                      {property.type}
                    </span>
                  </div>
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* ── Card Body ── */}
                {/* flex-1 pushes the button to the bottom on all screen sizes */}
                <div className="flex flex-col flex-1 p-3 sm:p-5">

                  {/* Price */}
                  <p className="font-serif text-sm sm:text-xl font-bold text-[var(--color-gold)] mb-1 truncate">
                    {property.price}
                  </p>

                  {/* Title — max 2 lines, no overflow */}
                  <h4 className="font-medium text-xs sm:text-base text-white mb-1 line-clamp-2 leading-snug min-h-[2.5em]">
                    {property.title}
                  </h4>

                  {/* Location — hidden on the smallest phones to save space */}
                  <div className="hidden sm:flex items-center text-white/50 text-xs mb-3 min-w-0">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Stats row — hidden on mobile, shown on sm+ */}
                  {(property.area || property.beds > 0 || property.baths > 0) && (
                    <div className="hidden sm:flex items-center gap-3 py-3 border-t border-white/10 text-white/70 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-[var(--color-gold)]" />
                        {property.area}
                      </span>
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3 h-3 text-[var(--color-gold)]" />
                          {property.beds}
                        </span>
                      )}
                      {property.baths > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3 text-[var(--color-gold)]" />
                          {property.baths}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Spacer pushes button to bottom */}
                  <div className="flex-1" />

                  {/* CTA Button — full width, touch friendly (min 44px tall) */}
                  <Link href={`/property/${property.slug}`} className="block mt-2">
                    <Button className="w-full bg-white/5 hover:bg-[var(--color-gold)] hover:text-black active:scale-95 text-white rounded-sm h-10 sm:h-11 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 touch-manipulation">
                      <span className="hidden sm:inline">Chouf les détails</span>
                      <span className="sm:hidden">Voir</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
