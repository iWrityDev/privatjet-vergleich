// Simulate page.tsx operations for all articles using the actual TS source
import { articles, getArticleBySlug, getArticlesByCategory } from './src/data/articles.ts';

console.log('Loaded', articles.length, 'articles');

function generateArticleContent(article) {
  const isKosten = article.category === 'Kosten';
  const isReiseziel = article.category === 'Reiseziele';

  const baseContent = [
    ['Einleitung', `${article.description} In diesem Artikel...`],
    [
      isKosten ? 'Preisstruktur und Kostenfaktoren' : isReiseziel ? 'Warum dieses Reiseziel?' : 'Was Sie wissen sollten',
      `Die wichtigsten Faktoren bei ${article.title.toLowerCase().includes('kosten') ? 'der Preisgestaltung' : 'diesem Thema'}...`,
    ],
    ['Praktische Tipps', 'Tipps...'],
    [isKosten ? 'Kostenoptimierung' : 'Häufige Fehler', 'Content...'],
    ['Unser Fazit', `${article.description} Empfehlung...`],
  ];
  return baseContent;
}

const errors = [];
let processed = 0;

for (const article of articles) {
  processed++;
  try {
    // All operations from page.tsx
    const slug = article.slug;
    if (!slug) throw new Error('Missing slug');

    // generateStaticParams
    const param = { slug };
    Object.keys(param); // verify it's not null

    // getArticleBySlug lookup (simulated)
    const found = getArticleBySlug(slug);
    if (!found) throw new Error(`getArticleBySlug returned null for slug: ${slug}`);

    // getArticlesByCategory
    const relatedArticles = getArticlesByCategory(article.category)
      .filter(a => a.slug !== article.slug)
      .slice(0, 4);

    // Object.keys on article (simulated React RSC prop serialization)
    Object.keys(article);
    for (const rel of relatedArticles) {
      if (rel === null || rel === undefined) throw new Error('null related article');
      Object.keys(rel);
    }

    // generateArticleContent (always called, even if content is long)
    const content = generateArticleContent(article);

    // Date formatting
    const dateFormatted = new Date(article.publishedDate).toLocaleDateString('de-DE', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    if (dateFormatted === 'Invalid Date') throw new Error(`Invalid publishedDate: ${article.publishedDate}`);

    // content check
    const useHtml = article.content && article.content.trim().length > 200;

    // JSON.stringify for JSON-LD in <script> tag
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      datePublished: article.publishedDate,
      dateModified: article.publishedDate,
      publisher: { '@type': 'Organization', name: 'Privatjet Vergleich', url: 'https://privatjet-vergleich.de' },
    });

    // generateMetadata
    const metadata = { title: article.title, description: article.description };
    JSON.stringify(metadata);

  } catch (e) {
    errors.push({ slug: article.slug || `[index ${processed}]`, error: e.message, type: e.constructor.name });
  }
}

console.log('\nProcessed:', processed, 'articles');

if (errors.length === 0) {
  console.log('All articles PASSED simulation.');
} else {
  console.log('\nERRORS:', errors.length);
  for (const e of errors) {
    console.log(`  [${e.type}] ${e.slug}: ${e.error}`);
  }
}

// Check for articles with null/undefined category (would cause issues in getArticlesByCategory)
const badCategory = articles.filter(a => !a.category);
console.log('\nArticles with missing category:', badCategory.length);
if (badCategory.length > 0) {
  badCategory.forEach(a => console.log('  ', a.slug, '-> category:', JSON.stringify(a.category)));
}

// Check for articles with short content (will use generateArticleContent fallback)
const shortContent = articles.filter(a => !a.content || a.content.trim().length <= 200);
console.log('Articles with short/empty content (use fallback renderer):', shortContent.length);
if (shortContent.length > 0) {
  shortContent.forEach(a => console.log('  ', a.slug, '-> content length:', a.content ? a.content.trim().length : 0));
}
