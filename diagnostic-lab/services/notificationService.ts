import * as notificationRepository from "@/repositories/notificationRepository";

export function getNotificationTriggers() {
  return notificationRepository.getNotificationTriggers();
}
