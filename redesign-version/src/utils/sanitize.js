// MILLA ABOGADOS — Sanitización XSS para el Buzón Jurídico.
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/onerror\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/onload\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:[^\s'"]+/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}
