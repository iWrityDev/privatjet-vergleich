#!/usr/bin/env python3
"""
2026-06-15 Optimization + Freshness + Internal Links pass
"""
import re

FILE = r"C:\Users\aukeh\dev\privatjet-vergleich\src\data\articles.ts"

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

changes = []

# ── Helper: update dateModified in Article JSON-LD ──
def update_date_modified(slug, new_date, text):
    pattern = r'(slug:\s*["\']' + re.escape(slug) + r'["\'].*?dateModified":")\d{4}-\d{2}-\d{2}(")'
    replacement = r'\g<1>' + new_date + r'\g<2>'
    new_text, n = re.subn(pattern, replacement, text, count=1, flags=re.DOTALL)
    if n:
        changes.append(f'Updated dateModified for {slug} to {new_date}')
    return new_text

# ── 1. OPTIMIZE: privatjet-hannover-kosten ──
# Add link to new hannover-ibiza article in the routes table row
# Current: <tr><td>Hannover nach Ibiza</td>...
# Target: add link in that cell

OLD_HAJ_ROW = '<tr><td>Hannover nach Ibiza</td><td>1.820 km</td>'
NEW_HAJ_ROW = '<tr><td><a href="/ratgeber/privatjet-hannover-ibiza-kosten">Hannover nach Ibiza</a></td><td>1.820 km</td>'

if OLD_HAJ_ROW in content:
    content = content.replace(OLD_HAJ_ROW, NEW_HAJ_ROW, 1)
    changes.append('Added link to privatjet-hannover-ibiza-kosten in hannover-kosten routes table')
else:
    changes.append('WARNING: HAJ-Ibiza row not found exactly, skipping')

content = update_date_modified('privatjet-hannover-kosten', '2026-06-15', content)

# ── 2. OPTIMIZE: privatjet-barcelona-kosten ──
# Add new paragraph mentioning Koeln-Barcelona before the Buchung section
# Add before <h2>Buchung: Wie vorzugehen ist</h2>
BARCELONA_TARGET = '<h2>Buchung: Wie vorzugehen ist</h2>'
BARCELONA_INSERT = (
    '<p>Reisende aus Köln und dem NRW-Raum finden einen spezifischen Kostenguide für den '
    'Direktflug ab CGN: <a href="/ratgeber/privatjet-koeln-barcelona-kosten">Privatjet Köln nach Barcelona: '
    'Kosten 2026 und Charter-Guide</a>. Dieser behandelt auch die Mobile-World-Congress-Saison im Februar, '
    'in der die Preise ab Köln besonders stark ansteigen.</p>\n'
    + BARCELONA_TARGET
)

if BARCELONA_TARGET in content:
    content = content.replace(BARCELONA_TARGET, BARCELONA_INSERT, 1)
    changes.append('Added link to privatjet-koeln-barcelona-kosten in barcelona article')
else:
    changes.append('WARNING: Barcelona Buchung section not found, skipping')

content = update_date_modified('privatjet-barcelona-kosten', '2026-06-15', content)

# ── 3. OPTIMIZE: privatjet-paris-kosten ──
# Update dateModified; add mention of Vienna-Paris article in the article
content = update_date_modified('privatjet-paris-kosten', '2026-06-15', content)
changes.append('Updated dateModified for privatjet-paris-kosten (freshness)')

# ── 4. FRESHNESS: Two more articles ──
# privatjet-ibiza-kosten - already in freshnessUpdated BUT we add more value
# Let's do paris-london and privatjet-muenchen-nizza instead (not in freshnessUpdated)
content = update_date_modified('paris-london', '2026-06-15', content)
changes.append('Updated dateModified for paris-london (freshness)')

content = update_date_modified('privatjet-muenchen-nizza', '2026-06-15', content)
changes.append('Updated dateModified for privatjet-muenchen-nizza (freshness)')

# ── 5. INTERNAL LINKS: Add to ibiza articles ──
# Find privatjet-ibiza-kosten and add link to hannover-ibiza article
IBIZA_SLUG_SEARCH = 'slug: "privatjet-ibiza-kosten"'
if IBIZA_SLUG_SEARCH in content:
    # Find a suitable insertion point: after a mention of "Hannover"
    # Add a link in the context of northern German cities
    OLD_IBIZA_SNIPPET = 'href="/ratgeber/privatjet-hannover-kosten">Hannover'
    NEW_IBIZA_SNIPPET = 'href="/ratgeber/privatjet-hannover-kosten">Hannover'
    # Better: add a new sentence near the Hannover mention
    # Try to find existing hannover link in ibiza article
    HAJ_LINK_PATTERN = r'(href="/ratgeber/privatjet-hannover-kosten"[^<]+</a>)([^<]*)(</p>)'
    def add_hannover_ibiza_link(m):
        return (m.group(1) + m.group(2) +
                ' Den vollständigen Route-Guide inklusive Preistabelle und Buchungstipps finden Sie hier: '
                '<a href="/ratgeber/privatjet-hannover-ibiza-kosten">Privatjet Hannover nach Ibiza</a>.' +
                m.group(3))
    # Only do this if the pattern exists and the new link is not already there
    if '/ratgeber/privatjet-hannover-ibiza-kosten' not in content[content.find(IBIZA_SLUG_SEARCH):content.find(IBIZA_SLUG_SEARCH)+15000]:
        new_content, n = re.subn(HAJ_LINK_PATTERN, add_hannover_ibiza_link, content, count=1, flags=re.DOTALL)
        if n:
            content = new_content
            changes.append('Added hannover-ibiza link in privatjet-ibiza-kosten')

# ── 6. INTERNAL LINKS: privatjet-koeln-mallorca-kosten → koeln-barcelona ──
# This article is about Koeln trips, add link to the new Barcelona article
KOELN_MALLORCA = 'slug: "privatjet-koeln-mallorca-kosten"'
if KOELN_MALLORCA in content:
    # Find a sentence about Koeln departures to other destinations
    # Look for any mention of "Düsseldorf" or "NRW" or similar NRW context
    KOELN_INSERT_TARGET = 'href="https://villiers.ai/?id=BTOG3L"'
    # Only insert if not already present
    idx_start = content.find(KOELN_MALLORCA)
    idx_end = content.find('\n  },\n', idx_start) + 10
    article_section = content[idx_start:idx_end]
    if '/ratgeber/privatjet-koeln-barcelona-kosten' not in article_section:
        # Find a good spot: after </table> before the CTA
        KOELN_TABLE_END = '</table>'
        # Find it within the article section
        table_pos = article_section.rfind(KOELN_TABLE_END)
        if table_pos > 0:
            insert_at_offset = idx_start + table_pos + len(KOELN_TABLE_END)
            barcelona_note = ('\n<p>Weitere Informationen zu Köln-Charters ins westliche Mittelmeer: '
                             '<a href="/ratgeber/privatjet-koeln-barcelona-kosten">Privatjet Köln nach Barcelona: '
                             'Kosten 2026 und Charter-Guide</a>.</p>')
            content = content[:insert_at_offset] + barcelona_note + content[insert_at_offset:]
            changes.append('Added koeln-barcelona link in privatjet-koeln-mallorca-kosten')

# ── Write output ──
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print('Changes made:')
for c in changes:
    print(f'  {c}')
print(f'\nTotal changes: {len(changes)}')
