import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotificationsEmptyState() {
  // Translation
  const t = useTranslations("Notifications");

  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2.5 border-t border-zinc-300 dark:border-zinc-600">
      <BellOff aria-hidden="true" strokeWidth={1.5} className="size-12 text-zinc-500" />
      <p className="text-sm font-medium text-zinc-500">{t("empty")}</p>
    </div>
  );
}
