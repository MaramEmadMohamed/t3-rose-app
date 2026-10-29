import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  clearAllNotifications,
  deleteNotification,
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/api/notifications";

import { useIsAuthenticated } from "./use-is-authenticated";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

export function useNotifications() {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: getNotifications,
    enabled: isAuthenticated,
  });
}

export function useUnreadNotificationsCount() {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationsCount,
    enabled: isAuthenticated,
  });
}

export function useNotificationActions() {
  // Translation
  const t = useTranslations("Notifications");

  // Context
  const queryClient = useQueryClient();

  // Variables
  const mutationCallbacks = {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
    onError: () => toast.error(t("actionError")),
  };

  // Mutation
  const markAsRead = useMutation({
    mutationFn: markNotificationAsRead,
    ...mutationCallbacks,
  });
  const markAllAsRead = useMutation({
    mutationFn: markAllNotificationsAsRead,
    ...mutationCallbacks,
  });
  const removeNotification = useMutation({
    mutationFn: deleteNotification,
    ...mutationCallbacks,
  });
  const clearAll = useMutation({
    mutationFn: clearAllNotifications,
    ...mutationCallbacks,
  });

  return { markAsRead, markAllAsRead, removeNotification, clearAll };
}
