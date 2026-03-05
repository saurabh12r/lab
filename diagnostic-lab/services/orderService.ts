import type { OrderType } from "@/types";
import * as orderRepository from "@/repositories/orderRepository";

export function getOrders(): OrderType[] {
  return orderRepository.getAllOrders();
}
