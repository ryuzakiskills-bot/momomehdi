// src/app/admin/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/admin-auth";
import { updateAdminPassword } from "@/lib/admin-data";
import { KeyRound, Mail } from "lucide-react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const u = await getCurrentUser();
        if (u) setEmail(u.email || "");
      } catch (err) {
        console.error("Failed to load user:", err);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    try {
      await updateAdminPassword(password);
      alert("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Failed to update password:", err);
      alert(err.message || "Failed to update password.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      
      <div className="bg-black/40 border border-white/10 rounded-lg p-6 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
          <div className="flex items-center bg-[#111] border border-white/10 rounded p-2 text-gray-400">
            <Mail className="w-5 h-5 mr-3" />
            <span>{email}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Email address cannot be changed from the dashboard.</p>
        </div>

        <hr className="border-white/10" />

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Change Password</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/20 rounded p-2 text-white focus:border-gold outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/20 rounded p-2 text-white focus:border-gold outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving || !password || !confirmPassword}
              className="flex items-center bg-gold text-black px-4 py-2 rounded font-medium hover:bg-gold/80 transition disabled:opacity-50"
            >
              <KeyRound className="w-5 h-5 mr-2" />
              {saving ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
