"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

const HOME_PATH = "/";

type MainNavLinkProps = {
  href: string;
  children: ReactNode;
};

export function MainNavLink({ href, children }: MainNavLinkProps) {
  // Navigation
  const pathname = usePathname();

  // Variables
  const isActive =
    href === HOME_PATH ? pathname === HOME_PATH : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-11 items-center gap-2 border-b-2 p-3 font-medium transition-colors",
        FOCUS_RING_CLASS_NAME,
        // Figma flips the active colours against the bar, and the design
        // system has no token for that pair, so the palette is used here.
        isActive
          ? "border-soft-pink-200 text-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800"
          : "border-transparent text-inverse hover:text-soft-pink-200 dark:hover:text-maroon-800",
      )}
    >
      {children}
    </Link>
  );
}
