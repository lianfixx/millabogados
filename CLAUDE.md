@AGENTS.md

# Claude Code en este repositorio

- Reglas comunes entre IA: `ia/REGLAS.md` y `ia/PROTOCOLO.md`. Frenos activos en `.claude/settings.json` → `ia/guard.py` (política en `ia/politica.json`, pruebas en `ia/test_guard.py`). Si un freno bloquea algo legítimo, explícaselo a Emi; no lo desactives ni lo rodees. Todo cambio se registra en el mismo commit con `Agente: Claude Code`.
