import Link from "next/link";
import type { Metadata } from "next";
import { comparisons } from "@/data/comparisons";

export const metadata: Metadata = {
  title: "Privatjet Vergleiche 2026: Anbieter, Modelle und Buchungsoptionen",
  description:
    "Direkte Vergleiche der wichtigsten Privatjet-Anbieter und Buchungsmodelle: Villiers Jets vs PrivateFly, VistaJet vs NetJets, Jet Card vs Charter und mehr.",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Anbieter: { bg: "rgba(201,168,76,0.1)", text: "#a07828" },
  Ratgeber: { bg: "rgba(13,27,42,0.07)", text: "#0d1b2a" },
};

export default function VergleichPage() {
  const anbieterComps = comparisons.filter((c) => c.category === "Anbieter");
  const ratgeberComps = comparisons.filter((c) => c.category === "Ratgeber");

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Privatjet Vergleiche 2026",
    description: "Direkte Vergleiche der wichtigsten Privatjet-Anbieter und Buchungsmodelle.",
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `https://www.privatjet-vergleich.de/vergleich/${c.slug}/`,
    })),
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            Unabhängige Analysen
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Vergleiche 2026
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Anbieter gegen Anbieter, Modell gegen Modell: Hier finden Sie alle direkten Vergleiche,
            damit Sie die richtige Entscheidung für Ihre Reisen treffen.
          </p>
        </div>

        <ComparisonSection title="Anbieter-Vergleiche" items={anbieterComps} />
        <ComparisonSection title="Buchungsmodelle im Vergleich" items={ratgeberComps} />
      </div>
    </div>
  );
}

function ComparisonSection({
  title,
  items,
}: {
  title: string;
  items: typeof comparisons;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-14">
      <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c) => {
          const colors = categoryColors[c.category] ?? { bg: "rgba(201,168,76,0.1)", text: "#a07828" };
          return (
            <Link
              key={c.slug}
              href={`/vergleich/${c.slug}`}
              className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col hover:shadow-md hover:border-amber-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {c.category}
                </span>
                <span className="text-xs text-slate-400">{c.publishedDate}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex-1 text-center py-2 rounded-xl text-sm font-bold"
                  style={{ background: "rgba(13,27,42,0.06)", color: "#0d1b2a" }}
                >
                  {c.sideA.name}
                </div>
                <div className="text-lg font-black" style={{ color: "#c9a84c" }}>vs</div>
                <div
                  className="flex-1 text-center py-2 rounded-xl text-sm font-bold"
                  style={{ background: "rgba(13,27,42,0.06)", color: "#0d1b2a" }}
                >
                  {c.sideB.name}
                </div>
              </div>

              <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: "#0d1b2a" }}>
                {c.title}
              </h3>
              <p className="text-xs text-slate-500 flex-1 mb-4 leading-relaxed line-clamp-2">
                {c.description}
              </p>

              <div
                className="text-xs font-semibold group-hover:underline"
                style={{ color: "#c9a84c" }}
              >
                Zum Vergleich lesen
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
