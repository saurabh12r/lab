import * as trackingRepository from "@/repositories/trackingRepository";

export function getTrackingOrder() {
  return trackingRepository.getTrackingOrder();
}

export function getTrackingTimeline() {
  return trackingRepository.getTrackingTimeline();
}

export function getTrackingLiveLocation() {
  return trackingRepository.getTrackingLiveLocation();
}
