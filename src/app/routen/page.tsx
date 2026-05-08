import Link from "next/link";
import type { Metadata } from "next";
import { routes, getPopularRoutes } from "@/data/routes";

export const metadata: Metadata = {
  title: "Privatjet Routen DACH – 100+ Streckenvergleiche 2026",
  description:
    "Alle Privatjet-Routen ab Deutschland, Österreich und der Schweiz. Kosten, Flugzeiten und Flugzeugempfehlungen für 100+ Strecken.",
};

export default function RoutenPage() {
  const popular = getPopularRoutes().slice(0, 12);
  const byDeparture = groupByDeparture(routes);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            100+ Routen im Vergleich
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Routen – DACH
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Vergleichen Sie Kosten, Flugzeiten und Flugzeugempfehlungen für über 100 Privatjet-Routen
            aus Deutschland, Österreich und der Schweiz.
          </p>
        </div>

        {/* Popular routes */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>
            Beliebte Strecken
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((route) => (
              <Link
                key={route.slug}
                href={`/routen/${route.slug}`}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{route.fromIata}</span>
                    <span className="text-slate-400 text-sm">→</span>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{route.toIata}</span>
                  </div>
                  <span className="price-badge text-xs">{route.costRangeEur}</span>
                </div>
                <div className="font-semibold group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                  {route.from} → {route.to}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span>⏱ {route.flightMinutes} min</span>
                  <span>📏 {route.distanceKm} km</span>
                  <span>✈ {route.recommendedAircraft}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All routes by departure */}
        <section>
          <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>Alle Routen nach Abflugort</h2>
          <div className="space-y-8">
            {Object.entries(byDeparture).map(([from, fromRoutes]) => (
              <div key={from}>
                <h3 className="font-semibold text-base mb-3" style={{ color: "#0d1b2a" }}>
                  Ab {from} ({fromRoutes.length} Routen)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fromRoutes.map((route) => (
                    <Link
                      key={route.slug}
                      href={`/routen/${route.slug}`}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-300 hover:text-amber-700 transition-all"
                      style={{ color: "#0d1b2a" }}
                    >
                      → {route.to}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: "#0d1b2a" }}>
          <h2 className="text-xl font-bold text-white mb-3">Route nicht gefunden?</h2>
          <p className="text-slate-300 mb-6 text-sm">
            Privatjets fliegen von und zu fast jedem Flughafen. Erhalten Sie ein Angebot für Ihre individuelle Route.
          </p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Individuelles Routenangebot
          </Link>
        </div>
      </div>
    </div>
  );
}

function groupByDeparture(allRoutes: typeof routes) {
  const grouped: Record<string, typeof routes> = {};
  for (const route of allRoutes) {
    if (!grouped[route.from]) grouped[route.from] = [];
    grouped[route.from].push(route);
  }
  return grouped;
}
