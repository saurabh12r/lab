import type { ReportType } from "@/types";
import * as reportRepository from "@/repositories/reportRepository";

export function getReportStatCards(): { icon: string; iconBg: string; label: string; value: string }[] {
  return reportRepository.getReportStatCards();
}

export function getReports(): ReportType[] {
  return reportRepository.getAllReports();
}

export function getReportView() {
  return reportRepository.getReportViewData();
}

export function getReportViewResults() {
  return reportRepository.getReportViewResults();
}
