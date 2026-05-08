import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { routes, getRouteBySlug } from "@/data/routes";
import { getCityBySlug } from "@/data/cities";
import { aircraftTypes } from "@/data/aircraft";
import { getAffiliateOperators } from "@/data/operators";

export async function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return {
    title: `Privatjet ${route.from} nach ${route.to} – Kosten & Flugzeiten 2026`,
    description: `Privatjet Charter von ${route.from} (${route.fromIata}) nach ${route.to} (${route.toIata}). Flugzeit ${route.flightMinutes} Minuten. Preis ${route.costRangeEur}. Jetzt Angebot einholen.`,
  };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const fromCity = getCityBySlug(route.fromSlug);
  const operators = getAffiliateOperators().slice(0, 3);

  const aircraft = aircraftTypes.find(
    (a) => a.name === route.recommendedAircraft || a.category === route.recommendedAircraft
  );

  const alternatives = routes
    .filter((r) => r.slug !== route.slug && r.fromSlug === route.fromSlug)
    .slice(0, 4);

  return (
    <div className="py-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/routen" className="hover:text-amber-700">Routen</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{route.from} → {route.to}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              Privatjet Route
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Privatjet {route.from} <span style={{ color: "#c9a84c" }}>→</span> {route.to}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: "⏱", label: "Flugzeit", value: `${route.flightMinutes} min` },
              { icon: "📏", label: "Distanz", value: `${route.distanceKm} km` },
              { icon: "✈", label: "Empfehlung", value: route.recommendedAircraft },
              { icon: "💶", label: "Preisrahmen", value: route.costRangeEur },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xs text-slate-400 mb-1">{stat.icon} {stat.label}</div>
                <div className="font-bold text-white text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Angebot für diese Route einholen
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Route details */}
          <section className="prose-luxury">
            <h2>Route {route.from} – {route.to}: Was Sie wissen sollten</h2>
            <p>{route.description}</p>
            <h3>Flugzeit und Distanz</h3>
            <p>
              Die Direktverbindung von {route.from} ({route.fromIata}) nach {route.to} ({route.toIata}) beträgt
              rund {route.distanceKm} Kilometer. Im Privatjet legen Sie diese Strecke in ca. {route.flightMinutes} Minuten
              zurück. Im Vergleich: Mit der Bahn oder einem Linienflug mit Umstieg dauert die gleiche Verbindung
              oft das Doppelte.
            </p>
            <h3>Empfohlenes Flugzeug: {route.recommendedAircraft}</h3>
            <p>
              Für die Strecke {route.from} – {route.to} empfehlen wir einen {route.recommendedAircraft}. Diese
              Kategorie bietet das optimale Gleichgewicht aus Reichweite, Komfort und Kosten für diese Distanz.
              {aircraft ? ` Ein typisches Modell ist der ${aircraft.exampleModels[0]}, der ${aircraft.passengers} Passagiere
              bei einer Reisegeschwindigkeit von ${aircraft.speedKmh} km/h befördern kann.` : ""}
            </p>
            <h3>Kosten für diesen Flug</h3>
            <p>
              Der Preis für einen Privatjet von {route.from} nach {route.to} liegt typischerweise im
              Bereich {route.costRangeEur}. Der genaue Preis hängt ab von:
            </p>
            <ul>
              <li>Flugzeugtyp und -alter</li>
              <li>Buchungszeitpunkt (kurzfristig vs. langfristig)</li>
              <li>Verfügbarkeit von Leerflügen (Empty Legs)</li>
              <li>Zusatzkosten (Catering, Überfluggebühren, Besatzungsübernachtung)</li>
              <li>Saisonale Nachfrage</li>
            </ul>
            <h3>Tipp: Leerflüge (Empty Legs)</h3>
            <p>
              Auf der Strecke {route.from} – {route.to} gibt es regelmäßig Leerflüge, bei denen ein Privatjet
              ohne Passagiere zurückfliegen muss. Diese sogenannten Empty Legs können bis zu 75% günstiger sein
              als eine reguläre Charterbuchung. Fragen Sie bei Ihrer Anfrage explizit danach.
            </p>
          </section>

          {/* Operators */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
              Anbieter für diese Route
            </h2>
            <div className="space-y-4">
              {operators.map((op) => (
                <div key={op.slug} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                  <div>
                    <div className="font-semibold" style={{ color: "#0d1b2a" }}>{op.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{op.type} · {op.priceRange}</div>
                  </div>
                  <Link
                    href={`/anbieter/${op.slug}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
                  >
                    Review →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Jetzt Angebot einholen</h3>
            <div className="space-y-3 text-sm text-slate-500 mb-4">
              <div className="flex justify-between"><span>Strecke</span><span className="font-medium text-slate-700">{route.fromIata} → {route.toIata}</span></div>
              <div className="flex justify-between"><span>Flugzeit</span><span className="font-medium text-slate-700">{route.flightMinutes} min</span></div>
              <div className="flex justify-between"><span>Preis ab</span><span className="font-semibold" style={{ color: "#c9a84c" }}>{route.costRangeEur}</span></div>
            </div>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Angebot anfordern
            </Link>
          </div>

          {fromCity && fromCity.airports.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold mb-3" style={{ color: "#0d1b2a" }}>Abflug ab {route.from}</h3>
              <div className="space-y-2">
                {fromCity.airports.map((ap) => (
                  <div key={ap} className="text-sm text-slate-600 flex items-center gap-2">
                    <span style={{ color: "#c9a84c" }}>✈</span> {ap}
                  </div>
                ))}
              </div>
            </div>
          )}

          {alternatives.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold mb-3" style={{ color: "#0d1b2a" }}>Weitere Routen ab {route.from}</h3>
              <div className="space-y-2">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/routen/${alt.slug}`}
                    className="block text-sm text-slate-600 hover:text-amber-700 transition-colors"
                  >
                    → {alt.to} ({alt.flightMinutes} min)
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Was kostet ein Privatjet von ${route.from} nach ${route.to}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Ein Privatjet von ${route.from} nach ${route.to} kostet typischerweise ${route.costRangeEur}. Die genauen Kosten hängen von Flugzeugtyp, Buchungszeitpunkt und Verfügbarkeit ab.`,
                },
              },
              {
                "@type": "Question",
                name: `Wie lange fliegt man von ${route.from} nach ${route.to}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Die Flugzeit von ${route.from} nach ${route.to} im Privatjet beträgt etwa ${route.flightMinutes} Minuten bei einer Distanz von ${route.distanceKm} km.`,
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
