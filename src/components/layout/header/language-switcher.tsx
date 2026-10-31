"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { HEADER_CONTROL_CLASS_NAME, HEADER_DIVIDER_CLASS_NAME } from "./header-styles";

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
    <div className={cn("flex h-full items-center ps-4", HEADER_DIVIDER_CLASS_NAME)}>
      <button
        type="button"
        lang={nextLocale}
        onClick={handleSwitchLanguage}
        className={cn(
          "px-1",
          HEADER_CONTROL_CLASS_NAME,
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
