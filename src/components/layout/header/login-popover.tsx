import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { LOGIN_INPUT_CLASS_NAME } from "./header-styles";
import { PasswordField } from "./password-field";

// UI only for now: the real login lives on the /login page.
export function LoginPopover() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div className="w-98.25 overflow-hidden rounded-lg bg-plain text-plain shadow-soft-lg">
      <div className="grid grid-cols-2 text-center">
        <span
          aria-current="page"
          className="bg-primary px-4 py-3.5 text-primary-foreground"
        >
          {t("login")}
        </span>
        <Link
          href="/register"
          className={cn(
            "bg-subtle px-4 py-3.5 transition-colors hover:bg-muted",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          {t("register")}
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-popover-email">{t("email")}</label>
          <input
            id="login-popover-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={LOGIN_INPUT_CLASS_NAME}
          />
        </div>

        <PasswordField id="login-popover-password" />

        <Link
          href="/forgot-password"
          className={cn(
            "self-end rounded-sm text-sm font-semibold text-primary-saturated hover:underline",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          {t("forgotPassword")}
        </Link>

        <button
          type="button"
          className={cn(
            "h-10.25 rounded-xl bg-primary px-4 text-primary-foreground transition-opacity hover:opacity-90",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          {t("login")}
        </button>
      </div>
    </div>
  );
}
