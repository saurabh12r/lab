import Link from "next/link";
import { getBookingSuccessSummary } from "@/services/bookingService";

const BOOKING = getBookingSuccessSummary();

const PRIMARY = "#0ff05a";

export default function BookingSuccessPage() {
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

            <div className="bg-[#f5f8f6] font-[Inter,sans-serif] min-h-screen flex flex-col text-slate-900 overflow-x-hidden">

                {/* ── HEADER ── */}
                <header className="w-full border-b border-[#0ff05a]/20 bg-[#f5f8f6]/90 backdrop-blur sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="size-8 text-[#0ff05a]">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        clipRule="evenodd"
                                        d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">TruDiagnostics</h2>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-medium hover:text-[#0ff05a] transition-colors" href="/">Home</Link>
                            <a className="text-sm font-medium hover:text-[#0ff05a] transition-colors" href="#">Services</a>
                            <a className="text-sm font-medium hover:text-[#0ff05a] transition-colors" href="#">Locations</a>
                            <a className="text-sm font-medium hover:text-[#0ff05a] transition-colors" href="#">My Reports</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button className="hidden md:flex items-center justify-center rounded-lg h-9 px-4 bg-[#0ff05a] text-slate-900 text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                                Login
                            </button>
                        </div>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow flex items-center justify-center py-12 px-4 relative">

                    {/* Confetti background shapes */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-[#0ff05a]/40 rounded-full" />
                        <div className="absolute top-[20%] right-[10%] w-4 h-4 bg-[#0ff05a]/20 rotate-45 rounded" />
                        <div className="absolute bottom-[20%] left-[20%] w-2 h-6 bg-[#0ff05a]/30 rotate-12 rounded" />
                        <div className="absolute top-[15%] left-[40%] w-3 h-3 border-2 border-[#0ff05a]/30 rounded-full" />
                        <div className="absolute bottom-[30%] right-[25%] w-5 h-5 bg-[#0ff05a]/10 rounded-full" />
                        <div className="absolute top-[40%] left-[5%] w-2 h-2 bg-[#0ff05a]/50 rounded-full" />
                        <div className="absolute top-[60%] right-[5%] w-3 h-3 bg-[#0ff05a]/30 rotate-45" />
                    </div>

                    {/* Card */}
                    <div className="w-full max-w-[640px] flex flex-col items-center bg-white rounded-2xl shadow-xl border border-[#0ff05a]/10 p-8 md:p-12 relative z-10">

                        {/* Success icon with glow */}
                        <div className="mb-8 relative">
                            <div className="w-24 h-24 bg-[#0ff05a]/10 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#0ff05a] text-6xl">check_circle</span>
                            </div>
                            <div className="absolute inset-0 bg-[#0ff05a]/20 blur-xl rounded-full -z-10" />
                        </div>

                        {/* Header text */}
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
                            Booking Confirmed!
                        </h1>
                        <p className="text-slate-600 text-center text-lg mb-8 max-w-md">
                            Your diagnostic test has been successfully scheduled. We have sent a confirmation email to your registered address.
                        </p>

                        {/* Booking Details Card */}
                        <div className="w-full bg-[#f5f8f6] rounded-xl p-6 mb-8 border border-[#0ff05a]/20 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Booking ID */}
                            <div className="flex flex-col gap-1 items-center md:items-start border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                                <div className="flex items-center gap-2 text-[#0dcc4d]">
                                    <span className="material-symbols-outlined text-xl">receipt_long</span>
                                    <span className="text-sm font-semibold uppercase tracking-wider">Booking ID</span>
                                </div>
                                <p className="text-xl font-bold text-slate-900 mt-1">{BOOKING.id}</p>
                            </div>
                            {/* Est. Report Date */}
                            <div className="flex flex-col gap-1 items-center md:items-start pl-0 md:pl-2">
                                <div className="flex items-center gap-2 text-[#0dcc4d]">
                                    <span className="material-symbols-outlined text-xl">event_available</span>
                                    <span className="text-sm font-semibold uppercase tracking-wider">Est. Report Date</span>
                                </div>
                                <p className="text-xl font-bold text-slate-900 mt-1">{BOOKING.reportDate}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center justify-center gap-2 h-12 px-6 bg-[#0ff05a] text-slate-900 text-base font-bold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                                >
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    <span>View Booking</span>
                                </Link>
                                <Link
                                    href="/tracking"
                                    className="flex items-center justify-center gap-2 h-12 px-6 bg-white border-2 border-[#0ff05a]/40 text-slate-900 text-base font-bold rounded-xl hover:border-[#0ff05a] hover:bg-[#0ff05a]/5 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                                    <span>Track Order</span>
                                </Link>
                                <Link
                                    href="/feedback"
                                    className="flex items-center justify-center gap-2 h-12 px-6 bg-white border-2 border-[#0ff05a]/40 text-slate-900 text-base font-bold rounded-xl hover:border-[#0ff05a] hover:bg-[#0ff05a]/5 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">star</span>
                                    <span>Rate Experience</span>
                                </Link>
                                <button className="flex items-center justify-center gap-2 h-12 px-6 bg-white border-2 border-[#0ff05a]/20 text-slate-900 text-base font-bold rounded-xl hover:border-[#0ff05a]/50 hover:bg-[#0ff05a]/5 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    <span>Download Invoice</span>
                                </button>
                            </div>
                            <Link
                                href="/"
                                className="w-full flex items-center justify-center gap-2 h-12 px-6 text-slate-600 text-sm font-medium hover:text-[#0dcc4d] transition-colors mt-2"
                            >
                                <span>Go to Dashboard</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Help link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500">
                                Need help?{" "}
                                <Link className="text-[#0dcc4d] font-medium hover:underline" href="/contact">
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="border-t border-[#0ff05a]/20 bg-[#f5f8f6] py-10 mt-auto">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                            <a className="text-slate-600 hover:text-[#0dcc4d] transition-colors text-sm" href="#">Privacy Policy</a>
                            <a className="text-slate-600 hover:text-[#0dcc4d] transition-colors text-sm" href="#">Terms of Service</a>
                            <a className="text-slate-600 hover:text-[#0dcc4d] transition-colors text-sm" href="#">Help Center</a>
                        </div>
                        <p className="text-slate-500 text-sm">© 2023 TruDiagnostics Labs. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
