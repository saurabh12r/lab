import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin – Trutest Diagnostics",
  description: "Admin panel for Trutest Diagnostics.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="min-h-screen bg-slate-100 font-[Inter,sans-serif] text-slate-900 flex">
        <AdminHeader />
        <AdminSidebar />
        <main className="flex-1 pt-14 md:pl-56 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
