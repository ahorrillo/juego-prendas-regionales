export function initGame(container, config) {
  let state = { gender: 'mujer', region: 'all', equipped: {} };
  let thumbDrag = null;
  let canvasDrag = null;

  const dom = {
    widgetContainer: container,
    genderSel: container.querySelector('#gender-select'),
    regionSel: container.querySelector('#region-select'),
    resetBtn: container.querySelector('#reset-btn'),
    mannequinBg: container.querySelector('#mannequin-bg'),
    clothesLayers: container.querySelector('#clothes-layers'),
    carouselsContainer: container.querySelector('#carousels-container'),
    stageOuter: container.querySelector('#drop-zone'),
    canvas2816: container.querySelector('#canvas-2816')
  };

  function updateCanvasScale() {
    const availableWidth = dom.stageOuter.clientWidth;
    const ratio = availableWidth / 2816;
    dom.canvas2816.style.transform = `scale(${ratio})`;
    dom.stageOuter.style.height = `${1536 * ratio}px`;
  }

  function setupCanvasScaling() {
    const resizeObserver = new ResizeObserver(() => updateCanvasScale());
    resizeObserver.observe(dom.widgetContainer);
    updateCanvasScale();
  }

  function populateRegions() {
    config.regions.forEach(reg => {
      const opt = document.createElement('option');
      opt.value = reg.id;
      opt.textContent = reg.name;
      dom.regionSel.appendChild(opt);
    });
  }

  function bindEvents() {
    dom.genderSel.addEventListener('change', (e) => {
      state.gender = e.target.value; state.equipped = {}; renderApp();
    });
    dom.regionSel.addEventListener('change', (e) => {
      state.region = e.target.value; renderCarousels();
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
    dom.carouselsContainer.innerHTML = '';
    const types = config.genders[state.gender].types;
    const sortedTypes = [...types].sort((a,b) => a.zIndex - b.zIndex);
    const nextTypeToEquip = sortedTypes.find(t => !state.equipped[t.id]);
    types.forEach(typeDef => {
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
      row.appendChild(title);
      row.appendChild(track);
      dom.carouselsContainer.appendChild(row);
    });
  }

  function buildThumbnail(typeDef, regionId) {
    const el = document.createElement('div');
    el.className = 'item-thumbnail';
    if (state.equipped[typeDef.id]?.regionId === regionId) el.classList.add('is-equipped');
    const imgUrl = `${config.baseUrl}${regionId}-${state.gender}-${typeDef.id}.png`;
    el.innerHTML = `<img src="${imgUrl}" alt="${typeDef.label}">`;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      startThumbDrag(e, typeDef.id, regionId, imgUrl);
    });
    return el;
  }

  function startThumbDrag(e, typeId, regionId, imgUrl) {
    const clone = document.createElement('img');
    clone.src = imgUrl;
    clone.className = 'drag-clone';
    thumbDrag = { typeId, regionId, clone, startX: e.clientX, startY: e.clientY, isDragging: false };
    document.body.classList.add('is-dressing-up');
    document.addEventListener('pointermove', onThumbMove);
    document.addEventListener('pointerup', onThumbUp);
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
      if (state.equipped[thumbDrag.typeId]?.regionId === thumbDrag.regionId) {
        delete state.equipped[thumbDrag.typeId];
      } else {
        state.equipped[thumbDrag.typeId] = { regionId: thumbDrag.regionId, x: 0, y: 0 };
      }
    } else {
      if (isInside) {
        state.equipped[thumbDrag.typeId] = { regionId: thumbDrag.regionId, x: 0, y: 0 };
      }
    }
    renderEquippedClothes();
    renderCarousels();
    if (thumbDrag.clone.parentNode) thumbDrag.clone.remove();
    dom.stageOuter.classList.remove('drag-over');
    document.body.classList.remove('is-dressing-up');
    document.removeEventListener('pointermove', onThumbMove);
    document.removeEventListener('pointerup', onThumbUp);
    thumbDrag = null;
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
          const scale = dom.stageOuter.clientWidth / 2816;
          canvasDrag = {
            typeId: typeDef.id, img, startX: e.clientX, startY: e.clientY,
            initialX: itemData.x, initialY: itemData.y, scale, isDragging: false
          };
          document.body.classList.add('is-dressing-up');
          document.addEventListener('pointermove', onCanvasMove);
          document.addEventListener('pointerup', onCanvasUp);
        });
        dom.clothesLayers.appendChild(img);
      }
    });
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
    dom.stageOuter.classList.remove('drag-over');
    document.body.classList.remove('is-dressing-up');
    document.removeEventListener('pointermove', onCanvasMove);
    document.removeEventListener('pointerup', onCanvasUp);
    canvasDrag = null;
    renderEquippedClothes();
    renderCarousels();
  }

  populateRegions();
  bindEvents();
  setupCanvasScaling();
  renderApp();
}
