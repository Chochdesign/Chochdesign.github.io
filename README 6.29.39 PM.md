# Morgan Chochinov — Portfolio Site

A static portfolio website built around a single design concept: the book *S, M, L, XL* by Rem Koolhaas and Bruce Mau. The site treats itself like a printed book: a running head, numbered chapters, and one consistent sidebar alongside each project's work. It opens with the name typing itself out, then every photo from every project sliding past underneath, sized so the first project already shows on the first screen.

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
    │   ├── 3d-poster.webp                   Still of the 3D model (transparent), shown while it loads
    │   └── spread-01.jpg … spread-23.jpg    All 23 spreads
    └── pecking-order/
        └── marabou-*.jpg (6), shoebill-*.jpg (6),
            kingvulture-*.jpg (5), hoatzin-01.jpg (1)
```

## Design system quick reference

- **Palette:** paper `#F0EFE9`, ink `#121212`, grey `#6E6D67`, line `#C7C5BB` — all defined as CSS custom properties at the top of `style.css`.
- **Type:** Bricolage Grotesque for everything you read, from the heavy condensed capitals of the name, numbers and project names down to body text. Geist Mono for small labels, info lines and buttons. Every piece of text uses one of six roles, defined once at the top of `style.css`: display, lede, body, label, meta, button.
- **Chapter numbering:** projects are numbered 01/02/03 in the order they appear in the `projects` array in `data.js`.
- **One grid everywhere:** every project, About and Contact use the same two columns: a sidebar (a quarter of the width) for the text and the work (three quarters) as big as it can be. The opening screen's tagline and index line up with the same columns. On phones everything stacks and the imagery runs edge to edge, and each project runs number and name, then its main visual, then its text, then the rest of the work.
- **One sidebar format:** number, name, small info (year, role, specs), a one- or two-sentence summary, then Challenge / Approach / Outcome, then an optional detail block. On wide screens the sidebar stays beside the work while you scroll; if it's taller than the window, it scrolls until its last line is showing and stays there.
- **Imagery is never cropped, boxed or stretched.** Dozer's images stack one under another at the full width of the work column. The spreads show whole. The opening strip shows every image at its own shape.
- **Motion:** every slide on the site uses the same curve as After Effects' Easy Ease. Nothing fades in. The strip, the 3D model and both sets of spreads move on their own, and each has a Pause button (an accessibility requirement for anything that moves for more than 5 seconds). With "reduce motion" turned on in the device's settings, none of them move by themselves.
- All of the content options are documented in the comment block at the top of `data.js`.

## The opening screen

Your name types itself out across the full width of the page (it's sized to fit exactly, on any screen). Then the work slides in from the right: every photo from every project, in order (all of Dozer, then Arsvita's spreads, then The Pecking Order's finished birds), each at its own shape, in a gentle rhythm of sizes. It slides along to the next image every 1.5 seconds (change `STRIP_SLIDE_MS` and `STRIP_HOLD_MS` near the top of the strip code in `script.js` to adjust), loops back to the start seamlessly, and can be dragged or swiped. It keeps going round on its own; Pause stops it. Any image that can't be found is simply left out. Each image is captioned with its project and links to it, and the matching project lights up in the index underneath. The whole opening screen is kept shorter than the window so the start of project 01 is always visible below it.

It builds itself from the images in `data.js`, so it stays up to date as you add or remove work. To show a hand-picked set instead, add a `reel` list (see the notes at the top of `data.js`).

## The 3D model (Arsvita)

Arsvita opens on a 3D model of the book in its laser-cut acrylic stand, floating on the page with no floor or shadow. The 3D area is transparent, so the model sits straight on the page's own background colour (and stays matched if you change `--paper` in `style.css`). The cover is colour-matched to the printed blue, `#7FBFE9`.

The model turns slowly on its own, and every 5 seconds the stand fades away and comes back. There are no stand buttons. Visitors can drag it to turn it themselves (that holds the automatic movement until it's left alone again), and Pause stops all of its movement. The spreads sit directly underneath.

**Where the files go** (paths are relative to `index.html`):

```
index.html
arsvita-3d.js                   next to index.html, not inside images/
models/arsvita-3d-model.js      in a folder called models
images/arsvita/3d-poster.webp   with the Arsvita spreads
```

- It's switched on by the `model3d` field on the Arsvita project in `data.js`. Delete that field and the project shows just the spreads. If you move the model or the poster, update the two paths there.
- If the model file isn't where `data.js` says, the viewer also checks next to `index.html`, `images/` and `images/arsvita/` before giving up. If it still can't find it, or `arsvita-3d.js` itself is missing, the stage shows the poster plus a short note naming the missing file.
- `arsvita-3d.js` is the viewer: plain WebGL 2, no libraries. `models/arsvita-3d-model.js` holds the model itself, with its textures at full resolution so the cover stays sharp (about 5 MB). It only starts downloading when the project is about to scroll into view.
- It's loaded with a `<script>` tag rather than `fetch()`, so it works when you open `index.html` straight from disk as well as when hosted.
- On phones, sideways swipes turn the model and up/down swipes still scroll the page. Anyone whose browser can't show 3D sees the poster instead.
- Timing settings live near the top of `arsvita-3d.js`: `STAND_EVERY_MS` (time between stand changes) and `STAND_MS` (how long the fade takes).

## The spreads

Arsvita and The Pecking Order show their spreads the same way: one at a time, sliding to the next. There are several ways to move through them, so nobody has to guess: drag or swipe, click the left or right half, use **Previous** / **Next** (or the arrow keys), or drag the bar underneath. The count between the buttons says where you are: "Spread 3 of 23", or for the birds "Shoebill, spread 2 of 6". Left alone, the spreads slide on by themselves (hovering holds them, Pause stops them), and after the last one they carry on to the first without jumping back.

The Pecking Order runs through every bird in a row (the `birds` list in `data.js`). A bird with `status: "in-progress"`, currently the Hoatzin, is greyed out and labelled "Work in progress", and it's left out of the opening strip. When it's finished, change its status to `"complete"` and add its spreads.

## Images

Export images at least 2400px wide (spreads included). Everything is shown much larger now, and on high-resolution screens anything smaller will look soft. Nothing on the site is cropped, so you can export at each image's natural shape.

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
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<a class="skip-link" href="#work">Skip to the work</a>

<!-- running head, like a book's: names the section you're in -->
<div class="runhead" aria-hidden="true">
  <span id="runhead-name"></span>
  <span class="runhead-mid">/</span>
  <span id="runhead-section">Portfolio</span>
  <span class="runhead-progress-track"><span id="scroll-progress" class="runhead-progress-fill"></span></span>
</div>

<!-- HERO: your name types itself out across the page, then the work
     slides in underneath it: every image from every project, in order,
     each at its own shape and size, sliding along to the next one.
     Kept shorter than the screen so the first project shows below. -->
<header class="hero" id="top">
  <div class="hero-top">
    <nav class="hero-nav" aria-label="Sections">
      <a href="#work">Work</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
    <p class="hero-role"><span id="hero-role"></span>, <span id="hero-location"></span></p>
  </div>

  <h1 class="hero-name">
    <span class="sr-only" id="hero-name"></span>
    <span class="type" aria-hidden="true">
      <span class="type-ghost" id="type-ghost"></span>
      <span class="type-live" id="type-live"></span>
    </span>
  </h1>

  <div class="strip" id="strip" role="region" aria-roledescription="carousel" aria-label="Work from every project, in order">
    <div class="strip-track" id="strip-track"></div>
  </div>

  <div class="hero-sub">
    <p id="hero-tagline" class="hero-tagline"></p>
    <div class="hero-index-wrap">
      <ol id="hero-index" class="hero-index" aria-label="Projects"></ol>
      <button type="button" class="ctl-btn" id="strip-pause" aria-pressed="false">Pause</button>
    </div>
  </div>
</header>

<main>

  <section id="work" class="work" aria-label="Work">
    <div id="work-sections"></div>
  </section>

  <section id="about" class="section section--text" aria-labelledby="about-title">
    <div class="rail">
      <div class="rail-head">
        <span class="rail-num">04</span>
        <h2 class="rail-name" id="about-title">About</h2>
        <ul class="rail-facts">
          <li id="about-location"></li>
          <li>Identity, print and systems work</li>
        </ul>
      </div>
    </div>
    <div class="section-main">
      <p id="about-bio" class="section-lede"></p>
    </div>
  </section>

  <section id="contact" class="section section--text" aria-labelledby="contact-title">
    <div class="rail">
      <div class="rail-head">
        <span class="rail-num">05</span>
        <h2 class="rail-name" id="contact-title">Contact</h2>
        <ul class="rail-facts">
          <li id="contact-status"></li>
        </ul>
      </div>
    </div>
    <div class="section-main">
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

  /* one family for everything you read, one mono for small info */
  --f-display: "Bricolage Grotesque", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --f-text: "Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif;
  --f-mono: "Geist Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace;

  --gutter: clamp(1rem, 2.2vw, 2rem);
  --runhead-h: 2rem;
  --tap: 2.75rem;                /* 44px minimum touch target */

  /* motion: the same curve as After Effects' Easy Ease, everywhere */
  --easy: cubic-bezier(0.33, 0, 0.67, 1);

  /* the grid: sidebar (text) + main (the work) */
  --col-rail: minmax(17.5rem, 1fr);
  --col-main: minmax(0, 3fr);
}

*{ box-sizing: border-box; }
html{ scroll-behavior: smooth; scroll-padding-top: var(--runhead-h); }
@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior: auto; }
  *, *::before, *::after{ animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; transition-delay: 0s !important; }
}
body{
  margin: 0;
  padding-bottom: 3.25rem;       /* room for the back-to-top bar */
  background: var(--paper);
  color: var(--ink);
  font-family: var(--f-text);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
  font-optical-sizing: auto;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
img{ max-width: 100%; }
a{ color: inherit; }
a:focus-visible, button:focus-visible, input:focus-visible, [tabindex]:focus-visible{
  outline: 3px solid var(--ink);
  outline-offset: 3px;
}
[data-pointer]:focus-visible{ outline: none; }
h1, h2, h3, p, ol, ul, figure{ margin: 0; }
.sr-only{
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
.skip-link{
  position: absolute; left: var(--gutter); top: -4rem; z-index: 100;
  background: var(--ink); color: var(--paper); padding: 0.6rem 0.9rem;
}
.skip-link:focus{ top: 0.5rem; }

/* ────────────────────────────────────────────────────────────
   TYPE ROLES: every piece of text on the site is one of these
   ──────────────────────────────────────────────────────────── */
/* 1. display: your name, section numbers, project names */
.hero-name, .rail-num, .rail-name, .hero-index-num, .switcher{
  font-family: var(--f-display);
  font-weight: 800;
  font-stretch: 75%;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
/* 2. lede: tagline, summaries, about */
.hero-tagline, .rail-summary, .section-lede, .book-how{
  font-family: var(--f-text);
  font-weight: 500;
  letter-spacing: -0.005em;
}
/* 3. body: everything else you read */
.rail-block p, .rail-detail p{
  font-family: var(--f-text);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.55;
}
/* 4. label: small headings, nav, buttons */
.rail-label, .book-label, .hero-nav a, .ctl-btn, .wip-badge, .backtotop a, .skip-link{
  font-family: var(--f-mono);
  font-weight: 500;
  font-size: 0.72rem;
  line-height: 1.2;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
/* 5. meta: small info lines, counters, captions */
.rail-facts, .hero-role, .hero-index-year, .strip-cap, .book-count, .model3d-note,
.runhead, .contact-social, .model3d-loading, .slider-hint, .model3d-hint{
  font-family: var(--f-mono);
  font-weight: 400;
  font-size: 0.78rem;
  line-height: 1.45;
  letter-spacing: 0;
}

/* ────────────────────────────────────────────────────────────
   RUNNING HEAD
   ──────────────────────────────────────────────────────────── */
.runhead{
  position: sticky; top: 0; z-index: 20;
  display: flex; gap: 0.6em; align-items: center;
  height: var(--runhead-h);
  padding: 0 var(--gutter);
  font-size: 0.72rem;
  background: var(--paper);
  color: var(--grey);
  white-space: nowrap; overflow: hidden;
}
.runhead-mid{ opacity: 0.6; }
.runhead-progress-track{ position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--line); }
.runhead-progress-fill{ display: block; height: 100%; width: 0%; background: var(--ink); }

/* ────────────────────────────────────────────────────────────
   SHARED CONTROLS
   ──────────────────────────────────────────────────────────── */
.ctl-btn{
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5em;
  min-height: var(--tap);
  padding: 0 1.05rem;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--ink);
  border-radius: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.35s var(--easy), color 0.35s var(--easy);
}
.ctl-btn:hover:not(:disabled),
.ctl-btn[aria-pressed="true"]{ background: var(--ink); color: var(--paper); }
.controls{ display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.75rem; }

/* ────────────────────────────────────────────────────────────
   HERO: your name types itself out, then the work slides in
   ──────────────────────────────────────────────────────────── */
.hero{ padding: 0 var(--gutter); border-bottom: 1px solid var(--line); }
.hero-top{
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 0 1.5rem;
}
.hero-nav{ display: flex; gap: 1.6rem; }
.hero-nav a{
  display: inline-block;
  padding: 0.9rem 0;
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) left calc(100% - 0.65rem) / 0 1px no-repeat;
  transition: background-size 0.5s var(--easy);
}
.hero-nav a:hover{ background-size: 100% 1px; }
.hero-role{ color: var(--grey); padding: 0.2rem 0; }

.hero-name{
  overflow: hidden;              /* never pushes the page wider */
  margin-top: 0.3rem;
  font-size: 12vw;               /* script.js fits it to the full width */
  line-height: 0.8;
}
.type{ position: relative; display: block; }
.type-ghost{ display: block; visibility: hidden; }
.type-inner{ display: inline-block; }
.type-live{ position: absolute; left: 0; top: 0; right: 0; }
.type-line{ white-space: nowrap; }
.type-space{ white-space: pre; }
.type-caret{
  display: inline-block;
  width: 0.075em;
  height: 0.72em;
  margin-left: 0.04em;
  background: currentColor;
  animation: caret-blink 1.1s var(--easy) infinite;
}
.hero.is-done .type-caret{ animation: none; opacity: 0; transition: opacity 0.8s var(--easy) 1.4s; }
@keyframes caret-blink{ 0%, 100%{ opacity: 1; } 50%{ opacity: 0; } }
@media (max-width: 699px){
  .type-line{ display: block; }
  .type-space{ display: none; }
}

/* the strip of work: images keep their own shape and sizes, never
   cropped, never boxed; it slides along to the next one by itself */
.strip{
  margin: 1rem calc(-1 * var(--gutter)) 0;
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
}
.strip.is-dragging{ cursor: grabbing; }
.strip-track{
  display: flex;
  align-items: flex-end;
  gap: 1.1rem;
  width: max-content;
  padding-left: var(--gutter);
}
.strip-item{
  flex: 0 0 auto;
  display: block;
  text-decoration: none;
  color: inherit;
  -webkit-user-drag: none;
}
.strip-frame{
  display: block;
  height: var(--h, 22rem);
  aspect-ratio: var(--ar, 1.414);
}
.strip-frame img{ display: block; width: 100%; height: 100%; object-fit: contain; -webkit-user-drag: none; user-select: none; }
.strip-cap{ display: flex; gap: 0.5rem; margin-top: 0.5rem; color: var(--grey); transition: color 0.4s var(--easy); }
.strip-cap b{ font-weight: 500; color: var(--ink); }
.strip-item:hover .strip-cap{ color: var(--ink); }
.strip.is-static{ overflow-x: auto; }

.hero-sub{
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  padding: 1.1rem 0 1.25rem;
}
.hero-tagline{ font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.3; max-width: 28ch; }
.hero-index-wrap{ display: flex; align-items: flex-end; gap: var(--gutter); min-width: 0; }
.hero-index{
  flex: 1 1 auto; min-width: 0;
  list-style: none; padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
.hero-index-row{
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 0.55rem;
  align-items: baseline;
  padding-top: 0.55rem;
  border-top: 2px solid var(--line);
  text-decoration: none;
  color: var(--grey);
  transition: color 0.6s var(--easy), border-color 0.6s var(--easy);
}
.hero-index-row.is-current,
.hero-index-row:hover{ color: var(--ink); border-top-color: var(--ink); }
.hero-index-num{ font-size: 1.6rem; line-height: 0.9; }
.hero-index-title{ font-weight: 600; font-size: 1rem; line-height: 1.2; }
.hero-index-year{ grid-column: 2; }

/* intro: after the name is typed, the work slides in from the right
   (inside its own frame, so the page never gets wider), and the
   tagline and index wipe into place. No fades. */
.js .strip-track{ transform: translateX(100vw); }
.hero.is-in .strip-track{ transform: none; transition: transform 1.4s var(--easy); }
.js .hero-role, .js .hero-sub{ clip-path: inset(0 0 100% 0); transform: translateY(0.6rem); }
.hero.is-in .hero-role,
.hero.is-in .hero-sub{ clip-path: inset(0 0 0 0); transform: none; transition: clip-path 0.9s var(--easy) 0.3s, transform 0.9s var(--easy) 0.3s; }

@media (min-width: 900px){
  .hero-sub{ grid-template-columns: var(--col-rail) var(--col-main); column-gap: var(--gutter); align-items: end; }
  .hero-index{ gap: var(--gutter); }
}
@media (max-width: 599px){
  /* phones: Pause sits beside the tagline, the index runs full width under it */
  .hero-sub{ grid-template-columns: minmax(0, 1fr) auto; column-gap: 1rem; align-items: start; }
  .hero-index-wrap{ display: contents; }
  .hero-tagline{ grid-column: 1; grid-row: 1; }
  .hero-index-wrap .ctl-btn{ grid-column: 2; grid-row: 1; align-self: start; }
  .hero-index{ grid-column: 1 / -1; grid-row: 2; grid-template-columns: minmax(0, 1fr); gap: 0; }
  .hero-index-row{ grid-template-columns: 2.1rem minmax(0, 1fr) auto; padding: 0.5rem 0; border-top-width: 1px; }
  .hero-index-row.is-current, .hero-index-row:hover{ border-top-color: var(--line); }
  .hero-index-num{ font-size: 1.25rem; }
  .hero-index-year{ grid-column: 3; }
  .hero-index li:last-child .hero-index-row{ border-bottom: 1px solid var(--line); }
}
@media (max-width: 399px){
  .hero-index-row{ grid-template-columns: 1.9rem minmax(0, 1fr); }
  .hero-index-year{ display: none; }
}

/* ────────────────────────────────────────────────────────────
   SECTIONS: every project, plus About and Contact.
   Sidebar (a quarter) = the text. Main (three quarters) = the work.
   ──────────────────────────────────────────────────────────── */
.section{
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: var(--runhead-h);
}
.rail{ padding: var(--gutter); }
.section-main{ padding: var(--gutter); display: flex; flex-direction: column; gap: 3rem; min-width: 0; }

/* phones: number, name and info first, then the main visual, then the
   text, then the rest of the work. Imagery runs edge to edge. */
.project{ grid-template-areas: "head" "primary" "body" "secondary"; }
.project .rail, .project .section-main{ display: contents; }
.project .rail-head{ grid-area: head; padding: 2.25rem var(--gutter) 1.25rem; }
.project .media-primary{ grid-area: primary; min-width: 0; }
.project .rail-body{ grid-area: body; padding: 1.75rem var(--gutter) 2.5rem; }
.project .media-secondary{ grid-area: secondary; min-width: 0; padding-bottom: 2.5rem; display: flex; flex-direction: column; gap: 2.5rem; }
.project .book-head, .project .controls, .project .model3d-foot, .project .book-progress{ margin-left: var(--gutter); margin-right: var(--gutter); }
.project .book-progress{ width: calc(100% - 2 * var(--gutter)); }

@media (min-width: 900px){
  .section{ grid-template-columns: var(--col-rail) var(--col-main); }
  .rail{ border-right: 1px solid var(--line); position: sticky; top: var(--runhead-h); align-self: start; }
  .project{ grid-template-areas: "rail main"; }
  .project .rail{ display: block; grid-area: rail; }
  .project .rail-head, .project .rail-body{ padding: 0; }
  .project .rail-body{ margin-top: 1.75rem; }
  .project .section-main{ display: flex; grid-area: main; }
  .project .media-secondary{ padding-bottom: 0; gap: 3rem; }
  .project .book-head, .project .controls, .project .model3d-foot, .project .book-progress{ margin-left: 0; margin-right: 0; }
  .project .book-progress{ width: 100%; }
}

/* ---- sidebar: identical for every section ---- */
.rail-num{ display: block; font-size: clamp(3.75rem, 7vw, 7rem); line-height: 0.78; letter-spacing: -0.02em; }
.rail-name{ margin-top: 0.8rem; font-size: clamp(1.9rem, 2.7vw, 2.8rem); line-height: 0.92; font-stretch: 78%; }
.rail-facts{ list-style: none; padding: 0; margin-top: 1rem; display: grid; gap: 0.2rem; color: var(--grey); }
.rail-body{ max-width: 60ch; }
.rail-summary{ font-size: clamp(1.1rem, 1.35vw, 1.25rem); line-height: 1.32; }
.rail-block{ margin-top: 1.4rem; }
.rail-label{ color: var(--grey); margin-bottom: 0.4rem; }
.rail-detail{ margin-top: 1.75rem; padding-top: 1rem; border-top: 1px solid var(--line); }
/* names that switch by themselves (Dozer's "As seen with") */
.switcher{
  position: relative;
  height: 2.05em;
  font-size: clamp(1.6rem, 2vw, 2rem);
  line-height: 1;
  font-stretch: 78%;
  overflow: hidden;
}
.switcher-item{
  position: absolute; left: 0; top: 0; right: 0;
  transform: translateY(105%);
  transition: transform 0.9s var(--easy);
}
.switcher-item.is-on{ transform: none; }
.switcher-item.is-off{ transform: translateY(-105%); }
.switcher.is-static{ height: auto; font-family: var(--f-text); font-size: 1rem; font-weight: 500; text-transform: none; font-stretch: 100%; line-height: 1.5; }
.rail-detail-image{ margin: 0.4rem 0 0.9rem; }
.rail-detail-image img{ display: block; width: 46%; max-width: 12rem; height: auto; }

/* ────────────────────────────────────────────────────────────
   THE WORK: full width of the main column, stacked, never cropped
   ──────────────────────────────────────────────────────────── */
.media-stack{ display: flex; flex-direction: column; gap: 1rem; }
.section-main.is-stacked{ gap: 1rem; }              /* Dozer: one continuous column of images */
.project .section-main.is-stacked .media-secondary{ gap: 1rem; }
.media-stack img{ display: block; width: 100%; height: auto; }
.media-process .rail-label{ margin-bottom: 0.75rem; }
.media-placeholder{
  aspect-ratio: 16 / 10; display: flex; align-items: flex-end; justify-content: flex-end; padding: 0.75rem;
  font-family: var(--f-mono); font-size: 0.78rem; color: var(--grey);
  background: repeating-linear-gradient(135deg, var(--paper) 0 2px, var(--line) 2px 3px);
}

/* ---- spreads: one at a time, sliding to the next ---- */
.book-head{ margin-bottom: 0.8rem; }
.book-label{ color: var(--grey); }
.book-how{ margin-top: 0.35rem; font-size: 1.05rem; line-height: 1.35; }
.slider{
  position: relative;
  width: 100%;
  aspect-ratio: var(--aspect, 1.414);
  max-height: calc(100svh - 12rem);
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  -webkit-user-select: none; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.slider.is-dragging{ cursor: grabbing; }
.slider-track{ display: flex; height: 100%; }
.slide{ position: relative; flex: 0 0 100%; height: 100%; }
.slide img{ display: block; width: 100%; height: 100%; object-fit: contain; pointer-events: none; }
/* unfinished section: greyed out and labelled */
.slide.is-wip img{ filter: grayscale(1); opacity: 0.4; }
.wip-badge{
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.7rem 1.05rem;
  font-size: 0.78rem;
  color: var(--paper);
  background: var(--ink);
  white-space: nowrap;
}
.slider-hint{
  position: absolute; right: 0.75rem; bottom: 0.75rem;
  padding: 0.3rem 0.6rem;
  color: var(--paper);
  background: rgba(18,18,18,0.72);
  pointer-events: none;
  transition: opacity 0.6s var(--easy);
}
.slider-hint.is-hidden{ opacity: 0; }
.book-count{ flex: 1 1 9rem; text-align: center; }
.book-progress{
  -webkit-appearance: none; appearance: none;
  display: block; width: 100%;
  height: var(--tap);
  margin-top: 0.15rem;
  background: transparent;
  cursor: pointer;
}
.book-progress::-webkit-slider-runnable-track{ height: 2px; background: var(--line); }
.book-progress::-moz-range-track{ height: 2px; background: var(--line); }
.book-progress::-webkit-slider-thumb{ -webkit-appearance: none; appearance: none; width: 4px; height: 1.2rem; margin-top: -0.6rem; background: var(--ink); border-radius: 0; }
.book-progress::-moz-range-thumb{ width: 4px; height: 1.2rem; background: var(--ink); border: none; border-radius: 0; }
@media (max-width: 599px){
  .book .controls .book-count{ order: -1; flex-basis: 100%; text-align: left; }
  .book .controls .ctl-btn{ flex: 1 1 auto; }
}

/* ---- 3D model (Arsvita): floats on the page, no floor, no shadow ---- */
.model3d-stage{
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 82svh;
  overflow: hidden;
  background: transparent;
  cursor: grab;
  touch-action: pan-y;
  -webkit-user-select: none; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
@media (max-width: 699px){ .model3d-stage{ aspect-ratio: 1 / 1; } }
.model3d-stage.is-dragging{ cursor: grabbing; }
.model3d-poster, .model3d-canvas{ position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.model3d-poster{ object-fit: cover; z-index: 0; }
.model3d-canvas{ z-index: 1; opacity: 0; transition: opacity 0.9s var(--easy); }
.model3d-stage.is-ready .model3d-canvas{ opacity: 1; }
.model3d-stage.is-ready .model3d-poster{ visibility: hidden; transition: visibility 0s 0.9s; }
.model3d-stage.is-fallback .model3d-canvas{ display: none; }
.model3d-loading{ position: absolute; z-index: 2; left: 0.75rem; top: 0.75rem; right: 0.75rem; color: var(--grey); pointer-events: none; }
.model3d-stage.is-ready .model3d-loading, .model3d-stage.is-fallback .model3d-loading{ display: none; }
/* only shown if a file is in the wrong place, so it's easy to spot */
.model3d-stage.is-missing .model3d-loading{
  display: block; right: auto; max-width: calc(100% - 1.5rem);
  color: var(--ink); background: var(--paper); border: 1px solid var(--ink); padding: 0.4rem 0.6rem;
}
.model3d-hint{
  position: absolute; right: 0.75rem; bottom: 0.75rem; z-index: 2;
  padding: 0.3rem 0.6rem; color: var(--grey); border: 1px solid var(--line);
  pointer-events: none; transition: opacity 0.6s var(--easy);
}
.model3d-hint.is-hidden, .model3d-stage.is-fallback .model3d-hint{ opacity: 0; }
.model3d-foot{ display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 0.5rem; }
.model3d-note{ color: var(--grey); }
.model3d-stage.is-fallback ~ .model3d-foot .ctl-btn{ display: none; }

/* ────────────────────────────────────────────────────────────
   ABOUT + CONTACT
   ──────────────────────────────────────────────────────────── */
.section--text .section-main{ padding-top: 0; }
@media (min-width: 900px){ .section--text .section-main{ padding-top: var(--gutter); } }
.section-lede{ max-width: 30ch; font-size: clamp(1.35rem, 2.4vw, 2.1rem); line-height: 1.25; }
.contact-email{
  display: inline-block; align-self: flex-start; max-width: 100%;
  font-family: var(--f-text); font-weight: 700;
  font-size: clamp(1.1rem, 4.4vw, 3rem); letter-spacing: -0.015em;
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) left bottom / 100% 3px no-repeat;
  padding-bottom: 0.1em;
  white-space: nowrap;
  transition: color 0.35s var(--easy);
}
.contact-email:hover{ color: var(--grey); }
.contact-social{ list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
.contact-social a{ display: inline-block; padding: 0.55rem 0; text-decoration: underline; text-underline-offset: 0.2em; }

/* ────────────────────────────────────────────────────────────
   BACK TO TOP: only appears once you've scrolled down
   ──────────────────────────────────────────────────────────── */
.backtotop{
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
  padding: 0.6rem var(--gutter);
  padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px));
  text-align: center;
  background: var(--paper);
  border-top: 1px solid var(--ink);
  transform: translateY(100%);
  visibility: hidden;
  transition: transform 0.6s var(--easy), visibility 0s linear 0.6s;
}
body.is-scrolled .backtotop{ transform: none; visibility: visible; transition: transform 0.6s var(--easy), visibility 0s; }
.backtotop a{ display: inline-block; text-decoration: none; padding: 0.35rem 0; border-bottom: 1px solid var(--ink); }
.backtotop a:hover{ color: var(--grey); border-bottom-color: var(--grey); }

```

### `script.js`

```javascript
(function(){
  "use strict";
  const d = PORTFOLIO_DATA;
  document.documentElement.classList.add("js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EASY = "cubic-bezier(0.33, 0, 0.67, 1)";     // After Effects' Easy Ease, used for every slide

  function esc(str){
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  const projectById = {};
  d.projects.forEach(p => { projectById[p.id] = p; });

  // waits for a transform transition to finish (with a safety timeout)
  function afterSlide(el, ms, cb){
    let done = false;
    const finish = () => { if (done) return; done = true; el.removeEventListener("transitionend", onEnd); cb(); };
    const onEnd = (e) => { if (e.target === el) finish(); };
    el.addEventListener("transitionend", onEnd);
    setTimeout(finish, ms + 80);
  }

  // ────────────────────────────────────────────────────────────
  // HERO TEXT + PROJECT INDEX
  // ────────────────────────────────────────────────────────────
  const hero = document.getElementById("top");
  document.getElementById("hero-name").textContent = d.name;
  document.getElementById("hero-role").textContent = d.role;
  document.getElementById("hero-location").textContent = d.location;
  document.getElementById("hero-tagline").textContent = d.tagline;
  document.getElementById("runhead-name").textContent = d.name;

  const heroIndex = document.getElementById("hero-index");
  d.projects.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a class="hero-index-row" href="#project-${esc(p.id)}" data-project="${esc(p.id)}">
        <span class="hero-index-num">${esc(p.scale)}</span>
        <span class="hero-index-title">${esc(p.title)}</span>
        <span class="hero-index-year">${esc(p.year)}</span>
      </a>`;
    heroIndex.appendChild(li);
  });
  function markIndex(id){
    heroIndex.querySelectorAll(".hero-index-row").forEach(a => a.classList.toggle("is-current", a.dataset.project === id));
  }

  // ────────────────────────────────────────────────────────────
  // YOUR NAME TYPES ITSELF OUT, sized to fill the page width. An
  // invisible full copy underneath holds the space, so nothing
  // moves while it types. Then the rest of the hero slides in.
  // ────────────────────────────────────────────────────────────
  const nameEl = document.querySelector(".hero-name");
  const ghost = document.getElementById("type-ghost");
  const live = document.getElementById("type-live");
  const words = d.name.trim().split(/\s+/);
  const caret = '<span class="type-caret"></span>';
  ghost.innerHTML = `<span class="type-inner">${words.map((w, i) =>
    (i ? '<span class="type-space"> </span>' : "") + `<span class="type-line">${esc(w)}${i === words.length - 1 ? '<span class="type-caret" style="visibility:hidden"></span>' : ""}</span>`).join("")}</span>`;

  function renderTyped(n){
    let left = n, html = "";
    for (let i = 0; i < words.length; i++){
      if (i > 0){ if (left <= 0) break; html += '<span class="type-space"> </span>'; }
      const take = Math.min(words[i].length, left);
      left -= take;
      const caretHere = left <= 0;
      html += `<span class="type-line">${esc(words[i].slice(0, take))}${caretHere ? caret : ""}</span>`;
      if (caretHere) break;
    }
    live.innerHTML = `<span class="type-inner">${html}</span>`;
  }
  // measured at a small size (text width scales evenly), so the test
  // never makes the page wider than the screen on a phone
  function fitName(){
    nameEl.style.fontSize = "20px";
    const inner = ghost.querySelector(".type-inner");
    const w = inner.getBoundingClientRect().width, avail = nameEl.clientWidth;
    if (w > 0 && avail > 0) nameEl.style.fontSize = Math.max(36, Math.min(420, Math.floor(200 * avail / w * 0.99) / 10)) + "px";
  }
  const viewW = () => document.documentElement.clientWidth;
  const viewH = () => document.documentElement.clientHeight;
  function typeName(done){
    const total = words.join("").length;
    if (reducedMotion) { renderTyped(total); done(); return; }
    let n = 0;
    renderTyped(0);
    const tick = () => { n++; renderTyped(n); if (n < total) setTimeout(tick, 70); else setTimeout(done, 250); };
    setTimeout(tick, 400);
  }

  // ────────────────────────────────────────────────────────────
  // THE STRIP: every photo from every project, in order, each at its
  // own shape and size (never cropped, never enlarged past its real
  // size), sliding along to the next one with Easy Ease. Loops
  // seamlessly. Drag or swipe to move it yourself; hover or Pause
  // to stop it. Each image links to its project.
  // ────────────────────────────────────────────────────────────
  const strip = document.getElementById("strip");
  const track = document.getElementById("strip-track");
  const pauseBtn = document.getElementById("strip-pause");
  const SIZES = [1, 0.8, 0.92, 0.74, 1, 0.86];          // gentle rhythm of image sizes
  const LOAD_AHEAD = 14;                                // images loaded ahead of the one on screen

  function autoReel(){
    const out = [];
    d.projects.forEach(p => {
      const hasBook = p.spreads && p.spreads.length > 1;
      (hasBook ? p.spreads : (p.images || [])).forEach(src => out.push({ src, project: p.id }));
      (p.birds || []).filter(b => b.status !== "in-progress")
        .forEach(b => b.spreads.forEach(src => out.push({ src, project: p.id })));
    });
    return out;
  }
  const reel = (Array.isArray(d.reel) && d.reel.length ? d.reel : autoReel()).filter(s => s && s.src && projectById[s.project]);
  let stripH = 360;
  const stripItems = reel.map((s, i) => {
    const p = projectById[s.project];
    const a = document.createElement("a");
    a.className = "strip-item";
    a.href = "#project-" + p.id;
    a.dataset.project = p.id;
    a.dataset.f = String(SIZES[i % SIZES.length]);
    a.setAttribute("draggable", "false");
    a.innerHTML = `<span class="strip-frame"><img alt="${esc(p.title)}" decoding="async" draggable="false"></span>
      <span class="strip-cap"><b>${esc(p.scale)}</b>${esc(p.title)}</span>`;
    const img = a.querySelector("img");
    img.dataset.src = s.src;
    img.addEventListener("load", () => { a.dataset.nw = img.naturalWidth; a.dataset.nh = img.naturalHeight; sizeItem(a); });
    // an image that can't be found (e.g. a path in data.js that doesn't
    // match the file) is simply left out instead of leaving a gap
    img.addEventListener("error", () => { a.remove(); loadAhead(LOAD_AHEAD); });
    track.appendChild(a);
    return a;
  });
  function sizeItem(a){
    const nh = +a.dataset.nh || 0, nw = +a.dataset.nw || 0;
    let h = stripH * (+a.dataset.f || 1);
    if (nh) h = Math.min(h, nh);                          // never enlarge past the real size
    a.style.setProperty("--h", Math.round(h) + "px");
    if (nw && nh) a.style.setProperty("--ar", (nw / nh).toFixed(4));
  }
  function loadAhead(count){
    Array.from(track.children).slice(0, count).forEach(a => {
      const img = a.querySelector("img");
      if (!img.src && img.dataset.src) img.src = img.dataset.src;
    });
  }
  function currentStripProject(){ const first = track.firstElementChild; if (first) markIndex(first.dataset.project); }

  // strip height: whatever keeps the first project peeking at the bottom of the screen
  function sizeStrip(){
    if (!stripItems.length) return;
    const peek = viewW() < 700 ? 90 : 110;
    const capH = 30;
    const stripTop = strip.getBoundingClientRect().top + window.scrollY;
    const rest = hero.getBoundingClientRect().bottom - strip.getBoundingClientRect().bottom;
    const lo = viewW() < 700 ? 200 : 260, hi = viewW() < 700 ? 420 : 640;
    stripH = Math.round(Math.max(lo, Math.min(hi, viewH() - peek - rest - capH - stripTop)));
    stripItems.forEach(sizeItem);
  }

  let stripPaused = reducedMotion, stripVisible = true, stripBusy = false, stripLastStep = performance.now();
  // speed of the strip: how long each slide takes, and how long each
  // image rests before the next slide (lower = faster)
  const STRIP_SLIDE_MS = 700, STRIP_HOLD_MS = 800;
  const gapPx = () => parseFloat(getComputedStyle(track).columnGap) || 0;
  function slideStrip(dir, fromX){
    if (stripBusy) return;
    stripBusy = true;
    const start = fromX || 0;
    if (dir > 0){
      const first = track.firstElementChild;
      const w = Math.round(first.getBoundingClientRect().width + gapPx());
      track.style.transition = "none";
      track.style.transform = `translate3d(${start}px,0,0)`;
      void track.offsetWidth;
      track.style.transition = `transform ${STRIP_SLIDE_MS}ms ${EASY}`;
      track.style.transform = `translate3d(${-w}px,0,0)`;
      afterSlide(track, STRIP_SLIDE_MS, () => {
        track.style.transition = "none";
        track.appendChild(first);
        track.style.transform = "translate3d(0,0,0)";
        void track.offsetWidth;
        stripBusy = false;
        loadAhead(LOAD_AHEAD); currentStripProject();
      });
    } else {
      const last = track.lastElementChild;
      track.style.transition = "none";
      track.insertBefore(last, track.firstElementChild);
      const w = Math.round(last.getBoundingClientRect().width + gapPx());
      track.style.transform = `translate3d(${start - w}px,0,0)`;
      void track.offsetWidth;
      track.style.transition = `transform ${STRIP_SLIDE_MS}ms ${EASY}`;
      track.style.transform = "translate3d(0,0,0)";
      afterSlide(track, STRIP_SLIDE_MS, () => { stripBusy = false; loadAhead(LOAD_AHEAD); currentStripProject(); });
    }
  }
  // A steady clock checks ten times a second whether it's time for the
  // next slide. It keeps going through the whole set and round again,
  // only holding while paused, while being dragged, while scrolled out
  // of view, or while the tab is hidden.
  function stripCanPlay(){
    return !stripPaused && !sDrag && stripVisible && !document.hidden && hero.classList.contains("is-in");
  }
  function scheduleStrip(){ stripLastStep = performance.now(); }
  setInterval(() => {
    if (!stripCanPlay()) { stripLastStep = performance.now(); return; }
    if (stripBusy) return;
    if (performance.now() - stripLastStep >= STRIP_HOLD_MS + STRIP_SLIDE_MS) {
      stripLastStep = performance.now();
      slideStrip(1);
    }
  }, 100);
  function setStripPaused(p){
    stripPaused = p;
    pauseBtn.setAttribute("aria-pressed", String(p));
    pauseBtn.textContent = p ? "Play" : "Pause";
    scheduleStrip();
  }
  pauseBtn.addEventListener("click", () => setStripPaused(!stripPaused));
  // drag / swipe
  let sDrag = null, sMoved = false;
  strip.addEventListener("pointerdown", (e) => {
    if (reducedMotion || stripBusy || (e.button !== undefined && e.button > 0)) return;
    sDrag = { x: e.clientX, dx: 0, id: e.pointerId }; sMoved = false;
  });
  strip.addEventListener("pointermove", (e) => {
    if (!sDrag) return;
    sDrag.dx = e.clientX - sDrag.x;
    if (!sMoved && Math.abs(sDrag.dx) > 6) { sMoved = true; strip.classList.add("is-dragging"); try { strip.setPointerCapture(sDrag.id); } catch (err) {} }
    if (sMoved) { track.style.transition = "none"; track.style.transform = `translate3d(${sDrag.dx}px,0,0)`; }
  });
  function endStripDrag(){
    if (!sDrag) return;
    const dx = sDrag.dx; sDrag = null;
    strip.classList.remove("is-dragging");
    if (!sMoved) { scheduleStrip(); return; }
    if (dx < -50) slideStrip(1, dx);
    else if (dx > 50) slideStrip(-1, dx);
    else { track.style.transition = `transform 500ms ${EASY}`; track.style.transform = "translate3d(0,0,0)"; }
    scheduleStrip();
  }
  strip.addEventListener("pointerup", endStripDrag);
  strip.addEventListener("pointercancel", endStripDrag);
  strip.addEventListener("lostpointercapture", endStripDrag);
  window.addEventListener("pointerup", endStripDrag);
  window.addEventListener("blur", endStripDrag);
  strip.addEventListener("click", (e) => { if (sMoved) { e.preventDefault(); e.stopPropagation(); sMoved = false; } }, true);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => { stripVisible = es[0].isIntersecting; scheduleStrip(); }, { threshold: 0.15 }).observe(strip);
  }
  document.addEventListener("visibilitychange", scheduleStrip);
  if (reducedMotion) { strip.classList.add("is-static"); loadAhead(stripItems.length); }
  else loadAhead(LOAD_AHEAD);
  currentStripProject();

  // ────────────────────────────────────────────────────────────
  // PROJECTS: one template for every project.
  // Sidebar: number, name, small info, then the short text.
  // Main column: the work.
  // ────────────────────────────────────────────────────────────
  function railMarkup(p){
    const facts = [p.year, p.role, p.dimensions].filter(Boolean).map(f => `<li>${esc(f)}</li>`).join("");
    const block = (label, text) => text
      ? `<div class="rail-block"><h3 class="rail-label">${esc(label)}</h3><p>${esc(text)}</p></div>` : "";
    let detail = "";
    if (p.detail) {
      const dt = p.detail;
      let inner = "";
      if (dt.items && dt.switch) {
        inner = `<p class="switcher" aria-label="${esc(dt.items.join(", "))}">${dt.items.map((it, i) =>
          `<span class="switcher-item${i === 0 ? " is-on" : ""}" aria-hidden="true">${esc(it)}</span>`).join("")}</p>`;
      } else if (dt.items) {
        inner = `<ul class="rail-detail-list">${dt.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>`;
      } else {
        inner = `${dt.image ? `<div class="rail-detail-image"><img src="${esc(dt.image)}" alt="${esc(p.title)} logo" loading="lazy"></div>` : ""}
                 ${dt.text ? `<p>${esc(dt.text)}</p>` : ""}`;
      }
      detail = `<div class="rail-detail"><h3 class="rail-label">${esc(dt.label)}</h3>${inner}</div>`;
    }
    return `
      <div class="rail-head">
        <span class="rail-num">${esc(p.scale)}</span>
        <h2 class="rail-name">${esc(p.title)}</h2>
        <ul class="rail-facts">${facts}</ul>
      </div>
      <div class="rail-body">
        ${p.summary ? `<p class="rail-summary">${esc(p.summary)}</p>` : ""}
        ${block("Challenge", p.challenge)}
        ${block("Approach", p.process)}
        ${block(p.outcomeLabel || "Outcome", p.outcome)}
        ${detail}
      </div>`;
  }

  // spreads, one at a time; pages = [{src, alt, section, wip}]
  function bookMarkup(p, pages, label){
    const n = pages.length;
    const how = finePointer
      ? `Drag, click or use the arrows to go through all ${n} spreads.`
      : `Swipe or use the arrows to go through all ${n} spreads.`;
    return `
      <figure class="book" data-book style="--aspect:${p.aspect || 1.412}">
        <figcaption class="book-head">
          <span class="book-label">${esc(label || "Inside the book")}</span>
          <p class="book-how">${how}</p>
        </figcaption>
        <div class="slider" tabindex="0" role="region" aria-roledescription="carousel"
             aria-label="${esc(p.title)}, ${n} spreads. Use the left and right arrow keys to move between them.">
          <div class="slider-track">
            ${pages.map((pg, i) => `
              <div class="slide${pg.wip ? " is-wip" : ""}" role="group" aria-roledescription="slide"
                   aria-label="${esc(pg.alt)}"${pg.section ? ` data-section="${esc(pg.section)}"` : ""}>
                <img src="${esc(pg.src)}" alt="${esc(pg.alt)}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async" draggable="false">
                ${pg.wip ? `<span class="wip-badge">Work in progress</span>` : ""}
              </div>`).join("")}
          </div>
          <span class="slider-hint" aria-hidden="true">${finePointer ? "Drag" : "Swipe"} \u2194</span>
        </div>
        <div class="controls">
          <button type="button" class="ctl-btn book-prev">\u2190 Previous</button>
          <span class="book-count" aria-live="polite"></span>
          <button type="button" class="ctl-btn book-next">Next \u2192</button>
          <button type="button" class="ctl-btn book-pause" aria-pressed="false">Pause</button>
        </div>
        <input type="range" class="book-progress" min="0" max="${n - 1}" value="0" step="1" aria-label="Jump to a spread">
      </figure>`;
  }

  // returns {primary, secondary, stacked}: the main visual, and the rest
  function mediaMarkup(p){
    const parts = [];
    if (p.model3d && p.model3d.src) {
      const poster = p.model3d.poster ? `<img class="model3d-poster" src="${esc(p.model3d.poster)}" alt="" loading="lazy" decoding="async">` : "";
      parts.push(`
        <div class="model3d" data-model3d="${esc(p.id)}">
          <div class="model3d-stage" tabindex="0" role="group" aria-roledescription="3D viewer"
               aria-label="${esc(p.title)} in 3D. It turns on its own and its stand comes off and goes back on. Drag, or use the left and right arrow keys, to turn it yourself.">
            ${poster}
            <span class="model3d-loading" aria-hidden="true">Loading 3D model\u2026</span>
            <span class="model3d-hint" aria-hidden="true">${finePointer ? "Drag" : "Swipe"} to turn \u2194</span>
          </div>
          <div class="model3d-foot">
            <p class="model3d-note">The stand comes off and goes back on by itself.</p>
            <button type="button" class="ctl-btn model3d-pause" aria-pressed="false">Pause</button>
          </div>
        </div>`);
    }
    if (p.spreads && p.spreads.length > 1) {
      parts.push(bookMarkup(p, p.spreads.map((src, i) => ({ src, alt: `${p.title}, spread ${i + 1} of ${p.spreads.length}` })), p.flipLabel));
    }
    if (p.birds && p.birds.length) {
      const pages = [];
      p.birds.forEach(b => b.spreads.forEach((src, i) => pages.push({
        src, section: b.name, wip: b.status === "in-progress",
        alt: `${p.title}, ${b.name}, spread ${i + 1} of ${b.spreads.length}${b.status === "in-progress" ? ", work in progress" : ""}`
      })));
      parts.push(bookMarkup(p, pages, p.flipLabel));
    }
    const hasBook = (p.spreads && p.spreads.length > 1) || (p.birds && p.birds.length);
    const images = (!hasBook && p.images) ? p.images : [];
    const img = (src, i) => `<img src="${esc(src)}" alt="${esc(p.title)}, image ${i + 1} of ${images.length}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async">`;
    let stacked = false;
    if (images.length) {
      stacked = true;
      parts.push(`<div class="media-stack">${img(images[0], 0)}</div>`);
      if (images.length > 1) parts.push(`<div class="media-stack">${images.slice(1).map((src, i) => img(src, i + 1)).join("")}</div>`);
    }
    if (!parts.length) parts.push(`<div class="media-placeholder">Images coming soon</div>`);
    const proc = p.processImages || [];
    if (proc.length) {
      parts.push(`<div class="media-process"><h3 class="rail-label">Process</h3><div class="media-stack">${proc.map(src =>
        `<img src="${esc(src)}" alt="${esc(p.title)}, process image" loading="lazy" decoding="async">`).join("")}</div></div>`);
    }
    return { primary: parts[0], secondary: parts.slice(1).join(""), stacked };
  }

  const workRoot = document.getElementById("work-sections");
  d.projects.forEach(p => {
    const section = document.createElement("article");
    section.className = "section project";
    section.id = "project-" + p.id;
    section.setAttribute("aria-labelledby", "project-title-" + p.id);
    const media = mediaMarkup(p);
    section.innerHTML = `
      <div class="rail">${railMarkup(p)}</div>
      <div class="section-main${media.stacked ? " is-stacked" : ""}">
        <div class="media-primary">${media.primary}</div>
        ${media.secondary ? `<div class="media-secondary">${media.secondary}</div>` : ""}
      </div>`;
    section.querySelector(".rail-name").id = "project-title-" + p.id;
    workRoot.appendChild(section);
  });

  // ---- about + contact ----
  document.getElementById("about-bio").textContent = d.bio;
  document.getElementById("about-location").textContent = "Based in " + d.location;
  document.getElementById("contact-status").textContent = d.status || "";
  const emailEl = document.getElementById("contact-email");
  emailEl.textContent = d.email;
  emailEl.href = "mailto:" + d.email;
  const socialList = document.getElementById("contact-social");
  d.social.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`;
    socialList.appendChild(li);
  });

  // ────────────────────────────────────────────────────────────
  // NAMES THAT SWITCH BY THEMSELVES (Dozer's "As seen with"):
  // each name slides up and out as the next slides in.
  // ────────────────────────────────────────────────────────────
  document.querySelectorAll(".switcher").forEach(sw => {
    const items = Array.from(sw.querySelectorAll(".switcher-item"));
    if (reducedMotion || items.length < 2) {
      sw.classList.add("is-static");
      sw.textContent = items.map(it => it.textContent).join(", ");
      return;
    }
    let i = 0, timer = null, visible = false;
    function next(){
      const out = items[i];
      i = (i + 1) % items.length;
      const inn = items[i];
      inn.style.transition = "none"; inn.classList.remove("is-off", "is-on"); void inn.offsetWidth; inn.style.transition = "";
      out.classList.remove("is-on"); out.classList.add("is-off");
      inn.classList.add("is-on");
    }
    function schedule(){
      clearTimeout(timer);
      if (!visible || document.hidden) return;
      timer = setTimeout(() => { next(); schedule(); }, 2600);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(es => { visible = es[0].isIntersecting; schedule(); }).observe(sw);
    } else { visible = true; schedule(); }
    document.addEventListener("visibilitychange", schedule);
  });

  // ────────────────────────────────────────────────────────────
  // SPREADS: one at a time, sliding to the next with Easy Ease.
  // Drag or swipe it, click its left or right half, use Previous /
  // Next or the arrow keys, or drag the bar underneath. Left alone
  // it slides on by itself (hover or Pause to stop it), and it loops
  // back to the first spread without jumping.
  // ────────────────────────────────────────────────────────────
  function initBook(fig){
    const slider = fig.querySelector(".slider");
    const strack = slider.querySelector(".slider-track");
    const real = Array.from(strack.children);
    const N = real.length;
    const firstClone = real[0].cloneNode(true), lastClone = real[N - 1].cloneNode(true);
    [firstClone, lastClone].forEach(c => { c.setAttribute("aria-hidden", "true"); c.removeAttribute("role"); });
    strack.insertBefore(lastClone, real[0]);
    strack.appendChild(firstClone);
    const prevBtn = fig.querySelector(".book-prev"), nextBtn = fig.querySelector(".book-next");
    const pauseB = fig.querySelector(".book-pause"), countEl = fig.querySelector(".book-count");
    const progress = fig.querySelector(".book-progress"), hint = slider.querySelector(".slider-hint");
    const SLIDE_MS = 850, AUTO_MS = 1300, HOLD_MS = 2800;
    let cur = 0, busy = false, paused = reducedMotion, visible = false, hover = false, lastTouch = -Infinity, timer = null;

    const W = () => slider.clientWidth;
    function place(pos, ms){
      strack.style.transition = ms ? `transform ${ms}ms ${EASY}` : "none";
      strack.style.transform = `translate3d(${-Math.round(pos * W())}px,0,0)`;
    }
    function label(i){
      const name = real[i].dataset.section;
      if (!name) return `Spread ${i + 1} of ${N}`;
      const same = real.filter(s => s.dataset.section === name);
      if (real[i].classList.contains("is-wip")) return `${name}, work in progress`;
      return `${name}, spread ${same.indexOf(real[i]) + 1} of ${same.length}`;
    }
    function update(){
      countEl.textContent = label(cur);
      progress.value = String(cur);
      real.forEach((s, k) => s.setAttribute("aria-hidden", k === cur ? "false" : "true"));
      for (let k = -1; k <= 2; k++) {
        const im = real[(cur + k + N) % N].querySelector("img");
        if (im.loading === "lazy") im.loading = "eager";
      }
    }
    function go(target, ms){
      if (busy) return;
      busy = true;
      const wrap = target >= N || target < 0;
      place(target + 1, ms || SLIDE_MS);                  // clones sit at 0 and N + 1
      cur = (target + N) % N;
      update();
      afterSlide(strack, ms || SLIDE_MS, () => { if (wrap) place(cur + 1, 0); busy = false; });
    }
    function schedule(){
      clearTimeout(timer);
      if (paused || hover || !visible || document.hidden) return;
      const wait = Math.max(HOLD_MS, 4500 - (performance.now() - lastTouch));
      timer = setTimeout(() => { go(cur + 1, AUTO_MS); schedule(); }, wait);
    }
    function touched(){
      lastTouch = performance.now();
      if (hint) hint.classList.add("is-hidden");
      schedule();
    }
    function setPaused(p){
      paused = p;
      pauseB.setAttribute("aria-pressed", String(p));
      pauseB.textContent = p ? "Play" : "Pause";
      schedule();
    }
    prevBtn.addEventListener("click", () => { touched(); go(cur - 1); });
    nextBtn.addEventListener("click", () => { touched(); go(cur + 1); });
    pauseB.addEventListener("click", () => setPaused(!paused));
    progress.addEventListener("input", () => {
      touched();
      const t = parseInt(progress.value, 10);
      busy = false; cur = t; place(cur + 1, 450); update();
    });
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); touched(); go(cur + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); touched(); go(cur - 1); }
    });
    if (finePointer) {
      slider.addEventListener("pointerenter", () => { hover = true; schedule(); });
      slider.addEventListener("pointerleave", () => { hover = false; schedule(); });
    }
    let drag = null;
    slider.addEventListener("pointerdown", (e) => {
      if (busy || (e.button !== undefined && e.button > 0)) return;
      drag = { x: e.clientX, dx: 0, moved: false, id: e.pointerId };
    });
    slider.addEventListener("pointermove", (e) => {
      if (!drag) return;
      drag.dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(drag.dx) > 6) {
        drag.moved = true; slider.classList.add("is-dragging");
        try { slider.setPointerCapture(drag.id); } catch (err) {}
      }
      if (drag.moved) {
        strack.style.transition = "none";
        strack.style.transform = `translate3d(${-Math.round((cur + 1) * W()) + drag.dx}px,0,0)`;
      }
    });
    function endDrag(e, cancelled){
      if (!drag) return;
      const { dx, moved } = drag; drag = null;
      slider.classList.remove("is-dragging");
      touched();
      if (cancelled) { place(cur + 1, 300); return; }
      if (!moved) {
        const r = slider.getBoundingClientRect();
        go(e.clientX > r.left + r.width / 2 ? cur + 1 : cur - 1);
        return;
      }
      const threshold = W() * 0.15;
      if (dx < -threshold) go(cur + 1, 650);
      else if (dx > threshold) go(cur - 1, 650);
      else { busy = true; place(cur + 1, 450); afterSlide(strack, 450, () => { busy = false; }); }
    }
    slider.addEventListener("pointerup", (e) => endDrag(e, false));
    slider.addEventListener("pointercancel", (e) => endDrag(e, true));
    window.addEventListener("resize", () => place(cur + 1, 0));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(es => { visible = es[0].isIntersecting; schedule(); }, { threshold: 0.35 }).observe(slider);
    } else { visible = true; }
    document.addEventListener("visibilitychange", schedule);
    place(1, 0);
    update();
    setPaused(paused);
  }
  document.querySelectorAll("[data-book]").forEach(initBook);

  // focus rings show for keyboard users only, never after a click or tap
  document.querySelectorAll(".slider, .model3d-stage, .strip").forEach(el => {
    el.addEventListener("pointerdown", () => el.setAttribute("data-pointer", ""));
    el.addEventListener("keydown", () => el.removeAttribute("data-pointer"));
  });

  // ────────────────────────────────────────────────────────────
  // 3D MODEL: turns on its own, and its stand fades away and comes
  // back by itself. Drag to turn it; Pause stops all its movement.
  // The model file is a few MB, so it only loads when the project
  // is about to scroll into view.
  // ────────────────────────────────────────────────────────────
  document.querySelectorAll("[data-model3d]").forEach(wrap => {
    const project = projectById[wrap.dataset.model3d];
    const stage = wrap.querySelector(".model3d-stage");
    const pause = wrap.querySelector(".model3d-pause");
    let viewer = null, paused = reducedMotion;
    function setPaused(p){
      paused = p;
      pause.setAttribute("aria-pressed", String(p));
      pause.textContent = p ? "Play" : "Pause";
      if (viewer && viewer.setPaused) viewer.setPaused(p);
    }
    function start(){
      if (!window.Arsvita3D) {
        stage.classList.add("is-fallback", "is-missing");
        const msg = stage.querySelector(".model3d-loading");
        if (msg) msg.textContent = "3D viewer file not found. Put arsvita-3d.js next to index.html.";
        return;
      }
      viewer = window.Arsvita3D.mount(stage, { src: project.model3d.src, autoStand: true, paused });
      if (!viewer.ok) stage.classList.add("is-fallback");
    }
    pause.addEventListener("click", () => setPaused(!paused));
    setPaused(paused);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(en => en.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "700px 0px" });
      io.observe(stage);
    } else start();
  });

  // ────────────────────────────────────────────────────────────
  // SIDEBAR stays beside the work on wide screens. One that fits the
  // window pins to the top; a taller one scrolls until its last line
  // is showing and stays there, so the column never goes empty.
  // ────────────────────────────────────────────────────────────
  const rails = Array.from(document.querySelectorAll(".section .rail"));
  function fitRails(){
    const headH = document.querySelector(".runhead").offsetHeight;
    rails.forEach(r => {
      const room = window.innerHeight - headH;
      r.style.top = (r.offsetHeight <= room ? headH : Math.round(window.innerHeight - r.offsetHeight - 16)) + "px";
    });
  }

  // ────────────────────────────────────────────────────────────
  // RUNNING HEAD, PROGRESS LINE, BACK TO TOP
  // ────────────────────────────────────────────────────────────
  const runheadSection = document.getElementById("runhead-section");
  const labelled = Array.from(document.querySelectorAll(".section")).map(s => {
    const name = s.querySelector(".rail-name");
    return { el: s, label: name ? name.textContent : "Portfolio" };
  });
  const progressBar = document.getElementById("scroll-progress");
  let ticking = false;
  function onScroll(){
    const line = window.innerHeight * 0.4;
    const hit = labelled.find(({ el }) => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
    const text = hit ? hit.label : "Portfolio";
    if (runheadSection.textContent !== text) runheadSection.textContent = text;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
    document.body.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.8);
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // ────────────────────────────────────────────────────────────
  // START: size everything, type the name, then bring in the work
  // ────────────────────────────────────────────────────────────
  function layoutAll(){ fitName(); sizeStrip(); fitRails(); }
  // Phones change their reported height as the browser bar hides while
  // scrolling; only a real width change (e.g. rotating) re-sizes the
  // strip there, so the page never jumps under your thumb.
  let lastW = viewW();
  window.addEventListener("resize", () => {
    const widthChanged = viewW() !== lastW;
    lastW = viewW();
    fitName();
    if (widthChanged || finePointer) sizeStrip();
    fitRails();
  });
  layoutAll();
  window.addEventListener("load", layoutAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutAll);
  setTimeout(layoutAll, 300);
  onScroll();
  typeName(() => {
    layoutAll();                                          // final sizes, just before the work slides in
    lastW = viewW();
    hero.classList.add("is-in");
    setTimeout(() => hero.classList.add("is-done"), 400);
    setStripPaused(stripPaused);
  });
})();

```

### `data.js`

```javascript
/*
  ────────────────────────────────────────────────────────────
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  You never need to touch index.html, style.css, or script.js
  for content changes.

  EVERY PROJECT USES THE SAME LAYOUT
  The sidebar holds all of a project's text, always in this order:
    - "scale"       the big number (01, 02, 03)
    - "title"       the project name
    - "year", "role", "dimensions"   the small info lines
    - "summary"     one or two sentences: what it is
    - "challenge", "process", "outcome"   three short blocks,
                    shown as Challenge / Approach / Outcome.
                    "outcomeLabel" renames the last one (e.g.
                    "Status" for work that's still in progress).
    - "detail"      (optional) one small extra block at the bottom,
                    styled the same wherever it's used. Either a list
                    {label, items: [...]}, a list that switches from
                    name to name by itself {label, switch: true,
                    items: [...]}, or an image with a note
                    {label, image, text}. Leave it out
                    when there's nothing worth adding.
  Keep each block to a sentence or two. Reviewers skim.

  The main column holds the imagery, using whichever of these the
  project has:
    - "model3d"   a 3D model that turns on its own, with its stand
                  fading away and coming back on a timer. Visitors can
                  drag it around to see every side.
                  Needs arsvita-3d.js next to script.js, plus
                  {src: the model file, poster: a still shown while
                  it loads}. Used by Arsvita.
    - "spreads"   the book's spreads, one at a time, sliding from one
                  to the next, with Previous / Next buttons. If the
                  project also has a 3D model, the spreads sit
                  directly under it. Used by Arsvita.
    - "birds"     one run of spreads through several sections in a
                  row: {name, status, spreads}. A
                  section with status "in-progress" is greyed out
                  and labelled "Work in progress". Used by The
                  Pecking Order.
    - "images"    the first image is shown large, the rest in rows
                  below it. Rows fill the full width and every image
                  keeps its own shape, so nothing is ever cropped.
                  Export images at least 2400px wide so they stay
                  sharp at these sizes on high-resolution screens.
    - "processImages" (optional) sketches, drafts, files, shown
                  under the main imagery.
  "flipLabel" (optional) is the heading above the spreads, e.g.
  "Inside the book". "aspect" (optional) is the width ÷ height of
  one spread, so the frame matches your pages exactly.

  THE OPENING STRIP
  Right after your name types itself out, every photo from every
  project slides past in order: all of 01's, then 02's, then 03's
  (work in progress is left out). Each image keeps its own shape,
  captioned with its project and linked to it. Nothing to edit here:
  it updates itself when you add or remove images above. To show a
  hand-picked set instead, add a "reel" list of {src, project}
  (project = that project's "id") next to "projects".

  Top-level "status" is a one-line availability note shown with
  your contact info. Edit it any time.
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

  bio: "I'm a designer who wants to change the way the world sees design. I find inspiration in other art forms, like music, film, fashion and architecture. That's where my most original ideas come from.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      role: "Editorial design, art direction",
      dimensions: "Issue 01: 84 pages (2025) \u00b7 Issue 02: 164 pages (2026)",

      summary: "A prep-fashion magazine that opened a traditionally exclusive style up to everyone. Launched in New York with a party hosted by Paul Stuart.",
      challenge: "Prep culture has long been predominantly white and exclusive. We wanted to widen it without disrespecting its traditions, while meeting commercial print standards for a 1,000+ copy run.",
      process: "We cast models from many ethnicities, cultures and backgrounds, and made our friend Pete, \u201cPreppy Pete,\u201d the new face of prep.",
      outcome: "Issue 01 sold over 1,000 copies on release and was stocked at Casa Magazines and Rare Magazines. A limited J.Crew run sold out in under 10 minutes. Issue 02 nearly doubled in length, with press in The New York Times and The Wall Street Journal.",

      detail: {
        label: "As seen with",
        switch: true,
        items: ["The New York Times", "The Wall Street Journal", "Paul Stuart", "J.Crew", "L.L. Bean", "G.H. Bass", "Sperry", "Mount Gay Rum", "Dirty Water Seltzers"]
      },

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
      role: "Editorial design, self-published",
      dimensions: "46 pages \u00b7 hand-bound, laser-cut acrylic case \u00b7 one-of-one edition",

      summary: "Volume 01: Maya Civilization. A one-of-one magazine, hand-bound and housed in a laser-cut acrylic case, designed and built entirely in-house.",
      challenge: "Make dense academic writing on Maya art and archaeology exciting to read without turning it into a listicle, and build the object with no templates to follow.",
      process: "The issue reads like a museum tour, opening with the manifesto \u201cArs Longa, Vita Brevis\u201d (art is long, life is short). Each chapter centres on one class of object. Serif essay columns are broken up by oversized type, and a spec-sheet catalogue lists every artifact like an auction lot. The acrylic case is a vitrine you hold in your hands.",
      outcome: "A finished one-of-one edition and a production process built from scratch: acrylic cut to tolerance and solvent-bonded into a case, custom InDesign layouts, and pages hand-glued into a binding never meant for paper.",

      model3d: {
        src: "models/arsvita-3d-model.js",
        poster: "images/arsvita/3d-poster.webp"
      },
      flipLabel: "Inside the book",
      aspect: 1.412,
      spreads: [
        "images/arsvita/spread-01.jpg","images/arsvita/spread-02.jpg","images/arsvita/spread-03.jpg",
        "images/arsvita/spread-04.jpg","images/arsvita/spread-05.jpg","images/arsvita/spread-06.jpg",
        "images/arsvita/spread-07.jpg","images/arsvita/spread-08.jpg","images/arsvita/spread-09.jpg",
        "images/arsvita/spread-10.jpg","images/arsvita/spread-11.jpg","images/arsvita/spread-12.jpg",
        "images/arsvita/spread-13.jpg","images/arsvita/spread-14.jpg","images/arsvita/spread-15.jpg",
        "images/arsvita/spread-16.jpg","images/arsvita/spread-17.jpg","images/arsvita/spread-18.jpg",
        "images/arsvita/spread-19.jpg","images/arsvita/spread-20.jpg","images/arsvita/spread-21.jpg",
        "images/arsvita/spread-22.jpg","images/arsvita/spread-23.jpg"
      ],
      images: ["images/arsvita/spread-01.jpg"],
      processImages: []
    },
    {
      id: "03",
      scale: "03",
      title: "The Pecking Order Magazine",
      year: "2026\u2013present",
      role: "Branding, editorial design",
      dimensions: "Issue One: The Unrefined \u00b7 5 bird profiles \u00b7 in progress",

      summary: "Issue One: The Unrefined. An identity and editorial system for a magazine that spreads awareness of overlooked birds and the environmental pressures they face.",
      challenge: "Combine field-guide data (height, wingspan, range, IUCN status) with long-form essays on ecology and extinction, without it feeling like two publications stapled together.",
      process: "Each bird gets a spec sheet set against a single saturated yellow, and photos from many sources are unified by a high-contrast black-and-white duotone. Essays break the field-guide rhythm with oversized italic pull-quotes, arguing what the data can\u2019t: \u201cleast concern\u201d isn\u2019t the same as \u201cbeautiful.\u201d",
      outcomeLabel: "Status",
      outcome: "In progress. Three of the five bird profiles are finished, and the Hoatzin is underway.",

      detail: {
        label: "Logo",
        image: "images/logo-full.png",
        text: "The rough, hand-cut edges soften the way into a dense subject, so the magazine feels like something to pick up rather than brace for."
      },

      flipLabel: "Inside the magazine",
      aspect: 1.333,
      birds: [
        {
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.jpg","images/pecking-order/marabou-02.jpg",
            "images/pecking-order/marabou-03.jpg","images/pecking-order/marabou-04.jpg",
            "images/pecking-order/marabou-05.jpg","images/pecking-order/marabou-06.jpg"
          ]
        },
        {
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.jpg","images/pecking-order/shoebill-02.jpg",
            "images/pecking-order/shoebill-03.jpg","images/pecking-order/shoebill-04.jpg",
            "images/pecking-order/shoebill-05.jpg","images/pecking-order/shoebill-06.jpg"
          ]
        },
        {
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.jpg","images/pecking-order/kingvulture-02.jpg",
            "images/pecking-order/kingvulture-03.jpg","images/pecking-order/kingvulture-04.jpg",
            "images/pecking-order/kingvulture-05.jpg"
          ]
        },
        {
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
    Arsvita3D.mount(stageEl, { src, autoStand, paused })  ->  { setPaused(bool) }
  The model turns slowly on its own and, with autoStand on, its stand
  fades away and comes back every few seconds. Dragging turns it by
  hand and holds both movements until it's left alone for a moment.
  There's no floor or shadow: the book floats on the page itself.
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
uniform vec3 uCam,uKeyDir,uKeyCol;uniform vec4 uBase;uniform float uRough,uMetal,uOcc,uNScale,uTransl,uClipY,uFade;
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
   frag=vec4(c,max(a*back,max(c.r,max(c.g,c.b))))*uFade; return;}
 frag=vec4(toSRGB(aces(col*uExposure))*uFade,uFade);
}`;
  // stage look: no background, no floor, no shadow. The book floats on
  // whatever the page colour is behind it.
  const EXPOSURE = 1.06;
  const KEY_DIR = (() => { const a = -28 * Math.PI / 180, e = 42 * Math.PI / 180; return [Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)]; })();
  const KEY_COL = [2.3, 2.3, 2.3];   // neutral white, so the cover blue reads true
  const STAND_MS = 1300;         // stand fade in / out
  const STAND_EVERY_MS = 5000;   // time between automatic stand changes
  const IDLE_MS = 4500;          // after a drag, wait this long before moving on its own again
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

    let pbr, envTex, scene = null, dirty = true, visible = false, raf = 0;
    const view = { yaw: HOME.yaw, pitch: HOME.pitch, fov: 26 * Math.PI / 180, target: [0, 0.108, 0] };
    let standK = 1, standTarget = 1, standFrom = 1, standT0 = 0;
    let vel = 0, lastInteract = performance.now(), drag = null;
    let paused = !!opts.paused, lastStandSwitch = performance.now(), standHoldUntil = 0;
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
      pbr = prog(VS, FS);
      // image-based lighting: prefiltered studio environment (half floats)
      envTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, envTex); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      const eb = b64(DATA.env.env), half = new Uint16Array(eb.buffer, eb.byteOffset, eb.byteLength / 2); let off = 0;
      DATA.env.levels.forEach(([w, h], l) => { const n = w * h * 3; gl.texImage2D(gl.TEXTURE_2D, l, gl.RGB16F, w, h, 0, gl.RGB, gl.HALF_FLOAT, half.subarray(off, off + n)); off += n; });
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      DATA.shFlat = DATA.shFlat || new Float32Array(DATA.env.sh.flat());
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
      const d = Math.max(0.148 / tv, 0.108 / th), cp = Math.cos(view.pitch);
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
      gl.useProgram(pbr.p); const u = pbr.u;
      gl.uniformMatrix4fv(u.uVP, false, cam.vp); gl.uniform3fv(u.uCam, cam.eye);
      gl.uniform3fv(u.uSH, window.ARSVITA_3D_DATA.shFlat); gl.uniform1f(u.uExposure, EXPOSURE);
      gl.uniform3fv(u.uKeyDir, KEY_DIR); gl.uniform3fv(u.uKeyCol, KEY_COL);
      gl.uniform1f(u.uClipY, -10);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, envTex); gl.uniform1i(u.tEnv, 0);
      const book = scene.byName.Book, st = scene.byName.Case;
      if (book) book.t = [0, 0.004 * k, 0];            // book rests on the stand's base plate
      if (st) st.t = [0, -0.012 * (1 - k), 0];          // stand drops a little as it fades away
      const bookPrims = [], standOpaque = [], standClear = [];
      const walk = (i, parent, inStand) => { const n = scene.nodes[i]; const m = M4.mul(parent, M4.trs(n.t, n.r, n.s)); const c = inStand || n === st;
        if (n.mesh !== undefined) scene.meshes[n.mesh].forEach(pr => (c ? (pr.mat.blend ? standClear : standOpaque) : bookPrims).push([pr, m]));
        n.children.forEach(ch => walk(ch, m, c)); };
      scene.roots.forEach(r => walk(r, M4.ident(), false));
      // the book
      gl.disable(gl.BLEND); gl.depthMask(true); gl.uniform1f(u.uFade, 1);
      for (const [pr, m] of bookPrims) drawPrim(pr, m);
      if (k > 0.002){
        // the stand: solid when fully there, see-through while it fades
        const fading = k < 0.998;
        gl.uniform1f(u.uFade, k);
        if (fading){ gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); } else gl.disable(gl.BLEND);
        gl.depthMask(true);
        for (const [pr, m] of standOpaque) drawPrim(pr, m);
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
        for (const pass of [gl.FRONT, gl.BACK]) for (const [pr, m] of standClear) drawPrim(pr, m, pass);
      }
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
      const idle = !drag && now - lastInteract > IDLE_MS;
      if (!reduced && !paused && idle && !opts.still){ const ramp = Math.min(1, (now - lastInteract - IDLE_MS) / 2500); view.yaw += dt * 0.18 * ramp; dirty = true; }
      // automatic stand on / off
      if (opts.autoStand && !reduced && !paused && idle && !opts.still && standK === standTarget &&
          now > standHoldUntil && now - lastStandSwitch > STAND_EVERY_MS){
        lastStandSwitch = now;
        startStand(standTarget === 0);
        if (opts.onStandChange) opts.onStandChange(standTarget === 1);
      }
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

    function startStand(on){
      standTarget = on ? 1 : 0;
      if (reduced || opts.still){ standK = standTarget; standFrom = standTarget; } else { standFrom = standK; standT0 = performance.now(); }
      dirty = true; wake();
    }
    api.setStand = on => startStand(on);
    api.setPaused = p => { paused = !!p; lastInteract = performance.now() - (p ? 0 : IDLE_MS); dirty = true; wake(); };
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

![3d-poster.webp](images/arsvita/3d-poster.webp)

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

