"use client";

import Link from "next/link";
import { getAdminSidebarLinks } from "@/services/adminService";

export function AdminSidebar() {
  const links = getAdminSidebarLinks();
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 bg-slate-800 border-r border-slate-700 pt-4 px-3 overflow-y-auto">
      <nav className="space-y-0.5">
        {links.map((item: { href: string; label: string; icon: string }) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium data-[active]:bg-slate-700 data-[active]:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
