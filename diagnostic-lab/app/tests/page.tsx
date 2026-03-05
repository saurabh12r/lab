"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TestCard } from "@/components/TestCard";
import { getTests } from "@/services/testService";

export default function TestsPage() {
  const allTests = getTests();
  const tests = allTests.filter((t) => t.status === "active");
  const [search, setSearch] = useState("");
  const filtered = search.trim()
    ? tests.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          t.preparation.toLowerCase().includes(search.toLowerCase())
      )
    : tests;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <div className="min-h-screen flex flex-col bg-[#f5f7f8] font-[Inter,sans-serif] text-slate-900">
        <Navbar variant="lab" activeLink="tests" />
        <main className="flex-1 max-w-[1440px] mx-auto w-full pt-8 pb-16 px-4 md:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Link href="/" className="hover:text-[#005696]">Home</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-[#005696] font-medium">Available Tests</span>
              </div>
              <h1 className="text-[#002B49] text-3xl md:text-4xl font-black tracking-tight">Available Tests</h1>
              <p className="text-slate-500 text-base">Browse individual diagnostic tests. Book a package to get started.</p>
            </div>
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#005696] transition-colors">search</span>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005696] focus:border-transparent transition-all placeholder:text-slate-400"
                placeholder="Search for tests (e.g., CBC, Thyroid, Vitamin D)"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-slate-500 py-12">No tests match your search. Try a different term.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
