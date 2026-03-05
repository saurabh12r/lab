"use client";

import Link from "next/link";
import { getTrackingOrder, getTrackingTimeline, getTrackingLiveLocation } from "@/services/trackingService";

export default function TrackingPage() {
    const ORDER = getTrackingOrder();
    const TIMELINE = getTrackingTimeline();
    const LIVE_LOCATION = getTrackingLiveLocation();
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
            <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}</style>

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
                    <div className="max-w-3xl mx-auto flex flex-col gap-8">

                        {/* Page title */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                Booking {ORDER.bookingId} Status
                            </h1>
                            <p className="mt-2 text-slate-600 text-base">
                                Track the real-time status of your diagnostic test and sample collection.
                            </p>
                        </div>

                        {/* Info cards: Patient, Test Type, Est. Report Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#0a6a99]">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Patient Name</span>
                                </div>
                                <p className="text-lg font-bold text-slate-900">{ORDER.patientName}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#0a6a99]">
                                    <span className="material-symbols-outlined text-[20px]">science</span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Test Type</span>
                                </div>
                                <p className="text-lg font-bold text-slate-900">{ORDER.testType}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#0a6a99]">
                                    <span className="material-symbols-outlined text-[20px]">event</span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Est. Report Date</span>
                                </div>
                                <p className="text-lg font-bold text-slate-900">{ORDER.estReportDate}</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[22px] text-[#0a6a99]">timeline</span>
                                    Timeline
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="relative pl-1">
                                    {TIMELINE.map((step: { id: string; icon: string; title: string; time?: string | null; label?: string; description?: string; detail?: string; subDetail?: string; status: string }, index: number) => (
                                        <div key={step.id} className="flex gap-4 relative pb-8 last:pb-0">
                                            {/* Vertical line between steps */}
                                            {index < TIMELINE.length - 1 && (
                                                <div
                                                    className={`absolute left-5 top-10 w-0.5 ${
                                                        step.status === "done" ? "bg-[#0a6a99]" : "bg-slate-200"
                                                    }`}
                                                    style={{ height: "calc(100% - 0.5rem)" }}
                                                />
                                            )}
                                            {/* Icon */}
                                            <div
                                                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                                    step.status === "done"
                                                        ? "bg-[#0a6a99] text-white"
                                                        : step.status === "in_progress"
                                                            ? "bg-[#0a6a99]/20 text-[#0a6a99] ring-2 ring-[#0a6a99]/40"
                                                            : "bg-slate-100 text-slate-400"
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {step.status === "done" ? "check_circle" : step.icon}
                                                </span>
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                                                    {step.label && (
                                                        <span
                                                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                                step.label === "In Progress"
                                                                    ? "bg-[#0a6a99]/15 text-[#0a6a99]"
                                                                    : "bg-slate-100 text-slate-500"
                                                            }`}
                                                        >
                                                            {step.label}
                                                        </span>
                                                    )}
                                                </div>
                                                {step.time && (
                                                    <p className="text-sm text-slate-500 mt-0.5">{step.time}</p>
                                                )}
                                                {step.description && (
                                                    <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                                                )}
                                                {step.detail && (
                                                    <p className="text-sm font-medium text-slate-700 mt-1">{step.detail}</p>
                                                )}
                                                {step.subDetail && (
                                                    <p className="text-sm text-slate-500">{step.subDetail}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Live Location */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#0a6a99] text-[24px]">location_on</span>
                                        <h3 className="text-lg font-bold text-slate-900">Live Location</h3>
                                    </div>
                                    {LIVE_LOCATION.active && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-3">Current Location</p>
                            <p className="text-base font-medium text-slate-900 mt-1">{LIVE_LOCATION.address}</p>
                        </div>

                        {/* Need Help? */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#0a6a99] text-[22px]">support_agent</span>
                                Need Help?
                            </h3>
                            <p className="text-slate-600 text-sm mt-2">
                                Have questions about your booking or the sample collection process?
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                                >
                                    Chat on WhatsApp
                                </a>
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Visit Help Center
                                </Link>
                            </div>
                        </div>

                        {/* Back to Dashboard */}
                        <div className="flex justify-center pt-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 text-[#0a6a99] font-semibold text-sm hover:text-[#064b6e] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="mt-auto border-t border-slate-200 bg-white">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">© 2024 Trutest Diagnostics. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Privacy Policy</a>
                            <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Terms of Service</a>
                            <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
