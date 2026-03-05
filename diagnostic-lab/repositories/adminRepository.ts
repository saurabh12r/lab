import adminData from "@/data/admin.json";

export function getSidebarLinks() {
  return JSON.parse(JSON.stringify(adminData.sidebarLinks));
}

export function getKpi() {
  return JSON.parse(JSON.stringify(adminData.kpi));
}

export function getOrderStatus() {
  return JSON.parse(JSON.stringify(adminData.orderStatus));
}

export function getTopTests() {
  return JSON.parse(JSON.stringify(adminData.topTests));
}

export function getRecentActivity() {
  return JSON.parse(JSON.stringify(adminData.recentActivity));
}

export function getSystemStatus() {
  return JSON.parse(JSON.stringify(adminData.systemStatus));
}

export function getChartMonths() {
  return [...(adminData.chartMonths as string[])];
}

export function getChartValues() {
  return [...(adminData.chartValues as number[])];
}
