// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInAdmin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInAdmin(email, password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials or not an admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-[#0a0a0a] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        {error && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)/80] text-black font-semibold"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
