"""
Fix broken template literals in privatjet-london-dubai and berlin-warsaw.

Both articles have their content template literal closed prematurely,
with the remaining content in a dangling template literal outside the array.

For privatjet-london-dubai:
  Part 1: chars 35015-41626 (inside content template literal)
  Premature close at 41626: `\n  },\n];`
  Part 2: chars 41637-50764 (in dangling template literal)
  After: \n  },\n  {\n    slug: "privatjet-genf-nizza"...

Fix: merge part1 + part2 into a single properly-closed content field.
Remove the ];\` and the surrounding article-close / article-open from the broken position.
"""

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

def fix_broken_article(text, slug):
    """
    Fix an article where content has premature close followed by ];` pattern.
    Returns fixed text.
    """
    slug_pos = text.find(f'slug: "{slug}"')
    if slug_pos == -1:
        print(f"WARNING: slug {slug} not found!")
        return text

    content_field_pos = text.find('content: `', slug_pos)
    if content_field_pos == -1:
        print(f"WARNING: content field for {slug} not found!")
        return text

    content_start = content_field_pos + len('content: `')

    # Find the premature close: backtick followed by \n  },\n];`
    # or backtick followed by \n  },\n  }
    pos = content_start
    premature_close = -1
    premature_pattern = None

    while pos < len(text):
        tick = text.find('`', pos)
        if tick == -1:
            break
        after = text[tick+1:tick+20]
        # Check for the ],; broken pattern
        if '\n  },\n];`' in after or after.startswith('\n  },\n];`'):
            premature_close = tick
            premature_pattern = 'array_close'
            break
        # Also check for  },\n];\`\n pattern directly
        if text[tick+1:tick+13] == '\n  },\n];`' or text[tick+1:tick+12] == '\n  },\n];`':
            premature_close = tick
            premature_pattern = 'array_close'
            break
        pos = tick + 1

    if premature_close == -1:
        # Try a more direct search
        direct_search = '`\n  },\n];`'
        ds_pos = text.find(direct_search, content_start)
        if ds_pos != -1:
            premature_close = ds_pos
            premature_pattern = 'array_close'

    if premature_close == -1:
        print(f"WARNING: premature close pattern not found for {slug}!")
        return text

    print(f"Found premature close for {slug} at char {premature_close}")
    print(f"Context: {repr(text[premature_close-20:premature_close+20])}")

    # The pattern is: `\n  },\n];`
    # - premature_close: the backtick that closes the content template literal too early
    # - after that: \n  },\n]; - closes article and array
    # - then another backtick: opens dangling template literal

    # Find the dangling template literal opening backtick
    # It's right after the ];
    after_premature = text[premature_close:]
    # Find "];`" pattern
    bracket_pos = after_premature.find('];`')
    if bracket_pos == -1:
        print(f"WARNING: ];\` pattern not found after premature close for {slug}!")
        return text

    dangling_open = premature_close + bracket_pos + 3  # position of char right after the backtick in ];`
    # The backtick itself is at premature_close + bracket_pos + 2
    dangling_tick = premature_close + bracket_pos + 2

    print(f"Dangling template opens at char {dangling_tick}")
    print(f"Context: {repr(text[dangling_tick-5:dangling_tick+30])}")

    # Find the closing backtick of the dangling template literal
    dangling_close = text.find('`', dangling_open)
    if dangling_close == -1:
        print(f"WARNING: dangling template close not found for {slug}!")
        return text

    print(f"Dangling template closes at char {dangling_close}")
    print(f"Context around close: {repr(text[dangling_close-30:dangling_close+50])}")

    # Verify there are no inner backticks in the dangling content
    dangling_content = text[dangling_open:dangling_close]
    inner_ticks = dangling_content.count('`')
    if inner_ticks > 0:
        print(f"WARNING: {inner_ticks} backticks inside dangling content for {slug}!")
        return text

    # Now construct the fix:
    # Original: content_start..premature_close [PART1] | ` \n  },\n];` [BREAK] dangling_open..dangling_close [PART2] ` \n  },\n  {
    # Fixed: content_start..premature_close [PART1] [PART2] ` \n  },\n  {

    part1 = text[content_start:premature_close]
    part2 = dangling_content  # text[dangling_open:dangling_close]

    # What comes after the dangling close?
    after_dangling = text[dangling_close+1:]  # skip the closing backtick
    # This should be: \n  },\n  {  (the next article opening, now properly positioned)
    print(f"After dangling close: {repr(after_dangling[:60])}")

    # Build the fixed text
    # Structure: ...content: `[part1][part2]`\n  },\n  {\n    slug: "next"...
    fixed = (
        text[:content_start] +      # everything including 'content: `'
        part1 +                      # first part of content
        part2 +                      # second part of content
        '`' +                        # proper closing backtick for content field
        after_dangling               # everything after: \n  },\n  {\n    slug: "genf-nizza"...
    )

    print(f"Fixed {slug}: {len(part1)+len(part2)} total content chars")
    print(f"Original text: {len(text)} chars -> Fixed: {len(fixed)} chars")
    return fixed

# Fix privatjet-london-dubai
text = fix_broken_article(text, 'privatjet-london-dubai')
print()

# Fix berlin-warsaw
text = fix_broken_article(text, 'berlin-warsaw')
print()

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"All fixes applied! Final file size: {len(text)} chars")

# Verify no more ];` patterns in content fields
broken_pattern = text.find('`\n  },\n];`')
print(f"Remaining broken patterns: {broken_pattern}")
if broken_pattern == -1:
    print("SUCCESS: No more broken template literal patterns found!")
else:
    print(f"WARNING: Still have broken pattern at char {broken_pattern}")
    print(f"Context: {repr(text[broken_pattern-30:broken_pattern+40])}")
