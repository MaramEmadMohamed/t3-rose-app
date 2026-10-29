import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

// UI only for now: the ticket says the header is static, so searching
// will be wired up with the products page.
export function HeaderSearch() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div
      role="search"
      className="flex h-13 min-w-0 flex-1 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 focus-within:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-700"
    >
      <Search aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
      <label htmlFor="header-search" className="sr-only">
        {t("searchLabel")}
      </label>
      <input
        id="header-search"
        type="search"
        placeholder={t("searchPlaceholder")}
        className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-50"
      />
    </div>
  );
}
