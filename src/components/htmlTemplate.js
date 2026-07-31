export function getWidgetHTML() {
  return `
    <header class="dressup-controls">
        <div class="control-group">
            <label for="gender-select">Género:</label>
            <select id="gender-select">
                <option value="mujer" selected>Mujer</option>
                <option value="hombre">Hombre</option>
            </select>
        </div>
        <div class="control-group">
            <label for="region-select">Grupo Regional:</label>
            <select id="region-select">
                <option value="all" selected>Todos los grupos</option>
            </select>
        </div>
        <button id="reset-btn" class="btn-reset" title="Limpiar vestimenta">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Reset
        </button>
    </header>
    <main class="dressup-stage">
        <div class="stage-outer" id="drop-zone">
            <div class="stage-inner-canvas" id="canvas-2816">
                <img id="mannequin-bg" src="" alt="Maniquí" class="layer-bg">
                <div id="clothes-layers"></div>
            </div>
            <div class="drop-overlay" id="drop-overlay">Suelta la prenda / Arrastra fuera para quitarla</div>
        </div>
    </main>
    <footer class="dressup-carousels" id="carousels-container"></footer>
  `;
}
