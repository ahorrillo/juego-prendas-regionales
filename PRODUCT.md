# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Lectores de webs Vocento: público general que llega a un artículo cultural de HOY.es u otra cabecera del grupo y prueba la vestimenta en la misma página. El widget es una pieza de contenido dentro de la página, no un destino: la interacción es casual, autodirigida y de corta duración.

## Product Purpose

Un widget interactivo estilo *paper dolls* (juego de vestir) que permite vestir un maniquí (mujer/hombre) con prendas tradicionales extremeñas por capas. Éxito significa doble: que el visitante entienda cómo se compone la vestimenta tradicional regional (difusión cultural) y que el widget se integre sin fricción en cualquier página del grupo como pieza de contenido.

## Positioning

Difusión cultural de la vestimenta tradicional regional mediante un juego de capas, entregado como widget autónomo sin dependencias que funciona embebido en cualquier CMS externo sin chocar con su CSS global. Mecanismo diferenciador: un lienzo virtual fijo de 2816×1536 px escalado por `ResizeObserver` mantiene todas las capas alineadas a cualquier resolución, empaquetado en un único bundle IIFE con CSS inline.

## Operating Context

- Embebido en páginas CMS externas con CSS global hostil; los estilos deben quedar aislados bajo `#regional-dressup-widget` y clases propias.
- La configuración es remota: se carga en runtime desde `data-config-url` del contenedor apuntando a un `config.json`.
- Las URLs de assets se generan, no se listan: `${config.baseUrl}${regionId}-${gender}-${typeId}.png`; los fondos de maniquí usan `${config.baseUrl}${config.genders[gender].bg}`.
- Dev local: `index.html` con `data-config-url="/config.json"`; única verificación configurada: `npm run build`.
- Se usa en escritorio (ratón) y móvil (táctil). No hay estándar de accesibilidad fijo; se mejora la operabilidad sin romper la integración.

## Capabilities and Constraints

- Dos géneros (mujer/hombre); capas de prenda definidas por género con orden `zIndex` en la configuración.
- Regiones completas e integradas en config: `castuera`, `don-benito`, `montehermoso`, `torrejoncillo`.
- Interacciones: arrastrar del carrusel al maniquí, toque/clic rápido para equipar, arrastrar una prenda equipada para reposicionarla y arrastrarla fuera del escenario para quitarla. Cambiar de género limpia el estado equipado; el filtro de región solo cambia los carruseles; reset limpia el estado.
- Coordenadas de prendas equipadas en píxeles del canvas virtual sin escalar; los deltas de puntero se dividen por el scale actual.
- Cero dependencias en producción; bundle único IIFE `dist/widget.js` con CSS inline inyectable en cualquier página.
- Sin API pública ni eventos propios: el widget arranca solo sobre el contenedor.
- Release v1.1.5 lista para producción con los 4 grupos regionales extremeños completamente operativos.

## Brand Commitments

- Contexto Vocento / HOY.es; autoras y autor: María Díaz Sanchez y Antonio Horrillo Horrillo (HOY.es).
- Licencia privativa Vocento (uso interno); sin reproducción pública fuera del grupo.
- Copia en español vigente ("Género", "Grupo Regional", "Reset", etiquetas de prenda) como voz incumbente.

## Evidence on Hand

- Assets reales de prendas y maniquíes en `img/` siguiendo la nomenclatura `[regionId]-[gender]-[typeId].png`.
- `dist/config.json` y `public/config.json` con la estructura actual de región/género/tipo.
- README.md documenta arquitectura, integración vía jsDelivr, flujo de versiones/tags y configuración.
- No hay datos de usuarios, testimonios ni métricas de uso disponibles; no deben fabricarse.

## Product Principles

1. Jugar es aprender: la comprensión del traje regional se alcanza haciendo, así que las interacciones deben ser directas y permisivas.
2. La integración es una funcionalidad: el widget debe sobrevivir a cualquier entorno CMS sin romperse ni ser roto por el CSS global.
3. Despliegue sin fricción: un único bundle más un JSON de configuración es toda la superficie de despliegue.
4. La configuración manda: regiones, géneros, capas y z-ordering salen de config, nunca de código hardcodeado.
5. Mejora progresiva dentro de límites: pulir usabilidad y operabilidad sin comprometer las restricciones de integración.
