# ERROR_TAXONOMY.md
## Taxonomía de Errores — "Nombrar el Ataque Para Neutralizarlo"

---

## PRINCIPIO

Mahoraga no solo se adapta a ataques genéricos.
Se adapta a **tipos específicos** de ataques, con precisión quirúrgica.

Para que la memoria sea útil, los errores deben clasificarse con consistencia.
Esta taxonomía es el lenguaje compartido del sistema.

---

## ESTRUCTURA DE CLASIFICACIÓN

```
NIVEL 1: DOMINIO       (¿en qué dominio ocurrió?)
NIVEL 2: CATEGORÍA     (¿qué tipo de error es?)
NIVEL 3: SUBCATEGORÍA  (¿cuál es la variante específica?)
NIVEL 4: PATRÓN        (¿cuál es el patrón recurrente?)
```

---

## DOMINIO 1: ENTORNO (ENV)

*Errores relacionados con el ambiente de ejecución, no con el código en sí.*

### ENV-DEP — Dependencias
```
ENV-DEP-MISSING         → Dependencia no instalada
ENV-DEP-VERSION         → Versión incompatible (too old / too new)
ENV-DEP-CONFLICT        → Dos dependencias incompatibles entre sí
ENV-DEP-RESOLUTION      → Package manager no puede resolver el árbol de deps
ENV-DEP-PEER            → Peer dependency no satisfecha
ENV-DEP-OPTIONAL        → Dependencia opcional ausente que resulta crítica
```

### ENV-RUNTIME — Runtime
```
ENV-RT-VERSION          → Versión de runtime incompatible (node, python, etc.)
ENV-RT-MISSING          → Runtime no instalado
ENV-RT-PATH             → Runtime no encontrado en PATH
ENV-RT-MEMORY           → Out of memory / heap limit
ENV-RT-TIMEOUT          → Proceso excede tiempo límite
```

### ENV-CONFIG — Configuración
```
ENV-CFG-MISSING_VAR     → Variable de entorno no definida
ENV-CFG-INVALID_VAR     → Variable de entorno con valor inválido
ENV-CFG-FILE_MISSING    → Archivo de config no encontrado (.env, config.json, etc.)
ENV-CFG-SCHEMA          → Archivo de config no cumple el schema esperado
ENV-CFG-PERMISSION      → Sin permisos para leer config
```

### ENV-FS — Filesystem
```
ENV-FS-NOT_FOUND        → Archivo o directorio no existe
ENV-FS-PERMISSION       → Sin permisos de lectura/escritura/ejecución
ENV-FS-DISK_SPACE       → Sin espacio en disco
ENV-FS-PATH_TOO_LONG    → Path excede límite del OS
ENV-FS-ENCODING         → Problema de encoding en archivo
ENV-FS-LOCKED           → Archivo bloqueado por otro proceso
```

### ENV-OS — Sistema Operativo
```
ENV-OS-COMPAT           → Código no compatible con el OS (Windows/Linux/Mac)
ENV-OS-SHELL            → Diferencias de shell (bash vs zsh vs powershell)
ENV-OS-LINEENDING       → CRLF vs LF causando problemas
ENV-OS-CASE             → Filesystem case-sensitive vs case-insensitive
```

---

## DOMINIO 2: CÓDIGO (CODE)

*Errores en la lógica, estructura o sintaxis del código.*

### CODE-SYNTAX — Sintaxis
```
CODE-SYN-PARSE          → Error de parsing / sintaxis inválida
CODE-SYN-INDENT         → Error de indentación (Python, YAML)
CODE-SYN-BRACKET        → Brackets/llaves no balanceados
CODE-SYN-QUOTE          → Comillas no cerradas o mal mezcladas
CODE-SYN-SEMICOLON      → Punto y coma faltante o sobrante
```

### CODE-TYPE — Tipos
```
CODE-TYPE-MISMATCH      → Tipo incorrecto pasado a función
CODE-TYPE-NULL          → Null/undefined donde no se esperaba
CODE-TYPE-CAST          → Conversión de tipos fallida
CODE-TYPE-SCHEMA        → Objeto no cumple la forma esperada
CODE-TYPE-GENERIC       → Error en tipos genéricos/templates
```

### CODE-LOGIC — Lógica
```
CODE-LOG-OFF_BY_ONE     → Error de límites en loops/índices
CODE-LOG-INFINITE_LOOP  → Loop sin condición de salida válida
CODE-LOG-WRONG_CONDITION → Condición lógica incorrecta
CODE-LOG-WRONG_ORDER    → Operaciones en orden incorrecto
CODE-LOG-MISSING_CASE   → Switch/if no maneja todos los casos
CODE-LOG-WRONG_ALGO     → Algoritmo incorrecto para el problema
```

### CODE-SCOPE — Scope y Referencias
```
CODE-SCP-UNDEFINED      → Variable usada antes de definir
CODE-SCP-SHADOWING      → Variable shadowing causando confusión
CODE-SCP-CLOSURE        → Error de closure (variable capturada incorrectamente)
CODE-SCP-HOISTING       → Error por hoisting (JS)
CODE-SCP-CIRCULAR       → Dependencia circular entre módulos
```

### CODE-ASYNC — Asincronismo
```
CODE-ASYNC-PROMISE      → Promise no manejada correctamente
CODE-ASYNC-AWAIT        → Await fuera de async o mal posicionado
CODE-ASYNC-RACE         → Race condition entre operaciones asíncronas
CODE-ASYNC-CALLBACK     → Error en callback hell o callback timing
CODE-ASYNC-DEADLOCK     → Deadlock entre operaciones asíncronas
```

### CODE-IMPORT — Imports y Módulos
```
CODE-IMP-NOT_FOUND      → Módulo no encontrado
CODE-IMP-WRONG_PATH     → Path de importación incorrecto
CODE-IMP-DEFAULT_VS_NAMED → Confusión entre default y named exports
CODE-IMP-CIRCULAR       → Import circular
CODE-IMP-ESM_VS_CJS     → Conflicto entre ES Modules y CommonJS
```

---

## DOMINIO 3: INTEGRACIÓN (INT)

*Errores en la comunicación con sistemas externos.*

### INT-API — APIs externas
```
INT-API-AUTH            → Error de autenticación (401, 403)
INT-API-NOT_FOUND       → Endpoint no existe (404)
INT-API-RATE_LIMIT      → Rate limit excedido (429)
INT-API-TIMEOUT         → API no responde en tiempo
INT-API-SCHEMA          → Respuesta de API no tiene el formato esperado
INT-API-DEPRECATED      → Endpoint o versión deprecada
INT-API-CORS            → CORS bloqueando la request
```

### INT-DB — Base de Datos
```
INT-DB-CONNECTION       → No se puede conectar a la DB
INT-DB-AUTH             → Credenciales inválidas
INT-DB-QUERY            → Error en sintaxis de query
INT-DB-CONSTRAINT       → Violación de constraint (FK, unique, etc.)
INT-DB-MIGRATION        → Error en migración de schema
INT-DB-DEADLOCK         → Deadlock en transacciones
INT-DB-POOL             → Connection pool agotado
```

### INT-NET — Red
```
INT-NET-DNS             → Error de resolución DNS
INT-NET-REFUSED         → Conexión rechazada
INT-NET-TIMEOUT         → Timeout de red
INT-NET-SSL             → Error de certificado SSL/TLS
INT-NET-PROXY           → Problemas con proxy/firewall
```

---

## DOMINIO 4: BUILD Y DEPLOY (BUILD)

*Errores en el proceso de compilación, bundling y despliegue.*

### BUILD-COMPILE — Compilación
```
BUILD-CMP-TYPE          → Error de tipos en compilación (TypeScript, etc.)
BUILD-CMP-LINT          → Error de linting bloqueante
BUILD-CMP-IMPORT        → Import no resuelto en tiempo de build
BUILD-CMP-CIRCULAR      → Dependencia circular detectada en build
```

### BUILD-BUNDLE — Bundling
```
BUILD-BND-SIZE          → Bundle size excede límite
BUILD-BND-ASSET         → Asset no encontrado o no procesado
BUILD-BND-PLUGIN        → Plugin de bundler fallando
BUILD-BND-CONFIG        → Configuración del bundler inválida
```

### BUILD-DEPLOY — Despliegue
```
BUILD-DEP-ENV           → Variables de entorno faltantes en producción
BUILD-DEP-PERMISSION    → Sin permisos para desplegar
BUILD-DEP-HEALTH        → Health check fallando post-deploy
BUILD-DEP-ROLLBACK      → Error durante rollback
```

---

## DOMINIO 5: TESTING (TEST)

*Errores en suites de pruebas.*

### TEST-UNIT — Tests Unitarios
```
TEST-UNT-ASSERTION      → Assertion falla (valor esperado vs real)
TEST-UNT-MOCK           → Mock no configurado correctamente
TEST-UNT-SETUP          → Error en setup/teardown del test
TEST-UNT-ASYNC          → Test asíncrono no maneja promises correctamente
```

### TEST-INTEGRATION — Tests de Integración
```
TEST-INT-STATE          → Estado contaminado entre tests
TEST-INT-EXTERNAL       → Dependencia externa no disponible en test
TEST-INT-DATA           → Datos de prueba incorrectos o ausentes
```

---

## DOMINIO 6: DATOS (DATA)

*Errores relacionados con procesamiento o validación de datos.*

### DATA-VALIDATION — Validación
```
DATA-VAL-REQUIRED       → Campo requerido ausente
DATA-VAL-FORMAT         → Formato incorrecto (email, fecha, URL, etc.)
DATA-VAL-RANGE          → Valor fuera del rango permitido
DATA-VAL-ENCODING       → Encoding de datos incorrecto
```

### DATA-TRANSFORM — Transformación
```
DATA-TRF-PARSE          → Error al parsear (JSON.parse, XML, CSV)
DATA-TRF-SERIALIZE      → Error al serializar
DATA-TRF-MAPPING        → Mapeo incorrecto entre estructuras
DATA-TRF-LOSSY          → Pérdida de datos en conversión
```

---

## SEVERIDAD

Junto con la categoría, cada error tiene una severidad:

```
CRITICAL → Bloquea completamente la tarea principal
HIGH     → Impide completar una funcionalidad importante
MEDIUM   → Funcionalidad degradada pero workaround posible
LOW      → Molestia menor, no impacta funcionalidad
```

---

## USO EN PRÁCTICA

Al registrar un error en `error_patterns.json`, el campo `category` usa esta taxonomía:

```json
{
  "category": "ENV",
  "subcategory": "DEP",
  "pattern": "ENV-DEP-VERSION",
  "severity": "HIGH"
}
```

Al buscar en memoria, el agente puede buscar por:
- Pattern exacto: `ENV-DEP-VERSION`
- Subcategoría: todos los `ENV-DEP-*`
- Dominio: todos los `ENV-*`
- Tecnología: todos los que tienen `"node"` en tags

---

## PATRÓN DESCONOCIDO

Si un error no encaja en ninguna categoría:

```
UNKNOWN-[TIMESTAMP]

Registrar con:
- Descripción detallada del comportamiento
- Hipótesis de categoría más cercana
- Flag: "needs_classification": true

La taxonomía se expande. Si UNKNOWN se repite,
crear una nueva categoría documentada en este archivo.
```

---

## EXTENSIBILIDAD

Esta taxonomía es un punto de partida, no una ley inmutable.

El agente puede y debe proponer nuevas categorías cuando detecta
patrones que no encajan en las existentes. La taxonomía evoluciona
junto con la experiencia del agente.

**La taxonomía también es memoria. La taxonomía también aprende.**
