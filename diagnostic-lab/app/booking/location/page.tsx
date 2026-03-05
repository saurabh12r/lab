"use client";

import { useState } from "react";
import Link from "next/link";
import { getBookingCities, getBookingAreas } from "@/services/bookingService";

export default function LocationPage() {
    const CITIES = getBookingCities();
    const AREAS = getBookingAreas();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    function handleCitySelect(value: string) {
        setSelectedCity(value);
        setSelectedArea("");
    }

    const areas = selectedCity ? (AREAS[selectedCity] ?? []) : [];
    const canContinue = selectedCity && selectedArea;

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

            <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] font-[Inter,sans-serif] antialiased">

                {/* ── HEADER ── */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-6 py-4 sticky top-0 z-50">
                    <div className="flex items-center gap-3 text-slate-900">
                        <div className="size-8 text-[#194ce6] flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">local_hospital</span>
                        </div>
                        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">
                            MediLab Diagnostics
                        </h2>
                    </div>

                    <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                        <nav className="flex items-center gap-6">
                            <Link className="text-slate-600 hover:text-[#194ce6] text-sm font-medium transition-colors" href="/">Home</Link>
                            <Link className="text-slate-600 hover:text-[#194ce6] text-sm font-medium transition-colors" href="/tests">Tests</Link>
                            <Link className="text-slate-600 hover:text-[#194ce6] text-sm font-medium transition-colors" href="/packages">Packages</Link>
                            <a className="text-slate-600 hover:text-[#194ce6] text-sm font-medium transition-colors" href="#">About Us</a>
                            <Link className="text-slate-600 hover:text-[#194ce6] text-sm font-medium transition-colors" href="/contact">Contact</Link>
                        </nav>
                        <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-[#194ce6] hover:bg-[#1135a3] transition-colors text-white text-sm font-bold shadow-sm shadow-[#194ce6]/20">
                            <span>Login</span>
                        </button>
                    </div>

                    <button className="md:hidden text-slate-900">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow flex flex-col items-center justify-start pt-8 pb-12 px-4 sm:px-6">
                    <div className="w-full max-w-4xl flex flex-col gap-6">

                        {/* ── PROGRESS STEPPER ── */}
                        <div className="w-full max-w-2xl mx-auto mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-900 text-sm font-semibold">Location Details</span>
                                <span className="text-slate-500 text-sm font-medium">Step 2 of 4</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#194ce6] w-1/2 rounded-full" />
                            </div>
                        </div>

                        {/* ── MAIN CARD ── */}
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-full">

                            {/* Card Hero */}
                            <div className="relative h-48 sm:h-56 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6 overflow-hidden">
                                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#194ce6]/10 to-transparent" />
                                <div className="relative z-10 text-center max-w-lg">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                                        Find a Center Near You
                                    </h1>
                                    <p className="text-slate-600 text-base sm:text-lg">
                                        Select your city and area to view available diagnostic centers and home collection slots.
                                    </p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 sm:p-10 space-y-10">

                                {/* City + Area Selects */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                                    {/* City Select */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="city-select">
                                            Select City
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#194ce6]">location_city</span>
                                            </div>
                                            <select
                                                id="city-select"
                                                value={selectedCity}
                                                onChange={(e) => handleCitySelect(e.target.value)}
                                                className="block w-full pl-10 pr-10 py-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:border-[#194ce6] focus:ring-2 focus:ring-[#194ce6]/20 focus:outline-none sm:text-sm transition-shadow shadow-sm cursor-pointer appearance-none"
                                            >
                                                <option disabled value="">Search or select city...</option>
                                                {CITIES.map((c: { value: string; label: string; img: string; alt: string }) => (
                                                    <option key={c.value} value={c.value}>{c.label}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Area Select */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="area-select">
                                            Select Area / Locality
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#194ce6]">pin_drop</span>
                                            </div>
                                            <select
                                                id="area-select"
                                                value={selectedArea}
                                                onChange={(e) => setSelectedArea(e.target.value)}
                                                disabled={!selectedCity}
                                                className="block w-full pl-10 pr-10 py-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:border-[#194ce6] focus:ring-2 focus:ring-[#194ce6]/20 focus:outline-none sm:text-sm transition-shadow shadow-sm cursor-pointer appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <option disabled value="">Select area...</option>
                                                {areas.map((a) => (
                                                    <option key={a} value={a}>{a}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-3 text-sm font-medium text-slate-500">
                                            Or choose from popular cities
                                        </span>
                                    </div>
                                </div>

                                {/* Popular Cities Grid */}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#194ce6]">stars</span>
                                        Popular Cities
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                        {CITIES.map((city: { value: string; label: string; img: string; alt: string }) => (
                                            <button
                                                key={city.value}
                                                onClick={() => handleCitySelect(city.value)}
                                                className={`group flex flex-col items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#194ce6] focus:ring-offset-2 ${selectedCity === city.value
                                                    ? "border-[#194ce6]/50 bg-blue-50"
                                                    : "border-slate-200 hover:border-[#194ce6]/50 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <div className="relative size-14 rounded-full overflow-hidden bg-slate-100 group-hover:shadow-md transition-shadow">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        alt={city.alt}
                                                        className={`w-full h-full object-cover transition-opacity ${selectedCity === city.value ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                                                            }`}
                                                        src={city.img}
                                                    />
                                                </div>
                                                <span className={`text-sm font-medium transition-colors ${selectedCity === city.value
                                                    ? "text-[#194ce6]"
                                                    : "text-slate-700 group-hover:text-[#194ce6]"
                                                    }`}>
                                                    {city.label}
                                                </span>
                                            </button>
                                        ))}

                                        {/* More button */}
                                        <button className="group flex flex-col items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#194ce6]/50 hover:bg-blue-50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#194ce6] focus:ring-offset-2">
                                            <div className="relative size-14 rounded-full overflow-hidden bg-slate-100 group-hover:shadow-md transition-shadow flex items-center justify-center">
                                                <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#194ce6]">
                                                    add_location_alt
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-[#194ce6] transition-colors">
                                                More
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-6 sm:px-10 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <Link
                                    href="/packages"
                                    className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    Back to Patient Details
                                </Link>

                                {canContinue ? (
                                    <Link
                                        href="/booking/slot"
                                        className="w-full sm:w-auto font-bold py-3.5 px-10 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 bg-[#194ce6] hover:bg-[#1135a3] text-white shadow-[#194ce6]/30 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <span>Continue</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full sm:w-auto font-bold py-3.5 px-10 rounded-xl flex items-center justify-center gap-2 bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                    >
                                        <span>Continue</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="text-center">
                            <p className="text-slate-500 text-sm">
                                Need help finding your center?{" "}
                                <a className="text-[#194ce6] hover:underline font-medium" href="#">
                                    Call Support
                                </a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
