import Link from "next/link";
import type { Metadata } from "next";
import { cities, getCitiesByCountry } from "@/data/cities";

export const metadata: Metadata = {
  title: "Privatjet mieten nach Stadt – Alle DACH-Abflugstädte 2026",
  description:
    "Privatjet ab Frankfurt, München, Zürich, Wien und 55 weiteren DACH-Städten buchen. Preise, Anbieter und Flugzeugempfehlungen für jeden Abflugort.",
};

export default function StaedtePage() {
  const deCities = getCitiesByCountry("DE");
  const chCities = getCitiesByCountry("CH");
  const atCities = getCitiesByCountry("AT");

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            60+ Abflugstädte
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet mieten – nach Stadt
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Finden Sie Privatjet-Charter ab Ihrer Heimatstadt. Aktuelle Preise, Anbieter und
            Flugzeugempfehlungen für alle großen Abflugstädte in Deutschland, Österreich und der Schweiz.
          </p>
        </div>

        {/* Deutschland */}
        <CountrySection country="Deutschland" flag="🇩🇪" cities={deCities} />
        <CountrySection country="Schweiz" flag="🇨🇭" cities={chCities} />
        <CountrySection country="Österreich" flag="🇦🇹" cities={atCities} />

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: "#0d1b2a" }}>
          <h2 className="text-xl font-bold text-white mb-3">Ihre Stadt nicht dabei?</h2>
          <p className="text-slate-300 mb-6 text-sm">
            Privatjets können von fast jedem Flughafen starten. Holen Sie sich ein individuelles Angebot.
          </p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Individuelles Angebot anfordern
          </Link>
        </div>
      </div>
    </div>
  );
}

function CountrySection({
  country,
  flag,
  cities: countryCities,
}: {
  country: string;
  flag: string;
  cities: typeof cities;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: "#0d1b2a" }}>
        <span>{flag}</span>
        <span>{country}</span>
        <span className="text-sm font-normal text-slate-400">({countryCities.length} Städte)</span>
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countryCities.map((city) => (
          <Link
            key={city.slug}
            href={`/staedte/${city.slug}`}
            className="group bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-amber-200 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                  {city.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{city.iata} · {city.airports[0]}</div>
              </div>
              <span className="text-xs bg-slate-50 px-2 py-1 rounded font-mono text-slate-500">{city.iata}</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 line-clamp-2">{city.description.slice(0, 80)}...</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
