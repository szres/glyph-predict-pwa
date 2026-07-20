<div align="center">
<img alt="logo" width="36%" src="./static/logo.png"/>
<br/>
<strong>Ingress Glyph Predict</strong> — PWA
</div>

Offline-capable PWA that predicts Ingress glyph sequences by filtering known lists as you pick or draw glyphs.

**Live:** [https://szres.github.io/glyph-predict-pwa/](https://szres.github.io/glyph-predict-pwa/)

## How it works

1. Choose **Normal** or **Overclock** on the home screen (last mode is stored in `localStorage`).
2. Pick sequence length (Normal: 2–5, Overclock: 3–5).
3. Enter glyphs in order:
   - If ≤12 candidates remain → tap glyph tiles
   - If more → draw on the hexagon canvas; the closest matching glyph is selected
4. Remaining sequences are filtered by the glyph at the current index; when one candidate is left, prediction finishes.

Sequence / glyph data (bundled under `static/`):

| File | Contents |
|------|----------|
| `normal.json` | 369 Normal sequences |
| `overclock.json` | 58 Overclock sequences |
| `glyphs.json` | 136 glyphs |

Installable as a PWA (fullscreen, offline via service worker).

## Develop

```sh
yarn install
yarn dev      # Vite / SvelteKit
yarn build    # static output in build/
yarn preview
yarn lint
```

GitHub Pages deploys from `build/` via `.github/workflows/gh-pages.yml`.

## Stack

SvelteKit + Vite, Tailwind, DaisyUI, `@vite-pwa/sveltekit`.
