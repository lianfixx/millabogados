# Prompt para Antigravity

Analiza todo este proyecto antes de modificar archivos.

Contexto: este proyecto corresponde al sitio oficial de MILLA ABOGADOS. `original/` contiene el HTML renderizado que fue guardado desde el navegador; `public/` conserva la estructura pública y usa los bundles de producción como referencia; `editable/` es una reconstrucción local, legible y sin framework.

Objetivo principal:
1. Audita estructura, diseño, responsividad, accesibilidad, SEO, rendimiento, rutas, formulario y seguridad.
2. Usa `public/index.html` como referencia visual y semántica, y `editable/` como base de trabajo.
3. Mantén la identidad institucional: azul profundo, marfil, dorado sobrio, tipografía editorial, minimalismo jurídico boutique y comunicación profesional.
4. No cambies textos jurídicos, nombres, cargos, teléfonos, correos, aviso de privacidad ni datos institucionales sin señalarlo primero.
5. No inventes APIs, credenciales, bases de datos ni integraciones que no existan.
6. Separa frontend y backend. Toda clave secreta debe permanecer únicamente en variables de entorno del servidor.
7. Reconstruye el calendario y el Buzón Jurídico con arquitectura segura, protección anti-spam, validación del servidor, consentimiento y trazabilidad.
8. Conserva navegación por teclado, etiquetas ARIA, contraste suficiente, reduced motion y diseño móvil.
9. Antes de implementar cambios grandes, crea un plan por fases y enumera los archivos que modificarás.
10. Después de cada fase, ejecuta pruebas y documenta el resultado.

Primera tarea: entrega una auditoría técnica priorizada y una propuesta de arquitectura. No elimines archivos ni reemplaces el proyecto completo hasta concluir esa auditoría.
