import Link from "next/link";
import type { Metadata } from "next";
import { jetCardPrograms } from "@/data/jetcards";

export const metadata: Metadata = {
  title: "Jet Card Vergleich 2026 – Privatjet Abonnements für DACH",
  description:
    "Vergleich der besten Jet Card Programme 2026: NetJets, VistaJet, Flexjet, Wheels Up und mehr. Kosten, Bedingungen und Empfehlungen für Vielflieger.",
};

const typeLabels: Record<string, string> = {
  "jet-card": "Jet Card",
  fractional: "Fractional",
  membership: "Membership",
  "on-demand": "On Demand",
};

export default function JetCardsPage() {
  const sorted = [...jetCardPrograms].sort((a, b) => b.rating - a.rating);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            15 Programme verglichen
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Jet Card Vergleich 2026
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Fliegen Sie regelmäßig privat? Dann kann eine Jet Card oder ein Membership-Programm
            günstiger sein als einzelne Charter-Buchungen. Wir vergleichen alle wichtigen Programme
            für den DACH-Markt.
          </p>
        </div>

        {/* Explainer */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            { title: "Was ist eine Jet Card?", desc: "Sie kaufen eine feste Anzahl Flugstunden vor. Der Stundensatz ist fix, die Verfügbarkeit garantiert. Ideal für 20–100h/Jahr." },
            { title: "Fractional Ownership", desc: "Sie erwerben einen Anteil (z.B. 1/16) an einem Flugzeug. Monatliche Betriebskosten + Stundensatz. Für 50–400h/Jahr." },
            { title: "Membership-Programme", desc: "Monatliche oder jährliche Mitgliedschaft mit Zugang zur Flotte. Flexibler als Fractional, mehr Garantien als Broker." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold mb-2" style={{ color: "#0d1b2a" }}>{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((program) => (
            <Link
              key={program.slug}
              href={`/jet-cards/${program.slug}`}
              className="group bg-white border border-slate-100 rounded-2xl p-6 flex flex-col hover:shadow-lg hover:border-amber-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold group-hover:text-amber-700 transition-colors" style={{ color: "#0d1b2a" }}>
                    {program.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(201,168,76,0.1)", color: "#a07828" }}
                    >
                      {typeLabels[program.type]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span style={{ color: "#c9a84c" }}>★</span>
                  <span className="font-bold text-sm">{program.rating}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 flex-1 mb-4 leading-relaxed">{program.description.slice(0, 110)}...</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-slate-400">Investment</div>
                  <div className="font-semibold" style={{ color: "#0d1b2a" }}>
                    ab {program.minInvestmentEur.toLocaleString()} €
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-slate-400">Verfügbarkeit</div>
                  <div className="font-semibold" style={{ color: "#0d1b2a" }}>
                    {program.guaranteedAvailabilityHours}h
                  </div>
                </div>
              </div>
              <div className="text-xs text-amber-700 font-semibold">Vollständiger Vergleich →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
