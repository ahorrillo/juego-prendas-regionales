import cssStyles from './styles.css?inline';
import { getWidgetHTML } from './components/htmlTemplate.js';
import { initGame } from './components/gameLogic.js';

function injectStyles() {
  if (document.getElementById('rjw-styles')) return;
  const styleEl = document.createElement('style');
  styleEl.id = 'rjw-styles';
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);
}

async function startWidget() {
  console.log('RJW: 1. Iniciando startWidget()...');

  const container = document.getElementById('regional-dressup-widget');
  if (!container) {
    console.error('RJW Error: No se encontró #regional-dressup-widget.');
    return;
  }

  const configUrl = container.dataset.configUrl;
  console.log('RJW: 2. URL leída:', configUrl);

  if (!configUrl) {
    console.error('RJW Error: El contenedor no tiene data-config-url.');
    return;
  }

  try {
    injectStyles();
    console.log('RJW: 3. Estilos inyectados. Pidiendo JSON...');

    const response = await fetch(configUrl);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

    const config = await response.json();
    console.log('RJW: 4. Config cargada con éxito:', config);

    // Inyectar HTML en el contenedor
    container.classList.add('rjw-container');
    container.innerHTML = getWidgetHTML();
    console.log('RJW: 5. HTML inyectado en el DOM.');

    // Inicializar lógica
    console.log('RJW: 6. Ejecutando initGame()...');
    initGame(container, config);
    console.log('RJW: 7. ¡Widget cargado y funcionando!');

  } catch (error) {
    console.error('RJW Error crítico durante el inicio:', error);
    container.innerHTML = `<div style="padding:20px; color:red; font-family:sans-serif; text-align:center;">
      ⚠️ Error al cargar el widget de vestimenta. Revisa la consola (F12).
    </div>`;
  }
}

// Ejecución directa inmediata (sin esperar a DOMContentLoaded si el DOM ya existe)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  startWidget();
} else {
  document.addEventListener('DOMContentLoaded', startWidget);
}
