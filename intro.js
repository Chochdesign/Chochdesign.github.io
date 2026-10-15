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
  The orange is --intro in style.css. The welcome line is "welcome" in
  data.js. Clicking, scrolling or pressing a key skips the intro.
  If you swap in a new version under the same file name, add "?v=2"
  after its name in index.html so browsers fetch the new one.

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
  if (!el || !root.classList.contains("intro-on")) { if (el) el.remove(); root.classList.remove("intro-on"); finish(); return; }
  el.style.animation = "none";                     // intro.js is running: switch off the CSS failsafe

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
  const STILL_HOLD_MS = 1100;    // how long the still logo shows before the colour changes
  const GIVE_UP_MS = 9000;       // whatever happens, the site is never kept waiting longer than this

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const data = window.PORTFOLIO_DATA || {};
  const welcome = el.querySelector(".intro-welcome");
  if (welcome && data.welcome) welcome.textContent = data.welcome;

  const video = el.querySelector(".intro-video");
  const canvas = el.querySelector(".intro-canvas");
  const box = el.querySelector(".intro-logo");
  const ctx = canvas && canvas.getContext ? canvas.getContext("2d", { alpha: false }) : null;
  const themeMeta = document.querySelector('meta[name="theme-color"]');

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
  const toHex = c => "#" + c.map(n => Math.round(n).toString(16).padStart(2, "0")).join("");

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
  }
  function setBg(c){
    bg = c.map(Math.round);
    el.style.backgroundColor = rgb(bg);
  }

  // orange -> page colour, eased out, in step with the canvas
  function startColour(){
    if (colouring || bg.join() === TO.join()) return;
    colouring = true; colourFrom = bg.slice(); colourT0 = performance.now(); colourMs = reduced ? 0 : COLOUR_MS;
    if (themeMeta) themeMeta.setAttribute("content", toHex(TO));
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
    stopListening();
    clearTimeout(waitTimer);
    const ms = reduced ? 0 : (fast ? SKIP_FADE_MS : FADE_MS);
    if (themeMeta) themeMeta.setAttribute("content", toHex(TO));
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

  // ── the still logo: reduced motion, autoplay blocked, or a missing video ──
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
  let shownTime = -1;
  function onVideoFrame(now, meta){
    shownTime = meta && typeof meta.mediaTime === "number" ? meta.mediaTime : video.currentTime;
    if (!leaving) video.requestVideoFrameCallback(onVideoFrame);
  }
  function loop(now){
    raf = requestAnimationFrame(loop);
    if (phase === "play"){
      const t = frameCallbacks && shownTime >= 0 ? shownTime : video.currentTime;
      if (t >= WELCOME_AT) el.classList.add("is-welcome");
      if (t >= SNAP_AT) startColour();
      if (t >= LEAVE_AT || video.ended) leave(false);
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
      if (frameCallbacks) video.requestVideoFrameCallback(onVideoFrame);
    };
    if (p && p.then) p.then(ok, showStill); else ok();
  }
  function begin(){
    sizeCanvas();
    setBg(FROM);
    draw();
    el.classList.add("is-ready");                  // canvas on, covering the video underneath it
    if (themeMeta) themeMeta.setAttribute("content", toHex(FROM));
    raf = requestAnimationFrame(loop);
    setTimeout(() => leave(false), GIVE_UP_MS);
    if (reduced || !ctx || !video || !video.canPlayType){ showStill(); return; }
    waitTimer = setTimeout(showStill, MAX_WAIT_MS);
    video.addEventListener("error", showStill);
    const sources = video.querySelectorAll("source");
    if (sources.length) sources[sources.length - 1].addEventListener("error", showStill);
    video.addEventListener("loadedmetadata", sizeCanvas);
    if (video.readyState >= 4) play();
    else {
      video.addEventListener("canplaythrough", play, { once: true });
      setTimeout(play, KICK_MS);
      if (video.networkState === 0) video.load();
    }
  }

  // ── skipping: click, tap, scroll or any key ──
  const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchmove"];
  const MODIFIERS = ["Meta", "Control", "Alt", "Shift", "CapsLock", "Fn", "OS"];
  function skip(e){ if (e.type === "keydown" && MODIFIERS.indexOf(e.key) > -1) return; leave(true); }
  function stopListening(){ SKIP_EVENTS.forEach(t => window.removeEventListener(t, skip, true)); }
  SKIP_EVENTS.forEach(t => window.addEventListener(t, skip, { capture: true, passive: true }));
  window.addEventListener("resize", sizeCanvas);

  // if the page opened in a background tab, wait until it's looked at
  if (document.visibilityState === "hidden"){
    const onVis = () => { if (document.visibilityState !== "hidden"){ document.removeEventListener("visibilitychange", onVis); begin(); } };
    document.addEventListener("visibilitychange", onVis);
  } else begin();
})();
