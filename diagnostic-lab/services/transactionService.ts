import type { TransactionType } from "@/types";
import * as transactionRepository from "@/repositories/transactionRepository";

export function getTransactions(): TransactionType[] {
  return transactionRepository.getAllTransactions();
}
