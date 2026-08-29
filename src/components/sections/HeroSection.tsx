"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const DEFAULT_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop";
const DEFAULT_TITLE = "Lqa Ddar dial a7lamek";
const DEFAULT_SUBTITLE = "Accès exclusif l'a7san villas, appartements de luxe, bureaux premium, w terrains f l'Maroc. 3ich l'excellence immobilière m3a Mehdi Moumou.";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  bgImage?: string;
}

export function HeroSection({ title, subtitle, bgImage }: HeroSectionProps) {
  const displayTitle = title || DEFAULT_TITLE;
  const displaySubtitle = subtitle || DEFAULT_SUBTITLE;
  const displayBg = bgImage || DEFAULT_BG;
  return (
    <section id="home" className="relative min-h-[100svh] min-h-[100dvh] w-full overflow-hidden bg-black flex flex-col justify-end sm:justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayBg}
          alt="Luxury Real Estate Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/60 sm:to-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 pb-16 pt-28 sm:py-0">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight drop-shadow-md">
              {displayTitle}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed drop-shadow"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a href="#properties" className="w-full sm:w-auto">
              <Button size="lg" variant="gold" className="group uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14 px-6 sm:px-8 w-full touch-manipulation font-semibold shadow-lg shadow-yellow-900/20">
                Chouf les propriétés
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="https://wa.me/212700111676?text=Bonjour%20Mehdi%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20propri%C3%A9t%C3%A9s." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="group uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14 px-6 sm:px-8 border-white/30 backdrop-blur-md bg-black/40 text-white hover:bg-white hover:text-black w-full touch-manipulation font-semibold">
                <MessageCircle className="mr-2 h-4 w-4" />
                Twasal m3ana f WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator (Hidden on small mobile to avoid layout crowding) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 z-10"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50">Hbet</span>
        <div className="h-12 sm:h-16 w-[1px] bg-white/20 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 w-full h-1/2 bg-[var(--color-gold)]"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
