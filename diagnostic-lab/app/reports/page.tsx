import Link from "next/link";
import { getReportStatCards, getReports } from "@/services/reportService";

const PROFILE_IMG =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA-8pDX0aU1lYxWFvPTHafWG-rOHiv7pgQKh6d2XQB-uWjXeXWGAVfkYksNd0M6axfFi2s-LYP7ggM5KMc9klb40yiGUOvFiZSCuf8TNiYZTsdiRrU8venMYQwPwNuvA_dh6hpVvAjN67Gc93zWXzwMm2s_1bq2VB56YUl7VWTRyCch3yUqLBROCuBZzlKGAC1SLTQzrL8l0sj2W4B-008HCnpB9__iYahqNtBzTVWnfCw_O_8P9T82k9EwzoNskRpFwxh586RyfbrY";

export default function ReportsPage() {
    const STAT_CARDS = getReportStatCards();
    const REPORTS = getReports();
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <div className="bg-[#f6f7f8] font-[Inter,sans-serif] text-slate-900 min-h-screen flex flex-col antialiased">

                {/* ── HEADER ── */}
                <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Left: Logo + Nav */}
                        <div className="flex items-center gap-10">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="bg-[#0b73a8]/10 p-2 rounded-lg text-[#0b73a8] group-hover:bg-[#0b73a8] group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">biotech</span>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">Diagnostic Lab</span>
                            </Link>

                            <nav className="hidden md:flex items-center gap-8">
                                <Link className="text-sm font-medium text-slate-600 hover:text-[#0b73a8] transition-colors" href="/">Home</Link>
                                <Link className="text-sm font-medium text-slate-600 hover:text-[#0b73a8] transition-colors" href="/packages">Book a Test</Link>
                                <Link className="text-sm font-medium text-[#0b73a8] border-b-2 border-[#0b73a8] pb-0.5" href="/reports">My Reports</Link>
                                <a className="text-sm font-medium text-slate-600 hover:text-[#0b73a8] transition-colors" href="#">Profile</a>
                            </nav>
                        </div>

                        {/* Right: Search + User */}
                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-[#0b73a8]/20 transition-all">
                                <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                                <input
                                    className="bg-transparent border-none text-sm w-full focus:ring-0 focus:outline-none placeholder:text-slate-400 ml-2"
                                    placeholder="Search tests, reports..."
                                    type="text"
                                />
                            </div>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
                                    <p className="text-xs text-slate-500">Patient ID: #9283</p>
                                </div>
                                <div
                                    className="h-10 w-10 rounded-full border-2 border-white shadow-sm bg-[#0b73a8]/10 flex items-center justify-center overflow-hidden"
                                    style={{ backgroundImage: `url('${PROFILE_IMG}')`, backgroundSize: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8">

                    {/* Page Title */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">My Reports</h1>
                            <p className="text-slate-500 mt-2">View, download, and manage your diagnostic test results history.</p>
                        </div>
                        <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 bg-[#0b73a8] hover:bg-[#085a85] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-[#0b73a8]/30"
                        >
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            Book New Test
                        </Link>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {STAT_CARDS.map((card) => (
                            <div key={card.label} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className={`${card.iconBg} p-3 rounded-lg`}>
                                    <span className="material-symbols-outlined">{card.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{card.label}</p>
                                    <p className="text-xl font-bold text-slate-900">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reports Table Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">

                        {/* Tab Filter Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-sm font-medium bg-[#0b73a8]/10 text-[#0b73a8] rounded-lg">All</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">Completed</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">Processing</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 material-symbols-outlined text-lg">filter_list</span>
                                <span className="text-sm font-medium text-slate-500">Filter by Date</span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking ID</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {REPORTS.map((report) => (
                                        <tr key={report.bookingId} className="hover:bg-slate-50/80 transition-colors group">
                                            {/* Report Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`${report.iconBg} p-2 rounded-lg`}>
                                                        <span className="material-symbols-outlined">{report.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{report.name}</p>
                                                        <p className="text-xs text-slate-500">{report.sub}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Booking ID */}
                                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">{report.bookingId}</td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-sm text-slate-600">{report.date}</td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                {report.status === "Ready" ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                                                        Ready
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5 animate-pulse" />
                                                        Processing
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {report.status === "Ready" ? (
                                                        <>
                                                            <button
                                                                className="p-2 text-slate-400 hover:text-[#0b73a8] hover:bg-[#0b73a8]/5 rounded-lg transition-colors"
                                                                title="Download"
                                                            >
                                                                <span className="material-symbols-outlined text-xl">download</span>
                                                            </button>
                                                            <Link
                                                                href="/reports/view"
                                                                className="p-2 text-slate-400 hover:text-[#0b73a8] hover:bg-[#0b73a8]/5 rounded-lg transition-colors"
                                                                title="View PDF"
                                                            >
                                                                <span className="material-symbols-outlined text-xl">visibility</span>
                                                            </Link>
                                                            <button
                                                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Share"
                                                            >
                                                                <span className="material-symbols-outlined text-xl">share</span>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button disabled className="p-2 text-slate-300 cursor-not-allowed" title="Download">
                                                                <span className="material-symbols-outlined text-xl">download</span>
                                                            </button>
                                                            <Link
                                                                href="/reports/view"
                                                                className="px-3 py-1.5 text-xs font-medium text-[#0b73a8] bg-[#0b73a8]/10 rounded-lg hover:bg-[#0b73a8]/20 transition-colors"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-medium">1</span> to{" "}
                                <span className="font-medium">4</span> of{" "}
                                <span className="font-medium">24</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <button disabled className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <button className="px-3 py-1 text-sm bg-[#0b73a8]/10 text-[#0b73a8] rounded-md font-medium">1</button>
                                <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-md">2</button>
                                <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-md">3</button>
                                <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-md">Next</button>
                            </div>
                        </div>
                    </div>

                    {/* Empty State Variant */}
                    <div className="mt-12 mb-8">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Empty State Variant</h3>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center text-center max-w-2xl mx-auto">
                            <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 bg-[#0b73a8]/5 rounded-full animate-pulse" />
                                <span className="material-symbols-outlined text-6xl text-slate-300">plagiarism</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">No reports found</h2>
                            <p className="text-slate-500 max-w-md mb-8">
                                You haven&apos;t booked any tests yet, or your reports are being processed. Book a test now to see your diagnostic history here.
                            </p>
                            <Link
                                href="/packages"
                                className="inline-flex items-center gap-2 bg-[#0b73a8] hover:bg-[#085a85] text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg shadow-[#0b73a8]/30 hover:-translate-y-0.5 transform"
                            >
                                <span className="material-symbols-outlined">calendar_add_on</span>
                                Book a Test Now
                            </Link>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="bg-white border-t border-slate-200 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            {/* Brand */}
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 mb-4 text-[#0b73a8]">
                                    <span className="material-symbols-outlined text-2xl">biotech</span>
                                    <span className="text-lg font-bold text-slate-900">Diagnostic Lab</span>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Trusted by thousands for accurate and timely diagnostic reports. Your health is our priority.
                                </p>
                            </div>
                            {/* Quick Links */}
                            <div>
                                <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li><Link className="hover:text-[#0b73a8]" href="/">Home</Link></li>
                                    <li><Link className="hover:text-[#0b73a8]" href="/packages">Book a Test</Link></li>
                                    <li><a className="hover:text-[#0b73a8]" href="#">Health Packages</a></li>
                                    <li><a className="hover:text-[#0b73a8]" href="#">Nearest Centre</a></li>
                                </ul>
                            </div>
                            {/* Support */}
                            <div>
                                <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li><a className="hover:text-[#0b73a8]" href="#">Help Center</a></li>
                                    <li><Link className="hover:text-[#0b73a8]" href="/contact">Contact Us</Link></li>
                                    <li><a className="hover:text-[#0b73a8]" href="#">Privacy Policy</a></li>
                                    <li><a className="hover:text-[#0b73a8]" href="#">Terms of Service</a></li>
                                </ul>
                            </div>
                            {/* Connect */}
                            <div>
                                <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
                                <div className="flex gap-4">
                                    <a className="text-slate-400 hover:text-[#0b73a8] transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                                    <a className="text-slate-400 hover:text-[#0b73a8] transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                                    <a className="text-slate-400 hover:text-[#0b73a8] transition-colors" href="#"><span className="material-symbols-outlined">call</span></a>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                            <p>© 2023 Diagnostic Lab. All rights reserved.</p>
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <a className="hover:text-[#0b73a8]" href="#">Privacy</a>
                                <a className="hover:text-[#0b73a8]" href="#">Terms</a>
                                <a className="hover:text-[#0b73a8]" href="#">Cookies</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
