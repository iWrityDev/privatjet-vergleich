import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://privatjet-vergleich.de"),
  title: {
    default: "Privatjet Vergleich – Charter, Kosten & Anbieter für DACH 2026",
    template: "%s | Privatjet Vergleich",
  },
  description:
    "Unabhängiger Ratgeber für Privatjet-Charter in Deutschland, Österreich und der Schweiz. Anbieter, Kosten, Routen und Jet Cards vergleichen. 500+ Seiten Expertenwissen.",
  keywords: [
    "Privatjet mieten",
    "Privatjet Charter Deutschland",
    "Privatjet Kosten",
    "Jet Card Vergleich",
    "Privatjet DACH",
    "Privatflug buchen",
    "Privatjet Anbieter",
    "Villiers Jets",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Privatjet Vergleich",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Privatjet Vergleich – Der unabhängige DACH-Ratgeber" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Privatjet Vergleich",
          "url": "https://privatjet-vergleich.de",
          "description": "Unabhängiger Ratgeber für Privatjet-Charter im DACH-Raum.",
          "inLanguage": "de-DE",
        }) }} />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight" style={{ color: "#0d1b2a" }}>
          <span style={{ color: "#c9a84c", fontSize: "1.4rem" }}>✈</span>
          <span>Privatjet<span style={{ color: "#c9a84c" }}>Vergleich</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link href="/staedte" className="hover:text-amber-700 transition-colors">Städte</Link>
          <Link href="/routen" className="hover:text-amber-700 transition-colors">Routen</Link>
          <Link href="/anbieter" className="hover:text-amber-700 transition-colors">Anbieter</Link>
          <Link href="/reiseziele" className="hover:text-amber-700 transition-colors">Reiseziele</Link>
          <Link href="/flugzeuge" className="hover:text-amber-700 transition-colors">Flugzeuge</Link>
          <Link href="/jet-cards" className="hover:text-amber-700 transition-colors">Jet Cards</Link>
          <Link href="/ratgeber" className="hover:text-amber-700 transition-colors">Ratgeber</Link>
        </nav>
        <Link
          href="/anbieter/villiers-jets"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)" }}
        >
          Jetzt Charter-Angebot
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16" style={{ background: "#0d1b2a", color: "#cbd5e1" }}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5 mb-10">
          <div className="md:col-span-2">
            <div className="font-bold text-xl text-white mb-3">
              <span style={{ color: "#c9a84c" }}>✈</span> Privatjet<span style={{ color: "#c9a84c" }}>Vergleich</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Unabhängiger Ratgeber für Privatjet-Charter in Deutschland,
              Österreich und der Schweiz. Wir vergleichen Anbieter, Routen und
              Jet-Card-Programme ohne Interessenkonflikt.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Diese Website enthält Affiliate-Links. Wir erhalten eine Provision,
              wenn Sie über unsere Links buchen – ohne Mehrkosten für Sie.
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Charter</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/staedte" className="hover:text-amber-400 transition-colors">Nach Stadt</Link></li>
              <li><Link href="/routen" className="hover:text-amber-400 transition-colors">Nach Route</Link></li>
              <li><Link href="/reiseziele" className="hover:text-amber-400 transition-colors">Reiseziele</Link></li>
              <li><Link href="/flugzeuge" className="hover:text-amber-400 transition-colors">Flugzeugtypen</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Anbieter</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/anbieter" className="hover:text-amber-400 transition-colors">Alle Anbieter</Link></li>
              <li><Link href="/anbieter/villiers-jets" className="hover:text-amber-400 transition-colors">Villiers Jets</Link></li>
              <li><Link href="/anbieter/vistajet" className="hover:text-amber-400 transition-colors">VistaJet</Link></li>
              <li><Link href="/jet-cards" className="hover:text-amber-400 transition-colors">Jet Cards</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3 text-sm">Info</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ratgeber" className="hover:text-amber-400 transition-colors">Ratgeber</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-amber-400 transition-colors">Über uns</Link></li>
              <li><Link href="/affiliate-hinweis" className="hover:text-amber-400 transition-colors">Affiliate-Hinweis</Link></li>
              <li><Link href="/datenschutz" className="hover:text-amber-400 transition-colors">Datenschutz</Link></li>
              <li><Link href="/impressum" className="hover:text-amber-400 transition-colors">Impressum</Link></li>
              <li><Link href="/kontakt" className="hover:text-amber-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} PrivatjetVergleich.de. Alle Rechte vorbehalten.</div>
          <div>Unabhängiger Ratgeber — kein Flugbetrieb, kein Charter-Unternehmen.</div>
        </div>
      </div>
    </footer>
  );
}
