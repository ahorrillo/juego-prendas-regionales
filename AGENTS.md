# AGENTS.md - Codebase Guidelines & Agent Operating Manual

This repository contains the **Juego de Prendas Regionales** application. This document serves as the authoritative operational guide for AI coding agents and subagents working in this codebase.

---

## 🎯 Project Purpose & Architecture

`juego-prendas-regionales` is a standalone, client-side web application (Dress-Up Game) for regional traditional clothing (e.g., traditional attire from Badajoz and Cáceres).

### Core Technologies
- **HTML5**: Semantic component container (`#regional-dressup-widget`).
- **Vanilla CSS3**: Isolated scoped CSS inside `index.html` with modern flex layout, transitions, and CSS variables (`--primary-color`, `--highlight-color`, etc.).
- **Vanilla JavaScript (ES6+)**: Self-contained IIFE controlling game state, pointer events, dynamic canvas scaling, and UI carousel rendering.

---

## 📐 Key Components & Data Flow

### 1. Canvas & Stage (`.stage-inner-canvas`)
- Virtual resolution: **2816px × 1536px**.
- Responsive scaling: Scales dynamically via `ResizeObserver` based on container width (`ratio = clientWidth / 2816`).
- Image layer positioning: Managed via absolute coordinates (`itemData.x`, `itemData.y`) relative to canvas space.

### 2. State Model (`state`)
```javascript
{
  gender: 'mujer' | 'hombre',
  region: 'all' | 'badajoz-gala' | 'caceres-gala' | string,
  equipped: {
    [typeId]: { regionId: string, x: number, y: number }
  }
}
```

### 3. Layering System (Z-Index)
Clothing items are stacked strictly according to their `zIndex` definitions in `config.genders[gender].types`:
- **Mujer**: Medias (2), Camisa (3), Falda (4), Zapatos (5), Complementos (6), Cabeza (7), Accesorio (8).
- **Hombre**: Pantalón (2), Camisa (3), Faja (4), Zapatos (5), Accesorio (6).

### 4. Asset URL Generation
Assets are dynamically fetched from the base URL configured in `config.baseUrl`:
`${config.baseUrl}${regionId}-${gender}-${typeId}.png`

---

## 🤖 Guidelines for AI Agents

When working on this repository, all AI agents must follow these rules:

1. **Preserve Compatibility & Standalone Architecture**:
   - Keep the component modular so it can be embedded directly into editorial pages or standalone wrappers.
   - Do not introduce heavy framework dependencies (React, Vue, etc.) unless explicitly requested by the user.

2. **Pointer & Touch Handling**:
   - Pointer drag mechanisms use unified PointerEvents (`pointerdown`, `pointermove`, `pointerup`). Ensure touch actions and mouse drag functionality remain compatible across mobile and desktop browsers.

3. **CSS Scoping**:
   - Maintain styles within `#regional-dressup-widget` to prevent style leakage when embedded into external CMS or web pages.

4. **Code Quality & Refactoring**:
   - Maintain exact variable names and contract structures.
   - Test UI interaction state changes (`state.equipped`, `gender`, `region`) when introducing new clothing items or regions.

5. **Verification Steps**:
   - Validate HTML markup and syntax when editing `index.html`.
   - Ensure image URL generation matches existing naming conventions (`<regionId>-<gender>-<typeId>.png`).

---

## 🛠️ Task Execution Workflow for Agents

1. **Research & Inspect**: Always read `index.html` and relevant assets before modifying UI logic or layer ordering.
2. **Implement**: Apply targeted modifications using line replacement tools.
3. **Verify**: Ensure proper balance of HTML tags, JS closures, and CSS definitions.
