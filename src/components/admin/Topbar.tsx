// src/components/admin/Topbar.tsx
"use client";
import { useEffect, useState } from "react";
import { Bell, User, Menu } from "lucide-react";
import { getCurrentUser, signOutAdmin } from "@/lib/admin-auth";

interface TopbarProps {
  adminName: string;
  onMenuClick?: () => void;
}

export default function Topbar({ adminName, onMenuClick }: TopbarProps) {
  const [userName, setUserName] = useState(adminName);

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser();
      if (u) setUserName(u.email ?? adminName);
    }
    fetchUser();
  }, [adminName]);

  const handleLogout = async () => {
    await signOutAdmin();
    window.location.href = "/admin/login";
  };

  return (
    <header className="flex items-center justify-between bg-[#0a0a0a] border-b border-white/10 px-4 sm:px-6 py-3 shrink-0">
      <div className="flex items-center space-x-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 transition touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        )}
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gold" />
          <span className="text-xs sm:text-sm font-medium text-white truncate max-w-[120px] sm:max-w-[200px]">
            {userName}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button className="relative text-white hover:text-gold w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 transition touch-manipulation" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gold text-black rounded-sm hover:bg-gold/80 transition text-xs sm:text-sm font-semibold active:scale-95 touch-manipulation h-10 flex items-center justify-center"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
