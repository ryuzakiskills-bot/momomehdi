import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Settings } from "@/lib/settings";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface FooterProps {
  settings?: Settings;
}

export function Footer({ settings }: FooterProps) {
  const phone = settings?.phone_number || "07.00.11.16.76";
  const email = settings?.contact_email || "contact@mm-immobilier.com";
  const address = settings?.address || "123 Avenue Mohamed V, Casablanca, Morocco";
  const facebook = settings?.facebook_url || "https://facebook.com/ElMehdiMoumou";
  const instagram = settings?.instagram_url || "https://instagram.com/el_mehdi_moumou";
  const twitter = settings?.twitter_url || "https://twitter.com/ElMehdiMoumou";

  const socialIcons = [
    { Icon: FacebookIcon, label: "Facebook", href: facebook },
    { Icon: InstagramIcon, label: "Instagram", href: instagram },
    { Icon: TwitterIcon, label: "X (Twitter)", href: twitter },
  ];

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-3xl font-bold tracking-wider text-white">
                M<span className="text-[var(--color-gold)]">M</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Mehdi Moumou Immobilier kayqaddem services immobiliers premium, 
              w kayjme3 l&apos;kilyan m3a a7san les villas, appartements w terrains exclusifs.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "home" },
                { name: "3lina", href: "about" },
                { name: "Propriétés", href: "properties" },
                { name: "Services", href: "services" },
                { name: "Contact", href: "contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={`#${item.href}`}
                    className="text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/60">
                <Phone className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/60">
                <Mail className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6">Tbe3na</h4>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)] transition-all touch-manipulation active:scale-95"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Mehdi Moumou Immobilier. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Conditions de Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

