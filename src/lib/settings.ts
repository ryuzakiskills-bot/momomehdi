// src/lib/settings.ts
// Server-side settings fetcher for use in Server Components
import { supabase } from "./supabase";

export type Settings = Record<string, string>;

export async function getPublicSettings(): Promise<Settings> {
  const defaults: Settings = {
    site_name: "MomoMehdi Immobilier",
    tagline: "Premium Real Estate in Morocco",
    contact_email: "contact@momomehdi.ma",
    phone_number: "+212 700 111 676",
    whatsapp_number: "212700111676",
    address: "123 Avenue Mohamed V, Casablanca",
    facebook_url: "https://facebook.com/ElMehdiMoumou",
    instagram_url: "https://instagram.com/el_mehdi_moumou",
    twitter_url: "https://twitter.com/ElMehdiMoumou",
    hero_title: "Lqa Ddar dial a7lamek",
    hero_subtitle: "Accès exclusif à l'a7san villas, appartements w terrains exclusifs f l'Maroc.",
    hero_image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    promo_banner_active: "false",
    promo_banner_text: "",
  };

  if (!supabase) return defaults;

  try {
    const { data, error } = await supabase.from("settings").select("key, value");
    if (error || !data) return defaults;

    const loaded: Settings = { ...defaults };
    data.forEach((row: { key: string; value: string }) => {
      loaded[row.key] = row.value;
    });
    return loaded;
  } catch {
    return defaults;
  }
}
