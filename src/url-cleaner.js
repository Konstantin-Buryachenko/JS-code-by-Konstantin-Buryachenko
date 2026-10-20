/**
 * URL Cleaner: remove common marketing parameters without removing functional query parameters.
 * Node.js 20+ / modern browsers (ES modules).
 */
const TRACKING_PARAMS = new Set([
  'fbclid', 'gclid', 'dclid', 'gbraid', 'wbraid', 'msclkid',
  'ttclid', 'twclid', 'li_fat_id', 'igshid', 'mc_cid', 'mc_eid',
  '_hsenc', '_hsmi', 'mkt_tok', 'yclid'
]);

export function isTrackingParameter(key) {
  if (typeof key !== 'string') return false;
  const normalized = key.toLowerCase();
  return normalized.startsWith('utm_') || TRACKING_PARAMS.has(normalized);
}

/** Remove tracking query parameters from an absolute HTTP(S) URL. */
export function cleanUrl(input) {
  if (typeof input !== 'string') throw new TypeError('URL must be a string');
  const url = new URL(input);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new TypeError('Only HTTP and HTTPS URLs are supported');
  }

  const queryStart = input.indexOf('?');
  const hashStart = input.indexOf('#');
  const hasQuery = queryStart !== -1 && (hashStart === -1 || queryStart < hashStart);
  if (!hasQuery) return input;

  const queryEnd = hashStart !== -1 ? hashStart : input.length;
  const originalQuery = input.slice(queryStart + 1, queryEnd);
  const segments = originalQuery.split('&');
  const filtered = segments.filter((segment) => {
    const key = segment.split('=', 1)[0];
    try {
      const decodedKey = decodeURIComponent(key.replace(/\+/g, ' '));
      return !isTrackingParameter(decodedKey);
    } catch {
      return true; // Preserve malformed encodings rather than risk deleting data.
    }
  });

  if (filtered.length === segments.length) return input;
  const beforeQuery = input.slice(0, queryStart);
  const afterQuery = input.slice(queryEnd);
  return filtered.length
    ? `${beforeQuery}?${filtered.join('&')}${afterQuery}`
    : `${beforeQuery}${afterQuery}`;
}

/** Clean several URLs; return an individual result for each. */
export function cleanUrls(inputs) {
  if (!Array.isArray(inputs)) throw new TypeError('Expected an array');
  return inputs.map((input) => {
    try {
      return { original: input, cleaned: cleanUrl(input), success: true };
    } catch (error) {
      return { original: input, cleaned: null, success: false, error: error.message };
    }
  });
}
