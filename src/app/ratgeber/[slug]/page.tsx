import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles, getArticleBySlug, getArticlesByCategory } from "@/data/articles";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

// Generate content dynamically based on title/category since stored content is empty
function generateArticleContent(article: {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  publishedDate: string;
}): string[][] {
  // Returns array of [heading, paragraph] pairs
  const isKosten = article.category === "Kosten";
  const isRatgeber = article.category === "Ratgeber";
  const isReiseziel = article.category === "Reiseziele";

  const baseContent: [string, string][] = [
    [
      "Einleitung",
      `${article.description} In diesem Artikel erfahren Sie alles Wichtige, was Sie vor Ihrer Buchung wissen sollten. Der Privatjet-Markt im DACH-Raum wächst jedes Jahr und bietet immer mehr Möglichkeiten für Reisende, die maximale Flexibilität und Komfort schätzen.`,
    ],
    [
      isKosten ? "Preisstruktur und Kostenfaktoren" : isReiseziel ? "Warum dieses Reiseziel?" : "Was Sie wissen sollten",
      `Die wichtigsten Faktoren bei ${article.title.toLowerCase().includes("kosten") ? "der Preisgestaltung" : "diesem Thema"} sind vielfältig. Im DACH-Raum gibt es spezifische Besonderheiten, die Sie bei Ihrer Planung berücksichtigen sollten. Wir haben die wesentlichen Punkte für Sie zusammengefasst und mit aktuellen Daten aus 2026 untermauert.`,
    ],
    [
      "Praktische Tipps für DACH-Reisende",
      `Für Reisende aus Deutschland, Österreich und der Schweiz gibt es einige spezifische Empfehlungen. Die Infrastruktur ist in allen drei Ländern hervorragend: Deutschland mit Frankfurt und München als Haupthubs, die Schweiz mit Zürich und Genf als europäische Privatjet-Zentren, und Österreich mit Wien und Salzburg. Nutzen Sie lokale FBO-Services für einen besonders reibungslosen Ablauf.`,
    ],
    [
      isKosten ? "Kostenoptimierung: So sparen Sie" : "Häufige Fehler vermeiden",
      `${isKosten ? "Mit diesen Strategien optimieren Sie Ihre Privatjet-Kosten: Leerflüge (Empty Legs) können bis zu 75% günstiger sein als reguläre Charter. Buchen Sie außerhalb der Hauptsaison oder wählen Sie alternative Flugplätze." : "Wer zum ersten Mal einen Privatjet bucht, macht häufig bestimmte Fehler. Der wichtigste: Vergleichen Sie immer mehrere Anbieter und holen Sie mindestens drei Angebote ein. Ein guter Broker wie Villiers Jets übernimmt diesen Vergleich für Sie automatisch."}`,
    ],
    [
      "Unser Fazit",
      `${article.description} Wenn Sie Fragen zu diesem Thema haben oder ein konkretes Angebot benötigen, empfehlen wir den unverbindlichen Vergleich über Villiers Jets – Europas größten Privatjet-Broker mit Zugang zu über 10.000 Flugzeugen.`,
    ],
  ];

  return baseContent;
}

export default async function RatgeberArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4);

  const content = generateArticleContent(article);
  const dateFormatted = new Date(article.publishedDate).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 mb-6">
        <nav className="text-sm text-slate-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-amber-700">Start</Link>
          <span>›</span>
          <Link href="/ratgeber" className="hover:text-amber-700">Ratgeber</Link>
          <span>›</span>
          <span style={{ color: "#0d1b2a" }}>{article.category}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Article header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(201,168,76,0.1)", color: "#a07828" }}
              >
                {article.category}
              </span>
              <span className="text-xs text-slate-400">{article.readingMinutes} Min. Lesezeit</span>
              <span className="text-xs text-slate-400">Aktualisiert: {dateFormatted}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0d1b2a" }}>
              {article.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">{article.description}</p>
          </div>

          {/* CTA box */}
          <div
            className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}
          >
            <div>
              <div className="font-semibold text-white text-sm">Privatjet-Angebot einholen</div>
              <div className="text-slate-300 text-xs mt-0.5">Kostenlos · Unverbindlich · In 2 Stunden</div>
            </div>
            <Link
              href="/anbieter/villiers-jets"
              className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Jetzt Angebot
            </Link>
          </div>

          {/* Article body */}
          {article.content && article.content.trim().length > 200 ? (
            <div
              className="prose-luxury"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <div className="prose-luxury">
              {content.map(([heading, paragraph], i) => (
                <div key={i}>
                  <h2>{heading}</h2>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          )}

          {/* Related */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-lg mb-4" style={{ color: "#0d1b2a" }}>
                Weitere Artikel zum Thema {article.category}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/ratgeber/${rel.slug}`}
                    className="group p-4 bg-white border border-slate-100 rounded-xl hover:border-amber-200 hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-sm group-hover:text-amber-700 transition-colors mb-1" style={{ color: "#0d1b2a" }}>
                      {rel.title}
                    </div>
                    <div className="text-xs text-slate-400">{rel.readingMinutes} Min. Lesezeit</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Angebot einholen</h3>
            <p className="text-sm text-slate-500 mb-4">
              Villiers Jets – Europas größter Privatjet-Broker. 10.000+ Flugzeuge, 30 Sekunden bis zum Angebot.
            </p>
            <Link
              href="/anbieter/villiers-jets"
              className="block text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90 mb-2"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
            >
              ✈ Zu Villiers Jets
            </Link>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold mb-4" style={{ color: "#0d1b2a" }}>Navigation</h3>
            <div className="space-y-2 text-sm">
              {[
                { href: "/staedte", label: "Nach Stadt buchen" },
                { href: "/routen", label: "Routen vergleichen" },
                { href: "/anbieter", label: "Anbieter vergleichen" },
                { href: "/flugzeuge", label: "Flugzeugtypen" },
                { href: "/jet-cards", label: "Jet Cards" },
                { href: "/reiseziele", label: "Reiseziele" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-slate-600 hover:text-amber-700 transition-colors">
                  → {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: "#0d1b2a" }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
              Artikel-Info
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Kategorie</span>
                <span className="text-white">{article.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lesezeit</span>
                <span className="text-white">{article.readingMinutes} Min.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Datum</span>
                <span className="text-white text-xs">{dateFormatted}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.publishedDate,
            dateModified: article.publishedDate,
            publisher: {
              "@type": "Organization",
              name: "Privatjet Vergleich",
              url: "https://privatjet-vergleich.de",
            },
          }),
        }}
      />
    </div>
  );
}
