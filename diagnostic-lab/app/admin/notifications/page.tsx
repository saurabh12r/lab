"use client";

import { useState } from "react";
import { getNotificationTriggers } from "@/services/notificationService";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

export default function AdminNotificationsPage() {
  const TRIGGERS = getNotificationTriggers();
  const [whatsappApiKey, setWhatsappApiKey] = useState("sk_test_1234567890abcdef");
  const [senderId, setSenderId] = useState("PREMIUMLAB");
  const [smtpHost, setSmtpHost] = useState("smtp.sendgrid.net");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUsername, setSmtpUsername] = useState("apikey");
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••••••");
  const [triggers, setTriggers] = useState<Record<string, boolean>>({
    booking: true,
    sample: true,
    report: true,
    payment: false,
  });
  const [savedWhatsApp, setSavedWhatsApp] = useState(false);
  const [savedEmail, setSavedEmail] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const saveWhatsApp = () => {
    setSavedWhatsApp(true);
    setTimeout(() => setSavedWhatsApp(false), 2000);
  };
  const saveEmail = () => {
    setSavedEmail(true);
    setTimeout(() => setSavedEmail(false), 2000);
  };
  const sendTestNotification = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="flex flex-1 justify-center py-8 px-4 sm:px-10 lg:px-20">
        <div className="flex flex-col w-full max-w-[960px] gap-8">
          {/* Page Title — Stitch */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 text-3xl font-bold leading-tight">Notification API Settings</h1>
              <p className="text-slate-500 text-sm font-normal">Configure communication APIs and automated alert triggers for the diagnostic lab.</p>
            </div>
            <button
              type="button"
              onClick={sendTestNotification}
              className="shrink-0 flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="material-symbols-outlined text-lg">send</span>
              {testSent ? "Sent!" : "Send Test Notification"}
            </button>
          </div>

          {/* WhatsApp API Settings Card — Stitch */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-10 rounded-lg bg-green-100 text-green-600">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">WhatsApp API Configuration</h2>
                <p className="text-sm text-slate-500">Manage credentials for automated WhatsApp messaging.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">API Key</p>
                <input
                  type="password"
                  value={whatsappApiKey}
                  onChange={(e) => setWhatsappApiKey(e.target.value)}
                  placeholder="Enter WhatsApp API Key"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">Sender ID</p>
                <input
                  type="text"
                  value={senderId}
                  onChange={(e) => setSenderId(e.target.value)}
                  placeholder="Enter Sender ID"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={saveWhatsApp}
                className="text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                {savedWhatsApp ? "Saved" : "Save WhatsApp Settings"}
              </button>
            </div>
          </div>

          {/* Email SMTP Settings Card — Stitch */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-10 rounded-lg bg-blue-100 text-blue-600">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Email SMTP Configuration</h2>
                <p className="text-sm text-slate-500">Set up the mail server for sending patient reports and updates.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">SMTP Host</p>
                <input
                  type="text"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  placeholder="e.g., smtp.mailgun.org"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">Port</p>
                <input
                  type="text"
                  inputMode="numeric"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(e.target.value)}
                  placeholder="e.g., 587"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">Username</p>
                <input
                  type="text"
                  value={smtpUsername}
                  onChange={(e) => setSmtpUsername(e.target.value)}
                  placeholder="SMTP Username"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
              <label className="flex flex-col flex-1">
                <p className="text-slate-700 text-sm font-medium mb-2">Password</p>
                <input
                  type="password"
                  value={smtpPassword}
                  onChange={(e) => setSmtpPassword(e.target.value)}
                  placeholder="SMTP Password"
                  className="flex w-full rounded-lg text-slate-900 focus:ring-2 focus:ring-[#1349ec]/50 focus:border-[#1349ec] border border-slate-300 bg-white h-12 px-4 text-sm"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={saveEmail}
                className="text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                {savedEmail ? "Saved" : "Save Email Settings"}
              </button>
            </div>
          </div>

          {/* Notification Triggers Card — Stitch */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-10 rounded-lg bg-purple-100 text-purple-600">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Notification Triggers</h2>
                <p className="text-sm text-slate-500">Enable or disable automated alerts for specific events.</p>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-slate-100">
              {TRIGGERS.map((t: { id: string; title: string; description: string }) => (
                <div key={t.id} className="flex items-center justify-between py-4 first:pt-0">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-900 font-medium text-base">{t.title}</p>
                    <p className="text-slate-500 text-sm">{t.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={triggers[t.id] ?? false}
                      onChange={() => setTriggers((prev) => ({ ...prev, [t.id]: !prev[t.id] }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1349ec]/30 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1349ec]" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
