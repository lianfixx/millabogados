// Root-level server — delegates to editable/server.mjs for the premium version
// Run with: node server-root.mjs  OR  npm run preview

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createGzip, createDeflate } from 'node:zlib';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = process.env.SITE_ROOT || 'editable';
const root = path.resolve(__dirname, siteRoot);
const port = Number(process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://unpkg.com https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function getCompressor(req, contentType) {
  if (!/text|javascript|json|xml|svg/.test(contentType)) return null;
  const accept = req.headers['accept-encoding'] || '';
  if (accept.includes('gzip')) return { encoding: 'gzip', stream: createGzip() };
  if (accept.includes('deflate')) return { encoding: 'deflate', stream: createDeflate() };
  return null;
}

const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('Method Not Allowed');
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    let file = path.join(root, pathname === '/' ? 'index.html' : pathname);
    if (!file.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
    try { if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html'); }
    catch { file = path.join(root, 'index.html'); }

    const ext = path.extname(file).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    const data = await readFile(file);
    const headers = { 'Content-Type': contentType, 'Cache-Control': 'no-store', ...SECURITY_HEADERS };

    const compressor = getCompressor(req, contentType);
    if (compressor) {
      headers['Content-Encoding'] = compressor.encoding;
      headers['Vary'] = 'Accept-Encoding';
      res.writeHead(200, headers);
      if (req.method === 'HEAD') { res.end(); return; }
      Readable.from(data).pipe(compressor.stream).pipe(res);
    } else {
      headers['Content-Length'] = data.length;
      res.writeHead(200, headers);
      if (req.method === 'HEAD') { res.end(); return; }
      res.end(data);
    }
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end(error.code === 'ENOENT' ? 'Not Found' : 'Server Error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n  MILLA ABOGADOS — http://127.0.0.1:${port}\n  Serving: ${root}\n  Security: CSP + XFO | Compression: gzip\n`);
});
