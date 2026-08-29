"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Eye, TrendingUp, Handshake } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Propriétés Vérifiées",
    description: "Ga3 les propriétés f portfolio dyalna kaydouzou mn vérification légale w structurelle rigoureuse bach nqdro nDmnou lik la tranquillité d'esprit.",
  },
  {
    icon: Clock,
    title: "Réponse Rapide",
    description: "L'waqt mohem bzaf f l'immobilier de luxe. Kanftakhro b'communication immédiate w exécution rapide.",
  },
  {
    icon: Eye,
    title: "Visites Exclusives",
    description: "Chouf les propriétés f des visites privées, m3zlin b'3inaya w m9adin 3la 7sab waqtek w besoins dyalek.",
  },
  {
    icon: TrendingUp,
    title: "Conseil f l'Investissement",
    description: "Ma3rifa 3amiqa b'le marché bach nDmnou bli les investissements immobiliers dyalek ghadi yjibou a7san rendement.",
  },
  {
    icon: Handshake,
    title: "Maître f la Négociation",
    description: "Expertise f la négociation bach njiibou lik a7san les termes w prix l'la propriété li khtariti.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="services" className="bg-black py-24 md:py-32 border-y border-white/5 relative">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-gold)]/5 via-black to-black pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[var(--color-gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              L'Avantage Mehdi Moumou
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              3lach tkhtar l'agence dyalna
            </h3>
            <p className="text-white/60 text-lg font-light">
              L'engagement dyalna howa nqadmo lik expérience immobilière fluide, transparente w très gratifiante.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-sm hover:bg-white/5 transition-colors border-white/10 hover:border-[var(--color-gold)]/30 group"
              >
                <div className="w-14 h-14 bg-black border border-[var(--color-gold)]/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-white mb-4">
                  {benefit.title}
                </h4>
                <p className="text-white/60 leading-relaxed font-light text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
