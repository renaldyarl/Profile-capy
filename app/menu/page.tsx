import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { MenuRow } from "@/components/menu-row";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeader } from "@/components/ui/section-header";
import { addOns, menuCategories, menuPublished, recommendations } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
};

const boards = [...menuCategories, { id: "tambahan", name: "Tambahan", items: addOns }];

const tabs = [
  ...boards.map(({ id, name }) => ({ id, name })),
  { id: "bingung-pilih", name: "Bingung pilih?" },
];

// Letters bob one after another, like a capybara floating in warm water. Each
// word stays one unbreakable box, so a narrow screen wraps between the words,
// never inside one.
let letterCount = 0;
const headlineWords = "Coming soon".split(" ").map((word) =>
  [...word].map((char) => ({ char, delay: letterCount++ * 90 })),
);

/** Stands in for the menu until `menuPublished` is turned on. */
function ComingSoon() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        id="top"
        className="page-container flex w-full flex-1 flex-col items-center justify-center py-[clamp(56px,8vw,120px)] text-center"
      >
        <h1 className="font-display text-[clamp(64px,11vw,150px)] leading-[0.92] font-semibold tracking-[-0.01em] text-terracotta">
          <span className="sr-only">Coming soon</span>
          <span aria-hidden="true">
            {headlineWords.map((letters, w) => (
              <Fragment key={w}>
                {w > 0 && " "}
                <span className="inline-block whitespace-nowrap">
                  {letters.map(({ char, delay }, i) => (
                    <span
                      key={i}
                      className="inline-block motion-safe:animate-bob"
                      style={{ animationDelay: `${delay}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </span>
        </h1>
        <p className="mt-8 max-w-[44ch] text-lg leading-[1.6] text-ink-muted">
          Info selengkapnya follow{" "}
          <a
            href={site.instagramUrl}
            className="font-bold text-terracotta-deep underline underline-offset-4 hover:text-terracotta-press"
          >
            {site.instagramHandle}
          </a>{" "}
          di Instagram
        </p>
      </section>
    </main>
  );
}

export default function MenuPage() {
  if (!menuPublished) {
    return (
      <>
        {/* Header and note fill the first screen, so the footer starts below the fold. */}
        <div className="flex min-h-svh flex-col">
          <SiteHeader page="menu" />
          <ComingSoon />
        </div>
        <SiteFooter page="menu" />
      </>
    );
  }

  return (
    <>
      <SiteHeader page="menu" />

      <main>
        <section
          id="top"
          className="page-container pt-[clamp(24px,5vw,56px)] pb-10 motion-safe:animate-rise"
        >
          <h1 className="font-display text-[clamp(72px,14vw,176px)] leading-[0.88] font-semibold tracking-[-0.01em] text-terracotta">
            Menu
          </h1>
          <p className="mt-6 max-w-[34ch] text-[clamp(20px,2.2vw,26px)] leading-[1.35] font-bold text-ink">
            Pesan di bar ya. Bingung? Tanya barista, atau lihat bagian paling bawah.
          </p>
          <p className="mt-4 text-[15px] text-ink-muted">
            Buka {site.hours}. Bayar {site.payment}.
          </p>
        </section>

        <CategoryTabs tabs={tabs} />

        {/* Columns, not a grid, so short boards don't leave gaps beside long ones. */}
        <div className="page-container gap-x-[clamp(48px,7vw,112px)] pt-[clamp(48px,7vw,88px)] pb-[clamp(0px,2vw,24px)] lg:columns-2">
          {boards.map((board) => (
            <section
              key={board.id}
              id={board.id}
              aria-labelledby={`${board.id}-judul`}
              className="reveal mb-16 scroll-mt-20 break-inside-avoid"
            >
              <h2
                id={`${board.id}-judul`}
                className="border-b-2 border-ink pb-3 font-display text-[clamp(32px,3.6vw,44px)] leading-none font-semibold text-ink"
              >
                {board.name}
              </h2>
              <ul className="mt-2">
                {board.items.map((item, i) => (
                  <MenuRow key={i} item={item} showStamp />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section
          id="bingung-pilih"
          className="scroll-mt-20 bg-surface-alt py-[clamp(56px,7vw,96px)]"
        >
          <div className="reveal page-container">
            <SectionHeader title="Bingung pilih?" />
            <ul className="mt-8 max-w-[720px] border-t border-line-strong">
              {recommendations.map((rec) => (
                <li
                  key={rec.mood}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line-strong py-4 text-lg"
                >
                  <span className="font-bold text-ink">{rec.mood}</span>
                  <span aria-hidden="true" className="text-terracotta-deep">
                    →
                  </span>
                  <span className="sr-only">, coba</span>
                  <span className="font-extrabold text-ink">{rec.menu}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-container py-[clamp(40px,6vw,64px)]">
          <p className="border-y border-dashed border-line-strong py-3 text-center text-sm text-ink-muted">
            Harga bisa berubah sewaktu-waktu. Menu musiman datang dan pergi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            <p className="text-[15px] text-ink-muted">
              {site.address} · Instagram{" "}
              <a
                href={site.instagramUrl}
                className="font-bold text-terracotta-deep underline underline-offset-4 hover:text-terracotta-press"
              >
                {site.instagramHandle}
              </a>
            </p>
            <Link
              href="/"
              className="link-underline inline-flex min-h-11 items-center text-base font-extrabold text-terracotta-deep"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter page="menu" />
    </>
  );
}
