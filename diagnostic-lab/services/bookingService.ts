import * as bookingRepository from "@/repositories/bookingRepository";

export function getBookingCities() {
  return bookingRepository.getBookingCities();
}

export function getBookingAreas(): Record<string, string[]> {
  return bookingRepository.getBookingAreas();
}

export function getBookingSlots() {
  return bookingRepository.getBookingSlots();
}

export function getBookingSuccessSummary() {
  return bookingRepository.getBookingSuccessSummary();
}
