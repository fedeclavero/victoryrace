# ADAPTATION_LOOP.md
## El Ciclo de Adaptación — "El Giro de la Rueda"

---

## CONCEPTO

Cuando Mahoraga recibe un golpe, la rueda sobre su cabeza gira.
Ese giro representa procesamiento: el cuerpo analizando el ataque,
recalibrando, construyendo resistencia.

En este sistema, **cada error es un golpe. La rueda es este protocolo.**

---

## EL CICLO COMPLETO (6 FASES)

### FASE 1 — DETECCIÓN
*"El golpe llegó. Reconocerlo."*

Cuando ocurre un error, el agente debe:

```
1. DETENER la ejecución inmediatamente (no continuar con estado corrupto)
2. CAPTURAR el error completo:
   - Mensaje exacto del error
   - Stack trace completo (si existe)
   - Comando/operación que lo generó
   - Contexto del entorno (OS, versión runtime, dependencias activas)
   - Timestamp
3. CLASIFICAR el error usando ERROR_TAXONOMY.md
4. BUSCAR en memoria: ¿existe este patrón en .mahoraga/error_patterns.json?
```

**Si el error YA está en memoria:**
→ La solución documentada debería haber prevenido esto.
→ Analizar por qué la adaptación previa falló.
→ Actualizar el patrón con el nuevo contexto.

**Si el error NO está en memoria:**
→ Error nuevo. Iniciar ciclo completo.

---

### FASE 2 — ANÁLISIS DE CAUSA RAÍZ
*"Entender qué generó el golpe, no solo donde impactó."*

El agente NO debe resolver el síntoma. Debe encontrar la causa raíz.

**Protocolo de los 5 Por Qués (adaptado):**

```
Error: [descripción del error]

¿Por qué ocurrió?          → [respuesta 1]
¿Por qué ocurrió eso?      → [respuesta 2]
¿Por qué ocurrió eso?      → [respuesta 3]
¿Por qué ocurrió eso?      → [respuesta 4]
¿Por qué ocurrió eso?      → [causa raíz]
```

**Preguntas diagnósticas obligatorias:**

```
□ ¿Es un error de entorno? (versiones, dependencias, permisos, OS)
□ ¿Es un error de lógica? (algoritmo incorrecto, edge case no manejado)
□ ¿Es un error de estado? (datos corruptos, estado inconsistente)
□ ¿Es un error de integración? (APIs, servicios externos, interfaces)
□ ¿Es un error de concurrencia? (race conditions, deadlocks)
□ ¿Es un error de configuración? (variables de entorno, archivos config)
□ ¿Es un error de tipado/schema? (tipos incompatibles, validación fallida)
□ ¿Es un error de red/IO? (timeout, conexión rechazada, archivo no encontrado)
```

---

### FASE 3 — FORMULACIÓN DE HIPÓTESIS
*"Proponer el contraataque antes de ejecutarlo."*

Antes de intentar cualquier solución, el agente debe:

```
HIPÓTESIS DE SOLUCIÓN:
├── Hipótesis Principal: [solución más probable]
│   ├── Fundamento: [por qué esta solución debería funcionar]
│   ├── Riesgo: [qué podría salir mal]
│   └── Verificación: [cómo confirmar que funcionó]
│
├── Hipótesis Alternativa 1: [segunda opción]
│   └── Activar si: [condición que invalida la hipótesis principal]
│
└── Hipótesis Alternativa 2: [tercera opción]
    └── Activar si: [condición que invalida la alternativa 1]
```

**REGLA CRÍTICA:** No ejecutar soluciones sin hipótesis documentada.
Ejecutar sin hipótesis es actuar por tanteo — el sistema opuesto a Mahoraga.

---

### FASE 4 — APLICACIÓN Y VERIFICACIÓN
*"El contraataque."*

```
EJECUTAR Hipótesis Principal
    │
    ├── ÉXITO → Ir a FASE 5
    │
    └── FALLO
          │
          ├── Documentar por qué falló
          ├── Activar Hipótesis Alternativa 1
          └── Repetir hasta agotar hipótesis
                    │
                    └── Si todas fallan → FASE DE ESCALACIÓN (ver abajo)
```

**Verificación de éxito requiere:**
```
□ El error original ya no ocurre
□ No se introdujeron nuevos errores
□ Los tests existentes siguen pasando (si existen)
□ El comportamiento esperado se cumple
```

**FASE DE ESCALACIÓN (cuando todas las hipótesis fallan):**
```
1. Documentar todas las hipótesis intentadas y sus resultados
2. Re-analizar la causa raíz (puede ser incorrecta)
3. Buscar en fuentes externas (docs, issues, SO) si el entorno lo permite
4. Reformular hipótesis con nueva información
5. Si el bloqueo persiste → reportar al usuario con diagnóstico completo
```

---

### FASE 5 — CODIFICACIÓN DE LA ADAPTACIÓN
*"La rueda terminó de girar. El agente es diferente."*

Una vez resuelto el error, codificar la adaptación en memoria:

**Formato de registro en `.mahoraga/error_patterns.json`:**

```json
{
  "id": "ERR-[TIMESTAMP]-[HASH_CORTO]",
  "timestamp": "ISO-8601",
  "category": "[categoría de ERROR_TAXONOMY.md]",
  "subcategory": "[subcategoría]",
  "severity": "[critical|high|medium|low]",
  
  "error": {
    "message": "[mensaje exacto del error]",
    "type": "[tipo: TypeError, ImportError, etc.]",
    "command": "[comando que lo generó]",
    "file": "[archivo donde ocurrió, si aplica]",
    "line": "[línea, si aplica]"
  },
  
  "environment": {
    "os": "[sistema operativo]",
    "runtime": "[node 20.x / python 3.11 / etc.]",
    "dependencies": "[dependencias relevantes con versiones]",
    "context": "[descripción del proyecto/tarea]"
  },
  
  "root_cause": {
    "summary": "[causa raíz en una oración]",
    "detail": "[explicación técnica completa]",
    "why_it_happens": "[mecanismo que genera el error]"
  },
  
  "failed_attempts": [
    {
      "hypothesis": "[qué se intentó]",
      "reason_failed": "[por qué no funcionó]"
    }
  ],
  
  "solution": {
    "description": "[descripción de la solución]",
    "steps": ["paso 1", "paso 2", "paso N"],
    "code_example": "[snippet de código si aplica]",
    "confidence": "[high|medium|low]",
    "verified": true
  },
  
  "prevention": {
    "detection_signals": ["señal 1", "señal 2"],
    "preventive_action": "[qué hacer ANTES para evitar este error]",
    "checklist_item": "[ítem para agregar al pre-execution checklist]"
  },
  
  "tags": ["tag1", "tag2"],
  "recurrence_count": 1,
  "last_seen": "ISO-8601"
}
```

**Formato de registro en `.mahoraga/adaptations.md`:**

```markdown
## [FECHA] — [CATEGORÍA] — [RESUMEN EN UNA LÍNEA]

**Error:** `[mensaje del error]`
**Causa Raíz:** [explicación humana]
**Solución:** [qué se hizo para resolverlo]
**Prevención:** [cómo evitarlo en el futuro]
**Tags:** #tag1 #tag2

---
```

---

### FASE 6 — ACTUALIZACIÓN DEL CHECKLIST PREVENTIVO
*"El agente nunca volverá a recibir este golpe."*

Cada adaptación exitosa debe traducirse en una acción preventiva concreta.

El agente mantiene en `.mahoraga/adaptations.md` una sección especial:

```markdown
## PRE-EXECUTION CHECKLIST (Auto-generado por adaptaciones)

### Entorno
- [ ] Verificar versión de [runtime] es >= [versión mínima] 
      → Previene: ERR-[ID] ([descripción])
- [ ] Confirmar que [dependencia] está instalada
      → Previene: ERR-[ID] ([descripción])

### Configuración
- [ ] Variables de entorno [VAR_NAME] están definidas
      → Previene: ERR-[ID] ([descripción])

### Código
- [ ] Manejar el caso donde [condición edge case]
      → Previene: ERR-[ID] ([descripción])

[... el checklist crece con cada adaptación ...]
```

**Este checklist se ejecuta en el Paso 2 del PROTOCOLO DE INICIO (SKILL.md).**

---

## ADAPTACIÓN EN CADENA

Algunos errores tienen dependencias. Si resolver ERR-A revela ERR-B:

```
ERR-A detectado
    → Resuelto → revela ERR-B
                    → Resuelto → revela ERR-C
                                    → Resuelto → ÉXITO

Registrar como cadena de errores relacionados.
La solución de ERR-A incluye referencia a ERR-B como consecuencia esperada.
```

---

## MÉTRICAS DE ADAPTACIÓN

El agente debe poder responder en cualquier momento:

```
□ ¿Cuántos errores únicos han sido procesados?
□ ¿Cuántos errores fueron prevenidos por adaptaciones previas?
□ ¿Cuál es la categoría de error más frecuente en este proyecto?
□ ¿Cuál es el tiempo promedio de resolución por categoría?
```

Estas métricas viven en `.mahoraga/session_log.md`.

---

## REGLA DE ORO

> Si el agente comete el mismo error exacto dos veces,
> el sistema de adaptación ha fallado.
> Investigar por qué la adaptación no fue consultada o no fue suficiente.
