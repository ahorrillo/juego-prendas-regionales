# AGENTS.md

## Project Shape
- This is a standalone Vanilla JS dress-up widget, not a framework app. Keep production dependencies at zero unless explicitly requested.
- Runtime entrypoint is `src/main.js`; Vite builds it as an IIFE library named `RegionalDressupWidget` into `dist/widget.js` via `vite.config.js`.
- `src/main.js` imports `src/styles.css?inline`, injects it once as `<style id="dressup-styles">`, fetches `data-config-url`, writes `getWidgetHTML()`, then calls `initGame(container, config)`.
- Local dev host is `index.html`, which uses `<div id="regional-dressup-widget" data-config-url="/config.json">` and loads `/src/main.js`.

## Commands
- Install: `npm install`.
- Dev server: `npm run dev`.
- Production build: `npm run build`; this is the only configured verification command. There are no lint, test, typecheck, or CI configs in this repo.
- Preview built output: `npm run preview`.

## Widget Constraints
- Preserve the single-file production bundle: Vite config must continue outputting `dist/widget.js` with `formats: ['iife']`, `inlineDynamicImports: true`, and CSS imported inline.
- Keep widget CSS scoped to `#regional-dressup-widget` or widget-owned classes. This bundle is intended to be embedded in external CMS pages with hostile/global CSS.
- Do not move widget logic into `index.html`; keep structure in `src/components/htmlTemplate.js`, startup in `src/main.js`, and interaction/state logic in `src/components/gameLogic.js`.

## Game Logic Gotchas
- The visual stage is a fixed virtual canvas of `2816 x 1536` in `.stage-inner-canvas`; `ResizeObserver` scales it by `stageOuter.clientWidth / 2816` and sets `.stage-outer` height to `1536 * ratio`.
- Equipped item coordinates are stored in unscaled virtual-canvas pixels: `state.equipped[typeId] = { regionId, x, y }`. Pointer deltas from canvas drags must be divided by the current scale.
- Asset URLs are generated, not listed: `${config.baseUrl}${regionId}-${gender}-${typeId}.png`; mannequin backgrounds use `${config.baseUrl}${config.genders[gender].bg}`.
- Clothing layer order comes from `config.genders[gender].types[*].zIndex`; avoid hard-coding type order outside config.
- Pointer/touch support is implemented with Pointer Events on thumbnails and equipped images. Preserve left-mouse filtering, document-level `pointermove`/`pointerup`, and cleanup of listeners/body class after drags.

## Config And Assets
- The shipped sample config is `dist/config.json`; runtime config is remote through the widget container’s `data-config-url`.
- Adding a region/type requires matching image files following `[regionId]-[gender]-[typeId].png` under `baseUrl`, plus any mannequin `bg` filenames referenced by config.

## Before Finishing
- Run `npm run build` after changes to `src/`, `vite.config.js`, or config assumptions that affect bundling.
- For `gameLogic.js` changes, manually reason through or browser-test: gender switch clears equipped state, region filter only changes carousels, reset clears equipped state, quick thumbnail click toggles equip, drag outside stage removes equipped clothing.
