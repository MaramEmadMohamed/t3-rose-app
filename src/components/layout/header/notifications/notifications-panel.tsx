"use client";

import { BrushCleaning, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  useNotificationActions,
  useNotifications,
} from "@/hooks/use-notifications";

import { NotificationItem } from "./notification-item";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { PushOptIn } from "./push-opt-in";

const ACTION_BUTTON_CLASS_NAME =
  "flex items-center gap-1.5 rounded-md p-1 transition-colors hover:text-maroon-700 disabled:cursor-not-allowed disabled:text-zinc-400 dark:hover:text-soft-pink-300";

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
        <p role="status" className="border-t border-zinc-300 p-4 text-sm text-zinc-500 dark:border-zinc-600">
          {t("loading")}
        </p>
      );
    }

    if (isError) {
      return (
        <p role="alert" className="border-t border-zinc-300 p-4 text-sm text-danger dark:border-zinc-600">
          {t("loadError")}
        </p>
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
      className="w-84 overflow-hidden rounded-xl bg-white shadow-soft dark:bg-zinc-800"
    >
      <h2
        id="notifications-title"
        className="bg-maroon-700 p-4 text-xl font-bold text-white"
      >
        {hasUnread ? t("titleWithCount", { count: unreadCount }) : t("title")}
      </h2>

      <div className="flex items-center justify-between p-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-50">
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
