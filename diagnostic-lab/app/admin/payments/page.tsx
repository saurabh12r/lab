"use client";

import { useState } from "react";
import { getTransactions } from "@/services/transactionService";
import type { TransactionType, PaymentStatusType } from "@/types";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

function PaymentMethodIcon({ method }: { method: string }) {
  const icon = method === "Stripe" ? "credit_card" : "account_balance_wallet";
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-slate-400 text-sm">{icon}</span>
      <span className="text-sm text-slate-600">{method}</span>
    </div>
  );
}

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<TransactionType[]>(getTransactions());
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [stripeEnabled, setStripeEnabled] = useState(false);
  const [cashEnabled, setCashEnabled] = useState(true);

  const filtered = search.trim()
    ? transactions.filter(
        (t) =>
          t.orderId.toLowerCase().includes(search.toLowerCase()) ||
          t.customerName.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase())
      )
    : transactions;

  const viewing = viewingId ? transactions.find((t) => t.id === viewingId) : null;

  const processRefund = (id: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, paymentStatus: "Refunded" as PaymentStatusType } : t)));
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="px-4 sm:px-6 lg:px-16 flex-1 py-6">
        <div className="flex flex-col max-w-[1024px] w-full mx-auto gap-6">
          {/* Header — Stitch */}
          <div className="flex flex-wrap justify-between gap-4 py-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
                Payment Settings & Refunds
              </h1>
              <p className="text-slate-500 text-base font-normal">
                Manage payment gateways, credentials, and process refunds securely.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-colors shadow-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save Settings
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Payment gateway cards — Stitch */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="material-symbols-outlined text-[#1349ec] text-2xl">account_balance_wallet</span>
                  <h2 className="text-lg font-bold leading-tight text-slate-900">Razorpay</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-1.5 text-slate-700">Key ID</span>
                    <input
                      type="text"
                      placeholder="rzp_live_xxx..."
                      defaultValue="rzp_live_abc123xyz"
                      className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec] h-11 px-3 text-sm"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-1.5 text-slate-700">Key Secret</span>
                    <div className="relative">
                      <input
                        type="password"
                        defaultValue="••••••••••••••"
                        className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec] h-11 px-3 pr-10 text-sm"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm cursor-pointer">visibility_off</span>
                    </div>
                  </label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-slate-700">Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={razorpayEnabled} onChange={() => setRazorpayEnabled(!razorpayEnabled)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1349ec]" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="material-symbols-outlined text-[#1349ec] text-2xl">credit_card</span>
                  <h2 className="text-lg font-bold leading-tight text-slate-900">Stripe</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-1.5 text-slate-700">Publishable Key</span>
                    <input type="text" placeholder="pk_live_xxx..." className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec] h-11 px-3 text-sm" />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-1.5 text-slate-700">Secret Key</span>
                    <div className="relative">
                      <input type="password" placeholder="sk_live_xxx..." className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec] h-11 px-3 pr-10 text-sm" />
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm cursor-pointer">visibility_off</span>
                    </div>
                  </label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-slate-700">Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={stripeEnabled} onChange={() => setStripeEnabled(!stripeEnabled)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1349ec]" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="material-symbols-outlined text-[#1349ec] text-2xl">local_atm</span>
                  <h2 className="text-lg font-bold leading-tight text-slate-900">Offline Methods</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Cash on Collection</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Allow payment during sample collection.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={cashEnabled} onChange={() => setCashEnabled(!cashEnabled)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1349ec]" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Refund Management table — Stitch */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1349ec]/10 rounded-lg text-[#1349ec]">
                      <span className="material-symbols-outlined text-xl">currency_exchange</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold leading-tight text-slate-900">Refund Management</h2>
                      <p className="text-sm text-slate-500 mt-1">Process eligible refunds for cancelled tests.</p>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input
                      type="text"
                      placeholder="Search Order ID, Name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-[#1349ec]/20 focus:border-[#1349ec] placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order Details</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gateway</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">#{t.orderId}</div>
                            <div className="text-xs text-slate-500 mt-1">{t.cancelledNote ?? t.transactionDate}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{t.customerName}</div>
                            <div className="text-xs text-slate-500 mt-1">{t.customerEmail}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">${t.amount}</div>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                t.paymentStatus === "Refunded"
                                  ? "bg-green-100 text-green-800"
                                  : t.paymentStatus === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {t.paymentStatus === "Refunded" ? "Refunded" : t.paymentStatus === "Pending" ? "Pending Refund" : "Paid"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <PaymentMethodIcon method={t.paymentMethod} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setViewingId(t.id)}
                                className="px-4 py-2 bg-white border border-slate-200 text-[#1349ec] rounded-lg text-sm font-medium hover:bg-[#1349ec]/5 transition-colors"
                              >
                                View
                              </button>
                              {t.paymentStatus !== "Refunded" ? (
                                <button
                                  type="button"
                                  onClick={() => processRefund(t.id)}
                                  className="px-4 py-2 bg-white border border-slate-200 text-[#1349ec] rounded-lg text-sm font-medium hover:bg-[#1349ec]/5 transition-colors focus:ring-2 focus:ring-[#1349ec]/20"
                                >
                                  Process Refund
                                </button>
                              ) : (
                                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed" disabled>
                                  Refunded
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                  <span>Showing {filtered.length} of {transactions.length} transactions</span>
                  <div className="flex gap-2">
                    <button type="button" className="p-1 rounded hover:bg-slate-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-slate-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Transaction modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewingId(null)} role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Transaction #{viewing.id}</h3>
              <button type="button" onClick={() => setViewingId(null)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-slate-500">Order ID</dt><dd className="font-medium text-slate-900">{viewing.orderId}</dd></div>
              <div><dt className="text-slate-500">Customer</dt><dd className="font-medium text-slate-900">{viewing.customerName} ({viewing.customerEmail})</dd></div>
              <div><dt className="text-slate-500">Amount</dt><dd className="font-medium text-slate-900">${viewing.amount}</dd></div>
              <div><dt className="text-slate-500">Payment method</dt><dd className="font-medium text-slate-900">{viewing.paymentMethod}</dd></div>
              <div><dt className="text-slate-500">Status</dt><dd className="font-medium text-slate-900">{viewing.paymentStatus}</dd></div>
              <div><dt className="text-slate-500">Date</dt><dd className="font-medium text-slate-900">{viewing.transactionDate}</dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
