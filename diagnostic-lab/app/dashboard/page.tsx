import Link from "next/link";
import { getDashboardStats, getBookings, getDashboardProfileImg } from "@/services/dashboardService";

type StatusType = "Sample Collected" | "Report Ready" | "Pending" | "Completed" | "Cancelled";

const STATUS_STYLES: Record<StatusType, string> = {
    "Sample Collected": "bg-emerald-100 text-emerald-800",
    "Report Ready": "bg-blue-100 text-blue-800",
    "Pending": "bg-yellow-100 text-yellow-800",
    "Completed": "bg-slate-100 text-slate-800",
    "Cancelled": "bg-red-100 text-red-800",
};

const STATUS_DOT: Record<StatusType, string> = {
    "Sample Collected": "bg-emerald-500",
    "Report Ready": "bg-blue-500",
    "Pending": "bg-yellow-500",
    "Completed": "bg-slate-500",
    "Cancelled": "bg-red-500",
};

export default function DashboardPage() {
    const STATS = getDashboardStats();
    const BOOKINGS = getBookings();
    const PROFILE_IMG = getDashboardProfileImg();
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

            <div className="relative flex min-h-screen w-full flex-row overflow-hidden bg-[#f8fafc] font-[Inter,sans-serif] text-slate-900 antialiased">

                {/* ── SIDEBAR ── */}
                <aside className="w-72 bg-white border-r border-slate-200 flex-col hidden lg:flex sticky top-0 h-screen overflow-y-auto">
                    <div className="p-6">
                        {/* User Profile */}
                        <div className="flex items-center gap-4 mb-8">
                            <div
                                className="h-12 w-12 rounded-full bg-cover bg-center border-2 border-[#0a6a99]"
                                style={{ backgroundImage: `url('${PROFILE_IMG}')` }}
                            />
                            <div>
                                <h2 className="text-base font-bold text-slate-900">John Doe</h2>
                                <p className="text-xs text-slate-500">ID: #TRU-98234</p>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex flex-col gap-1">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e0f2fe]/50 text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">event_available</span>
                                <span className="text-sm font-bold">My Bookings</span>
                            </Link>
                            <Link
                                href="/reports"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">description</span>
                                <span className="text-sm font-medium">Test Reports</span>
                            </Link>
                            <Link
                                href="/upload-prescription"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">upload_file</span>
                                <span className="text-sm font-medium">Upload Prescription</span>
                            </Link>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">group</span>
                                <span className="text-sm font-medium">Family Members</span>
                            </a>
                            <Link
                                href="/contact"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">contact_support</span>
                                <span className="text-sm font-medium">Contact</span>
                            </Link>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0a6a99] transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                <span className="text-sm font-medium">Profile Settings</span>
                            </a>
                        </nav>
                    </div>

                    {/* Logout */}
                    <div className="mt-auto p-6 border-t border-slate-200">
                        <Link
                            href="/login"
                            className="flex w-full items-center justify-center gap-2 rounded-xl h-10 px-4 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-sm font-semibold"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            <span>Logout</span>
                        </Link>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden">

                    {/* Mobile Header */}
                    <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-8 w-8 rounded-full bg-cover bg-center border border-[#0a6a99]"
                                style={{ backgroundImage: `url('${PROFILE_IMG}')` }}
                            />
                            <span className="font-bold text-slate-900">John Doe</span>
                        </div>
                        <button className="p-2 text-slate-500">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8 lg:px-12">
                        <div className="mx-auto max-w-7xl w-full">

                            {/* Page Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Bookings</h1>
                                    <p className="text-slate-500 mt-1 text-sm">Manage and track your diagnostic appointments history.</p>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    <Link
                                        href="/feedback"
                                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-[#0a6a99]/50 hover:text-[#0a6a99] transition-colors text-sm font-medium"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">rate_review</span>
                                        Leave Feedback
                                    </Link>
                                    <Link
                                        href="/upload-prescription"
                                        className="flex items-center gap-2 px-4 py-2 border border-[#0a6a99] text-[#0a6a99] rounded-lg hover:bg-[#0a6a99]/5 transition-colors text-sm font-medium"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                        Upload Prescription
                                    </Link>
                                    <Link
                                        href="/packages"
                                        className="flex items-center gap-2 px-4 py-2 bg-[#0a6a99] text-white rounded-lg shadow-sm hover:bg-[#064b6e] transition-colors text-sm font-medium"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        New Booking
                                    </Link>
                                </div>
                            </div>

                            {/* Stat Filter Pills */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                                {STATS.map((stat) => (
                                    <button
                                        key={stat.label}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white shadow-sm transition-all ${stat.active
                                                ? "border-2 border-[#0a6a99] text-[#0a6a99]"
                                                : `border border-slate-200 text-slate-500 group ${stat.hoverColor}`
                                            }`}
                                    >
                                        <span className="text-2xl font-bold">{stat.count}</span>
                                        <span className="text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Search + Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                <div className="relative flex-1 w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                        search
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:ring-0 focus:outline-none"
                                        placeholder="Search by Booking ID or Package..."
                                        type="text"
                                    />
                                </div>
                                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <select className="flex-1 sm:w-40 px-3 py-2 bg-slate-50 border-none rounded-md text-sm text-slate-700 focus:ring-1 focus:ring-[#0a6a99] cursor-pointer focus:outline-none">
                                        <option>Last 30 Days</option>
                                        <option>Last 3 Months</option>
                                        <option>Last Year</option>
                                        <option>Custom Range</option>
                                    </select>
                                    <button className="px-3 py-2 text-slate-500 hover:text-[#0a6a99] transition-colors">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </button>
                                </div>
                            </div>

                            {/* Bookings Table */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking ID</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Package Name</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">City / Area</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {BOOKINGS.map((bk) => (
                                                <tr key={bk.id} className="group hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-slate-900">{bk.id}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`p-1.5 rounded ${bk.iconBg}`}>
                                                                <span className="material-symbols-outlined text-[18px]">{bk.icon}</span>
                                                            </div>
                                                            <span className="text-sm text-slate-700 font-medium">{bk.package}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{bk.date}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                                                        <div>{bk.city}</div>
                                                        <div className="text-xs text-slate-400">{bk.area}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[bk.status]}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${STATUS_DOT[bk.status]}`} />
                                                            {bk.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href={bk.actionLink}
                                                            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${bk.actionClass}`}
                                                        >
                                                            <span className="material-symbols-outlined text-[16px]">{bk.actionIcon}</span>
                                                            {bk.action}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Showing <span className="font-medium text-slate-900">1-5</span> of{" "}
                                        <span className="font-medium text-slate-900">12</span> results
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button disabled className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 disabled:opacity-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                        </button>
                                        <button className="h-8 w-8 rounded-lg bg-[#0a6a99] text-white text-sm font-medium shadow-sm flex items-center justify-center">
                                            1
                                        </button>
                                        <button className="h-8 w-8 rounded-lg hover:bg-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center transition-colors">
                                            2
                                        </button>
                                        <button className="h-8 w-8 rounded-lg hover:bg-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center transition-colors">
                                            3
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
