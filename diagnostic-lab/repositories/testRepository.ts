import type { TestType } from "@/types";

import testsData from "@/data/tests.json";

export function getAllTests(): TestType[] {
  return JSON.parse(JSON.stringify(testsData)) as TestType[];
}
