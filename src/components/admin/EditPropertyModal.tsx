// src/components/admin/EditPropertyModal.tsx
"use client";
import { useState } from "react";
import { updateProperty, uploadPropertyImage } from "@/lib/admin-data";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, UploadCloud } from "lucide-react";
import Image from "next/image";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  address?: string;
  status: string;
  surface?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  description?: string;
  featured?: boolean;
  security?: boolean;
  elevator?: boolean;
  swimming_pool?: boolean;
  garden?: boolean;
}

interface Props {
  property: Property;
  onClose: () => void;
  onSaved: (updated: Property) => void;
}

export default function EditPropertyModal({ property, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: property.title || "",
    type: property.type || "Appartement",
    price: String(property.price || ""),
    city: property.city || "",
    address: property.address || "",
    status: property.status || "Available",
    surface: property.surface || "",
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    parking: String(property.parking ?? ""),
    description: property.description || "",
    featured: property.featured ?? false,
    security: property.security ?? false,
    elevator: property.elevator ?? false,
    swimming_pool: property.swimming_pool ?? false,
    garden: property.garden ?? false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const inputCls = "w-full rounded-lg bg-black/60 border border-white/10 h-10 px-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none text-sm";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setNewImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const updates: Record<string, unknown> = {
        title: form.title,
        type: form.type,
        price: Number(form.price),
        city: form.city,
        address: form.address || null,
        status: form.status,
        surface: form.surface || null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : 0,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : 0,
        parking: form.parking ? Number(form.parking) : 0,
        description: form.description || null,
        featured: form.featured,
        security: form.security,
        elevator: form.elevator,
        swimming_pool: form.swimming_pool,
        garden: form.garden,
      };

      // Upload new image if selected
      if (newImageFile) {
        const imageUrl = await uploadPropertyImage(newImageFile);
        // Also insert into property_images table
        const { supabase } = await import("@/lib/admin-auth");
        if (supabase) {
          await supabase.from("property_images").insert({
            property_id: property.id,
            image_url: imageUrl,
            is_featured: true,
          });
        }
      }

      await updateProperty(property.id, updates);
      setSuccess(true);
      onSaved({ ...property, ...updates } as Property);
      setTimeout(() => onClose(), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0d0d0d] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-[#0d0d0d] z-10">
          <h2 className="text-lg font-bold text-white">Edit Property</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-5">
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-200 p-3 rounded-lg mb-4 text-sm">
                <AlertTriangle size={16} /> {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-200 p-3 rounded-lg mb-4 text-sm">
                <CheckCircle2 size={16} /> Saved successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSave} className="space-y-4">
            {/* New Image Upload */}
            <div>
              <label className={labelCls}>Upload New Image (optional)</label>
              <label className="flex items-center gap-3 cursor-pointer border border-dashed border-white/20 rounded-lg p-3 hover:border-yellow-500/50 transition">
                <UploadCloud size={20} className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  {newImageFile ? newImageFile.name : "Click to select an image"}
                </span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {newImagePreview && (
                <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden">
                  <Image src={newImagePreview} alt="New image preview" fill className="object-cover" />
                </div>
              )}
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Type / Category *</label>
                <select name="type" value={form.type} onChange={handleChange} required className={inputCls}>
                  <option>Appartement</option>
                  <option>Villa</option>
                  <option>Bureau</option>
                  <option>Terrain</option>
                  <option>Riad</option>
                  <option>Studio</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Price (MAD) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>City *</label>
                <input name="city" value={form.city} onChange={handleChange} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Address</label>
                <input name="address" value={form.address} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Surface (m²)</label>
                <input name="surface" value={form.surface} onChange={handleChange} className={inputCls} placeholder="e.g. 120 m²" />
              </div>
              <div>
                <label className={labelCls}>Bedrooms</label>
                <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className={inputCls} min="0" />
              </div>
              <div>
                <label className={labelCls}>Bathrooms</label>
                <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className={inputCls} min="0" />
              </div>
              <div>
                <label className={labelCls}>Parking</label>
                <input name="parking" type="number" value={form.parking} onChange={handleChange} className={inputCls} min="0" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                className="w-full rounded-lg bg-black/60 border border-white/10 p-3 text-white text-sm placeholder-gray-500 focus:border-yellow-500 focus:outline-none" />
            </div>

            {/* Amenities & Featured */}
            <div>
              <label className={labelCls}>Amenities & Options</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: "featured", label: "⭐ Featured" },
                  { name: "security", label: "🔒 Security" },
                  { name: "elevator", label: "🛗 Elevator" },
                  { name: "swimming_pool", label: "🏊 Pool" },
                  { name: "garden", label: "🌿 Garden" },
                ].map(opt => (
                  <label key={opt.name} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name={opt.name}
                      checked={form[opt.name as keyof typeof form] as boolean}
                      onChange={handleChange}
                      className="w-4 h-4 accent-yellow-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="flex-1 h-11 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50">
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={onClose}
                className="flex-1 h-11 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
