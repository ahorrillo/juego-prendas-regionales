export function initGame(container, config) {
  let state = { gender: 'mujer', region: 'all', equipped: {} };
  let thumbDrag = null;
  let canvasDrag = null;

  const dom = {
    widgetContainer: container,
    genderGroup: container.querySelector('#gender-select'),
    genderButtons: Array.from(container.querySelectorAll('.seg-btn')),
    regionTrigger: container.querySelector('#region-trigger'),
    regionValue: container.querySelector('#region-value'),
    regionMenu: container.querySelector('#region-menu'),
    resetBtn: container.querySelector('#reset-btn'),
    mannequinBg: container.querySelector('#mannequin-bg'),
    clothesLayers: container.querySelector('#clothes-layers'),
    carouselsContainer: container.querySelector('#carousels-container'),
    stageOuter: container.querySelector('#drop-zone'),
    canvas2816: container.querySelector('#canvas-2816'),
    progressWrap: container.querySelector('#outfit-progress'),
    progressLabel: container.querySelector('#progress-label'),
    progressFill: container.querySelector('#progress-fill')
  };

  function updateCanvasScale() {
    const availableWidth = dom.stageOuter.clientWidth;
    let ratio = availableWidth / 2816;
    const maxHeight = parseFloat(window.getComputedStyle(dom.stageOuter).maxHeight);
    if (Number.isFinite(maxHeight) && maxHeight > 0) {
      ratio = Math.min(ratio, maxHeight / 1536);
    }
    dom.canvas2816.style.transform = `scale(${ratio})`;
    dom.stageOuter.style.height = `${1536 * ratio}px`;
  }

  function setupCanvasScaling() {
    const resizeObserver = new ResizeObserver(() => updateCanvasScale());
    resizeObserver.observe(dom.widgetContainer);
    updateCanvasScale();
  }

  function populateRegions() {
    const addOption = (value, label, selected) => {
      const li = document.createElement('li');
      li.className = 'select-option';
      li.id = `region-option-${value}`;
      li.dataset.value = value;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(selected));
      li.textContent = label;
      dom.regionMenu.appendChild(li);
    };
    addOption('all', 'Todos los grupos', true);
    config.regions.forEach(reg => addOption(reg.id, reg.name, false));
  }

  let activeRegionIndex = 0;
  function getRegionOptions() {
    return Array.from(dom.regionMenu.querySelectorAll('.select-option'));
  }
  function openRegionMenu() {
    dom.regionMenu.hidden = false;
    dom.regionTrigger.setAttribute('aria-expanded', 'true');
    const opts = getRegionOptions();
    activeRegionIndex = Math.max(0, opts.findIndex(o => o.dataset.value === state.region));
    updateRegionActive(opts);
  }
  function updateRegionActive(opts) {
    opts.forEach((o, i) => o.classList.toggle('is-active', i === activeRegionIndex));
    const active = opts[activeRegionIndex];
    if (active) dom.regionTrigger.setAttribute('aria-activedescendant', active.id);
  }
  function closeRegionMenu(returnFocus) {
    if (dom.regionMenu.hidden) {
      if (returnFocus) dom.regionTrigger.focus();
      return;
    }
    dom.regionMenu.hidden = true;
    dom.regionTrigger.setAttribute('aria-expanded', 'false');
    dom.regionTrigger.removeAttribute('aria-activedescendant');
    getRegionOptions().forEach(o => o.classList.remove('is-active'));
    if (returnFocus) dom.regionTrigger.focus();
  }
  function selectRegionOption(opt) {
    state.region = opt.dataset.value;
    dom.regionValue.textContent = opt.textContent;
    getRegionOptions().forEach(o => o.setAttribute('aria-selected', String(o === opt)));
    renderCarousels();
    closeRegionMenu(false);
  }

  function bindEvents() {
    dom.genderButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.gender === btn.dataset.gender) return;
        state.gender = btn.dataset.gender;
        state.equipped = {};
        dom.genderButtons.forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        renderApp();
      });
    });
    dom.regionTrigger.addEventListener('click', () => {
      if (dom.regionMenu.hidden) openRegionMenu(); else closeRegionMenu(false);
    });
    dom.regionMenu.addEventListener('click', (e) => {
      const opt = e.target.closest('.select-option');
      if (opt) selectRegionOption(opt);
    });
    dom.regionTrigger.addEventListener('keydown', (e) => {
      if (dom.regionMenu.hidden) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          openRegionMenu();
        }
        return;
      }
      const opts = getRegionOptions();
      const last = opts.length - 1;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeRegionIndex = activeRegionIndex >= last ? 0 : activeRegionIndex + 1;
        updateRegionActive(opts);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeRegionIndex = activeRegionIndex <= 0 ? last : activeRegionIndex - 1;
        updateRegionActive(opts);
      } else if (e.key === 'Home') {
        e.preventDefault();
        activeRegionIndex = 0;
        updateRegionActive(opts);
      } else if (e.key === 'End') {
        e.preventDefault();
        activeRegionIndex = last;
        updateRegionActive(opts);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const opt = opts[activeRegionIndex];
        if (opt) selectRegionOption(opt);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeRegionMenu(true);
      }
    });
    document.addEventListener('pointerdown', (e) => {
      if (dom.regionMenu.hidden) return;
      if (!dom.regionTrigger.contains(e.target) && !dom.regionMenu.contains(e.target)) closeRegionMenu(false);
    });
    dom.resetBtn.addEventListener('click', () => {
      state.equipped = {}; renderApp();
    });
  }

  function renderApp() {
    dom.mannequinBg.src = `${config.baseUrl}${config.genders[state.gender].bg}`;
    renderEquippedClothes();
    renderCarousels();
  }

  function renderCarousels() {
    const scrollPositions = new Map();
    dom.carouselsContainer.querySelectorAll('.carousel-row').forEach((row, i) => {
      const track = row.querySelector('.carousel-track');
      if (track) scrollPositions.set(i, track.scrollLeft);
    });
    dom.carouselsContainer.innerHTML = '';
    const types = config.genders[state.gender].types;
    const sortedTypes = [...types].sort((a,b) => a.zIndex - b.zIndex);
    const nextTypeToEquip = sortedTypes.find(t => !state.equipped[t.id]);
    types.forEach((typeDef, i) => {
      const row = document.createElement('div');
      row.className = 'carousel-row';
      if (nextTypeToEquip && nextTypeToEquip.id === typeDef.id) row.classList.add('is-next');
      const title = document.createElement('div');
      title.className = 'carousel-title';
      title.textContent = typeDef.label;
      const track = document.createElement('div');
      track.className = 'carousel-track';
      const regionsToShow = state.region === 'all' ? config.regions.map(r => r.id) : [state.region];
      regionsToShow.forEach(regionId => {
        track.appendChild(buildThumbnail(typeDef, regionId));
      });
      const prevScroll = scrollPositions.get(i);
      if (prevScroll) track.scrollLeft = prevScroll;
      row.appendChild(title);
      row.appendChild(track);
      dom.carouselsContainer.appendChild(row);
    });
  }

  function toggleEquip(typeId, regionId) {
    if (state.equipped[typeId]?.regionId === regionId) {
      delete state.equipped[typeId];
    } else {
      state.equipped[typeId] = { regionId, x: 0, y: 0 };
    }
    renderEquippedClothes();
    renderCarousels();
  }

  function buildThumbnail(typeDef, regionId) {
    const el = document.createElement('div');
    el.className = 'item-thumbnail';
    const isEquipped = state.equipped[typeDef.id]?.regionId === regionId;
    if (isEquipped) el.classList.add('is-equipped');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-pressed', String(isEquipped));
    const imgUrl = `${config.baseUrl}${regionId}-${state.gender}-${typeDef.id}.png`;
    el.innerHTML = `<img src="${imgUrl}" alt="${typeDef.label}">${isEquipped ? '<span class="thumb-badge"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}`;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      startThumbDrag(e, typeDef.id, regionId, imgUrl);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      toggleEquip(typeDef.id, regionId);
    });
    return el;
  }

  function startThumbDrag(e, typeId, regionId, imgUrl) {
    const clone = document.createElement('img');
    clone.src = imgUrl;
    clone.className = 'drag-clone';
    thumbDrag = { typeId, regionId, clone, startX: e.clientX, startY: e.clientY, isDragging: false };
    document.body.classList.add('is-dressing-up');
    dom.widgetContainer.classList.add('is-dressing-up');
    document.addEventListener('pointermove', onThumbMove);
    document.addEventListener('pointerup', onThumbUp);
    document.addEventListener('pointercancel', onThumbCancel);
  }

  function onThumbMove(e) {
    if (!thumbDrag) return;
    if (!thumbDrag.isDragging) {
      const dx = Math.abs(e.clientX - thumbDrag.startX);
      const dy = Math.abs(e.clientY - thumbDrag.startY);
      if (dx > 5 || dy > 5) {
        thumbDrag.isDragging = true;
        document.body.appendChild(thumbDrag.clone);
      }
    }
    if (thumbDrag.isDragging) {
      thumbDrag.clone.style.left = `${e.clientX}px`;
      thumbDrag.clone.style.top = `${e.clientY}px`;
      const rect = dom.stageOuter.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        dom.stageOuter.classList.add('drag-over');
      } else {
        dom.stageOuter.classList.remove('drag-over');
      }
    }
  }

  function onThumbUp(e) {
    if (!thumbDrag) return;
    const rect = dom.stageOuter.getBoundingClientRect();
    const isInside = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
    if (!thumbDrag.isDragging) {
      toggleEquip(thumbDrag.typeId, thumbDrag.regionId);
    } else if (isInside) {
      const scale = dom.stageOuter.clientWidth / 2816;
      const halfW = (thumbDrag.clone.naturalWidth || 0) / 2;
      const halfH = (thumbDrag.clone.naturalHeight || 0) / 2;
      state.equipped[thumbDrag.typeId] = {
        regionId: thumbDrag.regionId,
        x: (e.clientX - rect.left) / scale - halfW,
        y: (e.clientY - rect.top) / scale - halfH
      };
      renderEquippedClothes();
      renderCarousels();
    }
    cleanupThumbDrag();
  }

  function onThumbCancel() {
    if (!thumbDrag) return;
    cleanupThumbDrag();
  }

  function cleanupThumbDrag() {
    if (thumbDrag.clone.parentNode) thumbDrag.clone.remove();
    dom.stageOuter.classList.remove('drag-over');
    document.body.classList.remove('is-dressing-up');
    dom.widgetContainer.classList.remove('is-dressing-up');
    document.removeEventListener('pointermove', onThumbMove);
    document.removeEventListener('pointerup', onThumbUp);
    document.removeEventListener('pointercancel', onThumbCancel);
    thumbDrag = null;
  }

  function renderProgress() {
    const types = config.genders[state.gender].types;
    const equippedCount = types.filter(t => state.equipped[t.id]).length;
    const total = types.length;
    dom.progressFill.style.transform = `scaleX(${equippedCount / total})`;
    if (equippedCount === total) {
      dom.progressLabel.textContent = '¡Traje completo!';
      dom.progressWrap.classList.add('is-complete');
    } else {
      dom.progressLabel.textContent = `${equippedCount} de ${total} piezas`;
      dom.progressWrap.classList.remove('is-complete');
    }
  }

  function renderEquippedClothes() {
    dom.clothesLayers.innerHTML = '';
    const types = config.genders[state.gender].types;
    types.forEach(typeDef => {
      const itemData = state.equipped[typeDef.id];
      if (itemData) {
        const img = document.createElement('img');
        img.src = `${config.baseUrl}${itemData.regionId}-${state.gender}-${typeDef.id}.png`;
        img.style.zIndex = typeDef.zIndex;
        img.alt = typeDef.label;
        img.className = 'equipped-item';
        img.style.left = `${itemData.x}px`;
        img.style.top = `${itemData.y}px`;
        img.addEventListener('pointerdown', (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          e.preventDefault();
          e.stopPropagation();
          img.setPointerCapture(e.pointerId);
          img.style.touchAction = 'none';
          const scale = dom.stageOuter.clientWidth / 2816;
          canvasDrag = {
            typeId: typeDef.id, img, startX: e.clientX, startY: e.clientY,
            initialX: itemData.x, initialY: itemData.y, scale, isDragging: false
          };
          document.body.classList.add('is-dressing-up');
          dom.widgetContainer.classList.add('is-dressing-up');
          document.addEventListener('pointermove', onCanvasMove);
          document.addEventListener('pointerup', onCanvasUp);
          document.addEventListener('pointercancel', onCanvasCancel);
        });
        dom.clothesLayers.appendChild(img);
      }
    });
    renderProgress();
  }

  function onCanvasMove(e) {
    if (!canvasDrag) return;
    if (!canvasDrag.isDragging) {
      const dx = Math.abs(e.clientX - canvasDrag.startX);
      const dy = Math.abs(e.clientY - canvasDrag.startY);
      if (dx > 3 || dy > 3) {
        canvasDrag.isDragging = true;
        canvasDrag.img.style.zIndex = 999;
      }
    }
    if (canvasDrag.isDragging) {
      const deltaX = (e.clientX - canvasDrag.startX) / canvasDrag.scale;
      const deltaY = (e.clientY - canvasDrag.startY) / canvasDrag.scale;
      canvasDrag.img.style.left = `${canvasDrag.initialX + deltaX}px`;
      canvasDrag.img.style.top = `${canvasDrag.initialY + deltaY}px`;
      const rect = dom.stageOuter.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        dom.stageOuter.classList.add('drag-over');
      } else {
        dom.stageOuter.classList.remove('drag-over');
      }
    }
  }

  function onCanvasUp(e) {
    if (!canvasDrag) return;
    if (canvasDrag.isDragging) {
      const rect = dom.stageOuter.getBoundingClientRect();
      const isInside = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
      if (isInside) {
        const deltaX = (e.clientX - canvasDrag.startX) / canvasDrag.scale;
        const deltaY = (e.clientY - canvasDrag.startY) / canvasDrag.scale;
        state.equipped[canvasDrag.typeId].x = canvasDrag.initialX + deltaX;
        state.equipped[canvasDrag.typeId].y = canvasDrag.initialY + deltaY;
      } else {
        delete state.equipped[canvasDrag.typeId];
      }
    }
    cleanupCanvasDrag();
    renderEquippedClothes();
    renderCarousels();
  }

  function onCanvasCancel() {
    if (!canvasDrag) return;
    cleanupCanvasDrag();
  }

  function cleanupCanvasDrag() {
    dom.stageOuter.classList.remove('drag-over');
    document.body.classList.remove('is-dressing-up');
    dom.widgetContainer.classList.remove('is-dressing-up');
    document.removeEventListener('pointermove', onCanvasMove);
    document.removeEventListener('pointerup', onCanvasUp);
    document.removeEventListener('pointercancel', onCanvasCancel);
    canvasDrag = null;
  }

  populateRegions();
  bindEvents();
  setupCanvasScaling();
  renderApp();
}
