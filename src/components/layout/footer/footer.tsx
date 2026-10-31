import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOOTER_NAV_LINKS } from "@/lib/constants/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { NewsletterForm } from "./newsletter-form";

// The footer stays dark in both themes (Figma), so it uses fixed palette
// colours instead of the theme tokens, which flip between light and dark.
export function Footer() {
  // Translation
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  // Variables
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-zinc-800 py-10 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-7xl justify-between gap-4 px-4">
        <div className="flex w-62.5 shrink-0 flex-col items-center gap-1.5 text-center">
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={240}
            height={225}
          />
          <p className="text-lg font-semibold text-soft-pink-300">
            {t("brandName")}
          </p>
          <p className="text-sm text-zinc-100">
            {t("rightsReserved", { year: currentYear })}
          </p>
        </div>

        <nav
          aria-labelledby="footer-nav-title"
          className="flex flex-1 flex-col gap-1.5 ps-4"
        >
          <h2
            id="footer-nav-title"
            className="text-lg font-semibold text-soft-pink-300"
          >
            {t("discoverTitle")}
          </h2>
          <ul className="flex flex-col items-start gap-1.5">
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-sm font-medium text-zinc-100 transition-colors hover:text-soft-pink-300",
                    FOCUS_RING_CLASS_NAME,
                  )}
                >
                  {tNav(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <NewsletterForm />
      </div>
    </footer>
  );
}
