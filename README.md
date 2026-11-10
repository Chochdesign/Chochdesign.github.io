# Morgan Chochinov — Portfolio Site

A static portfolio website built around a single design concept: the book *S, M, L, XL* by Rem Koolhaas and Bruce Mau. The site treats itself like a printed book: a running head, numbered chapters, and one consistent sidebar alongside each project's work. It opens with your CHOCH logo animation on neon orange (on phones and tablets, on the page colour); when the pieces snap together the orange turns into the page colour and fades into the site. Then the name types itself out and work from every project slides past underneath, sized so the first project already shows on the first screen. Every project then shows its work at full size: each image at the full width of the work column, one under another, except Dozer's whole issue, which shows one spread at a time with a slider bar under it that runs through every spread.

No build step, no framework, no dependencies beyond two Google Fonts. Everything renders from a single data file.

## How to use this

Open `index.html` in a browser — that's it, it runs locally with no server needed. To host it, upload the six `.js`/`.html`/`.css` files (plus `CNAME` for GitHub Pages) and the `images/` and `models/` folders to any static host (Netlify, GitHub Pages, Vercel, etc.) keeping the folder structure intact. After you change `style.css` or one of the `.js` files, change the number after `?v=` where `index.html` links to them (it's just the date), so visitors' browsers load your new files instead of mixing them with old copies they saved earlier.

**To update content, only edit `data.js`.** It's fully commented — name, bio, contact info, and every project's copy, images, and layout options live there. You should never need to touch `index.html`, `style.css`, or `script.js` for a content change.

## File structure

```
.
├── index.html          Page shell / structure
├── style.css            All visual styling, design tokens at the top
├── script.js             Renders everything from data.js into the page
├── data.js               ALL editable content — start here
├── intro.js              The opening logo animation (neon orange, then into the site)
├── arsvita-3d.js         Draggable 3D model viewer (Arsvita)
├── README.md            This file
├── models/
│   └── arsvita-3d-model.js      Arsvita book + acrylic stand 3D model (loaded on demand)
└── images/
    ├── intro/
    │   ├── choch-logo-animated-loop.mp4, .webm   Your logo animation (fly in, snap, hold), black on white
    │   └── choch-logo-animated-loop-still.png    The finished logo, for reduced motion / no video
    ├── dozer-*.jpg              7 photos — Dozer Magazine
    ├── dozer/
    │   ├── cover.webp, spread-01.webp … spread-81.webp, back-cover.webp
    │   │                          Issue 02, cover to cover (3000px wide; the covers 1500px)
    │   ├── small/                 The same 83 files at half size, for phones and the opening strip
    │   └── flatplan.webp          The whole issue as one strip: the slider bar under the spreads
    ├── logo-full.png            The Pecking Order logo mark
    ├── arsvita/
    │   ├── 3d-poster.webp                   Still of the 3D model (transparent), shown while it loads
    │   ├── spread-01.webp … spread-23.webp  All 23 spreads, 3000px wide
    │   └── small/                           The same at half size, for phones and the opening strip
    └── pecking-order/
        ├── marabou-*.webp (6), shoebill-*.webp (6),
        │   kingvulture-*.webp (5), hoatzin-01.webp (1)   Every bird's spreads, 3000px wide
        └── small/                           The same at half size
```

## Design system quick reference

- **Palette:** paper `#F0EFE9`, ink `#121212`, grey `#6E6D67`, line `#C7C5BB`, plus the intro's neon orange `#FF5F1F` — all defined as CSS custom properties at the top of `style.css`.
- **Type:** just one sans serif and one mono. Geist for everything you read: its heaviest weight (Black, 900) for your name, the section numbers, the project names, the numbers in the opening index, the About text and your email, and regular weights for the summaries and body text. Geist Mono for small labels, info lines, buttons and the intro's welcome line. Every piece of text uses one of six roles, defined once at the top of `style.css`: display, lede, body, label, meta, button.
- **Chapter numbering:** projects are numbered 01/02/03 in the order they appear in the `projects` array in `data.js`.
- **One grid everywhere:** every project, About and Contact use the same two columns: a sidebar (a quarter of the width) for the text and the work (three quarters) as big as it can be. The opening screen's tagline and index line up with the same columns. On phones everything stacks and the imagery runs edge to edge, and each project runs number and name, then its main visual, then its text, then the rest of the work.
- **One sidebar format:** number, name, small info (year, role, specs), a one- or two-sentence summary, then Challenge / Approach / Outcome, then an optional detail block. On wide screens the sidebar stays beside the work while you scroll; if it's taller than the window, it scrolls until its last line is showing and stays there.
- **Imagery is never cropped, boxed or stretched.** Every project's work stacks one image under another at the full width of the work column: Arsvita's 3D model and spreads, Dozer's photos, The Pecking Order's birds. Dozer's Issue 02 shows one spread at a time instead, as big as fits the screen, with a slider bar to go through it (see *The spread slider* below). The opening strip shows every image at its own shape.
- **Getting around:** the running head along the top is clickable (your name goes to the top, the section's name lists every section), and a bar along the bottom goes to the previous or next section. See *Getting around* below.
- **Motion:** every slide on the site uses the same curve as After Effects' Easy Ease. Nothing fades in; the only fade is the intro handing over to the site. The strip and the 3D model move on their own, and each has a Pause button (an accessibility requirement for anything that moves for more than 5 seconds). With "reduce motion" turned on in the device's settings, none of them move by themselves. Dozer's spread slider never animates: each spread simply replaces the last.
- All of the content options are documented in the comment block at the top of `data.js`.

## The intro

Before anything else, your CHOCH logo animation plays full screen on neon orange (on phones and tablets it plays on the page colour, see below), with "Welcome to my site" wiping in underneath once the pieces have flown into place. The moment they snap together, the orange turns into the page colour; a beat later the logo fades away and the site does its own intro (your name typing itself out). It takes about three seconds, and clicking, tapping, scrolling or pressing a key skips it.

- **The logo is the site's exact black.** The animation is drawn onto a canvas that blends it with the page colour, so the logo is exactly `#121212` (the `--ink` colour) on the orange and on the page colour, with clean edges and motion blur. It works the same hosted or opened straight from disk.
- **Files** (in `images/intro/`): made from your `choch-logo-animated-loop.mp4`. `choch-logo-animated-loop.mp4` and `.webm` are the part of it the intro uses (fly in, snap, hold; the loop's reverse is left off) as a pure black logo on pure white (the canvas turns the black into the ink colour), framed so the finished logo sits dead centre. `choch-logo-animated-loop-still.png` is the finished logo, shown instead of the animation when a device asks for reduced motion or a video can't play (some phones in Low Power Mode). To swap in a new animation, export it as a black logo on a white background and send it over, or replace these files keeping the names (then add `?v=2` after the names in `index.html` so browsers fetch the new ones).
- **Change things:** the orange is `--intro` at the top of `style.css` (any #hex colour); just below it, phones and tablets set it to the page colour. The welcome line is `welcome` in `data.js`. Timings (when the colour changes, when it fades) are at the top of `intro.js`.
- **Safari's bars on iPhone stay the page colour.** Safari colours the bars at the top and bottom of the screen from what it finds in the very first frame and from anything fixed to the screen's edges, and then keeps that colour for the whole visit. So on phones and tablets the intro plays on the page colour: there's no orange for Safari to pick up at all. On computers it's orange; the intro still sits at the top of the page rather than being fixed to the screen, and while it's up, Safari's one look at the top of the page comes back empty on purpose (the slow do-nothing animation on `.intro-bg` in `style.css`), so the bars and tab colour take the page colour. Don't take that animation out.
- A link straight to a section (like `morganchoch.art/#work`) skips the intro and goes straight there. Scrolling, clicking, tapping or pressing a key skips it too.
- **It can't get stuck.** If the video is slow to arrive, freezes or can't play at all (iPhones in Low Power Mode don't play website videos, and the same goes for anyone who has Reduce Motion turned on), the finished logo shows on the orange instead, then the colour changes and the site starts as usual. If anything else goes wrong, the intro steps aside and the site starts, at most 10 seconds after the page is opened.
- Without JavaScript there's no intro and the site shows as normal. If `intro.js` is missing, the site starts straight away.

## The opening screen

After the intro, your name types itself out across the full width of the page in Geist Black (it's sized to fit exactly, on any screen). Then the work slides in from the right: work from every project, in order (all of Arsvita's spreads, then 24 of Dozer's photos and spreads picked evenly from start to finish, then The Pecking Order's finished birds), each at its own shape, in a gentle rhythm of sizes. It slides along to the next image every 1.5 seconds (change `STRIP_SLIDE_MS` and `STRIP_HOLD_MS` near the top of the strip code in `script.js` to adjust), loops back to the start seamlessly, and can be dragged or swiped. It keeps going round on its own; Pause stops it. Any image that can't be found is simply left out. Each image is captioned with its project and links to it, and the matching project lights up in the index underneath. The whole opening screen is kept shorter than the window so the start of project 01 is always visible below it.

It builds itself from the images in `data.js`, so it stays up to date as you add or remove work. To show a hand-picked set instead, add a `reel` list (see the notes at the top of `data.js`).

## Getting around

The running head along the top of the screen works like a breadcrumb. **Your name** goes back to the top of the page. **The section's name** (with the small arrow) opens a list of every section: the three projects with their numbers and years, then About and Contact, with the one you're in marked by a bar at its left. Escape, a click anywhere else, or tabbing out of it closes it.

Once you've scrolled past the opening screen, a bar along the bottom of the screen shows **← the previous section**, **Back to top** and **the next section →**, so you can step from one project straight to the next without scrolling through all of it. Both update themselves as you scroll, from the projects in `data.js`.

- Going to a section covers most of the distance in one go and glides the last stretch, so the browser doesn't load every spread it would pass on the way.
- Every spread's space is held at its final shape before it loads, so spreads above the section you land on can't push it out of place. Photos can be any shape, so they only take up room once they arrive: if one finishes loading while the page is still gliding to a section, the glide re-aims and still lands on the section. Browsers that can't keep the page still on their own get a hand from `script.js` for a few seconds after you arrive.
- Keyboard and screen reader users carry on from the section they went to. On touch screens the top bar is taller, so its links are easy to tap.
- Contact fills the last screen, so every section, the last ones included, can come up to the top when you go to it.

## The 3D model (Arsvita)

Arsvita opens on a 3D model of the book in its laser-cut acrylic stand, floating on the page with no floor or shadow. The 3D area is transparent, so the model sits straight on the page's own background colour (and stays matched if you change `--paper` in `style.css`). The cover is colour-matched to the printed blue, `#7FBFE9`.

The model turns slowly on its own, and every 5 seconds the stand fades away and comes back. There are no stand buttons. Visitors can drag it to turn it themselves (that holds the automatic movement until it's left alone again), and Pause stops all of its movement. All 23 spreads follow underneath, at full size.

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

Arsvita's and The Pecking Order's spreads show at the full width of the work column, one under another, the same way Dozer's photos do. Dozer's whole issue, far longer, is a spread slider instead (below). Each run starts with a small heading: "Inside the book" for Arsvita (under the 3D model), "Issue 02, cover to cover" for Dozer (after the photos), and each bird's name for The Pecking Order. Change a heading with `spreadsLabel` in `data.js`.

- **The page never jumps.** Each spread's space is held at the project's `aspect` (the width ÷ height of one spread) while it loads, in a soft placeholder tone until the picture arrives. Spreads load as they come near the screen, not all at once.
- **Covers sit centred at the same height as the spreads,** the size of one page. Put `cover` in the file's name (`cover.webp`, `back-cover.webp`) and screen readers call it the front or back cover; every other spread is read out as "spread 12 of 81".
- **Dozer's Issue 02** is the whole magazine, made from `handbookversionfinalforprint.pdf`: the front cover, all 81 spreads and the back cover, cut to the trim (no bleed). The few CMYK pictures and the black text were converted to screen colour with a U.S. Web Coated (SWOP) profile, InDesign's North American default, so they match what InDesign shows on screen. Each spread is 3000px wide (the covers 1500px), with a half-size copy in `images/dozer/small/` (`smallCopies: true` in `data.js`) that phones and smaller screens load instead, about a third of the data.
- **The Pecking Order** runs through every bird (the `birds` list in `data.js`). A bird with `status: "in-progress"`, currently the Hoatzin, is greyed out and labelled "Work in progress", and it's left out of the opening strip. When it's finished, change its status to `"complete"` and add its spreads.

## The spread slider

Dozer's Issue 02 is 83 spreads (the front cover, 81 spreads, the back cover), far too many to stack one under another. So it shows one at a time instead (`slider: true` in `data.js`), and the page scrolls past it as usual:

- **One spread at a time, as big as fits** between the bars at the top and bottom of the screen, so every spread is seen whole. On a laptop that's nearly the full width of the work column; on a phone it runs edge to edge. (On a phone turned on its side it's allowed to be a little taller than the screen, so it doesn't shrink to a stamp.) The covers sit centred, the size of one page.
- **The slider bar** under it is the whole issue, every spread side by side in order (`flatplan` in `data.js`, the file `images/dozer/flatplan.webp`), with a box around the one you're on. Drag along it to go through the issue, or click (or tap) anywhere on it to go straight there. With a mouse, the name of the spread under the pointer shows just above the bar.
- **One spread forward or back:** the arrows either side of "Spread 12 of 81", clicking the right or left half of the spread, swiping it on a phone, or swiping sideways with two fingers on a trackpad. The arrows grey out at the front and back covers. Nothing animates: each spread simply replaces the last.
- **Keyboard and screen readers:** with the spread selected, the left and right arrow keys go one spread at a time, and Home and End go to the covers. The bar works as a slider too (arrow keys, Page Up and Page Down jump ten spreads). Screen readers hear which spread they're on.
- **Sharp, and light on data.** Nothing loads until it's near the screen. On Retina laptops and big screens the full 3000px spreads load, with the ones either side loading ahead so the arrows show the next one straight away; phones and smaller, standard screens use the half-size copies, which are already sharper than those screens need. While you drag along the bar only half-size copies load, and a soft, blown-up copy from the bar stands in for a moment until each arrives.
- **Using it for another project:** add `slider: true` next to its `spreads`. The bar picture is optional; without one, a plain line shows where you are. If you change Dozer's spreads, the bar picture needs remaking: one image of every spread side by side in order, each an equal share of the width (ask me, or build it in InDesign).

## Images

Export images at least 3000px wide (spreads included). A high-resolution (Retina) screen needs twice as many pixels as the size an image is shown at, and the spreads fill the whole work column, so anything smaller looks soft. Nothing on the site is cropped, so you can export at each image's natural shape.

Every spread on the site is now 3000px wide, made straight from your PDFs: Arsvita from `ARSVITA MAYA.pdf`, The Pecking Order from `TPOMAG1.pdf` (both in Downloads) and Dozer from `handbookversionfinalforprint.pdf`. Each page is drawn at twice the final size and scaled down, so small type stays crisp, and saved as WebP (a sharper, smaller kind of image file every current browser shows). Arsvita and The Pecking Order keep exactly the colours of your earlier exports. Every spread also has a half-size copy in a `small` folder (`smallCopies: true` in `data.js`) for phones, smaller screens and the opening strip. The old 1600px and 1200px JPGs are still in their folders but nothing uses them, so they can be deleted.

Dozer's 7 photos are 2200px wide, enough for most laptop screens; if you have bigger originals, export them 3000px wide with the same names.

The opening strip keeps every image sharp on its own: an image is never shown bigger than its file has pixels for on the screen it's on, so a small file shows a little smaller instead of blurry, and grows back by itself once a bigger file replaces it.

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
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css?v=20261107c">
<!-- the intro covers the page from the very first frame (intro.js takes it
     from there). It plays when the page opens at the top, so a link straight
     to a section (…/#work) goes straight there, and a reload starts at the top.
     Without JavaScript there's no intro and the site shows as normal. -->
<script>
(function(r){
  r.classList.add("js");
  if (location.hash) return;
  r.classList.add("intro-on");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
})(document.documentElement);
</script>
</head>
<body>

<!-- INTRO: your logo animation on neon orange with a welcome line. When the
     pieces snap together the orange turns into the page colour, then it fades
     into the site and your name types itself out. See intro.js. -->
<div class="intro" id="intro" aria-hidden="true">
  <div class="intro-bg"></div>
  <div class="intro-stage">
    <div class="intro-logo">
      <video class="intro-video" muted playsinline preload="auto" disablepictureinpicture disableremoteplayback tabindex="-1">
        <source src="images/intro/choch-logo-animated-loop.mp4" type="video/mp4">
        <source src="images/intro/choch-logo-animated-loop.webm" type="video/webm">
      </video>
      <canvas class="intro-canvas"></canvas>
      <img class="intro-still" src="images/intro/choch-logo-animated-loop-still.png" alt="" decoding="async">
    </div>
    <p class="intro-welcome">Welcome to my site</p>
  </div>
</div>

<a class="skip-link" href="#work">Skip to the work</a>

<!-- running head, like a book's: names the section you're in. Your name goes
     back to the top; the section's name opens a list of every section. -->
<nav class="runhead" aria-label="Breadcrumb">
  <a class="runhead-name" href="#top"><span id="runhead-name"></span><span class="sr-only">, back to the top</span></a>
  <span class="runhead-mid" aria-hidden="true">/</span>
  <div class="runhead-menu">
    <button type="button" class="runhead-section" id="runhead-section" aria-expanded="false" aria-controls="section-menu">
      <span class="runhead-section-label" id="runhead-section-label">Portfolio</span><span class="sr-only">, all sections</span><span class="runhead-caret" aria-hidden="true"></span>
    </button>
    <div class="section-menu" id="section-menu" hidden>
      <ol class="section-menu-list" id="section-menu-list"></ol>
    </div>
  </div>
  <span class="runhead-progress-track" aria-hidden="true"><span id="scroll-progress" class="runhead-progress-fill"></span></span>
</nav>

<!-- HERO: your name types itself out across the page, then the work
     slides in underneath it: work from every project, in order,
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

<!-- along the bottom once you've scrolled down: the previous section, back
     to the top, the next section (script.js fills them in as you scroll) -->
<nav class="pager" aria-label="Previous and next">
  <a class="pager-link pager-prev" id="pager-prev" href="#top" hidden><span class="pager-arrow" aria-hidden="true">←</span><span class="pager-text"></span></a>
  <a class="pager-link pager-top" href="#top" aria-label="Back to top"><span class="pager-wide">Back to </span>top <span aria-hidden="true">↑</span></a>
  <a class="pager-link pager-next" id="pager-next" href="#top" hidden><span class="pager-text"></span><span class="pager-arrow" aria-hidden="true">→</span></a>
</nav>

<!-- "?v=..." makes browsers fetch these files fresh after an update.
     When you change style.css or a .js file, change the number here (and on style.css above). -->
<script src="data.js?v=20261107c"></script>
<script src="intro.js?v=20261107c"></script>
<script src="arsvita-3d.js?v=20261107c"></script>
<script src="script.js?v=20261107c"></script>
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
  --intro: #FF5F1F;              /* the neon orange behind your logo at the start (any #hex colour); phones use the page colour, see below */

  /* just one sans serif and one mono: Geist for everything you read
     (its heaviest weight for your name, numbers, project names, the About
     text and your email; regular weights for the rest), Geist Mono for
     small labels and info */
  --f-display: "Geist", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --f-text: "Geist", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --f-mono: "Geist Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace;

  --placeholder: #E6E4DC;        /* where a spread will show, while it loads */

  --gutter: clamp(1rem, 2.2vw, 2rem);
  --runhead-h: 2rem;
  --tap: 2.75rem;                /* 44px minimum touch target */

  /* motion: the same curve as After Effects' Easy Ease, everywhere */
  --easy: cubic-bezier(0.33, 0, 0.67, 1);

  /* the grid: sidebar (text) + main (the work) */
  --col-rail: minmax(17.5rem, 1fr);
  --col-main: minmax(0, 3fr);
}
/* phones and tablets: the intro plays on the page colour instead of orange,
   so there's no orange anywhere for Safari to colour its bars with */
@media (hover: none) and (pointer: coarse), (max-width: 599px){
  :root{ --intro: var(--paper); }
}
/* touch screens: a taller bar along the top, so its links are easy to tap */
@media (pointer: coarse){
  :root{ --runhead-h: 2.75rem; }
}

*{ box-sizing: border-box; }
html{ scroll-behavior: smooth; scroll-padding-top: var(--runhead-h); }
@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior: auto; }
  *, *::before, *::after{ animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; transition-delay: 0s !important; }
}
body{
  margin: 0;
  padding-bottom: 3.25rem;       /* room for the bar along the bottom */
  background: var(--paper);
  color: var(--ink);
  font-family: var(--f-text);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
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
[hidden]{ display: none !important; }
/* a section you've gone to takes focus (so the keyboard carries on from
   there), but it isn't a control, so it gets no focus ring */
.section:focus, .hero:focus, .work:focus{ outline: none; }
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
/* 1. display: your name, section numbers, project names.
      A plain sans serif (Geist) at its heaviest weight. */
.hero-name, .rail-num, .rail-name, .hero-index-num{
  font-family: var(--f-display);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}
.hero-name{ letter-spacing: -0.04em; }
/* 2. lede: tagline, summaries, about */
.hero-tagline, .rail-summary, .section-lede{
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
/* 4. label: small headings, nav, buttons, the intro's welcome line */
.rail-label, .media-label, .hero-nav a, .ctl-btn, .wip-badge, .pager-link, .skip-link, .intro-welcome{
  font-family: var(--f-mono);
  font-weight: 500;
  font-size: 0.72rem;
  line-height: 1.2;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
/* 5. meta: small info lines, counters, captions */
.rail-facts, .hero-role, .hero-index-year, .strip-cap, .model3d-note, .section-menu-year,
.runhead, .contact-social, .model3d-loading, .model3d-hint, .viewer-count, .viewer-tip{
  font-family: var(--f-mono);
  font-weight: 400;
  font-size: 0.78rem;
  line-height: 1.45;
  letter-spacing: 0;
}

/* ────────────────────────────────────────────────────────────
   INTRO: your logo animation on neon orange. When the pieces snap
   together the orange turns into the page colour, then the whole
   screen fades into the site. Only shown when JavaScript runs.
   ──────────────────────────────────────────────────────────── */
.intro{ display: none; }
/* Safari on iPhone colours the bars at the top and bottom of the screen
   from what it finds there, and then keeps that colour: it takes a sample
   of the top of the page once, from the first frame, and it holds on to
   the colour of anything fixed to the screen's edges. An orange intro
   fixed to the screen would leave both bars orange for the whole visit.
   So the intro is never fixed to the screen: it sits at the top of the
   page, covering it until it fades away (the page always opens at the
   top while it plays). And while it's up, Safari's one-time sample of the
   top of the page is spoiled on purpose (the slow do-nothing animation on
   .intro-bg below), so Safari falls back to the page colour instead.
   Result: the bars are always the page colour, never orange. */
.intro-on .intro{
  position: absolute; top: 0; left: 0; z-index: 1000;
  width: 100%;
  height: 100vh;
  height: 100svh;                  /* the screen with the browser's bars showing: the logo centres in what you see */
  display: grid; place-items: center;
  padding: var(--gutter);
  background: transparent;         /* the colour is on .intro-bg */
  color: var(--ink);
  /* failsafe: if intro.js never runs, step out of the way */
  animation: intro-failsafe 0.01s step-start 9s forwards;
}
@keyframes intro-failsafe{ to{ visibility: hidden; } }
.intro-bg{
  position: absolute; top: 0; left: 0; right: 0;
  height: 100vh;
  height: 100lvh;                  /* reaches all the way down, behind the browser's bottom bar */
  background: var(--intro);
  animation: intro-hold 2s linear infinite;
}
@keyframes intro-hold{ from, to{ opacity: 1; } }
.intro-stage{ z-index: 1; }
.intro-on .pager{ display: none; }
.intro.is-leaving{ opacity: 0; pointer-events: none; transition: opacity var(--intro-fade, 0.7s) var(--easy); }
.intro-stage{ position: relative; width: min(100%, 32.875rem); }
.intro-logo{ position: relative; aspect-ratio: 1052 / 838; }   /* the animation's frame size */
.intro-video, .intro-canvas, .intro-still{ position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
/* the video plays underneath; the canvas on top shows it in your exact black */
.intro-video, .intro-canvas, .intro-still{ visibility: hidden; }
.intro.is-ready .intro-video, .intro.is-ready .intro-canvas{ visibility: visible; }
.intro.is-still .intro-still{ visibility: visible; }
.intro.is-still .intro-video, .intro.is-still .intro-canvas{ visibility: hidden; }
.intro-welcome{
  position: absolute; left: 0; right: 0; top: 71%;
  font-size: clamp(0.82rem, 1.35vw, 1.02rem);
  font-weight: 700;
  text-align: center;
  clip-path: inset(0 0 100% 0);
  transform: translateY(0.6rem);
}
.intro.is-welcome .intro-welcome{
  clip-path: inset(0 0 0 0); transform: none;
  transition: clip-path 0.45s var(--easy), transform 0.45s var(--easy);
}

/* ────────────────────────────────────────────────────────────
   RUNNING HEAD: your name goes back to the top; the section's name
   is a button that opens a list of every section
   ──────────────────────────────────────────────────────────── */
.runhead{
  position: sticky; top: 0; z-index: 20;
  display: flex; gap: 0.6em; align-items: center;
  height: var(--runhead-h);
  padding: 0 var(--gutter);
  font-size: 0.72rem;
  background: var(--paper);
  color: var(--grey);
  white-space: nowrap;
}
.runhead-name, .runhead-section{
  display: inline-flex; align-items: center;
  height: var(--runhead-h);
  color: inherit;
  text-decoration: none;
  transition: color 0.35s var(--easy);
}
.runhead-name{ flex: 0 0 auto; }
.runhead-name:hover{ color: var(--ink); }
.runhead-mid{ opacity: 0.6; }
.runhead-menu{ display: flex; min-width: 0; }      /* the list hangs from the whole bar, see .section-menu */
.runhead-section{
  gap: 0.55em;
  min-width: 0;
  margin: 0; padding: 0;
  font: inherit; letter-spacing: inherit;
  color: var(--ink);
  background: none; border: 0; border-radius: 0;
  cursor: pointer;
}
.runhead-section-label{ overflow: hidden; text-overflow: ellipsis; }
.runhead-section:hover .runhead-section-label,
.runhead-section[aria-expanded="true"] .runhead-section-label{ text-decoration: underline; text-underline-offset: 0.25em; }
/* a small chevron that turns over while the list is open */
.runhead-caret{
  flex: 0 0 auto;
  width: 0.45em; height: 0.45em;
  margin-top: -0.25em;
  border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.35s var(--easy), margin-top 0.35s var(--easy);
}
.runhead-section[aria-expanded="true"] .runhead-caret{ transform: rotate(225deg); margin-top: 0.2em; }
.runhead-progress-track{ position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--line); }
.runhead-progress-fill{ display: block; height: 100%; width: 0%; background: var(--ink); }

/* the list of sections, laid out like the index on the opening screen */
.section-menu{
  position: absolute; top: 100%; left: var(--gutter);
  width: min(27rem, calc(100% - 2 * var(--gutter)));
  max-height: calc(100vh - var(--runhead-h) - 1rem);
  max-height: calc(100dvh - var(--runhead-h) - 1rem);
  overflow-y: auto;
  background: var(--paper);
  border: 1px solid var(--ink);
  white-space: normal;
}
.section-menu-list{ list-style: none; padding: 0; }
.section-menu-list li + li .section-menu-row{ border-top: 1px solid var(--line); }
.section-menu-row{
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr) auto;
  column-gap: 0.75rem;
  align-items: baseline;
  min-height: var(--tap);
  padding: 0.7rem 1rem;
  color: var(--grey);
  text-decoration: none;
  transition: color 0.35s var(--easy), background-color 0.35s var(--easy);
}
.section-menu-row:hover, .section-menu-row[aria-current="true"]{ color: var(--ink); }
.section-menu-row:hover{ background: var(--placeholder); }
.section-menu-num{ font-family: var(--f-display); font-weight: 900; font-size: 1.35rem; line-height: 0.9; letter-spacing: -0.03em; }
.section-menu-title{ font-family: var(--f-text); font-weight: 600; font-size: 1rem; line-height: 1.2; }
.section-menu-year{ text-align: right; }
/* the section you're in is marked with a short bar at its left */
.section-menu-row[aria-current="true"]{ box-shadow: inset 3px 0 0 var(--ink); }
@media (max-width: 599px){
  .section-menu{ left: 0; width: 100%; border-left: 0; border-right: 0; }
  .section-menu-row{ padding-left: var(--gutter); padding-right: var(--gutter); }
}

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
.project .media-secondary{ grid-area: secondary; min-width: 0; padding-bottom: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
.project .model3d-foot, .project .media-label{ margin-left: var(--gutter); margin-right: var(--gutter); }

@media (min-width: 900px){
  .section{ grid-template-columns: var(--col-rail) var(--col-main); }
  .rail{ border-right: 1px solid var(--line); position: sticky; top: var(--runhead-h); align-self: start; }
  .project{ grid-template-areas: "rail main"; }
  .project .rail{ display: block; grid-area: rail; }
  .project .rail-head, .project .rail-body{ padding: 0; }
  .project .rail-body{ margin-top: 1.75rem; }
  .project .section-main{ display: flex; grid-area: main; gap: 1rem; }
  .project .media-secondary{ padding-bottom: 0; }
  .project .model3d-foot, .project .media-label{ margin-left: 0; margin-right: 0; }
}

/* ---- sidebar: identical for every section ---- */
.rail-num{ display: block; font-size: clamp(3.75rem, 7vw, 7rem); line-height: 0.78; letter-spacing: -0.045em; }
.rail-name{ margin-top: 0.8rem; font-size: clamp(1.9rem, 2.7vw, 2.8rem); line-height: 0.92; }
.rail-facts{ list-style: none; padding: 0; margin-top: 1rem; display: grid; gap: 0.2rem; color: var(--grey); }
.rail-body{ max-width: 60ch; }
.rail-summary{ font-size: clamp(1.1rem, 1.35vw, 1.25rem); line-height: 1.32; }
.rail-block{ margin-top: 1.4rem; }
.rail-label{ color: var(--grey); margin-bottom: 0.4rem; }
.rail-detail{ margin-top: 1.75rem; padding-top: 1rem; border-top: 1px solid var(--line); }
/* names that switch by themselves (Dozer's "As seen with"):
   capitals in the body font */
.switcher{
  position: relative;
  height: 2.05em;
  font-size: clamp(1.6rem, 2vw, 2rem);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  overflow: hidden;
}
.switcher-item{
  position: absolute; left: 0; top: 0; right: 0;
  transform: translateY(105%);
  transition: transform 0.9s var(--easy);
}
.switcher-item.is-on{ transform: none; }
.switcher-item.is-off{ transform: translateY(-105%); }
.switcher.is-static{ height: auto; font-family: var(--f-text); font-size: 1rem; font-weight: 500; text-transform: none; line-height: 1.5; }
/* in a project's details the names are body-sized, so the window is exactly
   one line tall (otherwise the top of the next name peeks in underneath) */
.rail-detail .switcher:not(.is-static){ height: 1.55em; }
.rail-detail-image{ margin: 0.4rem 0 0.9rem; }
.rail-detail-image img{ display: block; width: 46%; max-width: 12rem; height: auto; margin: 0 auto; }   /* centred in the sidebar */

/* ────────────────────────────────────────────────────────────
   THE WORK: every image at the full width of the main column, one
   under another, never cropped. Each run (the spreads, each bird, the
   process) starts with a small heading.
   ──────────────────────────────────────────────────────────── */
.media-stack{ display: flex; flex-direction: column; gap: 1rem; }
.media-stack > img, .media-stack .spread-img{ display: block; width: 100%; height: auto; }
.media-run{ display: flex; flex-direction: column; }
.media-label{
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line);
  color: var(--grey);
}
.media-primary > .media-label{ margin-top: 0; }   /* a project that opens with a heading */
.media-placeholder{
  aspect-ratio: 16 / 10; display: flex; align-items: flex-end; justify-content: flex-end; padding: 0.75rem;
  font-family: var(--f-mono); font-size: 0.78rem; color: var(--grey);
  background: repeating-linear-gradient(135deg, var(--paper) 0 2px, var(--line) 2px 3px);
}

/* ---- spreads: each one's space is held at the project's shape ("aspect"
   in data.js) while it loads, so the page never jumps. A single page,
   like a cover, sits centred in that space at the same height. ---- */
.spread-img{ object-fit: contain; background: var(--placeholder); }
.spread-img.is-loaded{ background: none; }
.spread{ position: relative; }
/* unfinished work: greyed out and labelled */
.spread.is-wip .spread-img{ filter: grayscale(1); opacity: 0.4; }
.wip-badge{
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.7rem 1.05rem;
  font-size: 0.78rem;
  color: var(--paper);
  background: var(--ink);
  white-space: nowrap;
}

/* ---- the spread slider ("slider" in data.js, used by Dozer): one
   spread at a time, as big as fits the screen (script.js sizes it), with
   a bar under it that runs through every spread. The page scrolls past
   it as usual. ---- */
.viewer{ display: flex; flex-direction: column; align-items: center; }
.viewer-frame{
  position: relative;
  width: var(--viewer-w, 100%);
  aspect-ratio: var(--aspect, 1.414);
  /* until the picture arrives: the spread's tiny copy from the bar, blown up */
  background: var(--plan, none) no-repeat var(--placeholder);
  background-size: var(--plan-size, auto);
  background-position: var(--plan-pos, 0 0);
  touch-action: pan-y pinch-zoom;          /* swipe sideways for the next spread; up and down still scrolls */
  -webkit-user-select: none; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.viewer-frame.is-loaded{ background: none; }
.viewer-frame:focus-visible{ outline: 3px solid var(--ink); outline-offset: 6px; }
.viewer-img{
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: contain;                     /* a cover, one page, sits centred */
  pointer-events: none;
}
.viewer-img[hidden]{ display: none; }
/* click the right half for the next spread, the left half for the one before */
.viewer-side{ position: absolute; top: 0; bottom: 0; width: 50%; }
.viewer-side-prev{ left: 0; cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect x='.75' y='.75' width='34.5' height='34.5' fill='%23F0EFE9' stroke='%23121212' stroke-width='1.5'/%3E%3Cpath d='M26 18H11M16 13l-5 5 5 5' fill='none' stroke='%23121212' stroke-width='1.75'/%3E%3C/svg%3E") 18 18, w-resize; }
.viewer-side-next{ right: 0; cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect x='.75' y='.75' width='34.5' height='34.5' fill='%23F0EFE9' stroke='%23121212' stroke-width='1.5'/%3E%3Cpath d='M10 18h15M20 13l5 5-5 5' fill='none' stroke='%23121212' stroke-width='1.75'/%3E%3C/svg%3E") 18 18, e-resize; }
.viewer.at-start .viewer-side-prev, .viewer.at-end .viewer-side-next{ cursor: default; }
/* under it: the arrows either side of "Spread 12 of 81", then the bar */
.viewer-foot{
  width: var(--viewer-w, 100%);
  display: flex; align-items: center; gap: 1.25rem;
  margin-top: 0.75rem;
}
.viewer-nav{ flex: 0 0 auto; display: flex; align-items: center; gap: 0.6rem; }
.viewer-nav .ctl-btn{ width: var(--tap); padding: 0; font-size: 1rem; }
.viewer-nav .ctl-btn[aria-disabled="true"],
.viewer-nav .ctl-btn[aria-disabled="true"]:hover{ opacity: 0.3; cursor: default; background: transparent; color: var(--ink); }
.viewer-count{ min-width: 8.6em; text-align: center; color: var(--grey); }
/* the bar: every spread in order, each an equal share of its width */
.viewer-bar{
  position: relative;
  flex: 1 1 auto; min-width: 0;
  padding: 0.9rem 0;
  cursor: pointer;
  touch-action: none;
  -webkit-user-select: none; user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.viewer-plan{ display: block; width: 100%; height: 12px; object-fit: fill; }
.viewer-bar.is-line::before{ content: ""; display: block; height: 2px; margin: 5px 0; background: var(--ink); }
.viewer-bar:focus-visible{ outline: none; }
.viewer-bar:focus-visible .viewer-knob{ box-shadow: 0 0 0 2px var(--paper), 0 0 0 4px var(--ink); }   /* selected with the keyboard */
/* the handle: a box around the spread you're on */
.viewer-knob{
  position: absolute; top: 50%;
  left: calc((var(--at, 0) + 0.5) * 100% / var(--n, 1));
  width: max(calc(100% / var(--n, 1) + 4px), 12px);
  height: 26px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--ink);
  pointer-events: none;
}
.viewer.is-dragging, .viewer.is-dragging .viewer-bar{ cursor: grabbing; }
/* the name of the spread under the pointer, just above the bar */
.viewer-tip{
  position: absolute; bottom: calc(100% - 0.35rem); left: 0;
  transform: translateX(-50%);
  padding: 0.25rem 0.5rem;
  color: var(--paper);
  background: var(--ink);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s var(--easy);
}
.viewer-bar.is-hover .viewer-tip, .viewer.is-dragging .viewer-tip{ opacity: 1; }
@media (max-width: 599px){
  /* phones: the bar right under the spread, then the arrows either side of the count */
  .viewer-foot{ flex-wrap: wrap; row-gap: 0; padding: 0 var(--gutter); }
  .viewer-foot .viewer-bar{ order: -1; flex-basis: 100%; }
  .viewer-nav{ flex: 1 1 100%; justify-content: space-between; }
}
@media (pointer: coarse){ .viewer-bar{ padding: 1.05rem 0; } }   /* an easy bar to put a thumb on */

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
/* the last section fills the screen, so that like every other section it
   can come up to the top: going to it (or to About) lands right on it */
#contact{ min-height: calc(100vh - var(--runhead-h) - 3.25rem); align-content: start; }
@supports (height: 100svh){ #contact{ min-height: calc(100svh - var(--runhead-h) - 3.25rem); } }
/* the About text and your email: the same heavy sans serif as your name */
.section-lede{
  max-width: 30ch; font-size: clamp(1.35rem, 2.4vw, 2.1rem); line-height: 1.25;
  font-family: var(--f-display); font-weight: 900; letter-spacing: -0.02em;
}
.contact-email{
  display: inline-block; align-self: flex-start; max-width: 100%;
  font-family: var(--f-display); font-weight: 900;
  font-size: clamp(1.1rem, 4.2vw, 3rem); letter-spacing: -0.03em;
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
   ALONG THE BOTTOM: only appears once you've scrolled down. The
   previous section, back to the top, the next section.
   ──────────────────────────────────────────────────────────── */
.pager{
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 1.25rem;
  padding: 0 var(--gutter);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: var(--paper);
  border-top: 1px solid var(--ink);
  transform: translateY(100%);
  visibility: hidden;
  transition: transform 0.6s var(--easy), visibility 0s linear 0.6s;
}
body.is-scrolled .pager{ transform: none; visibility: visible; transition: transform 0.6s var(--easy), visibility 0s; }
.pager-link{
  display: flex; align-items: center; gap: 0.6em;
  min-width: 0; max-width: 100%;
  min-height: var(--tap);
  text-decoration: none;
  transition: color 0.35s var(--easy);
}
.pager-prev{ grid-column: 1; justify-self: start; }
.pager-top{ grid-column: 2; }
.pager-next{ grid-column: 3; justify-self: end; }
.pager-text{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pager-arrow{ flex: 0 0 auto; }
.pager-link:hover{ color: var(--grey); }
@media (max-width: 599px){
  .pager{ column-gap: 0.75rem; }
  .pager-wide{ display: none; }
}

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
  // the half-size copy of an image: same name, in a "small" folder next to it
  function smallCopy(src){
    const i = String(src).lastIndexOf("/");
    return src.slice(0, i + 1) + "small/" + src.slice(i + 1);
  }

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
  // THE STRIP: work from every project, in order, each image at its
  // own shape and size (never cropped), sliding along to the next one
  // with Easy Ease. Loops seamlessly. Drag or swipe to move it
  // yourself; hover or Pause to stop it. Each image links to its project.
  // Every image is kept sharp: it's never shown bigger than its file
  // has pixels for on the screen it's on (a high-resolution screen
  // needs twice the pixels), so a small file shows a little smaller
  // instead of blurry. Export bigger files and they grow back by themselves.
  // ────────────────────────────────────────────────────────────
  const strip = document.getElementById("strip");
  const track = document.getElementById("strip-track");
  const pauseBtn = document.getElementById("strip-pause");
  const SIZES = [1, 0.8, 0.92, 0.74, 1, 0.86];          // gentle rhythm of image sizes
  const LOAD_AHEAD = 14;                                // images loaded ahead of the one on screen
  const STRIP_PER_PROJECT = 24;                         // most images any one project shows in the strip

  // every photo and spread of every project, in order. A project with more
  // than STRIP_PER_PROJECT shows that many, picked evenly from start to
  // finish. Spreads with half-size copies use those (the strip is small).
  function autoReel(){
    const out = [];
    d.projects.forEach(p => {
      const spreads = p.spreads || [];
      const all = [];
      (p.images || []).forEach(src => { if (spreads.indexOf(src) < 0) all.push(src); });
      spreads.forEach(src => all.push(p.smallCopies ? smallCopy(src) : src));
      (p.birds || []).filter(b => b.status !== "in-progress").forEach(b => b.spreads.forEach(src => all.push(p.smallCopies ? smallCopy(src) : src)));
      const n = all.length, max = STRIP_PER_PROJECT;
      const pick = n <= max ? all : Array.from({ length: max }, (_, k) => all[Math.floor(k * n / max)]);
      pick.forEach(src => out.push({ src, project: p.id }));
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
  // pixels the screen packs into one CSS pixel (2 on a Retina screen);
  // past 2 the eye can't tell the difference, so it stops counting there
  const sharpScale = () => Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
  function sizeItem(a){
    const nh = +a.dataset.nh || 0, nw = +a.dataset.nw || 0;
    let h = stripH * (+a.dataset.f || 1);
    if (nh) h = Math.min(h, nh / sharpScale());           // never bigger than the file can show sharply
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

  function model3dMarkup(p){
    const poster = p.model3d.poster ? `<img class="model3d-poster" src="${esc(p.model3d.poster)}" alt="" loading="lazy" decoding="async">` : "";
    return `
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
      </div>`;
  }

  // One spread. Its space is held at the project's "aspect" while it loads,
  // so the page never jumps; a single page (a cover) sits centred in that
  // space, at the same height as the spreads. With "smallCopies", phones
  // and smaller screens load the half-size copy instead of the full one.
  const SPREAD_SIZES = "(min-width: 900px) 75vw, 100vw";
  function spreadImg(p, src, alt){
    const set = p.smallCopies ? ` srcset="${esc(smallCopy(src))} 1500w, ${esc(src)} 3000w" sizes="${SPREAD_SIZES}"` : "";
    return `<img class="spread-img" src="${esc(src)}"${set} alt="${esc(alt)}" style="aspect-ratio:${+p.aspect || 1.414}" loading="lazy" decoding="async">`;
  }
  // what a screen reader says for each spread: covers by name, the rest counted
  function spreadAlts(title, list){
    const isCover = src => /(^|[\/_-])(back-?)?cover[^\/]*$/i.test(src);
    const inner = list.filter(src => !isCover(src)).length;
    let k = 0;
    return list.map(src => {
      if (isCover(src)) return `${title}, ${/back-?cover[^\/]*$/i.test(src) ? "back cover" : "front cover"}`;
      k++;
      return `${title}, spread ${k} of ${inner}`;
    });
  }

  // The spread slider ("slider" in data.js): one spread at a time, as big
  // as fits the screen, with a bar under it that runs through every
  // spread. It's filled in by the SPREAD SLIDER code below.
  function viewerMarkup(p, spreads){
    const n = spreads.length;
    return `
      <div class="viewer" data-viewer="${esc(p.id)}" style="--aspect:${+p.aspect || 1.414};--n:${n}">
        <div class="viewer-frame" tabindex="0" role="region" aria-roledescription="spread viewer"
             aria-label="${esc(p.title)}, ${n} spreads and covers, one at a time. Use the left and right arrow keys, the arrow buttons or the slider to go through them.">
          <img class="viewer-img" alt="" decoding="async" draggable="false" hidden>
          <div class="viewer-side viewer-side-prev" aria-hidden="true"></div>
          <div class="viewer-side viewer-side-next" aria-hidden="true"></div>
        </div>
        <div class="viewer-foot">
          <div class="viewer-nav">
            <button type="button" class="ctl-btn viewer-prev" aria-label="Previous spread">←</button>
            <span class="viewer-count" aria-hidden="true"></span>
            <button type="button" class="ctl-btn viewer-next" aria-label="Next spread">→</button>
          </div>
          <div class="viewer-bar${p.flatplan ? "" : " is-line"}" role="slider" tabindex="0" aria-label="${esc(p.title)}, every spread"
               aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="1">
            ${p.flatplan ? `<img class="viewer-plan" src="${esc(p.flatplan)}" alt="" loading="lazy" decoding="async" draggable="false">` : ""}
            <span class="viewer-knob" aria-hidden="true"></span>
            <span class="viewer-tip" aria-hidden="true"></span>
          </div>
        </div>
        <p class="sr-only viewer-say" aria-live="polite"></p>
      </div>`;
  }

  // The work, as runs of images: the 3D model, the photos, the spreads,
  // each bird, the process, each run under its own small heading (the
  // photos have none). The very first image is the "primary": on
  // phones it sits between the project's name and its text, and everything
  // else follows the text. Every image runs the full width of the column,
  // one under another, never cropped.
  function mediaMarkup(p){
    const runs = [];
    if (p.model3d && p.model3d.src) runs.push({ bare: true, items: [model3dMarkup(p)] });
    const spreads = p.spreads || [];
    const photos = (p.images || []).filter(src => spreads.indexOf(src) < 0);
    if (photos.length) runs.push({ items: photos.map((src, i) =>
      // the first photo loads straight away, as it's near the top of the project
      `<img src="${esc(src)}" alt="${esc(p.title)}, photo ${i + 1} of ${photos.length}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async">`) });
    if (spreads.length > 1 && (p.slider || p.flipThrough)) {
      runs.push({ label: p.spreadsLabel || p.flipLabel, bare: true, items: [viewerMarkup(p, spreads)] });
    } else if (spreads.length) {
      const alts = spreadAlts(p.title, spreads);
      runs.push({ label: p.spreadsLabel || p.flipLabel, items: spreads.map((src, i) => spreadImg(p, src, alts[i])) });
    }
    (p.birds || []).forEach(b => {
      const wip = b.status === "in-progress";
      runs.push({ label: b.name, items: (b.spreads || []).map((src, i) => {
        const img = spreadImg(p, src, `${p.title}, ${b.name}, spread ${i + 1} of ${b.spreads.length}${wip ? ", work in progress" : ""}`);
        return wip ? `<div class="spread is-wip">${img}<span class="wip-badge" aria-hidden="true">Work in progress</span></div>` : img;
      }) });
    });
    const proc = p.processImages || [];
    if (proc.length) runs.push({ label: "Process", items: proc.map(src =>
      `<img src="${esc(src)}" alt="${esc(p.title)}, process image" loading="lazy" decoding="async">`) });
    const filled = runs.filter(r => r.items.length);
    if (!filled.length) return { primary: `<div class="media-placeholder">Images coming soon</div>`, secondary: "" };

    const head = r => r.label ? `<h3 class="media-label">${esc(r.label)}</h3>` : "";
    const stack = items => `<div class="media-stack">${items.join("")}</div>`;
    const first = filled[0];
    const primary = first.bare ? head(first) + first.items[0] : head(first) + stack(first.items.slice(0, 1));
    let secondary = first.items.length > 1 ? stack(first.items.slice(1)) : "";
    filled.slice(1).forEach(r => { secondary += `<div class="media-run">${head(r)}${r.bare ? r.items.join("") : stack(r.items)}</div>`; });
    return { primary, secondary };
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
      <div class="section-main">
        <div class="media-primary">${media.primary}</div>
        ${media.secondary ? `<div class="media-secondary">${media.secondary}</div>` : ""}
      </div>`;
    section.querySelector(".rail-name").id = "project-title-" + p.id;
    workRoot.appendChild(section);
  });
  // spreads show a soft placeholder tone where they'll be, until they've loaded
  workRoot.querySelectorAll(".spread-img").forEach(img => {
    const loaded = () => img.classList.add("is-loaded");
    if (img.complete && img.naturalWidth) loaded();
    else img.addEventListener("load", loaded, { once: true });
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

  // focus rings show for keyboard users only, never after a click or tap
  document.querySelectorAll(".model3d-stage, .strip").forEach(el => {
    el.addEventListener("pointerdown", () => el.setAttribute("data-pointer", ""));
    el.addEventListener("keydown", () => el.removeAttribute("data-pointer"));
  });

  // ────────────────────────────────────────────────────────────
  // 3D MODEL: turns on its own, and its stand fades away and comes
  // back by itself. Drag to turn it; Pause stops all its movement.
  // The model file is a few MB, so it only loads when the project
  // is about to scroll into view, and never while the intro is playing
  // (Arsvita is the first project, right under the opening screen).
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
    const afterIntro = window.Intro && window.Intro.done ? window.Intro.done : Promise.resolve();
    afterIntro.then(() => {
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(es => { if (es.some(en => en.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "700px 0px" });
        io.observe(stage);
      } else start();
    });
  });

  // ────────────────────────────────────────────────────────────
  // SPREAD SLIDER ("slider" in data.js, used by Dozer): one spread at a
  // time, as big as fits between the bars at the top and bottom of the
  // screen, and the page scrolls past it as usual. The bar under it is
  // the whole issue, every spread in order: drag along it, or click
  // anywhere on it, to go through them. The arrows go one spread at a
  // time, and so does clicking the right or left half of the spread,
  // swiping it (on a phone, or sideways on a trackpad), or the left and
  // right arrow keys.
  // ────────────────────────────────────────────────────────────
  const viewers = [];
  document.querySelectorAll("[data-viewer]").forEach(root => {
    const p = projectById[root.dataset.viewer];
    const aspect = +p.aspect || 1.414;
    const spreads = p.spreads;
    const N = spreads.length, last = N - 1;
    const frame = root.querySelector(".viewer-frame");
    const img = root.querySelector(".viewer-img");
    const foot = root.querySelector(".viewer-foot");
    const count = root.querySelector(".viewer-count");
    const bar = root.querySelector(".viewer-bar");
    const planImg = root.querySelector(".viewer-plan");
    const tip = root.querySelector(".viewer-tip");
    const say = root.querySelector(".viewer-say");
    const prevBtn = root.querySelector(".viewer-prev");
    const nextBtn = root.querySelector(".viewer-next");

    // what each one is called: the covers by name, the rest counted
    const alts = spreadAlts(p.title, spreads);
    const isBack = src => /back-?cover[^\/]*$/i.test(src);
    const isFront = src => !isBack(src) && /(^|[\/_-])cover[^\/]*$/i.test(src);
    const inner = spreads.filter(src => !isFront(src) && !isBack(src)).length;
    let k = 0;
    const labels = spreads.map(src => isFront(src) ? "Front cover" : isBack(src) ? "Back cover" : `Spread ${++k} of ${inner}`);

    // Pictures. Where the spread shows bigger than the half-size copies
    // (a laptop or desktop), the full-size ones load; phones use the
    // half-size copies, already sharper than their screens need. The
    // spread you're on loads first, then the ones either side of it, so
    // the arrows show the next one straight away. While you drag along the
    // bar, only the half-size copy of the spread you're on loads, and the
    // full one once you let go.
    const small = src => p.smallCopies ? smallCopy(src) : src;
    let wantFull = !p.smallCopies;
    const best = src => wantFull ? src : small(src);
    const ready = new Set(), loading = new Set(), failed = new Set();
    let queue = [], near = false, at = 0, dragging = false;
    function pump(){
      while (loading.size < 2 && queue.length) {
        const url = queue.shift();
        if (ready.has(url) || loading.has(url) || failed.has(url)) continue;
        loading.add(url);
        const im = new Image();
        im.decoding = "async";
        const done = ok => { loading.delete(url); (ok ? ready : failed).add(url); if (ok) show(); pump(); };
        im.onload = () => { if (im.decode) im.decode().then(() => done(true), () => done(true)); else done(true); };
        im.onerror = () => done(false);
        im.src = url;
      }
    }
    function want(){
      if (!near) return;
      const list = [];
      const add = url => { if (!ready.has(url) && !loading.has(url) && !failed.has(url) && list.indexOf(url) < 0) list.push(url); };
      if (dragging) add(small(spreads[at]));
      else [at, at + 1, at - 1, at + 2].forEach(j => { if (j >= 0 && j <= last) add(best(spreads[j])); });
      queue = list;
      pump();
    }
    function show(){
      const f = spreads[at], s = small(f);
      const url = !near ? null : ready.has(f) ? f : ready.has(s) ? s : null;
      if (url) {
        if (img.getAttribute("src") !== url) img.src = url;
        img.alt = alts[at];
        img.hidden = false;
      } else img.hidden = true;
      frame.classList.toggle("is-loaded", !!url);
    }

    // until a spread's picture arrives, its tiny copy from the bar stands
    // in, blown up to size: soft, but the right spread at once
    let plan = null;
    function placePlan(){
      const W = frame.clientWidth;
      if (!plan || !W) return;
      const s = W / (plan.h * aspect);               // in the strip, each spread is the strip's height tall, at its own shape
      frame.style.setProperty("--plan-size", `${(plan.w * s).toFixed(1)}px ${(plan.h * s).toFixed(1)}px`);
      frame.style.setProperty("--plan-pos", `${(-at * plan.w / N * s).toFixed(1)}px 0`);
    }
    if (planImg) {
      const got = () => {
        if (!planImg.naturalWidth) return;
        plan = { w: planImg.naturalWidth, h: planImg.naturalHeight };
        frame.style.setProperty("--plan", `url("${planImg.currentSrc || planImg.src}")`);
        placePlan();
      };
      if (planImg.complete) got(); else planImg.addEventListener("load", got, { once: true });
    }

    // go to spread i: the picture, the count, the handle on the bar
    function update(){
      root.style.setProperty("--at", at);
      count.textContent = labels[at];
      bar.setAttribute("aria-valuenow", at + 1);
      bar.setAttribute("aria-valuetext", labels[at]);
      prevBtn.setAttribute("aria-disabled", at <= 0);
      nextBtn.setAttribute("aria-disabled", at >= last);
      root.classList.toggle("at-start", at <= 0);
      root.classList.toggle("at-end", at >= last);
      placePlan();
      show();
      want();
    }
    function go(i, announce){
      i = Math.max(0, Math.min(last, i));
      if (i === at) return;
      at = i;
      update();
      if (announce) say.textContent = labels[i];
    }

    // the arrows, and the right or left half of the spread
    prevBtn.addEventListener("click", () => go(at - 1, true));
    nextBtn.addEventListener("click", () => go(at + 1, true));
    let swipedAt = -1e9;
    const swipedJustNow = () => performance.now() - swipedAt < 500;
    root.querySelector(".viewer-side-prev").addEventListener("click", () => { if (!swipedJustNow()) go(at - 1, false); });
    root.querySelector(".viewer-side-next").addEventListener("click", () => { if (!swipedJustNow()) go(at + 1, false); });
    // the left and right arrow keys once the spread is selected
    frame.addEventListener("keydown", (e) => {
      const to = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: last }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      go(to, true);
    });

    // swiping the spread: sideways on a phone or tablet...
    let touch = null;
    frame.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") touch = { x: e.clientX, y: e.clientY }; });
    frame.addEventListener("pointercancel", () => { touch = null; });
    frame.addEventListener("pointerup", (e) => {
      if (!touch || e.pointerType === "mouse") return;
      const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { swipedAt = performance.now(); go(at + (dx < 0 ? 1 : -1), true); }
    });
    // ...or with two fingers on a trackpad: one swipe, one spread
    // (scrolling up and down over it still scrolls the page)
    let wheelX = 0, wheelEnd = 0, wheelDone = false;
    frame.addEventListener("wheel", (e) => {
      const unit = e.deltaMode === 1 ? 16 : 1;
      const dx = e.deltaX * unit, dy = e.deltaY * unit;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      e.preventDefault();                              // and a sideways swipe doesn't send the browser back a page
      clearTimeout(wheelEnd);
      wheelEnd = setTimeout(() => { wheelX = 0; wheelDone = false; }, 200);   // the swipe is over
      if (wheelDone) return;
      wheelX += dx;
      if (Math.abs(wheelX) > 50) { wheelDone = true; swipedAt = performance.now(); go(at + (wheelX > 0 ? 1 : -1), true); }
    }, { passive: false });

    // the bar: press anywhere on it to go to that spread, and drag along
    // it to go through them; with a mouse, the name of the spread under
    // the pointer shows above it
    const barAt = x => { const r = bar.getBoundingClientRect(); return Math.max(0, Math.min(last, Math.floor((x - r.left) / r.width * N))); };
    function tipAt(x, i){
      const r = bar.getBoundingClientRect();
      tip.textContent = labels[i];
      const half = tip.offsetWidth / 2;
      tip.style.left = Math.round(Math.max(half, Math.min(r.width - half, x - r.left))) + "px";
    }
    bar.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      wake();
      bar.focus({ preventScroll: true });
      try { bar.setPointerCapture(e.pointerId); } catch (err) {}
      dragging = true;
      root.classList.add("is-dragging");
      const move = (ev) => { const i = barAt(ev.clientX); tipAt(ev.clientX, i); go(i, false); };
      const up = () => {
        dragging = false;
        root.classList.remove("is-dragging");
        bar.removeEventListener("pointermove", move);
        bar.removeEventListener("pointerup", up);
        bar.removeEventListener("pointercancel", up);
        want();                                        // where you let go: its full-size picture, then the ones either side
      };
      bar.addEventListener("pointermove", move);
      bar.addEventListener("pointerup", up);
      bar.addEventListener("pointercancel", up);
      move(e);
    });
    bar.addEventListener("pointerover", (e) => { if (e.pointerType === "mouse") bar.classList.add("is-hover"); });
    bar.addEventListener("pointerleave", () => bar.classList.remove("is-hover"));
    bar.addEventListener("pointermove", (e) => { if (!dragging && e.pointerType === "mouse") tipAt(e.clientX, barAt(e.clientX)); });
    bar.addEventListener("keydown", (e) => {
      const to = { ArrowRight: at + 1, ArrowUp: at + 1, ArrowLeft: at - 1, ArrowDown: at - 1,
                   PageUp: at + 10, PageDown: at - 10, Home: 0, End: last }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      go(to, false);                                   // the slider itself tells screen readers where it is
    });

    // sized to the screen: as big as fits between the bars at the top and
    // bottom, with the arrows and the bar underneath (on a very short
    // screen, like a phone on its side, never smaller than 520px across)
    function layout(){
      const vh = window.innerHeight;
      const top = document.querySelector(".runhead").offsetHeight;
      const bottom = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;   // room kept for the bottom bar
      const footH = foot.offsetHeight + (parseFloat(getComputedStyle(foot).marginTop) || 0);
      const gap = 16;
      const fit = Math.floor((vh - top - bottom - footH - 2 * gap) * aspect);
      const w = Math.min(root.clientWidth, Math.max(fit, 520));
      root.style.setProperty("--viewer-w", w + "px");
      // the full-size pictures wherever the half-size ones would be only
      // just big enough (every Retina laptop and desktop)
      wantFull = !p.smallCopies || w * (window.devicePixelRatio || 1) > 1200;
      placePlan();
      show();
      want();
    }

    // nothing loads until it's close to the screen
    function wake(){
      if (near) return;
      near = true;
      if (planImg && planImg.loading === "lazy") planImg.loading = "eager";
      show();
      want();
    }
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(en => en.isIntersecting)) { io.disconnect(); wake(); } }, { rootMargin: "150% 0px" });
      io.observe(root);
    } else wake();

    update();
    layout();
    viewers.push({ layout });
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
  // GETTING AROUND
  // The bar along the top names the section you're in, like a book's
  // running head. Your name goes back to the top; the section's name
  // opens a list of every project, About and Contact. Once you've
  // scrolled down, the bar along the bottom goes to the previous or next
  // section, or back to the top. The line under the top bar shows how far
  // down the page you are.
  // ────────────────────────────────────────────────────────────
  const root = document.documentElement;
  const runhead = document.querySelector(".runhead");
  const sectionLabel = document.getElementById("runhead-section-label");
  const menuWrap = document.querySelector(".runhead-menu");
  const menuBtn = document.getElementById("runhead-section");
  const menu = document.getElementById("section-menu");
  const pagerPrev = document.getElementById("pager-prev");
  const pagerNext = document.getElementById("pager-next");
  const sections = Array.from(document.querySelectorAll(".section")).map(s => {
    const num = s.querySelector(".rail-num"), name = s.querySelector(".rail-name");
    const p = s.id.indexOf("project-") === 0 ? projectById[s.id.slice(8)] : null;
    return { el: s, num: num ? num.textContent : "", label: name ? name.textContent : "", year: p ? p.year : "" };
  });
  const menuRows = sections.map(s => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="section-menu-row" href="#${esc(s.el.id)}"><span class="section-menu-num">${esc(s.num)}</span><span class="section-menu-title">${esc(s.label)}</span>${s.year ? `<span class="section-menu-year">${esc(s.year)}</span>` : ""}</a>`;
    document.getElementById("section-menu-list").appendChild(li);
    return li.firstElementChild;
  });

  // the list opens and closes with its button; Escape, a click anywhere
  // else, or tabbing out of it closes it too
  function setMenu(open, refocus){
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    if (!open && refocus) menuBtn.focus();
  }
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { e.preventDefault(); setMenu(false, menuWrap.contains(document.activeElement)); }
  });
  document.addEventListener("pointerdown", (e) => { if (!menu.hidden && !menuWrap.contains(e.target)) setMenu(false); });
  menuWrap.addEventListener("focusout", (e) => { if (e.relatedTarget && !menuWrap.contains(e.relatedTarget)) setMenu(false); });

  function setPager(a, s, word){
    if (!s) { a.hidden = true; return; }
    a.hidden = false;
    a.setAttribute("href", "#" + s.el.id);
    a.querySelector(".pager-text").textContent = `${s.num} ${s.label}`;
    a.setAttribute("aria-label", `${word}: ${s.num} ${s.label}`);
  }
  let current = -2;
  function setCurrent(i){                                // i = -1 on the opening screen
    if (i === current) return;
    current = i;
    sectionLabel.textContent = sections[i] ? sections[i].label : "Portfolio";
    menuRows.forEach((a, k) => { if (k === i) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    setPager(pagerPrev, i > 0 ? sections[i - 1] : null, "Previous");
    setPager(pagerNext, sections[i + 1] || null, "Next");
  }

  // Going to a section: a long way is covered in one go and then a short
  // glide, so the page doesn't load every picture it would pass on the way.
  function scrollInstant(y){
    const was = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    root.style.scrollBehavior = was;
  }
  const docTop = el => el.getBoundingClientRect().top + window.scrollY;
  const targetY = el => Math.max(0, Math.min(root.scrollHeight - window.innerHeight,
    el === hero ? 0 : Math.round(docTop(el) - runhead.offsetHeight)));
  // Browsers keep what you're looking at still when something higher up
  // the page changes size (a picture finishing loading, say). Browsers
  // that can't do that keep the section you went to in place by hand for
  // a few seconds after you go to it (or open a link straight to it),
  // until you scroll yourself. And in every browser, a picture that
  // finishes loading while the page is still gliding to a section
  // re-aims the glide, so it still lands on the section.
  const anchoring = !!(window.CSS && CSS.supports && CSS.supports("overflow-anchor", "auto"));
  let held = null;
  function hold(el, gliding){
    if (anchoring && !gliding) return;
    const now = performance.now();
    held = { el, top: docTop(el), until: now + (anchoring ? 1500 : 5000), glideUntil: gliding ? now + 1200 : 0 };
  }
  function keepHeld(){
    if (!held) return;
    if (performance.now() > held.until) { held = null; return; }
    const top = docTop(held.el), shift = Math.round(top - held.top);
    if (!shift) return;
    held.top = top;
    if (performance.now() < held.glideUntil) window.scrollTo({ top: targetY(held.el), behavior: "smooth" });   // still on its way: re-aim
    else if (!anchoring) scrollInstant(window.scrollY + shift);
  }
  document.addEventListener("load", (e) => { if (held && e.target && e.target.tagName === "IMG") keepHeld(); }, true);
  // The section you went to is the one the bars name, even a short one
  // (like About) that doesn't reach far down the screen, until you scroll
  // somewhere else yourself.
  let pinned = null;
  const letGo = () => { held = null; pinned = null; };
  ["wheel", "touchstart", "pointerdown"].forEach(t => window.addEventListener(t, letGo, { passive: true, capture: true }));
  window.addEventListener("keydown", (e) => { if (/^(PageUp|PageDown|Home|End|ArrowUp|ArrowDown| |Spacebar)$/.test(e.key)) letGo(); }, true);

  function jumpTo(el){
    const y = targetY(el), gap = y - window.scrollY;
    if (reducedMotion) scrollInstant(y);
    else {
      if (Math.abs(gap) > window.innerHeight * 1.5) scrollInstant(y - Math.sign(gap) * Math.round(window.innerHeight * 0.6));
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    hold(el, !reducedMotion);
    pinned = { el, arrived: false, until: performance.now() + 2500 };
    onScroll();
    // keyboard and screen reader users carry on from the section they went to
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    try { el.focus({ preventScroll: true }); } catch (err) {}
  }
  const byHash = hash => { try { return hash ? document.getElementById(decodeURIComponent(hash)) : null; } catch (err) { return null; } };
  // every link to a part of this page goes through jumpTo
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    const el = a ? byHash(a.getAttribute("href").slice(1)) : null;
    if (!el) return;
    e.preventDefault();
    jumpTo(el);
    try { history.replaceState(null, "", el === hero ? location.pathname + location.search : "#" + el.id); } catch (err) {}
  });
  // a link straight to a section (…/#project-02) is held in place the same way
  if (location.hash) {
    const el = byHash(location.hash.slice(1));
    if (el) { hold(el); pinned = { el, arrived: false, until: performance.now() + 2500 }; }
  }

  const progressBar = document.getElementById("scroll-progress");
  let ticking = false;
  function onScroll(){
    if (pinned) {
      // once it's arrived, scrolling away from it (with the scroll bar, say) lets go
      const off = Math.abs(window.scrollY - targetY(pinned.el));
      if (off < 2) pinned.arrived = true;
      if ((pinned.arrived && off > 4) || (!pinned.arrived && performance.now() > pinned.until)) pinned = null;
    }
    const line = window.innerHeight * 0.4;
    setCurrent(pinned
      ? sections.findIndex(({ el }) => el === pinned.el || pinned.el.contains(el))
      : sections.findIndex(({ el }) => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom > line; }));
    const scrollable = root.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
    document.body.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.8);
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // ────────────────────────────────────────────────────────────
  // START: size everything, wait for the intro (intro.js) to hand
  // over, then type the name and bring in the work
  // ────────────────────────────────────────────────────────────
  function layoutAll(){ fitName(); sizeStrip(); fitRails(); viewers.forEach(v => v.layout()); keepHeld(); }
  // Phones change their reported height as the browser bar hides while
  // scrolling; only a real width change (e.g. rotating) re-sizes the
  // strip there, so the page never jumps under your thumb.
  let lastW = viewW();
  window.addEventListener("resize", () => {
    const widthChanged = viewW() !== lastW;
    lastW = viewW();
    fitName();
    if (widthChanged || finePointer) { sizeStrip(); viewers.forEach(v => v.layout()); }   // the spread slider too
    fitRails();
  });
  layoutAll();
  window.addEventListener("load", layoutAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutAll);
  setTimeout(layoutAll, 300);
  onScroll();
  // the screen can change between monitors while the page is open
  if (window.matchMedia) {
    let dprQuery = null;
    const watchDpr = () => {
      if (dprQuery) dprQuery.removeEventListener("change", onDpr);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      if (dprQuery.addEventListener) dprQuery.addEventListener("change", onDpr);
    };
    const onDpr = () => { stripItems.forEach(sizeItem); watchDpr(); };
    watchDpr();
  }
  function startHero(){
    typeName(() => {
      layoutAll();                                        // final sizes, just before the work slides in
      lastW = viewW();
      hero.classList.add("is-in");
      setTimeout(() => hero.classList.add("is-done"), 400);
      setStripPaused(stripPaused);
    });
  }
  // the site starts once the intro hands over. If there's no intro.js, or it
  // ever goes wrong, the intro screen is taken away and the site starts anyway,
  // at most 10 seconds after the page is first looked at
  let heroStarted = false;
  const go = () => { if (heroStarted) return; heroStarted = true; startHero(); };
  const rescue = () => {
    const introEl = document.getElementById("intro");
    if (introEl) introEl.remove();
    document.documentElement.classList.remove("intro-on");
    go();
  };
  if (window.Intro && window.Intro.done){
    window.Intro.done.then(go);
    const arm = () => setTimeout(rescue, 10000);
    if (document.visibilityState !== "hidden") arm();
    else {
      const onVis = () => { if (document.visibilityState !== "hidden"){ document.removeEventListener("visibilitychange", onVis); arm(); } };
      document.addEventListener("visibilitychange", onVis);
    }
  } else rescue();
})();

```

### `intro.js`

```javascript
/*
  ────────────────────────────────────────────────────────────
  INTRO: the opening screen.
  Your CHOCH logo animation plays on neon orange with "Welcome to my
  site" under it. The moment the pieces snap together, the orange turns
  into the page colour, then the screen fades away and the site does its
  own intro (your name typing itself out).

  The logo is drawn onto a canvas in the site's exact black (--ink),
  so it matches every other black on the page. It works the same hosted
  or opened straight from disk.

  Files (all in images/intro/), made from your choch-logo-animated-loop.mp4:
    choch-logo-animated-loop.mp4 / .webm
                          the animation up to the hold (fly in, snap,
                          hold), black logo on white
    choch-logo-animated-loop-still.png
                          the finished logo, shown instead of the
                          animation when the device asks for reduced
                          motion or a video can't play
  The orange is --intro in style.css (on phones and tablets the intro
  plays on the page colour instead). The welcome line is "welcome" in
  data.js. Clicking, scrolling or pressing a key skips the intro.
  If you swap in a new version under the same file name, add "?v=2"
  after its name in index.html so browsers fetch the new one.

  It can't get stuck: if the video is slow, freezes or can't play, the
  still logo shows instead; if anything at all goes wrong, the intro
  steps aside and the site starts.

  The intro sits at the top of the page rather than being fixed to the
  screen, so Safari on iPhone never takes its orange for the colour of its
  bars (see the INTRO notes in style.css). It only plays when the page
  opens at the top: a link straight to a section (morganchoch.art/#work)
  goes straight there.

  Used by script.js:  Intro.done.then(() => ...)  runs once the intro
  has handed over to the site (straight away if there's no intro).
  ────────────────────────────────────────────────────────────
*/
(function(){
  "use strict";

  let finish;
  const done = new Promise(r => { finish = r; });
  window.Intro = { done };

  const root = document.documentElement;
  const el = document.getElementById("intro");

  // if anything goes wrong, the intro steps aside and the site starts
  function bail(){
    try { if (el) el.remove(); } catch (e) {}
    root.classList.remove("intro-on");
    finish();
  }
  if (!el || !root.classList.contains("intro-on")) { bail(); return; }
  try { run(); } catch (e) { bail(); }

  function run(){
    // ── timing, in seconds of the logo animation ──
    const WELCOME_AT = 0.7;        // "Welcome to my site" wipes in once the pieces have flown past it
    const SNAP_AT = 28.5 / 30;     // frame 29, where the pieces lock together: orange turns to page colour
    const LEAVE_AT = 2.0;          // a beat after the letters fill in: fade into the site
    // ── in milliseconds ──
    const COLOUR_MS = 240;         // orange to page colour
    const FADE_MS = 700;           // the intro fading away
    const SKIP_FADE_MS = 350;      // fading away after a click, scroll or key
    const HAND_OVER = 0.45;        // how far into the fade the site starts its own intro
    const KICK_MS = 400;           // start playing by now even if the video is still downloading
    const MAX_WAIT_MS = 2500;      // if the video hasn't started by then, show the still logo instead
    const STALL_MS = 1200;         // if the video stops moving for this long (slow connection), same
    const STILL_HOLD_MS = 1100;    // how long the still logo shows before the colour changes
    const GIVE_UP_MS = 9000;       // whatever happens, the site is never kept waiting longer than this

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const data = window.PORTFOLIO_DATA || {};
    const welcome = el.querySelector(".intro-welcome");
    if (welcome && data.welcome) welcome.textContent = data.welcome;

    const bgLayer = el.querySelector(".intro-bg") || el;
    const video = el.querySelector(".intro-video");
    const canvas = el.querySelector(".intro-canvas");
    const box = el.querySelector(".intro-logo");
    const ctx = canvas && canvas.getContext ? canvas.getContext("2d", { alpha: false }) : null;

    // colours come from style.css so they always match the page
    const css = getComputedStyle(root);
    function hex(v, fallback){
      let s = (v || "").trim().replace("#", "");
      if (s.length === 3) s = s.split("").map(c => c + c).join("");
      if (!/^[0-9a-f]{6}$/i.test(s)) return fallback;
      return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16));
    }
    const INK = hex(css.getPropertyValue("--ink"), [18, 18, 18]);
    const FROM = hex(css.getPropertyValue("--intro"), [255, 95, 31]);
    const TO = hex(css.getPropertyValue("--paper"), [240, 239, 233]);

    let bg = FROM.slice(), colourFrom = FROM, colourT0 = 0, colourMs = 0, colouring = false;
    let phase = "wait", raf = 0, leaving = false, handedOver = false, waitTimer = 0, playing = false;

    // ── the canvas: page colour, with the logo in the exact ink colour ──
    // colour x video  +  ink x (1 - video)   =   the colour where the video
    // is white, ink where it's black, and a clean blend along every edge.
    // Plain canvas blending, so it also works when the site is opened from disk.
    const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
    const frame = document.createElement("canvas"), off = document.createElement("canvas");
    const fctx = frame.getContext ? frame.getContext("2d", { alpha: false }) : null;
    const octx = off.getContext ? off.getContext("2d", { alpha: false }) : null;
    let W = 0, H = 0;
    function sizeCanvas(){
      if (!ctx || !box) return;
      const r = box.getBoundingClientRect();
      const src = (video && video.videoWidth) || 1052;
      const scale = Math.min(window.devicePixelRatio || 1, src / Math.max(1, r.width));
      const w = Math.max(1, Math.round(r.width * scale)), h = Math.max(1, Math.round(r.height * scale));
      if (w !== W || h !== H){ canvas.width = frame.width = off.width = W = w; canvas.height = frame.height = off.height = H = h; }
    }
    function draw(){
      if (!ctx || !W) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = rgb(bg);
      ctx.fillRect(0, 0, W, H);
      if (!playing || video.readyState < 2 || !octx || !fctx) return;
      try {
        // one copy of the video's current frame, so every step below uses the same frame
        fctx.imageSmoothingQuality = "high";
        fctx.drawImage(video, 0, 0, W, H);
        // the page colour, kept where the video is white
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(frame, 0, 0);
        // the ink, kept where the video is black
        octx.globalCompositeOperation = "source-over";
        octx.drawImage(frame, 0, 0);
        octx.globalCompositeOperation = "difference";
        octx.fillStyle = "#fff";
        octx.fillRect(0, 0, W, H);
        octx.globalCompositeOperation = "multiply";
        octx.fillStyle = rgb(INK);
        octx.fillRect(0, 0, W, H);
        // the two added together
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(off, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      } catch (e) {
        // the browser won't draw this video: show the still logo instead
        ctx.globalCompositeOperation = "source-over";
        playing = false;
        setTimeout(showStill, 0);
      }
    }
    // the intro's colour
    function setBg(c){
      bg = c.map(Math.round);
      bgLayer.style.backgroundColor = rgb(bg);
    }

    // orange -> page colour, eased out, in step with the canvas
    function startColour(){
      if (colouring || bg.join() === TO.join()) return;
      colouring = true; colourFrom = bg.slice(); colourT0 = performance.now(); colourMs = reduced ? 0 : COLOUR_MS;
      el.classList.add("is-snapped");
    }
    function stepColour(now){
      if (!colouring) return;
      const t = colourMs ? Math.min(1, (now - colourT0) / colourMs) : 1;
      const e = 1 - Math.pow(1 - t, 3);
      setBg(colourFrom.map((v, i) => v + (TO[i] - v) * e));
      if (t >= 1) colouring = false;
    }

    // ── fade into the site ──
    function leave(fast){
      if (leaving) return;
      leaving = true;
      try {
        stopListening();
        clearTimeout(waitTimer);
      } catch (e) {}
      const ms = reduced ? 0 : (fast ? SKIP_FADE_MS : FADE_MS);
      el.style.setProperty("--intro-fade", ms + "ms");
      el.classList.add("is-leaving");
      setTimeout(handOver, ms * HAND_OVER);
      setTimeout(cleanUp, ms + 60);
    }
    function handOver(){ if (handedOver) return; handedOver = true; finish(); }
    function cleanUp(){
      cancelAnimationFrame(raf);
      handOver();
      if (video){ try { video.pause(); video.removeAttribute("src"); Array.from(video.querySelectorAll("source")).forEach(s => s.remove()); video.load(); } catch (e) {} }
      el.remove();
      root.classList.remove("intro-on");
      window.removeEventListener("resize", sizeCanvas);
    }

    // ── the still logo: reduced motion, autoplay blocked, or a video that's missing, slow or frozen ──
    function showStill(){
      if (leaving || phase === "still") return;
      phase = "still";
      playing = false;
      clearTimeout(waitTimer);
      if (video){ try { video.pause(); } catch (e) {} }
      el.classList.add("is-still", "is-welcome");
      draw();
      if (reduced){ setTimeout(() => { startColour(); stepColour(performance.now()); leave(false); }, STILL_HOLD_MS); return; }
      setTimeout(startColour, STILL_HOLD_MS);
      setTimeout(() => leave(false), STILL_HOLD_MS + COLOUR_MS + 450);
    }

    // ── the animation ──
    // time of the frame actually on screen where the browser can say
    // (so the colour change lands exactly on the snap), else the clock
    const frameCallbacks = !!(video && video.requestVideoFrameCallback);
    let shownTime = -1, lastT = -1, lastMove = 0, lastTick = 0;
    function onVideoFrame(now, meta){
      shownTime = meta && typeof meta.mediaTime === "number" ? meta.mediaTime : video.currentTime;
      if (!leaving) video.requestVideoFrameCallback(onVideoFrame);
    }
    function loop(now){
      raf = requestAnimationFrame(loop);
      // a long gap between frames means the page wasn't on screen: that isn't the video freezing
      if (now - lastTick > 250) lastMove = now;
      lastTick = now;
      if (phase === "play" && !leaving){
        const ct = video.currentTime;
        const t = frameCallbacks && shownTime >= 0 ? Math.max(shownTime, ct - 0.15) : ct;
        if (t >= WELCOME_AT) el.classList.add("is-welcome");
        if (t >= SNAP_AT) startColour();
        if (t >= LEAVE_AT || video.ended) leave(false);
        else if (ct > lastT){ lastT = ct; lastMove = now; }
        else if (now - lastMove > STALL_MS){ if (t < SNAP_AT) showStill(); else leave(false); }
      }
      stepColour(now);
      draw();
    }
    // plays as soon as the whole (small) video is in, or after KICK_MS anyway:
    // some phones don't download a video at all until it's asked to play
    function play(){
      if (phase !== "wait" || leaving) return;
      phase = "starting";
      try { if (video.currentTime > 0) video.currentTime = 0; } catch (e) {}
      let p;
      video.muted = true;
      try { p = video.play(); } catch (e) { showStill(); return; }
      const ok = () => {
        if (phase !== "starting") return;
        phase = "play"; playing = true; clearTimeout(waitTimer);
        lastT = -1; lastMove = performance.now();
        if (frameCallbacks) video.requestVideoFrameCallback(onVideoFrame);
      };
      if (p && p.then) p.then(ok, showStill); else ok();
    }
    function begin(){
      // the intro covers the top of the page: if the page isn't at the top
      // (it was scrolled while loading), go straight to the site
      if ((window.scrollY || window.pageYOffset || 0) > 2) { bail(); return; }
      sizeCanvas();
      setBg(FROM);
      draw();
      el.classList.add("is-ready");                  // canvas on, covering the video underneath it
      raf = requestAnimationFrame(loop);
      setTimeout(() => leave(false), GIVE_UP_MS);
      if (reduced || !ctx || !video || !video.canPlayType){ showStill(); return; }
      waitTimer = setTimeout(showStill, MAX_WAIT_MS);
      video.addEventListener("error", showStill);
      const sources = video.querySelectorAll("source");
      if (sources.length) sources[sources.length - 1].addEventListener("error", showStill);
      video.addEventListener("loadedmetadata", sizeCanvas);
      // the end of the animation, even if the page isn't drawing frames right now
      video.addEventListener("timeupdate", () => { if (phase === "play" && video.currentTime >= LEAVE_AT) leave(false); });
      video.addEventListener("ended", () => { if (phase === "play") leave(false); });
      if (video.readyState >= 4) play();
      else {
        video.addEventListener("canplaythrough", play, { once: true });
        setTimeout(play, KICK_MS);
        if (video.networkState === 0) video.load();
      }
    }
    function safeBegin(){ try { begin(); } catch (e) { bail(); } }

    // ── skipping: click, tap, scroll or any key ──
    const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchmove"];
    const MODIFIERS = ["Meta", "Control", "Alt", "Shift", "CapsLock", "Fn", "OS"];
    function skip(e){ if (e.type === "keydown" && MODIFIERS.indexOf(e.key) > -1) return; leave(true); }
    // the page moving any other way (dragging the scrollbar, say) also ends it
    function onScroll(){ if ((window.scrollY || window.pageYOffset || 0) > 2) leave(true); }
    function stopListening(){ SKIP_EVENTS.forEach(t => window.removeEventListener(t, skip, true)); window.removeEventListener("scroll", onScroll); }
    SKIP_EVENTS.forEach(t => window.addEventListener(t, skip, { capture: true, passive: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sizeCanvas);
    // coming back to the page (the back button, or reopening the tab) mid-intro: just finish it
    window.addEventListener("pageshow", e => { if (e.persisted && !leaving) leave(true); });

    // intro.js is running: it takes over from the failsafe in style.css
    el.style.animation = "none";

    // if the page opened in a background tab, wait until it's looked at
    if (document.visibilityState === "hidden"){
      const onVis = () => { if (document.visibilityState !== "hidden"){ document.removeEventListener("visibilitychange", onVis); safeBegin(); } };
      document.addEventListener("visibilitychange", onVis);
    } else begin();
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

  The main column holds the imagery: every image at the full width of
  the column, one under another, never cropped. A project shows
  whichever of these it has, in this order:
    - "model3d"   a 3D model that turns on its own, with its stand
                  fading away and coming back on a timer. Visitors can
                  drag it around to see every side.
                  Needs arsvita-3d.js next to script.js, plus
                  {src: the model file, poster: a still shown while
                  it loads}. Used by Arsvita.
    - "images"    photos, each at its own shape. Used by Dozer.
    - "spreads"   the publication's spreads, in order, under a small
                  heading ("spreadsLabel", e.g. "Inside the book").
                  A single page, like a front or back cover, sits
                  centred at the same height as the spreads; put
                  "cover" in its file name (cover.webp, back-cover.webp)
                  and screen readers call it the front or back cover.
                  "aspect" is the width ÷ height of one spread: the
                  space for each spread is held at that shape while it
                  loads, so the page never jumps.
                  "smallCopies" (optional): true when every spread also
                  has a half-size copy, with the same name, in a folder
                  called "small" next to it. Phones, smaller screens and
                  the opening strip use those, so the page loads faster
                  and uses less data. Used by Dozer.
                  "slider" (optional): true shows the spreads one at a
                  time instead of one under another, each as big as fits
                  the screen, with a slider bar under it that runs
                  through every spread: drag along it to go through
                  them. The arrows under it (or clicking the right or
                  left half of the spread, or swiping it) go one spread
                  at a time. Good for a long publication. Used by Dozer.
                  "flatplan" (optional, with slider): one image of every
                  spread side by side, in order, used as the slider bar,
                  so you can see the whole issue along it. Each spread
                  (or cover) takes an equal share of its width.
    - "birds"     runs of spreads, each under its bird's name:
                  {name, status, spreads}. A bird with status
                  "in-progress" is greyed out and labelled "Work in
                  progress". Used by The Pecking Order.
    - "processImages" (optional) sketches, drafts, files, shown last
                  under a "Process" heading.
  Export images and spreads (JPEG or WebP) at least 3000px wide so
  they stay sharp on high-resolution screens.
  On phones each project shows its number, name and info, then its
  first image (or the 3D model), then its text, then the rest.

  GETTING AROUND
  The bar along the top of the screen names the section you're in.
  Click your name to go back to the top, or the section's name for a
  list of every project, About and Contact. Once you scroll down, the
  bar along the bottom of the screen goes to the previous or next
  section, or back to the top. They update themselves from this file.

  THE INTRO
  Before anything else, your logo animation plays on neon orange with
  the line in "welcome" under it. When the pieces snap together the
  orange turns into the page colour, then it fades into the site and
  your name types itself out. The animation files live in images/intro/
  (more in intro.js). Change the orange with --intro in style.css.

  THE OPENING STRIP
  Right after your name types itself out, work from every project
  slides past in order: 01's, then 02's, then 03's (work in progress
  is left out). Each project shows all of its photos and spreads, up
  to 24; one with more (Dozer) shows 24 of them, picked evenly from
  start to finish. Each image keeps its own shape, captioned with its
  project and linked to it. Nothing to edit here: it updates itself
  when you add or remove images above. To show a hand-picked set
  instead, add a "reel" list of {src, project} (project = that
  project's "id") next to "projects".
  To stay sharp, an image is never shown bigger than its file allows
  on the screen it's on, so small files show a little smaller. Spreads
  exported 3000px wide or more always show at full size.

  Top-level "status" is a one-line availability note shown with
  your contact info. Edit it any time.
  ────────────────────────────────────────────────────────────
*/

const PORTFOLIO_DATA = {
  name: "Morgan Chochinov",
  role: "Graphic & Editorial Designer",
  tagline: "Bringing experimental design into a world of corporate minimalism.",
  welcome: "Welcome to my site",          // the line under your logo in the intro
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
      spreadsLabel: "Inside the book",
      aspect: 1.412,
      smallCopies: true,
      spreads: [
        "images/arsvita/spread-01.webp","images/arsvita/spread-02.webp","images/arsvita/spread-03.webp",
        "images/arsvita/spread-04.webp","images/arsvita/spread-05.webp","images/arsvita/spread-06.webp",
        "images/arsvita/spread-07.webp","images/arsvita/spread-08.webp","images/arsvita/spread-09.webp",
        "images/arsvita/spread-10.webp","images/arsvita/spread-11.webp","images/arsvita/spread-12.webp",
        "images/arsvita/spread-13.webp","images/arsvita/spread-14.webp","images/arsvita/spread-15.webp",
        "images/arsvita/spread-16.webp","images/arsvita/spread-17.webp","images/arsvita/spread-18.webp",
        "images/arsvita/spread-19.webp","images/arsvita/spread-20.webp","images/arsvita/spread-21.webp",
        "images/arsvita/spread-22.webp","images/arsvita/spread-23.webp"
      ],
      processImages: []
    },
    {
      id: "02",
      scale: "02",
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
      spreadsLabel: "Issue 02, cover to cover",
      aspect: 1.294,
      smallCopies: true,
      slider: true,                             // one spread at a time, with a slider bar (see the notes at the top)
      flatplan: "images/dozer/flatplan.webp",   // the whole issue as a strip: the slider bar
      spreads: [
        "images/dozer/cover.webp","images/dozer/spread-01.webp","images/dozer/spread-02.webp",
        "images/dozer/spread-03.webp","images/dozer/spread-04.webp","images/dozer/spread-05.webp",
        "images/dozer/spread-06.webp","images/dozer/spread-07.webp","images/dozer/spread-08.webp",
        "images/dozer/spread-09.webp","images/dozer/spread-10.webp","images/dozer/spread-11.webp",
        "images/dozer/spread-12.webp","images/dozer/spread-13.webp","images/dozer/spread-14.webp",
        "images/dozer/spread-15.webp","images/dozer/spread-16.webp","images/dozer/spread-17.webp",
        "images/dozer/spread-18.webp","images/dozer/spread-19.webp","images/dozer/spread-20.webp",
        "images/dozer/spread-21.webp","images/dozer/spread-22.webp","images/dozer/spread-23.webp",
        "images/dozer/spread-24.webp","images/dozer/spread-25.webp","images/dozer/spread-26.webp",
        "images/dozer/spread-27.webp","images/dozer/spread-28.webp","images/dozer/spread-29.webp",
        "images/dozer/spread-30.webp","images/dozer/spread-31.webp","images/dozer/spread-32.webp",
        "images/dozer/spread-33.webp","images/dozer/spread-34.webp","images/dozer/spread-35.webp",
        "images/dozer/spread-36.webp","images/dozer/spread-37.webp","images/dozer/spread-38.webp",
        "images/dozer/spread-39.webp","images/dozer/spread-40.webp","images/dozer/spread-41.webp",
        "images/dozer/spread-42.webp","images/dozer/spread-43.webp","images/dozer/spread-44.webp",
        "images/dozer/spread-45.webp","images/dozer/spread-46.webp","images/dozer/spread-47.webp",
        "images/dozer/spread-48.webp","images/dozer/spread-49.webp","images/dozer/spread-50.webp",
        "images/dozer/spread-51.webp","images/dozer/spread-52.webp","images/dozer/spread-53.webp",
        "images/dozer/spread-54.webp","images/dozer/spread-55.webp","images/dozer/spread-56.webp",
        "images/dozer/spread-57.webp","images/dozer/spread-58.webp","images/dozer/spread-59.webp",
        "images/dozer/spread-60.webp","images/dozer/spread-61.webp","images/dozer/spread-62.webp",
        "images/dozer/spread-63.webp","images/dozer/spread-64.webp","images/dozer/spread-65.webp",
        "images/dozer/spread-66.webp","images/dozer/spread-67.webp","images/dozer/spread-68.webp",
        "images/dozer/spread-69.webp","images/dozer/spread-70.webp","images/dozer/spread-71.webp",
        "images/dozer/spread-72.webp","images/dozer/spread-73.webp","images/dozer/spread-74.webp",
        "images/dozer/spread-75.webp","images/dozer/spread-76.webp","images/dozer/spread-77.webp",
        "images/dozer/spread-78.webp","images/dozer/spread-79.webp","images/dozer/spread-80.webp",
        "images/dozer/spread-81.webp","images/dozer/back-cover.webp"
      ],
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

      aspect: 1.333,
      smallCopies: true,
      birds: [
        {
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.webp","images/pecking-order/marabou-02.webp",
            "images/pecking-order/marabou-03.webp","images/pecking-order/marabou-04.webp",
            "images/pecking-order/marabou-05.webp","images/pecking-order/marabou-06.webp"
          ]
        },
        {
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.webp","images/pecking-order/shoebill-02.webp",
            "images/pecking-order/shoebill-03.webp","images/pecking-order/shoebill-04.webp",
            "images/pecking-order/shoebill-05.webp","images/pecking-order/shoebill-06.webp"
          ]
        },
        {
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.webp","images/pecking-order/kingvulture-02.webp",
            "images/pecking-order/kingvulture-03.webp","images/pecking-order/kingvulture-04.webp",
            "images/pecking-order/kingvulture-05.webp"
          ]
        },
        {
          name: "Hoatzin",
          status: "in-progress",
          spreads: [
            "images/pecking-order/hoatzin-01.webp"
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

### Intro — finished logo

![choch-logo-animated-loop-still.png](images/intro/choch-logo-animated-loop-still.png)

### Dozer Magazine

![dozer-01-main.jpg](images/dozer-01-main.jpg)
![dozer-02.jpg](images/dozer-02.jpg)
![dozer-03.jpg](images/dozer-03.jpg)
![dozer-04.jpg](images/dozer-04.jpg)

![dozer-05.jpg](images/dozer-05.jpg)
![dozer-06.jpg](images/dozer-06.jpg)
![dozer-07.jpg](images/dozer-07.jpg)

### Dozer Magazine — Issue 02, cover to cover

![cover.webp](images/dozer/small/cover.webp)
![spread-01.webp](images/dozer/small/spread-01.webp)
![spread-02.webp](images/dozer/small/spread-02.webp)
![spread-03.webp](images/dozer/small/spread-03.webp)

![spread-04.webp](images/dozer/small/spread-04.webp)
![spread-05.webp](images/dozer/small/spread-05.webp)
![spread-06.webp](images/dozer/small/spread-06.webp)
![spread-07.webp](images/dozer/small/spread-07.webp)

![spread-08.webp](images/dozer/small/spread-08.webp)
![spread-09.webp](images/dozer/small/spread-09.webp)
![spread-10.webp](images/dozer/small/spread-10.webp)
![spread-11.webp](images/dozer/small/spread-11.webp)

![spread-12.webp](images/dozer/small/spread-12.webp)
![spread-13.webp](images/dozer/small/spread-13.webp)
![spread-14.webp](images/dozer/small/spread-14.webp)
![spread-15.webp](images/dozer/small/spread-15.webp)

![spread-16.webp](images/dozer/small/spread-16.webp)
![spread-17.webp](images/dozer/small/spread-17.webp)
![spread-18.webp](images/dozer/small/spread-18.webp)
![spread-19.webp](images/dozer/small/spread-19.webp)

![spread-20.webp](images/dozer/small/spread-20.webp)
![spread-21.webp](images/dozer/small/spread-21.webp)
![spread-22.webp](images/dozer/small/spread-22.webp)
![spread-23.webp](images/dozer/small/spread-23.webp)

![spread-24.webp](images/dozer/small/spread-24.webp)
![spread-25.webp](images/dozer/small/spread-25.webp)
![spread-26.webp](images/dozer/small/spread-26.webp)
![spread-27.webp](images/dozer/small/spread-27.webp)

![spread-28.webp](images/dozer/small/spread-28.webp)
![spread-29.webp](images/dozer/small/spread-29.webp)
![spread-30.webp](images/dozer/small/spread-30.webp)
![spread-31.webp](images/dozer/small/spread-31.webp)

![spread-32.webp](images/dozer/small/spread-32.webp)
![spread-33.webp](images/dozer/small/spread-33.webp)
![spread-34.webp](images/dozer/small/spread-34.webp)
![spread-35.webp](images/dozer/small/spread-35.webp)

![spread-36.webp](images/dozer/small/spread-36.webp)
![spread-37.webp](images/dozer/small/spread-37.webp)
![spread-38.webp](images/dozer/small/spread-38.webp)
![spread-39.webp](images/dozer/small/spread-39.webp)

![spread-40.webp](images/dozer/small/spread-40.webp)
![spread-41.webp](images/dozer/small/spread-41.webp)
![spread-42.webp](images/dozer/small/spread-42.webp)
![spread-43.webp](images/dozer/small/spread-43.webp)

![spread-44.webp](images/dozer/small/spread-44.webp)
![spread-45.webp](images/dozer/small/spread-45.webp)
![spread-46.webp](images/dozer/small/spread-46.webp)
![spread-47.webp](images/dozer/small/spread-47.webp)

![spread-48.webp](images/dozer/small/spread-48.webp)
![spread-49.webp](images/dozer/small/spread-49.webp)
![spread-50.webp](images/dozer/small/spread-50.webp)
![spread-51.webp](images/dozer/small/spread-51.webp)

![spread-52.webp](images/dozer/small/spread-52.webp)
![spread-53.webp](images/dozer/small/spread-53.webp)
![spread-54.webp](images/dozer/small/spread-54.webp)
![spread-55.webp](images/dozer/small/spread-55.webp)

![spread-56.webp](images/dozer/small/spread-56.webp)
![spread-57.webp](images/dozer/small/spread-57.webp)
![spread-58.webp](images/dozer/small/spread-58.webp)
![spread-59.webp](images/dozer/small/spread-59.webp)

![spread-60.webp](images/dozer/small/spread-60.webp)
![spread-61.webp](images/dozer/small/spread-61.webp)
![spread-62.webp](images/dozer/small/spread-62.webp)
![spread-63.webp](images/dozer/small/spread-63.webp)

![spread-64.webp](images/dozer/small/spread-64.webp)
![spread-65.webp](images/dozer/small/spread-65.webp)
![spread-66.webp](images/dozer/small/spread-66.webp)
![spread-67.webp](images/dozer/small/spread-67.webp)

![spread-68.webp](images/dozer/small/spread-68.webp)
![spread-69.webp](images/dozer/small/spread-69.webp)
![spread-70.webp](images/dozer/small/spread-70.webp)
![spread-71.webp](images/dozer/small/spread-71.webp)

![spread-72.webp](images/dozer/small/spread-72.webp)
![spread-73.webp](images/dozer/small/spread-73.webp)
![spread-74.webp](images/dozer/small/spread-74.webp)
![spread-75.webp](images/dozer/small/spread-75.webp)

![spread-76.webp](images/dozer/small/spread-76.webp)
![spread-77.webp](images/dozer/small/spread-77.webp)
![spread-78.webp](images/dozer/small/spread-78.webp)
![spread-79.webp](images/dozer/small/spread-79.webp)

![spread-80.webp](images/dozer/small/spread-80.webp)
![spread-81.webp](images/dozer/small/spread-81.webp)
![back-cover.webp](images/dozer/small/back-cover.webp)

### The Pecking Order — logo

![logo-full.png](images/logo-full.png)

### Arsvita Magazine — 3D model poster

![3d-poster.webp](images/arsvita/3d-poster.webp)

### Arsvita Magazine — all 23 spreads

![spread-01.webp](images/arsvita/small/spread-01.webp)
![spread-02.webp](images/arsvita/small/spread-02.webp)
![spread-03.webp](images/arsvita/small/spread-03.webp)
![spread-04.webp](images/arsvita/small/spread-04.webp)

![spread-05.webp](images/arsvita/small/spread-05.webp)
![spread-06.webp](images/arsvita/small/spread-06.webp)
![spread-07.webp](images/arsvita/small/spread-07.webp)
![spread-08.webp](images/arsvita/small/spread-08.webp)

![spread-09.webp](images/arsvita/small/spread-09.webp)
![spread-10.webp](images/arsvita/small/spread-10.webp)
![spread-11.webp](images/arsvita/small/spread-11.webp)
![spread-12.webp](images/arsvita/small/spread-12.webp)

![spread-13.webp](images/arsvita/small/spread-13.webp)
![spread-14.webp](images/arsvita/small/spread-14.webp)
![spread-15.webp](images/arsvita/small/spread-15.webp)
![spread-16.webp](images/arsvita/small/spread-16.webp)

![spread-17.webp](images/arsvita/small/spread-17.webp)
![spread-18.webp](images/arsvita/small/spread-18.webp)
![spread-19.webp](images/arsvita/small/spread-19.webp)
![spread-20.webp](images/arsvita/small/spread-20.webp)

![spread-21.webp](images/arsvita/small/spread-21.webp)
![spread-22.webp](images/arsvita/small/spread-22.webp)
![spread-23.webp](images/arsvita/small/spread-23.webp)

### The Pecking Order — Marabou Stork

![marabou-01.webp](images/pecking-order/small/marabou-01.webp)
![marabou-02.webp](images/pecking-order/small/marabou-02.webp)
![marabou-03.webp](images/pecking-order/small/marabou-03.webp)
![marabou-04.webp](images/pecking-order/small/marabou-04.webp)

![marabou-05.webp](images/pecking-order/small/marabou-05.webp)
![marabou-06.webp](images/pecking-order/small/marabou-06.webp)

### The Pecking Order — Shoebill

![shoebill-01.webp](images/pecking-order/small/shoebill-01.webp)
![shoebill-02.webp](images/pecking-order/small/shoebill-02.webp)
![shoebill-03.webp](images/pecking-order/small/shoebill-03.webp)
![shoebill-04.webp](images/pecking-order/small/shoebill-04.webp)

![shoebill-05.webp](images/pecking-order/small/shoebill-05.webp)
![shoebill-06.webp](images/pecking-order/small/shoebill-06.webp)

### The Pecking Order — King Vulture

![kingvulture-01.webp](images/pecking-order/small/kingvulture-01.webp)
![kingvulture-02.webp](images/pecking-order/small/kingvulture-02.webp)
![kingvulture-03.webp](images/pecking-order/small/kingvulture-03.webp)
![kingvulture-04.webp](images/pecking-order/small/kingvulture-04.webp)

![kingvulture-05.webp](images/pecking-order/small/kingvulture-05.webp)

### The Pecking Order — Hoatzin (in progress)

![hoatzin-01.webp](images/pecking-order/small/hoatzin-01.webp)

