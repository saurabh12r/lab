"use client";

import { useState } from "react";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

type ReviewStatus = "Approved" | "Pending" | "Hidden";

interface Review {
  id: string;
  customerName: string;
  initials: string;
  rating: number;
  title: string;
  message: string;
  service: string;
  submissionDate: string;
  status: ReviewStatus;
}

const DUMMY_REVIEWS: Review[] = [
  { id: "RV-1001", customerName: "Michael Roberts", initials: "MR", rating: 5, title: "Excellent service and quick results", message: "The staff was incredibly professional and the facility was spotless. I received my comprehensive blood panel results within 24 hours via their secure portal. Highly recommend MediLab for any diagnostic needs.", service: "Comprehensive Blood Panel", submissionDate: "Oct 24, 2023", status: "Approved" },
  { id: "RV-1002", customerName: "Sarah Lewis", initials: "SL", rating: 4, title: "Good overall, slight delay", message: "The phlebotomist was very gentle, didn't feel a thing. However, I had to wait about 20 minutes past my appointment time. Results were delivered promptly the next day.", service: "Thyroid Panel", submissionDate: "Oct 26, 2023", status: "Pending" },
  { id: "RV-1003", customerName: "John Doe", initials: "JD", rating: 2, title: "Confusing parking", message: "The test was fine but finding the parking lot was a nightmare. Your website needs better directions. Will probably go somewhere else next time just to avoid the hassle.", service: "Routine Checkup", submissionDate: "Oct 20, 2023", status: "Hidden" },
  { id: "RV-1004", customerName: "Emily Parker", initials: "EP", rating: 5, title: "Lifesavers!", message: "I needed emergency STAT testing before a flight and they accommodated me immediately. The results were pushed to my app within 4 hours. Incredible service, thank you!", service: "PCR Test", submissionDate: "Oct 18, 2023", status: "Approved" },
  { id: "RV-1005", customerName: "Alex Chen", initials: "AC", rating: 5, title: "Smooth experience", message: "Booking online was easy, and the lab was clean and organized. Got my lipid profile results the same day. Very satisfied.", service: "Lipid Profile", submissionDate: "Oct 22, 2023", status: "Pending" },
  { id: "RV-1006", customerName: "Maria Garcia", initials: "MG", rating: 4, title: "Professional and efficient", message: "Quick in and out. The nurse explained everything clearly. Only minor wait at checkout.", service: "CBC Panel", submissionDate: "Oct 19, 2023", status: "Approved" },
];

export default function AdminFeedbackPage() {
  const [reviews, setReviews] = useState<Review[]>(DUMMY_REVIEWS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [dateSort, setDateSort] = useState("Date: Newest");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = reviews.filter((r) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!r.customerName.toLowerCase().includes(q) && !r.message.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q)) return false;
    }
    if (statusFilter !== "All Statuses" && r.status !== statusFilter) return false;
    if (ratingFilter !== "All Ratings") {
      const n = parseInt(ratingFilter.replace(/\D/g, ""), 10);
      if (ratingFilter.startsWith("1-2")) { if (r.rating > 2) return false; }
      else if (n && r.rating !== n) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const d = (s: string) => new Date(s).getTime();
    return dateSort === "Date: Oldest" ? d(a.submissionDate) - d(b.submissionDate) : d(b.submissionDate) - d(a.submissionDate);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const setStatus = (id: string, status: ReviewStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const approvedCount = reviews.filter((r) => r.status === "Approved").length;
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header — Stitch */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Reviews & Feedback Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-[#1349ec] w-64 text-sm text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8">
        {/* Metrics — Stitch */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1349ec]/10 text-[#1349ec]">
              <span className="material-symbols-outlined text-2xl">rate_review</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Reviews</p>
              <p className="text-2xl font-bold text-slate-900">{reviews.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500/10 text-amber-500">
              <span className="material-symbols-outlined text-2xl">star</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Average Rating</p>
              <p className="text-2xl font-bold text-slate-900">{avgRating} <span className="text-sm font-normal text-slate-500">/ 5.0</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500/10 text-green-500">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Approved (Public)</p>
              <p className="text-2xl font-bold text-slate-900">{approvedCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined text-2xl">schedule</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Pending Review</p>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Filters — Stitch */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#1349ec] text-slate-900"
            >
              <option>All Statuses</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Hidden</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#1349ec] text-slate-900"
            >
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>1-2 Stars</option>
            </select>
            <select
              value={dateSort}
              onChange={(e) => setDateSort(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#1349ec] text-slate-900"
            >
              <option>Date: Newest</option>
              <option>Date: Oldest</option>
            </select>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>

        {/* Reviews Grid — Stitch cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginated.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-xl border overflow-hidden flex flex-col flex-1 min-w-0 relative ${
                r.status === "Pending" ? "border-blue-200" : "border-slate-200"
              } ${r.status === "Hidden" ? "opacity-75" : ""}`}
            >
              {r.status === "Pending" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg font-medium z-10">New</div>
              )}
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {r.initials}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{r.customerName}</h3>
                      <p className="text-xs text-slate-500">{r.submissionDate}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className={`material-symbols-outlined text-sm ${i <= r.rating ? "text-amber-500" : "text-slate-300"}`}>star</span>
                    ))}
                  </div>
                </div>
                <h4 className="font-medium mb-2 text-slate-900">{r.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-3">{r.message}</p>
                <div className="mt-4 inline-block px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                  Service: {r.service}
                </div>
              </div>
              <div
                className={`p-4 border-t flex justify-between items-center ${
                  r.status === "Pending" ? "bg-blue-50 border-blue-100" : "bg-slate-50 border-slate-200"
                }`}
              >
                <label className="flex items-center cursor-pointer gap-3">
                  <div className="relative inline-block w-10 h-6">
                    <input
                      type="checkbox"
                      checked={r.status === "Approved"}
                      onChange={() => setStatus(r.id, r.status === "Approved" ? "Hidden" : "Approved")}
                      className="sr-only peer"
                    />
                    <div className={`block w-10 h-6 rounded-full ${r.status === "Approved" ? "bg-[#1349ec]" : "bg-slate-300"}`} />
                    <div className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white border border-slate-200 transition-transform ${r.status === "Approved" ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {r.status === "Approved" ? "Approved (Public)" : r.status === "Pending" ? "Hidden (Pending)" : "Hidden"}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => deleteReview(r.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                  title="Delete Review"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination — Stitch */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, sorted.length)} of {sorted.length} reviews
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                    p === page ? "text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                  style={p === page ? { backgroundColor: PRIMARY } : {}}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-slate-400 px-1">...</span>}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
