import { apiRequest } from "./api-client";

export type NotificationType =
  | "ORDER"
  | "PROMOTION"
  | "SYSTEM"
  | "REVIEW"
  | "OTHER";

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

type NotificationsResponse = {
  payload: {
    data: Notification[];
  };
};

type UnreadCountResponse = {
  payload: {
    unreadCount: number;
  };
};

const NOTIFICATIONS_PATH = "/api/notifications";
const NOTIFICATIONS_PAGE_SIZE = 20;

export async function getNotifications() {
  const response = await apiRequest<NotificationsResponse>(
    `${NOTIFICATIONS_PATH}?limit=${NOTIFICATIONS_PAGE_SIZE}`,
  );
  return response.payload.data;
}

export async function getUnreadNotificationsCount() {
  const response = await apiRequest<UnreadCountResponse>(
    `${NOTIFICATIONS_PATH}/unread-count`,
  );
  return response.payload.unreadCount;
}

export function markNotificationAsRead(notificationId: string) {
  return apiRequest(`${NOTIFICATIONS_PATH}/${notificationId}`, {
    method: "PATCH",
    body: JSON.stringify({ isRead: true }),
  });
}

export function markAllNotificationsAsRead() {
  return apiRequest(`${NOTIFICATIONS_PATH}/mark-all-read`, { method: "PATCH" });
}

export function deleteNotification(notificationId: string) {
  return apiRequest(`${NOTIFICATIONS_PATH}/${notificationId}`, {
    method: "DELETE",
  });
}

export function clearAllNotifications() {
  return apiRequest(`${NOTIFICATIONS_PATH}/clear-all`, { method: "DELETE" });
}
