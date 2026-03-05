import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry & Support – Trutest Diagnostics",
  description: "Request a call back or chat with us on WhatsApp for support.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
