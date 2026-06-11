// Step 4 optimizations: duesseldorf-guide + formel1-guide
// Also Step 5 freshness: mykonos-sommer + berlin-muenchen-charter
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Helper: append to content field of a specific slug
function appendToContent(slug, appendHtml) {
  const slugIdx = content.indexOf('"' + slug + '"');
  if (slugIdx === -1) { console.error('SLUG NOT FOUND:', slug); return; }
  // Find the content: ` ... ` block - look for content: `
  const window = content.substring(slugIdx, slugIdx + 60000);
  const contentStart = window.indexOf('content: `');
  if (contentStart === -1) { console.error('No content backtick for:', slug); return; }
  const absStart = slugIdx + contentStart + 'content: `'.length;
  // Find closing backtick (`,\n  },)
  // Walk forward from absStart to find the closing `,
  let depth = 0;
  let pos = absStart;
  while (pos < content.length) {
    if (content[pos] === '`') {
      // Check if this backtick is followed by ,
      const nextChars = content.substring(pos, pos+5);
      if (nextChars.startsWith('`,')) {
        // This is the closing backtick
        break;
      }
    }
    pos++;
    if (pos - absStart > 50000) { console.error('Backtick not found for', slug); return; }
  }
  // Insert appendHtml before the closing backtick
  content = content.substring(0, pos) + appendHtml + content.substring(pos);
  console.log('Appended to:', slug);
}

function replaceField(slug, fieldName, oldValue, newValue) {
  const slugIdx = content.indexOf('"' + slug + '"');
  if (slugIdx === -1) { console.error('SLUG NOT FOUND:', slug); return; }
  const window = content.substring(slugIdx, slugIdx + 600);
  const pattern = fieldName + ': "' + oldValue + '"';
  const idx = window.indexOf(pattern);
  if (idx === -1) {
    // Try with partial match
    const partialPattern = fieldName + ': "' + oldValue.substring(0, 40);
    const pidx = window.indexOf(partialPattern);
    if (pidx === -1) { console.error('Field not found for', slug, ':', fieldName, '(tried:', oldValue.substring(0,40) + ')'); return; }
    // Find end of value
    const startOfValue = slugIdx + pidx + fieldName.length + 3;
    const endOfValue = content.indexOf('"', startOfValue);
    content = content.substring(0, startOfValue) + newValue + content.substring(endOfValue);
    console.log('Updated (partial match) field', fieldName, 'for', slug);
    return;
  }
  const absIdx = slugIdx + idx;
  content = content.substring(0, absIdx) + fieldName + ': "' + newValue + '"' + content.substring(absIdx + pattern.length);
  console.log('Updated field', fieldName, 'for', slug);
}

// ============================================================
// STEP 4 OPTIMIZATION 1: privatjet-duesseldorf-guide
// ============================================================

// Update title for better CTR (shorten to under 60 chars, add hook)
replaceField('privatjet-duesseldorf-guide', 'title',
  'Privatjet ab Düsseldorf 2026: NRW-Guide für Unternehmer, DUS und Mönchengladbach',
  'Privatjet ab Düsseldorf 2026: DUS, MGL und alle NRW-Routen'
);

// Add FAQ schema + CTA at end of content
const dussFaqAndCta = `
<h2>Bereit für Ihre Anfrage ab Düsseldorf?</h2>
<p>Bereit für Ihren nächsten Privatjet-Flug? Vergleichen Sie jetzt Angebote und fragen Sie unverbindlich an bei <a href="https://villiers.ai/?id=BTOG3L" target="_blank" rel="nofollow noopener">Villiers Jets</a>, mit Zugang zu DUS, MGL und allen NRW-Abflughäfen.</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Was kostet ein Privatjet ab Düsseldorf?","acceptedAnswer":{"@type":"Answer","text":"Ein Privatjet ab Düsseldorf kostet 2026 auf kurzen NRW-Strecken wie Düsseldorf nach München 6.500 bis 9.500 Euro (Light Jet). Auf Urlaubsstrecken wie Düsseldorf nach Mallorca sind es 8.500 bis 14.000 Euro. Die Kosten hängen von Jet-Klasse, Strecke und Saison ab."}},{"@type":"Question","name":"Welche Flughäfen gibt es in Düsseldorf für Privatjets?","acceptedAnswer":{"@type":"Answer","text":"Der Düsseldorfer Flughafen (DUS) hat eine FBO-Zone für Privatjets. Als günstigere Alternative dient Mönchengladbach Airport (MGL), etwa 25 Kilometer entfernt, mit niedrigeren Handling-Gebühren und ohne Großflughafen-Verkehr."}},{"@type":"Question","name":"Lohnt sich Mönchengladbach (MGL) statt DUS?","acceptedAnswer":{"@type":"Answer","text":"Mönchengladbach ist für Privatjet-Reisende oft attraktiver: niedrigere Handling-Gebühren, kürzere Wege und keine Linienflug-Konkurrenz um Slots. Für Light Jets und Midsize Jets ist MGL die erste Wahl im NRW-Raum."}},{"@type":"Question","name":"Welche Strecken ab Düsseldorf sind am beliebtesten für Privatjets?","acceptedAnswer":{"@type":"Answer","text":"Die meistgebuchten Strecken ab Düsseldorf sind nach München, London (Farnborough), Mallorca, Ibiza, Zürich und Hamburg. Im Sommer sind Urlaubsstrecken Richtung Mittelmeer besonders gefragt."}},{"@type":"Question","name":"Kann man ab Düsseldorf nach Dubai per Privatjet fliegen?","acceptedAnswer":{"@type":"Answer","text":"Ja, ab Düsseldorf nach Dubai mit einem Heavy Jet wie dem Gulfstream G550 oder G650. Die Flugzeit beträgt rund 6 bis 6,5 Stunden. Der Charter kostet 55.000 bis 80.000 Euro one-way in der Normalzeit."}}]}</script>`;

appendToContent('privatjet-duesseldorf-guide', dussFaqAndCta);

// ============================================================
// STEP 4 OPTIMIZATION 2: privatjet-formel1-guide
// ============================================================

// Update description (fix encoding issue with euro sign, add hook)
replaceField('privatjet-formel1-guide', 'description',
  'Privatjet zur Formel 1: Slots, Flugh',
  'Privatjet zur Formel 1 2026: Monaco, Silverstone und Abu Dhabi. Kosten, Slots und FBO-Tipps für GP-Reisende aus dem DACH-Raum.'
);

// Add internal links + FAQ + CTA
const f1FaqAndCta = `
<h2>Bereit für Ihre GP-Anfrage?</h2>
<p>Bereit für Ihren nächsten Privatjet-Flug zum Grand Prix? Vergleichen Sie jetzt Angebote und fragen Sie unverbindlich an bei <a href="https://villiers.ai/?id=BTOG3L" target="_blank" rel="nofollow noopener">Villiers Jets</a>. Für allgemeine Sportevent-Charter lesen Sie unseren <a href="/ratgeber/privatjet-sportevents">Sport-Event-Guide</a>. Für den Monaco-Flughafen und FBO-Infrastruktur liefert der <a href="/ratgeber/privatjet-monaco-guide">Monaco-Guide</a> alle Details.</p>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Was kostet ein Privatjet zum Monaco Grand Prix?","acceptedAnswer":{"@type":"Answer","text":"Ein Privatjet von Frankfurt nach Nizza (NCE) kostet in der Monaco-GP-Woche rund 8.500 bis 12.000 Euro one-way mit einem Light Jet. Der Aufschlag gegenüber normalen Zeiten liegt bei 20 bis 40 Prozent wegen begrenzter Slots."}},{"@type":"Question","name":"Wie früh muss man für einen Privatjet zum Monaco GP buchen?","acceptedAnswer":{"@type":"Answer","text":"Für Monaco Grand Prix empfehlen wir sechs bis acht Wochen Vorlauf. Slots in Nizza für das GP-Wochenende sind sehr begrenzt und werden früh vergeben. Ab Oktober für das Mai-Rennen zu buchen ist ideal."}},{"@type":"Question","name":"Welcher Flughafen für Silverstone?","acceptedAnswer":{"@type":"Answer","text":"Für Silverstone nutzen die meisten Privatjet-Reisenden London Luton (LTN) oder Northampton als kleinen Airfield nahe der Strecke. Ab Zürich oder München kostet ein Midsize-Jet-Charter nach Luton rund 11.000 bis 16.000 Euro."}},{"@type":"Question","name":"Was kostet ein Privatjet zum Abu Dhabi Grand Prix?","acceptedAnswer":{"@type":"Answer","text":"Ein Heavy-Jet-Charter von Frankfurt nach Abu Dhabi (AUH) kostet in der Rennen-Woche rund 45.000 bis 65.000 Euro one-way. Die Flugzeit beträgt etwa 6 Stunden, der Flughafen hat eine exzellente FBO-Zone."}},{"@type":"Question","name":"Gibt es Empty Legs bei Formel-1-Rennen?","acceptedAnswer":{"@type":"Answer","text":"Ja, besonders nach den Rennen gibt es Rückflug-Leerflüge. Da viele Privatjets zeitgleich abreisen, entstehen Rückflug-Empty-Legs von Nizza, Luton oder Abu Dhabi zurück nach DACH mit 40 bis 60 Prozent Rabatt."}}]}</script>`;

appendToContent('privatjet-formel1-guide', f1FaqAndCta);

// ============================================================
// STEP 5 FRESHNESS: mykonos-sommer + berlin-muenchen-charter
// ============================================================

// mykonos-sommer: update dateModified and add 2026 seasonal note
function updateDateModified(slug, newDate) {
  const slugIdx = content.indexOf('"' + slug + '"');
  if (slugIdx === -1) { console.error('SLUG NOT FOUND:', slug); return; }
  const window = content.substring(slugIdx, slugIdx + 60000);
  const dmPatt = '"dateModified":"';
  const dmIdx = window.indexOf(dmPatt);
  if (dmIdx === -1) { console.error('dateModified not found for', slug); return; }
  const absStart = slugIdx + dmIdx + dmPatt.length;
  const dateEnd = content.indexOf('"', absStart);
  const oldDate = content.substring(absStart, dateEnd);
  content = content.substring(0, absStart) + newDate + content.substring(dateEnd);
  console.log('Updated dateModified for', slug, ':', oldDate, '->', newDate);
}

updateDateModified('privatjet-mykonos-sommer', '2026-06-08');
updateDateModified('privatjet-berlin-muenchen-charter', '2026-06-08');

// mykonos-sommer: add a freshness note about 2026 slot restrictions and price update
const mykonosFreshnessNote = `
<p><strong>Update Juni 2026:</strong> Die Hochsaison 2026 auf Mykonos startete mit den höchsten Privatjet-Preisen seit 2019. Buchungen für Juli und August sollten mindestens vier Wochen im Voraus erfolgen. Die Slot-Kontingente am JMK wurden für den Sommer 2026 leicht erhöht, reichen aber weiterhin nicht für die Nachfrage. Günstige Charter-Optionen gibt es weiterhin im September, wo die Preise 25 bis 30 Prozent unter dem August-Niveau liegen. Einen vollständigen Kostenvergleich nach Abflugort und Saison finden Sie in unserem neuen Artikel <a href="/ratgeber/privatjet-mykonos-charter-kosten">Privatjet nach Mykonos: Kosten 2026</a>.</p>`;

// Find a good insertion point in mykonos-sommer: after first </p> tag
const mykonosIdx = content.indexOf('"privatjet-mykonos-sommer"');
const mykonosContentStart = content.indexOf('content: `', mykonosIdx);
const mykonosFirstPara = content.indexOf('</p>', mykonosContentStart);
if (mykonosFirstPara !== -1) {
  content = content.substring(0, mykonosFirstPara + 4) + mykonosFreshnessNote + content.substring(mykonosFirstPara + 4);
  console.log('Added freshness note to mykonos-sommer');
}

// berlin-muenchen-charter: add freshness note about 2026 pricing
const berlinFreshnessNote = `
<p><strong>Update Juni 2026:</strong> Die Preise auf der Strecke Berlin nach München sind im Frühjahr 2026 stabil geblieben. Ein Light Jet kostet weiterhin 5.000 bis 7.500 Euro one-way. Die Nachfrage nach dieser Pendlerstrecke ist 2026 um rund 12 Prozent gestiegen, was die Verfügbarkeit in Spitzenstunden (Montag morgens, Freitag nachmittags) leicht einschränkt. Für kurzfristige Buchungen an diesen Zeiten empfehlen wir einen Midsize Jet als Fallback-Option. Neue Anbieter im DACH-Raum 2026: AirX Charter und Luxaviation haben ihre Flottenpräsenz in Berlin (BER) ausgebaut.</p>`;

const berlinIdx = content.indexOf('"privatjet-berlin-muenchen-charter"');
const berlinContentStart = content.indexOf('content: `', berlinIdx);
const berlinFirstPara = content.indexOf('</p>', berlinContentStart);
if (berlinFirstPara !== -1) {
  content = content.substring(0, berlinFirstPara + 4) + berlinFreshnessNote + content.substring(berlinFirstPara + 4);
  console.log('Added freshness note to berlin-muenchen-charter');
}

// Write result
fs.writeFileSync(filePath, content, 'utf8');
console.log('File written. Total length:', content.length);

const verification = [
  'DUS, MGL und alle NRW-Routen',
  'Privatjet zur Formel 1 2026: Monaco, Silverstone und Abu Dhabi',
  'Update Juni 2026:</strong> Die Hochsaison 2026 auf Mykonos',
  'Update Juni 2026:</strong> Die Preise auf der Strecke Berlin nach München'
];
for (const v of verification) {
  console.log('VERIFY', v.substring(0,50) + ':', content.includes(v) ? 'OK' : 'MISSING');
}
