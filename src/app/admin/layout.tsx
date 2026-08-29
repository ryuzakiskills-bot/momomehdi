// src/app/admin/layout.tsx
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/admin-auth";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/admin/login");
      } else {
        setUser(u);
      }
      setChecking(false);
    }
    fetchUser();
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        Loading admin area…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar adminName={user?.email ?? "Admin"} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 overflow-auto bg-[#050505] flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
