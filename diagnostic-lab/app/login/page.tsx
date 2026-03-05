"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(45);
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Countdown timer when on step 2
    useEffect(() => {
        if (step !== 2) return;
        setTimer(45);
        const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, [step]);

    function handleSendOtp(e: React.FormEvent) {
        e.preventDefault();
        setOtp(["", "", "", "", "", ""]);
        setStep(2);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }

    function handleOtpChange(idx: number, val: string) {
        const sanitized = val.replace(/\D/g, "").slice(0, 1);
        const next = [...otp];
        next[idx] = sanitized;
        setOtp(next);
        if (sanitized && idx < 5) otpRefs.current[idx + 1]?.focus();
    }

    function handleOtpKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            otpRefs.current[idx - 1]?.focus();
        }
    }

    function handleVerify() {
        router.push("/dashboard");
    }

    const timerStr = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Medical dot pattern via inline style */}
            <style>{`
        .medical-pattern {
          background-color: #f6f7f8;
          background-image: radial-gradient(#0a6a99 0.5px, transparent 0.5px), radial-gradient(#0a6a99 0.5px, #f6f7f8 0.5px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
      `}</style>

            <div className="font-[Inter,sans-serif] bg-[#f6f7f8] min-h-screen flex flex-col text-slate-900">

                {/* ── NAVBAR ── */}
                <nav className="w-full bg-white border-b border-[#cfdfe8] sticky top-0 z-50">
                    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a6a99]/10 text-[#0a6a99]">
                                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                                </div>
                                <span className="text-lg font-bold tracking-tight text-[#0a6a99]">Trutest Diagnostics</span>
                            </Link>

                            <div className="hidden md:flex items-center gap-8">
                                <Link className="text-sm font-medium text-slate-700 hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
                                <Link className="text-sm font-medium text-slate-700 hover:text-[#0a6a99] transition-colors" href="/tests">Tests</Link>
                                <a className="text-sm font-medium text-slate-700 hover:text-[#0a6a99] transition-colors" href="#">Reports</a>
                                <Link className="text-sm font-medium text-slate-700 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-[#0a6a99] rounded-lg hover:bg-[#085780] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a6a99] transition-all">
                                    Login
                                </button>
                                <button className="md:hidden p-2 rounded-md text-[#4b809b]">
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* ── MAIN ── */}
                <main className="flex-grow flex items-center justify-center relative p-4 py-12 md:py-20">
                    {/* Medical dot pattern overlay */}
                    <div className="absolute inset-0 medical-pattern pointer-events-none z-0 opacity-[0.05]" />

                    <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center relative z-10">

                        {/* ── LEFT PANEL (desktop only) ── */}
                        <div className="hidden md:flex flex-col justify-center space-y-6 p-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99] mb-2">
                                <span className="material-symbols-outlined text-4xl">shield_person</span>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                Secure Access to <br />
                                <span className="text-[#0a6a99]">Your Health Records</span>
                            </h1>
                            <p className="text-lg text-[#4b809b] leading-relaxed">
                                Access your diagnostic reports, manage appointments, and track your health history with our secure patient portal.
                            </p>
                            <div className="flex flex-col gap-4 mt-4">
                                {[
                                    "HIPAA Compliant Security",
                                    "Instant Report Downloads",
                                    "24/7 Access",
                                ].map((feat) => (
                                    <div key={feat} className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                        <span className="material-symbols-outlined text-[#0a6a99]">check_circle</span>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: AUTH CARD ── */}
                        <div className="w-full">
                            <div className="bg-white rounded-2xl shadow-xl border border-[#cfdfe8] overflow-hidden">
                                {/* Gradient top bar */}
                                <div className="h-2 w-full bg-gradient-to-r from-[#0a6a99] to-blue-400" />

                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
                                    <p className="text-center text-[#4b809b] mb-8 text-sm">
                                        Enter your mobile number to verify your identity
                                    </p>

                                    {/* ── STEP 1: Phone input ── */}
                                    {step === 1 && (
                                        <form onSubmit={handleSendOtp} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor="mobile">
                                                    Mobile Number
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="material-symbols-outlined text-[#4b809b]">smartphone</span>
                                                    </div>
                                                    <input
                                                        id="mobile"
                                                        name="mobile"
                                                        type="tel"
                                                        required
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="+1 (555) 000-0000"
                                                        className="block w-full pl-10 pr-3 py-3 border border-[#cfdfe8] rounded-xl bg-[#f6f7f8] placeholder-[#4b809b] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] sm:text-sm transition-all"
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs text-[#4b809b]">
                                                    We will send you a one-time password to this mobile number.
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-[#0a6a99] hover:bg-[#085780] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a6a99] transition-all"
                                            >
                                                Send OTP
                                            </button>

                                            {/* Divider */}
                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-[#cfdfe8]" />
                                                </div>
                                                <div className="relative flex justify-center text-sm">
                                                    <span className="px-2 bg-white text-[#4b809b]">Or login with</span>
                                                </div>
                                            </div>

                                            {/* Alternative login buttons */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    className="flex justify-center items-center py-2.5 px-4 border border-[#cfdfe8] rounded-xl bg-white hover:bg-[#f6f7f8] text-slate-900 text-sm font-medium transition-colors"
                                                >
                                                    <span className="material-symbols-outlined mr-2 text-lg">mail</span> Email
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex justify-center items-center py-2.5 px-4 border border-[#cfdfe8] rounded-xl bg-white hover:bg-[#f6f7f8] text-slate-900 text-sm font-medium transition-colors"
                                                >
                                                    <span className="material-symbols-outlined mr-2 text-lg">fingerprint</span> Face ID
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* ── STEP 2: OTP Verification ── */}
                                    {step === 2 && (
                                        <div className="space-y-6">
                                            {/* OTP sent confirmation */}
                                            <div className="text-center mb-6">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0a6a99]/10 text-[#0a6a99] mb-4">
                                                    <span className="material-symbols-outlined">lock_clock</span>
                                                </div>
                                                <p className="text-sm text-slate-900 font-medium">
                                                    OTP Sent to {phone || "+1 (555) ***-8920"}
                                                </p>
                                                <button
                                                    className="text-xs text-[#0a6a99] hover:text-[#085780] underline mt-1"
                                                    onClick={() => setStep(1)}
                                                    type="button"
                                                >
                                                    Change Number
                                                </button>
                                            </div>

                                            {/* 6-box OTP input */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-900 mb-4 text-center">
                                                    Enter 6-digit Code
                                                </label>
                                                <div className="flex justify-between gap-2">
                                                    {otp.map((digit, idx) => (
                                                        <input
                                                            key={idx}
                                                            ref={(el) => { otpRefs.current[idx] = el; }}
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={1}
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                            className="w-12 h-12 text-center text-xl font-bold border border-[#cfdfe8] rounded-lg bg-[#f6f7f8] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0a6a99] focus:border-[#0a6a99] transition-all"
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Verify button */}
                                            <button
                                                type="button"
                                                onClick={handleVerify}
                                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0a6a99] hover:bg-[#085780] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a6a99] transition-all"
                                            >
                                                Verify &amp; Proceed
                                            </button>

                                            {/* Resend + timer */}
                                            <div className="text-center text-sm">
                                                <p className="text-[#4b809b]">Didn&apos;t receive the code?</p>
                                                <div className="flex items-center justify-center gap-2 mt-1">
                                                    <span className="text-slate-900 font-mono font-medium">{timerStr}</span>
                                                    <button
                                                        disabled={timer > 0}
                                                        onClick={() => { setTimer(45); }}
                                                        className="text-[#4b809b] font-medium hover:text-[#0a6a99] transition-colors disabled:cursor-not-allowed"
                                                    >
                                                        Resend OTP
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card footer — terms */}
                                <div className="bg-[#f6f7f8] px-8 py-4 border-t border-[#cfdfe8]">
                                    <p className="text-xs text-center text-[#4b809b]">
                                        By continuing, you agree to Trutest&apos;s{" "}
                                        <a className="text-[#0a6a99] hover:underline" href="#">Terms of Service</a> and{" "}
                                        <a className="text-[#0a6a99] hover:underline" href="#">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="bg-white border-t border-[#cfdfe8] mt-auto py-8">
                    <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-[#4b809b]">© 2023 Trutest Diagnostics. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-[#4b809b] hover:text-[#0a6a99] transition-colors text-sm" href="#">Help Center</a>
                            <a className="text-[#4b809b] hover:text-[#0a6a99] transition-colors text-sm" href="#">Privacy</a>
                            <a className="text-[#4b809b] hover:text-[#0a6a99] transition-colors text-sm" href="#">Security</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
