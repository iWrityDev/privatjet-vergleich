"""
Add internal links using the correct slug names found.
"""
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

hamburg_ibiza_link = '<a href="/ratgeber/privatjet-hamburg-ibiza-kosten/">Privatjet Hamburg Ibiza</a>'
koeln_berlin_link = '<a href="/ratgeber/privatjet-koeln-berlin-kosten/">Privatjet Koeln Berlin</a>'


def inject_link(text, target_slug, link_html, search_terms, link_label):
    """Find any of the search_terms in target article content and inject link."""
    slug_pos = text.find(f'slug: "{target_slug}"')
    if slug_pos == -1:
        slug_pos = text.find(f'slug: `{target_slug}`')
    if slug_pos == -1:
        print(f"  SKIP (not found): {target_slug}")
        return text, False

    content_pos = text.find('content:', slug_pos)
    if content_pos == -1:
        print(f"  SKIP (no content): {target_slug}")
        return text, False

    # Find next article start to bound the search
    next_slug_pos = text.find('slug:', slug_pos + 20)
    search_end = next_slug_pos if next_slug_pos != -1 else len(text)

    # Check if link already exists
    if link_html[:30] in text[content_pos:search_end]:
        print(f"  SKIP (link exists): {target_slug}")
        return text, False

    # Find any of the search terms
    anchor_pos = -1
    for term in search_terms:
        pos = text.find(term, content_pos)
        if pos != -1 and pos < search_end:
            anchor_pos = pos
            break

    if anchor_pos == -1:
        print(f"  SKIP (no anchor term): {target_slug}")
        return text, False

    # Find next </p> after anchor
    p_end = text.find('</p>', anchor_pos)
    if p_end == -1 or p_end > search_end:
        print(f"  SKIP (no </p>): {target_slug}")
        return text, False

    insert = f' Vergleich: {link_html}.'
    text = text[:p_end] + insert + text[p_end:]
    print(f"  OK: {link_label} -> {target_slug}")
    return text, True


links_added = 0

# Hamburg-Ibiza: 5 linking articles
for slug, terms in [
    ('privatjet-hamburg-guide', ['Hamburg', 'Ibiza', 'Fliegen']),
    ('privatjet-ibiza-guide', ['Ibiza', 'Hamburg', 'Flugzeit']),
    ('privatjet-ibiza-kosten', ['Ibiza', 'Hamburg', 'Light Jet']),
    ('privatjet-muenchen-ibiza-kosten', ['Ibiza', 'Deutschland', 'Euro']),
    ('leerflug-guenstig-privatjet', ['Ibiza', 'Sommer', 'Euro']),
]:
    text, ok = inject_link(text, slug, hamburg_ibiza_link, terms, 'Hamburg-Ibiza')
    if ok:
        links_added += 1

# Koeln-Berlin: 2 more (already have 3 from previous run)
for slug, terms in [
    ('privatjet-berlin-koeln-kosten-2026', ['Koeln', 'Berlin', 'Euro']),
    ('hamburg-berlin-privatjet-2026', ['Berlin', 'Hamburg', 'Stunde']),
]:
    text, ok = inject_link(text, slug, koeln_berlin_link, terms, 'Koeln-Berlin')
    if ok:
        links_added += 1

print(f"\nLinks added this run: {links_added}")

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print(f"File saved. New size: {len(text)} chars")
