import { MapPin, CircleDollarSign } from "lucide-react";
import { Property } from "@/lib/properties";

export function PropertyInfo({ property }: { property: Property }) {
  return (
    <div className="border-b border-white/10 pb-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[var(--color-gold)]/10 text-[var(--color-gold)] px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-[var(--color-gold)]/20">
              {property.type}
            </span>
            <span className={`px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border ${property.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
              {property.status}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {property.title}
          </h1>
          <div className="flex items-center text-white/60 text-lg">
            <MapPin className="w-5 h-5 mr-2 text-[var(--color-gold)]" />
            {property.address}
          </div>
        </div>
        
        <div className="md:text-right">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Prix demandé</p>
          <div className="flex items-center md:justify-end text-[var(--color-gold)] font-serif text-3xl md:text-4xl font-bold">
            MAD {property.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
