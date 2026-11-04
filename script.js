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
      (p.birds || []).filter(b => b.status !== "in-progress").forEach(b => b.spreads.forEach(src => all.push(src)));
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
    if (spreads.length) {
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
    const primary = first.bare ? first.items[0] : head(first) + stack(first.items.slice(0, 1));
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
  // until you scroll yourself.
  const anchoring = !!(window.CSS && CSS.supports && CSS.supports("overflow-anchor", "auto"));
  let held = null;
  function hold(el, gliding){
    if (anchoring) return;
    const now = performance.now();
    held = { el, top: docTop(el), until: now + 5000, glideUntil: gliding ? now + 1200 : 0 };
  }
  function keepHeld(){
    if (!held) return;
    if (performance.now() > held.until) { held = null; return; }
    const top = docTop(held.el), shift = Math.round(top - held.top);
    if (!shift) return;
    held.top = top;
    if (performance.now() < held.glideUntil) window.scrollTo({ top: targetY(held.el), behavior: "smooth" });   // still on its way: re-aim
    else scrollInstant(window.scrollY + shift);
  }
  if (!anchoring) {
    document.addEventListener("load", (e) => { if (held && e.target && e.target.tagName === "IMG") keepHeld(); }, true);
  }
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
  function layoutAll(){ fitName(); sizeStrip(); fitRails(); keepHeld(); }
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
