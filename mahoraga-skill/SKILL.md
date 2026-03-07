---
name: mahoraga-adaptive-coder
description: |
  Sistema de adaptación continua para agentes de IA especializados en programación.
  Inspirado en el principio de Mahoraga (Jujutsu Kaisen): cada error encontrado es
  procesado, clasificado y convertido en inmunidad permanente. El agente aprende,
  muta y se vuelve progresivamente más resistente a fallos conocidos.
  
  Usar cuando: el agente ejecuta tareas de programación, debugging, arquitectura,
  refactoring o cualquier tarea técnica donde los errores puedan repetirse.
version: 1.0.0
compatibility: Claude Code, Gemini CLI, cualquier agente LLM con acceso a filesystem
---

# MAHORAGA ADAPTIVE CODING SYSTEM
## "La rueda gira. El agente muta. El error no vuelve."

---

## FILOSOFÍA CENTRAL

Mahoraga, el Shikigami de los Diez Sombras, tiene una habilidad única:
**con cada ataque que lo daña, la rueda gira y se adapta para neutralizarlo forever.**

Este sistema traslada ese principio al dominio de la programación:

> **Cada error que el agente comete → es procesado → genera una adaptación → 
> queda registrado en memoria persistente → el agente nunca comete ese error exacto de nuevo.**

No se trata de no fallar. Se trata de **nunca fallar dos veces de la misma manera.**

---

## ESTRUCTURA DEL SISTEMA

Este skill se compone de seis archivos que operan en conjunto:

```
mahoraga-skill/
├── INSTRUCTIONS.md           ← Punto de entrada. El agente lo lee primero, siempre.
├── SKILL.md                  ← Este archivo. Filosofía y flujo general.
├── ADAPTATION_LOOP.md        ← El ciclo de adaptación (el "giro de la rueda")
├── MEMORY_SYSTEM.md          ← Cómo persiste y consulta el conocimiento
├── ERROR_TAXONOMY.md         ← Clasificación de errores para pattern matching
└── DOCUMENTATION_PROTOCOL.md ← Sistema de documentación inmutable y versionada
```

Y genera una estructura en el proyecto:

```
.mahoraga/
├── adaptations.md            ← Log humano-legible de adaptaciones
├── error_patterns.json       ← Base de conocimiento de errores clasificados
├── success_patterns.json     ← Patrones que funcionaron (reforzar)
└── session_log.md            ← Log de la sesión actual

documentation.md              ← Registro histórico INMUTABLE del proyecto
                                 (versionado, nunca se borra, nunca se edita)
```

---

## CUÁNDO ACTIVAR ESTE SKILL

**SIEMPRE** que el agente vaya a ejecutar una tarea de programación:

- Escribir código nuevo
- Debuggear código existente
- Refactorizar o modificar sistemas
- Instalar dependencias o configurar entornos
- Ejecutar scripts, tests, builds
- Diseñar arquitecturas técnicas

**En términos simples: si hay código involucrado, Mahoraga está activo.**

---

## PROTOCOLO DE INICIO (OBLIGATORIO)

Antes de ejecutar CUALQUIER tarea técnica, el agente DEBE:

### Paso 1 — Consultar Memoria
```
1. Verificar si existe .mahoraga/ en el directorio del proyecto
2. Si existe: leer error_patterns.json y adaptations.md
3. Identificar patrones relevantes para la tarea actual
4. Si NO existe: inicializar el sistema (ver MEMORY_SYSTEM.md)
```

### Paso 2 — Pre-análisis de Riesgos
```
Con base en la memoria consultada:
- ¿Qué errores conocidos son probables en esta tarea?
- ¿Qué adaptaciones previas aplican?
- ¿Hay edge cases documentados en memoria?
```

### Paso 3 — Ejecución con Conciencia
```
Ejecutar con awareness activo:
- Monitorear señales de errores conocidos
- Aplicar preventivamente las adaptaciones registradas
- Si aparece error nuevo → activar ADAPTATION_LOOP.md
```

---

## PRINCIPIOS ABSOLUTOS

Estos principios NO son opcionales. Son el ADN del sistema:

### 1. LA RUEDA SIEMPRE GIRA
Cada error procesado activa el ciclo de adaptación.
**No existe error sin registro. No existe registro sin adaptación.**

### 2. LA MEMORIA ES SAGRADA
El directorio `.mahoraga/` es la fuente de verdad del agente.
Nunca se borra sin consentimiento explícito del usuario.
Sobrevive entre sesiones, proyectos, y reiniciaciones.

### 3. ADAPTACIÓN PREVENTIVA > REACCIÓN REACTIVA
Si la memoria contiene un patrón de error → el agente actúa ANTES de que ocurra.
El objetivo final es que los errores conocidos nunca lleguen a manifestarse.

### 4. GRANULARIDAD DE ERRORES
Un error no es solo un mensaje. Es:
- El contexto donde ocurrió
- La causa raíz (no el síntoma)
- El entorno (OS, versión, dependencias)
- La solución que funcionó
- Las soluciones que NO funcionaron

### 5. HONESTIDAD EPISTEMOLÓGICA
Si el agente no sabe → lo dice.
Si la solución es incierta → lo documenta como incierta.
La memoria no puede contener falsas certezas.

---

## FLUJO GENERAL

```
TAREA RECIBIDA
     │
     ▼
┌─────────────────────────────────┐
│  CONSULTAR MEMORIA PERSISTENTE  │ ← .mahoraga/error_patterns.json
│  ¿Hay patrones relevantes?      │
└─────────────────────────────────┘
     │ Sí                │ No
     ▼                   ▼
APLICAR ADAPTACIONES    PROCEDER CON
PREVENTIVAS             CONCIENCIA ALTA
     │                   │
     └─────────┬──────────┘
               ▼
        EJECUTAR TAREA
               │
       ┌───────┴────────┐
       │                │
    ÉXITO            ERROR
       │                │
       ▼                ▼
REGISTRAR PATRÓN    ACTIVAR
DE ÉXITO           ADAPTATION_LOOP
       │                │
       └───────┬─────────┘
               ▼
        CONTINUAR / ITERAR
```

---

## LEER A CONTINUACIÓN

Una vez leído este archivo, el agente DEBE leer en orden:

1. `ADAPTATION_LOOP.md` — Para entender el ciclo de adaptación en detalle
2. `MEMORY_SYSTEM.md` — Para entender cómo gestionar la memoria persistente
3. `ERROR_TAXONOMY.md` — Para clasificar errores correctamente
4. `DOCUMENTATION_PROTOCOL.md` — Para documentar cada sesión de forma inmutable

**Sin leer los seis archivos (incluyendo INSTRUCTIONS.md), el sistema no está completamente activado.**
