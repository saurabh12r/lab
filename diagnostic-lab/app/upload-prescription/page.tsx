"use client";

import { useState, useRef, useCallback, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UploadedFile {
    name: string;
    size: string;
    preview: string | null;
    isImage: boolean;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function UploadPrescriptionPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const processFile = useCallback((file: File) => {
        const isImage = file.type.startsWith("image/");
        const preview = isImage ? URL.createObjectURL(file) : null;
        setUploadedFile({
            name: file.name,
            size: formatSize(file.size),
            preview,
            isImage,
        });
    }, []);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragOver(true);
    }

    function handleDragLeave() {
        setIsDragOver(false);
    }

    function handleSubmit() {
        setSubmitted(true);
        // Brief success flash then navigate to dashboard
        setTimeout(() => router.push("/dashboard"), 1800);
    }

    function handleRemoveFile() {
        if (uploadedFile?.preview) URL.revokeObjectURL(uploadedFile.preview);
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
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
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="size-8 text-[#0a6a99] flex items-center justify-center bg-[#0a6a99]/10 rounded-lg group-hover:bg-[#0a6a99]/20 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5 16.5L16.5 10.5L15.09 9.09L10.5 13.67L8.91 12.09L7.5 13.5L10.5 16.5Z" fill="currentColor" fillRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-slate-900 text-lg font-bold tracking-tight">Quick Care Pathology</span>
                            </Link>

                            {/* Nav */}
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

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search (desktop) */}
                            <div className="hidden md:flex items-center w-64 h-10 bg-slate-100 rounded-full px-3 gap-2 focus-within:ring-2 ring-[#0a6a99]/50 transition-all">
                                <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                                <input
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-900 h-full p-0 focus:ring-0"
                                    placeholder="Search tests..."
                                    type="text"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                    href="/packages"
                                    className="h-10 px-5 items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#0a6a99]/90 transition-all shadow-lg shadow-[#0a6a99]/20 flex gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                    <span className="hidden sm:inline">Book Test</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── MAIN ── */}
                <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-12">

                    {/* ── LEFT: Steps + Info ── */}
                    <div className="lg:w-1/3 flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a6a99] text-xs font-bold uppercase tracking-wider">
                                Easy Upload
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                                Upload your Prescription
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Skip the search. Simply upload your doctor&apos;s note, and our certified pharmacists will create the cart for you.
                            </p>
                        </div>

                        {/* 3-step guide */}
                        <div className="relative pl-8 border-l-2 border-slate-200 space-y-10 my-4">
                            {[
                                { n: "1", title: "Upload File", desc: "Accepts PDF, JPG, PNG up to 10MB.", active: true },
                                { n: "2", title: "Review & Confirm", desc: "Our team verifies the tests listed.", active: false },
                                { n: "3", title: "Checkout", desc: "Pay securely and schedule pickup.", active: false },
                            ].map((step) => (
                                <div key={step.n} className="relative">
                                    <span
                                        className={`absolute -left-[41px] top-0 flex items-center justify-center size-8 rounded-full text-sm font-bold shadow-sm ${step.active
                                                ? "bg-[#0a6a99] text-white shadow-[#0a6a99]/30"
                                                : "bg-slate-200 text-slate-500"
                                            }`}
                                    >
                                        {step.n}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Security badge */}
                        <div className="mt-auto bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
                            <div className="p-2 bg-[#0a6a99]/10 rounded-full text-[#0a6a99] shrink-0">
                                <span className="material-symbols-outlined text-[24px]">verified_user</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">100% Secure &amp; Private</h4>
                                <p className="text-xs text-slate-600 mt-1">
                                    Your medical data is encrypted and only shared with authorized diagnostic professionals.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Upload Form ── */}
                    <div className="lg:w-2/3 flex flex-col bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">

                        {/* Success overlay */}
                        {submitted && (
                            <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-10">
                                <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Prescription Received!</h2>
                                <p className="text-slate-500 max-w-sm mb-8">
                                    We are reviewing your document. You will receive a notification with the cart details shortly.
                                </p>
                                <div className="w-full max-w-xs bg-slate-50 rounded-xl p-4 mb-8 text-left">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Timeline</h4>
                                    <div className="flex gap-3 relative pb-4 border-l border-slate-200 ml-2 pl-4">
                                        <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-green-500" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Uploaded</p>
                                            <p className="text-xs text-slate-500">Just now</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 relative pl-4 ml-2">
                                        <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-slate-300" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-400">Review in Progress</p>
                                            <p className="text-xs text-slate-500">Est. 10–15 mins</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400">Redirecting to dashboard…</p>
                            </div>
                        )}

                        {/* Upload area */}
                        <div className="p-8 md:p-10 flex-1">
                            {/* Drag-and-drop zone */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`group relative w-full h-64 md:h-80 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer text-center ${isDragOver
                                        ? "border-[#0a6a99] bg-blue-50/70"
                                        : "border-slate-300 bg-slate-50 hover:bg-blue-50/50 hover:border-[#0a6a99]"
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    type="file"
                                    onChange={handleFileChange}
                                />

                                {/* Image preview */}
                                {uploadedFile?.isImage && uploadedFile.preview ? (
                                    <img
                                        src={uploadedFile.preview}
                                        alt="Preview"
                                        className="max-h-52 max-w-full object-contain rounded-xl pointer-events-none"
                                    />
                                ) : (
                                    <>
                                        <div className="size-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-[#0a6a99] text-[32px]">cloud_upload</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Drag &amp; Drop your prescription</h3>
                                        <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                                            Or click to browse from your device. <br /> Supports PDF, JPG, PNG
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-[#0a6a99]/10 text-[#0a6a99] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0a6a99] hover:text-white transition-all relative z-20"
                                        >
                                            Browse Files
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* File item row (after upload) */}
                            {uploadedFile && (
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined ${uploadedFile.isImage ? "text-[#0a6a99]" : "text-red-500"}`}>
                                                {uploadedFile.isImage ? "image" : "picture_as_pdf"}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900">{uploadedFile.name}</span>
                                                <span className="text-xs text-slate-500">{uploadedFile.size}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleRemoveFile}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            <div className="mt-8">
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    Additional Notes (Optional)
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                                        className="w-full min-h-[120px] p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent outline-none transition-all resize-none text-slate-900 text-sm placeholder:text-slate-400"
                                        placeholder="Add any specific instructions, symptoms, or preferred time for collection..."
                                    />
                                    <span className="absolute bottom-3 right-3 text-xs text-slate-400">
                                        {notes.length}/500
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={submitted}
                                className="flex-1 sm:flex-none bg-[#0a6a99] text-white text-base font-bold h-12 px-8 rounded-xl shadow-lg shadow-[#0a6a99]/30 hover:shadow-[#0a6a99]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                <span>Submit Prescription</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="mt-auto border-t border-slate-200 bg-white">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">© 2026 Quick Care Pathology. All rights reserved.</p>
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
