/**
 * Simple markdown to HTML converter for event descriptions.
 * Supports: newlines, headers, bold, italic, strikethrough, and links.
 * Escapes HTML to prevent XSS.
 */

// Escape HTML entities to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Normalize URL - add https:// if no protocol specified
function normalizeUrl(url: string): string {
  // Already has a protocol
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    return url;
  }
  // Relative URL
  if (url.startsWith('/')) {
    return url;
  }
  // Looks like a domain (e.g., bit.ly/something, example.com/path)
  if (/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})/i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

// Validate URL for links - only allow safe protocols
function isValidUrl(url: string): boolean {
  const normalized = normalizeUrl(url);
  try {
    const parsed = new URL(normalized);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    // Allow relative URLs starting with /
    return normalized.startsWith('/');
  }
}

/**
 * Convert simple markdown to HTML.
 *
 * Supported syntax:
 * - Newlines → <br>
 * - # Header → <h1>, ## Header → <h2>, ### Header → <h3>
 * - **bold** or __bold__ → <strong>
 * - *italic* or _italic_ → <em>
 * - ~~strikethrough~~ → <del>
 * - [text](url) → <a href="url">text</a>
 */
export function simpleMarkdownToHtml(text: string): string {
  // First escape HTML to prevent XSS
  let html = escapeHtml(text);

  // Headers (must be at start of line)
  // Process ### before ## before # to avoid partial matches
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Links [text](url) - validate URL for security
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    if (isValidUrl(url)) {
      const normalizedUrl = normalizeUrl(url);
      // External links open in new tab with security attributes
      const isExternal = normalizedUrl.startsWith('http');
      const attrs = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      return `<a href="${normalizedUrl}"${attrs}>${linkText}</a>`;
    }
    // Invalid URL - just return the text
    return linkText;
  });

  // Bold **text** or __text__ (process before italic to avoid conflicts)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // Italic *text* or _text_ (single asterisk/underscore)
  // Use negative lookbehind/ahead to avoid matching inside words for underscore
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/(?<!\w)_([^_]+)_(?!\w)/g, '<em>$1</em>');

  // Strikethrough ~~text~~
  html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  // Split by newlines and wrap non-empty lines in <p> tags
  // Headers are already block elements, don't wrap them
  const lines = html.split(/\n/);
  html = lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      // Headers are already block elements
      if (trimmed.match(/^<h[1-3]>/)) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return html;
}
