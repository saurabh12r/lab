import type { BookingType } from "@/types";

import dashboardData from "@/data/dashboard.json";

export function getDashboardStats(): { label: string; count: number; active: boolean; hoverColor: string }[] {
  return JSON.parse(JSON.stringify(dashboardData.stats));
}

export function getAllBookings(): BookingType[] {
  return JSON.parse(JSON.stringify(dashboardData.bookings)) as BookingType[];
}

export function getProfileImg(): string {
  const data = dashboardData as { profileImg?: string };
  return data.profileImg ?? "";
}
