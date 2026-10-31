import { useTranslations } from "next-intl";

import { MAIN_NAV_LINKS } from "@/lib/constants/navigation";

import { MainNavLink } from "./main-nav-link";

export function MainNav() {
  // Translation
  const t = useTranslations("Header");
  const tNav = useTranslations("Navigation");

  return (
    <nav
      aria-label={t("mainNavigation")}
      className="bg-primary-saturated px-4"
    >
      <ul className="flex justify-center gap-4">
        {MAIN_NAV_LINKS.map(({ href, labelKey, icon: Icon }) => (
          <li key={href}>
            <MainNavLink href={href}>
              {Icon && <Icon aria-hidden="true" className="size-5" />}
              {tNav(labelKey)}
            </MainNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
