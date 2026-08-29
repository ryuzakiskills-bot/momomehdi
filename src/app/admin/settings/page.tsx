// src/app/admin/settings/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getSettings, updateSetting } from "@/lib/admin-data";
import { Save, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SETTING_FIELDS = [
  { section: "🏢 Store Information", fields: [
    { key: "site_name", label: "Site Name", type: "text", placeholder: "MomoMehdi Immobilier" },
    { key: "tagline", label: "Tagline", type: "text", placeholder: "Premium Real Estate in Morocco" },
  ]},
  { section: "📞 Contact Details", fields: [
    { key: "contact_email", label: "Contact Email", type: "email", placeholder: "contact@momomehdi.ma" },
    { key: "phone_number", label: "Phone Number", type: "text", placeholder: "+212 600 000 000" },
    { key: "whatsapp_number", label: "WhatsApp Number", type: "text", placeholder: "212700111676" },
    { key: "address", label: "Office Address", type: "text", placeholder: "123 Mohamed V, Casablanca" },
  ]},
  { section: "🌐 Social Media Links", fields: [
    { key: "facebook_url", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/your-page" },
    { key: "instagram_url", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/your-handle" },
    { key: "twitter_url", label: "X (Twitter) URL", type: "url", placeholder: "https://twitter.com/your-handle" },
  ]},
  { section: "🏠 Homepage — Hero Banner", fields: [
    { key: "hero_title", label: "Hero Title (Line 1)", type: "text", placeholder: "Lqa Ddar dial a7lamek" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "text", placeholder: "Découvrez les meilleures propriétés au Maroc." },
    { key: "hero_image_url", label: "Hero Background Image URL", type: "url", placeholder: "https://images.unsplash.com/..." },
  ]},
  { section: "📢 Promotional Banner", fields: [
    { key: "promo_banner_active", label: "Promo Banner Active (true/false)", type: "text", placeholder: "true" },
    { key: "promo_banner_text", label: "Promo Banner Text", type: "text", placeholder: "Offre spéciale: -50% ce mois-ci!" },
  ]},
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedKeys, setSavedKeys] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettings();
        if (data && data.length > 0) {
          const loaded: Record<string, string> = {};
          data.forEach((s: { key: string; value: string }) => { loaded[s.key] = s.value; });
          setSettings(loaded);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const keys = Object.keys(settings);
      for (const key of keys) {
        await updateSetting(key, settings[key] || "");
      }
      setSavedKeys(keys);
      setTimeout(() => setSavedKeys([]), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-xs text-gray-400">All changes appear live on the website after saving.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm">
            <AlertTriangle size={16} /> {error}
          </motion.div>
        )}
        {savedKeys.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-200 p-3 rounded-lg text-sm">
            <CheckCircle2 size={16} /> Settings saved! Changes are now live on the website.
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="space-y-6">
        {SETTING_FIELDS.map(section => (
          <div key={section.section} className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 border-b border-white/10 pb-3">{section.section}</h3>
            {section.fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={settings[field.key] || ""}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg h-10 px-3 text-white text-sm placeholder-gray-600 focus:border-yellow-500 focus:outline-none transition"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="sticky bottom-0 bg-[#0a0a0a] border-t border-white/10 pt-4 pb-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50 text-sm"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
