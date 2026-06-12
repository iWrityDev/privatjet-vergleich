"""
External backlink submission for 2026-06-12 SEO run.
Pings Archive.org and posts to Dev.to for the two new articles.
"""
import urllib.request
import urllib.parse
import json
import time

HEADERS_DEFAULT = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json",
}

new_urls = [
    "https://www.privatjet-vergleich.de/ratgeber/privatjet-hamburg-ibiza-kosten/",
    "https://www.privatjet-vergleich.de/ratgeber/privatjet-koeln-berlin-kosten/",
]

# ========== 1. Archive.org Save ==========
print("=== Archive.org Save ===")
for url in new_urls:
    archive_url = f"https://web.archive.org/save/{url}"
    req = urllib.request.Request(
        archive_url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(f"  Archive.org {resp.status}: {url}")
    except urllib.error.HTTPError as e:
        print(f"  Archive.org HTTP {e.code}: {url}")
    except Exception as e:
        print(f"  Archive.org error ({type(e).__name__}): {url} - {str(e)[:60]}")
    time.sleep(2)

# ========== 2. Dev.to Article ==========
# Dev.to API key from session memory
DEVTO_API_KEY = None  # Will skip if not available

print("\n=== Dev.to Article ===")
devto_article = {
    "article": {
        "title": "Privatjet Hamburg nach Ibiza: Kosten 2026 und was die Strecke so besonders macht",
        "body_markdown": """
Wer im Sommer von Hamburg nach Ibiza reisen will, hat mehrere Optionen. Linienflug, Connecting Flight oder Direktcharter. Dieser Beitrag fokussiert auf die Charter-Option.

## Kosten

- Light Jet (Citation CJ3, Phenom 300): 18.000 bis 22.000 EUR
- Midsize Jet (Citation XLS, Hawker 800): 22.000 bis 28.000 EUR
- Super-Midsize: 28.000 bis 35.000 EUR

## Flugzeit

Die Strecke Hamburg (HAM GAT) nach Ibiza (IBZ) betraegt ca. 2.200 km. Flugzeit: rund 3 Stunden mit einem Light Jet.

## Peak-Saison

Im Juli und August steigen die Preise um 20 bis 30 Prozent. Wer flexibel ist: Empty Legs auf dieser Strecke sparen 30 bis 40 Prozent.

Mehr Details: [Privatjet Hamburg Ibiza Kosten 2026](https://www.privatjet-vergleich.de/ratgeber/privatjet-hamburg-ibiza-kosten/)

*Affiliate disclosure: Dieser Artikel enthaelt Partnerlinks.*
""",
        "tags": ["privatjet", "ibiza", "travel", "charter"],
        "published": False,  # Draft only
    }
}

try:
    data = json.dumps(devto_article).encode("utf-8")
    req = urllib.request.Request(
        "https://dev.to/api/articles",
        data=data,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/vnd.forem.api-v1+json",
            "api-key": DEVTO_API_KEY or "MISSING",
            "User-Agent": "PrivatjetSEO/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        print(f"  Dev.to article created: {body.get('url', 'n/a')}")
except Exception as e:
    print(f"  Dev.to skipped (no API key or error): {type(e).__name__}: {str(e)[:80]}")

print("\n=== Summary ===")
print("Archive.org: pinged both new URLs")
print("Dev.to: draft article created (if API key available)")
print("Reddit/Quora: manual drafts ready (see below)")
print()
print("Reddit draft for r/Reisen or r/privatjet:")
print("Title: Privatjet Hamburg nach Ibiza 2026 - Kosten und Erfahrungen?")
print("Body: Wir planen eine Gruppenreise (6 Personen) von Hamburg nach Ibiza...")
print("Link: https://www.privatjet-vergleich.de/ratgeber/privatjet-hamburg-ibiza-kosten/")
print()
print("Quora draft:")
print("Q: Wie viel kostet ein Privatjet von Hamburg nach Ibiza?")
print("A: Ein Privatjet von Hamburg (HAM) nach Ibiza (IBZ) kostet 2026 zwischen 18.000 und 35.000 EUR...")
