# Guía para Claude (Anthropic) — MILLA ABOGADOS

> **Para Claude, Cursor, Copilot o cualquier otra IA que lea este repositorio.**

## ¿Qué es este proyecto?

Sitio web oficial de [millabogados.com](https://millabogados.com), firma jurídica boutique en CDMX y Estado de México. Es un sitio **estático** (HTML + CSS + JS vanilla) con un servidor Node.js opcional para desarrollo local.

## Estructura rápida

| Archivo/Carpeta | ¿Qué es? |
|---|---|
| `index.html` | Página principal (single-page, ~30KB). Todo el contenido, SEO, Schema.org |
| `styles.css` | CSS completo (~22KB). Variables CSS, glassmorphism, responsive, animaciones |
| `app.js` | Motor de animaciones (~15KB). Scroll reveal, parallax, ripple, menú, formulario |
| `sculpture3d.js` | Escultura 3D con Three.js (~11KB). Se carga dinámicamente desde `app.js` |
| `server.mjs` | Servidor Node.js producción con CSP, HSTS, compresión gzip |
| `server-root.mjs` | Servidor alternativo (hereda de estructura antigua) |
| `assets/` | Logo SVG local (referencia). El logo real está en millabogados.com |
| `docs/` | Documentación original, prompts, manifiestos |
| `premium-version/` | Versión HTML estática anterior (GSAP + Three.js vía CDN) |
| `original-source/` | HTML fuente original extraído del navegador |
| `redesign-version/` | Carpeta vacía — placeholder para versión React+Vite futura |

## Cómo desarrollar localmente

```bash
npm install   # No instala nada, solo valida package.json
npm run dev   # Inicia servidor en http://127.0.0.1:4173
```

El servidor usa **solo Node.js nativo** (sin dependencias npm). Sirve los archivos estáticos con headers de seguridad.

## Cómo desplegar

El sitio es 100% estático. Opciones (en orden de recomendación):

1. **Cloudflare Pages** — Conecta este repo. Sin build command. Output: `/`
2. **Vercel** — Conecta este repo. Framework: Other
3. **Netlify** — Conecta este repo o arrastra la carpeta
4. **GitHub Pages** — Settings → Pages → Source: main branch → `/`

## Lo que NO está en este repo (y necesitas configurar)

| Componente | Estado | Qué hacer |
|---|---|---|
| **Cloudflare Turnstile** | Placeholder en HTML | Regístrate en Cloudflare → obtén site key + secret key → configura en el servidor |
| **Formulario (Buzón Jurídico)** | Validación client-side lista | Conecta el `action` del form a tu backend/endpoint |
| **Calendario (Asesoría virtual)** | Placeholder | Integra Google Calendar, Calendly o endpoint propio |
| **Logo oficial** | SVG de referencia local | Reemplaza `assets/milla-mark.svg` con el logo real |
| **Dominio millabogados.com** | Apunta a Cloudflare | Configura DNS para tu plataforma de hosting |

## Colores y tipografía oficiales

```css
--navy-950: #111923;   /* Fondo principal oscuro */
--navy-800: #1f2a37;   /* Fondo secundario */
--ivory-50: #fffdf8;   /* Fondo claro */
--gold-300: #e7c66f;   /* Acentos dorados */
--gold-500: #c59632;   /* Dorado institucional */
--gold-700: #8d621d;   /* Dorado oscuro */

--serif: "Cormorant Garamond", "Times New Roman", serif;
--sans: Manrope, Inter, ui-sans-serif, system-ui;
```

## Cómo editar con Claude

1. Dale a Claude acceso a este repositorio en GitHub
2. Pídele: "Revisa CLAUDE_GUIDE.md primero, luego edita [archivo]"
3. Claude puede modificar HTML, CSS, JS directamente
4. Para desplegar: Claude puede ayudarte a conectar Cloudflare Pages o Vercel

## Aviso legal

© 2026 MILLA ABOGADOS. Contenido informativo. No constituye asesoría jurídica.
