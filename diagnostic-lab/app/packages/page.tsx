"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PackageCard } from "@/components/PackageCard";
import { getPackages, getPackageCategories } from "@/services/packageService";

export default function PackagesPage() {
  const packages = getPackages();
  const categories = getPackageCategories();
  const [selectedId, setSelectedId] = useState<number | null>(2);
  const selectedPkg = packages.find((p) => p.id === selectedId);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <div className="min-h-screen flex flex-col bg-[#f5f7f8] font-[Inter,sans-serif] text-slate-900">
        <Navbar variant="lab" activeLink="packages" />
        <main className="flex-1 flex flex-col md:flex-row max-w-[1440px] mx-auto w-full pt-8 pb-28 px-4 md:px-8 gap-8">
          <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#002B49] text-lg font-bold">Categories</h1>
              <p className="text-slate-500 text-sm">Filter by health concern</p>
            </div>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left group ${cat.active ? "bg-[#005696]/10 text-[#005696]" : "hover:bg-slate-100 text-slate-700"}`}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                  <span className={`text-sm ${cat.active ? "font-bold" : "font-medium"}`}>{cat.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2 text-[#002B49] font-bold text-sm">
                <span className="material-symbols-outlined text-[#005696]">support_agent</span>
                Need Help?
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Call our health advisors for guidance on choosing the right package.
              </p>
              <a className="text-sm font-bold text-[#005696] hover:underline" href="tel:+18001234567">
                Call +1 (800) 123-4567
              </a>
            </div>
          </aside>
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Link href="/" className="hover:text-[#005696]">Home</Link>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  <span>Booking</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  <span className="text-[#005696] font-medium">Select Package</span>
                </div>
                <h1 className="text-[#002B49] text-3xl md:text-4xl font-black tracking-tight">Step 1: Select Package</h1>
                <p className="text-slate-500 text-base">Choose a health checkup package that suits your specific needs.</p>
              </div>
            </div>
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#005696] transition-colors">search</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005696] focus:border-transparent transition-all placeholder:text-slate-400"
                placeholder="Search for specific tests, packages or parameters (e.g., Vitamin D, Thyroid)"
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSelected={selectedId === pkg.id}
                  onSelect={() => setSelectedId(selectedId === pkg.id ? null : pkg.id)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button type="button" className="text-[#005696] font-bold text-sm flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
                <span>Load More Packages</span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 p-4">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div>
                <span className="block text-xs text-slate-500 font-medium">Selected Package</span>
                <span className="block text-[#002B49] font-bold">{selectedPkg ? selectedPkg.name : "None selected"}</span>
              </div>
              {selectedPkg && (
                <>
                  <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Total Amount</span>
                    <span className="block text-lg text-[#005696] font-black">{selectedPkg.price}</span>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/booking/location"
              className={`flex items-center gap-2 rounded-xl px-8 py-3 font-bold text-sm sm:text-base shadow-lg transition-all ${selectedId ? "bg-[#005696] hover:bg-[#003d6b] text-white shadow-blue-500/30 hover:scale-105 active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
              onClick={(e) => !selectedId && e.preventDefault()}
            >
              <span>Continue</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
