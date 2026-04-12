# Implementation Plan: Desktop Bugfixes + Lightning Storm Confirmation

**Branch:** main
**Estimated Steps:** ~12 steps across 4 phases

## Context
Three issues need fixing in the desktop (non-mobile) version:
1. Navbar shifts right on scroll — caused by `initNavbar()` applying `style.transform = 'none'` inline on desktop, which overrides CSS `transform: translateX(-50%)` centering
2. Back button breaks pages — caused by bfcache restoring pages with stale inline styles from mobile breakpoint
3. New feature: replace confirmation screen with animated lightning storm on inscription success

## Prerequisites
- `script.js` is the single script controlling navbar and form logic
- `style.css` has all visual styles
- `animejs` 3.2.1 is loaded for animations
- `lightning-v4.js` renders background lightning bolts (DO NOT modify)

---

## Phase 1: Fix Desktop Navbar Shift Bug

**Root cause:** `initNavbar()` calls `applyMobileNavbarStyles()` which sets `navbar.style.transform = 'none'` on mobile. But in the scroll handler, the `else if (!isMobile())` branch ALSO sets `navbar.style.transform = 'none'`. This inline style overrides the CSS `transform: translateX(-50%)` that centers the floating navbar on desktop.

### Step 1.1 — Remove all inline style manipulation from desktop
- [ ] In `script.js`, rewrite `initNavbar()` so that **NO inline styles are ever applied to `navbar` or `navLinks` when `isMobile()` returns false**
- [ ] The scroll handler's `else if (!isMobile())` block must be **removed entirely** — let CSS handle desktop scroll appearance (`#navbar.scrolled`) without any JS style manipulation
- [ ] Remove `applyMobileNavbarStyles()` function completely
- [ ] Remove `applyMobileMenuStyles()` function completely — replace with CSS-only approach
- [ ] The only inline styles should be for the mobile menu toggle (open/close) inside the `if (isMobile())` block

**Verification:** Open on desktop, scroll down → navbar should stay centered, not shift right. The `.scrolled` class should add visual changes via CSS only.

### Step 1.2 — Add CSS-only desktop navbar scroll behavior
- [ ] In `style.css`, ensure `#navbar.scrolled` has: `background: rgba(5,5,5,0.85)`, `backdrop-filter: blur(20px)`, no `top` change (keep at `30px`)
- [ ] No JS should modify `navbar.style.background`, `navbar.style.backdropFilter`, or `navbar.style.transform` on desktop

**Verification:** Navbar stays centered at all scroll positions on desktop.

---

## Phase 2: Fix Back Button Breaking Pages (bfcache)

**Root cause:** When navigating back, the browser restores the page from bfcache with stale DOM state (inline styles from previous visit). The `DOMContentLoaded` event doesn't fire on bfcache restore, so `initNavbar()` never re-runs.

### Step 2.1 — Add pageshow listener to re-init on bfcache restore
- [ ] In `script.js`, add:
  ```js
  window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
          // bfcache restore — reinitialize everything
          initNavbar();
          highlightActiveLink();
      }
  });
  ```
- [ ] Also add to each HTML file: `<meta http-equiv="Cache-Control" content="no-store">` in `<head>` to disable bfcache entirely (fallback)

**Verification:** Navigate from index → gallery → press back → page renders correctly with no broken styles.

---

## Phase 3: Lightning Storm Confirmation Screen

Replace `showConfirmation()` in `script.js` with an animated full-screen lightning storm.

### Step 3.1 — Add lightning storm CSS to `style.css`
- [ ] Add `.confirmation-storm` class: `position: fixed; inset: 0; z-index: 9999; background: #050505; display: flex; align-items: center; justify-content: center; flex-direction: column; overflow: hidden;`
- [ ] Add `.storm-clouds` class: animated cloud shapes using pseudo-elements or background gradients, drifting horizontally
- [ ] Add `.storm-text` class: centered text with cyan glow, `font-family: var(--font-heading)`, `text-transform: uppercase`
- [ ] Add `.storm-bolt` class: SVG lightning bolt shapes with cyan/violet glow animations
- [ ] Add `.storm-subtext` class: smaller tech-text below main heading

### Step 3.2 — Rewrite `showConfirmation()` in `script.js`
- [ ] Function creates a `div.confirmation-storm` and appends to `document.body`
- [ ] **Phase 1 (0-800ms):** Screen starts black with `.storm-clouds` (dark gray gradients) drifting from edges to center
- [ ] **Phase 2 (800-2000ms):** Multiple `.storm-bolt` SVG elements appear randomly — cyan (#00f2ff) and violet (#b400ff) — scaling from center, each with `anime()` burst animation
- [ ] **Phase 3 (2000-3000ms):** Screen flashes white briefly, then reveals the confirmation text:
  - Main: "INSCRIPCIÓN RECIBIDA" in massive cyan text with glow
  - Sub: "PREPARATE PARA LA GUERRA" in outlined text
- [ ] **Phase 4 (3000ms+):** Lightning bolts continue flashing intermittently. Payment info card fades in below text with ALIAS and WhatsApp button
- [ ] Use existing `anime.js` for all animations (same library already loaded)

### Step 3.3 — Create bolt SVG generator function
- [ ] Add `createStormBolt()` helper: generates random SVG paths shaped like lightning bolts
- [ ] Bolts spawn from random edges (top, left, right, bottom) converging toward center
- [ ] Colors: alternate between `#00f2ff` (cyan) and `#b400ff` (violet)
- [ ] Each bolt has: `stroke-width: 2-4px`, `filter: drop-shadow` for glow, opacity 0→1→0 in 400-600ms
- [ ] Spawn 8-12 bolts total in Phase 2, then 1-2 intermittently in Phase 4

**Verification:** Submit form → full-screen lightning storm animation plays → text appears → payment info visible → all animations smooth.

---

## Verification

After all steps:
1. **Desktop:** Open on 1920px screen, scroll up and down → navbar stays centered, no shift
2. **Desktop:** Click gallery link → go back with browser button → page renders correctly
3. **Desktop + Mobile:** Fill inscription form → submit → see lightning storm animation → confirmation text appears
4. **Mobile:** Open hamburger menu → solid black background, items vertically centered
5. **No regressions:** Lightning-v4.js background bolts still work, all pages load normally
