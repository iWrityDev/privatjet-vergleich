const fs = require('fs');
const text = fs.readFileSync('src/data/articles.ts', 'utf8');

// Find the area between privatjet-singapur-bangkok and privatjet-moskau-london
const slug1 = 'privatjet-singapur-bangkok-kosten-2026';
const slug2 = 'privatjet-moskau-london-kosten-2026';

const pos1 = text.indexOf(slug1);
const pos2 = text.indexOf(slug2);
console.log('=== Between singapur-bangkok and moskau-london ===');
console.log('slug1 at:', pos1, 'slug2 at:', pos2);
if (pos1 !== -1 && pos2 !== -1) {
  const between = text.slice(pos1 + slug1.length, pos2);
  console.log('Length between:', between.length);
  console.log('Content between (first 500 chars):');
  console.log(between.slice(0, 500));
  console.log('\nContent between (last 200 chars):');
  console.log(between.slice(-200));
}

console.log('\n=== Between frankfurt-nurnberg and stuttgart-leipzig ===');
const slug3 = 'privatjet-frankfurt-nurnberg-kosten-2026';
const slug4 = 'privatjet-stuttgart-leipzig-kosten-2026';
const pos3 = text.indexOf(slug3);
const pos4 = text.indexOf(slug4);
console.log('slug3 at:', pos3, 'slug4 at:', pos4);
if (pos3 !== -1 && pos4 !== -1) {
  const between = text.slice(pos3 + slug3.length, pos4);
  console.log('Length between:', between.length);
  console.log('Content between (first 500 chars):');
  console.log(between.slice(0, 500));
  console.log('\nContent between (last 200 chars):');
  console.log(between.slice(-200));
}
