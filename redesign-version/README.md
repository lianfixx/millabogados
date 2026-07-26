# Redesign Version — React + Vite + Three.js + GSAP

Esta carpeta contiene el código fuente completo del rediseño de millabogados.com construido con:

- **Vite** — Build tool ultrarrápido
- **React 18** — Componentes interactivos
- **Tailwind CSS** — Estilos con colores de marca
- **React Three Fiber** — Escultura 3D WebGL "Equilibrio 01"
- **GSAP ScrollTrigger** — Animaciones scroll-driven
- **Vitest** — 20/20 tests pasados

## Estructura

```
redesign-version/
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   ├── milla-logo-transparent.svg
│   └── favicon.svg
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx                # App shell con 6 secciones
    ├── index.css              # Tailwind + glassmorphism
    ├── components/
    │   ├── Header.jsx         # Nav glassmorphism + mobile drawer
    │   ├── Footer.jsx         # Footer con links y legales
    │   ├── Hero3D.jsx         # Hero section con R3F Canvas
    │   ├── EquilibrioSculpture.jsx  # Escultura 3D PBR
    │   ├── GoldParticles.jsx  # 160 partículas doradas
    │   ├── FirmaSection.jsx   # Sección "Firma"
    │   ├── ServiciosAccordion.jsx   # Acordeones de práctica
    │   ├── EquipoSection.jsx  # Glassmorphism cards
    │   ├── MethodVisualizer.jsx     # Visualizador 3D del método
    │   ├── BuzonJuridicoForm.jsx    # Formulario seguro
    │   └── FolioModal.jsx     # Modal de confirmación
    ├── utils/
    │   ├── folioGenerator.js  # FOLIO-YYYYMMDD-XXXX
    │   └── sanitize.js        # Sanitización XSS
    └── tests/                 # 20 tests E2E + unitarios
```

## Cómo ejecutar

```bash
cd redesign-version
npm install
npm run dev       # http://localhost:5173
npm run build     # Build de producción
npm test          # 20/20 tests
```

## Relación con el sitio principal

El sitio en producción (raíz del repo) es una versión estática (HTML + CSS + JS vanilla) destilada de este redesign. Esta versión React contiene funcionalidad adicional como:
- Generación de folios `FOLIO-YYYYMMDD-XXXX`
- Sanitización XSS completa
- Modal de confirmación
- Componentes React reutilizables
- Suite de pruebas automatizada

## Verificación

- **Build**: ✅ 2,201 módulos, 0 errores, 3.26s
- **E2E Tests**: ✅ 13/13 (100%)
- **Vitest**: ✅ 20/20 (100%)
- **Auditoría Forense**: ✅ CLEAN
