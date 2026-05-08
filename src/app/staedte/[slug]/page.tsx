import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { cities, getCityBySlug } from "@/data/cities";
import { getRoutesByDeparture } from "@/data/routes";
import { getAffiliateOperators } from "@/data/operators";

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `Privatjet ab ${city.name} mieten – Kosten, Anbieter & Routen 2026`,
    description: `Privatjet Charter ab ${city.name} (${city.iata}). Aktuelle Preise, beste Anbieter und beliebte Routen. Jetzt unverbindliches Angebot einholen.`,
    openGraph: { title: `Privatjet ab ${city.name}`, description: city.description },
  };
}

const countryNames: Record<string, string> = { DE: "Deutschland", CH: "Schweiz", AT: "Österreich" };
const countryFlags: Record<string, string> = { DE: "🇩🇪", CH: "🇨🇭", AT: "🇦🇹" };

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const routes = getRoutesByDeparture(city.slug).slice(0, 8);
  const operators = getAffiliateOperators().slice(0, 3);

  const costData = [
    { type: "Light Jet", seats: "4–7", hours: 1.5, cost: "ab €4.500" },
    { type: "Midsize Jet", seats: "7–9", hours: 2, cost: "ab €8.000" },
    { type: "Heavy Jet", seats: "9–14", hours: 2.5, cost: "ab €15.000" },
  ];

  return (
    <div className="py-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/staedte" className="hover:text-amber-700">Städte</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{city.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-2xl">{countryFlags[city.country]}</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              {countryNames[city.country]}
            </span>
            {city.iata && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white">
                IATA: {city.iata}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Privatjet ab {city.name} mieten
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-8">{city.description}</p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Jetzt Angebot für {city.name} einholen
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Airports */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
              Privatjet-Flughäfen in {city.name}
            </h2>
            <div className="grid gap-3">
              {city.airports.map((airport) => (
                <div key={airport} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl">
                  <span style={{ color: "#c9a84c", fontSize: "1.3rem" }}>✈</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#0d1b2a" }}>{airport}</div>
                    <div className="text-xs text-slate-400">FBO-Terminal für Privatflüge verfügbar</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Costs */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
              Kosten: Privatjet ab {city.name}
            </h2>
            <p className="text-slate-500 mb-4 text-sm leading-relaxed">
              Die Preise für Privatjet-Charter ab {city.name} variieren je nach Flugzeugtyp, Route und Buchungszeitpunkt.
              Die folgende Übersicht zeigt typische Richtwerte für beliebte Kurzstrecken:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: "#0d1b2a" }}>
                    <th className="text-left px-4 py-3 text-white font-semibold rounded-tl-xl">Flugzeugtyp</th>
                    <th className="text-left px-4 py-3 text-white font-semibold">Sitze</th>
                    <th className="text-left px-4 py-3 text-white font-semibold">Ø Flugzeit</th>
                    <th className="text-left px-4 py-3 text-white font-semibold rounded-tr-xl">Preisniveau</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-medium" style={{ color: "#0d1b2a" }}>{row.type}</td>
                      <td className="px-4 py-3 text-slate-600">{row.seats}</td>
                      <td className="px-4 py-3 text-slate-600">{row.hours}h</td>
                      <td className="px-4 py-3">
                        <span className="price-badge">{row.cost}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              * Preise sind Richtwerte für einfache Buchungen. Leerflüge und kurzfristige Buchungen können günstiger sein.
            </p>
          </section>

          {/* Popular routes */}
          {routes.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
                Beliebte Routen ab {city.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.slug}
                    href={`/routen/${route.slug}`}
                    className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-amber-200 transition-all"
                  >
                    <div>
                      <div className="font-semibold text-sm group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                        {city.name} → {route.to}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {route.flightMinutes} min · {route.recommendedAircraft}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="price-badge text-xs">{route.costRangeEur}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/routen" className="text-sm font-semibold mt-4 inline-block hover:text-amber-700" style={{ color: "#c9a84c" }}>
                Alle Routen ab {city.name} →
              </Link>
            </section>
          )}

          {/* Content article */}
          <section className="prose-luxury">
            <h2>Privatjet Charter ab {city.name} – Was Sie wissen sollten</h2>
            <p>
              Das Chartern eines Privatjets ab {city.name} bietet maximale Flexibilität für Geschäfts- und
              Freizeitreisende. Im Gegensatz zum Linienflug bestimmen Sie den Abflugzeitpunkt, die Route
              und das Flugzeug selbst. Typische Vorteile: kein öffentliches Check-in, diskrete Terminals,
              keine Gepäckverzögerungen.
            </p>
            <h3>Wann lohnt sich ein Privatjet ab {city.name}?</h3>
            <p>
              Ein Privatjet rechnet sich, wenn Zeit Ihr wertvollstes Gut ist. Bei Gruppen ab 4 Personen
              ist der Preisunterschied zur Business Class oft geringer als gedacht. Besonders für
              Strecken, die mit Linienflügen einen Umstieg erfordern, ist der Privatjet oft die
              schnellere Option.
            </p>
            <h3>Buchung und Ablauf</h3>
            <p>
              Die Buchung eines Privatjets ab {city.name} läuft meist über einen Broker wie Villiers Jets.
              Anfrage stellen, Angebot erhalten, Buchung bestätigen – der gesamte Prozess dauert oft weniger
              als 24 Stunden. Bei Leerflügen (Empty Legs) sind Last-Minute-Buchungen besonders günstig.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Angebot einholen</h3>
            <p className="text-sm text-slate-500 mb-4">
              Unverbindliches Angebot für Ihren Privatflug ab {city.name} erhalten.
            </p>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90 mb-3"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Villiers Jets – Angebot
            </Link>
            <div className="text-xs text-slate-400 text-center">Kostenlos · Unverbindlich · In 2h</div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Top Anbieter</h3>
            <div className="space-y-3">
              {operators.map((op) => (
                <Link key={op.slug} href={`/anbieter/${op.slug}`} className="flex items-center justify-between group">
                  <span className="text-sm font-medium group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                    {op.name}
                  </span>
                  <span className="text-xs text-amber-600">★ {op.rating}</span>
                </Link>
              ))}
            </div>
            <Link href="/anbieter" className="text-xs font-semibold mt-4 inline-block" style={{ color: "#c9a84c" }}>
              Alle Anbieter →
            </Link>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#0d1b2a" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
              Schnellfakten
            </div>
            <div className="space-y-2 text-sm">
              {city.iata && (
                <div className="flex justify-between">
                  <span className="text-slate-400">IATA-Code</span>
                  <span className="text-white font-mono">{city.iata}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Land</span>
                <span className="text-white">{countryNames[city.country]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Flughäfen</span>
                <span className="text-white">{city.airports.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Beliebt ab</span>
                <span className="text-white">{city.popularRoutes.length} Routen</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Was kostet ein Privatjet ab ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Ein Privatjet ab ${city.name} kostet je nach Typ und Strecke zwischen €4.500 und €25.000+ pro Flug. Light Jets starten ab ca. €4.500 für Kurzstrecken.`,
                },
              },
              {
                "@type": "Question",
                name: `Welche Flughäfen gibt es für Privatjets in ${city.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Für Privatjets in ${city.name} stehen folgende Optionen zur Verfügung: ${city.airports.join(", ")}.`,
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
