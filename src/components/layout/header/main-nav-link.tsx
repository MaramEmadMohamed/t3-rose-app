"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";
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
        "flex h-11 items-center gap-2 border-b-2 p-3 font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2",
        isActive
          ? "border-soft-pink-200 text-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800"
          : "border-transparent text-zinc-50 hover:text-soft-pink-200 dark:text-zinc-800 dark:hover:text-maroon-800",
      )}
    >
      {children}
    </Link>
  );
}
