import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

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
      <div className="flex h-22 items-center gap-4 bg-plain px-9 py-4.5 dark:bg-subtle">
        <Link href="/" className={cn("shrink-0 rounded-md", FOCUS_RING_CLASS_NAME)}>
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={85}
            height={80}
            preload
          />
        </Link>

        <HeaderSearch />

        <div className="flex h-full items-center text-plain">
          <LoginMenu />
          <UserActions />
          <LanguageSwitcher />
        </div>
      </div>

      <MainNav />
    </header>
  );
}
