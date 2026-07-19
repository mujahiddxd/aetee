/**
 * Strips HTML tags from a string to prevent stored XSS.
 * @param {string} str - The input string to sanitize.
 * @returns {string} The sanitized string with HTML tags removed.
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitizes an object's string values by stripping HTML tags.
 * Only processes top-level string values.
 * @param {object} obj - The object whose string values should be sanitized.
 * @param {string[]} keys - The keys to sanitize.
 * @returns {object} A new object with sanitized values.
 */
export function sanitizeFields(obj, keys) {
  const result = { ...obj };
  for (const key of keys) {
    if (typeof result[key] === 'string') {
      result[key] = stripHtml(result[key]);
    }
  }
  return result;
}
