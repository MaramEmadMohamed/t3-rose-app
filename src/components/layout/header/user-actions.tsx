import { Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { HEADER_CONTROL_CLASS_NAME, HEADER_DIVIDER_CLASS_NAME } from "./header-styles";
import { NotificationsMenu } from "./notifications/notifications-menu";

const ICON_CONTROL_CLASS_NAME = cn("p-1", HEADER_CONTROL_CLASS_NAME);

export function UserActions() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div className={cn("flex h-full items-center gap-2.5 px-4", HEADER_DIVIDER_CLASS_NAME)}>
      <Link href="/wishlist" aria-label={t("wishlist")} className={ICON_CONTROL_CLASS_NAME}>
        <Heart aria-hidden="true" className="size-5" />
      </Link>
      <Link href="/cart" aria-label={t("cart")} className={ICON_CONTROL_CLASS_NAME}>
        <ShoppingCart aria-hidden="true" className="size-5" />
      </Link>
      <NotificationsMenu triggerClassName={ICON_CONTROL_CLASS_NAME} />
    </div>
  );
}
