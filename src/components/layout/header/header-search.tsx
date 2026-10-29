import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function HeaderSearch() {
  // Translation
  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <form
      role="search"
      action={`/${locale}/products`}
      className="flex h-13 min-w-0 flex-1 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 focus-within:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-700"
    >
      <Search aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
      <label htmlFor="header-search" className="sr-only">
        {t("searchLabel")}
      </label>
      <input
        id="header-search"
        name="search"
        type="search"
        placeholder={t("searchPlaceholder")}
        className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-50"
      />
    </form>
  );
}
