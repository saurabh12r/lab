import bookingData from "@/data/booking.json";
import bookingSuccessData from "@/data/booking-success.json";

export function getBookingCities() {
  return JSON.parse(JSON.stringify(bookingData.cities));
}

export function getBookingAreas(): Record<string, string[]> {
  return JSON.parse(JSON.stringify(bookingData.areas)) as Record<string, string[]>;
}

export function getBookingSlots() {
  return JSON.parse(JSON.stringify(bookingData.slots));
}

export function getBookingSuccessSummary() {
  return JSON.parse(JSON.stringify(bookingSuccessData));
}
