#!/usr/bin/env python3
"""Step 8: Insert internal backlinks to the 2 new articles from 2026-06-16."""
import re, json

ARTICLES_FILE = 'C:/Users/aukeh/dev/privatjet-vergleich/src/data/articles.ts'
STATE_FILE = 'C:/Users/aukeh/OneDrive/Bureaublad/claude-database/privatjet-vergleich_seo_improve/state.json'

content = open(ARTICLES_FILE, encoding='utf-8').read()
state = json.load(open(STATE_FILE, encoding='utf-8'))

changes = []

# ---------------------------------------------------------------------------
# Backlinks TO: privatjet-zuerich-paris-kosten
# ---------------------------------------------------------------------------

# 1. privatjet-zuerich-guide -> insert after the Frankfurt route sentence
old1 = 'Die kurze Hüpfstrecke nach Frankfurt ist ein Klassiker für Geschäftsreisende'
# Find the closing </p> of that paragraph and insert after it
old1_para_end = old1
new1_insert = ' Eine weitere Top-Route aus Zürich ist Paris Le Bourget: kaum 60 Minuten Flugzeit und direkter Zugang zu Europas wichtigstem Business-Aviation-Flughafen. Kosten, Jet-Typen und Buchungstipps dazu im Ratgeber <a href="/ratgeber/privatjet-zuerich-paris-kosten">Privatjet Zürich Paris Kosten</a>.'
# Find the paragraph containing old1 and insert a sentence at the end of it
def insert_in_para(text, search_str, append_text):
    # Find the paragraph containing search_str, then insert before </p>
    idx = text.find(search_str)
    if idx == -1:
        return text, False
    # Find the closing </p> after this point
    close_idx = text.find('</p>', idx)
    if close_idx == -1:
        return text, False
    return text[:close_idx] + append_text + text[close_idx:], True

content, ok1 = insert_in_para(content, old1, new1_insert)
print('Backlink 1 (zuerich-guide -> zuerich-paris):', 'OK' if ok1 else 'FAIL')
changes.append(('privatjet-zuerich-guide', 'privatjet-zuerich-paris-kosten', ok1))

# 2. privatjet-paris-lebourget -> insert after the Leerflüge paragraph
old2 = 'Wer flexibel ist, prüft Leerfluege aus DACH nach LBG'
if old2 not in content:
    # Try alternative encoding
    old2 = 'Wer flexibel ist, pr\xfcft Leerfluege aus DACH nach LBG'
if old2 not in content:
    # search with original encoding
    old2 = 'Wer flexibel ist, prüft Leerf'
new2_insert = ' Besonders gut frequentiert ist der Korridor aus der Deutschschweiz: Zürich nach Le Bourget ist eine der leerflugreichsten Kurzstrecken in Europa. Kosten und Buchungsdetails im Ratgeber <a href="/ratgeber/privatjet-zuerich-paris-kosten">Privatjet Zürich Paris Le Bourget</a>.'
content, ok2 = insert_in_para(content, old2, new2_insert)
if not ok2:
    # Try another approach - find any paragraph in paris-lebourget about Leerflüge
    alt_search = 'Empty-Legs sind regelm'
    content, ok2 = insert_in_para(content, alt_search, new2_insert)
print('Backlink 2 (paris-lebourget -> zuerich-paris):', 'OK' if ok2 else 'FAIL')
changes.append(('privatjet-paris-lebourget', 'privatjet-zuerich-paris-kosten', ok2))

# 3. privatjet-schweiz-kosten -> insert after Leerflüge paragraph
old3 = 'Repositionierungsflüge zwischen Genf, Zürich, Nizza und den gro'
new3_insert = ' Die meistgefragte Einzelstrecke aus der Deutschschweiz Richtung Frankreich ist Zürich nach Paris Le Bourget: ca. 60 Minuten Flugzeit, Kosten ab 5.500 EUR. Alles dazu im Ratgeber <a href="/ratgeber/privatjet-zuerich-paris-kosten">Privatjet Zürich Paris Kosten</a>.'
content, ok3 = insert_in_para(content, old3, new3_insert)
if not ok3:
    alt_search = 'groessten europ'
    content, ok3 = insert_in_para(content, alt_search, new3_insert)
print('Backlink 3 (schweiz-kosten -> zuerich-paris):', 'OK' if ok3 else 'FAIL')
changes.append(('privatjet-schweiz-kosten', 'privatjet-zuerich-paris-kosten', ok3))

# ---------------------------------------------------------------------------
# Backlinks TO: privatjet-duesseldorf-sylt-kosten
# ---------------------------------------------------------------------------

# 4. privatjet-sylt-charter -> insert after booking lead-time paragraph
old4 = 'In der Hauptsaison sollten Sie mindestens drei Wochen vor dem geplanten Abflug'
new4_insert = ' Wer aus dem Rheinland anreist, findet für die Strecke Düsseldorf-Sylt spezifische Preise und Saisonhinweise im Ratgeber <a href="/ratgeber/privatjet-duesseldorf-sylt-kosten">Privatjet Düsseldorf Sylt Kosten</a>.'
content, ok4 = insert_in_para(content, old4, new4_insert)
print('Backlink 4 (sylt-charter -> duesseldorf-sylt):', 'OK' if ok4 else 'FAIL')
changes.append(('privatjet-sylt-charter', 'privatjet-duesseldorf-sylt-kosten', ok4))

# 5. privatjet-duesseldorf-guide -> insert after Sylt mention paragraph
old5 = 'Besonders gefragt ist die Kurzstrecke nach Sylt, die im Sommer und an Wochenenden stark nachgefragt wird, mehr dazu im <a href="/ratgeber/privatjet-sylt-charter">Sylt-Charter-Guide</a>'
new5_insert = '. Die genauen Kosten und Buchungstipps speziell für den Abflug von Düsseldorf finden Sie im Ratgeber <a href="/ratgeber/privatjet-duesseldorf-sylt-kosten">Privatjet Düsseldorf Sylt Kosten</a>'
# Insert before the closing </p> of this sentence
idx5 = content.find(old5)
if idx5 != -1:
    close5 = content.find('</p>', idx5)
    if close5 != -1:
        content = content[:close5] + new5_insert + content[close5:]
        ok5 = True
    else:
        ok5 = False
else:
    ok5 = False
print('Backlink 5 (duesseldorf-guide -> duesseldorf-sylt):', 'OK' if ok5 else 'FAIL')
changes.append(('privatjet-duesseldorf-guide', 'privatjet-duesseldorf-sylt-kosten', ok5))

# 6. privatjet-hamburg-guide -> insert after Sylt mention paragraph (if it's Hamburg-specific Sylt content)
old6 = 'Besonders gefragt ist die Kurzstrecke nach Sylt, die im Sommer und an Wochenenden stark nachgefragt wird, mehr dazu im <a href="/ratgeber/privatjet-sylt-charter">Sylt-Charter-Guide</a>'
# This might be the second occurrence (Hamburg guide has the same text as DUS guide paragraph 5)
# Find second occurrence
idx6a = content.find(old6)
idx6b = content.find(old6, idx6a + 1) if idx6a != -1 else -1
if idx6b != -1:
    close6 = content.find('</p>', idx6b)
    if close6 != -1:
        # Check if this is actually in the Hamburg guide and not DUS guide again
        # We already inserted into the first occurrence above
        new6_insert = '. Für Reisende aus dem Rheinland bietet unser Ratgeber <a href="/ratgeber/privatjet-duesseldorf-sylt-kosten">Privatjet Düsseldorf Sylt</a> einen direkten Preisvergleich ab Düsseldorf'
        content = content[:close6] + new6_insert + content[close6:]
        ok6 = True
    else:
        ok6 = False
else:
    ok6 = False
print('Backlink 6 (hamburg-guide -> duesseldorf-sylt):', 'OK' if ok6 else 'FAIL - second occurrence not found, skipping')

# ---------------------------------------------------------------------------
# Write the file
# ---------------------------------------------------------------------------
open(ARTICLES_FILE, 'w', encoding='utf-8').write(content)
print('Backlink file written. Total changes:', sum(1 for _, _, ok in changes if ok))

# ---------------------------------------------------------------------------
# Update state.json
# ---------------------------------------------------------------------------
backlinked = state.get('backlinkedFrom', {})

def add_backlink(state_bl, source_slug, target_slug):
    if source_slug not in state_bl:
        state_bl[source_slug] = {'count': 1, 'linkedTo': [target_slug]}
    elif isinstance(state_bl[source_slug], list):
        state_bl[source_slug].append(f'{target_slug} (added 2026-06-16)')
    elif isinstance(state_bl[source_slug], dict):
        state_bl[source_slug]['count'] = state_bl[source_slug].get('count', 0) + 1
        if 'linkedTo' in state_bl[source_slug]:
            state_bl[source_slug]['linkedTo'].append(target_slug)
        elif 'sources' in state_bl[source_slug]:
            state_bl[source_slug]['sources'].append(f'{target_slug} (added 2026-06-16)')

for source, target, ok in changes:
    if ok:
        add_backlink(backlinked, source, target)

if ok6:
    add_backlink(backlinked, 'privatjet-hamburg-guide', 'privatjet-duesseldorf-sylt-kosten')

# Add entry for new target articles
backlinked['privatjet-zuerich-paris-kosten'] = {
    'count': sum(1 for s, t, ok in changes if t == 'privatjet-zuerich-paris-kosten' and ok),
    'sources': [f'{s} (added 2026-06-16)' for s, t, ok in changes if t == 'privatjet-zuerich-paris-kosten' and ok]
}
backlinked['privatjet-duesseldorf-sylt-kosten'] = {
    'count': sum(1 for s, t, ok in changes if t == 'privatjet-duesseldorf-sylt-kosten' and ok) + (1 if ok6 else 0),
    'sources': [f'{s} (added 2026-06-16)' for s, t, ok in changes if t == 'privatjet-duesseldorf-sylt-kosten' and ok] + (['privatjet-hamburg-guide (added 2026-06-16)'] if ok6 else [])
}

state['backlinkedFrom'] = backlinked

# Update other state fields
if 'keywordsTargeted' not in state:
    state['keywordsTargeted'] = []
for kw in ['privatjet-zuerich-paris-kosten', 'privatjet-duesseldorf-sylt-kosten']:
    if kw not in state['keywordsTargeted']:
        state['keywordsTargeted'].append(kw)

# Add to thinContentFixed
for slug in ['privatjet-koeln-mailand-kosten', 'privatjet-kosten-pro-person-2026', 'privatjet-leerflug-buchen-guenstig-2026']:
    if slug not in state['thinContentFixed']:
        state['thinContentFixed'].append(slug)

# Add to articlesOptimized
for slug in ['privatjet-frankfurt-new-york', 'privatjet-zuerich-london', 'privatjet-basel-dreilaendereck']:
    if slug not in state['articlesOptimized']:
        state['articlesOptimized'].append(slug)

# Add to freshnessUpdated
for slug in ['privatjet-catering-service', 'privatjet-malediven-guide']:
    if slug not in state['freshnessUpdated']:
        state['freshnessUpdated'].append(slug)

# Add discoveredKeywordsUsed
if 'discoveredKeywordsUsed' not in state:
    state['discoveredKeywordsUsed'] = []
for kw in ['privatjet zürich paris kosten', 'privatjet duesseldorf sylt kosten']:
    if kw not in state['discoveredKeywordsUsed']:
        state['discoveredKeywordsUsed'].append(kw)

# New articles
if 'newArticles' not in state:
    state['newArticles'] = []
state['newArticles'].append({'slug': 'privatjet-zuerich-paris-kosten', 'published': '2026-06-16'})
state['newArticles'].append({'slug': 'privatjet-duesseldorf-sylt-kosten', 'published': '2026-06-16'})

state['lastRun'] = '2026-06-16'
state['newArticlesThisRun'] = ['privatjet-zuerich-paris-kosten', 'privatjet-duesseldorf-sylt-kosten']

json.dump(state, open(STATE_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('State.json updated.')
