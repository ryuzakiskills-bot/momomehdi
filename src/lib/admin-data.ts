// src/lib/admin-data.ts
import { supabase } from "@/lib/admin-auth";

/** Dashboard statistics */
export async function getDashboardStats() {
  if (!supabase) return null;
  const [{ count: propCount }, { count: leadCount }, { count: viewCount }] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("property_views").select("id", { count: "exact", head: true })
  ]);
  const totalProperties = propCount ?? 0;
  const totalLeads = leadCount ?? 0;
  const totalViews = viewCount ?? 0;
  // For demo, we just return zeros for other metrics
  return {
    totalProperties,
    availableProperties: 0,
    soldProperties: 0,
    totalLeads,
    newLeadsThisMonth: 0,
    totalViews,
  };
}

/** Property CRUD */
export async function getProperties() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(image_url, is_featured)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProperty(property: any) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("properties").insert(property).single();
  if (error) throw error;
  return data;
}

export async function updateProperty(id: string, updates: any) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("properties").update(updates).eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function deleteProperty(id: string) {
  if (!supabase) return null;
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
  return true;
}

/** Leads CRUD */
export async function getLeads() {
  if (!supabase) return [];
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateLeadStatus(id: string, status: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("leads").update({ status }).eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function deleteLead(id: string) {
  if (!supabase) return null;
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/** Categories CRUD */
export async function getCategories() {
  if (!supabase) return [];
  
  // Try to fetch from categories table first
  const { data, error } = await supabase.from("categories").select("*").order("name");
  
  if (!error && data) {
    return data;
  }
  
  // Legacy fallback: if table doesn't exist, group from properties
  console.warn("Falling back to legacy categories grouping from properties.", error?.message);
  const { data: propData } = await supabase.from("properties").select("type");
  const uniqueTypes = Array.from(new Set(propData?.map(p => p.type) || []));
  return uniqueTypes.map(type => ({ id: type, name: type }));
}

export async function createCategory(name: string) {
  if (!supabase) return null;
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const { data, error } = await supabase
    .from("categories")
    .insert({ name, slug })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string) {
  if (!supabase) return null;
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function getCategoriesStats() {
  if (!supabase) return [];
  
  const categories = await getCategories();
  const { data: propData, error } = await supabase.from("properties").select("type");
  
  if (error) throw error;
  
  const stats = (propData || []).reduce((acc: any, prop: any) => {
    acc[prop.type] = (acc[prop.type] || 0) + 1;
    return acc;
  }, {});

  return categories.map(cat => ({
    id: cat.id,
    type: cat.name,
    count: stats[cat.name] || 0
  }));
}

/** Media Library */
export async function getAllMedia() {
  if (!supabase) return [];
  const { data, error } = await supabase.from("property_images").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteMedia(id: string) {
  if (!supabase) return null;
  const { error } = await supabase.from("property_images").delete().eq("id", id);
  if (error) throw error;
  return true;
}

/** Settings */
export async function getSettings() {
  if (!supabase) return [];
  const { data, error } = await supabase.from("settings").select("*");
  if (error) throw error;
  return data;
}

export async function updateSetting(key: string, value: string) {
  if (!supabase) return null;
  // Upsert pattern
  const { data, error } = await supabase.from("settings").upsert({ key, value }, { onConflict: "key" }).select();
  if (error) throw error;
  return data;
}

/** Admin Profile */
export async function updateAdminPassword(newPassword: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
}

/** Upload an image to Supabase Storage and return its public URL */
export async function uploadPropertyImage(file: File): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured");

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `properties/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("property-images")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  if (!data?.publicUrl) throw new Error("Failed to get public URL");
  return data.publicUrl;
}
