import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import logoMark from "@/public/brand/logo-mark.png";
import { Button } from "./ui/button";

const navLinks = {
  home: [
    { href: "#tentang", label: "Tentang" },
    { href: "/menu", label: "Menu" },
    { href: "#kunjungi", label: "Kunjungi" },
  ],
  menu: [
    { href: "/", label: "Beranda" },
    { href: "#top", label: "Menu", current: true },
    { href: "/#kunjungi", label: "Kunjungi" },
  ],
};

export function SiteHeader({ page }: { page: "home" | "menu" }) {
  const isHome = page === "home";

  return (
    // Phones: logo and button on the first row, links on the second.
    // From md up: logo, links, button in one row.
    <header className="page-container flex w-full flex-wrap items-center gap-x-6 gap-y-1 py-4 sm:py-5">
      <Link
        href={isHome ? "#top" : "/"}
        className="mr-auto flex min-h-11 items-center gap-3"
      >
        <Image src={logoMark} alt="" className="size-10 object-contain" preload />
        <span className="font-display text-[22px] font-semibold text-terracotta">
          {site.name}
        </span>
      </Link>
      {isHome && (
        <Button size="sm" href="/menu" className="md:order-last">
          Lihat menu
        </Button>
      )}
      <nav
        aria-label="Navigasi utama"
        className="flex w-full flex-wrap items-center gap-x-6 md:w-auto"
      >
        {navLinks[page].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={"current" in link ? "page" : undefined}
            className="link-underline inline-flex min-h-11 items-center text-base font-bold text-ink-muted transition-colors hover:text-ink aria-[current]:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
