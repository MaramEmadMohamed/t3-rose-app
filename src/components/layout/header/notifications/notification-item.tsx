"use client";

import { Check, EllipsisVertical, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";

import { useDismiss } from "@/hooks/use-dismiss";
import { useNotificationActions } from "@/hooks/use-notifications";
import type { Notification } from "@/lib/api/notifications";
import { cn } from "@/lib/utils";

const MENU_ITEM_CLASS_NAME =
  "flex items-center gap-2.5 rounded-md py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:text-maroon-700 disabled:cursor-not-allowed disabled:text-zinc-400 dark:text-zinc-50 dark:hover:text-soft-pink-300 dark:disabled:text-zinc-500";

export function NotificationItem({ notification }: { notification: Notification }) {
  // Translation
  const t = useTranslations("Notifications");

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Mutation
  const { markAsRead, removeNotification } = useNotificationActions();

  // Functions
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function handleMarkAsRead() {
    markAsRead.mutate(notification.id);
    closeMenu();
  }

  function handleDelete() {
    removeNotification.mutate(notification.id);
    closeMenu();
  }

  // Custom hooks
  useDismiss({ ref: menuRef, isOpen: isMenuOpen, onDismiss: closeMenu });

  return (
    <li
      className={cn(
        "flex flex-col gap-1.5 border-t border-zinc-300 p-4 dark:border-zinc-600",
        notification.isRead
          ? "bg-zinc-200 dark:bg-zinc-700"
          : "bg-white dark:bg-zinc-900",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-50">
          {notification.title}
        </h3>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={toggleMenu}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label={t("optionsLabel")}
            className="rounded-md p-0.5 text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <EllipsisVertical aria-hidden="true" className="size-4" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute end-0 top-full z-10 mt-1 flex w-51.25 flex-col rounded-xl bg-white p-3 shadow-soft dark:bg-zinc-800"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleMarkAsRead}
                disabled={notification.isRead}
                className={MENU_ITEM_CLASS_NAME}
              >
                <Check aria-hidden="true" className="size-4" />
                {t("markAsRead")}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleDelete}
                className={MENU_ITEM_CLASS_NAME}
              >
                <Trash aria-hidden="true" className="size-4 text-danger" />
                {t("delete")}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">
        {notification.message}
      </p>
    </li>
  );
}
