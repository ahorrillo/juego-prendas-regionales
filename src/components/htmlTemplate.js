export function getWidgetHTML() {
  return `
  <!--
  SEED folclore-baul
  THESIS: Un probador de indumentaria que se abre como un baúl de folclore sobre una mesa de periódico: folk por la pieza, no por el patrón. Rechaza el banner y el juego de pegatinas.
  OWN-WORLD: papel y blanco editorial, trazos de 1px, costura grana discontinua como única firma artesanal, acento grana solo para el acto de vestir.
  STORY: El visitante compone el traje pieza a pieza y lee su progreso hasta el traje completo.
  FIRST VIEWPORT: controles de taller (género segmentado, grupo regional, progreso, reset), maniquí en escenario enmarcado, carruseles de piezas.
  FORM: widget de capas operacional; dirección comprometida por el usuario en document.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
  -->
  <div class="dressup-container">
  <div class="dressup-seam" aria-hidden="true"></div>
  <header class="dressup-controls">
    <div class="seg-group" id="gender-select" role="group" aria-label="Género">
      <button type="button" class="seg-btn is-active" data-gender="mujer" aria-pressed="true">Mujer</button>
      <button type="button" class="seg-btn" data-gender="hombre" aria-pressed="false">Hombre</button>
    </div>
    <div class="control-group">
      <span class="control-label" id="region-label">Grupo Regional</span>
      <div class="select-wrap">
        <button type="button" class="select-trigger" id="region-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="region-menu" aria-labelledby="region-label">
          <span class="select-value" id="region-value">Todos los grupos</span>
          <svg class="select-chevron" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <ul class="select-menu" id="region-menu" role="listbox" aria-label="Grupo Regional" hidden></ul>
      </div>
    </div>
    <div class="progress-dress" id="outfit-progress">
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" id="progress-fill"></div></div>
      <span class="progress-label" id="progress-label" aria-live="polite"></span>
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
  </div>
  `;
}
