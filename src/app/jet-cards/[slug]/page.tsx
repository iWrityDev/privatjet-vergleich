import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { jetCardPrograms, getJetCardBySlug } from "@/data/jetcards";

export async function generateStaticParams() {
  return jetCardPrograms.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const jc = getJetCardBySlug(slug);
  if (!jc) return {};
  return {
    title: `${jc.name} – Jet Card Review & Vergleich 2026`,
    description: `${jc.name} im Test: Rating ${jc.rating}/5. ${jc.description.slice(0, 120)} Jetzt vergleichen.`,
  };
}

const typeLabels: Record<string, string> = {
  "jet-card": "Jet Card",
  fractional: "Fractional Ownership",
  membership: "Membership",
  "on-demand": "On Demand",
};

export default async function JetCardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jc = getJetCardBySlug(slug);
  if (!jc) notFound();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/jet-cards" className="hover:text-amber-700">Jet Cards</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{jc.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            {typeLabels[jc.type]} · {jc.provider}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{jc.name}</h1>
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} style={{ color: s <= Math.round(jc.rating) ? "#c9a84c" : "#374151", fontSize: "1.1rem" }}>★</span>
            ))}
            <span className="text-white font-bold ml-1">{jc.rating}/5</span>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-8">{jc.description}</p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Alternatives Angebot einholen
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Key metrics */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Typ", value: typeLabels[jc.type] },
                { label: "Mindestinvestition", value: `${jc.minInvestmentEur.toLocaleString()} €` },
                { label: "Stundensatz", value: `${jc.costPerHourEur.toLocaleString()} €/h` },
                { label: "Verfügbarkeit", value: `${jc.guaranteedAvailabilityHours}h Garantie` },
                { label: "Peak-Aufschlag", value: jc.peakSurcharge ? "Ja" : "Nein" },
                { label: "Übertragbar", value: jc.transferable ? "Ja" : "Nein" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="font-semibold text-sm" style={{ color: "#0d1b2a" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pros & Cons */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>Vor- und Nachteile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-4">Vorteile</h3>
                <ul className="space-y-2">
                  {jc.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="text-green-500 shrink-0">✓</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-4">Nachteile</h3>
                <ul className="space-y-2">
                  {jc.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-400 shrink-0">✗</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Review content */}
          <section className="prose-luxury">
            <h2>{jc.name} im Test: Unsere Bewertung</h2>
            <p>
              Das {jc.name}-Programm von {jc.provider} richtet sich an {jc.bestFor}. Mit einem
              Mindestinvestment von {jc.minInvestmentEur.toLocaleString()} € und einem Stundensatz
              von {jc.costPerHourEur.toLocaleString()} € ist dieses Programm
              {jc.minInvestmentEur < 100000 ? " auch für Einsteiger zugänglich" : " für etablierte Privatjet-Nutzer ausgelegt"}.
            </p>
            <h3>Verfügbarkeit und Buchungsprozess</h3>
            <p>
              {jc.provider} garantiert eine Verfügbarkeit innerhalb von {jc.guaranteedAvailabilityHours} Stunden.
              {jc.peakSurcharge
                ? " Achtung: In Hochsaisonzeiten (Weihnachten, Silvester, Sommerferien) werden Aufschläge berechnet."
                : " Ein besonderer Vorteil: Kein Peak-Aufschlag in der Hochsaison."}{" "}
              Das Programm deckt folgende Regionen ab: {jc.regions.join(", ")}.
            </p>
            <h3>Für wen lohnt sich dieses Programm?</h3>
            <p>
              {jc.bestFor}. Wer weniger als 20 Flugstunden pro Jahr benötigt, ist mit einer
              flexiblen Charter-Buchung über einen Broker wie Villiers Jets oft besser beraten.
              Ab 50+ Stunden wird das Programm wirtschaftlich interessant.
            </p>
            <h3>Vergleich zu anderen Programmen</h3>
            <p>
              Im Vergleich zu reinen Broker-Buchungen bietet {jc.name} den Vorteil der garantierten
              Verfügbarkeit und fester Stundensätze ohne böse Überraschungen. Der Nachteil ist die
              Vorabinvestition und mögliche Vertragsbindung.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Alternative: Villiers Jets</h3>
            <p className="text-sm text-slate-500 mb-4">
              Kein Vorab-Investment, kein Vertrag. Buchen Sie einzelne Flüge zum besten Preis.
            </p>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Villiers Jets testen
            </Link>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#0d1b2a" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a84c" }}>
              Programm-Details
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Anbieter</span>
                <span className="text-white">{jc.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Typ</span>
                <span className="text-white">{typeLabels[jc.type]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ab</span>
                <span className="text-white font-medium">{jc.minInvestmentEur.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Stundensatz</span>
                <span style={{ color: "#c9a84c" }} className="font-bold">{jc.costPerHourEur.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verfügbarkeit</span>
                <span className="text-white">{jc.guaranteedAvailabilityHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rating</span>
                <span style={{ color: "#c9a84c" }} className="font-bold">{jc.rating}/5</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
