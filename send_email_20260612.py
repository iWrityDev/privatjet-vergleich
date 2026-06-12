import urllib.request
import json

RESEND_API_KEY = "re_S9R4NXy7_K5monpyVcUHtpzfZWNjwEKUj"

html_body = """
<h2>Privatjet-Vergleich SEO Run 2026-06-12</h2>

<h3>Step 1: Keyword Research</h3>
<p>2 new target keywords identified:</p>
<ul>
<li><b>Privatjet Hamburg Ibiza Kosten</b> - high summer seasonality, 6-person group angle</li>
<li><b>Privatjet Koeln Berlin Kosten</b> - domestic business route, ICE-vs-jet angle</li>
</ul>

<h3>Step 2: Thin Content Audit</h3>
<p>3 worst thin articles expanded:</p>
<ul>
<li><b>privatjet-wien-nizza-kosten-2026</b>: 256w -> 1438w (Turboprop 7-10k EUR, Light Jet 10-14k EUR, Monaco proximity)</li>
<li><b>privatjet-muenchen-barcelona-kosten</b>: 261w -> 1429w (Light Jet 14-18k EUR, Midsize 18-25k, MWC angle)</li>
<li><b>privatjet-duesseldorf-london-kosten-2026</b>: 271w -> 1345w (Light Jet 8-12k EUR, Farnborough vs Luton, post-Brexit tips)</li>
</ul>

<h3>Step 3: New Articles Written</h3>
<ul>
<li><b>privatjet-hamburg-ibiza-kosten</b> (1,400w): Light Jet 18-22k EUR, Midsize 22-28k EUR, 3h flight, HAM GAT, peak season +20-30%, empty legs 30-40% savings, 5-question FAQ</li>
<li><b>privatjet-koeln-berlin-kosten</b> (1,450w): Light Jet 3.5-6k EUR, Midsize 6-9k EUR, 1h15min vs ICE 4h20min, CGN 24/7 GA, 5-question FAQ</li>
</ul>

<h3>Step 4: Existing Articles Optimized</h3>
<ul>
<li>privatjet-nachhaltiger-fliegen: updated description (SAF focus)</li>
<li>privatjet-paris-lebourget: updated description (Le Bourget FBO angle)</li>
<li>elektrischer-privatjet-zukunft: updated description (timeline 2030-2035)</li>
</ul>

<h3>Step 5: Freshness Pass</h3>
<ul>
<li>privatjet-coronavirus-hygiene: dateModified -> 2026-06-12</li>
<li>privatjet-berlin-guide: dateModified -> 2026-06-12</li>
</ul>

<h3>Step 6: Ranking Check</h3>
<p>GSC data: 149 impressions (28-day, from previous run 2026-06-11). CTR threshold (pos 4-20, impressions >= 50) still not met - max 31 impressions on privatjet-broker query. No data-driven CTR rewrites possible yet. Monitoring continues.</p>

<h3>Step 7: Deploy</h3>
<ul>
<li>Local build: <b>SUCCESS</b> (480 static pages, 0 errors) after fixing 3 double-comma array holes causing Object.keys(undefined) TypeError</li>
<li>Git push to main: <b>SUCCESS</b> (commit 67eaf78)</li>
<li>IndexNow: <b>200 OK</b> (2 new URLs submitted to indexnow.org + Bing)</li>
<li>Archive.org: Timeout (Vercel deploy still propagating at submission time)</li>
</ul>

<h3>Bug Fixes (Critical)</h3>
<p>Three major source-file corruptions inherited from prior runs were fixed:</p>
<ol>
<li><b>koeln-frankfurt</b>: missing closing backtick on content field caused parse failure</li>
<li><b>privatjet-london-dubai</b>: premature template literal close split article in two</li>
<li><b>privatjet-dubai-london</b>: backslash instead of backtick as string delimiter</li>
<li><b>rom-neapel + stockholm-oslo</b>: metaDescription instead of description, missing readingMinutes/publishedDate</li>
<li><b>3 double-comma holes</b>: articles[183], articles[198], articles[210] were undefined, causing Object.keys(undefined) crash during Next.js static page generation</li>
</ol>

<h3>Step 8: Internal Back-Linking</h3>
<ul>
<li>Hamburg-Ibiza: 7 links from ibiza-guide, muenchen-ibiza, hamburg-guide, ibiza-kosten, leerflug, duesseldorf-ibiza, koeln-ibiza</li>
<li>Koeln-Berlin: 5 links from berlin-guide, koeln-ibiza, koeln-frankfurt, berlin-koeln, hamburg-berlin</li>
</ul>

<h3>Step 9: External Backlinks</h3>
<ul>
<li>Archive.org: Timeout (deployment propagation)</li>
<li>Dev.to: Skipped (no API key)</li>
<li>Reddit/Quora: Drafts ready for manual posting</li>
</ul>

<h3>Article Count</h3>
<p>Total articles: <b>209</b> valid (fixed 3 undefined holes, total was 211 with holes, now clean). Build generates <b>480 static pages</b>.</p>

<hr>
<p><small>Run 2026-06-12 | privatjet-vergleich.de | Automated SEO Agent</small></p>
"""

payload = {
    "from": "onboarding@resend.dev",
    "to": ["auke.haan@hotmail.nl"],
    "subject": "Privatjet SEO 2026-06-12: 2 new articles (Hamburg-Ibiza, Koeln-Berlin) + critical bug fixes",
    "html": html_body,
}

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(
    "https://api.resend.com/emails",
    data=data,
    headers={
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "PrivatjetSEO/1.0",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        print(f"Status: {resp.status}")
        print(f"Message ID: {body.get('id')}")
        print(f"Result: {body}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
