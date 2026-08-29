// src/components/admin/LeadsTable.tsx
"use client";
import { useState } from "react";
import { deleteLead, updateLeadStatus } from "@/lib/admin-data";
import { Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Props {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

export default function LeadsTable({ leads, setLeads }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setDeletingId(id);
    await deleteLead(id);
    setLeads(leads.filter((l) => l.id !== id));
    setDeletingId(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateLeadStatus(id, newStatus);
    setLeads(
      leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <motion.div className="overflow-x-auto" whileHover={{ opacity: 1 }}>
      <table className="min-w-full divide-y divide-gray-700 text-white">
        <thead className="bg-[#111111]">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Message</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Created</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#0a0a0a]">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-gray-700 hover:bg-[#111111] transition-colors"
            >
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.phone}</td>
              <td className="px-4 py-2 max-w-xs truncate" title={lead.message}>
                {lead.message}
              </td>
              <td className="px-4 py-2">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(lead.id, e.target.value)
                  }
                  className="bg-[#111] text-white rounded p-1"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td className="px-4 py-2">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="p-1 hover:text-var(--color-gold)"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  className="p-1 hover:text-red-500"
                  onClick={() => handleDelete(lead.id)}
                  disabled={deletingId === lead.id}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
