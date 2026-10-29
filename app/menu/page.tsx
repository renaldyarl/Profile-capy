import type { Metadata } from "next";
import Link from "next/link";
import { MenuBoards } from "@/components/menu-boards";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeader } from "@/components/ui/section-header";
import { recommendations } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
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

        {/* A fragment of the tabs and boards, so the tabs stay sticky across all of <main>. */}
        <MenuBoards />

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
