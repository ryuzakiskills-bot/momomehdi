"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212700111676";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour Mehdi, je suis intéressé par vos propriétés.");

interface WhatsAppCTAProps {
  whatsapp?: string;
}

export function WhatsAppCTA({ whatsapp }: WhatsAppCTAProps) {
  const number = whatsapp || "212700111676";
  const whatsappUrl = `https://wa.me/${number}?text=${WHATSAPP_MESSAGE}`;

  return (
    <>
      {/* Floating Instagram Button */}
      <motion.a
        href="https://instagram.com/el_mehdi_moumou"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[74px] right-4 sm:bottom-[88px] sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-lg shadow-pink-600/30 touch-manipulation focus:outline-none"
        style={{ 
          background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 58px)"
        }}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </motion.a>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-950/40 touch-manipulation focus:outline-none"
        style={{
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: "max(1rem, env(safe-area-inset-bottom))"
        }}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white shrink-0" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[var(--color-gold)] rounded-full animate-ping" />
      </motion.a>

      {/* WhatsApp CTA Banner Section */}
      <section className="bg-black py-20 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                  <MessageCircle className="w-6 h-6 text-white fill-white" />
                </div>
                <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest">WhatsApp Direct</p>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Wajed bach tlqa<br />
                <span className="text-[var(--color-gold)] italic">Ddar dial a7lamek?</span>
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Bla mattsenna. Sifet msg l'Mehdi directement f WhatsApp l'consultation instantanée, personnelle, w confidentielle.
              </p>
            </motion.div>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center space-x-3 bg-[#25D366] hover:bg-[#22c55e] text-white px-8 py-5 rounded-sm transition-colors shrink-0 shadow-xl shadow-[#25D366]/30 uppercase tracking-widest text-sm font-semibold"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>Hder f WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}
