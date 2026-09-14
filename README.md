# Morgan Chochinov — Portfolio Site

A static portfolio website built around a single design concept: the book *S, M, L, XL* by Rem Koolhaas and Bruce Mau. The site treats itself like a printed book — a running head, a contents index with dot leaders, numbered chapters instead of a nav menu, and a spec-sheet rail alongside each project's write-up.

No build step, no framework, no dependencies beyond two Google Fonts. Everything renders from a single data file.

## How to use this

Open `index.html` in a browser — that's it, it runs locally with no server needed. To host it, upload all four files plus the `images/` folder to any static host (Netlify, GitHub Pages, Vercel, etc.) keeping the folder structure intact.

**To update content, only edit `data.js`.** It's fully commented — name, bio, contact info, and every project's copy, images, and layout options live there. You should never need to touch `index.html`, `style.css`, or `script.js` for a content change.

## File structure

```
.
├── index.html          Page shell / structure
├── style.css            All visual styling, design tokens at the top
├── script.js             Renders everything from data.js into the page
├── data.js               ALL editable content — start here
├── README.md            This file
└── images/
    ├── dozer-*.jpg              7 photos — Dozer Magazine
    ├── logo-full.png            The Pecking Order logo mark
    ├── arsvita/
    │   └── spread-01.jpg … spread-23.jpg    Full page-flip book (23 spreads)
    └── pecking-order/
        └── marabou-*.jpg (6), shoebill-*.jpg (6),
            kingvulture-*.jpg (5), hoatzin-01.jpg (1)
```

## Design system quick reference

- **Palette:** paper `#F0EFE9`, ink `#121212`, grey `#6E6D67`, line `#C7C5BB` — all defined as CSS custom properties at the top of `style.css`.
- **Type:** Archivo (display/body), IBM Plex Mono (labels, data, captions).
- **Chapter numbering:** projects are numbered 01/02/03 in the order they appear in the `projects` array in `data.js`.
- **Per-project format variation:** each project can opt into different rail formats and hero treatments via optional fields in `data.js` — a plain spec list, a chapter index (`chapters`), a fact-box grid (`statGrid`), a logo breakdown (`logoBreakdown`), a single hero image (`images`), a full page-flip viewer (`spreads`), or a click-to-pick set of mini flipbooks (`birdPicker`). All of these are documented in the comment block at the top of `data.js`.

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

  bio: "I'm an extremely passionate designer who wants to change the way the world see's design!, I get my inspiration by looking at other art forms such as (music, film, fashion, architecture, etc). I find this is the best way to maximize my creativity, and always leads to the best most original ideas.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      client: "Dozer Magazine",
      role: "Editorial design, art direction",

      credits: "New York City launch party hosted by Paul Stuart. Sponsored by Mount Gay Rum & Dirty Water Seltzers. Product placement by L.L. Bean, G.H. Bass, and Sperry. Posted in The New York Times & WSJ.",

      challenge: "Launching a definitive print issue for a traditional, historically exclusive fashion archetype while deliberately subverting its predominantly white culture through diverse casting and modern art direction — all while meeting strict commercial print standards for a 1,000+ copy run.",

      process: "From a design and art direction standpoint, we chose to feature models of different ethnicities and backgrounds, while placing the focus on a man named \u201cPreppy Pete\u201d who became known as the new face of prep below the magazine. This was a significant success, as prep has historically been predominantly white culture.",

      outcome: "Issue 01 sold over 1,000 copies and earned placement at Casa Magazines and Rare Magazines, plus a limited J.Crew collaboration run that sold out in under 10 minutes. The reception carried straight into a second issue nearly double the length (84 \u2192 164 pages), with continued sponsor support and national press coverage in The New York Times and The Wall Street Journal.",

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

      challenge: "Making dense academic material on Maya art and archaeology feel discovered rather than assigned, without flattening the scholarship into a listicle — while solving a production problem with no existing template: laser-cutting acrylic to the right tolerance, bonding it into a durable case with acrylic solvent, and hand-binding paper pages into a material that was never meant to be bound.",

      process: "The issue is structured like a museum visit rather than a magazine: Prologue, Foundation, Stone, Ceramics, Figure, Glyphs, Epilogue, each a chapter built around one class of object. The manifesto that opens the issue \u2014 ars longa, vita brevis, \u201cart is long, life is short\u201d \u2014 sets the premise that carries through every section: these are objects built to outlast their makers. Scholarly essays run in a disciplined serif column, broken up by oversized type treatments used as punctuation rather than decoration, and a spec-sheet catalogue treats each artifact with the same clinical precision as an auction listing. The acrylic housing extends that idea into the object itself: a vitrine you hold in your hands.",

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

      challenge: "Bridging two registers that usually don't share a page: field-guide precision (height, wingspan, range, IUCN status) and first-person essay writing on ecology, extinction, and what it means for a species to thrive because of human damage rather than in spite of it \u2014 without the magazine feeling like two different publications stapled together.",

      process: "Each bird gets a spec sheet \u2014 the same clinical data format used for the King Vulture, Shoebill, and Marabou Stork \u2014 set against a single saturated yellow that unifies photography pulled from very different sources into one visual system. A high-contrast black-and-white duotone treatment keeps the imagery documentary rather than pretty, appropriate for birds most people are taught to find ugly. Long-form essays interrupt the field-guide rhythm with oversized italic pull-quotes, giving the writing room to argue for what the data can't: that \u201cleast concern\u201d is not the same as beautiful.",

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
        description: "The mark is built the way you'd assemble a paper cutout bird: five flat silhouette pieces \u2014 a beak-and-eye profile, a raised wing, a smaller mirrored wing standing in for a foot, and two bent legs \u2014 arranged around the wordmark, which sits in the negative space at the center and doubles as the bird's body. That cutout construction is doing double duty: built from toy-like pieces, it reads as a character rather than a corporate crest, because the goal was something people could actually love and root for \u2014 a mascot, not a masthead. Birds deserve that kind of affection as much as anything else does. The illustration is left rough \u2014 torn, hand-cut edges instead of clean vector lines \u2014 because people often assume a book on an unfamiliar scientific subject isn't meant for them; the texture signals something to pick up, not a textbook to feel intimidated by. The wordmark pushes against that looseness in Compagnon, a uniform, professional typeface chosen for the opposite reason: the research inside is serious and deserves to read that way, so the type carries the credibility while the illustration keeps the affection and the invitation open."
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

