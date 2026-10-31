"use client";

import { BellRing } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  usePushNotifications,
  type PushOptInStatus,
} from "@/hooks/use-push-notifications";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

type VisibleStatus = Exclude<PushOptInStatus, "hidden" | "loading">;

const STATUS_MESSAGE_KEYS = {
  disabled: "statusDisabled",
  enabled: "statusEnabled",
  denied: "statusDenied",
  unsupported: "statusUnsupported",
} as const satisfies Record<VisibleStatus, string>;

const BUTTON_CLASS_NAME = cn(
  "shrink-0 rounded-xl px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
  FOCUS_RING_CLASS_NAME,
);

// No Figma frame exists for this block, so it reuses the panel's styles.
export function PushOptIn() {
  // Translation
  const t = useTranslations("Push");

  // Custom hooks
  const { status, enable, disable, isUpdating } = usePushNotifications();

  if (status === "hidden" || status === "loading") return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-soft bg-subtle p-4">
      <div className="flex items-start gap-2">
        <BellRing aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-saturated" />
        <div>
          <p className="text-sm font-semibold text-plain">{t("title")}</p>
          <p role="status" className="text-xs text-soft">
            {t(STATUS_MESSAGE_KEYS[status])}
          </p>
        </div>
      </div>

      {status === "disabled" && (
        <button
          type="button"
          onClick={enable}
          disabled={isUpdating}
          className={cn(BUTTON_CLASS_NAME, "bg-primary text-primary-foreground")}
        >
          {t("enable")}
        </button>
      )}

      {status === "enabled" && (
        <button
          type="button"
          onClick={disable}
          disabled={isUpdating}
          className={cn(BUTTON_CLASS_NAME, "border border-soft text-plain")}
        >
          {t("disable")}
        </button>
      )}
    </div>
  );
}
