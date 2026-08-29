"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const propertyTypes = ["Villa", "Appartement", "Bureau", "Terrain", "Akhare"];

const WHATSAPP_NUMBER = "212700111676";

export function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    propertyType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      `🏠 *Nouvelle demande client*`,
      ``,
      `👤 *Nom:* ${form.name}`,
      `📞 *Téléphone:* ${form.phone}`,
      form.propertyType ? `🏡 *Type de propriété:* ${form.propertyType}` : null,
      ``,
      `_Envoyé depuis le site web Mehdi Moumou Immobilier_`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-black py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Real Estate Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-[var(--color-gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Twasel M3ana
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Lqa ddar dial a7lamek
            </h3>
            <p className="text-white/60 font-light">
              Partager m3ana chno katsawal 3lih w ghadi nqadmo lik sélection exclusive dyal les propriétés li twalmek.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-dark p-8 md:p-12 rounded-sm border border-white/10"
          >
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-[var(--color-gold)] mb-6" />
                <h4 className="font-serif text-2xl font-bold text-white mb-2">Chokran!</h4>
                <p className="text-white/60">Twaselna b'la demande dyalek w ghadi ntaslo bik f draf 24h.</p>
                <Button
                  variant="outline"
                  className="mt-8 border-white/20 text-white hover:bg-white/10"
                  onClick={() => setSubmitted(false)}
                >
                  Sifet demande akhra
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Smiya lkamla *</label>
                    <Input
                      required
                      placeholder="e.g. Omar Benali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Nmrra d&apos;téléphone *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50">Type de propriété *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, propertyType: type })}
                        className={`py-2.5 text-xs uppercase tracking-wider border rounded-sm transition-all ${
                          form.propertyType === type
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                            : "border-white/20 text-white/60 hover:border-white/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full h-14 uppercase tracking-[0.2em] text-sm font-semibold"
                >
                  Sifet la Demande
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
