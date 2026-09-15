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

  // ────────────────────────────────────────────────────────────
  // GENERAL WORK \u2014 unlabeled strip between Work and About, images
  // and/or video clips, auto-detected by file extension so the array
  // in data.js stays just a flat list of paths either way. The set
  // is rendered twice back to back so translateX(-50%) loops
  // seamlessly no matter how many items end up in the array; the
  // duplicate is aria-hidden so it isn't announced twice. Speed is
  // derived from the rendered width of one set rather than a fixed
  // loop duration, so the pace feels the same whether there are 6
  // items or 60.
  // ────────────────────────────────────────────────────────────
  function initGeneralWork(){
    const section = document.getElementById("general-work");
    const track = document.getElementById("ticker-track");
    const items = d.generalWork || [];
    if (!section || !track) return;
    if (!items.length) { section.hidden = true; return; }

    const VIDEO_EXT = /\.(mp4|webm|m4v|mov)$/i;
    function isVideoSrc(src){ return VIDEO_EXT.test(src); }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ────────────────────────────────────────────────────────────
    // LIGHTBOX \u2014 click any item to see it full-size, with
    // prev/next to page through the whole collection without
    // closing. Built once, reused for every open.
    // ────────────────────────────────────────────────────────────
    const lightbox = document.createElement("div");
    lightbox.className = "ticker-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged view");

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "ticker-lightbox-close";
    closeBtn.textContent = "Close";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "ticker-lightbox-nav ticker-lightbox-prev";
    prevBtn.setAttribute("aria-label", "Previous");
    prevBtn.innerHTML = "&#8249;";

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "ticker-lightbox-nav ticker-lightbox-next";
    nextBtn.setAttribute("aria-label", "Next");
    nextBtn.innerHTML = "&#8250;";

    if (items.length <= 1) { prevBtn.hidden = true; nextBtn.hidden = true; }

    const stage = document.createElement("div");
    stage.className = "ticker-lightbox-stage";
    const mediaSlot = document.createElement("div");
    mediaSlot.className = "ticker-lightbox-media";
    stage.appendChild(mediaSlot);

    lightbox.append(closeBtn, prevBtn, nextBtn, stage);
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    let lastFocused = null;
    let closeTimer = null;

    function renderSlot(src, animate){
      const finish = () => {
        mediaSlot.innerHTML = "";
        if (isVideoSrc(src)) {
          const v = document.createElement("video");
          v.src = src;
          v.controls = true;
          v.autoplay = true;
          v.playsInline = true;
          mediaSlot.appendChild(v);
        } else {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          mediaSlot.appendChild(img);
        }
        if (animate) requestAnimationFrame(() => { mediaSlot.style.opacity = "1"; });
      };
      if (animate) {
        mediaSlot.style.opacity = "0";
        setTimeout(finish, 160); // matches the CSS opacity transition below
      } else {
        mediaSlot.style.opacity = "1";
        finish();
      }
    }

    function showAt(index, animate){
      currentIndex = ((index % items.length) + items.length) % items.length; // wraps both directions
      renderSlot(items[currentIndex], animate);
    }

    function openLightbox(index, triggerEl){
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      lastFocused = triggerEl || document.activeElement;
      showAt(index, false);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        lightbox.classList.add("is-open");
        closeBtn.focus();
      }));
    }

    function closeLightbox(){
      if (lightbox.hidden) return;
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      closeTimer = setTimeout(() => {
        lightbox.hidden = true;
        const vid = mediaSlot.querySelector("video");
        if (vid) vid.pause();
        mediaSlot.innerHTML = "";
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      }, 320); // matches the CSS transform/opacity transition on .ticker-lightbox-stage
    }

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => showAt(currentIndex - 1, true));
    nextBtn.addEventListener("click", () => showAt(currentIndex + 1, true));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showAt(currentIndex + 1, true);
      else if (e.key === "ArrowLeft") showAt(currentIndex - 1, true);
    });

    // ────────────────────────────────────────────────────────────
    // MEDIA + SETS \u2014 the real set's items are real <button>s (so
    // they're keyboard-reachable and get a proper accessible name);
    // the duplicate set stays plain, non-focusable <div>s under its
    // aria-hidden parent, but still clickable for a mouse since
    // visually it's an identical tile.
    // ────────────────────────────────────────────────────────────
    function buildMediaEl(src){
      if (isVideoSrc(src)) {
        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.setAttribute("muted", ""); // some browsers check the attribute, not just the property, before allowing autoplay
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute("aria-hidden", "true"); // decorative \u2014 the wrapping button (or aria-hidden parent) carries the semantics
        if (reduced) {
          // no forced motion \u2014 sits on its first frame; people can
          // opt in with native controls instead of it looping on its
          // own, the same idea as the flipbook going static above
          video.controls = true;
        } else {
          video.loop = true;
          video.autoplay = true;
          video.preload = "auto";
        }
        return video;
      }
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      return img;
    }

    function buildSet(hideFromAT){
      const set = document.createElement("div");
      set.className = "ticker-set";
      if (hideFromAT) set.setAttribute("aria-hidden", "true");
      items.forEach((src, i) => {
        // not loading="lazy" on purpose: this strip lays every item
        // out in a track wider than the viewport, so items far to
        // the right would only ever scroll into lazy-load range once
        // the animation moves them there \u2014 but the animation below
        // waits on every item to finish loading first. Lazy-loading
        // here would deadlock a longer set.
        const item = document.createElement(hideFromAT ? "div" : "button");
        item.className = "ticker-item";
        if (!hideFromAT) {
          item.type = "button";
          const kind = isVideoSrc(src) ? "video" : "image";
          item.setAttribute("aria-label", "Open general work " + kind + " " + (i + 1) + " full size");
        }
        item.appendChild(buildMediaEl(src));
        item.addEventListener("click", () => openLightbox(i, item));
        set.appendChild(item);
      });
      return set;
    }

    const setA = buildSet(false);
    track.appendChild(setA);
    if (reduced) return; // one static, manually-scrollable set is enough \u2014 see style.css

    const setB = buildSet(true); // duplicate for the seamless loop; aria-hidden so AT doesn't hear it twice
    track.appendChild(setB);

    const TICKER_SPEED = 55; // px/sec \u2014 constant pace regardless of item count
    function sizeTicker(){
      const distance = setA.scrollWidth;
      if (!distance) return;
      const duration = Math.max(distance / TICKER_SPEED, 10);
      track.style.setProperty("--ticker-duration", duration + "s");
      track.classList.add("is-ready"); // only starts the animation once the pace is known \u2014 see style.css
    }

    // wait for this set's own items specifically (not the whole
    // page) so the strip starts at the right pace immediately,
    // instead of guessing and then visibly jumping speed later.
    // Images signal readiness via complete/load; video via
    // readyState/loadedmetadata, the earliest point its real
    // dimensions are known.
    function waitFor(el, cb){
      if (el.tagName === "VIDEO") {
        if (el.readyState >= 1) { cb(); return; } // HAVE_METADATA
        el.addEventListener("loadedmetadata", cb, { once: true });
        el.addEventListener("error", cb, { once: true });
      } else {
        if (el.complete) { cb(); return; }
        el.addEventListener("load", cb, { once: true });
        el.addEventListener("error", cb, { once: true }); // a bad path shouldn't hang the strip forever
      }
    }
    const mediaEls = Array.from(setA.querySelectorAll("img, video"));
    let pending = mediaEls.length;
    function settle(){
      pending--;
      if (pending <= 0) sizeTicker();
    }
    if (!mediaEls.length) {
      sizeTicker();
    } else {
      mediaEls.forEach(el => waitFor(el, settle));
    }
    window.addEventListener("resize", sizeTicker);

    // pause video decoding while the strip is scrolled out of view
    // instead of letting it run in the background forever \u2014 same
    // idea as the flipbook's own visibility-based auto-play above
    const videos = Array.from(track.querySelectorAll("video"));
    if (videos.length) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            videos.forEach(v => entry.isIntersecting ? v.play().catch(() => {}) : v.pause());
          });
        }, { threshold: 0.1 }).observe(section);
      } else {
        videos.forEach(v => v.play().catch(() => {}));
      }
    }
  }
  initGeneralWork();

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
