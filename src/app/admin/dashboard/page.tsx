// src/app/admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/admin-data";
import StatsCard from "@/components/admin/StatsCard";
import LeadsChart from "@/components/admin/LeadsChart";
import ViewsChart from "@/components/admin/ViewsChart";
import { Home, Building, CheckCircle, Users, UserPlus, Eye } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats(data);
        } else {
          setStats({ totalProperties: 0, availableProperties: 0, soldProperties: 0, totalLeads: 0, newLeadsThisMonth: 0, totalViews: 0 });
        }
      } catch (err) {
        console.error("Failed to load stats:", err);
        setStats({ totalProperties: 0, availableProperties: 0, soldProperties: 0, totalLeads: 0, newLeadsThisMonth: 0, totalViews: 0 });
      }
    }
    fetchData();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Properties" value={stats.totalProperties} icon={Building} />
        <StatsCard title="Available Properties" value={stats.availableProperties} icon={Home} />
        <StatsCard title="Sold Properties" value={stats.soldProperties} icon={CheckCircle} />
        <StatsCard title="Total Leads" value={stats.totalLeads} icon={Users} />
        <StatsCard title="New Leads This Month" value={stats.newLeadsThisMonth} icon={UserPlus} />
        <StatsCard title="Total Views" value={stats.totalViews} icon={Eye} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadsChart />
        <ViewsChart />
      </div>
    </div>
  );
}
