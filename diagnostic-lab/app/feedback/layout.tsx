import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback – Trutest Diagnostics",
  description: "Rate your experience and help us improve our diagnostic services.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
