import { articles } from './src/data/articles.ts';

console.log('Total articles:', articles.length);

// Find null/undefined articles
for (let i = 0; i < articles.length; i++) {
  const a = articles[i];
  if (a === null || a === undefined) {
    console.log(`Article[${i}] is ${a === null ? 'NULL' : 'UNDEFINED'}`);
    // Show surrounding articles
    if (i > 0) console.log(`  Previous: ${articles[i-1]?.slug}`);
    if (i < articles.length - 1) console.log(`  Next: ${articles[i+1]?.slug}`);
  } else if (!a.slug || !a.title || !a.category || !a.publishedDate || !a.readingMinutes) {
    console.log(`Article[${i}] has missing fields:`, {
      slug: a.slug,
      title: !!a.title,
      category: !!a.category,
      publishedDate: !!a.publishedDate,
      readingMinutes: !!a.readingMinutes,
    });
  }
}
console.log('Scan complete');
