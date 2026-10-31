import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

// UI only for now: the ticket says the header is static, so searching
// will be wired up with the products page.
export function HeaderSearch() {
  // Translation
  const t = useTranslations("Header");

  return (
    <search className="flex h-13 min-w-0 flex-1 items-center gap-2 rounded-xl border border-soft bg-plain px-4 focus-within:border-default focus-within:ring-3 focus-within:ring-focus">
      <Search aria-hidden="true" className="size-5 shrink-0 text-muted" />
      <label htmlFor="header-search" className="sr-only">
        {t("searchLabel")}
      </label>
      <input
        id="header-search"
        type="search"
        placeholder={t("searchPlaceholder")}
        className="min-w-0 flex-1 bg-transparent text-sm text-plain outline-none placeholder:text-muted"
      />
    </search>
  );
}
