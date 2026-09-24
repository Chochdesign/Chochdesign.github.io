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
