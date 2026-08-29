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
        isScrolled ? "glass-dark py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              M<span className="text-[var(--color-gold)]">M</span>
            </span>
            <span className="hidden text-sm font-light tracking-widest text-white/80 md:block">
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
            className="md:hidden text-white w-11 h-11 flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 transition-all touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
            <div className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-white hover:text-[var(--color-gold)]"
                >
                  {link.name}
                </Link>
              ))}
              <a href="https://wa.me/212700111676?text=Bonjour%20Mehdi%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20propri%C3%A9t%C3%A9s." target="_blank" rel="noopener noreferrer" className="w-[80%]">
                <Button variant="gold" className="uppercase tracking-widest w-full">
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
