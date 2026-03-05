"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFeedbackCategories } from "@/services/feedbackService";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Outstanding",
};

export default function FeedbackPage() {
  const CATEGORIES = getFeedbackCategories();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const displayRating = hoverRating || rating;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
    setShowSuccessBanner(true);
  }

  function handleCloseSuccess() {
    setShowSuccessBanner(false);
  }

  function handleBackToDashboard() {
    router.push("/dashboard");
  }

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

      <div className="bg-[#f6f7f8] font-[Inter,sans-serif] text-slate-900 antialiased min-h-screen flex flex-col">

        {/* ── Success banner (toast) ── */}
        {showSuccessBanner && (
          <div className="sticky top-0 z-[60] bg-emerald-600 text-white px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
              <span className="font-semibold">Feedback submitted successfully!</span>
            </div>
            <button
              type="button"
              onClick={handleCloseSuccess}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        )}

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
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
              </nav>
            </div>
            <Link href="/dashboard" className="h-10 px-5 flex items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors">
              Dashboard
            </Link>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-2xl mx-auto">

            {!submitted ? (
              <>
                {/* Rate your experience */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Rate your experience
                  </h1>
                  <p className="text-slate-600 mt-2">
                    How was your recent diagnostic test with Dr. Sarah Jenkins?
                  </p>

                  {/* Star rating */}
                  <div className="mt-6 flex flex-col items-start gap-3">
                    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50"
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        >
                          <span
                            className={`material-symbols-outlined text-[40px] transition-colors ${
                              star <= (displayRating || 0)
                                ? "text-amber-400"
                                : "text-slate-300"
                            }`}
                          >
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      {displayRating ? RATING_LABELS[displayRating as keyof typeof RATING_LABELS] : "Select a rating"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {CATEGORIES.join(" · ")}
                    </p>
                  </div>

                  {/* Additional Comments */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value.slice(0, 1000))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent resize-none"
                      placeholder="Share more about your experience..."
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/dashboard"
                      className="h-12 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
                    >
                      Cancel
                    </Link>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={rating === 0}
                      className="h-12 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </section>

                {/* Why your feedback matters */}
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Why your feedback matters</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex gap-4">
                      <div className="size-12 rounded-full bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99] shrink-0">
                        <span className="material-symbols-outlined text-[28px]">verified_user</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Quality Assurance</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Your ratings help us maintain high standards for our diagnostic equipment and staff training.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex gap-4">
                      <div className="size-12 rounded-full bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99] shrink-0">
                        <span className="material-symbols-outlined text-[28px]">speed</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Faster Services</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          We use your input to optimize wait times and report delivery speeds.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              /* Thank You state after submit */
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
                <div className="size-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-4">
                  <span className="material-symbols-outlined text-[40px]">thumb_up</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Thank You!</h2>
                <p className="mt-3 text-slate-600 max-w-md mx-auto">
                  We appreciate your time. Your feedback has been recorded and will help us improve.
                </p>
                <button
                  type="button"
                  onClick={handleBackToDashboard}
                  className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#085780] transition-colors"
                >
                  Back to Dashboard
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </section>
            )}

            {/* Back to Home (when form visible) */}
            {!submitted && (
              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0a6a99] transition-colors text-sm font-medium"
                >
                  Back to Home
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2024 Trutest Diagnostics. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
