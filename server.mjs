// MILLA ABOGADOS — Production-grade local server with security hardening
// Security headers, compression, caching, and path traversal protection

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createGzip, createDeflate } from 'node:zlib';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, process.env.SITE_ROOT || '.');
const port = Number(process.env.PORT || 4173);

// MIME types
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

// Cache durations (seconds)
const CACHE = {
  font: 31536000,
  image: 2592000,
  css: 86400,
  js: 86400,
  html: 0,
};

function getCacheDuration(ext) {
  if (['.woff2', '.woff'].includes(ext)) return CACHE.font;
  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.ico'].includes(ext)) return CACHE.image;
  if (ext === '.css') return CACHE.css;
  if (['.js', '.mjs'].includes(ext)) return CACHE.js;
  return CACHE.html;
}

// Security headers
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
    "upgrade-insecure-requests",
  ].join('; '),
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  'X-XSS-Protection': '0',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

function compressible(contentType) {
  return /text|javascript|json|xml|svg/.test(contentType);
}

function getCompressor(req, contentType) {
  if (!compressible(contentType)) return null;
  const accept = req.headers['accept-encoding'] || '';
  if (accept.includes('gzip')) return { encoding: 'gzip', stream: createGzip() };
  if (accept.includes('deflate')) return { encoding: 'deflate', stream: createDeflate() };
  return null;
}

const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { 'Content-Type': 'text/plain', 'Allow': 'GET, HEAD', ...SECURITY_HEADERS });
    res.end('Method Not Allowed');
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    let file = path.join(root, pathname === '/' ? 'index.html' : pathname);

    if (!file.startsWith(root)) {
      res.writeHead(403, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      res.end('Forbidden');
      return;
    }

    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, 'index.html');
    } catch {
      file = path.join(root, 'index.html');
    }

    const ext = path.extname(file).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    const data = await readFile(file);
    const cacheDuration = getCacheDuration(ext);

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheDuration > 0
        ? `public, max-age=${cacheDuration}, immutable`
        : 'no-cache, no-store, must-revalidate',
      ...SECURITY_HEADERS,
    };

    if (['.woff2', '.woff'].includes(ext)) {
      headers['Access-Control-Allow-Origin'] = '*';
    }

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
    const status = error.code === 'ENOENT' ? 404 : 500;
    const message = status === 404 ? 'Not Found' : 'Internal Server Error';
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end(message);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n  MILLA ABOGADOS — http://127.0.0.1:${port}\n  Security: CSP + HSTS + XFO | Compression: gzip\n`);
});
