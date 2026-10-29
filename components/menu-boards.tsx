"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { MenuRow, MenuRowPlaceholder } from "@/components/menu-row";
import { Button } from "@/components/ui/button";
import { addOns, type MenuCategory } from "@/lib/menu";
import { site } from "@/lib/site";
import { useMenu } from "@/lib/use-menu";

// The POS app has no add-ons yet, so this board stays static.
const addOnsBoard: MenuCategory = { id: "tambahan", name: "Tambahan", items: addOns };

/** Andalan plus the four categories, so the page barely jumps when the menu arrives. */
const PLACEHOLDER_BOARDS = 5;

const boardHeading =
  "border-b-2 border-ink pb-3 font-display text-[clamp(32px,3.6vw,44px)] leading-none font-semibold text-ink";

const instagramLink =
  "font-bold text-terracotta-deep underline underline-offset-4 hover:text-terracotta-press";

function Board({ board }: { board: MenuCategory }) {
  return (
    <section
      id={board.id}
      aria-labelledby={`${board.id}-judul`}
      className="reveal mb-16 scroll-mt-20 break-inside-avoid"
    >
      <h2 id={`${board.id}-judul`} className={boardHeading}>
        {board.name}
      </h2>
      <ul className="mt-2">
        {board.items.map((item, i) => (
          <MenuRow key={i} item={item} showStamp />
        ))}
      </ul>
    </section>
  );
}

function BoardPlaceholders() {
  return (
    <>
      <p className="sr-only">Memuat menu…</p>
      {Array.from({ length: PLACEHOLDER_BOARDS }, (_, i) => (
        <div key={i} aria-hidden="true" className="mb-16 break-inside-avoid">
          <div className="border-b-2 border-ink pb-3">
            <div className="h-[clamp(32px,3.6vw,44px)] w-[min(60%,240px)] rounded-sm bg-surface-alt motion-safe:animate-pulse" />
          </div>
          <ul className="mt-2">
            <MenuRowPlaceholder />
            <MenuRowPlaceholder />
            <MenuRowPlaceholder />
          </ul>
        </div>
      ))}
    </>
  );
}

/** Takes a board's place when there is no menu to show. */
function MenuNotice({ alert, children }: { alert?: boolean; children: ReactNode }) {
  return (
    <div
      role={alert ? "alert" : undefined}
      className="mb-16 break-inside-avoid border-t-2 border-ink pt-6"
    >
      {children}
    </div>
  );
}

/**
 * The sticky tabs and the menu boards: Andalan, the POS app's categories, then
 * the static add-ons. The menu is fetched in the browser on every visit.
 */
export function MenuBoards() {
  const menu = useMenu();
  const containerRef = useRef<HTMLDivElement>(null);
  const categories = menu.status === "ready" ? menu.categories : null;

  const boards = useMemo(() => {
    if (!categories) return [addOnsBoard];
    const featured = categories.flatMap((category) =>
      category.items.filter((item) => item.featured),
    );
    return [
      ...(featured.length > 0 ? [{ id: "andalan", name: "Andalan", items: featured }] : []),
      ...categories,
      addOnsBoard,
    ];
  }, [categories]);

  // CategoryTabs observes the sections again whenever this array changes identity.
  const tabs = useMemo(
    () => [
      ...boards.map(({ id, name }) => ({ id, name })),
      { id: "bingung-pilih", name: "Bingung pilih?" },
    ],
    [boards],
  );

  // QR codes at the kiosk link to /menu#kopi and the like. The boards only
  // exist once the menu has loaded, so the browser can't jump there by itself.
  const jumpedRef = useRef(false);
  useEffect(() => {
    if (menu.status !== "ready" || jumpedRef.current) return;
    jumpedRef.current = true;
    const id = window.location.hash.slice(1);
    if (!tabs.some((tab) => tab.id === id)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [menu.status, tabs]);

  function handleRetry() {
    menu.retry();
    // The button disappears while loading, so keep focus in the menu instead
    // of dropping it to <body>.
    containerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <CategoryTabs tabs={tabs} />

      {/* Columns, not a grid, so short boards don't leave gaps beside long ones. */}
      <div
        ref={containerRef}
        tabIndex={-1}
        aria-busy={menu.status === "loading"}
        className="page-container gap-x-[clamp(48px,7vw,112px)] pt-[clamp(48px,7vw,88px)] pb-[clamp(0px,2vw,24px)] focus-visible:shadow-none lg:columns-2"
      >
        {menu.status === "loading" && <BoardPlaceholders />}

        {menu.status === "error" && (
          <MenuNotice alert>
            <p className="max-w-[36ch] text-lg leading-snug font-bold text-ink">
              Menu belum bisa dimuat. Coba lagi, tanya barista, atau cek Instagram kami.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button onClick={handleRetry}>Coba lagi</Button>
              <a href={site.instagramUrl} className={instagramLink}>
                {site.instagramHandle}
              </a>
            </div>
          </MenuNotice>
        )}

        {menu.status === "ready" && menu.categories.length === 0 && (
          <MenuNotice>
            <p className="max-w-[36ch] text-lg leading-snug font-bold text-ink">
              Menu lagi disiapkan. Info terbaru ada di Instagram kami.
            </p>
            <p className="mt-4">
              <a href={site.instagramUrl} className={instagramLink}>
                {site.instagramHandle}
              </a>
            </p>
          </MenuNotice>
        )}

        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </div>
    </>
  );
}
