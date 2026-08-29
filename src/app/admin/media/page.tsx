// src/app/admin/media/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { getAllMedia, deleteMedia, uploadPropertyImage } from "@/lib/admin-data";
import { Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";
import Image from "next/image";

export default function MediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    try {
      const data = await getAllMedia();
      setMedia(data);
    } catch (err) {
      console.error("Failed to load media:", err);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteMedia(id);
      setMedia(media.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete media:", err);
      alert("Failed to delete image.");
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const publicUrl = await uploadPropertyImage(file);
      // Store into property_images table standalone (no property_id)
      const { supabase } = await import("@/lib/admin-auth");
      if (supabase) {
        await supabase.from("property_images").insert({ image_url: publicUrl });
      }
      await fetchMedia();
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading media library...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded font-medium hover:bg-gold/80 transition disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.length > 0 ? media.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/40 aspect-square">
            <Image
              src={item.image_url}
              alt="Property media"
              fill
              className="object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-50"
            />
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute inset-0 m-auto w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
              title="Delete Image"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-400 py-16 bg-black/20 rounded-lg border border-white/5 flex flex-col items-center">
            <ImageIcon className="w-12 h-12 mb-3 text-gray-500" />
            <p>No media found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
