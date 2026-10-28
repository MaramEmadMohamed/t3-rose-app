export type NavLink = {
  label: string;
  href: string;
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Occasions", href: "/occasions" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  ...MAIN_NAV_LINKS,
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "FAQs", href: "/faqs" },
];
