"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupportInfo, getPreferredTimes } from "@/services/supportService";

export default function SupportPage() {
  const SUPPORT = getSupportInfo();
  const PREFERRED_TIMES = getPreferredTimes();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) return;
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
    setFullName("");
    setMobile("");
    setPreferredTime("");
  }

  const whatsAppUrl = `https://wa.me/${SUPPORT.whatsAppNumber.replace(/\D/g, "")}`;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#f6f7f8] font-[Inter,sans-serif] text-slate-900 antialiased min-h-screen flex flex-col">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="size-8 text-[#0a6a99] flex items-center justify-center bg-[#0a6a99]/10 rounded-lg group-hover:bg-[#0a6a99]/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5 16.5L16.5 10.5L15.09 9.09L10.5 13.67L8.91 12.09L7.5 13.5L10.5 16.5Z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-900 text-lg font-bold tracking-tight">Trutest Diagnostics</span>
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
              </nav>
            </div>
            <Link href="/packages" className="h-10 px-5 flex items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors">
              Book Test
            </Link>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-2xl mx-auto space-y-10">

            {/* Request a Call Back */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99]">
                    <span className="material-symbols-outlined text-[28px]">phone_callback</span>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      Request a Call Back
                    </h1>
                    <p className="text-slate-600 mt-1">
                      Leave your details and our expert will call you shortly.
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <span className="material-symbols-outlined text-[40px]">check_circle</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Request Received</h3>
                    <p className="mt-2 text-slate-600">
                      We will call you at your preferred time. Our team will reach out shortly.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-6 h-11 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">person</span>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">smartphone</span>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                          placeholder="Mobile Number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Time</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">schedule</span>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent appearance-none cursor-pointer"
                        >
                          <option value="">Select time slot</option>
                          {PREFERRED_TIMES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px] pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#0a6a99] text-white text-base font-semibold shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Submit Request
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                    <p className="text-xs text-slate-500">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-[#0a6a99] hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </section>

            {/* Prefer to Chat? */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <span className="material-symbols-outlined text-[28px]">chat</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Prefer to Chat?
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Get instant answers to your queries, book tests, or download reports directly through WhatsApp.
                  </p>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    Start Chat on WhatsApp
                  </a>
                </div>
              </div>
            </section>

            {/* Footer links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0a6a99] transition-colors font-medium"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Return to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0a6a99] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                Email Us
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0a6a99] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">help</span>
                FAQs
              </a>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2024 Trutest Diagnostics. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
