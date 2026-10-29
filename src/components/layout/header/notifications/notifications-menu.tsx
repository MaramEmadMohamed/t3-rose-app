"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useId, useRef, useState } from "react";

import { useDismiss } from "@/hooks/use-dismiss";
import { useUnreadNotificationsCount } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";

import { NotificationsPanel } from "./notifications-panel";

const MAX_BADGE_COUNT = 99;

export function NotificationsMenu({ triggerClassName }: { triggerClassName: string }) {
  // Translation
  const t = useTranslations("Notifications");

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Query
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();

  // Variables
  const panelId = useId();
  const hasUnread = unreadCount > 0;
  const badgeText =
    unreadCount > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : String(unreadCount);

  // Functions
  const closePanel = useCallback(() => setIsOpen(false), []);

  function togglePanel() {
    setIsOpen((isPanelOpen) => !isPanelOpen);
  }

  // Custom hooks
  useDismiss({ ref: menuRef, isOpen, onDismiss: closePanel });

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={
          hasUnread
            ? t("bellLabelWithCount", { count: unreadCount })
            : t("bellLabel")
        }
        className={cn(triggerClassName, "relative")}
      >
        <Bell aria-hidden="true" className="size-5" />
        {hasUnread && (
          <span
            aria-hidden="true"
            className="absolute -end-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white"
          >
            {badgeText}
          </span>
        )}
      </button>

      {isOpen && (
        <div id={panelId} className="absolute end-0 top-full z-50 mt-3">
          <NotificationsPanel unreadCount={unreadCount} />
        </div>
      )}
    </div>
  );
}
