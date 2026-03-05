"use client";

import { useState } from "react";
import {
  getTests,
  addTest as addTestService,
  updateTest as updateTestService,
  deleteTest as deleteTestService,
} from "@/services/testService";
import type { TestType, TestStatusType } from "@/types";

const BG_LIGHT = "#f6f6f8";
const PRIMARY = "#1349ec";

const emptyForm = (): Omit<TestType, "id"> => ({
  name: "",
  category: "",
  price: 0,
  reportTime: "",
  preparation: "",
  status: "active",
});

export default function AdminTestsPage() {
  const [tests, setTests] = useState<TestType[]>(getTests());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<TestType, "id">>(emptyForm());

  const filtered = search.trim()
    ? tests.filter(
        (t) =>
          t.id.toLowerCase().includes(search.toLowerCase()) ||
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      )
    : tests;

  const openAdd = () => {
    setForm(emptyForm());
    setModalOpen("add");
    setEditingId(null);
  };
  const openEdit = (t: TestType) => {
    setForm({
      name: t.name,
      category: t.category,
      price: t.price,
      reportTime: t.reportTime,
      preparation: t.preparation,
      status: t.status,
    });
    setModalOpen("edit");
    setEditingId(t.id);
  };
  const closeModal = () => {
    setModalOpen(null);
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setTests((prev) => addTestService(prev, form));
    closeModal();
  };
  const handleUpdate = () => {
    if (!editingId || !form.name.trim()) return;
    setTests((prev) => updateTestService(prev, editingId, form));
    closeModal();
  };
  const handleDelete = (id: string) => {
    if (confirm("Delete this test?")) setTests((prev) => deleteTestService(prev, id));
  };
  const toggleStatus = (id: string) => {
    setTests((prev) =>
      updateTestService(prev, id, {
        status: (prev.find((t) => t.id === id)?.status === "active" ? "inactive" : "active") as TestStatusType,
      })
    );
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Test Management</h1>
              <p className="text-slate-500 text-sm mt-1">View, add, edit, and manage diagnostic tests.</p>
            </div>
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Test
            </button>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Test ID, name, or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Test ID</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Test Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Preparation</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Report Time</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{t.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{t.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{t.category}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">${t.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 max-w-[200px] truncate" title={t.preparation}>{t.preparation}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{t.reportTime}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${t.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(t)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStatus(t.id)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            title={t.status === "active" ? "Disable" : "Enable"}
                          >
                            <span className="material-symbols-outlined text-lg">{t.status === "active" ? "toggle_on" : "toggle_off"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(t.id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">No tests found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{modalOpen === "add" ? "Add Test" : "Edit Test"}</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Test Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                  placeholder="e.g. Complete Blood Count"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                  placeholder="e.g. Blood Test"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Price ($)</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={form.price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                  placeholder="0"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Preparation Required</span>
                <input
                  type="text"
                  value={form.preparation}
                  onChange={(e) => setForm((f) => ({ ...f, preparation: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                  placeholder="e.g. Fasting not required"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Report Time</span>
                <input
                  type="text"
                  value={form.reportTime}
                  onChange={(e) => setForm((f) => ({ ...f, reportTime: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                  placeholder="e.g. 24 Hours"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TestStatusType }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">
                Cancel
              </button>
              {modalOpen === "add" ? (
                <button type="button" onClick={handleAdd} className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
                  Add Test
                </button>
              ) : (
                <button type="button" onClick={handleUpdate} className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
