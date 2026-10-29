import { Bell, Heart, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const ICON_LINK_CLASS_NAME =
  "rounded-md p-1 transition-colors hover:text-maroon-700 focus-visible:outline-2 focus-visible:outline-maroon-700 dark:hover:text-soft-pink-300 dark:focus-visible:outline-soft-pink-300";

export function UserActions() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div className="flex h-full items-center gap-2.5 border-s border-zinc-200 px-4 dark:border-zinc-700">
      <Link href="/wishlist" aria-label={t("wishlist")} className={ICON_LINK_CLASS_NAME}>
        <Heart aria-hidden="true" className="size-5" />
      </Link>
      <Link href="/cart" aria-label={t("cart")} className={ICON_LINK_CLASS_NAME}>
        <ShoppingCart aria-hidden="true" className="size-5" />
      </Link>
      <button type="button" aria-label={t("notifications")} className={ICON_LINK_CLASS_NAME}>
        <Bell aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
