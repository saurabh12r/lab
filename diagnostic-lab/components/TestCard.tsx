"use client";

import Link from "next/link";
import type { TestType } from "@/types";

interface TestCardProps {
  test: TestType;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-300">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-center h-24 rounded-xl bg-[#005696]/5 text-[#005696] mb-4">
          <span className="material-symbols-outlined text-4xl">bloodtype</span>
        </div>
        <h3 className="text-[#002B49] text-lg font-bold leading-tight mb-2">{test.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">{test.preparation}</p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-[#002B49]">${test.price}</span>
          <Link href="/packages" className="font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200 border-2 border-[#005696] bg-white text-[#005696] hover:bg-[#005696] hover:text-white">
            Book Test
          </Link>
        </div>
      </div>
    </div>
  );
}
