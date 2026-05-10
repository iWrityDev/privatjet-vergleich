import Link from "next/link";
import type { Metadata } from "next";
import { getPopularRoutes } from "@/data/routes";
import { getAffiliateOperators } from "@/data/operators";
import { getArticlesByCategory } from "@/data/articles";

export const metadata: Metadata = {
  title: "Privatjet Vergleich – Charter, Kosten & Anbieter für DACH 2026",
  description:
    "Privatjet mieten in Deutschland, Österreich und der Schweiz. Anbieter vergleichen, Kosten berechnen, Routen finden. 500+ Seiten Expertenwissen für den DACH-Raum.",
};

const stats = [
  { value: "60+", label: "DACH-Abflugstädte" },
  { value: "100+", label: "Direktrouten" },
  { value: "20+", label: "Anbieter im Vergleich" },
  { value: "€2.500", label: "ab pro Stunde" },
];

const whyReasons = [
  {
    icon: "🎯",
    title: "Unabhängige Beratung",
    text: "Keine versteckten Gebühren, keine exklusiven Partnerschaften. Wir vergleichen alle großen Anbieter neutral.",
  },
  {
    icon: "📊",
    title: "Echte Preisdaten",
    text: "Aktuelle Marktpreise für 100+ Routen im DACH-Raum. Kalkuliert nach Flugzeit, Muster und Saison.",
  },
  {
    icon: "✈️",
    title: "Alle Flugzeugtypen",
    text: "Von Turboprop bis Ultra-Long-Range. Wir erklären, welches Flugzeug für Ihre Route wirklich Sinn macht.",
  },
  {
    icon: "🏆",
    title: "500+ Seiten Wissen",
    text: "Ratgeber, Städteführer, Anbieterreviews und Jet Card Vergleiche – alles an einem Ort.",
  },
];

const popularCategories = [
  { href: "/staedte", icon: "🏙️", label: "Nach Stadt", desc: "60+ DACH-Abflugstädte" },
  { href: "/routen", icon: "🗺️", label: "Nach Route", desc: "100+ Streckenvergleiche" },
  { href: "/anbieter", icon: "🏢", label: "Anbieter", desc: "20+ Reviews" },
  { href: "/flugzeuge", icon: "✈️", label: "Flugzeugtypen", desc: "14 Kategorien" },
  { href: "/reiseziele", icon: "🌍", label: "Reiseziele", desc: "40+ Destinationen" },
  { href: "/jet-cards", icon: "💳", label: "Jet Cards", desc: "15 Programme verglichen" },
  { href: "/ratgeber", icon: "📖", label: "Ratgeber", desc: "80+ Expertenartikel" },
];

export default function HomePage() {
  const popularRoutes = getPopularRoutes().slice(0, 6);
  const affiliateOps = getAffiliateOperators().slice(0, 3);
  const costArticles = getArticlesByCategory("Kosten").slice(0, 3);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.privatjet-vergleich.de/#website",
        url: "https://www.privatjet-vergleich.de",
        name: "Privatjet Vergleich",
        description: "Unabhängiger Privatjet-Vergleich für den DACH-Raum. Anbieter, Kosten, Routen.",
        inLanguage: "de-DE",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.privatjet-vergleich.de/anbieter?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.privatjet-vergleich.de/#organization",
        name: "Privatjet Vergleich",
        url: "https://www.privatjet-vergleich.de",
        description: "Unabhängiges Vergleichsportal für Privatjet-Charter im DACH-Raum.",
        areaServed: ["Deutschland", "Österreich", "Schweiz"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* Hero */}
      <section
        className="relative py-24 md:py-32"
        style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1b2e45 60%, #0d1b2a 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            Der führende DACH-Ratgeber für Privatjet-Charter
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Privatjet mieten in{" "}
            <span style={{ color: "#c9a84c" }}>Deutschland, Österreich</span>
            <br className="hidden md:block" /> und der{" "}
            <span style={{ color: "#c9a84c" }}>Schweiz</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Vergleichen Sie Anbieter, berechnen Sie Kosten und finden Sie die beste Route für Ihren
            nächsten Privatflug. Unabhängig, transparent, datenbasiert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anbieter/villiers-jets"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Jetzt Angebot einholen
            </Link>
            <Link
              href="/routen"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(201,168,76,0.4)", color: "#e2c97a" }}
            >
              Routen entdecken →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#0a1520" }}>
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#c9a84c" }}>{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#0d1b2a" }}>
            Was suchen Sie?
          </h2>
          <p className="text-center text-slate-500 mb-10">Finden Sie die perfekte Information für Ihren Privatflug</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {popularCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all group text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-semibold text-sm group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                  {cat.label}
                </span>
                <span className="text-xs text-slate-400">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0d1b2a" }}>
                Beliebte Routen aus dem DACH-Raum
              </h2>
              <p className="text-slate-500 mt-1">Aktuelle Preise und Flugzeiten für die meistgefragten Strecken</p>
            </div>
            <Link href="/routen" className="hidden md:inline text-sm font-semibold hover:text-amber-700 transition-colors" style={{ color: "#c9a84c" }}>
              Alle 100+ Routen →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route) => (
              <Link
                key={route.slug}
                href={`/routen/${route.slug}`}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-lg" style={{ color: "#0d1b2a" }}>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{route.fromIata}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{route.toIata}</span>
                  </div>
                  <span className="price-badge text-xs">
                    {route.costRangeEur}
                  </span>
                </div>
                <div className="font-semibold group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                  {route.from} → {route.to}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span>⏱ {route.flightMinutes} min</span>
                  <span>✈ {route.recommendedAircraft}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/routen" className="text-sm font-semibold hover:text-amber-700 transition-colors" style={{ color: "#c9a84c" }}>
              Alle 100+ Routen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Why us / How it works */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#0d1b2a" }}>
            Warum PrivatjetVergleich?
          </h2>
          <p className="text-center text-slate-500 mb-12">Unabhängige Expertise für Ihren nächsten Privatflug</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyReasons.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0d1b2a" }}>{r.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured operators */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#0d1b2a" }}>
                Empfohlene Anbieter
              </h2>
              <p className="text-slate-500 mt-1">Die besten Privatjet-Charter-Anbieter für den DACH-Raum</p>
            </div>
            <Link href="/anbieter" className="hidden md:inline text-sm font-semibold hover:text-amber-700 transition-colors" style={{ color: "#c9a84c" }}>
              Alle Anbieter →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {affiliateOps.map((op) => (
              <div key={op.slug} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg" style={{ color: "#0d1b2a" }}>{op.name}</h3>
                  <div className="flex items-center gap-1">
                    <span style={{ color: "#c9a84c" }}>★</span>
                    <span className="text-sm font-semibold">{op.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4 flex-1">{op.description}</p>
                <div className="text-xs text-slate-400 mb-4">
                  <span className="font-medium text-slate-600">Typ:</span> {op.type} &nbsp;·&nbsp;
                  <span className="font-medium text-slate-600">Preis:</span> {op.priceRange}
                </div>
                <Link
                  href={`/anbieter/${op.slug}`}
                  className="text-center py-2 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
                >
                  Zum Anbieter-Review →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost intro */}
      <section className="py-16" style={{ background: "#0d1b2a" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
                style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}
              >
                Kostenübersicht 2026
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Was kostet ein Privatjet wirklich?
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Die Kosten variieren stark je nach Flugzeugtyp, Route und Saison. Ein Light Jet für kurze
                Strecken beginnt bei rund €2.500/Stunde, ein Heavy Jet für Langstrecken kann €8.000/Stunde
                und mehr kosten. Wir erklären alle Kostenfaktoren transparent.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Light Jet", value: "ab €2.500/h" },
                  { label: "Midsize Jet", value: "ab €3.800/h" },
                  { label: "Heavy Jet", value: "ab €6.500/h" },
                  { label: "Ultra Long Range", value: "ab €9.000/h" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                    <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                    <div className="font-bold" style={{ color: "#c9a84c" }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/ratgeber/privatjet-kosten-uebersicht"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
              >
                Vollständige Kostenübersicht →
              </Link>
            </div>
            <div className="grid gap-4">
              {costArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ratgeber/${article.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{article.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{article.readingMinutes} Min. Lesezeit</div>
                  </div>
                  <span style={{ color: "#c9a84c" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations teaser */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#0d1b2a" }}>
            Beliebte Reiseziele per Privatjet
          </h2>
          <p className="text-center text-slate-500 mb-10">Die schönsten Destinationen – direkt ab Ihrem Heimatflughafen</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Ibiza", "Mykonos", "Monaco", "St. Moritz", "London", "Dubai", "Mallorca", "Nizza", "Verbier", "Kitzbühel", "Cannes", "Portofino", "Capri", "Malediven", "New York"].map((dest) => (
              <Link
                key={dest}
                href={`/reiseziele/${dest.toLowerCase().replace(/\s+/g, "-").replace(/ü/g, "ue").replace(/ö/g, "oe").replace(/ä/g, "ae").replace(/é/g, "e").replace(/è/g, "e")}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium hover:border-amber-300 hover:text-amber-700 transition-all"
                style={{ color: "#0d1b2a" }}
              >
                {dest}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reiseziele" className="text-sm font-semibold hover:text-amber-700 transition-colors" style={{ color: "#c9a84c" }}>
              Alle 40+ Reiseziele ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Bereit für Ihren nächsten Privatflug?
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Holen Sie sich ein unverbindliches Angebot über Villiers Jets – einen der größten
            Privatjet-Broker weltweit mit Zugang zu 10.000+ Flugzeugen in über 40 Ländern.
          </p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Jetzt kostenloses Angebot anfordern
          </Link>
          <p className="text-xs text-slate-400 mt-4">
            Unverbindlich · Kostenlos · Innerhalb von 2 Stunden Antwort
          </p>
        </div>
      </section>
    </>
  );
}
