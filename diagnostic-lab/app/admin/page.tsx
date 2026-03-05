import Link from "next/link";
import {
  getAdminKpi,
  getAdminOrderStatus,
  getAdminTopTests,
  getAdminRecentActivity,
  getAdminSystemStatus,
  getAdminChartMonths,
  getAdminChartValues,
} from "@/services/adminService";

export default function AdminDashboardPage() {
  const KPI = getAdminKpi();
  const ORDER_STATUS = getAdminOrderStatus();
  const TOP_TESTS = getAdminTopTests();
  const RECENT_ACTIVITY = getAdminRecentActivity();
  const SYSTEM_STATUS = getAdminSystemStatus();
  const CHART_MONTHS = getAdminChartMonths();
  const CHART_VALUES = getAdminChartValues();

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {KPI.map((k: { title: string; value: string; icon: string; trend: string; up: boolean; href?: string }) => {
          const card = (
            <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full">
              <p className="text-slate-500 text-sm font-medium">{k.title}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{k.value}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <span className={`material-symbols-outlined text-[16px] ${k.up ? "text-emerald-500" : "text-red-500"}`}>
                  {k.up ? "trending_up" : "trending_down"}
                </span>
                <span className={k.up ? "text-emerald-600" : "text-red-600"}>{k.trend}</span>
              </div>
              <span className="material-symbols-outlined text-slate-300 text-[28px] absolute top-4 right-4">{k.icon}</span>
            </div>
          );
          return "href" in k && k.href ? (
            <Link key={k.title} href={k.href} className="block hover:opacity-95 transition-opacity">
              {card}
            </Link>
          ) : (
            <div key={k.title}>{card}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-[#0a6a99] text-white text-xs font-medium" type="button">Last 6 Months</button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium" type="button">Last Year</button>
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-6">Monthly revenue performance</p>
          <div className="flex items-end justify-between gap-2 h-48 px-2">
            {CHART_VALUES.map((v: number, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full max-w-[40px] rounded-t bg-[#0a6a99]/80 transition-all" style={{ height: `${v}%` }} />
                <span className="text-xs text-slate-500">{CHART_MONTHS[i]}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>$10k</span>
            <span>$50k</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Orders by Status</h3>
          <p className="text-slate-500 text-sm mb-6">Distribution of current order statuses</p>
          <div className="space-y-4">
            {ORDER_STATUS.map((s: { label: string; pct: number; color: string }) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium text-slate-700">{s.label}</div>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-sm font-semibold text-slate-900 w-10">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Most Ordered Tests</h3>
          <p className="text-slate-500 text-sm mb-6">Top 3 diagnostics this month</p>
          <ul className="space-y-4">
            {TOP_TESTS.map((t: { icon: string; name: string; orders: string; revenue: string }) => (
              <li key={t.name} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="size-10 rounded-lg bg-[#0a6a99]/10 flex items-center justify-center text-[#0a6a99]">
                  <span className="material-symbols-outlined text-[24px]">{t.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.orders}</p>
                </div>
                <p className="text-sm font-bold text-slate-900">{t.revenue}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Recent Activities</h3>
          <p className="text-slate-500 text-sm mb-6">Real-time updates from lab</p>
          <ul className="space-y-4 max-h-80 overflow-y-auto">
            {RECENT_ACTIVITY.map((a: { time: string; text: string; sub?: string; actions?: string[] }, i: number) => (
              <li key={i} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <p className="text-xs text-slate-400">{a.time}</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{a.text}</p>
                {a.sub && <p className="text-xs text-slate-500 mt-0.5">{a.sub}</p>}
                {a.actions && (
                  <div className="mt-2 flex gap-2">
                    {a.actions.map((btn) => (
                      <button key={btn} type="button" className="text-xs font-medium text-[#0a6a99] hover:underline">
                        {btn}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link href="/admin/orders" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0a6a99] hover:underline">
            View All Orders
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link href="/admin/packages" className="mt-4 ml-6 inline-flex items-center gap-1 text-sm font-medium text-[#0a6a99] hover:underline">
            Manage Packages
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-slate-700">Operational</span>
          </div>
          {SYSTEM_STATUS.map((s: { label: string; value: string }) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{s.label}</span>
              <span className="text-sm font-medium text-slate-900">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Notifications</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
            <span className="text-sm text-slate-700">New prescription uploaded — pending review</span>
            <Link href="/admin/prescriptions" className="text-sm font-medium text-[#0a6a99] hover:underline shrink-0">
              New Prescription
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
