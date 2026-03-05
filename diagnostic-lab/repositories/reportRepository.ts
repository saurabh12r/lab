import type { ReportType } from "@/types";

import reportsData from "@/data/reports.json";
import reportViewData from "@/data/report-view.json";

export function getReportStatCards(): { icon: string; iconBg: string; label: string; value: string }[] {
  return JSON.parse(JSON.stringify(reportsData.statCards));
}

export function getAllReports(): ReportType[] {
  return JSON.parse(JSON.stringify(reportsData.reports)) as ReportType[];
}

export function getReportViewData() {
  return JSON.parse(JSON.stringify(reportViewData.report));
}

export function getReportViewResults() {
  return JSON.parse(JSON.stringify(reportViewData.cbcResults));
}
