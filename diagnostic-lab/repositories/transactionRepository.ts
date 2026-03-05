import type { TransactionType } from "@/types";

import transactionsData from "@/data/transactions.json";

export function getAllTransactions(): TransactionType[] {
  return JSON.parse(JSON.stringify(transactionsData)) as TransactionType[];
}
