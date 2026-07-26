# Guía para Claude y otras IAs — MILLA ABOGADOS

> **Lee esto primero** si eres Claude, Cursor, Copilot, Codex, o cualquier IA que vaya a trabajar con este repositorio.

---

## ¿Qué es esto?

Sitio web oficial de **MILLA ABOGADOS** ([millabogados.com](https://millabogados.com)), firma jurídica boutique en CDMX y Estado de México. Sitio **estático** (HTML + CSS + JS vanilla) con servidor Node.js opcional.

**Dueño:** Yohualli Emiliano García Milla (Socio Director)
**Contacto:** socios@millabogados.com | +52 55 6149 0498

---

## Estructura: qué hace cada archivo

```
millabogados/
│
├── index.html              ← PÁGINA PRINCIPAL (~22KB). Single-page con todas las secciones.
│   Secciones: Hero, Firma, Servicios (Corporativo/Civil/Laboral/Fiscal/Amparo),
│   Método, Equipo, Diferenciadores, Asesoría Virtual, Contacto (Buzón Jurídico)
│   Incluye: SEO meta tags, Open Graph, Schema.org JSON-LD, Cloudflare Turnstile placeholder
│
├── styles.css              ← CSS (~11KB minificado). Variables en :root.
│   Colores: --navy-950, --navy-800, --ivory-50, --gold-300, --gold-500, --gold-700
│   Tipografía: --serif (Cormorant Garamond), --sans (Manrope)
│   Breakpoints: @media 980px, @media 680px, @media (prefers-reduced-motion)
│   Efectos: .reveal (scroll animations), glassmorphism, float keyframes
│
├── app.js                  ← MOTOR DE ANIMACIONES (~10KB). Se carga con defer.
│   Inicializa: menú hamburguesa, formulario, scroll reveal, header glass,
│   active section, cursor glow, smooth scroll, accordion, ripple, parallax,
│   counter, 3D sculpture (dynamic import)
│   Soporta prefers-reduced-motion (desactiva animaciones)
│
├── sculpture3d.js          ← ESCULTURA 3D (~6KB). Módulo ES export default.
│   Carga Three.js desde CDN (unpkg). Geometrías: BoxGeometry + CylinderGeometry.
│   Materiales: MeshStandardMaterial (piedra marfil + oro metálico PBR).
│   Iluminación: AmbientLight + DirectionalLight + PointLight.
│   Interacción: mouse parallax, IntersectionObserver (pausa offscreen).
│   Fallback: SVG inline en index.html si no hay WebGL.
│
├── server.mjs              ← SERVIDOR PRINCIPAL. Node.js nativo, sin dependencias.
│   Puerto: 4173 (configurable con PORT). Raíz: ./ (configurable con SITE_ROOT).
│   Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options.
│   Compresión: gzip/deflate. Cache: fonts 1 año, imágenes 30 días, HTML no cache.
│
├── server-root.mjs         ← SERVIDOR ALTERNATIVO. Similar pero delega a subcarpeta.
│
├── CLAUDE_GUIDE.md         ← ESTE ARCHIVO. Instrucciones para IAs.
├── README.md               ← Documentación general para humanos.
├── package.json            ← Metadata npm. Sin dependencias externas.
│
├── assets/
│   ├── milla-mark.svg      ← Logo SVG local (referencia, 406x427)
│   └── README.md           ← Nota: reemplazar con logo oficial antes de publicar
│
├── docs/                   ← Documentación histórica
│   ├── ANTIGRAVITY_PROMPT.md    ← Prompt original usado para reconstruir el sitio
│   ├── PROJECT_CONTEXT.md       ← Contexto: cómo se extrajo del navegador
│   ├── asset-manifest.json      ← Mapa de assets, rutas y referencias externas
│   └── LICENSE_NOTICE.md        ← Propiedad intelectual
│
├── premium-version/        ← Versión anterior con GSAP + Three.js (CDN, sin build)
├── original-source/        ← HTML extraído directamente de millabogados.com
└── redesign-version/       ← Placeholder para futura versión React + Vite
```

---

## Flujo de carga (cómo se ejecuta la página)

1. `index.html` carga → CSS y meta tags se aplican
2. SVG de la escultura se renderiza (fallback visible)
3. `app.js` se ejecuta (defer) → inicializa menú, animaciones, formulario
4. `app.js` detecta WebGL → importa dinámicamente `sculpture3d.js` → Three.js CDN
5. Si WebGL está disponible → SVG se oculta, canvas 3D se muestra
6. Si no hay WebGL → SVG permanece visible

---

## Paleta de colores oficial

```css
--navy-950: #111923;  /* Fondos oscuros principales */
--navy-900: #182330;
--navy-800: #1f2a37;  /* Header, footer, secciones */
--ivory-50: #fffdf8;  /* Fondo claro principal */
--ivory-100: #f7f2e9; /* Fondo secciones alternas */
--stone-500: #a9957d; /* Texto secundario */
--gold-300: #e7c66f;  /* Acentos, highlights */
--gold-500: #c59632;  /* Dorado institucional */
--gold-700: #8d621d;  /* Dorado oscuro */
```

## Tipografía

- **Títulos:** Cormorant Garamond (serif) — `font-weight: 400`, `letter-spacing: -0.03em`
- **Cuerpo:** Manrope (sans) — `font-weight: 400`
- **Etiquetas:** Manrope 700, `letter-spacing: 0.18em`, uppercase

---

## Qué editar para cambios comunes

| Cambio | Archivo | Dónde |
|---|---|---|
| Texto institucional | `index.html` | Buscar sección por `id` |
| Colores | `styles.css` | Variables en `:root` (línea 1-20) |
| Miembros del equipo | `index.html` | `#equipo` → `.team-card` |
| Servicios | `index.html` | `#servicios` → `.practice-item` |
| Animaciones | `app.js` | Cada `init*()` es independiente |
| Escultura 3D | `sculpture3d.js` | Geometrías en líneas ~70-100 |
| Headers seguridad | `server.mjs` | Objeto `SECURITY_HEADERS` |

---

## Cómo desarrollar

```bash
npm run dev       # http://127.0.0.1:4173
```

Edita `index.html`, `styles.css`, o `app.js` y recarga el navegador. Sin build step.

---

## Cómo desplegar (recomendado: Cloudflare Pages)

1. Conecta este repositorio a Cloudflare Pages
2. Build command: _dejar vacío_
3. Output directory: `/`
4. El sitio se despliega automáticamente en cada push

Alternativas: Vercel, Netlify, GitHub Pages (ver README.md).

---

## Lo que NO funciona todavía (necesita backend)

| Componente | Qué falta |
|---|---|
| **Formulario Buzón Jurídico** | Solo validación client-side. Falta endpoint POST. |
| **Cloudflare Turnstile** | Placeholder. Falta site key + secret key + validación servidor. |
| **Calendario Asesoría Virtual** | Placeholder. Integrar Google Calendar, Calendly o endpoint. |
| **Logo oficial** | SVG es referencia local. Usar PNG/SVG de millabogados.com. |

---

## Si el usuario te pide algo y no sabes

1. **"Conecta el formulario"** → Necesitas un endpoint (Netlify Functions, Cloudflare Workers, Vercel Functions, o backend propio). El HTML ya tiene todos los campos listos.
2. **"Agrega una página nueva"** → Copia la estructura de `index.html`, usa las mismas clases CSS.
3. **"Cambia el diseño"** → Modifica variables en `:root` de `styles.css`.
4. **"¿Dónde están las claves API?"** → No hay. El sitio es estático. Cualquier API key debe configurarse como variable de entorno en la plataforma de hosting.

---

© 2026 MILLA ABOGADOS. Sitio informativo. No constituye asesoría jurídica.
