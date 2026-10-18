import type { Metadata } from "next";
import { Fredoka, Kalam, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pojok Capy — Teras komunal di Bukit Jarian",
    template: "%s — Pojok Capy",
  },
  description:
    "Teras komunal di belakang Unpar, Bandung, untuk melipir, rehat, dan ngobrol tanpa beban.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${fredoka.variable} ${nunitoSans.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
