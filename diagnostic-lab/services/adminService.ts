import * as adminRepository from "@/repositories/adminRepository";

export function getAdminSidebarLinks() {
  return adminRepository.getSidebarLinks();
}

export function getAdminKpi() {
  return adminRepository.getKpi();
}

export function getAdminOrderStatus() {
  return adminRepository.getOrderStatus();
}

export function getAdminTopTests() {
  return adminRepository.getTopTests();
}

export function getAdminRecentActivity() {
  return adminRepository.getRecentActivity();
}

export function getAdminSystemStatus() {
  return adminRepository.getSystemStatus();
}

export function getAdminChartMonths() {
  return adminRepository.getChartMonths();
}

export function getAdminChartValues() {
  return adminRepository.getChartValues();
}
