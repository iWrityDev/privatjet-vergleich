import Link from "next/link";
import type { Metadata } from "next";
import { aircraftTypes } from "@/data/aircraft";

export const metadata: Metadata = {
  title: "Privatjet Flugzeugtypen – Welches Flugzeug passt zu Ihrer Route? 2026",
  description:
    "Vergleich aller Privatjet-Kategorien: Turboprop, Light Jet, Midsize bis Ultra Long Range. Kosten, Reichweite und Empfehlungen für DACH-Routen.",
};

export default function FlugzeugePage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            14 Flugzeugkategorien
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Flugzeugtypen
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Vom kompakten Turboprop bis zum Ultra-Long-Range-Jet: Finden Sie das richtige Flugzeug
            für Ihre Route und Anforderungen.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto mb-14">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "#0d1b2a" }}>
                <th className="text-left px-4 py-3 text-white font-semibold rounded-tl-xl">Typ</th>
                <th className="text-left px-4 py-3 text-white font-semibold">Sitze</th>
                <th className="text-left px-4 py-3 text-white font-semibold">Reichweite</th>
                <th className="text-left px-4 py-3 text-white font-semibold">Geschw.</th>
                <th className="text-left px-4 py-3 text-white font-semibold">Kosten/h</th>
                <th className="text-left px-4 py-3 text-white font-semibold rounded-tr-xl">Detail</th>
              </tr>
            </thead>
            <tbody>
              {aircraftTypes.map((ac, i) => (
                <tr key={ac.slug} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-amber-50 transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold" style={{ color: "#0d1b2a" }}>{ac.name}</div>
                    <div className="text-xs text-slate-400">{ac.exampleModels.slice(0, 2).join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{ac.passengers}</td>
                  <td className="px-4 py-3 text-slate-600">{ac.rangeKm.toLocaleString()} km</td>
                  <td className="px-4 py-3 text-slate-600">{ac.speedKmh} km/h</td>
                  <td className="px-4 py-3">
                    <span className="price-badge">
                      {ac.costPerHourEur.toLocaleString()} €/h
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/flugzeuge/${ac.slug}`}
                      className="text-xs font-semibold hover:text-amber-700 transition-colors"
                      style={{ color: "#c9a84c" }}
                    >
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aircraftTypes.map((ac) => (
            <Link
              key={ac.slug}
              href={`/flugzeuge/${ac.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                  {ac.name}
                </h3>
                <span className="price-badge text-xs">{ac.costPerHourEur.toLocaleString()} €/h</span>
              </div>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{ac.description.slice(0, 100)}...</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="font-semibold" style={{ color: "#0d1b2a" }}>{ac.passengers}</div>
                  <div className="text-slate-400">Sitze</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="font-semibold" style={{ color: "#0d1b2a" }}>{ac.rangeKm.toLocaleString()}</div>
                  <div className="text-slate-400">km</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="font-semibold" style={{ color: "#0d1b2a" }}>{ac.speedKmh}</div>
                  <div className="text-slate-400">km/h</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
