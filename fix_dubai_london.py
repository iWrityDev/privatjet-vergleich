"""
Fix privatjet-dubai-london article:
1. content field starts with backslash instead of backtick
2. article object closes with embedded `  }` inside the content text
"""

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"File loaded: {len(text)} chars")

# Find the article
slug_pos = text.find('slug: "privatjet-dubai-london"')
print(f"Article found at char: {slug_pos}")

# Find the content field - it starts with backslash, not backtick
content_field_pos = text.find('content: \\', slug_pos)
if content_field_pos == -1:
    # Try finding content: ` (normal backtick)
    content_field_pos = text.find('content: `', slug_pos)
    if content_field_pos != -1:
        print("WARNING: content field uses backtick not backslash - may already be fixed")
    else:
        print("ERROR: content field not found!")
        exit(1)
else:
    print(f"Content field with backslash found at char: {content_field_pos}")

# Check what the content field actually starts with
print(f"Content field start: {repr(text[content_field_pos:content_field_pos+30])}")

# The content field is: content: \<script...
# We need to change it to: content: `<script...
# Then find where it ends (before the next article opening) and add closing backtick

# Fix 1: Replace 'content: \' with 'content: `'
old_start = text[content_field_pos:content_field_pos+12]
print(f"Old start: {repr(old_start)}")
if old_start.startswith('content: \\'):
    new_start = 'content: `'
    # Replace this specific occurrence
    text = text[:content_field_pos] + new_start + text[content_field_pos+len('content: \\'):]
    print(f"Fixed opening: 'content: \\' -> 'content: `'")
    content_start = content_field_pos + len('content: `')
elif old_start.startswith('content: `'):
    print("Opening backtick already correct")
    content_start = content_field_pos + len('content: `')

# Fix 2: Find the end of the content (the embedded `  }` article close)
# The content ends with: </p>  }\n followed by   {\n    slug: "privatjet-hamburg-ibiza
# Find this pattern after content_start
end_marker = '</p>  }\n  {\n    slug: "privatjet-hamburg-ibiza-kosten"'
end_pos = text.find(end_marker, content_start)
if end_pos == -1:
    # Try alternate endings
    end_marker = '</p>  }'
    end_pos = text.find(end_marker, content_start)
    print(f"Found end marker at char: {end_pos}")
    print(f"Context: {repr(text[end_pos-20:end_pos+80])}")
else:
    print(f"Found full end marker at char: {end_pos}")

if end_pos == -1:
    print("ERROR: end marker not found!")
    exit(1)

# The content should end at end_pos + len('</p>')
# Then we need to close the template literal and the article object
content_real_end = end_pos + len('</p>')
print(f"Content ends (real HTML) at char: {content_real_end}")
print(f"Content around end: {repr(text[content_real_end-10:content_real_end+30])}")

# After the real end, there's `  }` (article close) and then the next article
# Find what comes after the embedded `}` to understand the full structure
after_end = text[content_real_end:]
print(f"After real end: {repr(after_end[:60])}")

# Build the replacement:
# OLD: [content]</p>  }\n  {\n    slug: "privatjet-hamburg-ibiza-kosten"
# NEW: [content]</p>`,\n  },\n  {\n    slug: "privatjet-hamburg-ibiza-kosten"
#
# Find where the `  }` ends and where `  {` starts
old_tail = text.find('\n  {\n    slug: "privatjet-hamburg-ibiza-kosten"', content_real_end)
if old_tail == -1:
    print("ERROR: Could not find start of next article!")
    exit(1)

print(f"Old tail (next article start) at char: {old_tail}")
print(f"Old content between real_end and next_article: {repr(text[content_real_end:old_tail])}")

# Replace the chunk from content_real_end to old_tail+1 with `,\n  },`
new_chunk = '`,\n  },'
old_chunk = text[content_real_end:old_tail]
print(f"Replacing '{repr(old_chunk)}' with '{repr(new_chunk)}'")

text = text[:content_real_end] + new_chunk + text[old_tail:]

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"\nFixed! New file size: {len(text)} chars")
print("privatjet-dubai-london now properly structured with template literal")

# Verify
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    verify = f.read()

# Check that the article now has proper backtick
slug_pos2 = verify.find('slug: "privatjet-dubai-london"')
cf_pos2 = verify.find('content: `', slug_pos2)
print(f"\nVerification: content field with backtick at char: {cf_pos2}")
# Find the closing backtick
cs2 = cf_pos2 + len('content: `')
next_tick = verify.find('`', cs2)
print(f"Closing backtick at: {next_tick}")
print(f"Context around close: {repr(verify[next_tick-30:next_tick+60])}")
