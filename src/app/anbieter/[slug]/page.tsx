import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { operators, getOperatorBySlug } from "@/data/operators";

export async function generateStaticParams() {
  return operators.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const op = getOperatorBySlug(slug);
  if (!op) return {};
  return {
    title: `${op.name} Erfahrungen & Review 2026 – Privatjet Charter`,
    description: `Unabhängiger ${op.name} Test: Rating ${op.rating}/5. ${op.description.slice(0, 120)} Jetzt Angebot einholen.`,
  };
}

const typeLabels: Record<string, string> = {
  broker: "Broker",
  operator: "Direktoperator",
  membership: "Membership-Programm",
  fractional: "Fractional Ownership",
};

const priceLabels: Record<string, { label: string; color: string }> = {
  budget: { label: "Günstig", color: "#22c55e" },
  mid: { label: "Mittelklasse", color: "#3b82f6" },
  premium: { label: "Premium", color: "#c9a84c" },
  ultra: { label: "Ultra Premium", color: "#ef4444" },
};

export default async function AnbieterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const op = getOperatorBySlug(slug);
  if (!op) notFound();

  const isVilliers = op.slug === "villiers-jets";
  const priceInfo = priceLabels[op.priceRange];

  return (
    <div className="py-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/anbieter" className="hover:text-amber-700">Anbieter</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{op.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              {typeLabels[op.type]}
            </span>
            {op.affiliateProgram && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                ✓ Empfohlen
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{op.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: star <= Math.round(op.rating) ? "#c9a84c" : "#374151", fontSize: "1.1rem" }}>★</span>
              ))}
              <span className="text-white font-bold ml-1">{op.rating}/5</span>
            </div>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-slate-300 text-sm">{op.hq}</span>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-slate-300 text-sm">Gegründet {op.founded}</span>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-8">{op.description}</p>
          {op.affiliateUrl && (
            <Link
              href={op.affiliateUrl}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
              rel="nofollow sponsored"
              target="_blank"
            >
              ✈ Jetzt kostenloses Angebot bei {op.name} einholen
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>Überblick</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Typ", value: typeLabels[op.type] },
                { label: "Preissegment", value: priceInfo.label },
                { label: "Rating", value: `${op.rating}/5.0` },
                ...(op.fleetSize ? [{ label: "Flugzeuge", value: `${op.fleetSize.toLocaleString()}+` }] : []),
                ...(op.minBooking ? [{ label: "Mindestbuchung", value: op.minBooking }] : []),
                { label: "Regionen", value: op.regions.slice(0, 2).join(", ") },
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
                  {op.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-4">Nachteile</h3>
                <ul className="space-y-2">
                  {op.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed review */}
          <section className="prose-luxury">
            <h2>{op.name} im Detail: Was Sie wissen sollten</h2>
            <p>
              {op.name} ist ein {typeLabels[op.type]} mit Sitz in {op.hq}. Das Unternehmen wurde {op.founded}
              gegründet und hat sich seitdem zu einem der bekanntesten Anbieter im Segment entwickelt.
            </p>
            <h3>Für wen ist {op.name} geeignet?</h3>
            <p>
              {op.bestFor}. Das Angebot richtet sich primär an Reisende im DACH-Raum, die Wert auf
              {op.priceRange === "premium" || op.priceRange === "ultra"
                ? " erstklassigen Service und exklusives Erlebnis"
                : " ein gutes Preis-Leistungs-Verhältnis"}{" "}
              legen.
            </p>
            <h3>Preise und Buchungsmodell</h3>
            <p>
              Das Preissegment von {op.name} ist {priceInfo.label.toLowerCase()}.
              {op.minBooking ? ` Die Mindestbuchung beginnt bei ${op.minBooking}.` : ""}
              {op.type === "broker" &&
                " Als Broker hat das Unternehmen keinen eigenen Fuhrpark, sondern vermittelt zu operierenden Chartergesellschaften."}
              {op.type === "membership" &&
                " Beim Membership-Modell zahlen Sie eine Vorabgebühr für garantierte Verfügbarkeit und feste Stundensätze."}
              {op.type === "fractional" &&
                " Beim Fractional-Modell erwerben Sie Anteile an einem Flugzeug und zahlen eine monatliche Betriebsgebühr."}
            </p>
            <h3>Verfügbarkeit im DACH-Raum</h3>
            <p>
              {op.name} ist in folgenden Regionen aktiv: {op.regions.join(", ")}. Für Flüge ab Deutschland,
              Österreich und der Schweiz ist das Angebot besonders stark in{" "}
              {op.regions.includes("Europa") ? "ganz Europa, inklusive der beliebten Sommerreiseziele im Mittelmeerraum" : "ausgewählten Märkten"}.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div
            className="rounded-2xl p-6"
            style={{ background: isVilliers ? "linear-gradient(135deg, #0d1b2a, #1b2e45)" : "white", border: isVilliers ? "none" : "1px solid #e2e8f0" }}
          >
            <h3 className="font-bold mb-1" style={{ color: isVilliers ? "#c9a84c" : "#0d1b2a" }}>
              {isVilliers ? "★ Unser Empfehlung Nr. 1" : "Angebot einholen"}
            </h3>
            <p className="text-sm mb-4" style={{ color: isVilliers ? "#cbd5e1" : "#64748b" }}>
              {isVilliers
                ? "Villiers Jets ist unser top-empfohlener Broker für den DACH-Raum. Größtes Netzwerk, beste Preise."
                : `Erhalten Sie ein unverbindliches Angebot von ${op.name}.`}
            </p>
            <Link
              href={op.affiliateUrl ?? `/anbieter/${op.slug}`}
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
              rel={op.affiliateUrl ? "nofollow sponsored" : undefined}
              target={op.affiliateUrl ? "_blank" : undefined}
            >
              {op.affiliateUrl ? `✈ Zu ${op.name}` : "Mehr erfahren"}
            </Link>
            {isVilliers && (
              <div className="text-xs text-slate-400 text-center mt-2">30% Provision · 365 Tage Cookie</div>
            )}
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Fakten</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Gegründet</span>
                <span className="font-medium" style={{ color: "#0d1b2a" }}>{op.founded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hauptsitz</span>
                <span className="font-medium" style={{ color: "#0d1b2a" }}>{op.hq}</span>
              </div>
              {op.fleetSize && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Flugzeuge</span>
                  <span className="font-medium" style={{ color: "#0d1b2a" }}>{op.fleetSize.toLocaleString()}+</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Rating</span>
                <span className="font-bold" style={{ color: "#c9a84c" }}>{op.rating}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Typ</span>
                <span className="font-medium" style={{ color: "#0d1b2a" }}>{typeLabels[op.type]}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-3" style={{ color: "#0d1b2a" }}>Beste für</h3>
            <p className="text-sm text-slate-500">{op.bestFor}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
