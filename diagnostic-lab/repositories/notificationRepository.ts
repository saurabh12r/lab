import notificationsData from "@/data/notifications.json";

export function getNotificationTriggers() {
  return JSON.parse(JSON.stringify(notificationsData.triggers));
}
