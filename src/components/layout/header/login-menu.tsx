import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { HEADER_CONTROL_CLASS_NAME } from "./header-styles";
import { LoginPopover } from "./login-popover";

// The popover opens on hover and on keyboard focus, using CSS only.
export function LoginMenu() {
  // Translation
  const t = useTranslations("Header");

  return (
    <div className="group relative flex h-full items-center px-4">
      <Link
        href="/login"
        className={cn("flex items-center gap-1.5 px-1", HEADER_CONTROL_CLASS_NAME)}
      >
        <User aria-hidden="true" className="size-5" />
        {t("login")}
      </Link>

      <div className="invisible absolute end-0 top-full z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <LoginPopover />
      </div>
    </div>
  );
}
