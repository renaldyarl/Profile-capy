"use client";

import { MenuRow, MenuRowPlaceholder } from "@/components/menu-row";
import { cn } from "@/lib/cn";
import { useMenu } from "@/lib/use-menu";

const MAX_ITEMS = 3;

/**
 * Up to three signature items for "Coba ini dulu" on Beranda. On an error, or
 * without any Andalan item, the list is left out.
 */
export function MenuTeaser({ className }: { className?: string }) {
  const menu = useMenu();
  const listClass = cn("border-t-2 border-ink pt-2", className);

  if (menu.status === "loading") {
    return (
      <ul aria-busy="true" className={listClass}>
        <li className="sr-only">Memuat menu…</li>
        <MenuRowPlaceholder />
        <MenuRowPlaceholder />
        <MenuRowPlaceholder />
      </ul>
    );
  }

  const featured =
    menu.status === "ready"
      ? menu.categories
          .flatMap((category) => category.items)
          .filter((item) => item.featured)
          .slice(0, MAX_ITEMS)
      : [];
  if (featured.length === 0) return null;

  return (
    <ul className={listClass}>
      {featured.map((item, i) => (
        <MenuRow key={i} item={item} />
      ))}
    </ul>
  );
}
