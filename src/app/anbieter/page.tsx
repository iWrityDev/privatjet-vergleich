import Link from "next/link";
import type { Metadata } from "next";
import { operators } from "@/data/operators";

export const metadata: Metadata = {
  title: "Privatjet Anbieter Vergleich 2026 – Broker, Membership & Fractional",
  description:
    "Unabhängiger Vergleich von 20+ Privatjet-Anbietern für den DACH-Raum. Villiers Jets, VistaJet, NetJets, PrivateFly und mehr – mit Ratings, Preisen und Erfahrungsberichten.",
};

const typeLabels: Record<string, string> = {
  broker: "Broker",
  operator: "Operator",
  membership: "Membership",
  fractional: "Fractional",
};

const priceLabels: Record<string, string> = {
  budget: "Günstig",
  mid: "Mittelklasse",
  premium: "Premium",
  ultra: "Ultra Premium",
};

export default function AnbieterPage() {
  const brokers = operators.filter((o) => o.type === "broker");
  const memberships = operators.filter((o) => o.type === "membership");
  const fractionals = operators.filter((o) => o.type === "fractional");
  const operatorsList = operators.filter((o) => o.type === "operator");

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            Unabhängiger Vergleich
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Anbieter im Vergleich
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Wir haben 20+ Privatjet-Anbieter analysiert und bewertet. Vom einfachen Broker bis zur
            Fractional-Ownership – hier finden Sie den richtigen Partner für Ihre Anforderungen.
          </p>
        </div>

        {/* Quick comparison */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-6" style={{ background: "#0d1b2a" }}>
            <h2 className="text-lg font-bold text-white">Schnellvergleich: Welches Modell passt zu Ihnen?</h2>
          </div>
          <div className="grid md:grid-cols-4 divide-x divide-slate-100">
            {[
              { type: "Broker", icon: "🔍", desc: "Sie fliegen 1–10x pro Jahr. Flexible Buchung ohne Vorabzahlung.", best: "Charter on demand" },
              { type: "Membership", icon: "💳", desc: "Sie fliegen 10–50h pro Jahr. Garantierte Verfügbarkeit.", best: "Regelmäßige Reisende" },
              { type: "Fractional", icon: "🤝", desc: "Sie fliegen 50–200h pro Jahr. Teilbesitz an einem Flugzeug.", best: "Vielflieger" },
              { type: "Operator", icon: "✈️", desc: "Sie fliegen 200h+ pro Jahr oder benötigen spezielle Services.", best: "Unternehmen & High Net Worth" },
            ].map((item) => (
              <div key={item.type} className="p-6 bg-white">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm mb-2" style={{ color: "#0d1b2a" }}>{item.type}</div>
                <div className="text-xs text-slate-500 mb-2 leading-relaxed">{item.desc}</div>
                <div className="text-xs font-semibold" style={{ color: "#c9a84c" }}>{item.best}</div>
              </div>
            ))}
          </div>
        </div>

        <AnbieterSection title="🔍 Broker" subtitle="Flexibel buchen ohne Vorabverpflichtung" providers={brokers} />
        <AnbieterSection title="💳 Membership-Programme" subtitle="Garantierte Verfügbarkeit mit Vorabzahlung" providers={memberships} />
        <AnbieterSection title="🤝 Fractional Ownership" subtitle="Anteilsbesitz an einem Privatflugzeug" providers={fractionals} />
        {operatorsList.length > 0 && (
          <AnbieterSection title="✈ Direkt-Operatoren" subtitle="Buchung direkt beim Flugzeugbetreiber" providers={operatorsList} />
        )}
      </div>
    </div>
  );
}

function AnbieterSection({
  title,
  subtitle,
  providers,
}: {
  title: string;
  subtitle: string;
  providers: typeof operators;
}) {
  if (providers.length === 0) return null;
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: "#0d1b2a" }}>{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((op) => (
          <div key={op.slug} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg" style={{ color: "#0d1b2a" }}>{op.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#a07828" }}
                  >
                    {typeLabels[op.type]}
                  </span>
                  <span className="text-xs text-slate-400">{priceLabels[op.priceRange]}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span style={{ color: "#c9a84c" }}>★</span>
                <span className="font-bold text-sm">{op.rating}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 flex-1 mb-4 leading-relaxed">{op.description.slice(0, 140)}...</p>
            <div className="text-xs text-slate-400 mb-4">
              <span className="font-medium text-slate-600">Beste für:</span> {op.bestFor}
            </div>
            <Link
              href={`/anbieter/${op.slug}`}
              className="text-center py-2.5 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              Vollständiger Review →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
