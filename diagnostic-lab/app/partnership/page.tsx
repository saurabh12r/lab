"use client";

import { useState } from "react";
import Link from "next/link";
import { getPartnershipBenefits, getPartnershipServices, getPartnershipCompany } from "@/services/partnershipService";

export default function PartnershipPage() {
  const BENEFITS = getPartnershipBenefits();
  const SERVICES = getPartnershipServices();
  const COMPANY = getPartnershipCompany();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim()) return;
    setSubmitted(true);
  }

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
                <span className="text-slate-900 text-lg font-bold tracking-tight">Quick Care Pathology</span>
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/tests">Tests</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/upload-prescription">Upload Prescription</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/blog">Blog</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
                <Link className="text-slate-600 text-sm font-medium text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
                <a className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="#">About Us</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors">
                Login
              </Link>
              <Link href="/packages" className="h-10 px-5 items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#0a6a99]/90 transition-all shadow-lg shadow-[#0a6a99]/20 flex gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span className="hidden sm:inline">Book Test</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Hero */}
            <section className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Business Partnership
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Partner with Quick Care Pathology for corporate wellness, bulk testing, and employee health programs. We offer tailored solutions for enterprises.
              </p>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Why Partner With Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BENEFITS.map((item: { icon: string; title: string; description: string }) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex gap-4"
                  >
                    <div className="size-12 rounded-full bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99] shrink-0">
                      <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Services We Offer</h2>
              <ul className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s: string) => (
                  <li key={s} className="flex items-center gap-2 text-slate-700">
                    <span className="material-symbols-outlined text-[20px] text-[#0a6a99]">check_circle</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Company info */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About {COMPANY.name}</h2>
              <p className="text-slate-600 mb-4">{COMPANY.tagline}</p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                <span>Founded {COMPANY.founded}</span>
                <span>{COMPANY.employees} employees</span>
              </div>
            </section>

            {/* Partnership inquiry form */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Partnership Inquiry</h2>
              <p className="text-slate-600 text-sm mb-6">
                Fill out the form below and our business team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Request Received</h3>
                  <p className="mt-2 text-slate-600 max-w-sm mx-auto">
                    Thank you for your interest in partnering with us. We will contact you shortly.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                        placeholder="work@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/"
                      className="h-12 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="h-12 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors inline-flex items-center justify-center"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 Quick Care Pathology. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/partnership">Business Partnership</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
