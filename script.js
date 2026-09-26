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
