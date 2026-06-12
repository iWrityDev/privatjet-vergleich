const fs = require('fs');
let text = fs.readFileSync('src/data/articles.ts', 'utf8');

console.log('File size:', text.length);

// Fix 1: Between singapur-bangkok and moskau-london
// Pattern: content close backtick + `,\n  },,\n    {\n`
// Found: `  },,\n    {\n    slug: "privatjet-moskau-london`
const hole1pattern = '},\n    {\n    slug: "privatjet-moskau-london';
const hole1fix = '},\n  {\n    slug: "privatjet-moskau-london';

// Actually let me find the exact double comma pattern
const dcomma1 = text.indexOf('},,,');
const dcomma1b = text.indexOf('},,\n');
const dcomma1c = text.indexOf('},,\r\n');

console.log('Double comma patterns:');
console.log('  },,, at:', dcomma1);
console.log('  },,\\n at:', dcomma1b);
console.log('  },,\\r\\n at:', dcomma1c);

// Find the actual patterns from the output
// Pattern 1: "  },,\n    {\n    slug: "
const p1 = text.indexOf('},,,');
const p2 = text.indexOf('},,\n');
const p2r = text.indexOf('},,\r\n');

// Also check for ",\n," pattern (comma, newline, comma)
const p3 = text.indexOf(',\n,');
const p3r = text.indexOf(',\r\n,');

console.log('  ,\\n, at:', p3);
console.log('  ,\\r\\n, at:', p3r);

// Fix each occurrence
let fixCount = 0;

// Fix ,\n, pattern
while (true) {
  const pos = text.indexOf(',\r\n,');
  if (pos === -1) break;
  console.log('Fixing ,\\r\\n, at:', pos);
  console.log('Context:', JSON.stringify(text.slice(pos - 10, pos + 30)));
  text = text.slice(0, pos) + ',\r\n' + text.slice(pos + 4);
  fixCount++;
}

while (true) {
  const pos = text.indexOf(',\n,');
  if (pos === -1) break;
  console.log('Fixing ,\\n, at:', pos);
  console.log('Context:', JSON.stringify(text.slice(pos - 10, pos + 30)));
  text = text.slice(0, pos) + ',\n' + text.slice(pos + 3);
  fixCount++;
}

// Fix },,\n pattern (double comma after closing brace)
while (true) {
  const pos = text.indexOf('},,');
  if (pos === -1) break;
  console.log('Fixing },, at:', pos);
  console.log('Context:', JSON.stringify(text.slice(pos - 5, pos + 20)));
  text = text.slice(0, pos) + '},' + text.slice(pos + 3);
  fixCount++;
}

console.log('\nTotal fixes applied:', fixCount);

fs.writeFileSync('src/data/articles.ts', text, 'utf8');
console.log('File written. New size:', text.length);
