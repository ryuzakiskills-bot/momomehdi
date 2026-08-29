// src/components/admin/StatsCard.tsx
"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <motion.div
      className="bg-glass p-5 rounded-xl flex items-center space-x-4"
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-3 bg-gold rounded-full text-black">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm text-white/60">{title}</h3>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
      {trend && (
        <span className={`text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>⦿</span>
      )}
    </motion.div>
  );
}
