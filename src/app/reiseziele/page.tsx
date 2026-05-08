import Link from "next/link";
import type { Metadata } from "next";
import { destinations, getDestinationsByRegion } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Privatjet Reiseziele – 40+ Destinationen ab DACH 2026",
  description:
    "Die schönsten Reiseziele per Privatjet ab Deutschland, Österreich und der Schweiz. Ibiza, Monaco, Dubai, Mykonos und mehr. Preise und Flugzeiten.",
};

export default function ReisezieleePage() {
  const mediterranean = getDestinationsByRegion("mediterran");
  const winter = getDestinationsByRegion("ski");
  const international = getDestinationsByRegion("exotic");
  const cultural = getDestinationsByRegion("city");

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            40+ Destinationen
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Reiseziele
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Die beliebtesten Destinationen für Privatjet-Reisende ab dem DACH-Raum. Mit Preisen,
            Flugzeiten und Insidertipps für jeden Zielort.
          </p>
        </div>

        <DestinationSection title="☀️ Mittelmeer & Inseln" destinations={mediterranean} />
        <DestinationSection title="🏔️ Ski- & Winterziele" destinations={winter} />
        <DestinationSection title="🌍 Exotische Ziele" destinations={international} />
        <DestinationSection title="🏛️ Städteziele" destinations={cultural} />

        {/* All remaining */}
        {destinations.filter(d =>
          !mediterranean.find(x => x.slug === d.slug) &&
          !winter.find(x => x.slug === d.slug) &&
          !international.find(x => x.slug === d.slug) &&
          !cultural.find(x => x.slug === d.slug)
        ).length > 0 && (
          <DestinationSection
            title="✈️ Weitere Ziele"
            destinations={destinations.filter(d =>
              !mediterranean.find(x => x.slug === d.slug) &&
              !winter.find(x => x.slug === d.slug) &&
              !international.find(x => x.slug === d.slug) &&
              !cultural.find(x => x.slug === d.slug)
            )}
          />
        )}
      </div>
    </div>
  );
}

function DestinationSection({
  title,
  destinations: dests,
}: {
  title: string;
  destinations: typeof destinations;
}) {
  if (dests.length === 0) return null;
  return (
    <section className="mb-14">
      <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {dests.map((dest) => (
          <Link
            key={dest.slug}
            href={`/reiseziele/${dest.slug}`}
            className="group bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg hover:border-amber-200 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                {dest.name}
              </h3>
              <span className="text-xs text-slate-400">{dest.country}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{dest.description.slice(0, 90)}...</p>
            <div className="text-xs text-slate-400 space-y-1">
              <div>✈ ab FRA: ~{dest.fromFrankfurtMin} min</div>
              <div className="font-medium" style={{ color: "#c9a84c" }}>ab {dest.avgCharterCostFromDACH}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
