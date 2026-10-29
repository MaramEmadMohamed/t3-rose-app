"use client";

import { BellRing } from "lucide-react";
import { useTranslations } from "next-intl";

import { usePushNotifications } from "@/hooks/use-push-notifications";
import { cn } from "@/lib/utils";

const BUTTON_CLASS_NAME =
  "shrink-0 rounded-xl px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";

// No Figma frame exists for this block, so it reuses the panel's styles.
export function PushOptIn() {
  // Translation
  const t = useTranslations("Push");

  // Custom hooks
  const { status, enable, disable, isUpdating } = usePushNotifications();

  if (status === "hidden" || status === "loading") return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-800">
      <div className="flex items-start gap-2">
        <BellRing aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-maroon-700 dark:text-soft-pink-300" />
        <div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-50">
            {t("title")}
          </p>
          <p role="status" className="text-xs text-zinc-500 dark:text-zinc-400">
            {t(`status.${status}`)}
          </p>
        </div>
      </div>

      {status === "disabled" && (
        <button
          type="button"
          onClick={enable}
          disabled={isUpdating}
          className={cn(BUTTON_CLASS_NAME, "bg-maroon-600 text-white dark:bg-soft-pink-300 dark:text-zinc-900")}
        >
          {t("enable")}
        </button>
      )}

      {status === "enabled" && (
        <button
          type="button"
          onClick={disable}
          disabled={isUpdating}
          className={cn(BUTTON_CLASS_NAME, "border border-zinc-300 text-zinc-800 dark:border-zinc-600 dark:text-zinc-50")}
        >
          {t("disable")}
        </button>
      )}
    </div>
  );
}
