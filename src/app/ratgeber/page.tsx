import Link from "next/link";
import type { Metadata } from "next";
import { articles, articleCategories, getArticlesByCategory } from "@/data/articles";

export const metadata: Metadata = {
  title: "Privatjet Ratgeber – 80+ Expertenartikel 2026",
  description:
    "Der vollständige Privatjet-Ratgeber: Kosten, Buchung, Anbieter, Flugzeuge, Routen und Destinationen. 80+ Artikel von Privatluftfahrt-Experten.",
};

export default function RatgeberPage() {
  const featured = articles.slice(0, 6);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            80+ Artikel
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
            Privatjet Ratgeber
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Alles Wissenswerte über Privatjet-Charter: Von den ersten Schritten beim Buchen über
            Kostenoptimierung bis zu exklusiven Reisezielen.
          </p>
        </div>

        {/* Featured */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6" style={{ color: "#0d1b2a" }}>Beliebteste Artikel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* By category */}
        {articleCategories.map((cat) => {
          const catArticles = getArticlesByCategory(cat);
          if (catArticles.length === 0) return null;
          return (
            <section key={cat} className="mb-12">
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
                {getCategoryIcon(cat)} {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} compact />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function getCategoryIcon(cat: string): string {
  const icons: Record<string, string> = {
    Kosten: "💶",
    Ratgeber: "📖",
    "Jet Cards": "💳",
    Business: "💼",
    Events: "🎪",
    Flugzeuge: "✈️",
    Anbieter: "🏢",
    Reiseziele: "🌍",
    Städte: "🏙️",
    Erlebnis: "⭐",
    Nachhaltigkeit: "🌱",
    Spezial: "🔬",
    Markt: "📊",
    Zukunft: "🚀",
  };
  return icons[cat] || "📄";
}

function ArticleCard({
  article,
  compact = false,
}: {
  article: { slug: string; title: string; description: string; category: string; readingMinutes: number; publishedDate: string };
  compact?: boolean;
}) {
  return (
    <Link
      href={`/ratgeber/${article.slug}`}
      className="group bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md hover:border-amber-200 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(201,168,76,0.1)", color: "#a07828" }}
        >
          {article.category}
        </span>
        <span className="text-xs text-slate-400">{article.readingMinutes} Min.</span>
      </div>
      <h3
        className={`font-bold group-hover:text-amber-700 transition-colors mb-2 ${compact ? "text-sm" : "text-base"}`}
        style={{ color: "#0d1b2a" }}
      >
        {article.title}
      </h3>
      {!compact && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{article.description}</p>
      )}
    </Link>
  );
}
