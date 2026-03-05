import trackingData from "@/data/tracking.json";

export function getTrackingOrder() {
  return JSON.parse(JSON.stringify(trackingData.order));
}

export function getTrackingTimeline() {
  return JSON.parse(JSON.stringify(trackingData.timeline));
}

export function getTrackingLiveLocation() {
  return JSON.parse(JSON.stringify(trackingData.liveLocation));
}
