"""Add remaining Hamburg-Ibiza internal links."""
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

exact_href = '/ratgeber/privatjet-hamburg-ibiza-kosten/'
hamburg_ibiza_link = f'<a href="{exact_href}">Privatjet Hamburg Ibiza</a>'


def inject_link(text, target_slug, link_html, exact_href, search_terms):
    slug_pos = text.find(f'slug: "{target_slug}"')
    if slug_pos == -1:
        slug_pos = text.find(f'slug: `{target_slug}`')
    if slug_pos == -1:
        print(f"  NOT FOUND: {target_slug}")
        return text, False

    content_pos = text.find('content:', slug_pos)
    next_slug_pos = text.find('slug:', slug_pos + 20)
    search_end = next_slug_pos if next_slug_pos != -1 else len(text)

    if exact_href in text[content_pos:search_end]:
        print(f"  EXISTS: {target_slug}")
        return text, False

    anchor_pos = -1
    for term in search_terms:
        pos = text.find(term, content_pos)
        if pos != -1 and pos < search_end:
            anchor_pos = pos
            break

    if anchor_pos == -1:
        print(f"  NO ANCHOR: {target_slug}")
        return text, False

    p_end = text.find('</p>', anchor_pos)
    if p_end == -1 or p_end > search_end:
        print(f"  NO PARA END: {target_slug}")
        return text, False

    text = text[:p_end] + f' Vergleich: {link_html}.' + text[p_end:]
    print(f"  ADDED: {target_slug}")
    return text, True


added = 0
for slug, terms in [
    ('privatjet-hamburg-guide', ['Charter', 'Kosten', 'Fliegen', 'EUR']),
    ('privatjet-ibiza-kosten', ['Kosten', 'EUR', 'Light Jet']),
    ('leerflug-guenstig-privatjet', ['Leerflug', 'Ibiza', 'EUR']),
    ('privatjet-duesseldorf-ibiza-kosten', ['Ibiza', 'Duesseldorf', 'EUR']),
    ('privatjet-koeln-ibiza-kosten', ['Ibiza', 'EUR', 'Light Jet']),
]:
    text, ok = inject_link(text, slug, hamburg_ibiza_link, exact_href, terms)
    if ok:
        added += 1

print(f"\nAdded: {added}")
with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print(f"Saved. Size: {len(text)}")
