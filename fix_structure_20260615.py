"""
Fix articles.ts: articles array closes prematurely at line 12277.
All article objects from line 12284-14217 are stuck inside articleCategories.
This script merges them back into articles[].
"""

P = r"C:\Users\aukeh\dev\privatjet-vergleich\src\data\articles.ts"

with open(P, encoding="utf-8") as f:
    lines = f.readlines()

total = len(lines)
print(f"Total lines: {total}")

# 1-indexed positions (grep output)
ARTICLES_CLOSE = 12277  # "];", closes articles array too early
CATEGORIES_OPEN = 12279  # export const articleCategories: string[] = [
CATEGORIES_STRINGS_END = 12283  # blank line after the string values
MISPLACED_ARTICLES_START = 12284  # { slug: "privatjet-frankfurt-new-york"...
CATEGORIES_CLOSE = 14218  # ]; closes articleCategories
FUNCS_START = 14220  # export function getArticleBySlug...

# Convert to 0-indexed
i_articles_close = ARTICLES_CLOSE - 1      # index 12276
i_misplaced_start = MISPLACED_ARTICLES_START - 1  # index 12283
i_categories_close = CATEGORIES_CLOSE - 1  # index 14217 (the "];")
i_funcs_start = FUNCS_START - 1            # index 14219

# Verify landmarks
print(f"Line {ARTICLES_CLOSE}: {lines[i_articles_close].rstrip()!r}")
print(f"Line {CATEGORIES_OPEN}: {lines[i_categories_close - (CATEGORIES_CLOSE - CATEGORIES_OPEN)].rstrip()!r}")
print(f"Line {MISPLACED_ARTICLES_START}: {lines[i_misplaced_start].rstrip()!r}")
print(f"Line {CATEGORIES_CLOSE}: {lines[i_categories_close].rstrip()!r}")
print(f"Line {FUNCS_START}: {lines[i_funcs_start].rstrip()!r}")

# Build the new file:
# Part 1: everything up to and including line 12276 (the "},")
#         which is the last article in the articles array
part1 = lines[:i_articles_close]  # lines 0..12275 (inclusive), 12276 lines

# Part 2: the misplaced article objects from inside articleCategories
#         lines 12283-14216 (0-indexed), i.e. lines 12284-14217 (1-indexed)
part2 = lines[i_misplaced_start:i_categories_close]  # these are the article objects

# Part 3: close the articles array, then declare articleCategories correctly
part3 = [
    "];\n",
    "\n",
    "export const articleCategories: string[] = [\n",
    "  'Kosten', 'Strecken', 'Reiseziele', 'Ratgeber', 'Anbieter',\n",
    "  'Flugzeuge', 'Jet Cards', 'Markt', 'Erlebnis', 'Events',\n",
    "  'Nachhaltigkeit', 'Business', 'Spezial', 'Staedte',\n",
    "];\n",
    "\n",
]

# Part 4: the exported functions (from line 14220 onwards, 0-indexed 14219)
part4 = lines[i_funcs_start:]

new_lines = part1 + part2 + part3 + part4
print(f"New total lines: {len(new_lines)}")

# Quick sanity check: count slugs
new_content = "".join(new_lines)
import re
slugs = re.findall(r'slug: "([^"]+)"', new_content)
print(f"Total articles (slug count): {len(slugs)}")
print(f"Last 5 slugs: {slugs[-5:]}")
print(f"hannover-ibiza present: {'privatjet-hannover-ibiza-kosten' in slugs}")
print(f"koeln-barcelona present: {'privatjet-koeln-barcelona-kosten' in slugs}")

with open(P, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done. File written.")
