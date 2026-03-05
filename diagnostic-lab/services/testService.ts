import type { TestType } from "@/types";
import * as testRepository from "@/repositories/testRepository";

let cache: TestType[] | null = null;

function getCache(): TestType[] {
  if (!cache) cache = testRepository.getAllTests();
  return cache;
}

export function getTests(): TestType[] {
  return getCache();
}

export function addTest(tests: TestType[], test: Omit<TestType, "id">): TestType[] {
  const id = `test_${String(Date.now()).slice(-6)}`;
  const newTest: TestType = { ...test, id };
  cache = [...getCache(), newTest];
  return cache;
}

export function updateTest(tests: TestType[], id: string, data: Partial<Omit<TestType, "id">>): TestType[] {
  cache = getCache().map((t) => (t.id === id ? { ...t, ...data } : t));
  return cache;
}

export function deleteTest(tests: TestType[], id: string): TestType[] {
  cache = getCache().filter((t) => t.id !== id);
  return cache;
}
