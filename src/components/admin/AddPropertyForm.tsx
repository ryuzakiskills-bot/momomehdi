// src/components/admin/AddPropertyForm.tsx
"use client";
import { useState, useRef, useCallback } from "react";
import { createProperty, uploadPropertyImage } from "@/lib/admin-data";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, UploadCloud, X, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AddPropertyForm() {
  const [form, setForm] = useState({
    title: "",
    type: "Appartement",
    price: "",
    city: "",
    status: "Available",
    description: "",
    surface: "",
    bedrooms: "",
    bathrooms: "",
  });

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }
    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      let image_url = "";

      if (imageFile) {
        setUploading(true);
        // Simulate progress while uploading
        const progressInterval = setInterval(() => {
          setUploadProgress((p) => Math.min(p + 10, 85));
        }, 150);

        try {
          image_url = await uploadPropertyImage(imageFile);
          clearInterval(progressInterval);
          setUploadProgress(100);
        } catch (uploadErr: any) {
          clearInterval(progressInterval);
          throw new Error(`Image upload failed: ${uploadErr.message}`);
        } finally {
          setUploading(false);
        }
      }

      const payload = {
        title: form.title,
        type: form.type,
        price: Number(form.price),
        city: form.city,
        status: form.status,
        description: form.description || null,
        surface: form.surface || null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        slug: form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now(),
        ...(image_url && { image_url }),
      };

      await createProperty(payload);
      setSuccess(true);
      setForm({
        title: "", type: "Appartement", price: "", city: "",
        status: "Available", description: "", surface: "", bedrooms: "", bathrooms: "",
      });
      removeImage();
      setUploadProgress(0);
    } catch (err: any) {
      setError(err.message ?? "Failed to create property");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-lg bg-black/50 border border-white/10 h-11 px-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300";
  const labelCls = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-200 p-3 rounded-lg"
          >
            <AlertTriangle size={18} /> {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-200 p-3 rounded-lg"
          >
            <CheckCircle2 size={18} /> Property created successfully!
          </motion.div>
        )}
      </AnimatePresence>
 
      <form onSubmit={handleSubmit} className="space-y-6">
 
        {/* ─── Image Upload Zone ─── */}
        <div>
          <label className={labelCls}>Property Image</label>
 
          {!imagePreview ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center w-full h-52 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                ${isDragging
                  ? "border-gold bg-gold/10 scale-[1.01]"
                  : "border-white/20 bg-black/30 hover:border-gold/60 hover:bg-white/5"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <UploadCloud className={`w-12 h-12 mb-3 transition-colors ${isDragging ? "text-gold" : "text-gray-500"}`} />
              <p className="text-sm font-medium text-gray-300">
                {isDragging ? "Drop image here" : "Click or drag & drop an image"}
              </p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP — Max 10MB</p>
            </div>
          ) : (
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10 group">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={removeImage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                >
                  <X size={16} /> Remove Image
                </button>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 text-xs text-white px-2 py-1 rounded-md flex items-center gap-1.5">
                <ImageIcon size={12} />
                {imageFile?.name}
              </div>
            </div>
          )}
 
          {/* Upload progress bar */}
          {uploading && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <motion.div
                  className="bg-gold h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
 
        {/* ─── Basic Info ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputCls} placeholder="e.g. Villa Moderne Marrakech" />
          </div>
          <div>
            <label className={labelCls}>Type / Category *</label>
            <select name="type" value={form.type} onChange={handleChange} required className={inputCls}>
              <option value="Appartement">Appartement (Default)</option>
              <option value="Villa">Villa (Default)</option>
              <option value="Bureau">Bureau (Default)</option>
              <option value="Terrain">Terrain (Default)</option>
              {/* Note: In a full integration, we'd fetch categories here on mount 
                  and map over them. For now we accept any text to support legacy. */}
            </select>
          </div>
          <div>
            <label className={labelCls}>Price (MAD) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputCls} placeholder="e.g. 1500000" />
          </div>
          <div>
            <label className={labelCls}>City *</label>
            <input name="city" value={form.city} onChange={handleChange} required className={inputCls} placeholder="e.g. Casablanca" />
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
            <input name="surface" value={form.surface} onChange={handleChange} className={inputCls} placeholder="e.g. 120" />
          </div>
          <div>
            <label className={labelCls}>Bedrooms</label>
            <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className={inputCls} placeholder="e.g. 3" />
          </div>
          <div>
            <label className={labelCls}>Bathrooms</label>
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className={inputCls} placeholder="e.g. 2" />
          </div>
        </div>
 
        {/* ─── Description ─── */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg bg-black/50 border border-white/10 p-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-all duration-300"
            placeholder="Describe the property..."
          />
        </div>
 
        {/* ─── Submit ─── */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-11 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
          >
            {submitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Saving…
              </>
            ) : "Save Property"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", type: "Appartement", price: "", city: "", status: "Available", description: "", surface: "", bedrooms: "", bathrooms: "" });
              removeImage();
              setError(null);
              setSuccess(false);
            }}
            className="w-full sm:w-auto px-6 h-11 bg-white/10 text-white rounded-lg hover:bg-white/20 transition touch-manipulation active:scale-95"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
