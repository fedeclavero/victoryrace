# INSTRUCTIONS.md
## Archivo de Activación — Lee esto primero. Siempre.

---

## PARA EL AGENTE QUE LEE ESTO

Este archivo es tu punto de entrada obligatorio.
Antes de hacer cualquier cosa en este proyecto, completá los pasos que siguen.
No hay excepciones. No hay atajos.

---

## PASO 1 — LEER EL SISTEMA MAHORAGA

Leé los siguientes archivos en este orden exacto.
Cada uno es parte de tu protocolo operativo. Todos son obligatorios.

```
mahoraga-skill/SKILL.md              ← Filosofía central y flujo general
mahoraga-skill/ADAPTATION_LOOP.md   ← Cómo procesar y adaptarte a errores
mahoraga-skill/MEMORY_SYSTEM.md     ← Cómo gestionar tu memoria persistente
mahoraga-skill/ERROR_TAXONOMY.md    ← Cómo clasificar errores con precisión
mahoraga-skill/DOCUMENTATION_PROTOCOL.md ← Cómo documentar todo lo que hacés
```

**No procedas hasta haber leído los cinco archivos.**

---

## PASO 2 — CONSULTAR MEMORIA EXISTENTE

Una vez leídos los archivos del sistema:

```
1. Verificar si existe .mahoraga/ en la raíz del proyecto
2. Si existe → leer error_patterns.json, adaptations.md y checklist.md
3. Si existe documentation.md → leer la última versión registrada
4. Si nada existe → inicializar según MEMORY_SYSTEM.md
```

---

## PASO 3 — REGISTRAR INICIO DE SESIÓN

Antes de ejecutar la tarea solicitada, registrá en `documentation.md`
el inicio de esta sesión según el formato definido en `DOCUMENTATION_PROTOCOL.md`.

---

## PASO 4 — EJECUTAR CON EL PROTOCOLO ACTIVO

Ahora sí podés ejecutar la tarea.
Durante toda la ejecución:

- El sistema Mahoraga está activo
- Cada error activa `ADAPTATION_LOOP.md`
- Cada acción relevante se documenta en `documentation.md`
- La memoria en `.mahoraga/` se actualiza al finalizar

---

## CONTRATO CON EL USUARIO

Al leer este archivo, el agente acepta:

```
✓ Nunca borrar ni editar entradas pasadas en documentation.md
✓ Nunca omitir el registro de errores y adaptaciones
✓ Nunca asumir sin verificar contra la memoria existente
✓ Siempre versionar correctamente cada sesión
✓ Siempre dejar el proyecto en un estado documentado y consistente
```

---

## NOTA SOBRE COMPATIBILIDAD

Este sistema está diseñado para funcionar con cualquier agente LLM
que tenga acceso a filesystem: Claude (vía API), Gemini, GPT, u otros.

El protocolo es agnóstico al modelo. La inteligencia está en los archivos.
