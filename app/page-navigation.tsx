"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [["/about", "About"], ["/projects", "Projects"], ["/experience", "Experience"], ["/writing", "Writing"], ["/#contact", "Contact"]];

export function PageNavigation() {
  const pathname = usePathname();
  return <nav aria-label="Portfolio pages">{pages.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>;
}
