"use client";

import Link from "next/link";
import { getReportView, getReportViewResults } from "@/services/reportService";

const REPORT = getReportView();
const CBC_RESULTS = getReportViewResults();

const AVATAR_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCw7XQFAeaVihJoRYwmKbELJBkqn66NyrHsobrdLOwMXUm3tK0-8K2kam6s23Nbuc1fU-SWlQxwbZJ7ftekAoQtc44NgzE-8ViDRKFv4jQVHYW2ctmQaTGTlOgMSYn0r5g7DD5Td9NPl-RAi0jE8lWHC8AWUaPgy5BoiZgDZ_nu2ErJuOSGu6AhrufbSUPVwmbyD3J9bD0GfiZYkCdpgaOXz78zupD4mAX_SlmPvk-eWH34pi_Qr_I67eBL0sKuAKNVoIu-ORntsany";

const SIGNATURE_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBNGqu8_m7fEOohq1fTZdlSEoM1jGnpe3K1VZoZrXHwwvneCV2LwCXhuZ2JroXV4VwJgQl4OIM-HCPwBdCbOKrNAmnWDq7xwvnvsRDd8jg2Sw54uczx-LEp6-JhAuIN1q3vib_l160pJsDtVSBI1qbsd4V-J1jTI-A8RgctTaFN60Xat8-WSOEETBGCmViLJ07DfnneNGKhvNNTpqg_Ikzjkqr0fXEKAHc6mUkY1Nda4QOmFa-1h45nY9a6qVdWpnAV_SYJ4adowSs0";

const QR_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9-YklGHenwdpad2J2AxN4Nj7jOts-PXnTRbL7ORZJF0BTGzdqF4kWt2r9toqY8yWYEcGjxKCK3hE74nnFmm9QTAWDNG6hfDF5Rqkp-n3eRAX6Sk0OWynRDn7vHVhccf0OImZmxCCKv4KF4HXyo_eYgF2ZV_eIO100dqRPnIev-xjoiUPMk9kVywjP664N4wHsvVDNP0Y7UYrSexmWtBf3VLj3SnBfrKAMbDmmNV_CinOzFUxJsCM8078lN9d0dbs3_j1leY6n_hl6";

export default function ReportViewPage() {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <div className="bg-[#f5f7f8] font-[Inter,sans-serif] min-h-screen flex flex-col">

                {/* ── HEADER ── */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-10 py-3 sticky top-0 z-50">
                    <Link href="/" className="flex items-center gap-4 text-slate-900">
                        <div className="size-6 text-[#0fa5f0]">
                            <span className="material-symbols-outlined text-[28px]">biotech</span>
                        </div>
                        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Diagnostic Lab</h2>
                    </Link>

                    <div className="flex flex-1 justify-end gap-8">
                        <nav className="hidden md:flex items-center gap-9">
                            <Link className="text-slate-700 hover:text-[#0fa5f0] transition-colors text-sm font-medium" href="/">Home</Link>
                            <Link className="text-slate-700 hover:text-[#0fa5f0] transition-colors text-sm font-medium" href="/tests">Tests</Link>
                            <Link className="text-slate-900 font-semibold text-sm" href="/reports">Reports</Link>
                            <a className="text-slate-700 hover:text-[#0fa5f0] transition-colors text-sm font-medium" href="#">Profile</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-[#0fa5f0]/10 hover:bg-[#0fa5f0]/20 text-[#0fa5f0] transition-colors text-sm font-bold"
                            >
                                Log Out
                            </Link>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-slate-200"
                                style={{ backgroundImage: `url("${AVATAR_IMG}")` }}
                            />
                        </div>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-1 flex flex-col items-center py-6 px-4 sm:px-8 w-full">
                    <div className="w-full max-w-[1024px] flex flex-col gap-6">

                        {/* Breadcrumb + Title + Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                {/* Back link */}
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Link
                                        href="/reports"
                                        className="hover:text-[#0fa5f0] transition-colors flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                        Back to My Reports
                                    </Link>
                                </div>
                                <h1 className="text-slate-900 text-2xl sm:text-3xl font-bold tracking-tight">
                                    {REPORT.title}
                                </h1>
                                <p className="text-slate-500 text-sm">
                                    Generated on {REPORT.generated} • Reference ID:{" "}
                                    <span className="font-mono text-slate-700">{REPORT.refId}</span>
                                </p>
                            </div>

                            {/* Action Toolbar */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex bg-white rounded-lg shadow-sm border border-slate-200 p-1">
                                    <button
                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                        title="Share Report"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">share</span>
                                    </button>
                                    <button
                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                        title="Print Report"
                                        onClick={() => window.print()}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">print</span>
                                    </button>
                                    <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
                                    <button
                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                                        title="Fullscreen"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                                    </button>
                                </div>

                                <button className="flex items-center justify-center gap-2 bg-[#0fa5f0] hover:bg-sky-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm shadow-sky-200 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    <span>Download PDF</span>
                                </button>
                            </div>
                        </div>

                        {/* ── PDF VIEWER CONTAINER ── */}
                        <div className="bg-slate-200 rounded-xl p-1 shadow-inner border border-slate-300 overflow-hidden flex flex-col h-[800px] max-h-[75vh]">

                            {/* Mock PDF toolbar (dark) */}
                            <div className="bg-slate-700 text-white p-2 flex items-center justify-between rounded-t-lg text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="opacity-80">1 / 4</span>
                                    <div className="h-4 w-px bg-slate-500" />
                                    <button className="hover:bg-slate-600 p-1 rounded">
                                        <span className="material-symbols-outlined text-[18px]">remove</span>
                                    </button>
                                    <span className="font-mono">100%</span>
                                    <button className="hover:bg-slate-600 p-1 rounded">
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                    </button>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 opacity-80">
                                    <span>{REPORT.filename}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="hover:bg-slate-600 p-1 rounded">
                                        <span className="material-symbols-outlined text-[18px]">rotate_right</span>
                                    </button>
                                </div>
                            </div>

                            {/* PDF Content (simulated) */}
                            <div className="flex-1 bg-slate-500/50 overflow-y-auto p-8 flex justify-center">
                                <div className="bg-white min-h-[1000px] w-full max-w-[700px] shadow-2xl relative flex flex-col p-12 text-slate-800">

                                    {/* Report Header */}
                                    <div className="border-b-2 border-[#0fa5f0] pb-6 mb-8 flex justify-between items-start">
                                        <div>
                                            <h1 className="text-2xl font-bold text-slate-900 mb-1">MEDICAL LABORATORY REPORT</h1>
                                            <p className="text-sm text-slate-500 uppercase tracking-wide">Confidential</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#0fa5f0] font-bold text-lg mb-1">Diagnostic Lab Inc.</div>
                                            <p className="text-xs text-slate-500">123 Health Avenue, Medical District</p>
                                            <p className="text-xs text-slate-500">New York, NY 10001</p>
                                            <p className="text-xs text-slate-500">Ph: (555) 123-4567</p>
                                        </div>
                                    </div>

                                    {/* Patient Info Grid */}
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        {[
                                            { label: "Patient Name", value: REPORT.patient.name },
                                            { label: "Sample ID", value: REPORT.patient.sampleId },
                                            { label: "Age / Gender", value: REPORT.patient.ageGender },
                                            { label: "Collection Date", value: REPORT.patient.collection },
                                            { label: "Referred By", value: REPORT.patient.referredBy },
                                            { label: "Report Date", value: REPORT.patient.reportDate },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <p className="text-xs text-slate-500 uppercase font-semibold mb-0.5">{label}</p>
                                                <p className="font-medium">{value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CBC Results Table */}
                                    <div className="mb-8">
                                        <h3 className="font-bold text-lg mb-4 text-slate-900 border-b border-slate-200 pb-2">
                                            Complete Blood Count
                                        </h3>
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="py-3 px-2 font-semibold">Test Name</th>
                                                    <th className="py-3 px-2 font-semibold">Result</th>
                                                    <th className="py-3 px-2 font-semibold">Units</th>
                                                    <th className="py-3 px-2 font-semibold">Reference Range</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {CBC_RESULTS.map((row: { test: string; result: string; flag: string; unit: string; range: string; normal: boolean }) => (
                                                    <tr key={row.test}>
                                                        <td className="py-3 px-2 font-medium">{row.test}</td>
                                                        <td className={`py-3 px-2 font-bold ${row.normal ? "text-emerald-600" : "text-red-500"}`}>
                                                            {row.result}
                                                            {row.flag && (
                                                                <span className="text-[10px] align-top ml-0.5">{row.flag}</span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-2 text-slate-500">{row.unit}</td>
                                                        <td className="py-3 px-2 text-slate-500">{row.range}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Clinical Notes + Signature + QR */}
                                    <div className="mt-auto pt-8 border-t border-slate-200">
                                        <h4 className="font-bold text-sm mb-2">Clinical Notes:</h4>
                                        <p className="text-sm text-slate-600 italic">
                                            &ldquo;WBC count is slightly elevated, indicating a possible minor infection or inflammation. Follow up recommended if symptoms persist.&rdquo;
                                        </p>

                                        <div className="mt-12 flex justify-between items-end">
                                            {/* Signature */}
                                            <div className="flex flex-col items-center">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <div
                                                    className="h-12 w-32 bg-contain bg-no-repeat bg-center opacity-70 mb-2"
                                                    style={{ backgroundImage: `url('${SIGNATURE_IMG}')` }}
                                                />
                                                <div className="w-40 h-px bg-slate-900 mb-1" />
                                                <p className="text-xs font-bold">Dr. Richard Roe, MD</p>
                                                <p className="text-[10px] text-slate-500">Pathologist</p>
                                            </div>

                                            {/* QR Code */}
                                            <div className="text-right">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    alt="QR Code for verification"
                                                    className="w-16 h-16 opacity-80 mix-blend-multiply"
                                                    src={QR_IMG}
                                                />
                                                <p className="text-[10px] text-slate-400 mt-1">Scan to Verify</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-10">
                    <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>© 2026 Diagnostic Lab. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link className="hover:text-[#0fa5f0] transition-colors" href="/contact">Contact</Link>
                            <a className="hover:text-[#0fa5f0] transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-[#0fa5f0] transition-colors" href="#">Terms of Service</a>
                            <a className="hover:text-[#0fa5f0] transition-colors" href="#">Help Center</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
