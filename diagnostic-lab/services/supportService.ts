import * as supportRepository from "@/repositories/supportRepository";

export function getSupportInfo() {
  return supportRepository.getSupportInfo();
}

export function getPreferredTimes(): string[] {
  return supportRepository.getPreferredTimes();
}
