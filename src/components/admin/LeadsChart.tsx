// src/components/admin/LeadsChart.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/admin-auth";
import { motion } from "framer-motion";

/** Simple SVG line chart for leads growth (last 12 months) */
export default function LeadsChart() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    async function fetch() {
      if (!supabase) return;
      // For demo we aggregate leads per month (placeholder static data)
      // In a real app you would query with `date_trunc('month', created_at)`
      const mock = [5, 8, 12, 9, 15, 20, 18, 22, 30, 28, 35, 40];
      setData(mock);
    }
    fetch();
  }, []);

  const max = Math.max(...data, 1);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <motion.div
      className="bg-glass p-5 rounded-xl h-64 flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-sm text-white/60 mb-2">Leads Growth (last 12 months)</h3>
      <svg viewBox="0 0 100 100" className="flex-1 w-full h-full">
        <polyline
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          points={points}
        />
        {/* baseline */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="white" strokeOpacity="0.2" />
      </svg>
    </motion.div>
  );
}
