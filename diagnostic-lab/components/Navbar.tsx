"use client";

import Link from "next/link";

export type NavbarVariant = "lab" | "trutest";

interface NavbarProps {
  variant?: NavbarVariant;
  activeLink?: "home" | "tests" | "packages" | "contact" | "partnership" | "blog" | "upload";
}

export function Navbar({ variant = "lab", activeLink }: NavbarProps) {
  if (variant === "lab") {
    return (
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4 text-[#002B49]">
            <div className="text-[#005696]">
              <span className="material-symbols-outlined text-4xl">science</span>
            </div>
            <h2 className="text-[#002B49] text-xl font-bold leading-tight tracking-[-0.015em]">Diagnostic Lab</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <Link className={activeLink === "home" ? "text-[#005696] text-sm font-bold leading-normal" : "text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors"} href="/">Home</Link>
            <Link className={activeLink === "tests" ? "text-[#005696] text-sm font-bold leading-normal" : "text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors"} href="/tests">Tests</Link>
            <Link className={activeLink === "packages" ? "text-[#005696] text-sm font-bold leading-normal" : "text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors"} href="/packages">Packages</Link>
            <Link className="text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors" href="/contact">Contact</Link>
            <Link className="text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors" href="/partnership">Partnership</Link>
            <a className="text-slate-600 hover:text-[#005696] text-sm font-medium leading-normal transition-colors" href="#">About Us</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="hidden lg:flex w-full max-w-xs items-center rounded-xl bg-slate-100 px-3 py-2">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 ml-2" placeholder="Search" />
          </div>
          <Link href="/login" className="flex items-center justify-center rounded-xl bg-[#005696] hover:bg-[#003d6b] text-white text-sm font-bold h-10 px-6 transition-colors">
            Login
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/90 backdrop-blur-md px-10 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a6a99]/10 text-[#0a6a99]">
          <span className="material-symbols-outlined text-[28px]">medical_services</span>
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-tight text-[#0d171c]">Trutest Diagnostics</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden items-center gap-8 lg:flex">
          <Link className={activeLink === "home" ? "text-sm font-semibold text-[#0d171c] hover:text-[#0a6a99] transition-colors" : "text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors"} href="/">Home</Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/tests">Tests</Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/blog">Blog</Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
          <a className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="#">About Us</a>
          <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
        </nav>
        <div className="flex gap-3">
          <button className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 px-4 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors" type="button">
            <span className="material-symbols-outlined mr-2 text-[18px]">location_on</span>
            <span>New York</span>
          </button>
          <Link href="/login" className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#0a6a99] px-6 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors">Login</Link>
        </div>
      </div>
    </header>
  );
}
