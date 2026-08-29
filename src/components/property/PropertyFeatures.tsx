import { Property } from "@/lib/properties";
import { Maximize, BedDouble, Bath, Car, ShieldCheck, ArrowUpSquare, Waves, TreePine } from "lucide-react";

export function PropertyFeatures({ property }: { property: Property }) {
  const features = [
    { icon: Maximize, label: "Surface", value: property.surface, show: !!property.surface },
    { icon: BedDouble, label: "Chambres", value: property.bedrooms, show: property.bedrooms > 0 },
    { icon: Bath, label: "Salles de bain", value: property.bathrooms, show: property.bathrooms > 0 },
    { icon: Car, label: "Parking", value: `${property.parking} Places`, show: property.parking > 0 },
    { icon: ShieldCheck, label: "Sécurité 24/7", value: "Inclus", show: property.security },
    { icon: ArrowUpSquare, label: "Ascenseur", value: "Privé", show: property.elevator },
    { icon: Waves, label: "Piscine", value: "Privée", show: property.swimming_pool },
    { icon: TreePine, label: "Jardin", value: "Aménagé", show: property.garden },
  ];

  return (
    <div className="mb-12">
      <h3 className="font-serif text-2xl font-bold text-white mb-6">Caractéristiques</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.filter(f => f.show).map((feature, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-sm p-4 flex items-start space-x-4 hover:border-[var(--color-gold)]/50 transition-colors">
            <feature.icon className="w-6 h-6 text-[var(--color-gold)] shrink-0 mt-1" />
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{feature.label}</p>
              <p className="text-white font-medium">{feature.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
