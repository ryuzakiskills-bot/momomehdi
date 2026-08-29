"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/properties";

export function LeadForm({ propertyId }: { propertyId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({ ...form, property_id: propertyId });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0a0a0a] border border-[var(--color-gold)]/20 p-8 rounded-sm text-center">
        <CheckCircle2 className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-4" />
        <h4 className="font-serif text-2xl font-bold text-white mb-2">Chokran!</h4>
        <p className="text-white/60 mb-6">Twaselna b'la demande dyalek. Ghadi ntaslo bik f draf 24h.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)} className="border-white/20 text-white">
          Sifet demande akhra
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-sm">
      <h3 className="font-serif text-2xl font-bold text-white mb-2">Demander une Visite</h3>
      <p className="text-white/50 text-sm mb-6">Remplissez le formulaire ci-dessous pour planifier une visite.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 block mb-2">Smiya lkamla *</label>
          <Input required placeholder="Votre nom" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 block mb-2">Nmrra d&apos;téléphone *</label>
          <Input required type="tel" placeholder="+212 6XX XXX XXX" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="bg-white/5 border-white/10 text-white" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 block mb-2">Message</label>
          <textarea 
            placeholder="Je suis intéressé par cette propriété..." 
            className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-[var(--color-gold)]/50 transition-colors h-24 resize-none"
            value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})}
          />
        </div>
        <Button type="submit" disabled={loading} variant="gold" className="w-full h-12 uppercase tracking-widest text-xs font-semibold">
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Demander la visite"}
        </Button>
      </form>
    </div>
  );
}
