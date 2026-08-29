// src/app/admin/categories/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getCategoriesStats } from "@/lib/admin-data";
import { Folder } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCatName, setNewCatName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const stats = await getCategoriesStats();
      setCategories(stats);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setIsSubmitting(true);
    try {
      const { createCategory } = await import("@/lib/admin-data");
      await createCategory(newCatName.trim());
      setNewCatName("");
      loadData();
    } catch (err: any) {
      alert(`Failed to add category. Does the table exist? Error: ${err.message}`);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const { deleteCategory } = await import("@/lib/admin-data");
      await deleteCategory(id);
      loadData();
    } catch (err: any) {
      alert(`Failed to delete category: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Categories</h2>
      
      <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
        <input 
          type="text" 
          placeholder="New category name (e.g. Riad)" 
          value={newCatName} 
          onChange={(e) => setNewCatName(e.target.value)}
          className="bg-[#111111] border border-white/20 p-3 rounded-md text-white flex-1"
          required
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gold text-black font-semibold px-6 py-3 rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Category"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.length > 0 ? categories.map((cat, idx) => (
          <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-gold/50 transition duration-300 relative group">
            <button 
              onClick={() => cat.id ? handleDelete(cat.id) : null}
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete Category"
            >
              ✕
            </button>
            <Folder className="w-10 h-10 text-gold mb-3" />
            <h3 className="text-xl font-semibold text-white">{cat.type}</h3>
            <p className="text-gray-400 mt-2">{cat.count} Properties</p>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-400 py-10 bg-black/20 rounded-lg border border-white/5">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
