# MILLA ABOGADOS

> **🌐 [millabogados.com](https://millabogados.com)** — Firma jurídica boutique en Ciudad de México y Estado de México.

Repositorio completo del sitio web. Preparado para que **cualquier IA** (Claude, Codex, Cursor, Copilot) pueda retomar el desarrollo. Lee [`CLAUDE_GUIDE.md`](CLAUDE_GUIDE.md) si vienes de Claude o Anthropic.

---

## 🚀 Arranque rápido

```bash
npm run dev        # Servidor en http://127.0.0.1:4173
```

Sin dependencias — solo Node.js nativo.

---

## 📁 Estructura completa

```
millabogados/
├── index.html              # Página principal (~22KB, single-page)
├── styles.css              # CSS premium (glassmorphism, animaciones, responsive)
├── app.js                  # Motor de animaciones (scroll reveal, parallax, menú, formulario)
├── sculpture3d.js          # Escultura 3D Three.js con fallback SVG
├── server.mjs              # Servidor Node.js producción (CSP, HSTS, gzip)
├── server-root.mjs         # Servidor alternativo
├── package.json            # Configuración npm
├── CLAUDE_GUIDE.md         # 🔑 Guía completa para Claude y otras IAs
├── README.md               # Este archivo
├── .gitignore
│
├── assets/
│   ├── milla-mark.svg      # Logo local de referencia
│   └── README.md           # Nota sobre el logo oficial
│
├── docs/
│   ├── ANTIGRAVITY_PROMPT.md    # Prompt original de reconstrucción
│   ├── PROJECT_CONTEXT.md       # Contexto de recuperación del sitio
│   ├── asset-manifest.json      # Referencias de assets y rutas
│   └── LICENSE_NOTICE.md        # Aviso de propiedad intelectual
│
├── premium-version/        # Versión HTML estática premium (GSAP + Three.js CDN)
│   ├── index.html
│   ├── css/style.css
│   └── js/
│
├── original-source/        # HTML fuente original extraído del navegador
│   ├── index.html          # ~68KB, la versión pública exacta
│   ├── custom.css
│   └── custom.js
│
└── redesign-version/       # Placeholder para futura versión React + Vite
```

---

## 🎨 Diseño

| Elemento | Valor |
|---|---|
| **Tipografía** | Cormorant Garamond (serif) + Manrope (sans) |
| **Paleta** | Navy #1f2a37, Ivory #fffdf7, Gold #c5942e |
| **Efectos** | Glassmorphism, parallax, scroll reveal, cursor glow, ripple |
| **3D** | Escultura geométrica Three.js con reflejos PBR, partículas doradas |
| **Accesibilidad** | ARIA labels, skip links, keyboard nav, reduced motion, contraste |

---

## 🔌 Integraciones (qué conectar)

El sitio funciona completo como estático. Las siguientes integraciones requieren configuración adicional:

| Componente | Archivo | Estado | Acción necesaria |
|---|---|---|---|
| **Formulario (Buzón Jurídico)** | `index.html` (`.legal-inbox`) | Validación client-side lista | Conectar `action` a endpoint backend |
| **Cloudflare Turnstile** | `index.html` | Placeholder | Registrarse en Cloudflare → site key + secret key |
| **Calendario** | `index.html` (`#asesoria-virtual`) | Placeholder | Google Calendar / Calendly / endpoint propio |
| **Logo oficial** | `assets/milla-mark.svg` | SVG referencia | Reemplazar con logo real de millabogados.com |
| **WhatsApp** | `index.html` | Link directo listo | Número configurado: +52 55 6149 0498 |
| **Email** | `index.html` | Links mailto listos | socios@millabogados.com |

---

## 🚢 Despliegue

| Plataforma | Cómo |
|---|---|
| **Cloudflare Pages** ⭐ | Conecta repo → sin build → output `/` |
| **Vercel** | Conecta repo → Framework: Other |
| **Netlify** | Conecta repo o arrastra carpeta |
| **GitHub Pages** | Settings → Pages → main branch |

---

## ⚠️ Seguridad

Este repositorio contiene **código público del frontend**. No incluye ni debe incluir:
- ❌ Claves secretas de API
- ❌ Tokens de acceso
- ❌ Contraseñas de bases de datos
- ❌ Secretos de Cloudflare Turnstile

Las claves públicas visibles en el HTML (site key de Turnstile, número de WhatsApp, email) son datos públicos por diseño.

---

## 🤖 Para otras IAs

Si otra IA va a trabajar con este proyecto, indícale que lea primero **`CLAUDE_GUIDE.md`**. Contiene:
- Explicación de cada archivo y su propósito
- Instrucciones de desarrollo y despliegue
- Paleta de colores y tipografía oficial
- Qué está completo y qué falta conectar

---

© 2026 MILLA ABOGADOS. Contenido informativo. No constituye asesoría jurídica.
