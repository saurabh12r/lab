// ── Core entity types (match models / API) ─────────────────────────────────

export interface UserType {
  id: string;
  name: string;
  initials: string;
  genderAge: string;
  phone: string;
  email: string;
  location: string;
  totalOrders: number;
  lastActivity: string;
  active: boolean;
}

export interface OrderType {
  id: string;
  customerName: string;
  customerPhone: string;
  customerInitials: string;
  packageName: string;
  packageColor: "blue" | "purple" | "green" | "orange";
  date: string;
  time: string;
  city: string;
  status: OrderStatusType;
  paymentStatus: PaymentStatusType;
}

export type OrderStatusType =
  | "Pending"
  | "Sample Collected"
  | "Processing"
  | "Report Ready"
  | "Completed"
  | "Cancelled";

export type PaymentStatusType = "Paid" | "Pending" | "Refunded";

export interface PackageType {
  id: number;
  badge?: string;
  badgeClass?: string;
  discount?: string;
  name: string;
  desc: string;
  price: string;
  strikePrice?: string;
  parameters?: string;
  img: string;
  alt?: string;
  defaultSelected?: boolean;
}

export type TestStatusType = "active" | "inactive";

export interface TestType {
  id: string;
  name: string;
  category: string;
  price: number;
  reportTime: string;
  preparation: string;
  status: TestStatusType;
}

export interface ReportType {
  name: string;
  sub: string;
  icon: string;
  iconBg: string;
  bookingId: string;
  date: string;
  status: "Ready" | "Processing";
}

export interface BlogType {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  publishDate: string;
}

export interface TransactionType {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  paymentMethod: string;
  paymentStatus: PaymentStatusType;
  transactionDate: string;
  cancelledNote?: string;
}

// ── Dashboard / booking / UI support types ──────────────────────────────────

export type BookingStatusType =
  | "Sample Collected"
  | "Report Ready"
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface BookingType {
  id: string;
  package: string;
  icon: string;
  iconBg: string;
  date: string;
  city: string;
  area: string;
  status: BookingStatusType;
  action: string;
  actionIcon: string;
  actionLink: string;
  actionClass: string;
}

export interface ReportResultRow {
  test: string;
  result: string;
  flag: string;
  unit: string;
  range: string;
  normal: boolean;
}

export interface HistoryItemType {
  date: string;
  time: string;
  name: string;
  status: string;
  referredBy: string;
}
