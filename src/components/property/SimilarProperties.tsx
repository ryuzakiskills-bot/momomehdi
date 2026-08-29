import Link from "next/link";
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getSimilarProperties } from "@/lib/properties";

export async function SimilarProperties({
  propertyId,
  city,
  type,
}: {
  propertyId: string;
  city: string;
  type: string;
}) {
  const properties = await getSimilarProperties(propertyId, city, type);

  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-t border-white/10 bg-[#050505]">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[var(--color-gold)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 text-center">
          Portfolio
        </h2>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12 text-center">
          Propriétés Similaires
        </h3>

        {/* Responsive equal-height grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {properties.map((property: any) => (
            <div key={property.id} className="flex flex-col h-full">
              <div className="flex flex-col h-full overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] hover:border-[var(--color-gold)]/50 transition-all duration-500 group touch-manipulation">
                
                {/* Responsive Image Aspect Ratio */}
                <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden shrink-0">
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 border border-white/10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium">
                      {property.type}
                    </span>
                  </div>
                  <Image
                    src={
                      property.property_images?.[0]?.image_url ||
                      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                    }
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-3 sm:p-5">
                  <p className="font-serif text-sm sm:text-xl font-bold text-[var(--color-gold)] mb-1 truncate">
                    MAD {property.price.toLocaleString()}
                  </p>
                  
                  <h4 className="font-medium text-xs sm:text-base text-white mb-1 line-clamp-2 leading-snug min-h-[2.5em]">
                    {property.title}
                  </h4>

                  <div className="hidden sm:flex items-center text-white/50 text-xs mb-3 min-w-0">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                    <span className="truncate">{property.city}</span>
                  </div>

                  {/* Stats Row (hidden on small phones) */}
                  <div className="hidden sm:flex items-center gap-3 py-3 border-t border-white/10 text-white/70 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3 h-3 text-[var(--color-gold)]" />
                      {property.surface}
                    </span>
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3 text-[var(--color-gold)]" />
                        {property.bedrooms}
                      </span>
                    )}
                    {property.bathrooms > 0 && (
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-[var(--color-gold)]" />
                        {property.bathrooms}
                      </span>
                    )}
                  </div>

                  <div className="flex-1" />

                  <Link href={`/property/${property.slug}`} className="block mt-2">
                    <Button className="w-full bg-white/5 hover:bg-[var(--color-gold)] hover:text-black active:scale-95 text-white rounded-sm h-10 sm:h-11 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 touch-manipulation">
                      <span className="hidden sm:inline">Chouf les détails</span>
                      <span className="sm:hidden">Voir</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
