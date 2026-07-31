# 👗 Vestimenta Regional — Componente Web Interactivo

Un widget interactivo estilo *Paper Dolls* (juego de vestir) desarrollado en **Vanilla JavaScript**, **CSS3** y **HTML5**, diseñado para la difusión cultural o probadores virtuales.

Permite vestir maniquíes (masculinos y femeninos) combinando prendas tradicionales por capas mediante un motor de físicas de puntero (*Pointer Events*) y un sistema de lienzo con escalado matemático vectorial.

---

## 🌟 Características Principales

* **📐 Canvas Virtual Escalado (2816x1536 px):** Resuelve el problema de alineación de capas en resoluciones fluidas. Mantiene la relación de aspecto y escala todas las prendas y maniquíes a la misma tasa mediante `transform: scale()`.
* **🖐️ Motor de Arrastre Libre (Pointer Events):**
  * **Desde la rueda/carrusel:** Arrastra prendas al maniquí o haz un clic rápido para equiparlas.
  * **En el lienzo (Canvas):** Agarra ropa ya equipada para ajustar su posición exacta con la mano.
  * **Desvestir:** Arrastra una prenda fuera de la zona del maniquí para quitarla.
* **📱 100% Táctil y Responsive:** Optimizado para smartphones, tablets y escritorio. Soporta gestos multitáctiles sin interferir con el scroll de la página.
* **🎨 Gestión Inteligente de Capas (Z-Index):** Sistema automático de ordenación de capas (medias -> camisa -> falda -> accesorios) garantizando coherencia visual.
* **⚡ Sin Dependencias:** Escrito en JS puro (*Zero dependencies*). Ligero, ultra rápido e integrable en cualquier CMS (WordPress, Drupal, etc.).

---

## 🛠️ Arquitectura y Funcionamiento Técnico

### El problema del Ratio y la solución del Canvas Virtual

> **Desafío:** Al reducir el contenedor base (por ejemplo a 800px de ancho), aplicar CSS porcentual a imágenes recortadas de ropa rompe la alineación con el maniquí.
>
> **Solución:** Las imágenes se cargan en su tamaño nativo en un lienzo interno fijo de **2816×1536 px**. Un `ResizeObserver` calcula el ratio de reducción (ancho disponible / 2816) y aplica una transformación vectorial unificada a todo el lienzo:

~~~js
const ratio = disponibleWidth / 2816;
canvas2816.style.transform = `scale(${ratio})`;
stageOuter.style.height = `${1536 * ratio}px`;
~~~

---

## 📁 Estructura del Proyecto

~~~text
.
├── index.html          # Estructura del Widget HTML
├── styles.css          # Estilos aislados (Scoped CSS) + Animaciones
├── app.js              # Lógica de componentes, Drag&Drop y Canvas Engine
└── README.md           # Documentación del proyecto
~~~

---

## 🚀 Instalación y Uso

### 1. Clonar el repositorio

~~~bash
git clone https://github.com/tu-usuario/vestimenta-regional.git
cd vestimenta-regional
~~~

### 2. Integración en tu Web

Simplemente copia el contenedor `#regional-dressup-widget` junto con sus estilos y script en tu proyecto:

~~~html
<div id="regional-dressup-widget" class="dressup-container">
</div>

<style>
</style>

<script>
</script>
~~~

~~~html
<!-- Ambos dentro de dist -->
<div id="regional-dressup-widget" data-config-url="https://raw.githubusercontent.com/ahorrillo/juego-prendas-regionales/main/dist/config.json">
</div>

<script src="https://raw.githubusercontent.com/ahorrillo/juego-prendas-regionales/main/dist/widget.js"></script>
~~~

---

## ⚙️ Configuración y Personalización

Puedes añadir nuevos trajes, regiones o géneros modificando el objeto de configuración inicial en JavaScript:

~~~javascript
const config = {
    baseUrl: 'https://tu-servidor.com/imagenes_prendas/',
    regions: [
        { id: 'badajoz-gala', name: 'Badajoz - Gala' },
        { id: 'caceres-traje', name: 'Cáceres - Tradicional' }
    ],
    genders: {
        mujer: {
            bg: 'maniqui-mujer.png',
            types: [
                { id: 'medias', label: 'Medias', zIndex: 2 },
                { id: 'camisa', label: 'Camisa', zIndex: 3 },
                { id: 'falda', label: 'Falda', zIndex: 4 },
                { id: 'cabeza', label: 'Cabeza', zIndex: 7 }
            ]
        }
    }
};
~~~

### Nomenclatura de Archivos de Imagen

El sistema construye las URLs dinámicamente siguiendo este patrón:

`[baseUrl][regionId]-[gender]-[typeId].png`

*Ejemplo:* `https://.../badajoz-gala-mujer-camisa.png`

---

## 🖥️ Compatibilidad

| Navegador | Soporte |
| :--- | :---: |
| **Google Chrome** (Desktop & Mobile) | Full |
| **Safari / iOS Safari** | Full |
| **Mozilla Firefox** | Full |
| **Microsoft Edge** | Full |

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente para proyectos personales o comerciales.
