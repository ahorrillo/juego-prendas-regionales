import cssStyles from './styles.css?inline';
import { getWidgetHTML } from './components/htmlTemplate.js';
import { initGame } from './components/gameLogic.js';

function injectStyles() {
  if (document.getElementById('dressup-styles')) return;
  const styleEl = document.createElement('style');
  styleEl.id = 'dressup-styles';
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);
}

async function startWidget() {
  console.log('🚀 Invocando startWidget...');
  const container = document.getElementById('regional-dressup-widget');
  if (!container) return;

  const configUrl = container.dataset.configUrl;
  if (!configUrl) return;

  try {
    injectStyles();
    const response = await fetch(configUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const config = await response.json();

    container.innerHTML = getWidgetHTML();
    initGame(container, config);
    console.log('✅ Juego cargado con éxito');
  } catch (error) {
    console.error('Dressup Widget Error:', error);
  }
}

startWidget();
