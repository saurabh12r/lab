import type { UserType, HistoryItemType } from "@/types";
import * as userRepository from "@/repositories/userRepository";

export function getUsers(): UserType[] {
  return userRepository.getAllUsers();
}

export function getUserHistory(userId: string): HistoryItemType[] {
  return userRepository.getUserHistoryByUserId(userId);
}
