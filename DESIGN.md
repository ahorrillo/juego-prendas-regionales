---
name: Vestimenta Regional — Widget Interactivo
description: Probador virtual de indumentaria tradicional extremeña para webs de noticias Vocento
colors:
  noche-fiesta: "#2c3e50"
  noche-fiesta-deep: "#1a252f"
  grana: "#e74c3c"
  grana-tinta: "#c0392b"
  papel: "#f8f9fa"
  blanco: "#ffffff"
  trazo: "#e1e4e8"
  acero: "#7f8c8d"
  acero-tinta: "#55636d"
  escenario: "#eef1f5"
  tiza: "#f1f2f6"
  tiza-trazo: "#dcdde1"
typography:
  ui:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
  seg:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
  button-text:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  meta:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
  carousel-title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    letterSpacing: "0.07em"
  drop-overlay:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "12px"
  sm: "14px"
  md: "20px"
components:
  button-primary:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.noche-fiesta}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    typography: "{typography.button-text}"
  button-primary-hover:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noche-fiesta-deep}"
  select:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.noche-fiesta}"
    rounded: "{rounded.md}"
    padding: "10px 34px 10px 12px"
    typography: "{typography.ui}"
  seg-active:
    backgroundColor: "{colors.noche-fiesta}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
    typography: "{typography.seg}"
  seg-idle:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.acero-tinta}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
    typography: "{typography.seg}"
  thumbnail:
    backgroundColor: "{colors.tiza}"
    rounded: "{rounded.lg}"
    size: "72px"
  thumbnail-small:
    size: "48px"
---

# Design System: Vestimenta Regional — Widget Interactivo

## Overview

**Creative North Star: "El Baúl del Folclore"**

Un baúl de tradición que se abre sobre una mesa de periódico: los acentos folclóricos viven en un marco editorial sobrio. El widget se comporta como una pieza de contenido de una cabecera Vocento — nunca como un banner ni como un juego infantil de pegatinas. El folclore habla por sus piezas (las prendas reales del maniquí); la interfaz se retira y solo asiste.

La firma artesanal es la **costura**: una línea discontinua en grana que cose el widget por su borde superior, se repite como guion bajo el overlay de soltar la prenda y se sugiere en el punto de la siguiente pieza. Es la única referencia al folclore material del baúl; todo lo demás es papel, blanco y trazo de 1px.

El sistema es plano por defecto: la única profundidad aparece en el fantasma de arrastre. Los controles son táctiles y confiados — segmento de género, selects altos (42px), miniaturas de 72px y un indicador de progreso que cuenta "X de Y piezas" hasta el "¡Traje completo!". Todo operable con dedo, ratón y teclado.

**Key Characteristics:**
- Costura grana discontinua como única firma artesanal; resto de la superficie editorial sobria.
- Un único acento (grana) reservado al acto de vestir; su tinta (grana-tinta) para textos sobre blanco.
- Plano por defecto; profundidad solo durante el arrastre (fantasma girado -4° con la única sombra del sistema).
- Género como control segmentado; grupo regional en select con chevron propio.
- Progreso visible "X de Y piezas" con barra, hasta el estado de traje completo.
- Canvas virtual 2816×1536 escalado por anchura; capas siempre alineadas.
- Aislado bajo `#regional-dressup-widget` con todas sus reglas CSS prefijadas obligatoriamente bajo este selector ID e implementando escudo estructural (`!important` en propiedades críticas como display, padding o white-space) para evitar la deformación por estilos del host; el bloqueo de scroll durante el arrastre también está acotado al widget.

## Colors

Paleta de periódico neutra con una pareja de acentos folclóricos: una noche de fiesta y el carmesí del traje.

### Primary
- **Noche de Fiesta** (#2c3e50): el marco sobrio. Fondo del segmento de género activo, texto de los selects, texto del botón Reset.
- **Noche de Fiesta Profunda** (#1a252f): hover del botón Reset.

### Secondary
- **Grana** (#e74c3c): la voz del folclore para el acto de vestir. Costura, barra de progreso, badge de prenda equipada, punto de la siguiente pieza y borde de su fila.
- **Grana Tinta** (#c0392b): versión legible sobre blanco para textos grana (título "siguiente pieza", "¡Traje completo!", overlay de soltar). Contraste ≥4.5:1.

### Neutral
- **Papel** (#f8f9fa): fondo del contenedor del widget y de miniaturas equipadas.
- **Blanco** (#ffffff): superficie principal (controles, carruseles, miniaturas activas).
- **Trazo** (#e1e4e8): bordes y separadores de 1px entre bandas.
- **Acero** (#7f8c8d): chevron del select y ornamentos funcionales.
- **Acero Tinta** (#55636d): textos neutros pequeños (etiquetas de control, títulos de carrusel, contador de progreso). Tiene contraste AA sobre blanco.
- **Escenario** (#eef1f5): fondo del escenario donde viven el maniquí y sus capas.
- **Tiza** (#f1f2f6): mosaico de las miniaturas.
- **Tiza Trazo** (#dcdde1): borde de las miniaturas.

### Named Rules
**The Grana Rule.** El grana señala el acto de vestir (feedback de equipar, siguiente pieza, progreso) y cose el widget en la costura superior. En reposo, fuera de la costura, ocupa menos del 10% de la superficie; su rareza es el punto.
**The One-Line Rule.** Los bordes son siempre de 1px y silenciosos. Nada más grueso, nada con más presencia que el propio maniquí.
**The Ink Rule.** Todo texto en grana sobre blanco usa grana-tinta; el grana puro queda reservado a formas, barras y ornamentos.

## Typography

**Display Font:** none — el maniquí es la pieza gráfica.
**Body Font:** system-ui, -apple-system, BlinkMacSystemFont, sans-serif (stack del sistema).
**Label Font:** el mismo stack.

**Character:** tipografía de sistema sobria, idéntica al entorno editorial del host. La jerarquía se construye con peso, tamaño y caja; el texto en mayúsculas con tracking solo para etiquetas cortas.

### Hierarchy
- **Drop Overlay** (700, 1.2rem, 0.05em, uppercase): feedback de soltar la prenda, visible solo durante el arrastre.
- **Seg** (600, 0.88rem): botones del segmento de género.
- **Button Text** (600, 0.85rem): botón Reset.
- **Meta** (600, 0.8rem): contador de progreso y etiqueta "¡Traje completo!".
- **Label** (700, 0.72rem, 0.06em, uppercase): etiquetas de control ("Grupo Regional").
- **Carousel Title** (700, 0.74rem, 0.07em, uppercase): nombres de capa; la fila activa vira a grana-tinta con punto grana.

## Layout

Contenedor de columna simple de ancho máximo 1200px, con borde de 1px, radio 10px y la costura superior. Bandas apiladas: controles, escenario y carruseles. La barra de controles alinea a la izquierda el segmento de género y el grupo regional, y empuja a la derecha el progreso y el Reset (gap 14px). El escenario ocupa el 100% del ancho del contenedor y mantiene la proporción 2816×1536 del canvas virtual escalado por `ResizeObserver`. Los carruseles son filas con una columna de título (118px) y un track horizontal desplazable con snap; el scroll del track se preserva entre re-renders.

En ≤768px: controles apilados a ancho completo (segmento de género y select llenos, etiqueta de grupo sobre el select); el progreso (con barra elástica a ancho completo hasta la etiqueta) y el Reset pasan a ancho completo en filas propias; los carruseles se compactan en estantes horizontales de 48px (columna de título fija de 90px a la izquierda, track desplazable, gap 2px, padding 8px 12px 8px) para no competir con el escenario; el escenario se limita a 60vh.

### Breakpoints
- **768px** — apilado móvil (controles, carruseles, escenario limitado, miniaturas reducidas).

## Elevation & Depth

**Plano y limpio.** Sin sombras en reposo: la profundidad se transmite con bordes finos y alternancia de superficies. La única elevación real es el **fantasma de arrastre** (`box-shadow: 0 12px 22px rgba(0,0,0,0.32)`), que se despega del carrusel, gira -4° y flota sobre el documento mientras se lleva la prenda al maniquí.

### Shadow Vocabulary
- **drag-clone** (`box-shadow: 0 12px 22px rgba(0,0,0,0.32)`): exclusiva del fantasma de la prenda durante el arrastre.

### Named Rules
**The Flat-By-Default Rule.** Las superficies descansan planas. Las sombras aparecen solo como respuesta a estado (arrastre, no hover).
**The Motion Budget Rule.** Una sola pieza de movimiento autoral: el fantasma que se despega. El resto son transiciones de estado de ≤0.35s. Con `prefers-reduced-motion`, todo se congela.

## Shapes

Lenguaje de esquinas suaves y contenidas: 6px para el interior del segmento de género, 8px para controles (selects, botón, tracks), 10px para el contenedor y las miniaturas, y pastilla completa (999px) para la barra de progreso. Las miniaturas son fichas cuadradas de 72px (48px en móvil, el mínimo táctil) con borde de 1px en tiza-trazo; la equipada se desatura al 50% y gana un badge circular grana con borde blanco en su esquina. El escenario, sin esquinas, ocupa todo el ancho: el lienzo es el marco y no tiene marco.

## Components

### Gender Segmented Control
- **Shape:** grupo con fondo papel, borde 1px trazo, radio 8px, padding 3px; botones con radio interior 6px.
- **State:** activo = Noche de Fiesta sobre blanco; inactivo = texto acero-tinta sobre transparente; hover = tiza con texto noche.
- **Semantics:** `role="group"` + `aria-pressed` por botón.

### Selects (Grupo Regional)
- **Style:** botón `combobox` propio (no `<select>` nativo) — fondo blanco, texto Noche de Fiesta, borde 1px trazo, radio 8px, padding 10px 34px 10px 12px, altura mínima 42px, ancho completo en móvil (16px para evitar zoom de iOS). Tiene un `min-width: 180px` en escritorio y `white-space: nowrap` con `text-overflow: ellipsis` para prevenir deformación o saltos de línea con textos largos.
- **Dropdown:** lista `listbox` absoluta dentro del widget (`.select-menu`), con opciones con punto-grana en la seleccionada y resaltado activo por teclado. Se evita el `<select>` nativo porque su menú se abre fuera del marco en la emulación de dispositivo de Chrome DevTools y es sensible a `user-select` en iOS.
- **Chevron:** SVG propio (chevron acero) que rota 180° al abrir. Se restringe su tamaño estrictamente por CSS (`width: 16px !important`, `height: 16px !important`) para contrarrestar reglas globales del CMS que reescalan todos los elementos SVG al 100%.
- **Focus/teclado:** outline grana 2px; Enter/Espacio abren, flechas navegan con `aria-activedescendant`, Enter selecciona, Escape cierra y devuelve el foco.
- **Semantics:** `role="listbox"`/`role="option"`, `aria-expanded`, `aria-controls`, `aria-selected`.

### Reset Button
- **Shape:** ghost editorial — fondo blanco, borde 1px trazo, radio 8px, texto noche, icono de papelera SVG inline. Tiene `white-space: nowrap` y `flex-shrink: 0` tanto en el botón como en su icono SVG interno (el cual posee además `width: 18px !important` e `height: 18px !important` por CSS) para impedir la deformidad o el aplastamiento en layouts ajustados o por herencia de estilos globales.
- **Hover:** papel + borde tiza-trazo + texto noche profunda.
- **Mobile:** ancho completo y centrado.

### Progress Indicator
- **Style:** barra pastilla de 6px sobre tiza, relleno grana animado por `transform: scaleX` (nunca por width, para evitar layout thrash), transición 0.35s. Texto meta a la derecha.
- **States:** "X de Y piezas" en acero-tinta; al completar todas las piezas, el texto pasa a grana-tinta con "¡Traje completo!".
- **Mobile:** la barra se estira a ancho completo de la fila, hasta la etiqueta (sin `max-width`).

### Carousel Rows
- **Title column:** fija (118px en desktop, 90px en móvil con tracking 0.04em), `flex-shrink: 0`, uppercase; derecha en desktop, izquierda en móvil. El ancho fijo garantiza que las miniaturas de todas las filas queden alineadas verticalmente aunque un nombre sea más largo (p. ej. "Complementos"). La fila `is-next` vira el título a grana-tinta con un punto grana y tiñe el fondo del track (grana 4%).
- **Track:** scroll horizontal con `scroll-snap-type: x mandatory`, scrollbar fino, padding 8px 4px 12px (en móvil 4px 0 8px), radio 8px.

### Thumbnails
- **Corner Style:** 10px.
- **Background:** tiza con borde 1px tiza-trazo; la fila siguiente usa borde grana translúcido sobre blanco.
- **Content:** la prenda recortada, `object-fit: contain`, `transform: scale(2.2)`, centrada.
- **State equipada:** desaturación + opacidad 0.5 + badge circular grana con check blanco.
- **Access:** `tabindex="0"`, `role="button"`, `aria-pressed`; Enter/Espacio equipan; focus-visible con outline grana.
- **Touch:** `touch-action: pan-x` para que el carrusel siga desplazándose sin pelear con el gesto.

### Equipped Items (maniquí)
- **Style:** capas absolutas dentro del canvas virtual, ordenadas por `zIndex` del config, cursor grab, `touch-action: none`.
- **State:** al arrastrarse suben a `zIndex: 999`; si se sueltan fuera del escenario se quitan.

### Drop Overlay
- **Style:** tinte grana al 10%, texto grana-tinta uppercase 1.2rem, guion de costura grana sobre el texto; opacidad 0 → 1 solo durante el drag-over.

### Drag Clone
- **Style:** 120px, `object-fit: contain`, fijo en viewport, centrado en el puntero con giro de -4°, la única sombra del sistema, opacidad 0.96.

## Do's and Don'ts

### Do:
- **Do** mantener el canvas plano y alineado: nunca posicionar capas fuera del sistema de coordenadas del canvas virtual escalado.
- **Do** reservar el grana para el acto de vestir; su tinta (grana-tinta) para cualquier texto grana sobre blanco.
- **Do** usar la costura discontinua como única firma artesanal; que el resto sea papel y trazo de 1px.
- **Do** dejar que la prenda caiga donde se suelta (coordenadas centradas bajo el puntero) en el drag desde el carrusel.
- **Do** dar hit targets generosos: controles ≥42px, miniaturas ≥48px en móvil y Reset a ancho completo.
- **Do** animar la barra de progreso con `transform: scaleX`, nunca con width/height.
- **Do** hacer las miniaturas accesibles por teclado (tabindex, Enter/Espacio) y mostrar focus-visible.
- **Do** preservar el `scrollLeft` del carrusel entre re-renders.
- **Do** aislar todo estilo bajo `#regional-dressup-widget`, incluido el bloqueo de scroll durante el arrastre.

### Don't:
- **Don't** añadir sombras en reposo; la profundidad solo existe durante el arrastre.
- **Don't** usar más de un acento de color ni degradados publicitarios: el widget es contenido, no un banner.
- **Don't** hardcodear el orden de las capas: el z-ordering sale de `config.json`.
- **Don't** introducir fuentes decorativas ni patrones kitsch que compitan con la prenda.
- **Don't** usar grana puro para texto pequeño sobre blanco (falla AA).
- **Don't** permitir que el CSS global del host rompa la caja del widget (de ahí el uso de prefijado por ID y de flags `!important` en las reglas críticas).
