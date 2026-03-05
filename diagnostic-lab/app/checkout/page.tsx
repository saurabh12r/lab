"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PaymentMethod = "card" | "upi" | "cash";

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

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

            <div className="bg-[#f6f7f8] font-[Inter,sans-serif] text-slate-900 antialiased overflow-x-hidden min-h-screen flex flex-col">

                {/* ── HEADER ── */}
                <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/80 backdrop-blur-md px-10 py-3">
                    <Link href="/" className="flex items-center gap-4 text-slate-900">
                        <div className="size-8 text-[#0a6a99] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[30px]">biotech</span>
                        </div>
                        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Diagnostic Lab</h2>
                    </Link>

                    <div className="hidden md:flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <Link className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="/">Home</Link>
                            <Link className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="/tests">Tests</Link>
                            <Link className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="/packages">Packages</Link>
                            <Link className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="/contact">Contact</Link>
                            <Link className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="/partnership">Partnership</Link>
                            <a className="text-slate-700 hover:text-[#0a6a99] transition-colors text-sm font-medium" href="#">About Us</a>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#0a6a99] hover:bg-[#085780] transition-colors text-white text-sm font-bold shadow-sm shadow-[#0a6a99]/30">
                                Login
                            </button>
                            <Link href="/packages" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-900 text-sm font-bold">
                                Book Test
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden text-slate-900">
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow flex flex-col items-center py-8">
                    <div className="flex flex-col w-full max-w-[1200px] px-4 md:px-10 flex-1">

                        {/* Progress Bar */}
                        <div className="flex flex-col gap-3 pb-8 max-w-3xl w-full mx-auto">
                            <div className="flex gap-6 justify-between items-center">
                                <p className="text-slate-900 text-lg font-semibold leading-normal">Checkout</p>
                                <p className="text-[#0a6a99] text-sm font-medium leading-normal">Step 4 of 5</p>
                            </div>
                            <div className="rounded-full bg-slate-200 h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-[#0a6a99]" style={{ width: "80%" }} />
                            </div>
                        </div>

                        {/* Page Title */}
                        <h1 className="text-slate-900 tracking-tight text-3xl md:text-4xl font-bold leading-tight pb-8 text-center md:text-left max-w-3xl mx-auto w-full">
                            Review Address &amp; Payment
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">

                            {/* ── LEFT COLUMN: Address Form ── */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    {/* Section header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#0a6a99]/10 rounded-lg text-[#0a6a99]">
                                            <span className="material-symbols-outlined">home_pin</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">Patient Address</h2>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Please provide the address where our technician should visit for sample collection.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 text-sm font-medium">Full Name</label>
                                            <input
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] focus:outline-none placeholder:text-slate-400 h-12 px-4 text-sm"
                                                placeholder="e.g. John Doe"
                                                type="text"
                                                defaultValue="Rahul Sharma"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 text-sm font-medium">Mobile Number</label>
                                            <input
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] focus:outline-none placeholder:text-slate-400 h-12 px-4 text-sm"
                                                placeholder="+1 (555) 000-0000"
                                                type="tel"
                                                defaultValue="+91 98765 43210"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="text-slate-700 text-sm font-medium">House No / Flat / Building</label>
                                            <input
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] focus:outline-none placeholder:text-slate-400 h-12 px-4 text-sm"
                                                placeholder="Apartment 4B, Sunshine Heights"
                                                type="text"
                                                defaultValue="Flat 12B, Sunrise Towers, Andheri West"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 text-sm font-medium">Landmark (Optional)</label>
                                            <input
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] focus:outline-none placeholder:text-slate-400 h-12 px-4 text-sm"
                                                placeholder="Near City Park"
                                                type="text"
                                                defaultValue="Near Andheri Station"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-slate-700 text-sm font-medium">Pincode</label>
                                            <input
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] focus:outline-none placeholder:text-slate-400 h-12 px-4 text-sm"
                                                placeholder="10001"
                                                type="text"
                                                defaultValue="400058"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2">
                                        <input
                                            className="rounded text-[#0a6a99] focus:ring-[#0a6a99] border-slate-300 bg-slate-50 w-4 h-4"
                                            id="save-address"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                        <label className="text-slate-600 text-sm cursor-pointer select-none" htmlFor="save-address">
                                            Save this address for future bookings
                                        </label>
                                    </div>
                                </div>

                                {/* Info Note */}
                                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex gap-4 items-start">
                                    <span className="material-symbols-outlined text-[#0a6a99] mt-0.5">info</span>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Important Note</h4>
                                        <p className="text-slate-600 text-sm mt-1">
                                            Our phlebotomist will arrive within a 30-minute window of your selected time slot. Please ensure someone is available at the address.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT COLUMN: Summary & Payment ── */}
                            <div className="lg:col-span-5 flex flex-col gap-6">

                                {/* Booking Summary Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-5">Booking Summary</h3>
                                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-600">Comprehensive Body Profile (65 Tests)</span>
                                            <span className="font-medium text-slate-900">$120.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-600">Home Collection Charges</span>
                                            <span className="font-medium text-green-600">
                                                FREE{" "}
                                                <span className="text-slate-400 line-through text-xs ml-1">$15.00</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-600">Discount (Summer Promo)</span>
                                            <span className="font-medium text-green-600">-$20.00</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-5 pb-2">
                                        <span className="text-base font-bold text-slate-900">Total Amount</span>
                                        <span className="text-xl font-bold text-[#0a6a99]">$100.00</span>
                                    </div>
                                    <p className="text-xs text-slate-400 text-right">Inclusive of all taxes</p>
                                </div>

                                {/* Payment Options */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 bg-[#0a6a99]/10 rounded-lg text-[#0a6a99]">
                                            <span className="material-symbols-outlined">payments</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">Payment Method</h3>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {/* Credit/Debit Card */}
                                        <label
                                            className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === "card"
                                                    ? "border-[#0a6a99] bg-[#0a6a99]/5"
                                                    : "border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    checked={paymentMethod === "card"}
                                                    onChange={() => setPaymentMethod("card")}
                                                    className="w-5 h-5 text-[#0a6a99] border-slate-300 focus:ring-[#0a6a99]"
                                                    name="payment_method"
                                                    type="radio"
                                                />
                                                <span className="text-slate-900 font-medium">Credit / Debit Card</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">VISA</div>
                                                <div className="h-6 w-10 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">MC</div>
                                            </div>
                                        </label>

                                        {/* Net Banking / UPI */}
                                        <label
                                            className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === "upi"
                                                    ? "border-[#0a6a99] bg-[#0a6a99]/5"
                                                    : "border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    checked={paymentMethod === "upi"}
                                                    onChange={() => setPaymentMethod("upi")}
                                                    className="w-5 h-5 text-[#0a6a99] border-slate-300 focus:ring-[#0a6a99]"
                                                    name="payment_method"
                                                    type="radio"
                                                />
                                                <span className="text-slate-900 font-medium">Net Banking / UPI</span>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400">account_balance</span>
                                        </label>

                                        {/* Cash on Collection */}
                                        <label
                                            className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === "cash"
                                                    ? "border-[#0a6a99] bg-[#0a6a99]/5"
                                                    : "border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    checked={paymentMethod === "cash"}
                                                    onChange={() => setPaymentMethod("cash")}
                                                    className="w-5 h-5 text-[#0a6a99] border-slate-300 focus:ring-[#0a6a99]"
                                                    name="payment_method"
                                                    type="radio"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 font-medium">Cash on Collection</span>
                                                    <span className="text-xs text-slate-500">Pay via cash or UPI to the phlebotomist</span>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400">payments</span>
                                        </label>
                                    </div>

                                    {/* Confirm & Pay */}
                                    <button
                                        onClick={() => router.push("/booking/success")}
                                        className="w-full mt-8 bg-[#0a6a99] hover:bg-[#085780] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#0a6a99]/20 transition-all flex items-center justify-between group"
                                    >
                                        <span>Confirm &amp; Pay</span>
                                        <span className="group-hover:translate-x-1 transition-transform material-symbols-outlined">arrow_forward</span>
                                    </button>

                                    {/* Security badge */}
                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                                        <span className="material-symbols-outlined text-[16px]">lock</span>
                                        <span>Payments are 100% secure and encrypted</span>
                                    </div>
                                </div>

                                {/* Back link */}
                                <Link
                                    href="/booking/slot"
                                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium px-2 py-2 rounded-lg hover:bg-slate-100 transition-colors w-fit"
                                >
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    Back to Schedule
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="bg-slate-100 py-6 mt-12 border-t border-slate-200">
                    <div className="flex justify-center px-4">
                        <div className="max-w-[960px] w-full flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
                            <p>© 2024 Diagnostic Lab. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a className="hover:text-[#0a6a99]" href="#">Privacy Policy</a>
                                <a className="hover:text-[#0a6a99]" href="#">Terms of Service</a>
                                <Link className="hover:text-[#0a6a99]" href="/support">Support</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
