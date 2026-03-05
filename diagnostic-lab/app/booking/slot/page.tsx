"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBookingSlots } from "@/services/bookingService";

const MONTH_NAME = "October 2023";
const MONTH_OFFSET = 0;
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const INITIAL_DAY = 5;

function SlotButton({
    time,
    disabled,
    selected,
    onSelect,
}: {
    time: string;
    disabled: boolean;
    selected: boolean;
    onSelect: () => void;
}) {
    if (disabled) {
        return (
            <button
                disabled
                className="py-2 px-3 text-sm font-medium border border-slate-200 rounded-lg bg-slate-50 text-slate-400 cursor-not-allowed"
            >
                {time}
            </button>
        );
    }
    if (selected) {
        return (
            <button
                onClick={onSelect}
                className="py-2 px-3 text-sm font-bold border-[#0a6a99] bg-[#0a6a99] text-white rounded-lg shadow-sm ring-2 ring-[#0a6a99] ring-offset-2"
            >
                {time}
            </button>
        );
    }
    return (
        <button
            onClick={onSelect}
            className="py-2 px-3 text-sm font-medium border border-slate-200 rounded-lg hover:border-[#0a6a99] hover:text-[#0a6a99] hover:bg-[#0a6a99]/5 transition-all text-slate-700"
        >
            {time}
        </button>
    );
}

export default function SlotPage() {
    const router = useRouter();
    const slots = getBookingSlots();
    const MORNING_SLOTS = slots.morning as { time: string; disabled: boolean }[];
    const AFTERNOON_SLOTS = slots.afternoon as { time: string; disabled: boolean }[];
    const EVENING_SLOTS = slots.evening as { time: string; disabled: boolean }[];
    const [selectedDay, setSelectedDay] = useState(INITIAL_DAY);
    const [selectedSlot, setSelectedSlot] = useState("07:30 AM");

    const selectedDateLabel = `Oct ${selectedDay}, 2023`;
    const selectedSlotRange = selectedSlot
        ? `${selectedSlot} - ${getEndSlot(selectedSlot)}`
        : null;

    function getEndSlot(start: string) {
        const allSlots = [...MORNING_SLOTS, ...AFTERNOON_SLOTS, ...EVENING_SLOTS].map(
            (s) => s.time
        );
        const idx = allSlots.indexOf(start);
        return idx >= 0 && idx < allSlots.length - 1
            ? allSlots[idx + 1]
            : "—";
    }

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

            <div className="bg-[#f6f7f8] text-slate-900 font-[Inter,sans-serif] min-h-screen flex flex-col">

                {/* ── HEADER ── */}
                <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 text-[#0a6a99]">
                            <div className="size-8 text-[#0a6a99]">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        clipRule="evenodd"
                                        d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-slate-900 text-xl font-bold tracking-tight">Trutest Diagnostics</h2>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <Link className="text-slate-600 hover:text-[#0a6a99] font-medium transition-colors text-sm" href="/">Home</Link>
                            <Link className="text-slate-600 hover:text-[#0a6a99] font-medium transition-colors text-sm" href="/tests">Tests</Link>
                            <Link className="text-slate-600 hover:text-[#0a6a99] font-medium transition-colors text-sm" href="/packages">Packages</Link>
                            <a className="text-slate-600 hover:text-[#0a6a99] font-medium transition-colors text-sm" href="#">About Us</a>
                            <Link className="text-slate-600 hover:text-[#0a6a99] font-medium transition-colors text-sm" href="/contact">Contact</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-[#0a6a99] text-white text-sm font-bold hover:bg-[#085780] transition-colors">
                                Login
                            </button>
                        </div>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6">
                    <div className="w-full max-w-6xl flex flex-col gap-8">

                        {/* ── PROGRESS STEPPER ── */}
                        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-end">
                                    <h1 className="text-xl font-bold text-slate-900">Schedule Appointment</h1>
                                    <span className="text-slate-500 text-sm font-medium">Step 2 of 4</span>
                                </div>
                                <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full bg-[#0a6a99] w-1/2 rounded-full transition-all duration-500" />
                                </div>
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span className="text-[#0a6a99]">Package Selection</span>
                                    <span className="text-[#0a6a99]">Schedule</span>
                                    <span>Address Details</span>
                                    <span>Payment</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* ── LEFT COLUMN ── */}
                            <div className="flex-1 flex flex-col gap-6">

                                {/* Calendar */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="p-6 border-b border-slate-100">
                                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#0a6a99]">calendar_month</span>
                                            Select Date
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {/* Month nav */}
                                        <div className="flex items-center justify-between mb-6">
                                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-[#0a6a99] transition-colors">
                                                <span className="material-symbols-outlined">chevron_left</span>
                                            </button>
                                            <span className="text-lg font-bold text-slate-900">{MONTH_NAME}</span>
                                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-[#0a6a99] transition-colors">
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>

                                        {/* Day headers */}
                                        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
                                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                                <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                                            ))}

                                            {/* Empty offset cells: Oct 2023 starts on Sunday, offset=0 */}
                                            {Array.from({ length: MONTH_OFFSET }).map((_, i) => (
                                                <span key={`e${i}`} />
                                            ))}

                                            {/* Day buttons */}
                                            {DAYS.map((day) => {
                                                const isPast = day < 3;
                                                const isSelected = day === selectedDay;
                                                if (isPast) {
                                                    return (
                                                        <button
                                                            key={day}
                                                            disabled
                                                            className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm text-slate-400 disabled:opacity-30"
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                }
                                                if (isSelected) {
                                                    return (
                                                        <button
                                                            key={day}
                                                            onClick={() => setSelectedDay(day)}
                                                            className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm bg-[#0a6a99] text-white shadow-md shadow-[#0a6a99]/30 font-bold"
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                }
                                                return (
                                                    <button
                                                        key={day}
                                                        onClick={() => setSelectedDay(day)}
                                                        className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm text-slate-600 hover:bg-slate-100 font-medium"
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="p-6 border-b border-slate-100">
                                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#0a6a99]">schedule</span>
                                            Available Time Slots
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Select a time for your home collection on{" "}
                                            <span className="font-semibold text-slate-700">{selectedDateLabel}</span>.
                                        </p>
                                    </div>
                                    <div className="p-6 flex flex-col gap-6">

                                        {/* Morning */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">wb_sunny</span> Morning
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {MORNING_SLOTS.map((s) => (
                                                    <SlotButton
                                                        key={s.time}
                                                        time={s.time}
                                                        disabled={s.disabled}
                                                        selected={selectedSlot === s.time}
                                                        onSelect={() => setSelectedSlot(s.time)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Afternoon */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">wb_twilight</span> Afternoon
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {AFTERNOON_SLOTS.map((s) => (
                                                    <SlotButton
                                                        key={s.time}
                                                        time={s.time}
                                                        disabled={s.disabled}
                                                        selected={selectedSlot === s.time}
                                                        onSelect={() => setSelectedSlot(s.time)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Evening */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">bedtime</span> Evening
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {EVENING_SLOTS.map((s) => (
                                                    <SlotButton
                                                        key={s.time}
                                                        time={s.time}
                                                        disabled={s.disabled}
                                                        selected={selectedSlot === s.time}
                                                        onSelect={() => setSelectedSlot(s.time)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT SIDEBAR ── */}
                            <div className="lg:w-96 flex flex-col gap-6">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-24">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
                                        Booking Summary
                                    </h3>
                                    <div className="flex flex-col gap-4">

                                        {/* Package */}
                                        <div className="flex gap-3">
                                            <div className="size-12 rounded-lg bg-[#0a6a99]/10 flex items-center justify-center shrink-0 text-[#0a6a99]">
                                                <span className="material-symbols-outlined">science</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-bold text-slate-900 text-sm">Full Body Checkup - Platinum</p>
                                                <p className="text-xs text-slate-500">Includes 85 Tests</p>
                                            </div>
                                        </div>

                                        {/* Selected date + time */}
                                        <div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-2 border border-slate-100">
                                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                                <span className="material-symbols-outlined text-[#0a6a99] text-[18px]">event</span>
                                                <span className="font-medium">{selectedDateLabel}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                                <span className="material-symbols-outlined text-[#0a6a99] text-[18px]">schedule</span>
                                                <span className="font-medium">
                                                    {selectedSlotRange ?? "No slot selected"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price breakdown */}
                                        <div className="pt-4 border-t border-slate-100 mt-2 space-y-2">
                                            <div className="flex justify-between text-sm text-slate-600">
                                                <span>Test Charges</span>
                                                <span>$120.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-slate-600">
                                                <span>Home Collection</span>
                                                <span>$15.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm font-bold text-[#0a6a99] text-base pt-2">
                                                <span>Total Payable</span>
                                                <span>$135.00</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="mt-8 flex flex-col gap-3">
                                        <button
                                            onClick={() => router.push("/checkout")}
                                            disabled={!selectedSlot}
                                            className={`w-full font-bold h-12 rounded-xl transition-colors flex items-center justify-center gap-2 ${selectedSlot
                                                    ? "bg-[#0a6a99] text-white hover:bg-[#085780] shadow-lg shadow-[#0a6a99]/20"
                                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                }`}
                                        >
                                            Proceed to Address
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </button>
                                        <Link
                                            href="/booking/location"
                                            className="w-full bg-white text-slate-600 font-bold h-12 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center"
                                        >
                                            Back
                                        </Link>
                                    </div>

                                    {/* Help */}
                                    <div className="mt-6 flex gap-3 p-3 bg-blue-50/50 rounded-lg items-start">
                                        <span className="material-symbols-outlined text-[#0a6a99] shrink-0 text-xl">support_agent</span>
                                        <div className="text-xs text-slate-600">
                                            <p className="font-semibold text-slate-900 mb-0.5">Need help?</p>
                                            <p>
                                                Call us at{" "}
                                                <a className="text-[#0a6a99] font-medium hover:underline" href="#">
                                                    1-800-TRUTEST
                                                </a>{" "}
                                                for assistance with your booking.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
                    <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                        <p>© 2023 Trutest Diagnostics. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
