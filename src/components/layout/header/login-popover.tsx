import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LOGIN_INPUT_CLASS_NAME } from "./login-field-styles";
import { PasswordField } from "./password-field";

// UI only for now: the real login lives on the /login page.
export function LoginPopover() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div className="w-98.25 overflow-hidden rounded-lg bg-white text-zinc-800 shadow-soft-lg dark:bg-zinc-800 dark:text-zinc-50">
      <div className="grid grid-cols-2 text-center">
        <span
          aria-current="page"
          className="bg-maroon-600 px-4 py-3.5 text-white dark:bg-soft-pink-300 dark:text-zinc-900"
        >
          {t("login")}
        </span>
        <Link
          href="/register"
          className="bg-zinc-50 px-4 py-3.5 transition-colors hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
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
          className="self-end text-sm font-semibold text-maroon-700 hover:underline dark:text-soft-pink-300"
        >
          {t("forgotPassword")}
        </Link>

        <button
          type="button"
          className="h-10.25 rounded-xl bg-maroon-600 px-4 text-white transition-opacity hover:opacity-90 dark:bg-soft-pink-300 dark:text-zinc-900"
        >
          {t("login")}
        </button>
      </div>
    </div>
  );
}
