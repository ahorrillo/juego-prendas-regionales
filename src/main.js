alert('Widget: Cargando widget de vestimenta regional...');
import './styles.css';
import { getWidgetHTML } from './components/htmlTemplate.js';
import { initGame } from './components/gameLogic.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('regional-dressup-widget');
  if (!container) return;

  const configUrl = container.dataset.configUrl;
  if (!configUrl) {
    console.error('Widget Error: No se ha especificado data-config-url');
    return;
  }

  try {
    const response = await fetch(configUrl);
    const config = await response.json();

    container.classList.add('dressup-container');
    container.innerHTML = getWidgetHTML();

    initGame(container, config);
  } catch (error) {
    console.error('Widget Error: Error al descargar config.json', error);
  }
});
