import type { OrderType } from "@/types";

import ordersData from "@/data/orders.json";

export function getAllOrders(): OrderType[] {
  return JSON.parse(JSON.stringify(ordersData)) as OrderType[];
}
