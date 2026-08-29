// src/app/admin/properties/page.tsx
"use client";
import PropertyTable from "@/components/admin/PropertyTable";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Properties</h2>
      <PropertyTable />
    </div>
  );
}
