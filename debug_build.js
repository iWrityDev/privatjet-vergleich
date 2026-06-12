/**
 * Simulate what Next.js does when collecting page data for /ratgeber/[slug]
 * Uses the compiled articles chunk to get exact article data
 */
const fs = require('fs');
const path = require('path');

// Read the compiled articles chunk
const chunkPath = path.join(__dirname, '.next/server/chunks/ssr/src_data_articles_ts_06jfo35._.js');
const chunkSrc = fs.readFileSync(chunkPath, 'utf8');

// Extract the module function content
// Format: module.exports=[10327,a=>{"use strict";let b=[...];...}];
// We need to execute it to get the articles
const moduleRegistry = {};
const mockRequire = (id) => moduleRegistry[id] || {};

// Create a fake turbopack module system
function loadModule(src) {
  // The chunk has format: module.exports=[id, fn];
  // We need to execute fn with a mock exports object
  const match = src.match(/module\.exports=\[(\d+),([^]*)\];?\s*\/\//);
  if (!match) {
    console.error('Could not parse module format');
    return null;
  }

  const moduleId = parseInt(match[1]);
  const fnSrc = match[2];

  // Create the module
  const exports = {};
  const module = { exports };

  try {
    // The fn takes (a) where a is the exports object
    const fn = eval('(' + fnSrc + ')');
    fn(exports);
    return exports;
  } catch (e) {
    console.error('Error executing module:', e.message);
    // Try alternative approach: parse the articles from the source
    return null;
  }
}

// Alternative: extract articles array directly from the source
function extractArticles(src) {
  // Find where articles array starts
  const match = src.match(/let b=(\[.*\]);?\s*function/s);
  if (match) {
    try {
      return eval(match[1]);
    } catch(e) {
      console.error('Could not eval articles array:', e.message);
    }
  }
  return null;
}

let articles = null;
const mod = loadModule(chunkSrc);
if (mod && mod.articles) {
  articles = mod.articles;
  console.log('Loaded articles from module exports:', articles.length);
} else {
  // Manual extraction
  articles = extractArticles(chunkSrc);
  if (articles) {
    console.log('Extracted articles from source:', articles.length);
  }
}

if (!articles) {
  // Fallback: try to count by slugs
  const slugMatches = chunkSrc.match(/slug:"[^"]+"/g);
  console.log('Found slugs in compiled chunk:', slugMatches ? slugMatches.length : 0);
  process.exit(1);
}

// Simulate page.tsx operations for each article
console.log('\nTesting all', articles.length, 'articles...\n');

const errors = [];
for (const article of articles) {
  try {
    // Test 1: Basic field access
    const slug = article.slug;
    const title = article.title;
    const description = article.description;
    const category = article.category;
    const readingMinutes = article.readingMinutes;
    const publishedDate = article.publishedDate;
    const content = article.content;

    // Test 2: Date formatting (like toLocaleDateString)
    const dateFormatted = new Date(publishedDate).toLocaleDateString('de-DE', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Test 3: content check
    const useHtml = content && content.trim().length > 200;

    // Test 4: generateMetadata equivalent
    const metadata = { title, description };

    // Test 5: JSON.stringify for JSON-LD
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      datePublished: publishedDate,
      dateModified: publishedDate,
      publisher: { '@type': 'Organization', name: 'Privatjet Vergleich', url: 'https://privatjet-vergleich.de' }
    });

    // Test 6: Object.keys on the article itself
    Object.keys(article);

    // Test 7: getArticlesByCategory equivalent
    const related = articles.filter(a => a.category === category && a.slug !== slug).slice(0, 4);

    // Test 8: Object.keys on each related article
    for (const rel of related) {
      Object.keys(rel);
      const relHref = `/ratgeber/${rel.slug}`;
    }

    // Test 9: generateArticleContent equivalent (for short/empty content)
    if (!useHtml) {
      const isKosten = category === 'Kosten';
      const isReiseziel = category === 'Reiseziele';
      const contentFallback = title.toLowerCase();  // This would throw if title is null
    }

  } catch (e) {
    errors.push({ slug: article.slug, error: e.message, type: e.constructor.name });
  }
}

if (errors.length === 0) {
  console.log('All articles passed simulation!');
} else {
  console.log('ERRORS FOUND:', errors.length);
  errors.forEach(e => {
    console.log(`  slug: ${e.slug}`);
    console.log(`  error: [${e.type}] ${e.error}`);
    console.log('');
  });
}

// Extra: check for null articles in the array
const nullArticles = articles.filter(a => a === null || a === undefined);
console.log('\nNull/undefined articles in array:', nullArticles.length);

// Extra: check for missing required fields
const missingFields = articles.filter(a => !a.slug || !a.title || !a.category || !a.publishedDate);
console.log('Articles with missing required fields:', missingFields.length);
if (missingFields.length > 0) {
  missingFields.forEach(a => {
    console.log(`  slug: ${a.slug}, title: ${!!a.title}, category: ${!!a.category}, publishedDate: ${!!a.publishedDate}`);
  });
}
