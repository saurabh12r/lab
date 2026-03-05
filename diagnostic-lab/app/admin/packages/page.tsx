"use client";

import { useState } from "react";

const PRIMARY = "#0a6a99";
const PRIMARY_DARK = "#064b6e";
const BORDER_COLOR = "#e7eff3";
const BG_LIGHT = "#f6f7f8";

type PackageStatus = "Active" | "Draft" | "Inactive";

interface PackageItem {
  id: string;
  name: string;
  numTests: number;
  price: string;
  discount: number;
  status: PackageStatus;
}

const DUMMY_PACKAGES: PackageItem[] = [
  { id: "p1", name: "Comprehensive Full Body Checkup", numTests: 12, price: "199.00", discount: 10, status: "Active" },
  { id: "p2", name: "Diabetes Screening Panel", numTests: 5, price: "89.00", discount: 0, status: "Active" },
  { id: "p3", name: "Thyroid Profile", numTests: 3, price: "45.00", discount: 15, status: "Active" },
  { id: "p4", name: "Heart Health Advanced", numTests: 8, price: "159.00", discount: 5, status: "Draft" },
  { id: "p5", name: "Women's Wellness", numTests: 6, price: "120.00", discount: 0, status: "Inactive" },
];

function getStatusStyles(status: PackageStatus) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700 ring-green-700/10";
    case "Draft":
      return "bg-amber-100 text-amber-700 ring-amber-700/10";
    case "Inactive":
      return "bg-slate-100 text-slate-700 ring-slate-700/10";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(DUMMY_PACKAGES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Select Category");
  const [formTurnaround, setFormTurnaround] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formBasePrice, setFormBasePrice] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [params, setParams] = useState([
    { id: "1", name: "Complete Blood Count (CBC)", method: "Automated" },
    { id: "2", name: "Lipid Profile", method: "Enzymatic" },
    { id: "3", name: "HbA1c (Glycosylated Hemoglobin)", method: "HPLC" },
  ]);

  const finalPrice = (() => {
    const base = parseFloat(formBasePrice) || 0;
    const d = (parseFloat(formDiscount) || 0) / 100;
    return (base * (1 - d)).toFixed(2);
  })();

  const handleAddPackage = () => {
    setEditingId(null);
    setFormName("");
    setFormCategory("Select Category");
    setFormTurnaround("");
    setFormDescription("");
    setFormBasePrice("");
    setFormDiscount("");
    setFormActive(true);
    setShowForm(true);
  };

  const handleEditPackage = (p: PackageItem) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormBasePrice(p.price);
    setFormDiscount(String(p.discount));
    setShowForm(true);
  };

  const handleDeletePackage = (id: string) => {
    setPackages((prev) => prev.filter((x) => x.id !== id));
    if (editingId === id) setShowForm(false);
    setEditingId(null);
  };

  const handleSavePackage = () => {
    if (editingId) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formName || p.name,
                price: formBasePrice || p.price,
                discount: parseInt(formDiscount, 10) || 0,
                status: formActive ? "Active" : "Inactive",
              }
            : p
        )
      );
      setEditingId(null);
    } else {
      setPackages((prev) => [
        ...prev,
        {
          id: `p${Date.now()}`,
          name: formName || "New Package",
          numTests: params.length,
          price: formBasePrice || "0.00",
          discount: parseInt(formDiscount, 10) || 0,
          status: formActive ? "Active" : "Draft",
        },
      ]);
    }
    setShowForm(false);
    setFormName("");
    setFormBasePrice("");
    setFormDiscount("");
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const removeParam = (id: string) => setParams((prev) => prev.filter((p) => p.id !== id));

  return (
    <div
      className="flex flex-col min-h-full font-[Inter,sans-serif]"
      style={{ background: BG_LIGHT }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="p-6 md:px-12 lg:px-24 max-w-[1200px] w-full mx-auto flex flex-col gap-6">
        {/* Package list table (dummy data + actions) */}
        <section
          className="bg-white p-6 rounded-xl shadow-sm border"
          style={{ borderColor: BORDER_COLOR }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Package Management
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                View and manage diagnostic packages.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddPackage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium text-sm shadow-sm hover:opacity-95 transition-opacity"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Package
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: BORDER_COLOR }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Package Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    # Tests
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {packages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{p.numTests}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">${p.price}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{p.discount}%</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditPackage(p)}
                          className="p-1.5 rounded text-slate-600 hover:text-[#0a6a99] hover:bg-[#0a6a99]/10 transition-colors"
                          title="Edit Package"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePackage(p.id)}
                          className="p-1.5 rounded text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Package"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stitch: Add New Health Package form */}
        {showForm && (
          <>
            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border"
              style={{ borderColor: BORDER_COLOR }}
            >
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {editingId ? "Edit Package" : "Add New Health Package"}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {editingId
                    ? "Update this diagnostic package."
                    : "Create a new diagnostic package for the catalog."}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-5 py-2.5 rounded-lg border font-medium text-sm hover:bg-slate-50 transition-colors"
                  style={{ borderColor: BORDER_COLOR, color: "#0d171c" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePackage}
                  className="px-5 py-2.5 rounded-lg text-white font-medium text-sm shadow-sm flex items-center gap-2 hover:opacity-95 transition-opacity"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Package
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left: General Info + Parameters */}
              <div className="xl:col-span-2 flex flex-col gap-6">
                <section
                  className="bg-white p-6 rounded-xl shadow-sm border"
                  style={{ borderColor: `${BORDER_COLOR}80` }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: PRIMARY }}>
                      edit_document
                    </span>
                    General Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Package Name
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g., Comprehensive Full Body Checkup"
                        className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99]"
                        style={{ borderColor: BORDER_COLOR }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99] appearance-none"
                          style={{ borderColor: BORDER_COLOR }}
                        >
                          <option>Select Category</option>
                          <option>Preventive Care</option>
                          <option>Diabetes Screening</option>
                          <option>Heart Health</option>
                          <option>Women&apos;s Health</option>
                        </select>
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
                        >
                          <span className="material-symbols-outlined text-sm">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Turnaround Time
                      </label>
                      <input
                        type="text"
                        value={formTurnaround}
                        onChange={(e) => setFormTurnaround(e.target.value)}
                        placeholder="e.g., 24-48 Hours"
                        className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99]"
                        style={{ borderColor: BORDER_COLOR }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Enter detailed description of the package..."
                        rows={4}
                        className="w-full rounded-lg border bg-slate-100 px-4 py-3 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99] resize-none"
                        style={{ borderColor: BORDER_COLOR }}
                      />
                    </div>
                  </div>
                </section>

                <section
                  className="bg-white p-6 rounded-xl shadow-sm border"
                  style={{ borderColor: `${BORDER_COLOR}80` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: PRIMARY }}>
                        science
                      </span>
                      Included Parameters
                    </h3>
                    <button
                      type="button"
                      className="text-[#0a6a99] text-sm font-semibold hover:opacity-80 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Add Parameter
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div
                      className="grid grid-cols-12 gap-4 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 uppercase tracking-wider"
                      style={{ background: BG_LIGHT }}
                    >
                      <div className="col-span-6">Parameter Name</div>
                      <div className="col-span-4">Method</div>
                      <div className="col-span-2 text-right">Action</div>
                    </div>
                    {params.map((param) => (
                      <div
                        key={param.id}
                        className="grid grid-cols-12 gap-4 items-center px-3 py-3 border-b last:border-0 hover:bg-slate-50/50 transition-colors"
                        style={{ borderColor: BORDER_COLOR }}
                      >
                        <div className="col-span-6 flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-500 text-[20px]">
                            drag_indicator
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {param.name}
                          </span>
                        </div>
                        <div className="col-span-4">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {param.method}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeParam(param.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex items-center gap-3 mt-2 p-3 border border-dashed rounded-lg"
                      style={{ borderColor: BORDER_COLOR, background: `${BG_LIGHT}4D` }}
                    >
                      <input
                        type="text"
                        placeholder="Type parameter name to search..."
                        className="flex-1 bg-transparent border-none text-sm p-0 focus:ring-0 placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: PRIMARY }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right: Pricing + Status & Media */}
              <div className="flex flex-col gap-6">
                <section
                  className="bg-white p-6 rounded-xl shadow-sm border"
                  style={{ borderColor: `${BORDER_COLOR}80` }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: PRIMARY }}>
                      payments
                    </span>
                    Pricing Details
                  </h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Base Price ($)
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
                          $
                        </div>
                        <input
                          type="number"
                          value={formBasePrice}
                          onChange={(e) => setFormBasePrice(e.target.value)}
                          placeholder="0.00"
                          className="block w-full rounded-lg border bg-slate-100 pl-7 py-3 pr-12 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99]"
                          style={{ borderColor: BORDER_COLOR }}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 text-sm">
                          USD
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Discount (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formDiscount}
                          onChange={(e) => setFormDiscount(e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border bg-slate-100 px-4 py-3 pr-10 text-sm focus:border-[#0a6a99] focus:ring-[#0a6a99]"
                          style={{ borderColor: BORDER_COLOR }}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                          <span className="material-symbols-outlined text-[18px]">percent</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-4 rounded-lg border"
                      style={{ background: `${PRIMARY}0D`, borderColor: `${PRIMARY}1A` }}
                    >
                      <p className="text-xs text-slate-600 uppercase tracking-wide font-bold mb-1">
                        Final Price
                      </p>
                      <p className="text-2xl font-black" style={{ color: PRIMARY }}>
                        ${finalPrice}
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  className="bg-white p-6 rounded-xl shadow-sm border"
                  style={{ borderColor: `${BORDER_COLOR}80` }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: PRIMARY }}>
                      tune
                    </span>
                    Status &amp; Media
                  </h3>
                  <div
                    className="flex items-center justify-between p-4 rounded-lg mb-6"
                    style={{ background: BG_LIGHT }}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">
                        Active Status
                      </span>
                      <span className="text-xs text-slate-600">Visible in catalog</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formActive}
                        onChange={(e) => setFormActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#0a6a99]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a6a99]" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Package Icon
                    </label>
                    <label
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 hover:border-[#0a6a99]/50 transition-colors"
                      style={{ borderColor: BORDER_COLOR, background: BG_LIGHT }}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-slate-500 text-3xl mb-2">
                          cloud_upload
                        </span>
                        <p className="text-xs text-slate-600">
                          <span className="font-semibold" style={{ color: PRIMARY }}>
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          SVG, PNG, JPG (MAX. 800x400px)
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                    <div className="mt-4 flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border bg-slate-100 bg-center bg-cover"
                        style={{ borderColor: BORDER_COLOR }}
                      />
                      <div className="flex flex-col">
                        <p className="text-xs font-semibold text-slate-900">
                          current_icon.jpg
                        </p>
                        <p className="text-[10px] text-slate-600">124 KB</p>
                      </div>
                      <button
                        type="button"
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
