// src/components/admin/ViewsChart.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/admin-auth";
import { motion } from "framer-motion";

/** Simple SVG line chart for property views growth (last 12 months) */
export default function ViewsChart() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    async function fetch() {
      if (!supabase) return;
      // For demo, use static mock data; replace with real aggregation query in production
      const mock = [20, 35, 30, 45, 50, 55, 60, 70, 65, 80, 90, 100];
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
      <h3 className="text-sm text-white/60 mb-2">Views Growth (last 12 months)</h3>
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
