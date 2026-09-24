# Morgan Chochinov — Portfolio Site

A static portfolio website built around a single design concept: the book *S, M, L, XL* by Rem Koolhaas and Bruce Mau. The site treats itself like a printed book — a running head, a contents index with dot leaders, numbered chapters instead of a nav menu, and a spec-sheet rail alongside each project's write-up.

No build step, no framework, no dependencies beyond two Google Fonts. Everything renders from a single data file.

## How to use this

Open `index.html` in a browser — that's it, it runs locally with no server needed. To host it, upload the five `.js`/`.html`/`.css` files plus the `images/` and `models/` folders to any static host (Netlify, GitHub Pages, Vercel, etc.) keeping the folder structure intact.

**To update content, only edit `data.js`.** It's fully commented — name, bio, contact info, and every project's copy, images, and layout options live there. You should never need to touch `index.html`, `style.css`, or `script.js` for a content change.

## File structure

```
.
├── index.html          Page shell / structure
├── style.css            All visual styling, design tokens at the top
├── script.js             Renders everything from data.js into the page
├── data.js               ALL editable content — start here
├── arsvita-3d.js         Draggable 3D model viewer (Arsvita)
├── README.md            This file
├── models/
│   └── arsvita-3d-model.js      Arsvita book + acrylic stand 3D model (loaded on demand)
└── images/
    ├── dozer-*.jpg              7 photos — Dozer Magazine
    ├── logo-full.png            The Pecking Order logo mark
    ├── arsvita/
    │   ├── 3d-poster.png                    Still of the 3D model (transparent), shown while it loads
    │   └── spread-01.jpg … spread-23.jpg    Full page-flip book (23 spreads)
    └── pecking-order/
        └── marabou-*.jpg (6), shoebill-*.jpg (6),
            kingvulture-*.jpg (5), hoatzin-01.jpg (1)
```

## Design system quick reference

- **Palette:** paper `#F0EFE9`, ink `#121212`, grey `#6E6D67`, line `#C7C5BB` — all defined as CSS custom properties at the top of `style.css`.
- **Type:** Archivo (display/body), IBM Plex Mono (labels, data, captions).
- **Chapter numbering:** projects are numbered 01/02/03 in the order they appear in the `projects` array in `data.js`.
- **Per-project format variation:** each project can opt into different rail formats and hero treatments via optional fields in `data.js` — a plain spec list, a chapter index (`chapters`), a fact-box grid (`statGrid`), a logo breakdown (`logoBreakdown`), a single hero image (`images`), a full page-flip viewer (`spreads`), a draggable 3D model that opens into the page-flip viewer (`model3d`), or a click-to-pick set of mini flipbooks (`birdPicker`). All of these are documented in the comment block at the top of `data.js`.

## The 3D model (Arsvita)

Arsvita's project opens on a 3D model of the book in its laser-cut acrylic stand, floating with a soft shadow underneath. The 3D area has a transparent background, so the model sits straight on the page's own background colour (and stays matched if you change `--paper` in `style.css`). The cover is colour-matched to the printed blue, `#7FBFE9`. Visitors drag it to turn it and see every side, switch between **With stand** and **Without stand**, and click it (tap on phones) to open the page-flip spreads; **← Back to 3D model** returns to it.

**Where the files go** (paths are relative to `index.html`):

```
index.html
arsvita-3d.js                  next to index.html, not inside images/
models/arsvita-3d-model.js     in a folder called models
images/arsvita/3d-poster.png   with the Arsvita spreads
```

- It's switched on by the `model3d` field on the Arsvita project in `data.js`. Delete that field and the project goes back to opening straight on the spreads. If you move the model or the poster, update the two paths there.
- If the model file isn't where `data.js` says, the viewer also checks next to `index.html`, `images/`, and `images/arsvita/` before giving up. If it still can't find it, or `arsvita-3d.js` itself is missing, the stage shows the poster plus a short note naming the missing file, so a misplaced file is easy to spot.
- `arsvita-3d.js` is the viewer: plain WebGL 2, no libraries. `models/arsvita-3d-model.js` holds the model itself (about 4 MB). It only starts downloading when the project is about to scroll into view, so it never slows down the first page load.
- The model is loaded with a `<script>` tag rather than `fetch()`, so it works when you open `index.html` straight from disk as well as when hosted.
- On phones, sideways swipes turn the book and up/down swipes still scroll the page. Anyone whose browser can't show 3D sees the poster instead, and clicking it still opens the book. With "reduce motion" turned on, the model doesn't spin by itself.
- Look settings live near the top of `arsvita-3d.js`: `FLOAT` (how high the book hovers) and `SHADOW` (shadow strength, 0 to 1). The poster is a transparent PNG for the same reason the 3D area is transparent.

## The code

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Morgan Chochinov — Graphic & Editorial Designer</title>
<meta name="description" content="Portfolio of Morgan Chochinov, a graphic and editorial designer based in Toronto specializing in magazine design, identity systems, and print production.">
<meta name="theme-color" content="#F0EFE9">

<meta property="og:title" content="Morgan Chochinov — Graphic & Editorial Designer">
<meta property="og:description" content="Editorial design portfolio: magazine systems, identity, and print production.">
<meta property="og:type" content="website">
<meta property="og:image" content="images/dozer-01-main.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Morgan Chochinov — Graphic & Editorial Designer">
<meta name="twitter:description" content="Editorial design portfolio: magazine systems, identity, and print production.">
<meta name="twitter:image" content="images/dozer-01-main.jpg">

<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F0EFE9'/%3E%3Ctext x='50' y='69' font-family='Arial, sans-serif' font-weight='900' font-size='52' text-anchor='middle' fill='%23121212'%3EMC%3C/text%3E%3C/svg%3E">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<!-- running index strip, mimics a book's running head -->
<div class="runhead" aria-hidden="true">
  <span id="runhead-name"></span>
  <span class="runhead-mid">·</span>
  <span id="runhead-section">portfolio</span>
  <span class="runhead-progress-track"><span id="scroll-progress" class="runhead-progress-fill"></span></span>
</div>

<header class="hero" id="top">
  <nav class="hero-nav">
    <a href="#work">work</a>
    <a href="#about">about</a>
    <a href="#contact">contact</a>
  </nav>

  <div class="hero-main">
    <h1 id="hero-name" class="hero-name"></h1>
    <div class="hero-side">
      <p id="hero-role" class="hero-role"></p>
      <p id="hero-tagline" class="hero-tagline"></p>
    </div>
  </div>

  <div class="hero-foot">
    <span id="hero-location"></span>
    <span class="hero-scroll">scroll — 01 / 02 / 03</span>
  </div>
</header>

<main>

  <!-- CONTENTS: literalizes the book's S/M/L/XL organizing device as a real index -->
  <section class="contents" aria-label="Contents">
    <div class="contents-label">
      <span class="contents-number">00</span>
      <h2>Contents</h2>
    </div>
    <ol id="contents-list" class="contents-list"></ol>
  </section>

  <section id="work" class="work">
    <div id="work-sections"></div>
  </section>

  <section id="about" class="about">
    <div class="about-number">
      <span>04</span>
    </div>
    <div class="about-grid">
      <h2 class="about-heading">About</h2>
      <p id="about-bio" class="about-bio"></p>
      <div class="about-contactline">
        <p>Based in <span id="about-location"></span>. Available for identity, print, and systems work.</p>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <div class="contact-number"><span>05</span></div>
    <div class="contact-main">
      <h2>Get in touch</h2>
      <p id="contact-status" class="contact-status"></p>
      <a id="contact-email" class="contact-email" href="#"></a>
      <ul id="contact-social" class="contact-social"></ul>
    </div>
  </section>

</main>

<footer class="backtotop">
  <a href="#top">Back to top ↑</a>
</footer>

<script src="data.js"></script>
<script src="arsvita-3d.js"></script>
<script src="script.js"></script>
</body>
</html>

```

### `style.css`

```css
/* ────────────────────────────────────────────────────────────
   TOKENS
   ──────────────────────────────────────────────────────────── */
:root{
  --paper: #F0EFE9;
  --ink: #121212;
  --grey: #6E6D67;
  --line: #C7C5BB;
  --viewer-bg: #121212;

  --sans: "Archivo", Arial, sans-serif;
  --mono: "IBM Plex Mono", "Courier New", monospace;

  --measure: 62ch;
  --gutter: clamp(1.25rem, 3vw, 2.5rem);
}

*{ box-sizing: border-box; }
html{ scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior: auto; }
  *{ animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}

body{
  margin: 0;
  padding-bottom: 3rem;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

a{ color: inherit; }
a:focus-visible, button:focus-visible{
  outline: 3px solid var(--ink);
  outline-offset: 2px;
}
.hero a:focus-visible{
  outline-color: var(--paper);
}

h1,h2,h3,p,ol,ul{ margin: 0; }

/* ────────────────────────────────────────────────────────────
   RUNNING HEAD — mimics a book's printed running header
   ──────────────────────────────────────────────────────────── */
.runhead{
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding: 0.5rem var(--gutter);
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  background: var(--paper);
  color: var(--grey);
}
.runhead-mid{ opacity: 0.6; }
.runhead-progress-track{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--line);
}
.runhead-progress-fill{
  display: block;
  height: 100%;
  width: 0%;
  background: var(--ink);
}

/* ────────────────────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────────────────────── */
.hero{
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 92vh;
  padding: var(--gutter);
  background: var(--paper);
  color: var(--ink);
}

.hero-nav{
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  justify-content: flex-end;
  font-family: var(--mono);
  font-size: 0.85rem;
}
.hero-nav a{ text-decoration: none; border-bottom: 1px solid transparent; }
.hero-nav a:hover{ border-bottom-color: var(--ink); }

.hero-main{
  display: grid;
  grid-template-columns: 1fr;
  align-items: end;
  gap: 1rem;
  padding-block: 2rem;
}
.hero-name{
  font-weight: 900;
  font-size: clamp(3.2rem, 13vw, 10.5rem);
  line-height: 0.86;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.hero-side{
  max-width: 34ch;
  border-left: 3px solid var(--ink);
  padding-left: 1rem;
}
.hero-role{
  font-family: var(--mono);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.hero-tagline{
  margin-top: 0.6rem;
  font-size: 1.05rem;
  color: var(--grey);
}

.hero-foot{
  display: flex;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--grey);
}

@media (min-width: 780px){
  .hero-main{
    grid-template-columns: 3fr 1fr;
  }
}

/* ────────────────────────────────────────────────────────────
   CONTENTS — literal S / M / L / XL index
   ──────────────────────────────────────────────────────────── */
.contents{
  padding: var(--gutter);
  border-bottom: 1px solid var(--line);
}
.contents-label{
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.contents-number{
  font-family: var(--mono);
  color: var(--grey);
}
.contents-label h2{
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.contents-list{
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--line);
}
.contents-row{
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s cubic-bezier(0.45, 0, 0.55, 1);
}
.contents-row:hover{
  transform: translateX(10px);
}
.contents-row:hover .toc-title{
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.toc-num{
  flex: 0 0 auto;
  width: 2.4rem;
  font-weight: 900;
  font-size: 1.4rem;
  color: var(--ink);
}

.contents-thumb{
  flex: 0 0 auto;
  display: block;
  width: 4.25rem;
  height: 2.8rem;
  overflow: hidden;
}
.contents-thumb img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.contents-thumb.is-empty{
  background: repeating-linear-gradient(135deg, var(--paper) 0 2px, var(--line) 2px 3px);
}
.contents-thumb.is-logo img{
  object-fit: contain;
  padding: 0.35rem;
  box-sizing: border-box;
}

.toc-title{
  flex: 1 1 auto;
  min-width: 7rem;
  font-weight: 800;
  font-size: clamp(1.2rem, 3.2vw, 2.1rem);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 62%;
}

.toc-leader{
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  color: var(--line);
  font-family: var(--mono);
  letter-spacing: 0.3em;
}
.toc-leader::after{
  content: "......................................................................................................................................................................................................................................................................................";
}

.toc-year{
  flex: 0 0 auto;
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--grey);
}

@media (max-width: 500px){
  .contents-thumb{ display: none; }
  .contents-row{ gap: 0.6rem; }
  .toc-title{ max-width: 72%; }
}
/* floating image preview that follows the cursor when hovering
   a contents row on desktop; hidden entirely on touch devices */
.cursor-preview{
  position: fixed;
  width: 240px;
  height: 160px;
  left: 0;
  top: 0;
  background: var(--paper);
  overflow: hidden;
  pointer-events: none;
  z-index: 50;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.cursor-preview.is-visible{ opacity: 1; }
.cursor-preview img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ────────────────────────────────────────────────────────────
   WORK — one entry per project, asymmetric two-column layout
   ──────────────────────────────────────────────────────────── */
.project{
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 3rem;
}
.project-rail{
  padding: var(--gutter);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.project-scale-mark{
  font-weight: 900;
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 0.8;
  color: var(--ink);
}
.project-def{
  font-size: 0.95rem;
  max-width: 32ch;
}
.project-def .term{
  font-weight: 700;
  text-transform: lowercase;
}
.project-def .pos{
  font-family: var(--mono);
  color: var(--grey);
  font-size: 0.8rem;
}
.project-spec{
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--grey);
  display: grid;
  gap: 0.35rem;
}

/* ---- alternate rail format: chapter index (Arsvita) ---- */
.project-chapters{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.project-chapters-list{
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--line);
}
.project-chapters-list li{
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--line);
}
.ch-num{
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--grey);
  width: 1.5rem;
  flex-shrink: 0;
}
.ch-title{ font-size: 0.95rem; }
.project-chapters-meta{
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--grey);
}

/* ---- alternate rail format: field-guide stat grid (Pecking Order) ---- */
.project-statgrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--ink);
  border-left: 1px solid var(--ink);
}
.project-statgrid .stat{
  padding: 0.6rem 0.7rem;
  border-right: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.stat-label{
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--grey);
}
.stat-value{
  font-size: 0.9rem;
  font-weight: 600;
}

/* ---- logo breakdown (rail) ---- */
.project-logobreak{
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.logobreak-full{
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.logobreak-full img{
  max-width: 32%;
  height: auto;
  display: block;
}
.logobreak-full.is-revealed{
  opacity: 1;
  transform: scale(1);
}

.project-main{
  padding: var(--gutter);
}
.project-image{
  aspect-ratio: 16 / 10;
  width: 100%;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-image.is-revealed{
  opacity: 1;
  transform: scale(1);
}

/* ---- flipbook: drag-to-turn page viewer ---- */
.flipbook{
  width: 100%;
  margin-bottom: 1.5rem;
  overflow: hidden;
  background: var(--viewer-bg);
  cursor: grab;
  touch-action: pan-y;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
}
.flipbook--wide{ aspect-ratio: 1.412 / 1; }
.flipbook--standard{ aspect-ratio: 1.333 / 1; }
.flipbook.is-dragging{
  cursor: grabbing;
}
.flipbook-stack{
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 2600px;
}
.flipbook-page{
  position: absolute;
  inset: 0;
  transform-origin: left center;
  backface-visibility: hidden;
  box-shadow: -6px 0 18px rgba(0,0,0,0.18);
}
.flipbook-page img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.flipbook-page.is-animating{
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
}

.flipbook-hint{
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 999;
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--paper);
  background: rgba(0,0,0,0.55);
  padding: 0.3rem 0.6rem;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.5s ease;
}
.flipbook-hint.is-hidden{ opacity: 0; }

.flipbook-slider{
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 1.2rem;
  margin: 0 0 1.5rem;
  background: transparent;
  cursor: pointer;
}
.flipbook-slider::-webkit-slider-runnable-track{
  height: 2px;
  background: var(--line);
}
.flipbook-slider::-moz-range-track{
  height: 2px;
  background: var(--line);
}
.flipbook-slider::-webkit-slider-thumb{
  -webkit-appearance: none;
  appearance: none;
  width: 3px;
  height: 1.1rem;
  margin-top: -0.55rem;
  background: var(--ink);
  border-radius: 0;
  cursor: pointer;
}
.flipbook-slider::-moz-range-thumb{
  width: 3px;
  height: 1.1rem;
  background: var(--ink);
  border: none;
  border-radius: 0;
  cursor: pointer;
}

/* ---- 3D model: drag to turn, click to open the spreads (Arsvita) ----
   The stage is transparent, so the model sits straight on the page
   background; its soft shadow is drawn in 3D. */
.model3d{ margin-bottom: 1.5rem; }
.model3d[hidden],
.model3d-book[hidden]{ display: none; }
.model3d:not([hidden]),
.model3d-book:not([hidden]){
  animation: model3d-in 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes model3d-in{
  from{ opacity: 0; }
  to{ opacity: 1; }
}
.model3d-stage{
  position: relative;
  width: 100%;
  aspect-ratio: 1.412 / 1;
  overflow: hidden;
  background: transparent;
  cursor: grab;
  touch-action: pan-y;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
@media (max-width: 640px){
  .model3d-stage{ aspect-ratio: 1 / 1; }
}
.model3d-stage.is-dragging{ cursor: grabbing; }
.model3d-stage.is-fallback{ cursor: pointer; }
.model3d-stage:focus-visible{
  outline: 3px solid var(--ink);
  outline-offset: 2px;
}
.model3d-poster,
.model3d-canvas{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.model3d-poster{ object-fit: cover; z-index: 0; }
.model3d-canvas{
  z-index: 1;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.model3d-stage.is-ready .model3d-canvas{ opacity: 1; }
.model3d-stage.is-ready .model3d-poster{ visibility: hidden; transition: visibility 0s 0.6s; }
.model3d-stage.is-fallback .model3d-canvas{ display: none; }

.model3d-loading{
  position: absolute;
  z-index: 2;
  left: 0.75rem;
  top: 0.75rem;
  right: 0.75rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--grey);
  pointer-events: none;
}
.model3d-stage.is-ready .model3d-loading,
.model3d-stage.is-fallback .model3d-loading{ display: none; }
/* only shown if a file is in the wrong place, so it's easy to spot */
.model3d-stage.is-missing .model3d-loading{
  display: block;
  right: auto;
  max-width: calc(100% - 1.5rem);
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--ink);
  padding: 0.4rem 0.6rem;
}

.model3d-open-label{
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  z-index: 2;
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--paper);
  background: var(--ink);
  padding: 0.35rem 0.65rem;
  pointer-events: none;
}
.model3d-stage:hover .model3d-open-label{
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.model3d-hint{
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 2;
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--grey);
  border: 1px solid var(--line);
  padding: 0.3rem 0.6rem;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.model3d-hint.is-hidden,
.model3d-stage.is-fallback .model3d-hint{ opacity: 0; }

.model3d-controls{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.6rem;
}
.model3d-stage.is-fallback ~ .model3d-controls{ display: none; }
.model3d-toggle{
  display: inline-flex;
  border: 1px solid var(--ink);
}
.model3d-toggle button{
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--ink);
  background: none;
  border: none;
  margin: 0;
  padding: 0.45rem 0.85rem;
  min-height: 2.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.model3d-toggle button + button{ border-left: 1px solid var(--ink); }
.model3d-toggle button[aria-pressed="true"]{
  background: var(--ink);
  color: var(--paper);
}
.model3d-toggle button:focus-visible{ outline-offset: -5px; outline-color: var(--paper); }
.model3d-toggle button[aria-pressed="false"]:focus-visible{ outline-color: var(--ink); }

/* ---- bird picker ---- */
.bird-picker-prompt{
  font-size: 0.95rem;
  color: var(--grey);
  margin-bottom: 1rem;
}
.bird-picker-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}
.bird-picker-grid[hidden]{ display: none; }
@media (min-width: 640px){
  .bird-picker-grid{ grid-template-columns: repeat(4, 1fr); }
}
.bird-thumb{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  font-family: var(--sans);
  color: var(--ink);
}
.bird-thumb-img{
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--viewer-bg);
}
.bird-thumb-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.bird-thumb:hover .bird-thumb-img img{ transform: scale(1.05); }
.bird-thumb-label{
  font-size: 0.9rem;
  font-weight: 700;
}
.bird-thumb.is-inprogress{ cursor: default; }
.bird-thumb.is-inprogress .bird-thumb-img{ opacity: 0.4; }
.bird-thumb.is-inprogress .bird-thumb-label{ color: var(--grey); }
.bird-thumb-status{
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--grey);
}

.bird-viewer-back{
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 1.25rem;
  font-family: var(--mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  border-bottom: 1px solid var(--ink);
  cursor: pointer;
}
.bird-viewer-back:hover{ color: var(--grey); border-bottom-color: var(--grey); }
.bird-viewer-title{
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}
.project-image img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.project-image.placeholder{
  background:
    repeating-linear-gradient(135deg, var(--paper) 0 2px, var(--line) 2px 3px);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.project-image.placeholder .ph-label{
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--grey);
  background: var(--paper);
  padding: 0.25rem 0.5rem;
  margin: 0.6rem;
  border: 1px solid var(--line);
}

.project-title{
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
  max-width: 26ch;
}
.project-credits{
  max-width: var(--measure);
  font-size: 0.95rem;
  color: var(--grey);
  padding-left: 1rem;
  border-left: 2px solid var(--line);
  margin-bottom: 1.75rem;
}

.project-block{
  max-width: var(--measure);
  margin-bottom: 1.5rem;
}
.project-block-label{
  font-family: var(--mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--grey);
  margin-bottom: 0.4rem;
}
.project-block-text{
  font-size: 1.05rem;
}

.project-block-outcome{
  padding-left: 1rem;
  border-left: 3px solid var(--ink);
}
.project-block-outcome .project-block-label{
  color: var(--ink);
}

.project-process{
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.project-process .project-block-label{
  margin-bottom: 1rem;
}

.project-gallery{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 130px;
  grid-auto-flow: dense;
  gap: 0.5rem;
  margin-top: 2rem;
}
.project-gallery-item{
  overflow: hidden;
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-gallery-item.is-revealed{
  opacity: 1;
  transform: scale(1);
}
.project-gallery-item img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* asymmetric sizing: first image is the big feature tile,
   fourth/fifth/sixth run wide, second/third stay small */
.project-gallery-item:nth-child(1){
  grid-column: span 2;
  grid-row: span 2;
}
.project-gallery-item:nth-child(4),
.project-gallery-item:nth-child(5),
.project-gallery-item:nth-child(6){
  grid-column: span 2;
}

@media (min-width: 700px){
  .project-gallery{ grid-auto-rows: 160px; }
}

/* ---- brand crossfade strip ---- */
.brand-strip{
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.brand-strip-label{
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--grey);
}
.brand-strip-stage{
  display: block;
  height: 1.6rem;
  overflow: hidden;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  filter: grayscale(1) contrast(1.1);
}
.brand-strip-name{
  display: inline-block;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s cubic-bezier(0.45, 0, 0.55, 1),
              transform 0.5s cubic-bezier(0.45, 0, 0.55, 1);
}
.brand-strip-name.is-visible{
  opacity: 1;
  transform: translateY(0);
}

/* ────────────────────────────────────────────────────────────
   BACK TO TOP FOOTER
   ──────────────────────────────────────────────────────────── */
.backtotop{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: var(--paper);
  border-top: 1px solid var(--ink);
  padding: 0.6rem var(--gutter);
  text-align: center;
}
.backtotop a{
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.8rem;
  text-decoration: none;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 0.1rem;
}
.backtotop a:hover{
  color: var(--grey);
  border-bottom-color: var(--grey);
}

@media (min-width: 900px){
  .project{ grid-template-columns: 1fr 2fr; }
  .project-rail{
    border-bottom: none;
    border-right: 1px solid var(--line);
    position: sticky;
    top: 2.75rem;
    align-self: start;
  }
}

/* empty scale state */
.project-empty{
  padding: var(--gutter);
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
}
.project-empty .empty-mark{
  font-weight: 900;
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 0.8;
  color: var(--line);
}
.project-empty p{
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--grey);
  max-width: 40ch;
}

/* ────────────────────────────────────────────────────────────
   ABOUT — pull quote treatment via yellow block
   ──────────────────────────────────────────────────────────── */
.about{
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--line);
}
.about-number{
  padding: var(--gutter);
  font-family: var(--sans);
  font-weight: 900;
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 0.8;
  color: var(--ink);
  border-bottom: 1px solid var(--line);
}
.about-grid{
  padding: var(--gutter);
  display: grid;
  gap: 1.5rem;
}
.about-heading{
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 700;
}
.about-bio{
  max-width: var(--measure);
  font-size: 1.15rem;
  padding-left: 1.25rem;
  border-left: 3px solid var(--ink);
}
.about-contactline{
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--grey);
}

@media (min-width: 900px){
  .about{ grid-template-columns: 1fr 3fr; }
  .about-number{ border-bottom: none; border-right: 1px solid var(--line); }
}

/* ────────────────────────────────────────────────────────────
   CONTACT
   ──────────────────────────────────────────────────────────── */
.contact{
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--line);
}
.contact-number{
  padding: var(--gutter);
  font-weight: 900;
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 0.8;
  color: var(--ink);
  border-bottom: 1px solid var(--line);
}
.contact-main{
  padding: var(--gutter);
}
.contact-main h2{
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 700;
  margin-bottom: 1rem;
}
.contact-status{
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--grey);
  margin-bottom: 1rem;
}
.contact-email{
  display: inline-block;
  font-size: clamp(1.6rem, 5vw, 3rem);
  font-weight: 800;
  text-decoration: none;
  border-bottom: 3px solid var(--ink);
  margin-bottom: 1.5rem;
}
.contact-social{
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  flex-wrap: wrap;
}
.contact-social a{ text-decoration: underline; }

@media (min-width: 900px){
  .contact{ grid-template-columns: 1fr 3fr; }
  .contact-number{ border-bottom: none; border-right: 1px solid var(--line); }
}

```

### `script.js`

```javascript
(function(){
  const d = PORTFOLIO_DATA;
  const SCALES = ["01", "02", "03"];

  function escapeAttr(str){
    return String(str).replace(/"/g, "&quot;");
  }

  // ---- hero ----
  document.getElementById("hero-name").textContent = d.name;
  document.getElementById("hero-role").textContent = d.role;
  document.getElementById("hero-tagline").textContent = d.tagline;
  document.getElementById("hero-location").textContent = d.location;
  document.getElementById("runhead-name").textContent = d.name;

  // ---- group projects by scale ----
  const byScale = {};
  SCALES.forEach(s => byScale[s] = []);
  d.projects.forEach(p => { (byScale[p.scale] || (byScale[p.scale] = [])).push(p); });

  // ---- floating cursor preview (desktop only, real pointer only) ----
  const canHoverPreview = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let cursorPreviewEl = null;
  if (canHoverPreview) {
    cursorPreviewEl = document.createElement("div");
    cursorPreviewEl.className = "cursor-preview";
    const img = document.createElement("img");
    img.alt = "";
    cursorPreviewEl.appendChild(img);
    document.body.appendChild(cursorPreviewEl);
  }

  function attachCursorPreview(rowEl, imageSrc){
    if (!canHoverPreview || !imageSrc) return;
    const img = cursorPreviewEl.querySelector("img");
    rowEl.addEventListener("mouseenter", () => {
      img.src = imageSrc;
      cursorPreviewEl.classList.add("is-visible");
    });
    rowEl.addEventListener("mousemove", (e) => {
      cursorPreviewEl.style.left = (e.clientX + 24) + "px";
      cursorPreviewEl.style.top = (e.clientY - 90) + "px";
    });
    rowEl.addEventListener("mouseleave", () => {
      cursorPreviewEl.classList.remove("is-visible");
    });
  }

  // ---- contents list ----
  const contentsList = document.getElementById("contents-list");
  d.projects.forEach(p => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#project-" + p.id;
    a.className = "contents-row";

    const thumbSrc = p.contentsThumb ? p.contentsThumb.src : ((p.images && p.images.length) ? p.images[0] : null);
    const thumbBg = p.contentsThumb ? ` style="background:${p.contentsThumb.background}"` : "";
    const thumbClass = p.contentsThumb ? " is-logo" : "";
    const thumbMarkup = thumbSrc
      ? `<img src="${thumbSrc}" alt="" loading="lazy">`
      : "";

    a.innerHTML = `
      <span class="toc-num">${p.scale}</span>
      <span class="contents-thumb${thumbSrc ? "" : " is-empty"}${thumbClass}"${thumbBg}>${thumbMarkup}</span>
      <span class="toc-title">${p.title}</span>
      <span class="toc-leader" aria-hidden="true"></span>
      <span class="toc-year">${p.year}</span>
    `;
    li.appendChild(a);
    contentsList.appendChild(li);

    attachCursorPreview(a, thumbSrc);
  });

  // ---- brand crossfade strip ----
  function buildBrandStrip(brands){
    const wrap = document.createElement("div");
    wrap.className = "brand-strip";
    wrap.setAttribute("aria-label", "As seen with: " + brands.join(", "));

    const label = document.createElement("span");
    label.className = "brand-strip-label";
    label.textContent = "As seen with";
    wrap.appendChild(label);

    const stage = document.createElement("span");
    stage.className = "brand-strip-stage";
    wrap.appendChild(stage);

    let i = 0;
    let intervalId = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showNext(){
      stage.innerHTML = ""; // always start from a clean slate, never stack
      const el = document.createElement("span");
      el.className = "brand-strip-name";
      el.textContent = brands[i % brands.length];
      stage.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));
    }

    function cycle(){
      const current = stage.querySelector(".brand-strip-name");
      if (!current) { showNext(); return; }
      current.classList.remove("is-visible");
      let done = false;
      const finish = () => { if (done) return; done = true; showNext(); };
      current.addEventListener("transitionend", finish, { once: true });
      // fallback in case the transitionend event never fires (e.g. the tab
      // was backgrounded mid-transition) so the strip can't get stuck
      setTimeout(finish, 700);
    }

    function start(){
      if (intervalId || prefersReduced) return;
      intervalId = setInterval(() => { i++; cycle(); }, 2200);
    }
    function stop(){
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    if (!prefersReduced) {
      showNext();
      start();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stop();
        } else {
          // resync cleanly rather than resuming mid-transition
          stage.innerHTML = "";
          showNext();
          start();
        }
      });
    } else {
      stage.textContent = brands.join(" \u00b7 ");
    }

    return wrap;
  }

  // ---- work sections, one block per scale tier ----
  const workRoot = document.getElementById("work-sections");
  SCALES.forEach(scale => {
    const projects = byScale[scale];
    if (!projects || projects.length === 0) {
      const empty = document.createElement("div");
      empty.className = "project-empty";
      empty.innerHTML = `
        <span class="empty-mark">${scale}</span>
        <p>No entry ${scale} published yet \u2014 check back, or ask to see work in progress.</p>
      `;
      workRoot.appendChild(empty);
      return;
    }
    projects.forEach(p => {
      const section = document.createElement("article");
      section.className = "project project--" + p.id;
      section.id = "project-" + p.id;

      const hasImages = p.images && p.images.length > 0;
      const hasSpreads = p.spreads && p.spreads.length > 1;
      const hasBirdPicker = p.birdPicker && p.birdPicker.length > 0;
      const hasModel3d = hasSpreads && p.model3d && p.model3d.src;

      function buildFlipbookMarkup(spreads, title, aspectClass){
        return `<div class="flipbook ${aspectClass}" role="img" aria-label="${escapeAttr(title)} \u2014 page-flip preview of ${spreads.length} spreads">
             <div class="flipbook-stack">
               ${spreads.map((src, i) => `
                 <div class="flipbook-page" data-index="${i}" style="z-index:${spreads.length - i};">
                   <img src="${src}" alt="${escapeAttr(title)} spread ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}">
                 </div>
               `).join("")}
             </div>
             <span class="flipbook-hint">Drag to flip \u2194</span>
           </div>
           <input type="range" class="flipbook-slider" min="0" max="${spreads.length - 1}" value="0"
                  step="1" aria-label="Spread position, ${spreads.length} total">`;
      }

      // 3D model shown first; clicking it swaps in the page-flip spreads
      function buildModel3dMarkup(){
        const clickWord = canHoverPreview ? "Click" : "Tap";
        const poster = p.model3d.poster
          ? `<img class="model3d-poster" src="${p.model3d.poster}" alt="" loading="lazy">`
          : "";
        return `<div class="model3d" data-model3d="${p.id}">
             <div class="model3d-stage" tabindex="0" role="button"
                  aria-label="${escapeAttr(p.title)} in 3D. Drag to turn it around. ${clickWord} or press Enter to open the book.">
               ${poster}
               <span class="model3d-loading" aria-hidden="true">Loading 3D model\u2026</span>
               <span class="model3d-open-label" aria-hidden="true">${clickWord} to open the book</span>
               <span class="model3d-hint" aria-hidden="true">Drag to turn \u2194</span>
             </div>
             <div class="model3d-controls">
               <div class="model3d-toggle" role="group" aria-label="Acrylic stand">
                 <button type="button" data-stand="on" aria-pressed="true">With stand</button>
                 <button type="button" data-stand="off" aria-pressed="false">Without stand</button>
               </div>
             </div>
           </div>
           <div class="model3d-book" hidden>
             <button type="button" class="bird-viewer-back model3d-back">\u2190 Back to 3D model</button>
             ${buildFlipbookMarkup(p.spreads, p.title, 'flipbook--wide')}
           </div>`;
      }

      const heroBlock = hasBirdPicker
        ? `<div class="bird-picker">
             <p class="bird-picker-prompt">Pick a bird below to see its full spread.</p>
             <div class="bird-picker-grid">
               ${p.birdPicker.map(bird => `
                 <button type="button" class="bird-thumb${bird.status === 'in-progress' ? ' is-inprogress' : ''}"
                         data-bird="${bird.id}" ${bird.status === 'in-progress' ? 'disabled' : ''}>
                   <span class="bird-thumb-img"><img src="${bird.spreads[0]}" alt="${escapeAttr(bird.name)}" loading="lazy"></span>
                   <span class="bird-thumb-label">${bird.name}</span>
                   ${bird.status === 'in-progress' ? '<span class="bird-thumb-status">In progress</span>' : ''}
                 </button>
               `).join("")}
             </div>
             ${p.birdPicker.filter(b => b.status === 'complete').map(bird => `
               <div class="bird-viewer" data-bird-viewer="${bird.id}" hidden>
                 <button type="button" class="bird-viewer-back">\u2190 All birds</button>
                 <h4 class="bird-viewer-title">${bird.name}</h4>
                 ${buildFlipbookMarkup(bird.spreads, p.title + ' \u2014 ' + bird.name, 'flipbook--standard')}
               </div>
             `).join("")}
           </div>`
        : hasModel3d
        ? buildModel3dMarkup()
        : hasSpreads
        ? buildFlipbookMarkup(p.spreads, p.title, 'flipbook--wide')
        : hasImages
        ? `<div class="project-image"><img src="${p.images[0]}" alt="${escapeAttr(p.title)} \u2014 featured photo" loading="lazy"></div>`
        : `<div class="project-image placeholder"><span class="ph-label">image \u2014 ${p.dimensions}</span></div>`;

      const galleryImages = hasImages ? p.images.slice(1) : [];
      const galleryBlock = galleryImages.length
        ? `<div class="project-gallery">${galleryImages.map(src =>
            `<div class="project-gallery-item"><img src="${src}" alt="${escapeAttr(p.title)} \u2014 supporting photo" loading="lazy"></div>`
          ).join("")}</div>`
        : "";

      const outcomeBlock = p.outcome
        ? `<div class="project-block project-block-outcome">
             <h4 class="project-block-label">Outcome</h4>
             <p class="project-block-text">${p.outcome}</p>
           </div>`
        : "";

      const processImages = p.processImages || [];
      const processBlock = processImages.length
        ? `<div class="project-process">
             <h4 class="project-block-label">Process</h4>
             <div class="project-gallery">${processImages.map(src =>
                `<div class="project-gallery-item"><img src="${src}" alt="${escapeAttr(p.title)} \u2014 process image" loading="lazy"></div>`
              ).join("")}</div>
           </div>`
        : "";

      const specBlock = p.chapters && p.chapters.length
        ? `<div class="project-chapters">
             <h4 class="project-block-label">Contents</h4>
             <ol class="project-chapters-list">
               ${p.chapters.map(c => `
                 <li><span class="ch-num">${c.n}</span><span class="ch-title">${c.title}</span></li>
               `).join("")}
             </ol>
             <p class="project-chapters-meta">${p.id} \u2014 ${p.year} \u00b7 ${p.dimensions}</p>
           </div>`
        : p.statGrid && p.statGrid.length
        ? `<div class="project-statgrid">
             ${p.statGrid.map(s => `
               <div class="stat">
                 <span class="stat-label">${s.label}</span>
                 <span class="stat-value">${s.value}</span>
               </div>
             `).join("")}
           </div>`
        : `<div class="project-spec">
             <span>${p.id} \u2014 ${p.year}</span>
             <span>${p.client}</span>
             <span>${p.role}</span>
             <span>${p.dimensions}</span>
           </div>`;

      const logoBlock = p.logoBreakdown
        ? `<div class="project-logobreak">
             <h4 class="project-block-label">Logo Breakdown</h4>
             <div class="logobreak-full">
               <img src="${p.logoBreakdown.full}" alt="${escapeAttr(p.title)} logo mark" loading="lazy">
             </div>
             <p class="project-block-text">${p.logoBreakdown.description}</p>
           </div>`
        : "";

      section.innerHTML = `
        <div class="project-rail">
          <span class="project-scale-mark">${p.scale}</span>
          ${specBlock}
          ${logoBlock}
        </div>
        <div class="project-main">
          ${heroBlock}
          <h3 class="project-title">${p.title}</h3>
          <p class="project-credits">${p.credits}</p>

          <div class="project-block">
            <h4 class="project-block-label">The Challenge</h4>
            <p class="project-block-text">${p.challenge}</p>
          </div>

          <div class="project-block">
            <h4 class="project-block-label">Design &amp; Art Direction</h4>
            <p class="project-block-text">${p.process}</p>
          </div>

          ${outcomeBlock}
          ${galleryBlock}
          ${processBlock}
        </div>
      `;
      workRoot.appendChild(section);

      if (p.brands && p.brands.length) {
        const rail = section.querySelector(".project-rail");
        rail.appendChild(buildBrandStrip(p.brands));
      }
    });
  });

  // ---- about ----
  document.getElementById("about-bio").textContent = d.bio;
  document.getElementById("about-location").textContent = d.location;

  // ---- contact ----
  if (d.status) {
    const statusEl = document.getElementById("contact-status");
    if (statusEl) statusEl.textContent = d.status;
  }

  const emailEl = document.getElementById("contact-email");
  emailEl.textContent = d.email;
  emailEl.href = "mailto:" + d.email;

  const socialList = document.getElementById("contact-social");
  d.social.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`;
    socialList.appendChild(li);
  });

  // ────────────────────────────────────────────────────────────
  // FLIPBOOK — drag left/right to turn pages like a real book.
  // Rotation tracks the pointer directly while dragging; releasing
  // past ~1/3 of the drag range commits the turn, releasing short
  // of that snaps back. Idles into a slow auto-play loop when left
  // alone, so it's never just a static image if nobody touches it,
  // but any pointer interaction takes over immediately.
  // ────────────────────────────────────────────────────────────
  function initFlipbooks(){
    const DRAG_RANGE = 220;   // px of drag for a full page turn
    const COMMIT_AT = 0.32;   // fraction of DRAG_RANGE to commit vs. snap back
    const SETTLE_MS = 260;    // commit/snap-back animation
    const AUTO_HOLD_MS = 2100;
    const AUTO_FLIP_MS = 850;
    const AUTO_RESUME_MS = 3500; // idle time before auto-play resumes after interaction
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".flipbook").forEach(book => {
      const pages = Array.from(book.querySelectorAll(".flipbook-page"));
      const N = pages.length;
      if (N < 2) return;

      if (reduced) {
        pages.forEach((p, i) => { if (i > 0) p.style.display = "none"; });
        return;
      }

      let currentIndex = 0;
      const slider = book.nextElementSibling && book.nextElementSibling.classList.contains("flipbook-slider")
        ? book.nextElementSibling : null;
      const hint = book.querySelector(".flipbook-hint");
      let hintDismissed = false;

      function dismissHint(){
        if (hintDismissed || !hint) return;
        hintDismissed = true;
        hint.classList.add("is-hidden");
      }

      function syncSlider(){
        if (slider) slider.value = String(currentIndex);
      }

      function setTransform(page, deg, animate, duration){
        if (animate) {
          page.style.transitionDuration = duration + "ms";
          page.classList.add("is-animating");
        } else {
          page.classList.remove("is-animating");
        }
        page.style.transform = "rotateY(" + deg + "deg)";
      }

      // pure function of currentIndex \u2014 safe to call any time the
      // book is at rest, including after wrapping back to page 0
      function layout(){
        pages.forEach((page, i) => {
          if (i === currentIndex) {
            page.style.zIndex = String(N + 10);
            setTransform(page, 0, false);
          } else if (i < currentIndex) {
            page.style.zIndex = String(N + 20 + i);   // most recently turned sits on top of the turned pile
            setTransform(page, -176, false);
          } else {
            page.style.zIndex = String(N - i);         // upcoming pages stacked in order beneath current
            setTransform(page, 0, false);
          }
        });
        syncSlider();
      }
      layout();

      // ---- idle auto-play ----
      let autoTimer = null, resumeTimer = null, autoRunning = false, visible = false;

      function autoFlipOnce(){
        const page = pages[currentIndex];
        setTransform(page, -176, true, AUTO_FLIP_MS);
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % N;
          layout();
        }, AUTO_FLIP_MS);
      }
      function autoLoop(){
        if (!autoRunning) return;
        autoTimer = setTimeout(() => { autoFlipOnce(); autoLoop(); }, AUTO_HOLD_MS + AUTO_FLIP_MS);
      }
      function startAuto(){
        if (autoRunning || !visible) return;
        autoRunning = true;
        autoLoop();
      }
      function stopAuto(){
        autoRunning = false;
        if (autoTimer) clearTimeout(autoTimer);
      }
      function pauseForInteraction(){
        dismissHint();
        stopAuto();
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAuto, AUTO_RESUME_MS);
      }

      if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            visible = entry.isIntersecting;
            if (visible) startAuto(); else stopAuto();
          });
        }, { threshold: 0.4 }).observe(book);
      } else {
        visible = true;
        startAuto();
      }

      // ---- slider: jumps straight to a spread, like scrubbing video ----
      if (slider) {
        slider.addEventListener("input", () => {
          pauseForInteraction();
          currentIndex = parseInt(slider.value, 10);
          layout();
        });
      }

      // ---- drag to turn ----
      let dragging = false, dragStartX = 0, dragDir = 0;

      book.addEventListener("pointerdown", (e) => {
        pauseForInteraction();
        dragging = true;
        dragDir = 0;
        dragStartX = e.clientX;
        book.classList.add("is-dragging");
        book.setPointerCapture(e.pointerId);
      });

      book.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - dragStartX;
        if (dx < 0 && currentIndex < N - 1) {
          dragDir = -1;
          const progress = Math.min(-dx / DRAG_RANGE, 1);
          setTransform(pages[currentIndex], -176 * progress, false);
        } else if (dx > 0 && currentIndex > 0) {
          dragDir = 1;
          const progress = Math.min(dx / DRAG_RANGE, 1);
          setTransform(pages[currentIndex - 1], -176 + 176 * progress, false);
        }
      });

      function endDrag(e){
        if (!dragging) return;
        dragging = false;
        book.classList.remove("is-dragging");
        const dx = e.clientX - dragStartX;

        if (dragDir === -1) {
          const progress = Math.min(-dx / DRAG_RANGE, 1);
          if (progress >= COMMIT_AT) {
            setTransform(pages[currentIndex], -176, true, SETTLE_MS);
            currentIndex++;
          } else {
            setTransform(pages[currentIndex], 0, true, SETTLE_MS);
          }
        } else if (dragDir === 1) {
          const progress = Math.min(dx / DRAG_RANGE, 1);
          if (progress >= COMMIT_AT) {
            setTransform(pages[currentIndex - 1], 0, true, SETTLE_MS);
            currentIndex--;
          } else {
            setTransform(pages[currentIndex - 1], -176, true, SETTLE_MS);
          }
        }
        setTimeout(layout, SETTLE_MS);
      }

      book.addEventListener("pointerup", endDrag);
      book.addEventListener("pointercancel", () => {
        dragging = false;
        book.classList.remove("is-dragging");
        layout();
      });
    });
  }
  initFlipbooks();

  // ---- bird picker: click a thumbnail to reveal that bird's flipbook ----
  document.querySelectorAll(".bird-picker").forEach(picker => {
    const grid = picker.querySelector(".bird-picker-grid");

    picker.querySelectorAll(".bird-thumb:not(.is-inprogress)").forEach(thumb => {
      thumb.addEventListener("click", () => {
        const id = thumb.dataset.bird;
        const viewer = picker.querySelector(`.bird-viewer[data-bird-viewer="${id}"]`);
        if (!viewer) return;
        grid.hidden = true;
        picker.querySelectorAll(".bird-viewer").forEach(v => { v.hidden = (v !== viewer); });
        viewer.hidden = false;
      });
    });

    picker.querySelectorAll(".bird-viewer-back").forEach(backBtn => {
      backBtn.addEventListener("click", () => {
        picker.querySelectorAll(".bird-viewer").forEach(v => { v.hidden = true; });
        grid.hidden = false;
      });
    });
  });

  // ────────────────────────────────────────────────────────────
  // 3D MODEL — drag to turn it and see every side, switch the stand
  // on or off, click (or tap) to open the page-flip spreads, and
  // "Back to 3D model" to return. The model file is a few MB, so it
  // only starts loading when the project is about to scroll into view.
  // If a browser can't show 3D, the poster image stands in and a
  // click still opens the book.
  // ────────────────────────────────────────────────────────────
  document.querySelectorAll("[data-model3d]").forEach(wrap => {
    const project = d.projects.find(p => p.id === wrap.dataset.model3d);
    const stage = wrap.querySelector(".model3d-stage");
    const bookView = wrap.nextElementSibling;
    const backBtn = bookView.querySelector(".model3d-back");
    const toggles = wrap.querySelectorAll("[data-stand]");
    let viewer = null;

    function openBook(){
      wrap.hidden = true;
      bookView.hidden = false;
      backBtn.focus({ preventScroll: true });
    }
    function closeBook(){
      bookView.hidden = true;
      wrap.hidden = false;
      stage.focus({ preventScroll: true });
    }
    backBtn.addEventListener("click", closeBook);

    function useFallback(){
      stage.classList.add("is-fallback");
      stage.addEventListener("click", openBook);
      stage.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(); }
      });
    }

    function start(){
      if (!window.Arsvita3D) {
        // arsvita-3d.js didn't load: show the poster and say what's missing
        useFallback();
        stage.classList.add("is-missing");
        const msg = stage.querySelector(".model3d-loading");
        if (msg) msg.textContent = "3D viewer file not found. Put arsvita-3d.js next to index.html.";
        return;
      }
      viewer = window.Arsvita3D.mount(stage, { src: project.model3d.src, onOpen: openBook });
      if (!viewer.ok) useFallback();
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(en => en.isIntersecting)) { io.disconnect(); start(); }
      }, { rootMargin: "600px 0px" });
      io.observe(stage);
    } else {
      start();
    }

    toggles.forEach(btn => {
      btn.addEventListener("click", () => {
        toggles.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
        if (viewer) viewer.setStand(btn.dataset.stand === "on");
      });
    });
  });

  // ────────────────────────────────────────────────────────────
  // SCROLL EFFECTS
  // Two restrained, purposeful effects: images resolve into focus
  // the first time they enter view, and the running head names
  // whichever project is currently in view \u2014 the same job a
  // running head does in a real book. The project rail itself
  // (in style.css) stays pinned while you scroll through a
  // project's images and text, a standard pattern in case-study
  // sites so the project's context never scrolls out of view.
  // ────────────────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    // images resolve into focus the first time they enter view
    const revealTargets = document.querySelectorAll(
      ".project-image, .project-gallery-item, .logobreak-full"
    );
    if (revealTargets.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealTargets.forEach(el => io.observe(el));
    }

    // running head names the project currently in view
    const runheadSection = document.getElementById("runhead-section");
    if (runheadSection && "IntersectionObserver" in window) {
      const sectionIo = new IntersectionObserver((entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          runheadSection.textContent = topMost.target.dataset.runheadLabel;
        } else {
          runheadSection.textContent = "portfolio";
        }
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

      document.querySelectorAll(".project").forEach(section => {
        const titleEl = section.querySelector(".project-title");
        section.dataset.runheadLabel = titleEl ? titleEl.textContent : "portfolio";
        sectionIo.observe(section);
      });
    }
  }

  // thin reading-progress line under the running head \u2014 always on,
  // even for reduced-motion users, since it's a direct 1:1 reflection
  // of scroll position rather than an independent animation
  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = pct + "%";
    };
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateProgress(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  }
})();

```

### `data.js`

```javascript
/*
  ────────────────────────────────────────────────────────────
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  You never need to touch index.html, style.css, or script.js
  for content changes.

  - Each project has FOUR possible writeup fields: "credits" (the
    opening context line — press, sponsors, launch details),
    "challenge", "process" (Design & Art Direction), and the
    optional "outcome" (what actually happened — results, press,
    what it led to). Hiring managers consistently say this is the
    part most portfolios skip. Add it whenever you have a real
    result to point to; omit the field entirely to hide the block.
  - "images" is an array of paths. The first image is the hero
    image for the project; any additional images render in a
    gallery grid below the writeup. Leave the array empty ([])
    to show a placeholder tile instead.
  - "processImages" (optional) is a second, separate gallery for
    sketches, InDesign screenshots, early drafts, laser-cutter
    files, contact sheets — anything that shows your thinking
    before the final piece. This is the single most-requested
    addition in design-hiring research: reviewers want evidence
    of process, not just polished output. Leave empty until you
    have material to add.
  - "brands" (optional) is a list of names that render as a
    crossfading black-and-white credit strip — used for Dozer's
    sponsors/press mentions. Omit or leave empty for projects
    that don't need it.
  - "scale" is the chapter number shown in the contents index and next
    to each project (e.g. "01", "02", "03"). Add projects in the order
    you want them numbered.
  - "chapters" (optional) is an ordered list of {n, title} used only by
    the contents-style rail format — pass this when a project has a
    real chapter/section structure worth showing (used by Arsvita).
  - "statGrid" (optional) is a list of {label, value} pairs rendered as
    a bordered fact-box grid in the rail instead of the plain spec list
    — use this for projects with field-guide/spec-sheet style data
    (used by The Pecking Order).
  - "logoBreakdown" (optional) shows a project's logo in the rail,
    with a written breakdown of how the mark is constructed below
    it — {full: "path/to/logo.png", description: "..."}. Use this
    for a branding project where the mark itself is worth explaining
    (used by The Pecking Order).
  - "spreads" (optional) is an ordered list of page/spread images
    that render as an auto-playing page-flip viewer instead of the
    normal hero image \u2014 use this for a project that's literally a
    printed book (used by Arsvita). Set "images" to just the cover
    for the contents-index thumbnail; "spreads" carries the full set.
  - "model3d" (optional) puts a 3D model of the finished object in
    front of the "spreads" viewer. Visitors drag it around to see every
    side, switch the stand on or off, and click it to open the
    page-flip spreads underneath. It needs arsvita-3d.js next to
    script.js, plus {src: the model file, poster: a still image shown
    while the model loads}. Used by Arsvita.
  - "birdPicker" (optional) shows a grid of clickable thumbnails
    instead of a single hero image \u2014 clicking one reveals that
    entry's own drag-to-flip spreads. Each entry is {id, name,
    status: "complete" | "in-progress", spreads: [...]}. An
    "in-progress" entry shows its thumbnail (greyed, not clickable)
    so people know it's coming without being able to open an
    unfinished flipbook. Used by The Pecking Order.
  - "contentsThumb" (optional) overrides the contents-index thumbnail
    for a project \u2014 {src, background}. Use this when the real cover
    image doesn't work as a small square crop (e.g. a logo needs to
    sit on its own brand color and show in full, not get cropped).
    Without it, the thumbnail defaults to a cover-cropped first image.
  - Top-level "status" is a one-line availability note shown near
    your contact info — edit this any time your availability changes.
  ────────────────────────────────────────────────────────────
*/

const PORTFOLIO_DATA = {
  name: "Morgan Chochinov",
  role: "Graphic & Editorial Designer",
  tagline: "Bringing experimental design into a world of corporate minimalism.",
  location: "Toronto, Canada",
  email: "morgan.chochinov@gmail.com",
  status: "Currently open to full-time and freelance editorial & graphic design roles.",
  social: [
    { label: "Behance", url: "https://www.behance.net/chochdesign" },
    { label: "Instagram", url: "https://www.instagram.com/mchochdesign/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/morganchochinov/" }
  ],

  bio: "I'm an extremely passionate designer who wants to change the way the world sees design! I get my inspiration by looking at other art forms such as music, film, fashion, architecture, etc. I find this is the best way to maximize my creativity, and it always leads to the best, most original ideas.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      client: "Dozer Magazine",
      role: "Editorial design, art direction",

      credits: "New York City launch party hosted by Paul Stuart. Sponsored by Mount Gay Rum & Dirty Water Seltzers. Product placement by L.L. Bean, G.H. Bass, and Sperry. Posted in The New York Times & WSJ.",

      challenge: "Throughout its history, \u2018prep fashion\u2019 has always had a predominantly caucasian community base which dominated the culture. This traditionally exclusive demographic was challenged through modern art direction and diverse casting practices, in an attempt to make the prep style more accessible and inclusive to everyone and not just one defined group. Although achieved, this proved to be quite difficult, as breaking and expanding barriers while simultaneously respecting and honouring style traditions can become a difficult needle to thread. All the while having to meet strict commercial print standards for an 1,000+ copy run, you can say we had our work cut out for us.",

      process: "We chose to feature models of different ethnicities, cultures and backgrounds while simultaneously placing focus on the new face of prep, \u201cPreppy Pete\u201d. Our friend Pete became known as the new face of prep below the magazine. The effort to diversify our cast of models ultimately resulted in success, as we opened the door to prep fashion to everyone and anyone who identified with the style.",

      outcome: "Issue 01 sold over a resounding 1,000 copies on debut release, and earned its placement at multiple store locations, such as Casa Magazines and Rare Magazines. A limited J.Crew collaboration run also took place, successfully selling out stock in under 10 minutes! Sales aside, the positive reception carried straight into the second issue, encouraging us to double the length (84\u2013164 pages), and continue to amass sponsor support and national press coverage in The Wall Street Journal and The New York Times.",

      dimensions: "Issue 01: 84 pages (2025) \u00b7 Issue 02: 164 pages (2026)",

      brands: [
        "The New York Times", "Wall Street Journal", "Paul Stuart",
        "L.L. Bean", "G.H. Bass", "Sperry"
      ],

      images: [
        "images/dozer-01-main.jpg",
        "images/dozer-02.jpg",
        "images/dozer-03.jpg",
        "images/dozer-04.jpg",
        "images/dozer-05.jpg",
        "images/dozer-06.jpg",
        "images/dozer-07.jpg"
      ],

      processImages: []
    },
    {
      id: "02",
      scale: "02",
      title: "Arsvita Magazine",
      year: "2026",
      client: "Arsvita Magazine",
      role: "Editorial design, self-published",

      credits: "Volume 01: Maya Civilization. A one-of-one hand-bound edition, self-published as a personal experiment in production: laser-cut acrylic casing, custom InDesign layouts, and a hand-glued binding process built entirely in-house.",

      challenge: "Translating information dense academic material on Maya art and archaeology into an engaging and exciting reading and visual experience can be quite the daunting task. On top of that, how can one condense all of the curated scholarly material into easily readable paragraphs without mashing them into a listicle format? These challenges had to be tackled with precision, alongside having to solve production problems with no pre-existing templates. The deliberate effort to laser cut acrylic to the right tolerance, bond it into a durable case with appropriate acrylic solvent, and hard binding paper pages into unconventional material not normally meant to be bound can prove difficult, but once efficiently executed and tackled, made the sweat and elbow grease well worth it.",

      process: "We\u2019ve all read your average magazine. We know the story, we understand the formula. It\u2019s predictable, for the most part. So in the spirit of ancient civilizations and the once lost artifacts and ancient archaeological history that accompanies them, why not turn that typical reading experience into that of a page-bound museum tour?! Prologue, Foundation, Stone, Ceramics, Figure, Glyphs, Epilogue. All chapters built around one class of object. \u201cArs Longa, Vita Brevis\u201d (translated: Art Is Long, Life Is Short), is the title of the manifesto which opens the issue. The premise of objects and works of art long outlasting their original creators runs course through the metaphorical veins of each page. Scholarly essays are ran in disciplined serif columns, broken up by oversized type treatments used as effective punctuation rather than average decoration. A spec-sheet catalogue treats each artifact with the exact clinical precision as your typical auction listing. The acrylic housing extends the idea into the object itself: a vitrine you hold in your hands. The reading experience is designed to pull you into the history itself, instead of just feeling like you\u2019re reading an essay for your high school history class.",

      dimensions: "46 pages \u00b7 hand-bound, laser-cut acrylic case \u00b7 one-of-one edition",

      chapters: [
        { n: "00", title: "Prologue" },
        { n: "01", title: "Foundation" },
        { n: "02", title: "Stone" },
        { n: "03", title: "Ceramics" },
        { n: "04", title: "Figure" },
        { n: "05", title: "Glyphs" },
        { n: "06", title: "Epilogue" }
      ],

      images: ["images/arsvita/spread-01.jpg"],
      processImages: [],
      model3d: {
        src: "models/arsvita-3d-model.js",
        poster: "images/arsvita/3d-poster.png"
      },
      spreads: [
        "images/arsvita/spread-01.jpg","images/arsvita/spread-02.jpg","images/arsvita/spread-03.jpg",
        "images/arsvita/spread-04.jpg","images/arsvita/spread-05.jpg","images/arsvita/spread-06.jpg",
        "images/arsvita/spread-07.jpg","images/arsvita/spread-08.jpg","images/arsvita/spread-09.jpg",
        "images/arsvita/spread-10.jpg","images/arsvita/spread-11.jpg","images/arsvita/spread-12.jpg",
        "images/arsvita/spread-13.jpg","images/arsvita/spread-14.jpg","images/arsvita/spread-15.jpg",
        "images/arsvita/spread-16.jpg","images/arsvita/spread-17.jpg","images/arsvita/spread-18.jpg",
        "images/arsvita/spread-19.jpg","images/arsvita/spread-20.jpg","images/arsvita/spread-21.jpg",
        "images/arsvita/spread-22.jpg","images/arsvita/spread-23.jpg"
      ]
    },
    {
      id: "03",
      scale: "03",
      title: "The Pecking Order Magazine",
      year: "2026\u2013present",
      client: "The Pecking Order Magazine",
      role: "Branding, editorial design",

      credits: "Issue One: The Unrefined. A branding and editorial project \u2014 identity, layout system, and five bird profiles \u2014 built to spread awareness of overlooked species and the environmental pressures they're up against.",

      challenge: "Combining field-guide styled information (such as height, wingspans, range, IUCN status) and articles on ecology, extinction and sustainability can sometimes prove difficult. Having information that usually is reserved for separate pages suddenly mashed together requires deliberate design choices and aesthetic workarounds to make sure the two registers complement instead of clash. The end goal was to ultimately include these vastly different information pieces and combine them effectively without making it feel like two entirely separate publications were stapled together.",

      process: "Each bird is meant to be displayed with a spec sheet, showing data displayed against a single saturated yellow, unifying photography pulled from a vast array of sources, all compiled into one visually cohesive system. A high contrast black and white duotone treatment is used to preserve the academic, documentary style of the imagery as a means of properly representing and reflecting the spirit of the birds that most people are convinced to find ugly. Various long form essays interrupt the organized field guide rhythm with oversized italic pull-quotes, effectively giving the writing room to argue for what some of the data can\u2019t; that species of \u201cleast concern\u201d is not the same as \u201cbeautiful\u201d.",

      dimensions: "Branding + editorial system \u00b7 in progress, started 2026",

      statGrid: [
        { label: "Format", value: "Branding + editorial" },
        { label: "Issue", value: "One: The Unrefined" },
        { label: "Profiles", value: "5 birds" },
        { label: "Status", value: "In progress" },
        { label: "Started", value: "2026" },
        { label: "Focus", value: "Ecology + awareness" }
      ],

      contentsThumb: { src: "images/logo-full.png", background: "#F8D507" },

      logoBreakdown: {
        full: "images/logo-full.png",
        description: "Designed to be instantly recognizable \u2014 a mark people connect with, not just look at. The rough, hand-cut edges are deliberate: they soften the entry point into subject matter that can otherwise feel dense or daunting, from scientific detail to tougher reads on extinction and habitat loss, so the magazine feels like something to pick up rather than brace for."
      },

      birdPicker: [
        {
          id: "marabou",
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.jpg","images/pecking-order/marabou-02.jpg",
            "images/pecking-order/marabou-03.jpg","images/pecking-order/marabou-04.jpg",
            "images/pecking-order/marabou-05.jpg","images/pecking-order/marabou-06.jpg"
          ]
        },
        {
          id: "shoebill",
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.jpg","images/pecking-order/shoebill-02.jpg",
            "images/pecking-order/shoebill-03.jpg","images/pecking-order/shoebill-04.jpg",
            "images/pecking-order/shoebill-05.jpg","images/pecking-order/shoebill-06.jpg"
          ]
        },
        {
          id: "kingvulture",
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.jpg","images/pecking-order/kingvulture-02.jpg",
            "images/pecking-order/kingvulture-03.jpg","images/pecking-order/kingvulture-04.jpg",
            "images/pecking-order/kingvulture-05.jpg"
          ]
        },
        {
          id: "hoatzin",
          name: "Hoatzin",
          status: "in-progress",
          spreads: [
            "images/pecking-order/hoatzin-01.jpg"
          ]
        }
      ],

      images: [],
      processImages: []
    }
  ]
};

```

### `arsvita-3d.js`

```javascript
/*
  ────────────────────────────────────────────────────────────
  ARSVITA 3D — draggable 3D model of the book and its acrylic stand.
  Plain WebGL 2, no libraries. The model itself lives in
  models/arsvita-3d-model.js, which this file loads only when the
  project scrolls near the viewport (it's a few MB), so the rest of
  the page never waits on it. It's loaded with a <script> tag rather
  than fetch() so the site still works when index.html is opened
  straight from disk.

  If the model file isn't at the path given in data.js, it also looks
  in a few likely places (next to index.html, inside images/) before
  giving up, and then says on the stage which file is missing.

  Used by script.js:
    Arsvita3D.mount(stageEl, { src, onOpen })  ->  { setStand(bool) }
  ────────────────────────────────────────────────────────────
*/
(function(){
  "use strict";

  // ---------- small helpers ----------
  function b64(s){
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", L = new Uint8Array(128);
    for (let i = 0; i < 64; i++) L[A.charCodeAt(i)] = i;
    let n = s.length; while (n && s[n - 1] === "=") n--;
    const o = new Uint8Array((n * 3) >> 2); let i = 0, j = 0;
    for (; i + 4 <= n; i += 4){
      const v = (L[s.charCodeAt(i)] << 18) | (L[s.charCodeAt(i + 1)] << 12) | (L[s.charCodeAt(i + 2)] << 6) | L[s.charCodeAt(i + 3)];
      o[j++] = v >> 16; o[j++] = (v >> 8) & 255; o[j++] = v & 255;
    }
    const r = n - i;
    if (r >= 2){
      const v = (L[s.charCodeAt(i)] << 18) | (L[s.charCodeAt(i + 1)] << 12) | (r === 3 ? (L[s.charCodeAt(i + 2)] << 6) : 0);
      o[j++] = v >> 16; if (r === 3) o[j++] = (v >> 8) & 255;
    }
    return o;
  }
  const V3 = {
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    norm: a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  };
  const M4 = {
    ident: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
    mul(a, b){ const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++){ let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; },
    persp(fy, asp, n, f){ const t = 1 / Math.tan(fy / 2), nf = 1 / (n - f); return new Float32Array([t / asp,0,0,0, 0,t,0,0, 0,0,(f + n) * nf,-1, 0,0,2 * f * n * nf,0]); },
    look(e, c, u){ const z = V3.norm(V3.sub(e, c)), x = V3.norm(V3.cross(u, z)), y = V3.cross(z, x);
      return new Float32Array([x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0, -V3.dot(x, e),-V3.dot(y, e),-V3.dot(z, e),1]); },
    trs(t, q, s){ const [x, y, z, w] = q, [a, b, c] = s;
      const xx = x*x, yy = y*y, zz = z*z, xy = x*y, xz = x*z, yz = y*z, wx = w*x, wy = w*y, wz = w*z;
      return new Float32Array([(1-2*(yy+zz))*a,2*(xy+wz)*a,2*(xz-wy)*a,0, 2*(xy-wz)*b,(1-2*(xx+zz))*b,2*(yz+wx)*b,0,
        2*(xz+wy)*c,2*(yz-wx)*c,(1-2*(xx+yy))*c,0, t[0],t[1],t[2],1]); },
    nrm(m){ const C = [m[5]*m[10]-m[9]*m[6], -(m[1]*m[10]-m[9]*m[2]), m[1]*m[6]-m[5]*m[2],
        -(m[4]*m[10]-m[8]*m[6]), m[0]*m[10]-m[8]*m[2], -(m[0]*m[6]-m[4]*m[2]),
        m[4]*m[9]-m[8]*m[5], -(m[0]*m[9]-m[8]*m[1]), m[0]*m[5]-m[4]*m[1]];
      const det = m[0]*C[0] + m[4]*C[1] + m[8]*C[2];
      const o = new Float32Array(9); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) o[c*3 + r] = C[r*3 + c] / det;
      return { m: o, det }; }
  };
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // the model file is a few MB, so it's only requested once, on demand.
  // If it isn't where data.js says, try the other places it tends to
  // end up after files get dragged around.
  const FILE = "arsvita-3d-model.js";
  const FALLBACK_PATHS = ["models/" + FILE, FILE, "images/" + FILE, "images/models/" + FILE,
                          "images/arsvita/" + FILE, "images/arsvita/models/" + FILE];
  function loadScript(src){
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = () => window.ARSVITA_3D_DATA ? resolve(window.ARSVITA_3D_DATA) : reject(new Error("empty"));
      s.onerror = () => { s.remove(); reject(new Error("missing")); };
      document.head.appendChild(s);
    });
  }
  let dataPromise = null;
  function loadData(src){
    if (window.ARSVITA_3D_DATA) return Promise.resolve(window.ARSVITA_3D_DATA);
    if (!dataPromise){
      const paths = [src].concat(FALLBACK_PATHS.filter(p => p !== src));
      dataPromise = paths.reduce((chain, p) => chain.catch(() => loadScript(p)), Promise.reject())
        .catch(() => { dataPromise = null; const e = new Error("missing model file"); e.missingModel = true; throw e; });
    }
    return dataPromise;
  }

  // ---------- shaders ----------
  const VS = `#version 300 es
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNrm;layout(location=2) in vec2 aUV;layout(location=3) in vec4 aTan;
uniform mat4 uModel,uVP;uniform mat3 uNM;uniform float uDet;
out vec3 vPos;out vec3 vNrm;out vec2 vUV;out vec4 vTan;
void main(){vec4 w=uModel*vec4(aPos,1.);vPos=w.xyz;vNrm=uNM*aNrm;vUV=aUV;vTan=vec4(mat3(uModel)*aTan.xyz,aTan.w*uDet);gl_Position=uVP*w;}`;
  const COMMON = `
const float PI=3.14159265;
uniform vec3 uSH[9];uniform sampler2D tEnv;uniform float uExposure;
vec3 sh9(vec3 n){return max(uSH[0]*.282095+uSH[1]*.488603*n.y+uSH[2]*.488603*n.z+uSH[3]*.488603*n.x
 +uSH[4]*1.092548*n.x*n.y+uSH[5]*1.092548*n.y*n.z+uSH[6]*.315392*(3.*n.z*n.z-1.)+uSH[7]*1.092548*n.x*n.z+uSH[8]*.546274*(n.x*n.x-n.y*n.y),vec3(0.));}
vec2 equi(vec3 d){return vec2(atan(d.x,-d.z)/(2.*PI)+.5,acos(clamp(d.y,-1.,1.))/PI);}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
vec3 toSRGB(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(vec3(.0031308),c));}`;
  const FS = `#version 300 es
precision highp float;
in vec3 vPos;in vec3 vNrm;in vec2 vUV;in vec4 vTan;
uniform vec3 uCam,uKeyDir,uKeyCol;uniform vec4 uBase;uniform float uRough,uMetal,uOcc,uNScale,uTransl,uClipY;
uniform sampler2D tBase,tMR,tOccT,tNormal;uniform int uHasBase,uHasMR,uHasOcc,uHasNormal,uBlend;
out vec4 frag;${COMMON}
void main(){
 if(vPos.y<uClipY) discard;
 vec3 N=normalize(vNrm); if(!gl_FrontFacing) N=-N;
 vec4 base=uBase; if(uHasBase==1) base*=texture(tBase,vUV);
 float rough=uRough,metal=uMetal,ao=1.;
 if(uHasMR==1){vec3 m=texture(tMR,vUV).rgb;rough*=m.g;metal*=m.b;}
 if(uHasOcc==1){ao=mix(1.,texture(tOccT,vUV).r,uOcc);}
 if(uHasNormal==1){vec3 T=vTan.xyz-N*dot(N,vTan.xyz);T=length(T)>1e-5?normalize(T):vec3(1,0,0);
   vec3 B=cross(N,T)*vTan.w;vec3 t=texture(tNormal,vUV).xyz*2.-1.;t.xy*=uNScale;N=normalize(T*t.x+B*t.y+N*t.z);}
 rough=clamp(rough,.04,1.);
 vec3 V=normalize(uCam-vPos);float NdV=max(dot(N,V),1e-4);
 vec3 F0=mix(vec3(.04),base.rgb,metal);
 vec4 q=rough*vec4(-1.,-.0275,-.572,.022)+vec4(1.,.0425,1.04,-.04);
 float a004=min(q.x*q.x,exp2(-9.28*NdV))*q.x+q.y;vec2 ab=vec2(-1.04,1.04)*a004+q.zw;
 vec3 R=reflect(-V,N);
 vec3 spec=textureLod(tEnv,equi(R),rough*5.).rgb*(F0*ab.x+ab.y);
 vec3 diff=sh9(N)*base.rgb*(1.-metal);
 if(uTransl>0.) diff=mix(diff,(sh9(N)*.6+sh9(-N)*.25+sh9(normalize(V+N))*.25)*base.rgb,uTransl);
 float so=clamp(pow(NdV+ao,exp2(-16.*rough-1.))-1.+ao,0.,1.);
 float w=uTransl>0.?.3:.04; float ndl=dot(N,uKeyDir);
 float dl=max((ndl+w)/(1.+w),0.);
 vec3 H=normalize(uKeyDir+V);float NdH=max(dot(N,H),0.),NdL=max(ndl,0.),al=rough*rough,a2=al*al;
 float Dg=a2/(PI*pow(NdH*NdH*(a2-1.)+1.,2.));float kk=al*.5;float Gv=NdV/(NdV*(1.-kk)+kk),Gl=NdL/(NdL*(1.-kk)+kk);
 vec3 Fr=F0+(1.-F0)*pow(1.-max(dot(H,V),0.),5.);
 vec3 dspec=Dg*Gv*Gl*Fr/max(4.*NdV*NdL,1e-3)*NdL;
 vec3 col=diff*ao+spec*so+uKeyCol*(base.rgb*(1.-metal)/PI*dl*mix(1.,ao,.6)+dspec*so);
 if(uBlend==1){
   float fr=pow(1.-NdV,5.);
   float a=clamp(base.a*.5+fr*.5,0.,.8);
   float back=gl_FrontFacing?1.:.45;
   vec3 c=toSRGB(aces((spec*(.8+fr*1.6)*back+diff*base.a*.5)*uExposure))*back;
   frag=vec4(c,max(a*back,max(c.r,max(c.g,c.b)))); return;}
 frag=vec4(toSRGB(aces(col*uExposure)),1.);
}`;
  const G_VS = `#version 300 es
layout(location=0) in vec3 aPos;uniform mat4 uVP;out vec3 vPos;
void main(){vPos=aPos;gl_Position=uVP*vec4(aPos,1.);}`;
  const G_FS = `#version 300 es
precision highp float;in vec3 vPos;uniform sampler2D tG0,tG1;uniform float uMix,uStr;uniform vec2 uRes;out vec4 frag;
void main(){vec2 uv=vPos.xz/.6+.5;float v=mix(texture(tG0,uv).r,texture(tG1,uv).r,uMix);
 float e=smoothstep(.5,.4,max(abs(uv.x-.5),abs(uv.y-.5)));v=mix(1.,v,e);
 float near=1.-smoothstep(.09,.22,length(vPos.xz*vec2(1.,1.6)));          // keep it a compact pool under the book
 vec2 q=gl_FragCoord.xy/uRes;
 float edge=smoothstep(0.,.12,min(q.x,1.-q.x))*smoothstep(0.,.14,min(q.y,1.-q.y));   // never reach the box edges
 frag=vec4(0.,0.,0.,(1.-v)*uStr*near*edge);}`;   // premultiplied black: darkens whatever page colour is behind

  // stage look: no background of its own. The book floats a little above
  // an invisible floor, and only its soft shadow is drawn, as a
  // see-through darkening of whatever the page colour is behind it.
  const FLOAT = 0.028;          // metres the book hovers above its shadow
  const SHADOW = 0.5;           // shadow strength, 0 = none, 1 = full
  const EXPOSURE = 1.06;
  const KEY_DIR = (() => { const a = -28 * Math.PI / 180, e = 42 * Math.PI / 180; return [Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)]; })();
  const KEY_COL = [2.3, 2.3, 2.3];   // neutral white, so the cover blue reads true
  const STAND_MS = 950;
  const HOME = { yaw: -0.52, pitch: 0.2 };

  function mount(stage, opts){
    opts = opts || {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    canvas.className = "model3d-canvas";
    canvas.setAttribute("aria-hidden", "true");
    stage.prepend(canvas);

    // transparent canvas: the page's own background shows through
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: !!opts.preserve });
    const api = { ok: !!gl, setStand(){}, render(){}, setView(){}, ready: Promise.resolve() };
    if (!gl){ stage.classList.add("is-fallback"); return api; }

    let pbr, gP, envTex, groundVAO, scene = null, dirty = true, visible = false, raf = 0;
    const gTex = [];
    const view = { yaw: HOME.yaw, pitch: HOME.pitch, fov: 26 * Math.PI / 180, target: [0, 0.106 + FLOAT * 0.55, 0] };
    let standK = 1, standTarget = 1, standFrom = 1, standT0 = 0;
    let vel = 0, lastInteract = performance.now(), drag = null;
    let W = 1, H = 1;

    function prog(vs, fs){
      const p = gl.createProgram();
      for (const [t, s] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]){
        const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
        gl.attachShader(p, sh);
      }
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      const u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++){ const a = gl.getActiveUniform(p, i); u[a.name.replace("[0]", "")] = gl.getUniformLocation(p, a.name); }
      return { p, u };
    }
    function tex2D(src, srgb, repeat){
      const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      gl.texImage2D(gl.TEXTURE_2D, 0, srgb ? gl.SRGB8_ALPHA8 : gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const w = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, w); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, w);
      const an = gl.getExtension("EXT_texture_filter_anisotropic");
      if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
      return t;
    }
    const loadImg = url => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("texture")); i.src = url; });

    async function build(DATA){
      pbr = prog(VS, FS); gP = prog(G_VS, G_FS);
      // image-based lighting: prefiltered studio environment (half floats)
      envTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, envTex); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      const eb = b64(DATA.env.env), half = new Uint16Array(eb.buffer, eb.byteOffset, eb.byteLength / 2); let off = 0;
      DATA.env.levels.forEach(([w, h], l) => { const n = w * h * 3; gl.texImage2D(gl.TEXTURE_2D, l, gl.RGB16F, w, h, 0, gl.RGB, gl.HALF_FLOAT, half.subarray(off, off + n)); off += n; });
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      DATA.shFlat = DATA.shFlat || new Float32Array(DATA.env.sh.flat());
      // baked floor shadows: [book on its own, book in its stand]
      for (const g of DATA.shadows) gTex.push(tex2D(await loadImg("data:image/png;base64," + g), false, false));
      groundVAO = gl.createVertexArray(); gl.bindVertexArray(groundVAO);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      const S = 6, Y = -0.0004;
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-S,Y,-S, S,Y,-S, S,Y,S, -S,Y,-S, S,Y,S, -S,Y,S]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0); gl.bindVertexArray(null);
      scene = await loadGLB(b64(DATA.glb).buffer);
    }

    async function loadGLB(buf){
      const dv = new DataView(buf);
      if (dv.getUint32(0, true) !== 0x46546C67) throw new Error("not a GLB");
      const jl = dv.getUint32(12, true), js = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 20, jl))), bin = 20 + jl + 8;
      const bytes = i => { const bv = js.bufferViews[i]; return new Uint8Array(buf, bin + (bv.byteOffset || 0), bv.byteLength); };
      const acc = i => { const a = js.accessors[i], bv = js.bufferViews[a.bufferView], n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type];
        const C = { 5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array }[a.componentType];
        return { arr: new C(buf, bin + (bv.byteOffset || 0) + (a.byteOffset || 0), a.count * n), n, ct: a.componentType, count: a.count }; };
      const images = await Promise.all(js.images.map(im => {
        const url = URL.createObjectURL(new Blob([bytes(im.bufferView)], { type: im.mimeType }));
        return loadImg(url).then(i => { URL.revokeObjectURL(url); return i; });
      }));
      const srgb = new Set();
      js.materials.forEach(m => { const t = m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture; if (t) srgb.add(t.index); });
      const cache = {};
      const texFor = i => { if (!(i in cache)){ const t = js.textures[i]; cache[i] = tex2D(images[t.source], srgb.has(i), (js.samplers[t.sampler || 0] || {}).wrapS === 10497); } return cache[i]; };
      const mats = js.materials.map(m => { const p = m.pbrMetallicRoughness || {}; return {
        base: p.baseColorFactor || [1, 1, 1, 1], rough: p.roughnessFactor ?? 1, metal: p.metallicFactor ?? 1,
        tBase: p.baseColorTexture ? texFor(p.baseColorTexture.index) : null,
        tMR: p.metallicRoughnessTexture ? texFor(p.metallicRoughnessTexture.index) : null,
        tOcc: m.occlusionTexture ? texFor(m.occlusionTexture.index) : null, occ: m.occlusionTexture ? (m.occlusionTexture.strength ?? 1) : 0,
        tN: m.normalTexture ? texFor(m.normalTexture.index) : null, nScale: m.normalTexture ? (m.normalTexture.scale ?? 1) : 1,
        blend: m.alphaMode === "BLEND", double: !!m.doubleSided, transl: /Frosted/.test(m.name || "") ? 0.45 : 0 }; });
      const meshes = js.meshes.map(me => me.primitives.map(pr => {
        const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
        [["POSITION", 0], ["NORMAL", 1], ["TEXCOORD_0", 2], ["TANGENT", 3]].forEach(([k, loc]) => {
          if (pr.attributes[k] === undefined){ if (loc === 3) gl.vertexAttrib4f(3, 1, 0, 0, 1); return; }
          const a = acc(pr.attributes[k]); gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, a.arr, gl.STATIC_DRAW);
          gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, a.n, gl.FLOAT, false, 0, 0);
        });
        const ia = acc(pr.indices); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ia.arr, gl.STATIC_DRAW);
        gl.bindVertexArray(null);
        return { vao, count: ia.count, type: ia.ct === 5125 ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT, mat: mats[pr.material] };
      }));
      const nodes = js.nodes.map(n => ({ name: n.name, mesh: n.mesh, children: n.children || [], t: n.translation || [0, 0, 0], r: n.rotation || [0, 0, 0, 1], s: n.scale || [1, 1, 1] }));
      const byName = {}; nodes.forEach(n => byName[n.name] = n);
      return { meshes, nodes, byName, roots: js.scenes[js.scene || 0].nodes };
    }

    // ---------- drawing ----------
    function resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(stage.clientWidth * dpr)), h = Math.max(1, Math.round(stage.clientHeight * dpr));
      if (w !== canvas.width || h !== canvas.height){ canvas.width = w; canvas.height = h; dirty = true; }
      W = w; H = h;
    }
    function camera(){
      const asp = W / H, tv = Math.tan(view.fov / 2), th = tv * asp;
      const d = Math.max(0.168 / tv, 0.114 / th), cp = Math.cos(view.pitch);
      const eye = [view.target[0] + d * Math.sin(view.yaw) * cp, view.target[1] + d * Math.sin(view.pitch), view.target[2] + d * Math.cos(view.yaw) * cp];
      return { eye, vp: M4.mul(M4.persp(view.fov, asp, 0.02, 30), M4.look(eye, view.target, [0, 1, 0])) };
    }
    function drawPrim(pr, model, passCull){
      const m = pr.mat, u = pbr.u, nm = M4.nrm(model);
      gl.uniformMatrix4fv(u.uModel, false, model); gl.uniformMatrix3fv(u.uNM, false, nm.m); gl.uniform1f(u.uDet, nm.det < 0 ? -1 : 1);
      gl.frontFace(nm.det < 0 ? gl.CW : gl.CCW);
      gl.uniform4fv(u.uBase, m.base); gl.uniform1f(u.uRough, m.rough); gl.uniform1f(u.uMetal, m.metal); gl.uniform1f(u.uOcc, m.occ);
      gl.uniform1f(u.uNScale, m.nScale); gl.uniform1f(u.uTransl, m.transl); gl.uniform1i(u.uBlend, m.blend ? 1 : 0);
      const bind = (unit, t, flag, name) => { gl.uniform1i(u[flag], t ? 1 : 0); if (t){ gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(u[name], unit); } };
      bind(1, m.tBase, "uHasBase", "tBase"); bind(2, m.tMR, "uHasMR", "tMR"); bind(3, m.tOcc, "uHasOcc", "tOccT"); bind(4, m.tN, "uHasNormal", "tNormal");
      if (m.double && !passCull) gl.disable(gl.CULL_FACE); else { gl.enable(gl.CULL_FACE); gl.cullFace(passCull || gl.BACK); }
      gl.bindVertexArray(pr.vao); gl.drawElements(gl.TRIANGLES, pr.count, pr.type, 0);
    }
    function render(){
      resize(); if (!scene || W < 2 || H < 2) return;
      gl.viewport(0, 0, W, H); const cam = camera(), k = ease(standK);
      gl.clearColor(0, 0, 0, 0); gl.depthMask(true);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);   // floor shadow only
      gl.useProgram(gP.p); gl.uniformMatrix4fv(gP.u.uVP, false, cam.vp);
      gl.uniform1f(gP.u.uStr, SHADOW); gl.uniform1f(gP.u.uMix, k); gl.uniform2f(gP.u.uRes, W, H);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, gTex[0]); gl.uniform1i(gP.u.tG0, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, gTex[1]); gl.uniform1i(gP.u.tG1, 1);
      gl.bindVertexArray(groundVAO); gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.useProgram(pbr.p); const u = pbr.u;
      gl.uniformMatrix4fv(u.uVP, false, cam.vp); gl.uniform3fv(u.uCam, cam.eye);
      gl.uniform3fv(u.uSH, window.ARSVITA_3D_DATA.shFlat); gl.uniform1f(u.uExposure, EXPOSURE);
      gl.uniform3fv(u.uKeyDir, KEY_DIR); gl.uniform3fv(u.uKeyCol, KEY_COL);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, envTex); gl.uniform1i(u.tEnv, 0);
      const book = scene.byName.Book, st = scene.byName.Case;
      if (book) book.t = [0, FLOAT + 0.004 * k, 0];               // book rests on the stand's base plate
      if (st) st.t = [0, FLOAT - (0.19 + FLOAT) * (1 - k), 0];   // stand sinks away through the floor when hidden
      const opaque = [], trans = [];
      const walk = (i, parent, inStand) => { const n = scene.nodes[i]; const m = M4.mul(parent, M4.trs(n.t, n.r, n.s)); const c = inStand || n === st;
        if (c && k <= 0.001) return;
        if (n.mesh !== undefined) scene.meshes[n.mesh].forEach(pr => (pr.mat.blend ? trans : opaque).push([pr, m, c]));
        n.children.forEach(ch => walk(ch, m, c)); };
      scene.roots.forEach(r => walk(r, M4.ident(), false));
      gl.disable(gl.BLEND); gl.depthMask(true);
      for (const [pr, m, c] of opaque){ gl.uniform1f(u.uClipY, c && k < 0.999 ? 0 : -10); drawPrim(pr, m); }
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
      for (const pass of [gl.FRONT, gl.BACK]) for (const [pr, m, c] of trans){ gl.uniform1f(u.uClipY, c && k < 0.999 ? 0 : -10); drawPrim(pr, m, pass); }
      gl.depthMask(true); gl.disable(gl.BLEND); gl.frontFace(gl.CCW); gl.bindVertexArray(null);
    }

    // ---------- loop: only runs while the stage is on screen ----------
    let lastT = performance.now();
    function frame(now){
      raf = 0; if (!visible) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      if (!scene) return;
      if (standK !== standTarget){ const t = Math.min(1, (now - standT0) / STAND_MS); standK = standFrom + (standTarget - standFrom) * t; if (t >= 1) standK = standTarget; dirty = true; }
      if (!drag && Math.abs(vel) > 1e-4){ view.yaw += vel; vel *= 0.87; dirty = true; }
      if (!reduced && !drag && !opts.still && now - lastInteract > 4500){ const ramp = Math.min(1, (now - lastInteract - 4500) / 2500); view.yaw += dt * 0.18 * ramp; dirty = true; }
      resize(); if (dirty){ render(); dirty = false; }
    }
    function wake(){ if (visible && !raf){ lastT = performance.now(); raf = requestAnimationFrame(frame); } }
    if ("IntersectionObserver" in window){
      new IntersectionObserver(es => { es.forEach(e => { visible = e.isIntersecting; }); if (visible){ dirty = true; wake(); } }, { threshold: 0.05 }).observe(stage);
    } else { visible = true; }
    if ("ResizeObserver" in window) new ResizeObserver(() => { dirty = true; wake(); }).observe(stage);

    // ---------- drag to turn, click / tap to open ----------
    // Mouse: drag turns it in any direction. Touch: sideways drags turn
    // it while up/down swipes still scroll the page (touch-action: pan-y).
    const hint = stage.querySelector(".model3d-hint");
    function touched(){ lastInteract = performance.now(); if (hint) hint.classList.add("is-hidden"); }
    stage.addEventListener("pointerdown", e => {
      if (e.button > 0) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: 0, touch: e.pointerType !== "mouse" };
      vel = 0; lastInteract = performance.now();
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    });
    stage.addEventListener("pointermove", e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.x = e.clientX; drag.y = e.clientY;
      drag.moved = Math.max(drag.moved, Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy));
      if (drag.moved < 6) return;
      stage.classList.add("is-dragging");
      view.yaw -= dx * 0.0085; vel = -dx * 0.0085 * 0.55;
      if (!drag.touch) view.pitch = Math.max(0.02, Math.min(1.2, view.pitch + dy * 0.0062));
      touched(); dirty = true; wake();
    });
    function endDrag(e, cancelled){
      if (!drag || e.pointerId !== drag.id) return;
      const wasClick = !cancelled && drag.moved < 6 && performance.now() - drag.t < 600;
      drag = null; stage.classList.remove("is-dragging");
      if (wasClick && opts.onOpen) opts.onOpen();
    }
    stage.addEventListener("pointerup", e => endDrag(e, false));
    stage.addEventListener("pointercancel", e => endDrag(e, true));
    stage.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); if (opts.onOpen) opts.onOpen(); return; }
      let used = true;
      if (e.key === "ArrowLeft") view.yaw += 0.2; else if (e.key === "ArrowRight") view.yaw -= 0.2;
      else if (e.key === "ArrowUp") view.pitch = Math.min(1.2, view.pitch + 0.1); else if (e.key === "ArrowDown") view.pitch = Math.max(0.02, view.pitch - 0.1);
      else used = false;
      if (used){ e.preventDefault(); touched(); dirty = true; wake(); }
    });

    api.setStand = on => {
      standTarget = on ? 1 : 0;
      if (reduced || opts.still){ standK = standTarget; standFrom = standTarget; } else { standFrom = standK; standT0 = performance.now(); }
      dirty = true; wake();
    };
    api.render = () => { render(); };
    api.setView = (yaw, pitch) => { view.yaw = yaw; view.pitch = pitch; dirty = true; wake(); };
    api.ready = loadData(opts.src).then(build).then(() => {
      stage.classList.add("is-ready"); dirty = true; wake();
    }).catch(err => {
      console.warn("Arsvita 3D:", err); stage.classList.add("is-fallback");
      if (err && err.missingModel){
        stage.classList.add("is-missing");
        const msg = stage.querySelector(".model3d-loading");
        if (msg) msg.textContent = "3D model file not found. Put " + FILE + " in a folder called \u201cmodels\u201d next to index.html.";
      }
    });
    canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); stage.classList.add("is-fallback"); });
    return api;
  }

  window.Arsvita3D = { mount };
})();

```

## Images

All images referenced below live in the `images/` folder alongside this README, so they'll render inline if you're viewing this on GitHub or any Markdown viewer that resolves relative paths.

### Dozer Magazine

![dozer-01-main.jpg](images/dozer-01-main.jpg)
![dozer-02.jpg](images/dozer-02.jpg)
![dozer-03.jpg](images/dozer-03.jpg)
![dozer-04.jpg](images/dozer-04.jpg)

![dozer-05.jpg](images/dozer-05.jpg)
![dozer-06.jpg](images/dozer-06.jpg)
![dozer-07.jpg](images/dozer-07.jpg)

### The Pecking Order — logo

![logo-full.png](images/logo-full.png)

### Arsvita Magazine — 3D model poster

![3d-poster.png](images/arsvita/3d-poster.png)

### Arsvita Magazine — all 23 spreads

![spread-01.jpg](images/arsvita/spread-01.jpg)
![spread-02.jpg](images/arsvita/spread-02.jpg)
![spread-03.jpg](images/arsvita/spread-03.jpg)
![spread-04.jpg](images/arsvita/spread-04.jpg)

![spread-05.jpg](images/arsvita/spread-05.jpg)
![spread-06.jpg](images/arsvita/spread-06.jpg)
![spread-07.jpg](images/arsvita/spread-07.jpg)
![spread-08.jpg](images/arsvita/spread-08.jpg)

![spread-09.jpg](images/arsvita/spread-09.jpg)
![spread-10.jpg](images/arsvita/spread-10.jpg)
![spread-11.jpg](images/arsvita/spread-11.jpg)
![spread-12.jpg](images/arsvita/spread-12.jpg)

![spread-13.jpg](images/arsvita/spread-13.jpg)
![spread-14.jpg](images/arsvita/spread-14.jpg)
![spread-15.jpg](images/arsvita/spread-15.jpg)
![spread-16.jpg](images/arsvita/spread-16.jpg)

![spread-17.jpg](images/arsvita/spread-17.jpg)
![spread-18.jpg](images/arsvita/spread-18.jpg)
![spread-19.jpg](images/arsvita/spread-19.jpg)
![spread-20.jpg](images/arsvita/spread-20.jpg)

![spread-21.jpg](images/arsvita/spread-21.jpg)
![spread-22.jpg](images/arsvita/spread-22.jpg)
![spread-23.jpg](images/arsvita/spread-23.jpg)

### The Pecking Order — Marabou Stork

![marabou-01.jpg](images/pecking-order/marabou-01.jpg)
![marabou-02.jpg](images/pecking-order/marabou-02.jpg)
![marabou-03.jpg](images/pecking-order/marabou-03.jpg)
![marabou-04.jpg](images/pecking-order/marabou-04.jpg)

![marabou-05.jpg](images/pecking-order/marabou-05.jpg)
![marabou-06.jpg](images/pecking-order/marabou-06.jpg)

### The Pecking Order — Shoebill

![shoebill-01.jpg](images/pecking-order/shoebill-01.jpg)
![shoebill-02.jpg](images/pecking-order/shoebill-02.jpg)
![shoebill-03.jpg](images/pecking-order/shoebill-03.jpg)
![shoebill-04.jpg](images/pecking-order/shoebill-04.jpg)

![shoebill-05.jpg](images/pecking-order/shoebill-05.jpg)
![shoebill-06.jpg](images/pecking-order/shoebill-06.jpg)

### The Pecking Order — King Vulture

![kingvulture-01.jpg](images/pecking-order/kingvulture-01.jpg)
![kingvulture-02.jpg](images/pecking-order/kingvulture-02.jpg)
![kingvulture-03.jpg](images/pecking-order/kingvulture-03.jpg)
![kingvulture-04.jpg](images/pecking-order/kingvulture-04.jpg)

![kingvulture-05.jpg](images/pecking-order/kingvulture-05.jpg)

### The Pecking Order — Hoatzin (in progress)

![hoatzin-01.jpg](images/pecking-order/hoatzin-01.jpg)

