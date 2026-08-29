// src/app/admin/add-property/page.tsx
"use client";
import AddPropertyForm from "@/components/admin/AddPropertyForm";
import { BackButton } from "@/components/ui/back-button";

export default function AddPropertyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <BackButton fallbackUrl="/admin/properties" className="-ml-4" />
        <h2 className="text-2xl font-bold">Add Property</h2>
      </div>
      <AddPropertyForm />
    </div>
  );
}
