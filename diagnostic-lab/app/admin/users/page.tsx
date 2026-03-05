"use client";

import { useState } from "react";
import { getUsers, getUserHistory } from "@/services/userService";
import type { UserType } from "@/types";

const BG_LIGHT = "#f6f6f8";
const PRIMARY = "#1349ec";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>(getUsers());
  const [profileId, setProfileId] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filtered = search.trim()
    ? users.filter(
        (u) =>
          u.id.toLowerCase().includes(search.toLowerCase()) ||
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleAccess = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  const profileUser = profileId ? users.find((u) => u.id === profileId) : null;
  const historyUser = historyId ? users.find((u) => u.id === historyId) : null;
  const historyItems = historyUser ? getUserHistory(historyUser.id) : [];

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Page Header — Stitch exact */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-6 lg:px-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 text-sm font-normal">
            Manage patient records, view test history, and control access.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Data
          </button>
        </div>
      </div>

      {/* Search (optional, Stitch has in header) — we're in admin layout so add inline */}
      <div className="px-4 lg:px-10 mb-4">
        <label className="relative block max-w-xs">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            type="text"
            placeholder="Search users, tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1349ec]/50 sm:text-sm"
          />
        </label>
      </div>

      {/* User Table — Stitch structure */}
      <div className="px-4 py-2 lg:px-10 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col flex-1 min-h-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4" scope="col">User ID</th>
                  <th className="px-6 py-4" scope="col">Patient Name</th>
                  <th className="px-6 py-4" scope="col">Contact</th>
                  <th className="px-6 py-4" scope="col">Location</th>
                  <th className="px-6 py-4 text-center" scope="col">Total Tests</th>
                  <th className="px-6 py-4" scope="col">Last Activity</th>
                  <th className="px-6 py-4 text-center" scope="col">Access</th>
                  <th className="px-6 py-4 text-right" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginated.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium" style={{ color: PRIMARY }}>{u.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs bg-[#1349ec]/10" style={{ color: PRIMARY }}>
                          {u.initials}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.genderAge}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{u.phone}</span>
                        <span className="text-xs text-slate-500">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{u.location}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">
                        {u.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{u.lastActivity}</td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={u.active}
                          onChange={() => toggleAccess(u.id)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-focus:outline-none" />
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setProfileId(u.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1349ec] transition-colors"
                          title="View User Profile"
                        >
                          <span className="material-symbols-outlined text-[16px]">person</span>
                          Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => setHistoryId(u.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1349ec] transition-colors"
                          title="View Order History"
                        >
                          <span className="material-symbols-outlined text-[16px]">history</span>
                          History
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccess(u.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          title={u.active ? "Deactivate User" : "Activate User"}
                        >
                          <span className="material-symbols-outlined text-[16px]">{u.active ? "block" : "check_circle"}</span>
                          {u.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination — Stitch exact */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3">
            <span className="text-sm text-slate-500">
              Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-medium ${
                    p === page ? "text-white" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                  style={p === page ? { backgroundColor: PRIMARY, borderColor: PRIMARY } : {}}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: View User Profile */}
      {profileUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setProfileId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="User profile"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold bg-[#1349ec]/10" style={{ color: PRIMARY }}>
                  {profileUser.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{profileUser.name}</h3>
                  <p className="text-sm text-slate-500">ID: {profileUser.id}</p>
                </div>
              </div>
              <button type="button" onClick={() => setProfileId(null)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Contact:</span> {profileUser.phone}</p>
              <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Email:</span> {profileUser.email}</p>
              <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Location:</span> {profileUser.location}</p>
              <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Total tests:</span> {profileUser.totalOrders}</p>
              <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Last activity:</span> {profileUser.lastActivity}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Order / Test History — Stitch timeline */}
      {historyUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setHistoryId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Test history"
        >
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold bg-[#1349ec]/10" style={{ color: PRIMARY }}>
                  {historyUser.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{historyUser.name}&apos;s Test History</h3>
                  <p className="text-sm text-slate-500">ID: {historyUser.id} | Total Tests: {historyUser.totalOrders}</p>
                </div>
              </div>
              <button type="button" onClick={() => setHistoryId(null)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="relative border-s border-slate-200 ml-3">
                {historyItems.map((item, i) => (
                  <div key={i} className="mb-8 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white">
                      <span className="material-symbols-outlined text-[14px]" style={{ color: PRIMARY }}>science</span>
                    </span>
                    <div className="mb-1 text-sm font-normal leading-none text-slate-500">{item.date} • {item.time}</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Status</span>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span> {item.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Referred By</span>
                          <span className="text-sm font-medium text-slate-700">{item.referredBy}</span>
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors"
                          style={{ color: PRIMARY }}
                        >
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                          View Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <button type="button" className="text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: PRIMARY }}>
                  Load Older Records <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
