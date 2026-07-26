# MILLA ABOGADOS

Sitio web oficial de [millabogados.com](https://millabogados.com) — Firma jurídica boutique en Ciudad de México y Estado de México.

> ⚠️ **Aviso importante:** Este repositorio contiene información institucional pública. Las claves de API, secretos de servidor y configuraciones de backend NO están incluidas porque no forman parte del HTML público. Consulta la sección [Seguridad](#seguridad-y-configuración) para más información.

## Sobre el proyecto

Sitio web premium con diseño editorial, animaciones fluidas y escultura 3D interactiva. Construido con tecnologías web estándar para máximo rendimiento y portabilidad.

### Características

- **Diseño editorial premium** — glassmorphism, tipografía Cormorant Garamond + Manrope
- **Escultura 3D interactiva** — Three.js con fallback SVG
- **Animaciones fluidas** — scroll reveal, parallax, ripple effects, counter animations
- **Navegación accesible** — ARIA labels, skip links, keyboard navigation, reduced motion
- **SEO completo** — Schema.org structured data, Open Graph, Twitter Cards, meta tags
- **Formulario "Buzón Jurídico"** — validación client-side, honeypot anti-spam
- **Servidor Node.js** — headers de seguridad (CSP, HSTS, X-Frame-Options), compresión gzip

## Estructura del proyecto

```
millabogados/
├── index.html              # Página principal (single-page)
├── styles.css              # CSS premium (glassmorphism, animaciones)
├── app.js                  # Motor de animaciones y lógica frontend
├── sculpture3d.js          # Escultura 3D con Three.js + fallback SVG
├── server.mjs              # Servidor Node.js producción (security headers)
├── server-root.mjs         # Servidor alternativo (delega a editable/)
├── package.json            # Configuración npm
├── assets/                 # Recursos gráficos (logo, favicon)
├── premium-version/        # Versión HTML estática premium (GSAP + Three.js)
├── original-source/        # HTML fuente original y archivos públicos
├── docs/                   # Documentación, prompts y manifiestos
└── redesign-version/       # Versión React + Vite (para referencia futura)
```

## Desarrollo local

```bash
# Instalar dependencias (solo Node.js nativo, sin paquetes externos)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor inicia en `http://127.0.0.1:4173` con:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options, X-Content-Type-Options
- Compresión gzip/deflate
- Cache inteligente por tipo de archivo

## Despliegue

Este sitio es completamente estático (HTML + CSS + JS) y puede desplegarse en:

| Plataforma | Instrucciones |
|---|---|
| **Cloudflare Pages** | Conecta este repositorio. Build command: _none_. Output directory: `/` |
| **Vercel** | Conecta este repositorio. Framework: _Other_. |
| **Netlify** | Arrastra la carpeta o conecta el repo. |
| **GitHub Pages** | Settings → Pages → Source: main branch |
| **Cualquier hosting** | Sirve los archivos estáticos con un servidor web |

## Tecnologías

- **HTML5 semántico** con ARIA
- **CSS3**: Custom Properties, Grid, Flexbox, glassmorphism, animaciones
- **JavaScript vanilla** (ES Modules): Intersection Observer, Scroll, Form handling
- **Three.js** (CDN): Escultura 3D con materiales PBR y WebGL
- **Node.js**: Servidor HTTP nativo con security headers
- **Schema.org**: Datos estructurados para SEO

## Seguridad y configuración

### Lo que SÍ está en este repositorio
- Todo el código fuente del frontend
- Servidor de desarrollo local
- Políticas de seguridad (CSP, HSTS)
- Estructura completa del sitio

### Lo que NO está (y nunca debería estar)
- Claves secretas de Cloudflare Turnstile
- Tokens de API
- Configuraciones de backend
- Credenciales de bases de datos
- Secrets de despliegue

### Si necesitas reconstruir integraciones:
1. **Cloudflare Turnstile**: Regístrate en Cloudflare, obtén site key + secret key
2. **Formulario de contacto**: Conecta el endpoint del Buzón Jurídico a tu backend
3. **Calendario**: Integra Google Calendar, Calendly o tu propio endpoint
4. **Variables de entorno**: Crea un `.env` (no se commitea) con tus claves

## Aviso legal

© 2026 MILLA ABOGADOS. El contenido de este sitio es informativo y no constituye asesoría jurídica. La prestación de servicios comienza únicamente mediante la aceptación formal del asunto y la documentación correspondiente. No se garantizan resultados.
