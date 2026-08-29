// src/app/admin/leads/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { getLeads } from "@/lib/admin-data";
import LeadsTable from "@/components/admin/LeadsTable";
import { supabase } from "@/lib/admin-auth";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState<"connecting" | "live" | "off">("connecting");

  const loadLeads = useCallback(async () => {
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLeads();

    if (!supabase) {
      setRealtimeStatus("off");
      return;
    }

    // Subscribe to Realtime inserts on leads table
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => {
          // Re-fetch fresh data whenever a lead is inserted/updated/deleted
          loadLeads();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setRealtimeStatus("live");
        else setRealtimeStatus("off");
      });

    return () => {
      if (supabase) supabase.removeChannel(channel);
    };
  }, [loadLeads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading leads…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leads</h2>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              realtimeStatus === "live" ? "bg-green-400 animate-pulse" : "bg-gray-500"
            }`}
          />
          <span className="text-gray-400">
            {realtimeStatus === "live" ? "Live updates active" : "Realtime unavailable"}
          </span>
        </div>
      </div>
      <LeadsTable leads={leads} setLeads={setLeads} />
    </div>
  );
}

