# Instrucciones para cualquier IA · lianfixx/millabogados

Lee primero `CLAUDE_GUIDE.md` (estructura y reglas del sitio) y `README.md`. Las instrucciones actuales de Emi prevalecen.

## Trabajo entre IA (obligatorio para cualquier IA o persona)

Este repositorio sigue el protocolo común de `ia/PROTOCOLO.md`; las reglas concretas están en `ia/REGLAS.md`.
- Fuente de verdad: el repositorio remoto y su estado vigente (`CLAUDE_GUIDE.md`, `BACKEND_SPEC.md` y `CHANGELOG.md`), no la memoria de una conversación.
- Todo cambio se registra en el mismo commit, con la línea `Agente:` (protocolo, sección 3). Sin escritura, entrega un «Registro pendiente para el repositorio».
- Lo prohibido y lo que requiere confirmación de Emi vale en Claude, ChatGPT, Codex, Gemini y cualquier otra IA. Con terminal, ejecuta `sh ia/instalar.sh` una vez por copia. GitHub revisa cada push con `registro-ia.yml`.
- Para pasar trabajo a otra IA: `ia/plantillas/PETICION.md` y `ia/plantillas/ENTREGA.md`.
