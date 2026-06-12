const fs = require('fs');
const text = fs.readFileSync('src/data/articles.ts', 'utf8');
const slugPos = text.indexOf('slug: `privatjet-muenchen-dubai-kosten`');
const contentPos = text.indexOf('content: "', slugPos);
console.log('content: " at char:', contentPos);
// Find the closing quote (the next double quote after contentPos + 10)
let end = contentPos + 10;
while (end < text.length) {
  if (text[end] === '"') break;
  end++;
}
console.log('First closing quote at char:', end);
const contentStr = text.slice(contentPos + 10, end);
console.log('Content length:', contentStr.length);
console.log('Content:', contentStr.slice(0, 800));
console.log('');
// Show what comes after the closing quote
console.log('After closing quote:', JSON.stringify(text.slice(end, end + 200)));
