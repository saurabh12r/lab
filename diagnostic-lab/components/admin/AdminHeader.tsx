"use client";

import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-slate-800 text-white border-b border-slate-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="font-bold text-lg tracking-tight">
          Quick Care Pathology – Admin
        </Link>
      </div>
      <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">
        ← Back to site
      </Link>
    </header>
  );
}
