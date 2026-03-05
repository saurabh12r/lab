import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Partnership – Trutest Diagnostics",
  description: "Partner with us for corporate wellness, bulk testing, and employee health programs.",
};

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
