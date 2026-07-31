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
  console.log('RJW: 🚀 Invocando startWidget...');
  const container = document.getElementById('regional-dressup-widget');
  if (!container) return;

  const configUrl = container.dataset.configUrl;
  if (!configUrl) return;

  try {
    injectStyles();
    const response = await fetch(configUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const config = await response.json();

    container.classList.add('rjw-container');
    container.innerHTML = getWidgetHTML();
    initGame(container, config);
    console.log('RJW: ✅ Juego cargado con éxito');
  } catch (error) {
    console.error('RJW Error:', error);
  }
}

startWidget();
