import Image from "next/image";
import Link from "next/link";
import { MenuRow } from "@/components/menu-row";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { KeywordTicker } from "@/components/ui/keyword-ticker";
import { Eyebrow, SectionHeader } from "@/components/ui/section-header";
import { StatementBand } from "@/components/ui/statement-band";
import { cn } from "@/lib/cn";
import { faqs } from "@/lib/faq";
import { featuredItems } from "@/lib/menu";
import { site } from "@/lib/site";
import logoMark from "@/public/brand/logo-mark.png";

const rise = "motion-safe:animate-hero-rise";

const textLink =
  "link-underline inline-flex min-h-11 items-center text-base font-extrabold text-terracotta-deep";

const dictionary = [
  {
    word: "po·jok",
    definition:
      "sudut yang hangat dan agak tersembunyi, tempat kabur sebentar dari hiruk-pikuk.",
  },
  {
    word: "ca·py",
    definition:
      "kependekan dari capybara, hewan yang terkenal santai dan akrab sama siapa aja.",
  },
];

// Why Pojok Capy is worth a visit: a bold hook, then one supporting line.
// House rules (laptop, colokan) live in the FAQ instead.
const houseNotes = [
  {
    title: "Tinggal nyebrang dari Unpar.",
    body: "Gerbang belakang kampus persis di seberang, jadi kabur sebentar di sela kelas pun keburu.",
  },
  {
    title: "Ada pojok paling tenang.",
    body: "Sudut belakang kami sisakan buat baca, me-time, atau sekadar diem sebentar.",
  },
  {
    title: "Ngobrol jadi gampang.",
    body: "Musiknya sengaja pelan, mejanya berdekatan. Datang sendirian pun nggak bakal canggung, barista kami senang diajak ngobrol.",
  },
];

const publishedFaqs = faqs.filter((faq) => faq.published);

export default function Home() {
  return (
    <>
      <SiteHeader page="home" />

      <main>
        <section
          id="top"
          className="page-container flex flex-wrap items-center gap-[clamp(40px,6vw,80px)] pt-[clamp(24px,5vw,64px)] pb-[clamp(56px,8vw,104px)]"
        >
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[22px]">
            <Eyebrow className={cn(rise, "[animation-delay:50ms]")}>
              Kedai · Jl. Bukit Jarian No.30, Bandung
            </Eyebrow>
            <h1
              className={cn(
                rise,
                "font-display text-[clamp(60px,8.5vw,116px)] leading-none font-semibold text-terracotta [animation-delay:180ms]",
              )}
            >
              {site.name}
            </h1>
            <p
              className={cn(
                rise,
                "max-w-[24ch] text-[clamp(24px,2.5vw,32px)] leading-[1.3] font-bold text-ink [animation-delay:320ms]",
              )}
            >
              Teras komunal untuk melipir, rehat, dan ngobrol tanpa beban.
            </p>
            <div
              className={cn(
                rise,
                "flex items-center gap-2.5 text-base font-bold text-ink-muted [animation-delay:320ms]",
              )}
            >
              <Icon name="clock" size={20} />
              <span>Buka {site.hours} · Belakang Unpar</span>
            </div>
            <div
              className={cn(
                rise,
                "flex flex-wrap gap-3 pt-1.5 [animation-delay:460ms]",
              )}
            >
              <Button href="/menu">Lihat menu</Button>
              <Button variant="ghost" href="#kunjungi">
                Petunjuk arah
              </Button>
            </div>
          </div>
          <div className="flex flex-[1_1_340px] flex-col items-center gap-4">
            <div
              role="img"
              aria-label="Tempat foto kios; sementara berisi logo Pojok Capy"
              className={cn(
                rise,
                "flex aspect-square w-[min(440px,80vw)] items-center justify-center rounded-full bg-surface-alt [animation-delay:180ms]",
              )}
            >
              <Image
                src={logoMark}
                alt=""
                className="h-auto w-[70%] motion-safe:animate-float"
                preload
              />
            </div>
          </div>
        </section>

        <KeywordTicker />

        <section id="tentang" className="bg-surface-alt py-section">
          <div className="reveal page-container">
            <SectionHeader title="Dari mana namanya" />
            <dl className="mt-10 grid border-y border-line-strong sm:grid-cols-2">
              {dictionary.map((entry, i) => (
                <div
                  key={entry.word}
                  className={cn(
                    "py-8",
                    i === 0
                      ? "sm:pr-10"
                      : "border-t border-line-strong sm:border-t-0 sm:border-l sm:pl-10",
                  )}
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="font-display text-[clamp(44px,5.5vw,72px)] leading-none font-semibold text-terracotta">
                      {entry.word}
                    </span>
                    <span className="text-lg text-ink-muted italic">(n.)</span>
                  </dt>
                  <dd className="mt-4 max-w-[34ch] text-[clamp(18px,1.6vw,21px)] leading-[1.55] text-ink">
                    {entry.definition}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src={logoMark}
                alt="Logo Pojok Capy: kapibara tidur di dalam lingkaran"
                className="size-12 flex-none"
              />
              <p className="max-w-[60ch] text-[17px] leading-[1.6] text-ink-muted">
                Di logo kami, si Capy lagi tidur di dalam lingkaran. Itu bayangan
                kami soal kamu yang lagi mampir.
              </p>
            </div>
          </div>
        </section>

        <section className="py-section">
          <div className="reveal page-container grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:grid-rows-[auto_1fr]">
            <SectionHeader
              title="Coba ini dulu"
              className="lg:col-start-1 lg:row-start-1"
            />
            <ul className="border-t-2 border-ink pt-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              {featuredItems.map((item) => (
                <MenuRow key={item.name} item={item} />
              ))}
            </ul>
            <Link
              href="/menu"
              className={cn(
                textLink,
                "justify-self-start lg:col-start-1 lg:row-start-2 lg:self-start",
              )}
            >
              Lihat semua menu →
            </Link>
          </div>
        </section>

        <section className="bg-surface-alt py-[clamp(80px,10vw,136px)]">
          <div className="page-container">
            <div className="reveal relative mx-auto max-w-[600px] border border-line-strong bg-surface-raised px-[clamp(24px,4vw,48px)] pt-12 pb-10 motion-safe:sm:-rotate-1 lg:mr-auto lg:ml-[14%]">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-3 bg-terracotta-soft"
              />
              <h2 className="font-hand text-[clamp(28px,3.4vw,36px)] leading-tight font-bold text-ink">
                Alasan kecil buat mampir
              </h2>
              <ol className="mt-6 flex flex-col gap-4">
                {houseNotes.map((note, i) => (
                  <li
                    key={note.title}
                    className="grid grid-cols-[1.75rem_1fr] text-[17px] leading-[1.55] text-ink"
                  >
                    <span className="font-extrabold text-terracotta-deep tabular-nums">
                      {i + 1}.
                    </span>
                    <span>
                      <strong className="font-extrabold">{note.title}</strong>{" "}
                      {note.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <StatementBand title="Hangatnya angkringan, nyamannya tempat nongkrong modern." />

        {publishedFaqs.length > 0 && (
          <section id="faq" className="py-section">
            <div className="reveal page-container">
              <SectionHeader title="Yang sering ditanya" />
              <div className="mt-8 max-w-[760px] border-t border-line-strong">
                {publishedFaqs.map((faq) => (
                  <details key={faq.question} className="group border-b border-line-strong">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-extrabold text-ink [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className="font-display text-[28px] leading-none text-terracotta-deep transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[60ch] pb-6 text-[17px] leading-[1.65] text-ink-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="kunjungi" className="bg-ink py-section text-on-ink">
          <div className="reveal page-container">
            <h2 className="font-display text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-semibold text-surface-raised">
              Mampir ke sini
            </h2>
            <div className="mt-10 grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-rows-[auto_auto_1fr]">
              <h3 className="font-display text-[28px] leading-tight font-semibold text-peach lg:col-start-1 lg:row-start-1">
                Tempat Kita Disini
              </h3>
              <iframe
                src={site.mapsEmbedUrl}
                title={`Peta lokasi ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[320px] w-full rounded-sm bg-ink-muted sm:h-[420px] lg:col-start-2 lg:row-span-3 lg:row-start-1"
              />
              <Button
                variant="light"
                icon="map-pin"
                href={site.mapsUrl}
                className="justify-self-start lg:col-start-1 lg:row-start-2"
              >
                Buka di Google Maps
              </Button>
              <p className="max-w-[44ch] self-start border-t border-ink-muted pt-6 text-base leading-[1.6] lg:col-start-1 lg:row-start-3">
                Kabar menu baru dan jam buka kami umumkan di Instagram{" "}
                <a
                  href={site.instagramUrl}
                  className="font-bold text-peach underline underline-offset-4 hover:text-surface-raised"
                >
                  {site.instagramHandle}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter page="home" />
    </>
  );
}
