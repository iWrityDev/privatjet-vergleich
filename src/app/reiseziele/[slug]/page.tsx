import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getAffiliateOperators } from "@/data/operators";

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return {
    title: `Privatjet nach ${dest.name} – Kosten, Flugzeit & Tipps 2026`,
    description: `Privatjet Charter nach ${dest.name} ab Deutschland, Österreich und der Schweiz. Flugzeit ab Frankfurt: ${dest.fromFrankfurtMin} min. Preise ab ${dest.avgCharterCostFromDACH}.`,
  };
}

export default async function ReisezielDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const operators = getAffiliateOperators().slice(0, 3);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/reiseziele" className="hover:text-amber-700">Reiseziele</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{dest.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            {dest.country} · {dest.nearestAirport} ({dest.iata})
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Privatjet nach {dest.name}
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-8">{dest.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Ab Frankfurt", value: `${dest.fromFrankfurtMin} min` },
              { label: "Ab Zürich", value: `${dest.fromZuerichMin} min` },
              { label: "Ab München", value: `${dest.fromMuenchenMin} min` },
              { label: "Preis ab", value: dest.avgCharterCostFromDACH },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xs text-slate-400 mb-1">{s.label}</div>
                <div className="font-bold text-white text-lg">{s.value}</div>
              </div>
            ))}
          </div>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Jetzt Angebot nach {dest.name} einholen
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Highlights */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>Luxury-Highlights in {dest.name}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {dest.luxuryHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                  <span style={{ color: "#c9a84c" }}>★</span>
                  <span className="text-sm" style={{ color: "#0d1b2a" }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Article */}
          <section className="prose-luxury">
            <h2>Warum Privatjet nach {dest.name}?</h2>
            <p>
              {dest.name} ist eines der begehrtesten Reiseziele für Privatjet-Gäste aus dem DACH-Raum.
              Der nächstgelegene Flughafen ist {dest.nearestAirport} ({dest.iata}), der in nur
              {dest.transferMinutes} Minuten vom Stadtzentrum bzw. den Hauptattraktionen entfernt liegt.
            </p>
            <h3>Saisonalität und beste Reisezeit</h3>
            <p>{dest.seasonTip}</p>
            <h3>Flugzeiten ab DACH</h3>
            <p>
              Von Frankfurt nach {dest.name} dauert der Privatflug etwa {dest.fromFrankfurtMin} Minuten.
              Ab Zürich benötigen Sie ca. {dest.fromZuerichMin} Minuten, ab München rund {dest.fromMuenchenMin} Minuten.
              Im Vergleich zum Linienflug sparen Sie nicht nur Zeit beim Boarding, sondern profitieren
              auch von der Flexibilität bei Abflugzeit und -ort.
            </p>
            <h3>Kosten für einen Privatflug nach {dest.name}</h3>
            <p>
              Die Kosten für einen Privatjet nach {dest.name} beginnen bei {dest.avgCharterCostFromDACH} für
              einen einfachen Flug mit einem Light Jet. Bei größeren Gruppen oder Heavy Jets steigen die
              Kosten entsprechend. Tipp: Fragen Sie nach Leerflügen (Empty Legs) auf dieser Route, die
              bis zu 75% günstiger sein können.
            </p>
            <h3>Transfer vom Flughafen</h3>
            <p>
              Vom Flughafen {dest.nearestAirport} ({dest.iata}) erreichen Sie {dest.name} in etwa
              {dest.transferMinutes} Minuten. Auf Wunsch können Ihr Charter-Broker oder Ihre Concierge
              einen Helikopter-Transfer oder eine Luxuslimousine für Sie arrangieren.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Angebot einholen</h3>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90 mb-2"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Zu {dest.name}
            </Link>
            <div className="text-xs text-slate-400 text-center">Kostenlos · Unverbindlich</div>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#0d1b2a" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a84c" }}>
              Flugzeiten ab DACH
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Ab Frankfurt</span>
                <span className="text-white">{dest.fromFrankfurtMin} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ab Zürich</span>
                <span className="text-white">{dest.fromZuerichMin} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ab München</span>
                <span className="text-white">{dest.fromMuenchenMin} min</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-3">
                <span className="text-slate-400">Preis ab</span>
                <span className="font-bold" style={{ color: "#c9a84c" }}>{dest.avgCharterCostFromDACH}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-3" style={{ color: "#0d1b2a" }}>Flughafen</h3>
            <div className="text-sm text-slate-600 space-y-1">
              <div>✈ {dest.nearestAirport}</div>
              <div>🏷 IATA: {dest.iata}</div>
              <div>🚗 Transfer: {dest.transferMinutes} min</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
