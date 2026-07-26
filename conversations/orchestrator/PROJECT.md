# Orquestador — Proyecto millabogados.com

## Arquitectura
Vite + React SPA con Three.js (React Three Fiber) WebGL, GSAP ScrollTrigger, Tailwind CSS glassmorphism, formulario seguro, y suite de pruebas automatizada.

## Módulos
1. **App Shell & Layout** — Header, Footer, anclas de navegación
2. **Hero & 3D WebGL** — Escultura "Equilibrio 01" (R3F, PBR mármol y oro, 360° mouse/touch)
3. **Áreas de práctica** — Acordeones interactivos con GSAP en `#servicios`
4. **Visualizador de método** — Document stack interactivo en `#diferenciadores`
5. **Equipo** — Glassmorphism cards con bordes metálicos en `#equipo`
6. **Buzón Jurídico** — Formulario en `#contacto` y `#asesoria-virtual` con validación, honeypot, XSS, folio
7. **E2E Testing Suite** — Pruebas automatizadas de renderizado, interactividad, formulario, seguridad

## Milestones
| # | Nombre | Estado |
|---|--------|--------|
| 0 | E2E Test Suite Creation | DONE |
| 1 | App Shell & Base Layout | DONE |
| 2 | Brand Content, Practice Accordions & Method Visualizer | DONE |
| 3 | Three.js 3D Hero Sculpture ("Equilibrio 01") | DONE |
| 4 | GSAP Micro-Animations & Glassmorphism | DONE |
| 5 | Secure "Buzón Jurídico" & Folio Generator | DONE |
| 6 | E2E Test Execution & Pass 100% | DONE |
| 7 | Adversarial Hardening & Forensic Audit | DONE (CLEAN) |

## Stack tecnológico
- Vite + React
- Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- GSAP (`gsap`, ScrollTrigger)
- Tailwind CSS
- DOMPurify (sanitización XSS)
- Vitest (testing)

## Contratos de interfaz

### Formulario
- `generateFolio()` → `FOLIO-YYYYMMDD-XXXX` (fecha UTC + 4 caracteres hex aleatorios únicos)
- `sanitizeInput(input)` → elimina `<script>`, `<iframe>`, event handlers, HTML tags
- Payload: `{ nombre, email, telefono?, asunto, mensaje }` + honeypot (debe estar vacío)

### Escultura 3D
- `<EquilibrioSculpture cursorPosition={{ x, y }} />`
- Mármol marfil: Roughness ~0.3, Metalness 0.05, color `#fffdf7`
- Oro pulido: Roughness ~0.15, Metalness 0.95, color `#c5942e`
