"use client";

import { Check, EllipsisVertical, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { useDismiss } from "@/hooks/use-dismiss";
import { useNotificationActions } from "@/hooks/use-notifications";
import type { Notification } from "@/lib/api/notifications";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

const MENU_ITEM_CLASS_NAME = cn(
  "flex items-center gap-2.5 rounded-md py-1.5 text-sm font-medium text-plain transition-colors hover:text-primary-saturated disabled:cursor-not-allowed disabled:text-muted",
  FOCUS_RING_CLASS_NAME,
);

export function NotificationItem({ notification }: { notification: Notification }) {
  // Translation
  const t = useTranslations("Notifications");

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Mutation
  const { markAsRead, deleteNotification } = useNotificationActions();

  // Custom hooks
  useDismiss({ ref: menuRef, isOpen: isMenuOpen, onDismiss: closeMenu });

  // Functions
  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function handleMarkAsRead() {
    markAsRead.mutate(notification.id);
    closeMenu();
  }

  function handleDelete() {
    deleteNotification.mutate(notification.id);
    closeMenu();
  }

  return (
    <li
      className={cn(
        "flex flex-col gap-1.5 border-t border-soft p-4",
        notification.isRead ? "bg-soft" : "bg-plain dark:bg-muted",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-plain">{notification.title}</h3>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={toggleMenu}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label={t("optionsLabel")}
            className={cn(
              "rounded-md p-0.5 text-soft transition-colors hover:bg-muted",
              FOCUS_RING_CLASS_NAME,
            )}
          >
            <EllipsisVertical aria-hidden="true" className="size-4" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute end-0 top-full z-10 mt-1 flex w-51.25 flex-col rounded-xl bg-plain p-3 shadow-soft"
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

      <p className="line-clamp-3 text-sm text-soft">{notification.message}</p>
    </li>
  );
}
