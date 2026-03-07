# MEMORY_SYSTEM.md
## Sistema de Memoria Persistente — "La Rueda Que Nunca Se Olvida"

---

## PRINCIPIO

La memoria de Mahoraga no se resetea entre batallas.
Cada adaptación es permanente, acumulativa, transferible.

Este archivo define cómo el agente gestiona su conocimiento persistente:
cómo lo inicializa, cómo lo consulta, cómo lo actualiza y cómo lo protege.

---

## ESTRUCTURA DE MEMORIA

### Directorio raíz
```
.mahoraga/
├── adaptations.md          ← Registro humano-legible de todo lo aprendido
├── error_patterns.json     ← Base de conocimiento estructurada de errores
├── success_patterns.json   ← Patrones que funcionaron (reforzar y reusar)
├── session_log.md          ← Log de la sesión actual con métricas
└── checklist.md            ← Checklist preventivo auto-generado
```

### Ubicación del directorio
- **Por defecto:** en la raíz del proyecto donde se ejecuta el agente
- **Global (multi-proyecto):** en `~/.mahoraga/` si el agente opera en múltiples proyectos
- Si ambos existen: combinar ambos en consulta (proyecto tiene precedencia en conflictos)

---

## INICIALIZACIÓN

Cuando el directorio `.mahoraga/` no existe, el agente lo crea:

```bash
mkdir -p .mahoraga
```

### Archivo inicial: `error_patterns.json`
```json
{
  "schema_version": "1.0",
  "created_at": "[ISO-8601]",
  "project": "[nombre del proyecto o directorio]",
  "agent": "[identificador del agente si disponible]",
  "total_errors_processed": 0,
  "total_errors_prevented": 0,
  "patterns": []
}
```

### Archivo inicial: `success_patterns.json`
```json
{
  "schema_version": "1.0",
  "created_at": "[ISO-8601]",
  "patterns": []
}
```

### Archivo inicial: `adaptations.md`
```markdown
# MAHORAGA — REGISTRO DE ADAPTACIONES

> Sistema de memoria adaptativa activado.
> Cada error procesado fortalece al agente.
> La rueda gira. El agente muta.

---

## PRE-EXECUTION CHECKLIST
*(Se auto-genera con cada adaptación)*

*(vacío al inicio — se poblará automáticamente)*

---

## HISTORIAL DE ADAPTACIONES

*(vacío al inicio)*
```

### Archivo inicial: `checklist.md`
```markdown
# CHECKLIST PREVENTIVO — MAHORAGA
*(Auto-generado. No editar manualmente.)*

## Estado: VACÍO
Este checklist se popula automáticamente a medida que el agente
procesa errores y registra adaptaciones preventivas.

Errores procesados: 0
Ítems en checklist: 0
Última actualización: [ISO-8601]
```

### Archivo inicial: `session_log.md`
```markdown
# SESSION LOG — MAHORAGA

## Sesión actual
- Inicio: [ISO-8601]
- Tarea principal: [descripción]
- Errores encontrados: 0
- Errores prevenidos por memoria: 0
- Adaptaciones nuevas registradas: 0

## Historial de sesiones
*(se acumula aquí al finalizar cada sesión)*
```

---

## PROTOCOLO DE CONSULTA DE MEMORIA

### Al inicio de cada tarea

```
PASO 1: Cargar error_patterns.json
PASO 2: Extraer patrones relevantes a la tarea actual
        Criterios de relevancia:
        - Misma categoría de tarea (ver ERROR_TAXONOMY.md)
        - Mismas dependencias/tecnologías involucradas
        - Mismo tipo de entorno
        - Tags coincidentes
        
PASO 3: Cargar checklist.md y ejecutar ítems aplicables
PASO 4: Cargar success_patterns.json para reusar lo que funcionó
PASO 5: Registrar en session_log.md: "Sesión iniciada, memoria consultada"
```

### Algoritmo de búsqueda en memoria

Cuando ocurre un error, buscar coincidencias en este orden de prioridad:

```
1. EXACT MATCH: mensaje de error idéntico + mismo entorno
   → Confianza: ALTA. Aplicar solución directamente.

2. PATTERN MATCH: mensaje de error similar (mismo tipo, diferente contexto)
   → Confianza: MEDIA. Adaptar solución al contexto actual.

3. CATEGORY MATCH: misma categoría de error, diferente mensaje
   → Confianza: BAJA. Usar como punto de partida, verificar.

4. TAG MATCH: tags coincidentes
   → Confianza: MUY BAJA. Solo como referencia.

5. NO MATCH: error completamente nuevo
   → Iniciar ciclo completo en ADAPTATION_LOOP.md
```

---

## PROTOCOLO DE ESCRITURA EN MEMORIA

### Cuándo escribir
- **Inmediatamente** después de resolver un error (no diferir)
- **Inmediatamente** después de un éxito notable con patrón reusable
- **Al finalizar** cada sesión (actualizar session_log.md)

### Reglas de escritura

```
NUNCA sobreescribir un patrón existente sin:
  1. Incrementar recurrence_count
  2. Actualizar last_seen
  3. Preservar el historial de failed_attempts anterior
  4. Documentar por qué se actualizó la solución (si cambió)

SIEMPRE verificar duplicados antes de insertar:
  - Comparar hash del mensaje de error
  - Si ya existe → ACTUALIZAR, no crear nuevo

SIEMPRE mantener atomicidad:
  - Escribir JSON completo, nunca parcial
  - Si hay error al escribir → reintentar
  - Nunca dejar archivos en estado corrupto
```

---

## PATRONES DE ÉXITO

No solo los errores merecen memoria. Los éxitos también.

### Qué registrar como patrón de éxito

```
- Soluciones elegantes que resolvieron problemas complejos
- Arquitecturas que escalaron bien
- Combinaciones de herramientas que funcionaron perfectamente
- Prompts o comandos que produjeron resultados superiores
- Configuraciones de entorno que evitaron problemas
```

### Formato en `success_patterns.json`

```json
{
  "id": "SUC-[TIMESTAMP]-[HASH]",
  "timestamp": "ISO-8601",
  "category": "[categoría]",
  "title": "[título descriptivo]",
  "context": "[dónde/cuándo aplica]",
  "pattern": {
    "description": "[qué se hizo]",
    "code_example": "[snippet si aplica]",
    "rationale": "[por qué funciona]"
  },
  "applicability": {
    "technologies": ["tech1", "tech2"],
    "scenarios": ["escenario1", "escenario2"],
    "limitations": ["limitación1"]
  },
  "tags": ["tag1", "tag2"],
  "use_count": 1
}
```

---

## MIGRACIÓN Y PORTABILIDAD

El directorio `.mahoraga/` puede copiarse entre proyectos y entornos.

### Exportar conocimiento
```bash
# Crear archivo de exportación
tar -czf mahoraga-knowledge-[DATE].tar.gz .mahoraga/
```

### Importar conocimiento de otro proyecto
```bash
# Los patrones del proyecto B pueden enriquecer el proyecto A
# El agente debe COMBINAR, nunca reemplazar
# En conflictos: mantener ambas versiones con contexto diferenciado
```

### Compatibilidad entre agentes

Este sistema es agnóstico al agente. El formato JSON y Markdown es legible por:
- Claude Code
- Gemini CLI  
- Cualquier agente con acceso a filesystem
- Humanos (diseño intencionalmente legible)

---

## MANTENIMIENTO DE MEMORIA

### Cuándo limpiar
- **NUNCA** automáticamente
- Solo si el usuario lo solicita explícitamente
- Al limpiar: archivar en `mahoraga-archive-[DATE]/`, nunca eliminar

### Cuándo actualizar patrones obsoletos
```
Un patrón es obsoleto si:
- La tecnología que lo generó cambió de versión major
- El entorno cambió fundamentalmente
- La solución ya no es válida en el contexto actual

Al detectar obsolescencia:
1. Marcar patrón como deprecated: true
2. Agregar deprecation_reason
3. No eliminar (contexto histórico es valioso)
```

### Revisión periódica
Al inicio de un proyecto nuevo o sesión larga:
```
□ ¿Los patrones de error siguen siendo relevantes?
□ ¿Hay patrones que nunca se han activado? (posiblemente obsoletos)
□ ¿El checklist preventivo está actualizado?
□ ¿Hay patrones de éxito que podrían convertirse en templates?
```

---

## INTEGRIDAD DE LA MEMORIA

El agente es guardián de su propia memoria. Reglas de integridad:

```
1. NUNCA reportar como aprendido algo que no fue verificado
2. NUNCA borrar evidencia de intentos fallidos (son conocimiento)
3. NUNCA inflar confianza: si es incierto, decir que es incierto
4. SIEMPRE separar "qué funcionó en este contexto" de "qué funciona siempre"
5. SIEMPRE documentar el entorno: la misma solución puede fallar en otro OS
```

---

## SEÑAL DE SISTEMA SANO

El sistema de memoria está funcionando correctamente cuando:

```
✓ error_patterns.json crece con cada nueva sesión
✓ El checklist preventivo tiene ítems relevantes a los proyectos
✓ La tasa de "errores prevenidos" aumenta con el tiempo
✓ El agente puede explicar POR QUÉ toma decisiones preventivas
✓ Los mismos errores no aparecen en sesiones consecutivas
```
