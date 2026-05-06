# TITAN GRID: Documentación de Diseño y Estética

## 1. Concepto y Visión
**TITAN GRID** nace como una marca inventada para representar la máxima brutalidad en competencias híbridas (estilo HYROX, Spartan Race, Tough Mudder). 
La visión era alejarse de los diseños corporativos, pulcros y aburridos del fitness comercial, para abrazar una estética "brutalista", agresiva y cruda. El objetivo es evocar esfuerzo extremo, resistencia y "agonía" funcional.

## 2. Paleta de Colores
La paleta se centra en generar un alto contraste que atrape la vista y transmita energía, peligro e intensidad.
- **Pitch Black (`#050505`) & Surface Black (`#111111`)**: El fondo principal. Representa el vacío, la crudeza y el ambiente industrial/nocturno de las carreras extremas de castigo.
- **Toxic Yellow / Acid Yellow (`#DAF51E`)**: El color de acento principal. Un amarillo casi neón que corta la oscuridad como un láser. Se asocia a zonas de peligro, marcas de precaución y energía radioactiva.
- **Blood Red (`#E61C1C`)**: Color de acento secundario. Usado para estados de *hover*, efectos secundarios del glitch y alertas de eventos agotados. Simboliza la intensidad, el desgaste físico ("sudor y sangre") y el límite humano.
- **Grises Industriales (`#333333`, `#F0F0F0`)**: Utilizados para generar bordes duros que separan el contenido y texto altamente legible sobre los fondos oscuros.

## 3. Tipografía
Se seleccionaron tipografías de Google Fonts buscando maximizar el impacto visual, utilizando mayúsculas casi por defecto para lograr un efecto intimidante.
- **Teko (`display`)**: Usada para los títulos gigantes (como "FORJADOS EN AGONÍA" o los números del contador de estadísticas). Es condensada, cuadrada y extremadamente alta, dando una sensación monolítica, abrumadora e imparable.
- **Oswald (`headings`)**: Usada para subtítulos, navegación y encabezados de las tarjetas. Es una fuente *sans-serif* robusta y de corte industrial que mantiene la legibilidad sin perder una presencia pesada y firme.
- **Inter (`body`)**: Para párrafos y descripciones largas. Al ser una fuente limpia, neutral y moderna, equilibra la agresividad geométrica de los títulos y garantiza que el contenido técnico (como las descripciones de los obstáculos) sea fácil de leer en cualquier dispositivo.

## 4. Efectos y Micro-interacciones
El diseño no es solo un lienzo estático; fue programado para sentirse "vivo" y reaccionar al usuario.
- **Efecto Glitch**: Aplicado al título principal mediante animaciones CSS avanzadas (`clip` y `text-shadow` desplazados). Transmite la idea de "romper el sistema", llevar la máquina humana hasta el fallo muscular y soportar el castigo.
- **Cursor Personalizado**: El puntero nativo se ocultó (`cursor: none;`) a favor de un punto sólido y un anillo expansivo. Al pasar sobre elementos clickeables, el anillo crece y se vuelve de color amarillo translúcido, mejorando la inmersión del usuario en este universo digital.
- **Marquee (Cinta en movimiento)**: Un texto en loop infinito a lo ancho de la pantalla que repite el "Manifiesto" ("SIN EXCUSAS / SIN LÁGRIMAS"). Emula las cintas amarillas perimetrales de peligro o precaución de las zonas en construcción.
- **Parallax y Respiración de Fondo**: La imagen de fondo del Hero Section se mueve hacia arriba y se desvanece sutilmente al hacer scroll. Además, tiene una animación `pulseBg` que hace zoom in y out muy lentamente a escala (1.0 a 1.05), como si la página tuviera pulso.
- **Botones Geométricos y Cyberpunk**: Los botones principales (`btn-primary`) no son cuadrados; tienen un borde recortado diagonalmente mediante `clip-path`, evocando chapas de metal cortadas. Al hacer *hover*, un bloque de rojo sangre los "llena" desde abajo en un movimiento rápido y satisfactorio.
- **Contadores Dinámicos (Intersection Observer)**: Los números de las estadísticas del manifiesto (ej. kilómetros, porcentaje de abandonos) no son estáticos. Suben desde 0 hasta su valor final exactamente cuando el usuario scrollea hasta esa sección, dando la sensación de estar observando la telemetría militar en tiempo real.

## 5. Fotografía, Filtros y Texturas
- Se utilizaron *placeholders* de Unsplash que evocan el fango, sudor, crossfit y resistencia.
- A todas las imágenes de las tarjetas de la sección "Las Pruebas" se les aplicó un filtro CSS unificado `grayscale(100%) brightness(0.6)`. Al posar el mouse sobre ellas, recuperan progresivamente su color nativo y brillo, recompensando la interacción y manteniendo un *grid* cohesivo en reposo.
- Se agregó un "Image Break" a mitad de página con texto gigante en contorno (`-webkit-text-stroke`) que dice "NO HAY ESCAPE", consolidando la rudeza del diseño.

## 6. Arquitectura Frontend y Decisiones Técnicas
- **Vite.js**: Elegido para el empaquetado ultra rápido y el servidor local de desarrollo (`HMR`). Evita el *bloatware* y permite empezar al instante.
- **Vanilla CSS (Variables y Arquitectura)**: Se decidió no usar frameworks prefabricados (como Tailwind o Bootstrap) para garantizar que el diseño se sienta *único* y no genérico. Mediante `Vanilla CSS` con Custom Properties (`:root`) construí el sistema de diseño exacto que necesitaba. Esto me permitió tener control total sobre animaciones de bajo nivel como el glitch.
- **Vanilla JavaScript**: Lógica ligera, enfocada puramente en la manipulación del DOM y eventos de ventana (`mousemove`, `scroll`, `IntersectionObserver`). No hay dependencias pesadas ni tiempos de carga lentos.

---
**Resumen**: La unión de estos colores tóxicos, tipografías aplastantes, interfaces sin bordes redondeados y micro-interacciones inmersivas logran vender "TITAN GRID" no solo como una competencia, sino como una experiencia de castigo absoluta de nivel *premium*.
