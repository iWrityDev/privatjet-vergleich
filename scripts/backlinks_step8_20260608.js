// Step 8: Internal back-links to new articles
// New articles: privatjet-fuer-16-personen-kosten + privatjet-mykonos-charter-kosten
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

let insertions = [];

// Helper: insert a sentence into the content of an existing article
// Find a paragraph containing 'searchPhrase' and append the linkSentence to the paragraph
function insertLinkInArticle(hostSlug, searchPhrase, linkSentence) {
  const slugIdx = content.indexOf('"' + hostSlug + '"');
  if (slugIdx === -1) { console.error('HOST SLUG NOT FOUND:', hostSlug); return false; }

  const contentStart = content.indexOf('content: `', slugIdx);
  if (contentStart === -1) {
    // Try with double-quote content
    const contentStart2 = content.indexOf('content: ""', slugIdx);
    if (contentStart2 !== -1) { console.error('Article has empty content:', hostSlug); return false; }
    console.error('No content field for:', hostSlug); return false;
  }

  // Search for the phrase within the content
  const searchFrom = contentStart;
  const phraseIdx = content.indexOf(searchPhrase, searchFrom);
  if (phraseIdx === -1) {
    console.error('Search phrase not found in', hostSlug, ':', searchPhrase.substring(0, 50));
    return false;
  }

  // Find the end of the paragraph containing this phrase
  const paraEnd = content.indexOf('</p>', phraseIdx);
  if (paraEnd === -1) { console.error('No closing </p> after phrase in', hostSlug); return false; }

  // Make sure we're still inside the content field (before the next slug)
  const nextSlugIdx = content.indexOf('slug:', phraseIdx + 100);
  if (nextSlugIdx !== -1 && paraEnd > nextSlugIdx) {
    console.error('Insertion point outside content for', hostSlug);
    return false;
  }

  // Insert the link sentence before </p>
  content = content.substring(0, paraEnd) + ' ' + linkSentence + content.substring(paraEnd);
  console.log('Inserted link in', hostSlug, 'near phrase:', searchPhrase.substring(0, 40));
  insertions.push({ hostSlug, targetSlug: linkSentence.match(/\/ratgeber\/([^"]+)"/)?.[1] || '?', linkSentence: linkSentence.substring(0, 80) });
  return true;
}

// ============================================================
// Links TO privatjet-fuer-16-personen-kosten
// ============================================================

// 1. privatjet-gruppe-charter -> 16-personen (already has count 1 to 12-personen, max is 3 so ok)
insertLinkInArticle(
  'privatjet-gruppe-charter',
  'Privatjet für 12 bis 19 Personen', // search phrase in this article
  'Einen ausführlichen Guide speziell für Gruppen bis 16 Passagiere finden Sie in unserem Ratgeber zu <a href="/ratgeber/privatjet-fuer-16-personen-kosten">Privatjet für 16 Personen: Kosten und Flugzeugwahl</a>.'
);
// Fallback if first phrase not found
insertLinkInArticle(
  'privatjet-gruppe-charter',
  'Gruppen mit mehr als',
  'Einen ausführlichen Guide speziell für Gruppen bis 16 Passagiere finden Sie in unserem Ratgeber zu <a href="/ratgeber/privatjet-fuer-16-personen-kosten">Privatjet für 16 Personen: Kosten und Flugzeugwahl</a>.'
);

// 2. privatjet-fuer-12-personen-kosten -> 16-personen
insertLinkInArticle(
  'privatjet-fuer-12-personen-kosten',
  'Challenger 650',
  'Wer noch mehr Passagiere transportieren möchte, findet alle Details im Ratgeber zu <a href="/ratgeber/privatjet-fuer-16-personen-kosten">Privatjet für 16 Personen: Kosten 2026</a>.'
);

// 3. privatjet-fuer-10-personen-kosten -> 16-personen
insertLinkInArticle(
  'privatjet-fuer-10-personen-kosten',
  'Midsize Jet',
  'Für größere Gruppen bis 16 Personen zeigt unser Vergleich <a href="/ratgeber/privatjet-fuer-16-personen-kosten">Privatjet für 16 Personen</a>, welche Flugzeuge infrage kommen und was das pro Kopf kostet.'
);

// ============================================================
// Links TO privatjet-mykonos-charter-kosten
// ============================================================

// 4. privatjet-mykonos-sommer -> mykonos-charter-kosten
insertLinkInArticle(
  'privatjet-mykonos-sommer',
  'JMK',
  'Eine vollständige Kostenübersicht nach Abflugort und Saison liefert unser neuer Ratgeber <a href="/ratgeber/privatjet-mykonos-charter-kosten">Privatjet nach Mykonos: Kosten ab Frankfurt, München und Wien</a>.'
);

// 5. privatjet-ibiza-kosten -> mykonos-charter-kosten
insertLinkInArticle(
  'privatjet-ibiza-kosten',
  'Ibiza',
  'Eine vergleichbare Saisonalität und ähnliche Preislogik gilt auch für die griechischen Inseln, wie unser Ratgeber zu <a href="/ratgeber/privatjet-mykonos-charter-kosten">Privatjet nach Mykonos: Kosten 2026</a> zeigt.'
);

// 6. privatjet-kroatien-sommer -> mykonos-charter-kosten
insertLinkInArticle(
  'privatjet-kroatien-sommer',
  'Mykonos',
  'Wer statt der Adria die griechischen Inseln bevorzugt, findet alle Kosten im Ratgeber <a href="/ratgeber/privatjet-mykonos-charter-kosten">Privatjet nach Mykonos Charter Kosten 2026</a>.'
);

// Write result
fs.writeFileSync(filePath, content, 'utf8');
console.log('\nFile written. Total length:', content.length);
console.log('\nInsertions summary:');
insertions.forEach(i => console.log(' -', i.hostSlug, '->', i.targetSlug));
console.log('Total insertions:', insertions.length);
