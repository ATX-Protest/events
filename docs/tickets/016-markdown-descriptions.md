# 016: Markdown Support in Event Descriptions

**Status:** Todo
**Priority:** Low

## Summary

Support basic Markdown formatting in event descriptions so organizers can add structure, links, and emphasis to their event details.

## Supported Formatting

Keep it simple - support commonly needed elements:

| Markdown | Renders As |
|----------|------------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[link](url)` | clickable link |
| `- item` | bullet list |
| `1. item` | numbered list |
| Line breaks | Preserved |

### Not Supported (intentionally)
- Headers (h1-h6) - conflicts with page structure
- Images - security/moderation concerns
- HTML - security risk
- Code blocks - not needed for events

## Implementation

### Option A: react-markdown (Recommended)
```bash
npm install react-markdown
```

```tsx
import ReactMarkdown from 'react-markdown';

<ReactMarkdown
  allowedElements={['p', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br']}
  components={{
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        {children}
      </a>
    ),
  }}
>
  {description}
</ReactMarkdown>
```

### Option B: Custom lightweight parser
- Regex-based for just bold/italic/links
- Smaller bundle, more control
- More maintenance

## Tasks

- [ ] Install `react-markdown`
- [ ] Create `MarkdownContent` component with allowed elements
- [ ] Style markdown output (lists, links, etc.)
- [ ] Update event detail page to use `MarkdownContent`
- [ ] Update event cards (truncate safely - strip markdown for preview?)
- [ ] Add markdown preview to admin form
- [ ] Add help text showing supported formatting
- [ ] Sanitize output (react-markdown does this by default)
- [ ] Test XSS prevention

## Admin Form UX

Add a simple toolbar or help text:

```
Description:
[B] [I] [🔗] [• List]  |  Preview ↗

┌────────────────────────────────────────┐
│ Join us for a **peaceful march**       │
│ starting at the Capitol.               │
│                                        │
│ What to bring:                         │
│ - Water                                │
│ - Comfortable shoes                    │
│ - Signs (optional)                     │
│                                        │
│ More info: [ACLU Texas](https://...)   │
└────────────────────────────────────────┘
```

Or simpler: just show supported syntax below the field.

## Acceptance Criteria

- [ ] Bold and italic render correctly
- [ ] Links open in new tab with rel="noopener noreferrer"
- [ ] Bullet and numbered lists render
- [ ] Line breaks preserved
- [ ] No XSS vulnerabilities (HTML stripped)
- [ ] Event card previews handle markdown gracefully (strip or truncate)
- [ ] Admin form shows formatting help
- [ ] Calendar exports include plain text (strip markdown)

## Security Notes

- `react-markdown` sanitizes by default
- Explicitly allowlist elements (no `script`, `iframe`, etc.)
- Links should have `rel="noopener noreferrer"`
- Consider URL validation for links (no `javascript:` URLs)

## Calendar/Share Considerations

When exporting to calendar or sharing:
- Strip markdown, convert to plain text
- Or convert to simple text equivalents (*bold* → BOLD)
- Links: include URL in parentheses

```typescript
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // bold
    .replace(/\*(.*?)\*/g, '$1')       // italic
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)');  // links
}
```
