"""
Fix koeln-frankfurt-privatjet-2026: missing closing backtick causing parse failure.
The article's content template literal never closes, causing privatjet-london-dubai's
header to be embedded as text. Fix: write proper content + restructure the template literal.
"""

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

# Find the koeln-frankfurt content opening
slug_pos = text.find('slug: "koeln-frankfurt-privatjet-2026"')
content_field_pos = text.find('content: `', slug_pos)
content_start = content_field_pos + len('content: `')  # position right after opening backtick

# The next backtick closes the broken template literal
next_tick = text.find('`', content_start)  # position 26123 = opening of privatjet-london-dubai's content
print(f"Content opens at {content_start}, next backtick at {next_tick} (diff: {next_tick-content_start})")

# The text between the two backticks (947 chars) contains:
# - Old JSON-LD tag for koeln-frankfurt
# - Then: \n  },\n  {\n    slug: "privatjet-london-dubai",\n    ...content:
old_range = text[content_start:next_tick]

# Find where privatjet-london-dubai's structure starts within the range
sep_pos = old_range.find('\n  },\n  {')
print(f"Separator position in range: {sep_pos}")
print(f"Old JSON-LD content: {repr(old_range[:sep_pos])[:100]}")
print(f"Trailing structure: {repr(old_range[sep_pos:])}")

# New proper content for koeln-frankfurt-privatjet-2026
new_koeln_frankfurt = r"""<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Privatjet Koeln/Bonn nach Frankfurt: Kosten, Flugzeit und Buchung 2026","datePublished":"2026-06-11","dateModified":"2026-06-12","author":{"@type":"Organization","name":"Privatjet-Vergleich"},"description":"Privatjet Koeln nach Frankfurt 2026: Flugzeit 25 Minuten, Kosten 1.800-4.000 EUR, Turboprop vs. Light Jet und warum diese Kurzstrecke Sinn ergibt.","url":"https://www.privatjet-vergleich.de/ratgeber/koeln-frankfurt-privatjet-2026","inLanguage":"de-DE"}</script>
<p class="disclosure"><em>Hinweis: Dieser Artikel enthaelt Partnerlinks zu Villiers Jets. Bei einer Buchung ueber diese Links erhalten wir eine Provision ohne zusaetzliche Kosten fuer Sie.</em></p>
<div style="background:#f3f0e6;border-left:4px solid #c9a84c;padding:16px 20px;margin-bottom:24px;border-radius:8px;"><strong>Kurzfazit:</strong> Ein Privatjet von Koeln/Bonn nach Frankfurt kostet 2026 zwischen 1.800 und 4.000 EUR fuer das gesamte Flugzeug. Die Flugzeit betraegt nur 20 bis 25 Minuten. Diese 150-km-Verbindung ergibt bei Gruppen ab 4 Personen, extremem Zeitdruck oder fehlendem Bahnzugang wirtschaftlich Sinn. Als Einzelperson ist der ICE (55 Minuten) die nuechterne Alternative.</div>
<h2>Koeln nach Frankfurt: Deutschlands kuerzeste Privatjet-Businessroute</h2>
<p>Mit 150 Kilometer Luftlinie ist die Strecke Koeln/Bonn (CGN) nach Frankfurt (FRA) eine der kuerzesten ueberhaupt, die noch regelmaeßig von Privatjets geflogen wird. Auf der Schiene braucht der ICE rund 55 Minuten. Auf der Straße dauert die A3-Fahrt je nach Stau zwischen 1,5 und 2,5 Stunden. Und der Privatjet? Reine Flugzeit: 20 bis 25 Minuten.</p>
<p>Das klingt nach einem schlechten Witz, ist es aber nicht. Die Strecke Koeln-Frankfurt verbindet zwei der bedeutendsten Wirtschaftszentren Deutschlands: Das Rheinland mit seinen Medienkonzernen, Versicherungsgesellschaften und Pharmaunternehmen auf der einen Seite, den deutschen Finanzplatz mit EZB, Deutsche Bank und einem der groessten Flughaefen Europas auf der anderen. Wer woechentlich zwischen diesen Standorten pendelt und Zeit als Kapital versteht, prueft alle Optionen.</p>
<h2>Wann ergibt der Privatjet auf dieser Strecke Sinn?</h2>
<p>Ehrliche Antwort: Nicht fuer Einzelreisende. Ein ICE-Einzelticket First Class kostet 80 bis 150 EUR. Kein Privatjet schlaegt das auf einer 55-Minuten-Fahrt, bei der man gut arbeiten kann. Wo der Privatjet aber konkurrenzfaehig ist:</p>
<ul>
<li><strong>Gruppen ab 4 bis 6 Personen:</strong> Bei 4 Personen liegen die Pro-Kopf-Kosten eines Turboprops bei 450 bis 600 EUR. Das ist teuer, aber nicht astronomisch, wenn jede Stunde der Gruppe 500 EUR oder mehr wert ist.</li>
<li><strong>Termingebundene Fruehfluege:</strong> Wenn das Meeting um 7:30 Uhr beginnt und der frueheste ICE um 5:45 faehrt, bietet ein 6:15-Privatjet mehr Spielraum.</li>
<li><strong>Stau-Arbitrage:</strong> Die A3 ist eine der stauanfaelligsten Autobahnen Deutschlands. An schlechten Tagen dauert die Fahrt 3 Stunden. Der Privatjet ignoriert diese Variable.</li>
<li><strong>Kombinationsreisen:</strong> Wer morgens Koeln-Frankfurt und nachmittags Frankfurt-London bucht, kann beide Schritte als Einheit chartern und spart Repositionierungskosten.</li>
</ul>
<h2>Flugzeugklassen und Kosten 2026</h2>
<p>Auf einer Kurzstrecke wie Koeln-Frankfurt sind groessere Jets ungewoehnlich. Die Strecke ist ideal fuer Turboprops und Light Jets:</p>
<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
<thead><tr style="background:#c9a84c;color:#fff;"><th style="padding:10px;text-align:left;">Flugzeugklasse</th><th style="padding:10px;text-align:left;">Beispiel-Typ</th><th style="padding:10px;text-align:left;">Passagiere</th><th style="padding:10px;text-align:left;">Preis CGN-FRA (ca.)</th><th style="padding:10px;text-align:left;">Flugzeit</th></tr></thead>
<tbody>
<tr style="background:#faf8f3;"><td style="padding:10px;border:1px solid #e0d5b7;">Turboprop</td><td style="padding:10px;border:1px solid #e0d5b7;">Pilatus PC-12</td><td style="padding:10px;border:1px solid #e0d5b7;">bis 6</td><td style="padding:10px;border:1px solid #e0d5b7;">1.800 - 2.500 EUR</td><td style="padding:10px;border:1px solid #e0d5b7;">ca. 25 Min.</td></tr>
<tr style="background:#fff;"><td style="padding:10px;border:1px solid #e0d5b7;">Very Light Jet</td><td style="padding:10px;border:1px solid #e0d5b7;">Phenom 100, Citation M2</td><td style="padding:10px;border:1px solid #e0d5b7;">bis 4</td><td style="padding:10px;border:1px solid #e0d5b7;">2.000 - 3.000 EUR</td><td style="padding:10px;border:1px solid #e0d5b7;">ca. 22 Min.</td></tr>
<tr style="background:#faf8f3;"><td style="padding:10px;border:1px solid #e0d5b7;">Light Jet</td><td style="padding:10px;border:1px solid #e0d5b7;">Citation CJ3, Phenom 300</td><td style="padding:10px;border:1px solid #e0d5b7;">bis 7</td><td style="padding:10px;border:1px solid #e0d5b7;">2.500 - 4.000 EUR</td><td style="padding:10px;border:1px solid #e0d5b7;">ca. 20 Min.</td></tr>
</tbody>
</table>
<p>Die Preise gelten fuer einen einfachen Charterflug. Hin- und Rueckflug am selben Tag erhoehen die Kosten um 50 bis 80 Prozent, da der Operator das Flugzeug vor Ort halten muss (Crew-Liegezeiten, Parkgebuehren am FRA-GA-Terminal). Vergleichsdaten fuer laengere Strecken ab Koeln finden Sie in unserem Ratgeber zu <a href="/ratgeber/privatjet-koeln-ibiza-kosten">Privatjet Koeln Ibiza</a> und <a href="/ratgeber/privatjet-koeln-mallorca-kosten">Privatjet Koeln Mallorca</a>.</p>
<h2>Flughafen-Optionen: Koeln/Bonn und Frankfurt</h2>
<p>In Koeln ist der Koeln/Bonn Airport (CGN, EDDK) der primaere Privatjet-Abflughafen. Das GA-Terminal bietet 24/7-Betrieb ohne Nachtflugverbote. Fuer kleinere Turboprops kann auch Hangelar (EDKB, suedlich von Bonn) eine Option sein.</p>
<p>In Frankfurt bieten sich drei Optionen an. Der Hauptflughafen FRA (EDDF) hat ein GA-Terminal und mehrere FBOs, ist aber logistisch komplex. Egelsbach (EDFE, 10 km suedlich von Frankfurt) ist der bevorzugte Privatjet-Flughafen fuer die Rhein-Main-Region: weniger Stau, einfachere Abfertigung, guenstigere Landegebuehren. Fuer Termine in der City of London oder im Westend ist Egelsbach oft die schnellere Gesamtoption.</p>
<h2>Alternative: Hubschrauber</h2>
<p>Auf dieser Distanz ist ein Hubschrauber (Helicopter) eine echte Alternative. Koeln nach Frankfurt per Hubschrauber kostet 2.500 bis 4.000 EUR, dauert 45 bis 60 Minuten (langsamer als Jet, aber keine Flughafentransfers), und kann innenstadtnah landen (Helipads auf Unternehmensgelaende oder Krankenhaeuser). Fuer Gruppen bis 5 Personen mit innerstadtischen Zielen kann der Hubschrauber praktischer sein.</p>
<h2>Buchung und Empfehlung</h2>
<p>Fuer die Buchung empfehlen wir Villiers Jets. Die Plattform zeigt Ihnen verfuegbare Turboprops und Light Jets auf der Strecke Koeln-Frankfurt mit tagesaktuellen Preisen. Anfragen dauern weniger als zwei Minuten. Vergleichen Sie jetzt bei <a href="https://villiers.ai/?id=BTOG3L">Villiers Jets</a>.</p>
<ol>
<li><strong>Unter 4 Personen:</strong> ICE First Class ist die guenstigere, bequeme Alternative. 55 Minuten, keine Wartezeit am GA-Terminal.</li>
<li><strong>4 bis 6 Personen mit Zeitdruck:</strong> Turboprop (Pilatus PC-12) ist die kostenguenstigste Privatjet-Option. 1.800 bis 2.500 EUR geteilt.</li>
<li><strong>Stauproblematik:</strong> Wenn die A3 an einem Montagmorgen wieder 2+ Stunden kostet, kann ein spontaner Privatjet-Charter wirtschaftlich sein.</li>
<li><strong>Egelsbach als Ziel:</strong> Wer in der Rhein-Main-Region Termine hat, bevorzugt Egelsbach ueber den Hauptflughafen FRA.</li>
</ol>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Wie lange dauert ein Privatjet von Koeln nach Frankfurt?","acceptedAnswer":{"@type":"Answer","text":"Die reine Flugzeit von Koeln/Bonn (CGN) nach Frankfurt betraegt mit einem Turboprop rund 25 Minuten, mit einem Light Jet rund 20 Minuten. Tur-zu-Tur inklusive GA-Terminal-Abfertigung sind es realistisch 1,5 bis 2 Stunden."}},{"@type":"Question","name":"Was kostet ein Privatjet von Koeln nach Frankfurt?","acceptedAnswer":{"@type":"Answer","text":"Ein Turboprop kostet auf dieser Strecke 1.800 bis 2.500 EUR fuer das gesamte Flugzeug. Ein Light Jet liegt bei 2.500 bis 4.000 EUR. Bei 4 bis 6 Personen sind das 450 bis 600 EUR pro Person."}},{"@type":"Question","name":"Lohnt sich ein Privatjet auf der Kurzstrecke Koeln-Frankfurt?","acceptedAnswer":{"@type":"Answer","text":"Fuer Einzelreisende in der Regel nicht: Der ICE braucht 55 Minuten und kostet 80 bis 150 EUR. Fuer Gruppen ab 4 Personen mit hohem Zeitdruck oder bei starkem Stau auf der A3 kann der Privatjet wirtschaftlich sinnvoll sein."}},{"@type":"Question","name":"Welcher Flughafen in Frankfurt eignet sich fuer Privatjets?","acceptedAnswer":{"@type":"Answer","text":"Egelsbach (EDFE, 10 km suedlich von Frankfurt) ist der bevorzugte Privatjet-Flughafen fuer die Region. Weniger Stau, einfachere Abfertigung und guenstigere Gebuehren als am Hauptflughafen FRA."}},{"@type":"Question","name":"Gibt es eine Alternative zum Privatjet auf Koeln-Frankfurt?","acceptedAnswer":{"@type":"Answer","text":"Ja: Der Hubschrauber ist eine echte Alternative auf dieser Kurzstrecke. Kosten 2.500 bis 4.000 EUR, Flugzeit 45 bis 60 Minuten, und innenstadtnahe Landung ist moeglich. Fuer Gruppen bis 5 Personen kann das die schnellere Option sein."}}]}</script>"""

# Build the replacement: new content + closing backtick + old trailing structure (privatjet-london-dubai header)
trailing_structure = old_range[sep_pos:]  # "\n  },\n  {\n    slug: "privatjet-london-dubai",...content: "
new_range = new_koeln_frankfurt + '`' + trailing_structure

print(f"\nOld range length: {len(old_range)}")
print(f"New range length: {len(new_range)}")
print(f"Trailing structure: {repr(trailing_structure[:80])}")

# Apply the fix
text = text[:content_start] + new_range + text[next_tick:]

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"\nFixed! New file size: {len(text)} chars")
print("koeln-frankfurt-privatjet-2026 now has proper content with closing backtick")
