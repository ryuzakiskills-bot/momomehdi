// src/components/admin/PropertyTable.tsx
"use client";
import { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "@/lib/admin-data";
import { Eye, Edit, Trash2, Star, StarOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const EditPropertyModal = dynamic(() => import("./EditPropertyModal"), { ssr: false });

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  status: string;
  featured: boolean;
  created_at: string;
  image_url?: string;
  property_images?: { image_url: string }[];
}

export default function PropertyTable() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  async function load() {
    try {
      const data = await getProperties();
      setProperties(data as Property[]);
    } catch (err) {
      console.error("Failed to load properties:", err);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this property? This cannot be undone.")) return;
    await deleteProperty(id);
    setProperties(prev => prev.filter(p => p.id !== id));
  }

  async function handleToggleFeatured(prop: Property) {
    const { updateProperty } = await import("@/lib/admin-data");
    await updateProperty(prop.id, { featured: !prop.featured });
    setProperties(prev => prev.map(p => p.id === prop.id ? { ...p, featured: !p.featured } : p));
  }

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case "available": return "bg-green-900/40 text-green-300 border-green-500/30";
      case "sold": return "bg-red-900/40 text-red-300 border-red-500/30";
      case "reserved": return "bg-yellow-900/40 text-yellow-300 border-yellow-500/30";
      default: return "bg-gray-900/40 text-gray-300 border-gray-500/30";
    }
  }

  function getFirstImage(prop: Property) {
    if (prop.property_images && prop.property_images.length > 0) {
      return prop.property_images[0].image_url;
    }
    return prop.image_url || null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-white">
        <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading properties…
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16 bg-black/20 rounded-lg border border-white/5 text-gray-400">
        <p className="text-xl mb-2">No properties yet.</p>
        <Link href="/admin/properties/add" className="text-yellow-500 hover:underline text-sm">
          Add your first property →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full divide-y divide-gray-800 text-white text-sm">
          <thead className="bg-[#111111]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Property</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">City</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Added</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#0a0a0a] divide-y divide-gray-800">
            <AnimatePresence>
              {properties.map(prop => {
                const imgSrc = getFirstImage(prop);
                return (
                  <motion.tr
                    key={prop.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-[#111111] transition-colors"
                  >
                    {/* Title + thumbnail */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 relative rounded overflow-hidden shrink-0 bg-gray-800">
                          {imgSrc ? (
                            <Image src={imgSrc} alt={prop.title} fill sizes="56px" className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white line-clamp-1">{prop.title}</p>
                          {prop.featured && (
                            <span className="text-[10px] text-yellow-400 flex items-center gap-1">
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{prop.type}</td>
                    <td className="px-4 py-3 text-yellow-400 font-medium">
                      MAD {prop.price?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{prop.city}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(prop.status)}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(prop.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {/* View on site */}
                        <Link
                          href={`/property/${prop.id}`}
                          target="_blank"
                          className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-white"
                          title="View on site"
                        >
                          <Eye size={15} />
                        </Link>
                        {/* Edit */}
                        <button
                          onClick={() => setEditingProperty(prop)}
                          className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-yellow-400"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        {/* Toggle Featured */}
                        <button
                          onClick={() => handleToggleFeatured(prop)}
                          className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-yellow-400"
                          title={prop.featured ? "Remove from featured" : "Mark as featured"}
                        >
                          {prop.featured ? <StarOff size={15} /> : <Star size={15} />}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="p-2 rounded hover:bg-red-900/30 transition text-gray-400 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProperty && (
          <EditPropertyModal
            property={editingProperty}
            onClose={() => setEditingProperty(null)}
            onSaved={(updated) => {
              setProperties(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p));
              setEditingProperty(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
