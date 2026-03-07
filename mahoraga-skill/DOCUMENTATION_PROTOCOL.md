# DOCUMENTATION_PROTOCOL.md
## Sistema de Documentación Inmutable y Versionada

---

## PRINCIPIO FUNDAMENTAL

**Lo que fue escrito, fue escrito. Para siempre.**

El archivo `documentation.md` es un registro histórico inalterable.
Funciona como un libro de bitácora de un barco:
- Cada entrada documenta qué pasó, cuándo y por qué
- Nada se borra. Nada se edita retroactivamente
- Solo se agregan nuevas entradas hacia adelante
- El pasado es evidencia. El pasado es conocimiento. El pasado es sagrado

---

## EL ARCHIVO `documentation.md`

### Ubicación
En la raíz del proyecto donde trabaja el agente:
```
proyecto/
├── documentation.md    ← ESTE ARCHIVO (generado y mantenido por el agente)
├── mahoraga-skill/
├── .mahoraga/
└── ... (resto del proyecto)
```

### Reglas absolutas
```
NUNCA editar una entrada existente
NUNCA borrar una entrada existente
NUNCA reordenar entradas existentes
SIEMPRE agregar al final
SIEMPRE versionar correctamente
SIEMPRE ser específico (no vago)
```

---

## SISTEMA DE VERSIONADO

### Estructura de versión: `MAYOR.MENOR.PARCHE`

```
MAYOR  → Cambio arquitectural significativo, nueva funcionalidad principal
         Ejemplo: reescritura de módulo, nuevo sistema integrado
         Incremento: 1.0 → 2.0

MENOR  → Funcionalidad nueva dentro de la arquitectura existente
         Ejemplo: nueva función, nuevo endpoint, nuevo componente
         Incremento: 1.0 → 1.1 → 1.2

PARCHE → Fix, ajuste, corrección, mejora menor
         Ejemplo: bug fix, refactor pequeño, corrección de config
         Incremento: 1.0 → 1.0.1 → 1.0.2
```

### Versión inicial
La primera sesión siempre arranca en `v1.0`.

### Cómo determinar qué versión asignar

```
¿Qué hice en esta sesión?
│
├── Inicialicé el proyecto por primera vez
│   └── → v1.0
│
├── Implementé algo nuevo e importante
│   └── → incrementar MENOR (1.0 → 1.1)
│
├── Hice un fix o ajuste menor
│   └── → incrementar PARCHE (1.0 → 1.0.1)
│
└── Cambié algo fundamental en la arquitectura
    └── → incrementar MAYOR (1.0 → 2.0)
```

---

## FORMATO DE `documentation.md`

### Estructura del archivo completo

```markdown
# DOCUMENTATION — [NOMBRE DEL PROYECTO]

> Registro histórico inalterable del proyecto.
> Cada entrada es permanente. Nada se borra. Nada se edita.
> Mantenido por el sistema Mahoraga.

---

## ÍNDICE DE VERSIONES
- [v1.0] — [fecha] — [título de sesión]
- [v1.1] — [fecha] — [título de sesión]
- [v1.0.1] — [fecha] — [título de sesión]
...

---

[entradas en orden cronológico]
```

### Formato de cada entrada

```markdown
---

## [vX.X.X] — [FECHA ISO] — [TÍTULO DESCRIPTIVO DE LA SESIÓN]

**Agente:** [identificador del agente si disponible]
**Tarea solicitada:** [qué pidió el usuario, textual o resumido]
**Estado al inicio:** [qué existía antes de esta sesión]

### Qué se implementó
[descripción técnica específica de lo que se hizo]
- [acción 1]
- [acción 2]
- [acción N]

### Archivos creados o modificados
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| [ruta] | CREADO / MODIFICADO / ELIMINADO | [qué contiene o qué cambió] |

### Errores encontrados y adaptaciones
[Si hubo errores, documentarlos aquí con referencia al ID en .mahoraga/]
- ERR-[ID]: [descripción] → [solución aplicada]
- (ninguno si la sesión fue limpia)

### Decisiones técnicas tomadas
[Decisiones importantes que afectan el futuro del proyecto]
- [decisión 1]: [razonamiento]
- [decisión 2]: [razonamiento]

### Estado al finalizar
[descripción del estado del proyecto al cerrar esta sesión]

### Próximos pasos sugeridos
[qué debería hacerse en la próxima sesión, si aplica]

---
```

---

## CUÁNDO CREAR UNA ENTRADA

El agente crea una nueva entrada en `documentation.md` en estos momentos:

```
AL INICIO de cada sesión:
→ Registrar versión, fecha, tarea solicitada, estado previo

AL FINALIZAR cada sesión:
→ Completar la entrada con todo lo que ocurrió

ANTE UN ERROR CRÍTICO en medio de la sesión:
→ Registrar el error, la causa y la resolución como sub-entrada

ANTE UNA DECISIÓN ARQUITECTURAL en medio de la sesión:
→ Registrar la decisión y el razonamiento inmediatamente
```

---

## INICIALIZACIÓN DEL ARCHIVO

Si `documentation.md` no existe, crearlo con:

```markdown
# DOCUMENTATION — [NOMBRE DEL PROYECTO O DIRECTORIO]

> Registro histórico inalterable del proyecto.
> Cada entrada es permanente. Nada se borra. Nada se edita.
> Mantenido por el sistema Mahoraga Adaptive Coding System v1.0.
> Inicializado: [ISO-8601]

---

## ÍNDICE DE VERSIONES

*(se auto-completa con cada entrada)*

---
```

Luego, inmediatamente, crear la primera entrada con `v1.0`.

---

## LECTURA DE DOCUMENTACIÓN EN SESIONES FUTURAS

Al inicio de cada sesión, antes de ejecutar nada:

```
1. Leer documentation.md completo
2. Identificar la última versión registrada
3. Entender el estado actual del proyecto desde la última sesión
4. Determinar qué número de versión corresponde a esta sesión
5. Crear entrada de inicio de sesión con ese número
```

**Esto garantiza continuidad perfecta entre sesiones.**
El agente nunca arranca desde cero. Siempre sabe dónde está parado.

---

## EJEMPLO REAL DE `documentation.md`

```markdown
# DOCUMENTATION — API REST USUARIOS

> Registro histórico inalterable del proyecto.
> Mantenido por el sistema Mahoraga.

---

## ÍNDICE DE VERSIONES
- [v1.0] — 2025-03-01 — Inicialización y estructura base
- [v1.1] — 2025-03-02 — Endpoints de autenticación
- [v1.1.1] — 2025-03-02 — Fix en validación de tokens

---

---

## [v1.0] — 2025-03-01T10:00:00Z — Inicialización y estructura base

**Tarea solicitada:** Crear una API REST para gestión de usuarios con Node.js
**Estado al inicio:** Directorio vacío

### Qué se implementó
- Inicialización del proyecto con npm
- Estructura de carpetas (src/, routes/, controllers/, middleware/)
- Configuración de Express y variables de entorno
- Modelo de usuario básico

### Archivos creados o modificados
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| package.json | CREADO | Dependencias: express, dotenv, mongoose |
| src/index.js | CREADO | Entry point del servidor |
| src/models/User.js | CREADO | Schema de usuario |
| .env.example | CREADO | Template de variables de entorno |

### Errores encontrados y adaptaciones
- ERR-20250301-A1B2: mongoose version conflict con node 20 → actualizado a mongoose@8

### Decisiones técnicas tomadas
- Express sobre Fastify: mayor ecosistema para este tipo de proyecto
- Mongoose sobre Prisma: el usuario ya tiene experiencia con MongoDB

### Estado al finalizar
Servidor corriendo en localhost:3000, conexión a MongoDB funcional.

### Próximos pasos sugeridos
Implementar rutas de autenticación (login, register, refresh token)

---

---

## [v1.1] — 2025-03-02T09:00:00Z — Endpoints de autenticación

...
```

---

## RESUMEN: LO QUE EL AGENTE NUNCA PUEDE HACER

```
✗ Editar el contenido de una entrada pasada
✗ Borrar una entrada aunque sea incorrecta*
✗ Saltear el registro de inicio de sesión
✗ Usar versiones ambiguas o sin criterio
✗ Dejar una sesión sin entrada de cierre

* Si una entrada tiene un error factual, agregar una NOTA DE CORRECCIÓN
  como sub-entrada en la siguiente versión. Nunca editar la original.
```
