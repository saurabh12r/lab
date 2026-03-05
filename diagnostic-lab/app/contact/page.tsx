"use client";

import { useState } from "react";
import Link from "next/link";
import { getContactInfo } from "@/services/contactService";

export default function ContactPage() {
  const CONTACT = getContactInfo();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!fullName.trim()) nextErrors.name = "Please enter your full name";
    if (!email.trim()) nextErrors.email = "Please enter a valid email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  function closeSuccess() {
    setSubmitted(false);
    setFullName("");
    setEmail("");
    setMobile("");
    setMessage("");
    setErrors({});
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
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
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
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Contact Us &amp; Support
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Have questions about your results or need to schedule a home collection? We&apos;re here to help you {CONTACT.supportHours}.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0a6a99]">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                  <h3 className="text-sm font-bold text-slate-900">Main Lab</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{CONTACT.address}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0a6a99]">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                  <h3 className="text-sm font-bold text-slate-900">Phone Support</h3>
                </div>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-[#0a6a99] hover:underline">
                  {CONTACT.phone}
                </a>
                <p className="text-xs text-slate-500">{CONTACT.phoneHours}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0a6a99]">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                  <h3 className="text-sm font-bold text-slate-900">Email Us</h3>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="text-sm font-medium text-[#0a6a99] hover:underline">
                  {CONTACT.email}
                </a>
                <p className="text-xs text-slate-500">{CONTACT.emailResponse}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0a6a99]">
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                  <h3 className="text-sm font-bold text-slate-900">Live Chat</h3>
                </div>
                <p className="text-sm text-slate-600">Chat with our support agent</p>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors mt-1"
                >
                  Start Chat
                </Link>
              </div>
            </div>

            {/* View on Google Maps */}
            <div className="mb-10">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0a6a99] font-semibold text-sm hover:underline"
              >
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                View on Google Maps
              </a>
            </div>

            {/* Form */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 relative">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="mt-2 text-slate-600 max-w-sm">
                    Thank you for contacting us. We will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={closeSuccess}
                    className="mt-6 h-11 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Send us a message</h2>
                  <p className="text-slate-600 text-sm mb-6">
                    Fill out the form below and we will get back to you shortly.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">person</span>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent ${
                            errors.name ? "border-red-300" : "border-slate-200"
                          }`}
                          placeholder="Full Name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent ${
                            errors.email ? "border-red-300" : "border-slate-200"
                          }`}
                          placeholder="Email Address"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.email}
                        </p>
                      )}
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
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent resize-none"
                        placeholder="Message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-12 px-8 rounded-xl bg-[#0a6a99] text-white text-base font-semibold shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </>
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
              <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Terms of Service</a>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/admin">Admin</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
