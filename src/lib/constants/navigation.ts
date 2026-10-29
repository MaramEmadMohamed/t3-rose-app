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
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "products", href: "/products" },
  { labelKey: "categories", href: "/categories" },
  { labelKey: "occasions", href: "/occasions" },
  { labelKey: "contact", href: "/contact" },
  { labelKey: "about", href: "/about" },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  ...MAIN_NAV_LINKS,
  { labelKey: "termsAndConditions", href: "/terms-and-conditions" },
  { labelKey: "privacyPolicy", href: "/privacy-policy" },
  { labelKey: "faqs", href: "/faqs" },
];
