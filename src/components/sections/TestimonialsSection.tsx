"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Karim El Fassi",
    title: "CEO, Groupe Atlas Capital",
    review: "Le professionnalisme w l'expertise dyal Mehdi makaynch b7alhom. Lqa lina villa wa3ra f Anfa f draf jouj simanat — dakchi li knna kanqellbou 3lih exactement. Le processus kamel daz bikhir.",
    rating: 5,
    avatar: "K",
  },
  {
    name: "Sophia Laurent",
    title: "Investisseur International, Paris",
    review: "B'sifti acheteur étranger, knt m9al9 mn le processus. Mehdi w9ef m3aya f kol étape b'transparence w sber. Penthouse dyali f Marina howa dakchi li 7lemt bih.",
    rating: 5,
    avatar: "S",
  },
  {
    name: "Hassan Bensouda",
    title: "Entrepreneur, Marrakech",
    review: "Service exceptionnel w ma3rifa 3amiqa b le marché de luxe. Mehdi négociya prix wa3er b'smayti w support après-vente kan mzian bzaf. Kansa7 bih bzaf!",
    rating: 5,
    avatar: "H",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#050505] py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-gold)]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[var(--color-gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Tajribat l'kilyan
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Chno galo l'kilyan dyalna
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass p-8 rounded-sm border border-white/10 hover:border-[var(--color-gold)]/40 transition-all duration-300 group flex flex-col"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed text-sm font-light flex-1 italic">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-black font-bold text-lg font-serif">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50 mt-0.5">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
