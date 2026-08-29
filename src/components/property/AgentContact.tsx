import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AgentContact() {
  return (
    <div className="bg-[#0a0a0a] border border-[var(--color-gold)]/20 p-6 md:p-8 rounded-sm mb-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-gold)] relative">
          <Image 
            src="/images/mehdi-portrait.png" 
            alt="Mehdi Moumou" 
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif text-2xl font-bold text-white">Mehdi Moumou</h4>
          <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase">Directeur & Fondateur</p>
        </div>
      </div>

      <div className="space-y-4">
        <a href="https://wa.me/212700111676" target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white h-14 uppercase tracking-widest font-semibold flex items-center justify-center">
            <MessageCircle className="w-5 h-5 mr-3 fill-white" />
            WhatsApp Direct
          </Button>
        </a>
        <div className="grid grid-cols-2 gap-4">
          <a href="tel:+212700111676">
            <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs">
              <Phone className="w-4 h-4 mr-2" />
              Appeler
            </Button>
          </a>
          <a href="mailto:contact@momomehdi.com">
            <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
