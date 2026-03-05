import type { UserType, HistoryItemType } from "@/types";

import usersData from "@/data/users.json";

export function getAllUsers(): UserType[] {
  return JSON.parse(JSON.stringify(usersData.users)) as UserType[];
}

export function getUserHistoryByUserId(userId: string): HistoryItemType[] {
  const data = usersData as { history: Record<string, HistoryItemType[]> };
  const record = data.history?.[userId];
  return record ? JSON.parse(JSON.stringify(record)) : [];
}
