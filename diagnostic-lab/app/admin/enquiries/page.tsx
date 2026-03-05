"use client";

import { useState } from "react";

const PRIMARY = "#0a6a99";
const BG_LIGHT = "#f6f7f8";

type InquiryStatus = "New" | "Contacted" | "Resolved";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  inquiryDate: string;
  status: InquiryStatus;
}

const DUMMY_ENQUIRIES: Inquiry[] = [
  { id: "ENQ-2001", name: "James Wilson", phone: "+1 (555) 111-2222", email: "j.wilson@email.com", message: "I would like to know if you offer home collection for blood tests. My father is elderly and cannot travel easily.", inquiryDate: "Oct 28, 2023", status: "New" },
  { id: "ENQ-2002", name: "Lisa Chen", phone: "+1 (555) 333-4444", email: "lisa.chen@email.com", message: "Could you send me a price list for your corporate wellness packages? We have 50+ employees.", inquiryDate: "Oct 27, 2023", status: "Contacted" },
  { id: "ENQ-2003", name: "Mark Davis", phone: "+1 (555) 555-6666", email: "mdavis@email.com", message: "What is the turnaround time for a full lipid profile? Need results before my doctor appointment next week.", inquiryDate: "Oct 26, 2023", status: "Resolved" },
  { id: "ENQ-2004", name: "Anna Brown", phone: "+1 (555) 777-8888", email: "anna.b@email.com", message: "Do you accept insurance for routine checkups? I have Blue Cross.", inquiryDate: "Oct 25, 2023", status: "New" },
  { id: "ENQ-2005", name: "Tom Harris", phone: "+1 (555) 999-0000", email: "tom.h@email.com", message: "Interested in partnership for lab services. Please have someone from B2B team contact me.", inquiryDate: "Oct 24, 2023", status: "Contacted" },
];

function getStatusStyles(status: InquiryStatus) {
  switch (status) {
    case "New":
      return "bg-amber-100 text-amber-700 ring-amber-700/10";
    case "Contacted":
      return "bg-blue-100 text-blue-700 ring-blue-700/10";
    case "Resolved":
      return "bg-green-100 text-green-700 ring-green-700/10";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-700/10";
  }
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Inquiry[]>(DUMMY_ENQUIRIES);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = enquiries.filter((e) => {
    const matchSearch = !search.trim() ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const viewing = viewingId ? enquiries.find((e) => e.id === viewingId) : null;

  const setStatus = (id: string, status: InquiryStatus) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const deleteInquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (viewingId === id) setViewingId(null);
  };

  const newCount = enquiries.filter((e) => e.status === "New").length;
  const contactedCount = enquiries.filter((e) => e.status === "Contacted").length;
  const resolvedCount = enquiries.filter((e) => e.status === "Resolved").length;

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif] bg-[#f6f7f8]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            Enquiries & Lead Management
          </h2>
          <p className="text-base font-normal text-slate-600">
            Manage contact form submissions and leads.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-8">
        {[
          { label: "Total Enquiries", value: String(enquiries.length), icon: "contact_mail", iconBg: "bg-[#0a6a99]/10", iconColor: "text-[#0a6a99]/70" },
          { label: "New", value: String(newCount), icon: "mark_email_unread", iconBg: "bg-amber-100", iconColor: "text-amber-500" },
          { label: "Contacted", value: String(contactedCount), icon: "phone_in_talk", iconBg: "bg-blue-100", iconColor: "text-blue-500" },
          { label: "Resolved", value: String(resolvedCount), icon: "check_circle", iconBg: "bg-green-100", iconColor: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <span className={`material-symbols-outlined ${stat.iconBg} ${stat.iconColor} p-1.5 rounded-lg text-xl`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <div className="px-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative block flex-1 min-w-0 max-w-md">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                type="text"
                placeholder="Search by ID, name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#0a6a99] sm:text-sm"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0a6a99]"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-12 flex-1 overflow-hidden flex flex-col">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Inquiry ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#0a6a99]">{e.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{e.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{e.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{e.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px]">
                      <span className="line-clamp-2">{e.message}</span>
                      <button
                        type="button"
                        onClick={() => setViewingId(e.id)}
                        className="text-xs font-medium text-[#0a6a99] hover:underline mt-0.5"
                      >
                        View full
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{e.inquiryDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(e.status)}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {e.status !== "Contacted" && e.status !== "Resolved" && (
                          <button
                            type="button"
                            onClick={() => setStatus(e.id, "Contacted")}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                            Mark as Contacted
                          </button>
                        )}
                        {e.status !== "Resolved" && (
                          <button
                            type="button"
                            onClick={() => setStatus(e.id, "Resolved")}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Mark as Resolved
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteInquiry(e.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View message modal */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setViewingId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View inquiry"
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Inquiry #{viewing.id}</h3>
              <button type="button" onClick={() => setViewingId(null)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
              <p className="text-sm"><span className="font-medium text-slate-900">Name:</span> {viewing.name}</p>
              <p className="text-sm"><span className="font-medium text-slate-900">Phone:</span> {viewing.phone}</p>
              <p className="text-sm"><span className="font-medium text-slate-900">Email:</span> {viewing.email}</p>
              <p className="text-sm"><span className="font-medium text-slate-900">Date:</span> {viewing.inquiryDate}</p>
              <p className="text-sm"><span className="font-medium text-slate-900">Message:</span></p>
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{viewing.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
