"use client";

import { useState } from "react";

type PrescriptionStatus = "Pending Review" | "Package Suggested" | "Approved" | "Rejected";

interface Prescription {
  id: string;
  patientName: string;
  uploadedDate: string;
  imageUrl: string;
  suggestedPackages: string[];
  status: PrescriptionStatus;
}

const DUMMY_PRESCRIPTIONS: Prescription[] = [
  {
    id: "RX-4001",
    patientName: "Alice Smith",
    uploadedDate: "Oct 28, 2023",
    imageUrl: "https://placehold.co/120x80/e2e8f0/64748b?text=Rx",
    suggestedPackages: ["Full Body Checkup", "Thyroid Profile"],
    status: "Package Suggested",
  },
  {
    id: "RX-4002",
    patientName: "Michael Johnson",
    uploadedDate: "Oct 27, 2023",
    imageUrl: "https://placehold.co/120x80/e2e8f0/64748b?text=Rx",
    suggestedPackages: [],
    status: "Pending Review",
  },
  {
    id: "RX-4003",
    patientName: "Sarah Williams",
    uploadedDate: "Oct 26, 2023",
    imageUrl: "https://placehold.co/120x80/e2e8f0/64748b?text=Rx",
    suggestedPackages: ["Diabetes Screen", "Lipid Profile"],
    status: "Approved",
  },
  {
    id: "RX-4004",
    patientName: "David Robinson",
    uploadedDate: "Oct 25, 2023",
    imageUrl: "https://placehold.co/120x80/e2e8f0/64748b?text=Rx",
    suggestedPackages: ["CBC Panel"],
    status: "Rejected",
  },
  {
    id: "RX-4005",
    patientName: "Emma Davis",
    uploadedDate: "Oct 24, 2023",
    imageUrl: "https://placehold.co/120x80/e2e8f0/64748b?text=Rx",
    suggestedPackages: [],
    status: "Pending Review",
  },
];

function getStatusStyles(status: PrescriptionStatus) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700 ring-green-700/10";
    case "Pending Review":
      return "bg-yellow-100 text-yellow-700 ring-yellow-700/10";
    case "Package Suggested":
      return "bg-blue-100 text-blue-700 ring-blue-700/10";
    case "Rejected":
      return "bg-red-100 text-red-700 ring-red-700/10";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-700/10";
  }
}

export default function AdminPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(DUMMY_PRESCRIPTIONS);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? prescriptions.filter(
        (p) =>
          p.id.toLowerCase().includes(search.toLowerCase()) ||
          p.patientName.toLowerCase().includes(search.toLowerCase())
      )
    : prescriptions;

  const viewing = viewingId ? prescriptions.find((p) => p.id === viewingId) : null;

  const updateStatus = (id: string, status: PrescriptionStatus) => {
    setPrescriptions((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const suggestPackage = (id: string) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "Package Suggested" as PrescriptionStatus,
              suggestedPackages: p.suggestedPackages.length
                ? p.suggestedPackages
                : ["Full Body Checkup", "Thyroid Profile"],
            }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif] bg-[#f6f7f8]">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            Prescription Management
          </h2>
          <p className="text-base font-normal text-slate-600">
            Review uploaded prescriptions and suggest test packages.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-8">
        {[
          { label: "Total", value: "156", icon: "description", iconBg: "bg-[#0a6a99]/10", iconColor: "text-[#0a6a99]/70" },
          { label: "Pending", value: "42", icon: "schedule", iconBg: "bg-orange-100", iconColor: "text-orange-500" },
          { label: "Approved", value: "98", icon: "check_circle", iconBg: "bg-green-100", iconColor: "text-green-600" },
          { label: "Rejected", value: "16", icon: "cancel", iconBg: "bg-red-100", iconColor: "text-red-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
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
          <div className="flex-1 min-w-0 max-w-lg">
            <label className="relative block w-full">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                type="text"
                placeholder="Search by Prescription ID or Patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#0a6a99] sm:text-sm sm:leading-6"
              />
            </label>
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
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Prescription ID
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Uploaded Date
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Suggested Packages
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((p) => (
                  <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-[#0a6a99]">#{p.id}</td>
                    <td className="p-4 text-sm font-medium text-slate-900">{p.patientName}</td>
                    <td className="p-4 text-sm text-slate-600">{p.uploadedDate}</td>
                    <td className="p-4">
                      <div className="w-[120px] h-[80px] rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.imageUrl}
                          alt={`Prescription ${p.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.suggestedPackages.length ? (
                          p.suggestedPackages.map((name) => (
                            <span
                              key={name}
                              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                            >
                              {name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(
                          p.status
                        )}`}
                      >
                        <span className="size-1.5 rounded-full bg-current opacity-80" />
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setViewingId(p.id)}
                          className="p-1.5 text-slate-600 rounded transition-colors hover:text-[#0a6a99] hover:bg-[#0a6a99]/10 text-xs font-medium"
                          title="View Prescription"
                        >
                          <span className="material-symbols-outlined text-[20px] align-middle">visibility</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => suggestPackage(p.id)}
                          className="p-1.5 text-slate-600 rounded transition-colors hover:text-[#0a6a99] hover:bg-[#0a6a99]/10 text-xs font-medium"
                          title="Suggest Package"
                        >
                          <span className="material-symbols-outlined text-[20px] align-middle">medical_services</span>
                        </button>
                        {p.status !== "Approved" && p.status !== "Rejected" && (
                          <>
                            <button
                              type="button"
                              onClick={() => updateStatus(p.id, "Approved")}
                              className="p-1.5 text-green-600 rounded transition-colors hover:bg-green-50 text-xs font-medium"
                              title="Approve"
                            >
                              <span className="material-symbols-outlined text-[20px] align-middle">check_circle</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateStatus(p.id, "Rejected")}
                              className="p-1.5 text-red-500 rounded transition-colors hover:bg-red-50 text-xs font-medium"
                              title="Reject"
                            >
                              <span className="material-symbols-outlined text-[20px] align-middle">cancel</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Prescription modal */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setViewingId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View prescription"
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                Prescription #{viewing.id}
              </h3>
              <button
                type="button"
                onClick={() => setViewingId(null)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium text-slate-900">Patient:</span> {viewing.patientName}
              </p>
              <p className="text-sm text-slate-600 mb-4">
                <span className="font-medium text-slate-900">Uploaded:</span> {viewing.uploadedDate}
              </p>
              <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewing.imageUrl}
                  alt={`Prescription ${viewing.id}`}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              {viewing.suggestedPackages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-900 mb-2">Suggested packages</p>
                  <div className="flex flex-wrap gap-2">
                    {viewing.suggestedPackages.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
