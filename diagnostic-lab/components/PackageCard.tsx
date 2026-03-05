"use client";

import type { PackageType } from "@/types";

interface PackageCardProps {
  pkg: PackageType;
  isSelected: boolean;
  onSelect: () => void;
}

export function PackageCard({ pkg, isSelected, onSelect }: PackageCardProps) {
  return (
    <div
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? "shadow-md border-2 border-[#005696] ring-4 ring-[#005696]/10" : "shadow-sm hover:shadow-lg border border-slate-200"}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-[#005696] text-white rounded-full p-1 shadow-sm self-end">
          <span className="material-symbols-outlined text-sm">check</span>
        </div>
      )}
      <div className="relative h-48 overflow-hidden">
        {pkg.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
            {pkg.discount}
          </div>
        )}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10 bg-[#005696] text-white rounded-full p-1 shadow-sm">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={pkg.alt ?? pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={pkg.img} />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          {pkg.badge && (
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${pkg.badgeClass ?? ""}`}>
              {pkg.badge}
            </span>
          )}
        </div>
        <h3 className="text-[#002B49] text-lg font-bold leading-tight mb-2">{pkg.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{pkg.desc}</p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            {pkg.strikePrice && pkg.strikePrice !== pkg.price && (
              <span className="text-xs text-slate-400 line-through">{pkg.strikePrice}</span>
            )}
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-[#002B49]">{pkg.price}</span>
            </div>
          </div>
          <div className="text-right">
            {pkg.parameters && <div className="text-xs text-slate-500 font-medium mb-1">{pkg.parameters}</div>}
            <button
              type="button"
              onClick={onSelect}
              className={`font-bold py-1.5 px-4 rounded-lg text-sm transition-colors duration-200 border-2 border-[#005696] ${isSelected ? "bg-[#005696] text-white" : "bg-white text-[#005696] hover:bg-[#005696] hover:text-white"}`}
            >
              {isSelected ? "Selected" : "Select"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
