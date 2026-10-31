import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotificationsEmptyState() {
  // Translation
  const t = useTranslations("Notifications");

  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2.5 border-t border-soft text-soft">
      <BellOff aria-hidden="true" strokeWidth={1.5} className="size-12" />
      <p className="text-sm font-medium">{t("empty")}</p>
    </div>
  );
}
