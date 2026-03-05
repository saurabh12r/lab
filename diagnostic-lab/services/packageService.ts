import type { PackageType } from "@/types";
import * as packageRepository from "@/repositories/packageRepository";

export function getPackages(): PackageType[] {
  return packageRepository.getAllPackages();
}

export function getPackageCategories(): { icon: string; label: string; active?: boolean }[] {
  return packageRepository.getAllPackageCategories();
}
