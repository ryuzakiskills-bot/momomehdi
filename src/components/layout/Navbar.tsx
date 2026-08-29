"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "3lina", href: "#about" },
  { name: "Propriétés", href: "#properties" },
  { name: "Services", href: "#services" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark py-3.5 shadow-lg shadow-black/40" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-6"
      }`}
      style={{ paddingTop: isScrolled ? "0.875rem" : "max(1rem, env(safe-area-inset-top))" }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white">
              M<span className="text-[var(--color-gold)]">M</span>
            </span>
            <span className="hidden text-xs sm:text-sm font-light tracking-widest text-white/80 md:block">
              IMMOBILIER
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-[var(--color-gold)]"
              >
                {link.name}
              </Link>
            ))}
            <a href="https://wa.me/212700111676?text=Bonjour%20Mehdi%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20propri%C3%A9t%C3%A9s." target="_blank" rel="noopener noreferrer">
              <Button variant="gold" className="uppercase tracking-widest">
                Twasel M3ana
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-sm hover:bg-white/10 active:scale-95 transition-all touch-manipulation focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-dark border-t border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-5 py-7 px-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base uppercase tracking-widest text-white hover:text-[var(--color-gold)] py-1"
                >
                  {link.name}
                </Link>
              ))}
              <a href="https://wa.me/212700111676?text=Bonjour%20Mehdi%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20propri%C3%A9t%C3%A9s." target="_blank" rel="noopener noreferrer" className="w-full max-w-xs pt-2">
                <Button variant="gold" className="uppercase tracking-widest w-full h-12 text-xs font-semibold">
                  Twasel M3ana
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
