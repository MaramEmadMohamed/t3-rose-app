import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { HeaderSearch } from "./header-search";
import { LanguageSwitcher } from "./language-switcher";
import { LoginMenu } from "./login-menu";
import { MainNav } from "./main-nav";
import { UserActions } from "./user-actions";

export function Header() {
  // Translation
  const t = useTranslations("Header");

  return (
    <header>
      <div className="flex h-22 items-center gap-4 bg-white px-9 py-4.5 dark:bg-zinc-800">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={85}
            height={80}
            preload
          />
        </Link>

        <HeaderSearch />

        <div className="flex h-full items-center text-zinc-700 dark:text-zinc-50">
          <LoginMenu />
          <UserActions />
          <LanguageSwitcher />
        </div>
      </div>

      <MainNav />
    </header>
  );
}
