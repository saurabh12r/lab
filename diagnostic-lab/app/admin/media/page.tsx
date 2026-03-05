"use client";

import { useState } from "react";
import { getBanners, getPromos } from "@/services/mediaService";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

type BannerStatus = "Active" | "Scheduled" | "Disabled";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  startDate: string;
  endDate: string | null;
  status: BannerStatus;
}

interface Promo {
  id: string;
  title: string;
  imageUrl: string;
  activeUntil: string;
}

export default function AdminMediaPage() {
  const [banners, setBanners] = useState<Banner[]>(() => getBanners() as Banner[]);
  const [promos, setPromos] = useState<Promo[]>(() => getPromos() as Promo[]);
  const [scheduleCampaign, setScheduleCampaign] = useState("");
  const [scheduleSlot, setScheduleSlot] = useState("Main Homepage Banner (Slot 1)");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [showAddBanner, setShowAddBanner] = useState(false);

  const toggleBannerStatus = (id: string) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: (b.status === "Active" ? "Disabled" : "Active") as BannerStatus }
          : b
      )
    );
  };

  const deleteBanner = (id: string) => setBanners((prev) => prev.filter((b) => b.id !== id));
  const deletePromo = (id: string) => setPromos((prev) => prev.filter((p) => p.id !== id));

  const addBanner = (title: string, link: string, start: string, end: string) => {
    setBanners((prev) => [
      ...prev,
      {
        id: `BNR-${Date.now().toString().slice(-6)}`,
        title,
        imageUrl: "https://placehold.co/600x257/e2e8f0/64748b?text=New",
        link,
        startDate: start || "—",
        endDate: end || null,
        status: "Scheduled",
      },
    ]);
    setShowAddBanner(false);
  };

  const scheduleBanner = () => {
    if (scheduleCampaign.trim()) {
      addBanner(scheduleCampaign, "/campaigns/" + scheduleCampaign.toLowerCase().replace(/\s+/g, "-"), scheduleStart, scheduleEnd);
      setScheduleCampaign("");
      setScheduleStart("");
      setScheduleEnd("");
    }
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="px-6 md:px-12 lg:px-16 flex-1 py-8">
        <div className="flex flex-col max-w-[1200px] w-full mx-auto gap-8">
          {/* Header card — Stitch */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">
                Media & Banner Scheduler
              </h1>
              <p className="text-slate-500 text-sm font-normal">
                Manage homepage visuals, promotional banners, and automate visibility for special health campaigns.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center justify-center rounded-lg h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium gap-2"
              >
                <span className="material-symbols-outlined text-lg">visibility</span>
                Preview Site
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-lg h-10 px-6 text-white hover:opacity-90 transition-colors text-sm font-bold gap-2 shadow-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                <span className="material-symbols-outlined text-lg">save</span>
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Banners + Promo — Stitch */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-slate-900 text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1349ec]">view_carousel</span>
                    Homepage Main Banners
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowAddBanner(true)}
                    className="text-sm font-medium text-[#1349ec] hover:opacity-80 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Banner
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Recommended resolution: 1920x600px (Max 2MB, JPG/PNG)
                </p>
                <div className="flex flex-col gap-6">
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      className={`group relative rounded-lg border overflow-hidden bg-slate-50 border-slate-200 ${b.status === "Disabled" ? "opacity-60" : ""}`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div
                          className="w-full md:w-1/3 aspect-[21/9] bg-slate-200 bg-center bg-cover border-b md:border-b-0 md:border-r border-slate-200"
                          style={{ backgroundImage: `url(${b.imageUrl})` }}
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-slate-800">{b.title}</h3>
                              <span
                                className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                                  b.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : b.status === "Scheduled"
                                      ? "bg-[#1349ec]/10 text-[#1349ec]"
                                      : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">Link: {b.link}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                              {b.endDate ? `${b.startDate} - ${b.endDate}` : "Default display (No end date)"}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                            <button type="button" className="text-xs font-medium text-slate-600 hover:text-[#1349ec] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                            </button>
                            <button type="button" className="text-xs font-medium text-slate-600 hover:text-[#1349ec] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">photo_camera</span> Replace Image
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBannerStatus(b.id)}
                              className="text-xs font-medium text-slate-600 hover:text-[#1349ec]"
                            >
                              {b.status === "Active" ? "Disable" : "Enable"}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteBanner(b.id)}
                              className="text-xs font-medium text-red-500 hover:text-red-600 ml-auto flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-slate-900 text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1349ec]">campaign</span>
                    Promotional Banners (Sidebar/Mid-page)
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="border border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer min-h-[200px]"
                  >
                    <div className="w-12 h-12 bg-[#1349ec]/10 rounded-full flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-[#1349ec]">cloud_upload</span>
                    </div>
                    <p className="font-medium text-slate-700 mb-1">Upload Mid-page Banner</p>
                    <p className="text-xs text-slate-500">1200x300px recommended</p>
                  </button>
                  {promos.map((p) => (
                    <div key={p.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <div
                        className="aspect-[4/1] bg-slate-200 bg-center bg-cover"
                        style={{ backgroundImage: `url(${p.imageUrl})` }}
                      />
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold text-slate-800">{p.title}</h4>
                          <button
                            type="button"
                            onClick={() => deletePromo(p.id)}
                            className="material-symbols-outlined text-slate-400 hover:text-red-500 text-[18px]"
                          >
                            delete
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">Active until {p.activeUntil}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Scheduler — Stitch */}
            <div className="flex flex-col gap-8">
              <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-24">
                <h2 className="text-slate-900 text-lg font-bold flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <span className="material-symbols-outlined text-[#1349ec]">calendar_month</span>
                  Occasion-based Scheduler
                </h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name</label>
                    <input
                      type="text"
                      value={scheduleCampaign}
                      onChange={(e) => setScheduleCampaign(e.target.value)}
                      placeholder="e.g., World Health Day 2026"
                      className="w-full rounded-md border border-slate-300 bg-white text-slate-900 focus:border-[#1349ec] focus:ring-[#1349ec] sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Banner Slot</label>
                    <select
                      value={scheduleSlot}
                      onChange={(e) => setScheduleSlot(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-white text-slate-900 focus:border-[#1349ec] focus:ring-[#1349ec] sm:text-sm px-3 py-2"
                    >
                      <option>Main Homepage Banner (Slot 1)</option>
                      <option>Main Homepage Banner (Slot 2)</option>
                      <option>Mid-page Promotional</option>
                      <option>Sidebar Ad</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={scheduleStart}
                        onChange={(e) => setScheduleStart(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white text-slate-500 focus:border-[#1349ec] focus:ring-[#1349ec] sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={scheduleEnd}
                        onChange={(e) => setScheduleEnd(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white text-slate-500 focus:border-[#1349ec] focus:ring-[#1349ec] sm:text-sm px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Banner Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md bg-slate-50">
                      <div className="space-y-1 text-center">
                        <span className="material-symbols-outlined text-slate-400 text-3xl">image</span>
                        <div className="flex text-sm text-slate-600 justify-center">
                          <span className="font-medium text-[#1349ec] hover:underline cursor-pointer">Upload a file</span>
                          <span className="pl-1">or drag and drop</span>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={scheduleBanner}
                    className="mt-2 w-full flex items-center justify-center rounded-lg h-10 px-4 bg-[#1349ec]/10 text-[#1349ec] hover:bg-[#1349ec]/20 transition-colors text-sm font-bold gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    Schedule Banner
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Add Banner modal (simple) */}
      {showAddBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddBanner(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Banner</h3>
            <input
              type="text"
              id="new-banner-title"
              placeholder="Banner title"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder:text-slate-500 mb-3"
            />
            <input
              type="text"
              id="new-banner-link"
              placeholder="Link (e.g. /packages/xyz)"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder:text-slate-500 mb-3"
            />
            <input type="text" id="new-banner-start" placeholder="Start date" className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 mb-3" />
            <input type="text" id="new-banner-end" placeholder="End date" className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 mb-4" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowAddBanner(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  const t = (document.getElementById("new-banner-title") as HTMLInputElement)?.value?.trim();
                  const l = (document.getElementById("new-banner-link") as HTMLInputElement)?.value?.trim() || "/";
                  const s = (document.getElementById("new-banner-start") as HTMLInputElement)?.value?.trim() || "—";
                  const e = (document.getElementById("new-banner-end") as HTMLInputElement)?.value?.trim() || "";
                  if (t) addBanner(t, l, s, e);
                }}
                className="px-4 py-2 rounded-lg text-white hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Add Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
