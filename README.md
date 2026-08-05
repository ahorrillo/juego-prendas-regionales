# 👗 Vestimenta Regional — Componente Web Interactivo

[![Vite](https://img.shields.io/badge/Vite-ES6+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-Zero_Dependencies-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr-v1.0.8-E24D4B?logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/gh/)
[![Vocento](https://img.shields.io/badge/Licencia-Vocento-002D62?style=flat-square)](https://www.vocento.com/)

Un widget interactivo estilo *Paper Dolls* (juego de vestir) desarrollado en **Vanilla JavaScript ES6+**, **CSS Scoped** y empaquetado con **Vite**, diseñado para la difusión cultural, museos digitales o probadores virtuales.

Permite vestir maniquíes (masculinos y femeninos) combinando prendas tradicionales por capas mediante un motor de físicas de puntero (*Pointer Events*) y un sistema de lienzo con escalado matemático vectorial.

---

## 🌟 Características Principales

* **📐 Canvas Virtual Escalado (2816x1536 px):** Resuelve el problema de alineación de capas en resoluciones fluidas. Mantiene la relación de aspecto y escala todas las prendas y maniquíes a la misma tasa mediante transformaciones vectoriales `scale()`.
* **🖐️ Motor de Arrastre Libre (Pointer Events):**
  * **Desde el carrusel:** Arrastra prendas al maniquí o haz un clic rápido para equiparlas.
  * **En el lienzo (Canvas):** Agarra ropa ya equipada para ajustar su posición exacta con la mano.
  * **Desvestir:** Arrastra una prenda fuera de la zona del maniquí para quitarla.
* **📱 100% Táctil y Responsive:** Optimizado para smartphones, tablets y escritorio. Soporta gestos multitáctiles sin interferir con el scroll de la página.
* **📦 Empaquetado Autónomo (IIFE + Inline CSS):** Se compila en un único archivo JavaScript (`widget.js`) que inyecta su propio CSS y lógica de forma aislada, evitando conflictos con estilos globales de la web receptora y sobrepasando bloqueos de gestores de consentimiento de cookies (*Cookie Walls*).
* **⚡ Sin Dependencias en Producción:** Escrito en Vanilla JS puro (*Zero dependencies*). Ligero, ultra rápido e integrable en cualquier CMS (WordPress, Drupal, Joomla, etc.).

---

## 🛠️ Arquitectura y Funcionamiento Técnico

### 1. El problema del Ratio y la solución del Canvas Virtual

**Desafío:** Al reducir el contenedor base (por ejemplo a 800px de ancho), aplicar CSS porcentual a imágenes recortadas de ropa rompe la alineación con el maniquí.

**Solución:** Las imágenes se cargan en su tamaño nativo en un lienzo interno fijo de **2816×1536 px**. Un `ResizeObserver` calcula el ratio de reducción (ancho disponible / 2816) y aplica una transformación vectorial unificada a todo el lienzo:

```javascript
const ratio = disponibleWidth / 2816;
canvas2816.style.transform = `scale(${ratio})`;
stageOuter.style.height = `${1536 * ratio}px`;
```

### 2. Aislamiento e Inyección CSS

El CSS no se distribuye como un archivo separado. Durante la compilación con Vite, los estilos se procesan de forma *inline* e inyectan dinámicamente en el `<head>` del DOM únicamente si no existen previamente (`#dressup-styles`), garantizando que la aplicación sea 100% *plug and play*.

---

## 📁 Estructura del Proyecto

```text
.
├── src/
│   ├── components/
│   │   ├── gameLogic.js      # Lógica de arrastre (Pointer Events), canvas y estados
│   │   └── htmlTemplate.js   # Generación de la plantilla HTML del widget
│   ├── styles.css            # Estilos del widget aislados
│   └── main.js               # Punto de entrada principal e inyector del widget
├── dist/                     # Archivos compilados listos para producción
│   ├── config.json           # Configuración remota de prendas, regiones y rutas
│   └── widget.js             # Bundle único empaquetado en formato IIFE
├── index.html                # Entorno de desarrollo local
├── vite.config.js            # Configuración de compilación Vite (Formato IIFE)
├── package.json
└── README.md
```

---

## 🚀 Desarrollo Local y Compilación

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone [https://github.com/ahorrillo/juego-prendas-regionales.git](https://github.com/ahorrillo/juego-prendas-regionales.git)
cd juego-prendas-regionales
npm install
```

### 2. Servidor de desarrollo

```bash
npm run dev
```

### 3. Compilación para producción

```bash
npm run build
```

Genera el archivo bundle `dist/widget.js` compilado en formato **IIFE** listo para ser servido en producción.

---

## 🌐 Integración en tu Web (Producción)

Para integrar el widget en cualquier sitio web, añade el contenedor con la ruta a tu `config.json` e inyecta el script desde **jsDelivr** haciendo referencia a una versión/tag específica:

```html
<!-- 1. Contenedor del Widget -->
<div id="regional-dressup-widget"
     data-config-url="[https://cdn.jsdelivr.net/gh/ahorrillo/juego-prendas-regionales@v1.0.7/dist/config.json](https://cdn.jsdelivr.net/gh/ahorrillo/juego-prendas-regionales@v1.0.7/dist/config.json)">
</div>

<!-- 2. Script del Widget -->
<script src="[https://cdn.jsdelivr.net/gh/ahorrillo/juego-prendas-regionales@v1.0.7/dist/widget.js](https://cdn.jsdelivr.net/gh/ahorrillo/juego-prendas-regionales@v1.0.7/dist/widget.js)"></script>
```

> **Nota importante:** Se recomienda utilizar siempre un **Tag de Git** (ej: `@v1.0.7`) en las URLs de jsDelivr en lugar de `@main` para evitar retrasos en la actualización por caché de CDN.

---

## ⚙️ Configuración y Personalización (`config.json`)

Puedes añadir o editar nuevos trajes, regiones, capas o géneros modificando el archivo `config.json`:

```json
{
  "baseUrl": "https://raw.githubusercontent.com/ahorrillo/juego-prendas-regionales/refs/heads/main/img/",
  "regions": [
    { "id": "badajoz-gala", "name": "Badajoz - Gala" }
  ],
  "genders": {
    "mujer": {
      "bg": "maniqui-mujer.png",
      "types": [
        { "id": "medias", "label": "Medias", "zIndex": 2 },
        { "id": "camisa", "label": "Camisa", "zIndex": 3 },
        { "id": "falda", "label": "Falda", "zIndex": 4 },
        { "id": "zapatos", "label": "Zapatos", "zIndex": 5 },
        { "id": "complementos", "label": "Complementos", "zIndex": 6 },
        { "id": "cabeza", "label": "Cabeza", "zIndex": 7 },
        { "id": "accesorio", "label": "Accesorio", "zIndex": 8 }
      ]
    },
    "hombre": {
      "bg": "maniqui-hombre.png",
      "types": [
        { "id": "pantalon", "label": "Pantalón", "zIndex": 2 },
        { "id": "camisa", "label": "Camisa", "zIndex": 3 },
        { "id": "faja", "label": "Faja", "zIndex": 4 },
        { "id": "zapatos", "label": "Zapatos", "zIndex": 5 },
        { "id": "accesorio", "label": "Accesorio", "zIndex": 6 }
      ]
    }
  }
}
```

### Nomenclatura de Archivos de Imagen

El sistema construye las URLs dinámicamente siguiendo el estándar:

`[baseUrl][regionId]-[gender]-[typeId].png`

*Ejemplo:* `https://.../img/badajoz-gala-mujer-camisa.png`

> 📌 Para la guía completa de cómo añadir un nuevo grupo regional (paso a paso, con la tabla de archivos y los requisitos de las imágenes), consulta la sección [Añadir un Nuevo Grupo Regional](#-añadir-un-nuevo-grupo-regional).

---

## ➕ Añadir un Nuevo Grupo Regional

Añadir un grupo regional (por ejemplo, un traje nuevo de Cáceres) requiere **dos pasos**: crear las imágenes con el nombre correcto y registrarlas en el `config.json`.

### Paso 1: Prepara las imágenes

El widget construye las URLs dinámicamente con el patrón:

```
[baseUrl][regionId]-[gender]-[typeId].png
```

Cada región debe tener **una imagen por cada tipo de cada género**. Con la configuración de ejemplo (mujer: 7 tipos, hombre: 5 tipos) son **12 imágenes por región**:

| Tipo | Género | Ejemplo de archivo |
| :--- | :---: | :--- |
| medias | mujer | `caceres-fiesta-mujer-medias.png` |
| camisa | mujer | `caceres-fiesta-mujer-camisa.png` |
| falda | mujer | `caceres-fiesta-mujer-falda.png` |
| zapatos | mujer | `caceres-fiesta-mujer-zapatos.png` |
| complementos | mujer | `caceres-fiesta-mujer-complementos.png` |
| cabeza | mujer | `caceres-fiesta-mujer-cabeza.png` |
| accesorio | mujer | `caceres-fiesta-mujer-accesorio.png` |
| pantalon | hombre | `caceres-fiesta-hombre-pantalon.png` |
| camisa | hombre | `caceres-fiesta-hombre-camisa.png` |
| faja | hombre | `caceres-fiesta-hombre-faja.png` |
| zapatos | hombre | `caceres-fiesta-hombre-zapatos.png` |
| accesorio | hombre | `caceres-fiesta-hombre-accesorio.png` |

**Requisitos de las imágenes:**

- **Formato:** PNG con fondo transparente. Las prendas son recortes; el maniquí (`genders[gender].bg`) es la única imagen con fondo.
- **Escala:** todas las capas se posicionan sobre un lienzo virtual de **2816×1536 px**. El recorte de la prenda debe estar a la misma escala que el maniquí para que al equiparla quede alineada sobre el cuerpo. No hace falta que el archivo tenga 2816×1536: puede ser el tamaño del recorte de la prenda; al soltarla, el widget la centra bajo el puntero/dedo.
- **Ubicación:** guárdalas en la carpeta a la que apunta `baseUrl` (en la config de ejemplo, `img/` del repositorio). El `regionId` del nombre debe coincidir exactamente con el `id` que registres en el config.
- **Maniquí de fondo:** los maniquíes son comunes por género (`maniqui-mujer.png`, `maniqui-hombre.png`), apuntados desde `genders.mujer.bg` y `genders.hombre.bg`. Si quieres maniquíes propios, sube los PNG y cambia esas rutas.

> **Importante:** el widget no filtra prendas por región: el carrusel muestra las miniaturas de **todas** las regiones para cada tipo del género activo. Si a una región le falta la imagen de un tipo, su miniatura aparecerá rota (404). Prepara siempre el juego completo de imágenes de los tipos que quieras publicar.

### Paso 2: Registra la región en el `config.json`

Añade una entrada al array `regions`:

```json
{
  "id": "caceres-fiesta",
  "name": "Cáceres - Fiesta"
}
```

Ejemplo completo con la nueva región:

```json
{
  "baseUrl": "https://tuservidor.com/img/",
  "regions": [
    { "id": "badajoz-gala", "name": "Badajoz - Gala" },
    { "id": "caceres-fiesta", "name": "Cáceres - Fiesta" }
  ],
  "genders": {
    "mujer": { "bg": "maniqui-mujer.png", "types": [ ... ] },
    "hombre": { "bg": "maniqui-hombre.png", "types": [ ... ] }
  }
}
```

Si tu integración sirve el `config.json` desde tu propio host (vía `data-config-url`), actualiza esa copia. La copia de ejemplo de este repositorio vive en `dist/config.json`.

### Paso 3: Verifica

1. `npm run dev` y comprueba que las miniaturas nuevas cargan sin errores 404.
2. Equipa una prenda de la nueva región y arrástrala sobre el maniquí.
3. Cambia de género y repite: ambos géneros deben tener sus imágenes.
4. Cuando esté listo, `npm run build` para regenerar `dist/widget.js` y publica siguiendo la sección de [Control de Versiones](#-control-de-versiones-y-despliegue).

---

## 🔖 Control de Versiones y Despliegue

Para publicar una nueva versión del widget:

```bash
# 1. Compilar bundle
npm run build

# 2. Guardar cambios en Git
git add .
git commit -m "Publicada nueva versión v1.0.7"
git push origin main

# 3. Crear y publicar Tag
git tag v1.0.7
git push origin v1.0.7
```

---

## 🖥️ Compatibilidad

| Navegador | Soporte |
| :--- | :---: |
| **Google Chrome** (Desktop & Mobile) | Full |
| **Safari / iOS Safari** | Full |
| **Mozilla Firefox** | Full |
| **Microsoft Edge** | Full |

---

## ✒️ Autores

Creado y mantenido por:

**María Díaz Sanchez** <maria.diaz@hoy.es> | [GitHub](https://github.com/maria-diaz-hoy)

**Antonio Horrillo Horrillo**. <ahorrillo@hoy.es> | [GitHub](https://github.com/ahorrillo)

Orgullosamente desarrollado DESDE CERO por el equipo de HOY.es

---

## 📄 Licencia y Términos de Uso

Este software ha sido desarrollado por y para el uso exclusivo de las cabeceras y servicios del grupo **Vocento**.

- **Propiedad:** © 2026 **Vocento**. Todos los derechos reservados.
- **Licencia:** Privativa (uso interno).

Queda estrictamente prohibida la reproducción, distribución, modificación o comunicación pública, total o parcial, de este código fuente a terceros ajenos al Grupo Vocento sin el consentimiento expreso y por escrito de la dirección tecnológica.
