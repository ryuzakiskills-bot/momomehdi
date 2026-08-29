"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Snin dial l'expérience" },
  { value: "500+", label: "Propriétés li tba3o" },
  { value: "98%", label: "Satisfaction Client" },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-black py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm">
              <div className="absolute inset-0 border-2 border-[var(--color-gold)] translate-x-4 translate-y-4 rounded-sm" />
              <div className="relative z-10 w-full h-full">
                <Image
                  src="/images/mehdi-portrait.png"
                  alt="Mehdi Moumou - Luxury Real Estate Agent"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute right-2 md:right-8 bottom-12 z-20 glass-dark p-4 md:p-6 border border-[var(--color-gold)]/30 rounded-sm">
              <p className="font-serif text-3xl md:text-4xl text-[var(--color-gold)]">10+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">Snin dial<br/>l'Excellence</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[var(--color-gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Chkoun howa Mehdi Moumou
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Nbdlo mafhoum l'immobilier <br />de luxe
            </h3>
            
            <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
              B'ktar men 10 snin d'expérience f l'immobilier premium, kantkhesess bach nweffer l'les clients exigeants des propriétés exceptionnelles. Swa knti katsawal 3la chef-d'œuvre architectural moderne, villa marocaine classique, wla investissement commercial stratégique, l'engagement dyali howa n9addem lik service inégalé, confidentiel, w personnalisé bzaf.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Accès exclusif l'les propriétés off-market",
                "Expertise f'la négociation w l'conseil en investissement",
                "Support de A à Z l'les acheteurs internationaux",
                "Ma3rifa 3amiqa b'les tendances dyal marché de luxe"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-white/80">
                  <CheckCircle2 className="text-[var(--color-gold)] h-5 w-5 shrink-0" />
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-center xs:text-left">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-serif text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-gold)] mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
