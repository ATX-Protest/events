/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .slice(0, 50); // Limit length
}

/**
 * Generate a unique slug by appending a short UUID suffix
 */
export function generateUniqueSlug(title: string, uuid: string): string {
  const baseSlug = generateSlug(title);
  const shortId = uuid.slice(0, 8);
  return `${baseSlug}-${shortId}`;
}
