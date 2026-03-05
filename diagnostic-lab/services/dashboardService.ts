import type { BookingType } from "@/types";
import * as dashboardRepository from "@/repositories/dashboardRepository";

export function getDashboardStats(): { label: string; count: number; active: boolean; hoverColor: string }[] {
  return dashboardRepository.getDashboardStats();
}

export function getBookings(): BookingType[] {
  return dashboardRepository.getAllBookings();
}

export function getDashboardProfileImg(): string {
  return dashboardRepository.getProfileImg();
}
