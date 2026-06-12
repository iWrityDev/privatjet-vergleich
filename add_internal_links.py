"""
Add internal links to the two new articles:
- privatjet-hamburg-ibiza-kosten
- privatjet-koeln-berlin-kosten

For Hamburg-Ibiza: link from articles about Hamburg, Ibiza, summer destinations, charter costs
For Koeln-Berlin: link from articles about Koeln, Berlin, short routes, domestic flights
"""
import re

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

# Links to inject
hamburg_ibiza_link = '<a href="/ratgeber/privatjet-hamburg-ibiza-kosten/">Privatjet Hamburg Ibiza Kosten 2026</a>'
koeln_berlin_link = '<a href="/ratgeber/privatjet-koeln-berlin-kosten/">Privatjet Koeln Berlin Kosten 2026</a>'

def inject_link_into_article(text, target_slug, link_html, anchor_phrase, link_label):
    """Find anchor_phrase in target article and append the link after the sentence."""
    slug_pos = text.find(f'slug: "{target_slug}"')
    if slug_pos == -1:
        slug_pos = text.find(f'slug: `{target_slug}`')
    if slug_pos == -1:
        print(f"  WARNING: Could not find article {target_slug}")
        return text, False

    content_pos = text.find('content:', slug_pos)
    if content_pos == -1:
        print(f"  WARNING: No content field in {target_slug}")
        return text, False

    # Find the anchor phrase in the content
    anchor_pos = text.find(anchor_phrase, content_pos)
    if anchor_pos == -1:
        print(f"  WARNING: Anchor phrase not found in {target_slug}: {anchor_phrase[:50]}")
        return text, False

    # Check that the link isn't already there
    if link_html[:40] in text[anchor_pos:anchor_pos+500]:
        print(f"  SKIP: Link already exists in {target_slug}")
        return text, False

    # Find end of sentence (next </p> or </li> or end of tag)
    sentence_end = text.find('</p>', anchor_pos)
    alt_end = text.find('</li>', anchor_pos)
    if alt_end != -1 and (sentence_end == -1 or alt_end < sentence_end):
        sentence_end = alt_end

    if sentence_end == -1 or sentence_end - anchor_pos > 2000:
        print(f"  WARNING: Could not find sentence end in {target_slug}")
        return text, False

    # Insert link before the closing tag
    insert_text = f' Weitere Kosten im Ratgeber: {link_html}.'
    text = text[:sentence_end] + insert_text + text[sentence_end:]
    print(f"  OK: Added '{link_label}' link to {target_slug}")
    return text, True

links_added = 0

# === Links to privatjet-hamburg-ibiza-kosten ===
# Article 1: privatjet-hamburg-london - mentions Hamburg departures
result = inject_link_into_article(
    text,
    'privatjet-hamburg-london',
    hamburg_ibiza_link,
    'Hamburg',
    'Hamburg-Ibiza'
)
text, ok = result
if ok: links_added += 1

# Article 2: privatjet-ibiza-mallorca or an ibiza article
result = inject_link_into_article(
    text,
    'privatjet-mallorca-ibiza',
    hamburg_ibiza_link,
    'Ibiza',
    'Hamburg-Ibiza'
)
text, ok = result
if ok: links_added += 1

# Article 3: privatjet-sommersaison
result = inject_link_into_article(
    text,
    'privatjet-sommersaison',
    hamburg_ibiza_link,
    'Hamburg',
    'Hamburg-Ibiza'
)
text, ok = result
if ok: links_added += 1

# Article 4: privatjet-fliegen-kosten (general cost article)
result = inject_link_into_article(
    text,
    'privatjet-fliegen-kosten',
    hamburg_ibiza_link,
    'Euro',
    'Hamburg-Ibiza'
)
text, ok = result
if ok: links_added += 1

# Article 5: privatjet-leerfluege (empty legs - Ibiza is top destination)
result = inject_link_into_article(
    text,
    'privatjet-leerfluege',
    hamburg_ibiza_link,
    'Ibiza',
    'Hamburg-Ibiza'
)
text, ok = result
if ok: links_added += 1

# === Links to privatjet-koeln-berlin-kosten ===
# Article 1: privatjet-berlin-guide
result = inject_link_into_article(
    text,
    'privatjet-berlin-guide',
    koeln_berlin_link,
    'Berlin',
    'Koeln-Berlin'
)
text, ok = result
if ok: links_added += 1

# Article 2: privatjet-koeln-ibiza (Koeln as departure)
result = inject_link_into_article(
    text,
    'privatjet-koeln-ibiza-kosten',
    koeln_berlin_link,
    'Koeln',
    'Koeln-Berlin'
)
text, ok = result
if ok: links_added += 1

# Article 3: privatjet-bahn-vergleich (comparing to train)
result = inject_link_into_article(
    text,
    'privatjet-bahn-vergleich',
    koeln_berlin_link,
    'Stunden',
    'Koeln-Berlin'
)
text, ok = result
if ok: links_added += 1

# Article 4: koeln-frankfurt (short domestic route - good cross-link)
result = inject_link_into_article(
    text,
    'koeln-frankfurt-privatjet-2026',
    koeln_berlin_link,
    'Koeln',
    'Koeln-Berlin'
)
text, ok = result
if ok: links_added += 1

# Article 5: privatjet-deutschland-inland (domestic flights)
result = inject_link_into_article(
    text,
    'privatjet-deutschland-inland',
    koeln_berlin_link,
    'Berlin',
    'Koeln-Berlin'
)
text, ok = result
if ok: links_added += 1

print(f"\nTotal links added: {links_added}")

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print(f"File saved. New size: {len(text)} chars")
