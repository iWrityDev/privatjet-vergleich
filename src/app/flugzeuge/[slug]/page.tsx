import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { aircraftTypes, getAircraftBySlug } from "@/data/aircraft";

export async function generateStaticParams() {
  return aircraftTypes.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ac = getAircraftBySlug(slug);
  if (!ac) return {};
  return {
    title: `${ac.name} mieten – Kosten, Reichweite & Modelle 2026`,
    description: `${ac.name} Charter: ${ac.passengers} Sitze, ${ac.rangeKm.toLocaleString()} km Reichweite, ab ${ac.costPerHourEur.toLocaleString()} €/h. Jetzt Angebot einholen.`,
  };
}

export default async function FlugzeugDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ac = getAircraftBySlug(slug);
  if (!ac) notFound();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/flugzeuge" className="hover:text-amber-700">Flugzeuge</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{ac.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            {ac.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{ac.name}</h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed mb-8">{ac.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Passagiere", value: `${ac.passengers}` },
              { label: "Reichweite", value: `${ac.rangeKm.toLocaleString()} km` },
              { label: "Reisegeschw.", value: `${ac.speedKmh} km/h` },
              { label: "Kosten ab", value: `${ac.costPerHourEur.toLocaleString()} €/h` },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                <div className="font-bold text-white text-xl" style={{ color: stat.label === "Kosten ab" ? "#c9a84c" : "white" }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Pros & Cons */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>Vor- und Nachteile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-4">Vorteile</h3>
                <ul className="space-y-2">
                  {ac.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="text-green-500 shrink-0">✓</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-4">Nachteile</h3>
                <ul className="space-y-2">
                  {ac.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-400 shrink-0">✗</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Article */}
          <section className="prose-luxury">
            <h2>{ac.name}: Alles Wichtige für Ihren Charter</h2>
            <p>
              Der {ac.name} gehört zur Kategorie der {ac.category}-Jets und ist damit ideal für bestimmte
              Strecken und Reisegruppen. Mit einer Reichweite von {ac.rangeKm.toLocaleString()} km können
              Sie {ac.rangeKm > 5000 ? "Interkontinentalflüge" : ac.rangeKm > 3000 ? "lange Europareisen" : "kurze bis mittlere Strecken in Europa"} ohne
              Zwischenstopp absolvieren.
            </p>
            <h3>Für welche Reisen eignet sich der {ac.name}?</h3>
            <p>{ac.bestFor}</p>
            <h3>Gepäck und Innenraum</h3>
            <p>
              Der {ac.name} bietet Gepäckkapazitäten für bis zu {ac.luggageKg} kg. Das
              Kabinenlayout ermöglicht es, {ac.passengers} Passagiere komfortabel zu befördern. Typische
              Ausstattungsmerkmale moderner Modelle umfassen vollflaches Bett (bei größeren Typen),
              Wi-Fi, Unterhaltungssystem und Catering.
            </p>
            <h3>Kosten im Detail</h3>
            <p>
              Die Stundenmietrate für den {ac.name} beginnt bei rund {ac.costPerHourEur.toLocaleString()} €.
              Hinzu kommen Lande- und Überfluggebühren, Crew-Kosten sowie optionales Catering. Für eine
              typische 2-Stunden-Strecke kalkulieren Sie insgesamt mit{" "}
              {(ac.costPerHourEur * 2 * 1.3).toLocaleString()} – {(ac.costPerHourEur * 2 * 1.6).toLocaleString()} €.
            </p>
            <h3>Bekannte Modelle</h3>
            <p>
              Zu den bekanntesten Flugzeugen in der Klasse {ac.category} gehören: {ac.exampleModels.join(", ")}.
              Jedes dieser Modelle hat leicht unterschiedliche Charakteristika bezüglich Kabinengröße,
              Reichweite und Komfort.
            </p>
          </section>

          {/* Ideal routes */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>Ideale Routen für den {ac.name}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{ac.idealRoutes}</p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Jetzt Charter-Angebot</h3>
            <p className="text-sm text-slate-500 mb-4">
              Erhalten Sie ein Angebot für einen {ac.name} Ihrer Wunschroute.
            </p>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90 mb-2"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Angebot einholen
            </Link>
            <div className="text-xs text-slate-400 text-center">Kostenlos · Unverbindlich</div>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#0d1b2a" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a84c" }}>
              Technische Daten
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Kategorie", value: ac.category },
                { label: "Passagiere", value: ac.passengers.toString() },
                { label: "Reichweite", value: `${ac.rangeKm.toLocaleString()} km` },
                { label: "Geschwindigkeit", value: `${ac.speedKmh} km/h` },
                { label: "Gepäck", value: `${ac.luggageKg} kg` },
                { label: "Kosten/h", value: `${ac.costPerHourEur.toLocaleString()} €` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-3" style={{ color: "#0d1b2a" }}>Beispielmodelle</h3>
            <div className="space-y-1">
              {ac.exampleModels.map((model) => (
                <div key={model} className="text-sm text-slate-600">· {model}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
