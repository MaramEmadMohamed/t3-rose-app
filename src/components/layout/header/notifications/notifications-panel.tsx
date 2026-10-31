"use client";

import { BrushCleaning, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  useNotificationActions,
  useNotifications,
} from "@/hooks/use-notifications";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { NotificationItem } from "./notification-item";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { PanelStatusMessage } from "./panel-status-message";
import { PushOptIn } from "./push-opt-in";

const ACTION_BUTTON_CLASS_NAME = cn(
  "flex items-center gap-1.5 rounded-md p-1 transition-colors hover:text-primary-saturated disabled:cursor-not-allowed disabled:text-muted",
  FOCUS_RING_CLASS_NAME,
);

export function NotificationsPanel({ unreadCount }: { unreadCount: number }) {
  // Translation
  const t = useTranslations("Notifications");

  // Query
  const {
    data: notifications = [],
    isPending,
    isError,
    fetchStatus,
  } = useNotifications();

  // Mutation
  const { markAllAsRead, clearAll } = useNotificationActions();

  // Variables
  const hasNotifications = notifications.length > 0;
  const hasUnread = unreadCount > 0;
  const isLoading = isPending && fetchStatus === "fetching";

  // Functions
  function handleClearAll() {
    clearAll.mutate();
  }

  function handleMarkAllAsRead() {
    markAllAsRead.mutate();
  }

  function renderContent() {
    if (isLoading) {
      return (
        <PanelStatusMessage role="status" className="text-soft">
          {t("loading")}
        </PanelStatusMessage>
      );
    }

    if (isError) {
      return (
        <PanelStatusMessage role="alert" className="text-danger">
          {t("loadError")}
        </PanelStatusMessage>
      );
    }

    if (!hasNotifications) return <NotificationsEmptyState />;

    return (
      <ul className="max-h-150 overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    );
  }

  return (
    <section
      aria-labelledby="notifications-title"
      className="w-84 overflow-hidden rounded-xl bg-plain shadow-soft"
    >
      <h2
        id="notifications-title"
        className="bg-primary-saturated p-4 text-xl font-bold text-inverse"
      >
        {hasUnread ? t("titleWithCount", { count: unreadCount }) : t("title")}
      </h2>

      <div className="flex items-center justify-between p-2.5 text-xs font-semibold text-plain">
        <button
          type="button"
          onClick={handleClearAll}
          disabled={!hasNotifications || clearAll.isPending}
          className={ACTION_BUTTON_CLASS_NAME}
        >
          <BrushCleaning aria-hidden="true" className="size-4" />
          {t("clearAll")}
        </button>
        <button
          type="button"
          onClick={handleMarkAllAsRead}
          disabled={!hasUnread || markAllAsRead.isPending}
          className={ACTION_BUTTON_CLASS_NAME}
        >
          <CheckCheck aria-hidden="true" className="size-4" />
          {t("markAllAsRead")}
        </button>
      </div>

      {renderContent()}
      <PushOptIn />
    </section>
  );
}
