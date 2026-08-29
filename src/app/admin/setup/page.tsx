"use client";
import { useState } from "react";
import { supabase } from "@/lib/admin-auth";
import { BackButton } from "@/components/ui/back-button";

export default function SetupPage() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin123");
  const [status, setStatus] = useState("");

  const handleCreate = async () => {
    setStatus("Creating...");
    if (!supabase) {
      setStatus("Error: Supabase is not configured.");
      return;
    }

    // 1. Sign up user in Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setStatus(`Auth Error: ${error.message}`);
      return;
    }

    // 2. Insert into admin_users (if RLS allows, or just ignore if it's not strictly needed)
    if (data?.user) {
      const { error: insertError } = await supabase.from("admin_users").insert({
        id: data.user.id,
        email: email,
        password_hash: "hashed_by_supabase",
      });

      if (insertError) {
        setStatus(`Created Auth, but Admin DB Error: ${insertError.message}`);
        return;
      }
      setStatus("Admin created successfully! You can now login.");
    }
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <div className="flex items-center space-x-4 mb-4">
        <BackButton fallbackUrl="/admin/dashboard" className="-ml-4" />
        <h1 className="text-2xl">Admin Setup</h1>
      </div>
      <div className="mb-4">
        <label className="block">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="text-black p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block">Password (min 6 chars)</label>
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="text-black p-2"
        />
      </div>
      <button 
        onClick={handleCreate} 
        className="bg-gold text-black p-2 rounded"
      >
        Create Admin Account
      </button>
      <div className="mt-4 text-yellow-500">{status}</div>
    </div>
  );
}
