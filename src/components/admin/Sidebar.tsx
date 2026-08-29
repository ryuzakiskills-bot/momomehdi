// src/components/admin/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Building, Users, Settings, FileText, Image, User, X } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Properties", href: "/admin/properties", icon: Map },
  { name: "Add Property", href: "/admin/properties/add", icon: Building },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: FileText },
  { name: "Media Library", href: "/admin/media", icon: Image },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Profile", href: "/admin/profile", icon: User },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={`
        w-sidebar min-h-screen bg-[#0a0a0a] border-r border-white/10 p-4 flex flex-col z-40
        fixed inset-y-0 left-0 transition-transform duration-300 transform lg:translate-x-0 lg:relative
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gold">Admin</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/5 active:scale-95 transition touch-manipulation"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onClose && onClose()}
              className={`flex items-center px-3 py-3 rounded-md transition-all touch-manipulation ${
                active ? "bg-gold text-black" : "text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
