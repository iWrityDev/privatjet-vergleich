import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { comparisons, getComparisonBySlug, type Comparison, type ComparisonSide } from "@/data/comparisons";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
  };
}

const priceLabels: Record<string, string> = {
  budget: "Günstig",
  mid: "Mittelklasse",
  premium: "Premium",
  ultra: "Ultra Premium",
};

function buildJsonLd(c: Comparison) {
  const base = "https://www.privatjet-vergleich.de";
  const faqItems = c.sections.map((s) => ({
    "@type": "Question",
    name: s.heading,
    acceptedAnswer: { "@type": "Answer", text: s.body.slice(0, 300) + "..." },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Privatjet Vergleich", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Vergleiche", item: `${base}/vergleich/` },
          { "@type": "ListItem", position: 3, name: c.title, item: `${base}/vergleich/${c.slug}/` },
        ],
      },
      {
        "@type": "Article",
        headline: c.title,
        description: c.description,
        datePublished: c.publishedDate,
        author: { "@type": "Organization", name: "Privatjet Vergleich" },
        publisher: {
          "@type": "Organization",
          name: "Privatjet Vergleich",
          url: base,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems,
      },
    ],
  };
}

export default async function VergleichSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  const jsonLd = buildJsonLd(c);
  const relatedComps = comparisons.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4">

        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-600">Startseite</Link>
          <span>/</span>
          <Link href="/vergleich" className="hover:text-amber-600">Vergleiche</Link>
          <span>/</span>
          <span className="text-slate-600">{c.sideA.name} vs {c.sideB.name}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            {c.category}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: "#0d1b2a" }}>
            {c.title}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">{c.description}</p>
          <p className="text-xs text-slate-400 mt-2">Aktualisiert: {c.publishedDate}</p>
        </div>

        {/* VS card */}
        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 mb-10">
          <SideCard side={c.sideA} position="A" />
          <div className="hidden md:flex items-center justify-center bg-white border-l border-r border-slate-100 px-4 absolute left-1/2 -translate-x-1/2 z-10">
          </div>
          <SideCard side={c.sideB} position="B" />
        </div>

        {/* VS badge overlapping */}
        <div className="relative -mt-16 mb-6 flex justify-center pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg border-4 border-white"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            vs
          </div>
        </div>

        {/* Quick comparison table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-10">
          <div className="px-6 py-4" style={{ background: "#0d1b2a" }}>
            <h2 className="text-white font-bold text-sm">Schnellvergleich</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-slate-500 font-medium text-xs w-1/3">Merkmal</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#0d1b2a" }}>{c.sideA.name}</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#0d1b2a" }}>{c.sideB.name}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Modelltyp", c.sideA.type, c.sideB.type],
                  ["Gegründet", String(c.sideA.founded), String(c.sideB.founded)],
                  ["Hauptsitz", c.sideA.hq, c.sideB.hq],
                  ["Preissegment", priceLabels[c.sideA.priceRange], priceLabels[c.sideB.priceRange]],
                  ["Mindestbuchung", c.sideA.minBooking ?? "Keine", c.sideB.minBooking ?? "Keine"],
                  ["Bewertung", `${c.sideA.rating}/5`, `${c.sideB.rating}/5`],
                  ["Ideal für", c.sideA.bestFor, c.sideB.bestFor],
                ].map(([label, a, b], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-6 py-3 text-slate-500 font-medium text-xs">{label}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{a}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verdict box */}
        <div
          className="rounded-2xl p-6 mb-10 border"
          style={{ background: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.3)" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🏆</span>
            <div>
              <div className="font-bold text-sm mb-1" style={{ color: "#a07828" }}>
                Unser Urteil: {c.verdict.winnerLabel}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{c.verdict.summary}</p>
            </div>
          </div>
        </div>

        {/* Detailed sections */}
        <div className="space-y-8 mb-12">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold mb-3" style={{ color: "#0d1b2a" }}>
                {s.heading}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Affiliate CTA */}
        <div
          className="rounded-2xl p-6 mb-12 text-center border"
          style={{ background: "#0d1b2a", borderColor: "#0d1b2a" }}
        >
          <div className="text-white font-bold text-lg mb-2">Bereit für Ihren nächsten Privatjet-Flug?</div>
          <p className="text-slate-300 text-sm mb-4 max-w-lg mx-auto">
            Vergleichen Sie jetzt Angebote aus über 10.000 Flugzeugen und fragen Sie unverbindlich an.
          </p>
          <a
            href="https://villiers.ai/?id=BTOG3L"
            target="_blank"
            rel="noopener"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            Privatjet jetzt anfragen bei Villiers Jets
          </a>
        </div>

        {/* Related comparisons */}
        {relatedComps.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-5" style={{ color: "#0d1b2a" }}>
              Weitere Vergleiche
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedComps.map((r) => (
                <Link
                  key={r.slug}
                  href={`/vergleich/${r.slug}`}
                  className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-sm hover:border-amber-200 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold" style={{ color: "#0d1b2a" }}>{r.sideA.name}</span>
                    <span className="text-xs font-black" style={{ color: "#c9a84c" }}>vs</span>
                    <span className="text-xs font-bold" style={{ color: "#0d1b2a" }}>{r.sideB.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SideCard({ side, position }: { side: ComparisonSide; position: "A" | "B" }) {
  const isA = position === "A";
  return (
    <div className={`p-6 ${isA ? "bg-slate-50 border-r border-slate-200" : "bg-white"}`}>
      <div className="mb-1">
        {side.operatorSlug ? (
          <Link
            href={`/anbieter/${side.operatorSlug}`}
            className="font-bold text-xl hover:underline"
            style={{ color: "#0d1b2a" }}
          >
            {side.name}
          </Link>
        ) : (
          <div className="font-bold text-xl" style={{ color: "#0d1b2a" }}>{side.name}</div>
        )}
      </div>
      <p className="text-xs text-slate-400 mb-4">{side.tagline}</p>

      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "#c9a84c" }}>{"★".repeat(Math.round(side.rating))}</span>
        <span className="text-sm font-bold">{side.rating}/5</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "rgba(201,168,76,0.1)", color: "#a07828" }}
        >
          {priceLabels[side.priceRange]}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        {side.pros.map((p) => (
          <div key={p} className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-green-500 shrink-0 mt-0.5">✓</span>
            {p}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {side.cons.map((c) => (
          <div key={c} className="flex items-start gap-2 text-xs text-slate-400">
            <span className="text-slate-300 shrink-0 mt-0.5">✗</span>
            {c}
          </div>
        ))}
      </div>

      {side.minBooking && (
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
          Einstieg: <span className="font-semibold text-slate-700">{side.minBooking}</span>
        </div>
      )}
    </div>
  );
}
