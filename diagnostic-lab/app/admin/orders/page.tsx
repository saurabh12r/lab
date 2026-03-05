"use client";

import { useState } from "react";
import { getOrders } from "@/services/orderService";
import type { OrderType, OrderStatusType } from "@/types";

function getStatusStyles(status: OrderStatusType) {
  switch (status) {
    case "Completed":
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    case "Processing":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    case "Report Ready":
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400";
    case "Sample Collected":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    case "Cancelled":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPackageColorStyles(color: OrderType["packageColor"]) {
  switch (color) {
    case "blue":
      return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-700/10";
    case "purple":
      return "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-purple-700/10";
    case "green":
      return "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 ring-green-700/10";
    case "orange":
      return "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 ring-orange-700/10";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-700/10";
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>(getOrders());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filteredOrders = search.trim()
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.toLowerCase().includes(search.toLowerCase()) ||
          o.customerPhone.includes(search)
      )
    : orders;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / perPage));
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const updateOrderStatus = (orderId: string, newStatus: OrderStatusType) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div
      className="flex flex-col min-h-full font-[Inter,sans-serif] bg-[#f6f7f8]"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-8">
        <div className="flex flex-col gap-1">
          <h2
            className="text-3xl font-bold leading-tight tracking-tight text-slate-900"
          >
            Order Management
          </h2>
          <p className="text-base font-normal text-slate-600">
            Manage and track all diagnostic lab orders.
          </p>
        </div>
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            type="button"
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-slate-900"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            <span className="text-sm font-medium">Export</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-[#0a6a99] hover:bg-[#064b6e] text-white px-4 py-2.5 rounded-lg shadow-md transition-colors"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="text-sm font-medium">New Order</span>
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-8">
        {[
          {
            label: "Total Orders",
            value: "1,240",
            icon: "receipt_long",
            trend: "12%",
            up: true,
            iconBg: "bg-[#0a6a99]/10",
            iconColor: "text-[#0a6a99]/70",
          },
          {
            label: "Pending",
            value: "45",
            icon: "hourglass_top",
            trend: "5%",
            up: false,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-500",
          },
          {
            label: "Completed",
            value: "1,195",
            icon: "check_circle",
            trend: "15%",
            up: true,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            label: "Revenue",
            value: "$45,200",
            icon: "attach_money",
            trend: "8%",
            up: true,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <span
                className={`material-symbols-outlined ${stat.iconBg} ${stat.iconColor} p-1.5 rounded-lg text-xl`}
              >
                {stat.icon}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <span
                className={`text-xs font-semibold mb-1 flex items-center px-1.5 py-0.5 rounded ${
                  stat.up
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                <span className="material-symbols-outlined text-sm mr-0.5">
                  trending_up
                </span>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Filters & Actions */}
      <div className="px-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex-1 min-w-0 max-w-lg">
            <label className="relative block w-full">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </span>
              <input
                type="text"
                name="search"
                placeholder="Search by Order ID, Patient, or Phone..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-[#0a6a99] sm:text-sm sm:leading-6"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-slate-100 px-3 py-2.5 rounded-lg border border-transparent hover:border-slate-200 transition-all text-sm font-medium text-slate-600"
            >
              <span>City</span>
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-slate-100 px-3 py-2.5 rounded-lg border border-transparent hover:border-slate-200 transition-all text-sm font-medium text-slate-600"
            >
              <span>Status</span>
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-slate-100 px-3 py-2.5 rounded-lg border border-transparent hover:border-slate-200 transition-all text-sm font-medium text-slate-600"
            >
              <span>Date</span>
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
            </button>
            <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />
            <button
              type="button"
              className="flex items-center gap-2 text-[#0a6a99] hover:bg-[#0a6a99]/10 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-12 flex-1 overflow-hidden flex flex-col">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0a6a99] focus:ring-[#0a6a99] w-4 h-4"
                    />
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    User Details
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Package / Test
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    City
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0a6a99] focus:ring-[#0a6a99] w-4 h-4"
                      />
                    </td>
                    <td className="p-4 text-sm font-medium text-[#0a6a99]">
                      #{order.id}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#0a6a99]/20 text-[#0a6a99]">
                          {order.customerInitials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-900">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-slate-600">
                            {order.customerPhone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPackageColorStyles(
                          order.packageColor
                        )}`}
                      >
                        {order.packageName}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {order.date}
                      <br />
                      <span className="text-xs text-slate-500">{order.time}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{order.city}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                          order.status
                        )}`}
                      >
                        <span className="size-1.5 rounded-full bg-current opacity-80" />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={
                          order.paymentStatus === "Paid"
                            ? "text-green-600 text-xs font-medium"
                            : "text-amber-600 text-xs font-medium"
                        }
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="p-1.5 text-slate-600 rounded transition-colors hover:text-[#0a6a99] hover:bg-[#0a6a99]/10"
                          title="Edit Order"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1.5 text-slate-600 rounded transition-colors hover:text-[#0a6a99] hover:bg-[#0a6a99]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Upload Report"
                          disabled={order.status === "Cancelled"}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            upload_file
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1.5 text-slate-600 rounded transition-colors hover:text-[#0a6a99] hover:bg-[#0a6a99]/10"
                          title="Change Status"
                          onClick={() => {
                            const statuses: OrderStatusType[] = [
                              "Pending",
                              "Sample Collected",
                              "Processing",
                              "Report Ready",
                              "Completed",
                              "Cancelled",
                            ];
                            const i = statuses.indexOf(order.status) + 1;
                            updateOrderStatus(
                              order.id,
                              statuses[i % statuses.length]
                            );
                          }}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            swap_horiz
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6 bg-white">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-medium text-slate-900">
                  {(page - 1) * perPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-slate-900">
                  {Math.min(page * perPage, filteredOrders.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900">
                  {filteredOrders.length}
                </span>{" "}
                results
              </p>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                        p === page
                          ? "bg-[#0a6a99] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6a99]"
                          : "ring-1 ring-inset ring-slate-200 text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
