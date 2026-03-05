import type { PackageType } from "@/types";

import packagesData from "@/data/packages.json";
import categoriesData from "@/data/package-categories.json";

export function getAllPackages(): PackageType[] {
  return JSON.parse(JSON.stringify(packagesData)) as PackageType[];
}

export function getAllPackageCategories(): { icon: string; label: string; active?: boolean }[] {
  return JSON.parse(JSON.stringify(categoriesData)) as { icon: string; label: string; active?: boolean }[];
}
