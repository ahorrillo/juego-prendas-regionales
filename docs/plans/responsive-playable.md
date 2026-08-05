# Plan: Versión Responsive Jugable

## Objetivo

Hacer que el widget de vestimenta regional sea plenamente jugable en dispositivos táctiles y en cualquier resolución, sin romper el soporte de escritorio (ratón).

## Diagnóstico

Lo que ya funciona:

- Canvas virtual `2816x1536` escalado por anchura vía `ResizeObserver` (`src/components/gameLogic.js:18-29`): las capas y el maniquí quedan siempre alineados.
- `Pointer Events` unifican ratón/táctil.
- "Clic rápido = equipar" (`onThumbUp`, `src/components/gameLogic.js:128`) ya es el gesto más fiable en móvil.
- Los deltas del drag se dividen por el `scale` actual (`src/components/gameLogic.js:195-196`).

Gaps que rompen la jugabilidad táctil:

1. Sin `touch-action: none` en las prendas del escenario: en táctil el navegador hace scroll de página en vez de mover la prenda.
2. Drag desde el carrusel en táctil poco fiable: `touch-action: pan-x` en thumbnails hace que el scroll del carrusel emita `pointercancel`, que no está manejado (puede quedar un `clone` huérfano y la clase `is-dressing-up` pegada).
3. Faltan handlers de `pointercancel` en ambos drags (thumb y canvas) para limpiar estado.
4. El escenario en móvil queda pequeño (~200px a 375px de ancho). Conviene limitar el alto del stage a ~60vh y calcular el scale según el eje limitante.
5. Sin bloqueo de scroll del cuerpo durante el arrastre.

## Cambios

### A. CSS (`src/styles.css`)

- `.stage-inner-canvas img.equipped-item { touch-action: none; }` para reposicionar prendas en táctil.
- `body.is-dressing-up { cursor: grabbing !important; }` + `#regional-dressup-widget.is-dressing-up * { overscroll-behavior: none; touch-action: none; }` para bloquear el scroll mientras se arrastra. Nota: el bloqueo de `touch-action`/`overscroll` está acotado al widget (no a `body`) porque el bundle se embebe en CMS con CSS global hostil; el bloqueo de scroll de la página se consigue vía `setPointerCapture` en el elemento arrastrado.
- Media query <=768px:
  - Thumbnails más grandes (>=56px) para mejor touch target.
  - Stage limitado a `max-height: 60vh` con scale calculado por ancho y alto.

### B. JS (`src/components/gameLogic.js`)

- Añadir `pointercancel` en `startThumbDrag` y en el pointerdown de prendas equipadas que ejecute la misma limpieza que `pointerup`, tratándolo como drop inválido.
- `setPointerCapture(e.pointerId)` en pointerdown de thumbnails y prendas equipadas para que el gesto sobreviva fuera de los límites del elemento.
- Al iniciar canvas-drag, reforzar `touch-action: none` por JS.
- `updateCanvasScale`: incorporar limitación por altura (`max-height: 60vh` en móvil) sin cambiar la proporción.
- El drop desde el carrusel aterriza la prenda centrada bajo el puntero: coordenadas `(e.clientX - rect.left) / scale - halfW` (mitad del ancho natural de la prenda), en píxeles de canvas virtual, en lugar de aplicar solo el delta del gesto.

### C. Verificación

- `npm run build`.
- Prueba táctil manual (DevTools emulation / dispositivo real):
  - Tap para equipar.
  - Drag para reposicionar sobre el maniquí.
  - Arrastrar fuera del escenario para desvestir.
  - Scroll horizontal del carrusel y scroll de página sin interferencia.
