import {
  ClipboardList,
  Gift,
  Headset,
  House,
  Info,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

export type NavLinkKey =
  | "home"
  | "products"
  | "categories"
  | "occasions"
  | "contact"
  | "about"
  | "termsAndConditions"
  | "privacyPolicy"
  | "faqs";

export type NavLink = {
  labelKey: NavLinkKey;
  href: string;
  icon?: LucideIcon;
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { labelKey: "home", href: "/", icon: House },
  { labelKey: "products", href: "/products", icon: Gift },
  { labelKey: "categories", href: "/categories", icon: ClipboardList },
  { labelKey: "occasions", href: "/occasions", icon: PartyPopper },
  { labelKey: "contact", href: "/contact", icon: Headset },
  { labelKey: "about", href: "/about", icon: Info },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  ...MAIN_NAV_LINKS,
  { labelKey: "termsAndConditions", href: "/terms-and-conditions" },
  { labelKey: "privacyPolicy", href: "/privacy-policy" },
  { labelKey: "faqs", href: "/faqs" },
];
