const fs = require('fs');
const text = fs.readFileSync('src/data/articles.ts', 'utf8');

// Extract all slugs
const slugs = [];
let pos = 0;
while (true) {
  const sp = text.indexOf('slug:', pos);
  if (sp === -1) break;
  // Find the value after slug:
  const after = text.slice(sp + 5).trimStart();
  let val = '';
  if (after.startsWith('"') || after.startsWith("'") || after.startsWith('`')) {
    const q = after[0];
    const end = after.indexOf(q, 1);
    val = after.slice(1, end);
  }
  if (val && val.length > 3 && !val.includes(' ')) {
    slugs.push(val);
  }
  pos = sp + 5;
}
// Remove duplicates
const unique = [...new Set(slugs)];
console.log('Total unique slugs:', unique.length);

// Find slugs containing 'hamburg', 'ibiza', 'koeln', 'berlin'
const hamburg = unique.filter(s => s.includes('hamburg'));
const ibiza = unique.filter(s => s.includes('ibiza'));
const koeln = unique.filter(s => s.includes('koeln'));
const berlin = unique.filter(s => s.includes('berlin'));
const leer = unique.filter(s => s.includes('leer') || s.includes('empty'));
const inland = unique.filter(s => s.includes('inland') || s.includes('strecke') || s.includes('deutsch'));

console.log('\nHamburg slugs:', hamburg);
console.log('\nIbiza slugs:', ibiza);
console.log('\nKoeln slugs:', koeln);
console.log('\nBerlin slugs:', berlin);
console.log('\nLeer/empty slugs:', leer.slice(0, 5));
console.log('\nInland slugs:', inland.slice(0, 5));
