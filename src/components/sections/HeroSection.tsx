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
    <section 
      id="home" 
      className="relative min-h-[100svh] min-h-[100dvh] w-full max-w-[100vw] overflow-hidden bg-black flex flex-col justify-center items-center"
    >
      {/* Background Image with Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={displayBg}
          alt="Luxury Real Estate Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/55 sm:to-black/20" />
      </div>

      {/* Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 relative z-10 pt-20 pb-10 sm:py-0 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h1 
              className="font-serif font-bold text-white tracking-tight"
              style={{
                fontSize: "clamp(34px, 9.5vw, 54px)",
                lineHeight: "1.12",
              }}
            >
              {displayTitle}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 sm:mt-5 max-w-[90%] sm:max-w-xl text-sm xs:text-base md:text-lg text-white/85 font-light leading-relaxed"
          >
            {displaySubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none"
          >
            <a href="#properties" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="gold" 
                className="group uppercase tracking-widest text-xs xs:text-sm h-[54px] sm:h-14 px-6 sm:px-8 w-full touch-manipulation font-semibold rounded-sm shadow-lg shadow-amber-950/20 active:scale-[0.98] transition-transform"
              >
                <span>Chouf les propriétés</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Button>
            </a>
            <a 
              href="https://wa.me/212700111676?text=Bonjour%20Mehdi%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20propri%C3%A9t%C3%A9s." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="group uppercase tracking-widest text-xs xs:text-sm h-[54px] sm:h-14 px-6 sm:px-8 border-white/30 text-white hover:bg-white hover:text-black w-full touch-manipulation font-semibold rounded-sm active:scale-[0.98] transition-transform"
              >
                <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
                <span>Twasal m3ana f WhatsApp</span>
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator (Hidden on mobile for clean vertical balance) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Hbet</span>
        <div className="h-14 w-[1px] bg-white/20 overflow-hidden relative">
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
