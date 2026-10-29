"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  // Translation
  const t = useTranslations("Header");
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Variables
  const nextLocale = locale === "en" ? "ar" : "en";

  // Functions
  function handleSwitchLanguage() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex h-full items-center border-s border-zinc-200 ps-4 dark:border-zinc-700">
      <button
        type="button"
        lang={nextLocale}
        onClick={handleSwitchLanguage}
        className={cn(
          "rounded-md px-1 transition-colors hover:text-maroon-700 focus-visible:outline-2 focus-visible:outline-maroon-700 dark:hover:text-soft-pink-300",
          nextLocale === "ar"
            ? "font-(family-name:--font-tajawal)"
            : "font-(family-name:--font-sarabun)",
        )}
      >
        {t("switchLanguage")}
      </button>
    </div>
  );
}
