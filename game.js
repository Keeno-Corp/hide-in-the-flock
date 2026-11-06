// Made with paprika3d · https://paprika3d.com
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { sfx, burst, shake } from './fx.js';

// ───────────────────────── helpers ─────────────────────────
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
const $ = id => document.getElementById(id);
const pick = a => a[Math.floor(Math.random() * a.length)];

// ───────────────────────── renderer / scene ─────────────────────────
// Storybook pastoral: toon-banded flat fills -> render target -> one ink/paper post pass.
const PAL = {
  ink: 0x2a1c12, paper: 0xefe3c8, wool: 0xf3e8cc, face: 0x2b211c, ochre: 0xb9a24f, sage: 0x8e9a58, olive: 0x6f7a45,
  indigo: 0x3f4a6e, skyTop: 0x7d86a6, rose: 0xd9a49a, apricot: 0xf2b47a, sun: 0xffe2a8, mauve: 0x8a7f9a, wolf: 0x17110e, red: 0xb3261e,
};
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NoToneMapping;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xe0a98f, 70, 330);
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 1, 800);
const SUN_DIR = new THREE.Vector3(-0.8, 0.27, -0.32).normalize();

// post: scene -> RT (MSAA + depth) -> ink outline, paper grain, brush noise, held-frame duotone
const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4, depthTexture: new THREE.DepthTexture(4, 4) });
const post = new THREE.ShaderMaterial({
  uniforms: { tC: { value: rt.texture }, tD: { value: rt.depthTexture }, res: { value: new THREE.Vector2(1, 1) }, pr: { value: 1 }, near: { value: camera.near }, far: { value: camera.far }, freeze: { value: 0 }, time: { value: 0 },
    ink: { value: new THREE.Color(PAL.ink) }, paper: { value: new THREE.Color(PAL.paper) }, red: { value: new THREE.Color(PAL.red) } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }',
  fragmentShader: `
  uniform sampler2D tC, tD; uniform vec2 res; uniform float pr, near, far, freeze, time; uniform vec3 ink, paper, red; varying vec2 vUv;
  float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
  float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
  float inv(vec2 uv){ float d=texture2D(tD,uv).x; float z=(2.*near*far)/((far+near)-(2.*d-1.)*(far-near)); return 1./z; }
  float lum(vec3 c){ return dot(c,vec3(.3,.55,.15)); }
  void main(){
    vec2 px=1./res; vec2 fc=gl_FragCoord.xy/pr;
    vec2 wob=(vec2(vn(fc*.045+3.),vn(fc*.045+9.))-.5)*3.4*px*pr;
    vec2 uv=vUv+wob*.6;
    vec3 col=texture2D(tC,vUv).rgb;
    float w=2.0*pr;
    vec2 o=px*w;
    float c=inv(uv), l=inv(uv-vec2(o.x,0.)), r=inv(uv+vec2(o.x,0.)), u=inv(uv+vec2(0.,o.y)), d=inv(uv-vec2(0.,o.y));
    float e=max(abs(l+r-2.*c),abs(u+d-2.*c))/max(c,1e-5);
    float eDepth=smoothstep(.03,.09,e);
    float sky = step(c,1./(far*.97));
    float cc=lum(col), cl=lum(texture2D(tC,uv-vec2(o.x,0.)).rgb), cr=lum(texture2D(tC,uv+vec2(o.x,0.)).rgb), cu=lum(texture2D(tC,uv+vec2(0.,o.y)).rgb), cd=lum(texture2D(tC,uv-vec2(0.,o.y)).rgb);
    float eLum=smoothstep(.2,.45,max(abs(cl-cr),abs(cu-cd)))*.7*(1.-sky);
    float edge=clamp(max(eDepth*(1.-sky*.0),eLum),0.,1.);
    edge*=mix(.7,1.,vn(fc*.35)); edge*=mix(.35,1.,smoothstep(1./520.,1./140.,c));
    // gouache: lifted blacks, brush streaks, soft blotches
    float brush=vn(vec2(fc.x*.012,fc.y*.16)+vn(fc*.01)*2.)*.6+vn(fc*.03)*.4;
    col*=1.+(brush-.5)*.15;
    col=mix(col,paper*.35,.045);
    float grain=h21(floor(fc)+.37)-.5; float fib=vn(vec2(fc.x*.7+fc.y*.1,fc.y*.045))-.5;
    col*=1.+grain*.11+fib*.07;
    float Ld=lum(col); float hatch0=step(.62,fract((fc.x-fc.y)*.14+vn(fc*.02)*.8))*smoothstep(.2,.07,Ld)*(1.-sky)*smoothstep(1./600.,1./90.,c); col=mix(col,ink,hatch0*.36);
    col=mix(col,ink,edge*.95);
    vec2 q=vUv-.5; float v=smoothstep(.35,.95,length(q*vec2(1.1,1.)));
    col=mix(col,col*vec3(.72,.62,.55),v*.55);
    // held frame: ink + paper duotone, accent red kept
    if(freeze>0.){
      float L=lum(col); float acc=smoothstep(.62,.85,1.-max(col.g,col.b)/max(col.r,1e-3))*step(.04,col.r);
      float t=smoothstep(.06,.8,L); t=floor(t*4.+.5)/4.;
      float hatch=step(.5,fract((fc.x+fc.y)*.16))*(1.-t)*.35;
      vec3 duo=mix(ink*.8,paper,clamp(t-hatch+grain*.2,0.,1.));
      duo=mix(duo,red,acc*.9);
      col=mix(col,duo,freeze);
    }
    gl_FragColor=linearToOutputTexel(vec4(col,1.));
  }`,
  depthTest: false, depthWrite: false,
});
const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post); postQuad.frustumCulled = false;
const postScene = new THREE.Scene(); postScene.add(postQuad);
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
function resizePost() {
  const pr = renderer.getPixelRatio(), w = Math.max(2, Math.floor(innerWidth * pr)), h = Math.max(2, Math.floor(innerHeight * pr));
  rt.setSize(w, h); post.uniforms.res.value.set(w, h); post.uniforms.pr.value = pr;
}
resizePost();
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); resizePost(); });

// hand-painted dusk sky: gradient, painted cloud bands, low sun with a halo
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color(0x8a93b2) }, mid: { value: new THREE.Color(0xc2adb8) }, rose: { value: new THREE.Color(0xe0b8a8) }, hor: { value: new THREE.Color(0xf4c89c) }, sun: { value: new THREE.Color(PAL.sun) }, indigo: { value: new THREE.Color(0x6c6f98) }, sunDir: { value: new THREE.Vector3(-0.22, 0.12, -0.97).normalize() } },
    vertexShader: 'varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform vec3 top,mid,rose,hor,sun,indigo,sunDir; varying vec3 vP;
    float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y); }
    float fbm(vec2 p){ return vn(p)*.5+vn(p*2.1)*.3+vn(p*4.3)*.2; }
    void main(){
      vec3 d=normalize(vP); float e=clamp(d.y,0.,1.);
      vec3 c=mix(hor,rose,smoothstep(0.,.1,e)); c=mix(c,mid,smoothstep(.07,.26,e)); c=mix(c,top,smoothstep(.2,.7,e));
      // glow around the low sun
      float sd=dot(d,sunDir); c=mix(c,sun,smoothstep(.45,.995,sd)*.8); 
      // painted cloud bands: horizontal streaks, quantised into flat shapes with a shaded underside
      vec2 p=d.xz/(d.y+.16); p*=vec2(.55,1.9);
      float n=fbm(p*vec2(1.4,3.2)+vec2(0.,2.)); float band=smoothstep(.02,.18,e)*smoothstep(.95,.35,e);
      float m=smoothstep(.44,.47,n+(.5-e)*.12)*band;
      float under=smoothstep(.47,.5,fbm(p*vec2(1.4,3.2)+vec2(0.,2.)+vec2(0.,.07)));
      vec3 cl=mix(mix(vec3(.93,.55,.5),vec3(1.,.8,.6),.5),sun,smoothstep(.5,.99,sd)*.6);
      vec3 sh=mix(indigo,rose,.35);
      c=mix(c,mix(sh,cl,under),m*.95);
      float m2=smoothstep(.6,.64,fbm(p*vec2(2.4,6.)+7.))*band*.55; c=mix(c,mix(cl,hor,.4),m2);
      // sun disc with ink ring
      float disc=smoothstep(.9962,.9964,sd); float ring=smoothstep(.9950,.9952,sd)*(1.-smoothstep(.9954,.9956,sd)); c=mix(c,vec3(.93,.62,.5),ring*.6); c=mix(c,vec3(1.,.93,.7),disc);
      gl_FragColor=vec4(c,1.); }`,
  }));
  sky.name = 'sky'; sky.renderOrder = -10; sky.onBeforeRender = (r, s, cam) => sky.position.copy(cam.position); scene.add(sky);
}
// layered haze-faded ridges behind the terrain: flat painted silhouettes
{
  const L = [[270, 26, 0xa3909f, 0.9], [340, 34, 0xb79fa6, 1.3], [420, 40, 0xcbb0a8, 2.1]];
  L.forEach(([R, amp, hex, ph], li) => {
    const n = 180, pos = [], idx = [];
    for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const pk = Math.abs(Math.sin(a * 5 + ph)) * 0.55 + Math.abs(Math.sin(a * 11 + ph * 2)) * 0.3 + 0.15; const h = -30 + (amp + 30) * pk * 0.9 + 10; pos.push(Math.cos(a) * R, -40, Math.sin(a) * R, Math.cos(a) * R, h, Math.sin(a) * R); if (i < n) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: hex, side: THREE.DoubleSide, fog: false })); m.name = 'ridge' + li; m.renderOrder = -5 + li * 0.1; m.frustumCulled = false; scene.add(m);
  });
}
const rim = new THREE.PointLight(0xffe2b8, 0, 14, 1.2); scene.add(rim);
const sun = new THREE.DirectionalLight(0xffd8a8, 3.6);
sun.position.copy(SUN_DIR).multiplyScalar(110);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -44, right: 44, top: 44, bottom: -44, near: 10, far: 260 });
sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.06;
scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight(0xdcc8d0, 0x4c5688, 2.5); scene.add(hemi);

// toon bands: shade / mid / lit
const toonMap = (() => { const n = 24, d = new Uint8Array(n * 4); for (let i = 0; i < n; i++) { const nl = ((i + 0.5) / n) * 2 - 1, v = nl < 0.02 ? 0 : nl < 0.4 ? 0.82 : 1; d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = Math.round(v * 255); d[i * 4 + 3] = 255; } const t = new THREE.DataTexture(d, n, 1, THREE.RGBAFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const toonGround = (() => { const d = new Uint8Array([150,148,160,255, 255,255,255,255]); const t = new THREE.DataTexture(d, 2, 1, THREE.RGBAFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();

// ───────────────────────── terrain: a dusk meadow ringed by hills ─────────────────────────
function gh(x, z) {
  const r = Math.hypot(x, z);
  const base = 0.35 * Math.sin(x * 0.1) * Math.cos(z * 0.12) + 0.25 * Math.sin(x * 0.23 + z * 0.19);
  const w = clamp((-z + 5) / 25, 0, 1);
  const ridge = w * 2.5 * Math.exp(-(((r - 38) / 6) ** 2));
  const mount = 9 * Math.exp(-(((x - 34) ** 2 + (z + 30) ** 2) / 150)) + 7 * Math.exp(-(((x + 36) ** 2 + (z + 28) ** 2) / 130));
  const a = Math.atan2(z, x);
  const far = sm(46, 130, r) * (7 + 9 * (0.5 + 0.5 * Math.sin(a * 2.3 + 1.0)) + 5 * Math.sin(x * 0.045 + 1.3) * Math.cos(z * 0.04)) * (z < 10 ? 1 : 0.55);
  const far2 = sm(120, 220, r) * (18 + 14 * Math.sin(a * 3.1 + 0.4) * Math.sin(a * 1.3));
  return 1.1 + base + ridge + mount + far + Math.max(0, far2);
}
const PLAY_R = 30;
{
  const N = 70, S = 440;
  let g = new THREE.PlaneGeometry(S, S, N, N); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, gh(p.getX(i), p.getZ(i)));
  g.computeVertexNormals(); g = g.toNonIndexed();
  const pos = g.attributes.position, nor = g.attributes.normal, col = new Float32Array(pos.count * 3);
  const ochre = new THREE.Color(0xc2b062), sage = new THREE.Color(0x9aa86a), olive = new THREE.Color(0x6a7e46), warm = new THREE.Color(0xb1b274), hill = new THREE.Color(0x707a5c), far = new THREE.Color(0x8a8a78), rock = new THREE.Color(0x9a927f), indigo = new THREE.Color(0x4c5688), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const cx = pos.getX(i), cz = pos.getZ(i), cy = pos.getY(i), ny = nor.getY(i), r = Math.hypot(cx, cz);
    const wob = 0.32 * Math.sin(cx * 0.55 + cz * 0.35) * Math.sin(cz * 0.5 - cx * 0.3) + 0.15 * Math.sin(cx * 1.3 + cz * 0.9);
    const patch = Math.sin(cx * 0.09 + Math.sin(cz * 0.07) * 2) + Math.sin(cz * 0.11 - cx * 0.05) * 0.8 + wob;
    c.copy(sage).lerp(warm, patch > -0.35 ? 1 : 0).lerp(ochre, patch > 1.1 ? 1 : 0);
    c.lerp(olive, (Math.sin(cx * 0.21 - cz * 0.17) * Math.sin(cz * 0.13 + cx * 0.09) + wob * 0.8) > 0.58 ? 0.8 : 0);
    if (r > 34) c.lerp(hill, Math.round(sm(34, 70, r) * 3) / 3 * 0.75);
    if (r > 90) c.lerp(far, Math.round(sm(90, 190, r) * 3) / 3 * 0.7);
    if (ny < 0.8 && cy > 3) c.lerp(rock, 0.6);
    { const ip = Math.sin(cx * 0.14 + 1.7) * Math.sin(cz * 0.12 - 0.6) + 0.5 * Math.sin(cx * 0.3 + cz * 0.22); if (ip > 0.62 && r < 60) c.lerp(indigo, 0.55); }
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: toonGround }));
  m.name = 'ground'; m.receiveShadow = true; scene.add(m);
}

// ───────────────────────── geometry builder ─────────────────────────
function mk(geo, hex, { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1], jit = 0, soft = false } = {}) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...p), new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)), new THREE.Vector3(...s)));
  if (!soft) g.computeVertexNormals();
  const n = g.attributes.position.count, col = new Float32Array(n * 3), base = new THREE.Color(hex), c = new THREE.Color();
  for (let i = 0; i < n; i += 3) {
    c.copy(base); if (jit) c.offsetHSL(0, 0, (Math.random() - 0.5) * jit);
    for (let k = 0; k < 3; k++) { col[(i + k) * 3] = c.r; col[(i + k) * 3 + 1] = c.g; col[(i + k) * 3 + 2] = c.b; }
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.deleteAttribute('uv');
  return g;
}
const ico = (r, d = 1) => new THREE.IcosahedronGeometry(r, d);
const box = (x, y, z) => new THREE.BoxGeometry(x, y, z);
const cone = (r, h, n = 6) => new THREE.ConeGeometry(r, h, n);
const toon2 = (() => { const d = new Uint8Array([120,125,150,255, 255,255,255,255]); const t = new THREE.DataTexture(d, 2, 1, THREE.RGBAFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const treeMat = () => new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: toon2, emissive: 0x1c2a22 });
const flat = (mat = {}) => new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: toonMap, ...mat });

// ───────────────────────── sheep geometry (shared by all 101) ─────────────────────────
const WOOL = PAL.wool, DARK = PAL.face;
const sheepBodyGeo = mergeGeometries([
  mk(ico(0.5, 1), WOOL, { p: [0, 0.62, 0], s: [1, 0.82, 1.3], jit: 0.04, soft: true }),
  mk(ico(0.3, 1), WOOL, { p: [0.22, 0.98, 0.22], jit: 0.04, soft: true }), mk(ico(0.3, 1), WOOL, { p: [-0.22, 0.98, 0.1], jit: 0.04, soft: true }),
  mk(ico(0.46, 1), 0x4a5278, { p: [0, 0.36, 0], s: [0.95, 0.4, 1.25], soft: true }),
  mk(ico(0.3, 1), WOOL, { p: [0, 1.0, -0.3], jit: 0.04, soft: true }), mk(ico(0.26, 1), WOOL, { p: [0.3, 0.7, -0.62], jit: 0.04, soft: true }),
  mk(ico(0.26, 1), WOOL, { p: [-0.3, 0.7, -0.6], jit: 0.04, soft: true }),
  ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z]) => mk(box(0.09, 0.46, 0.09), 0x1c1514, { p: [x * 0.22, 0.21, z * 0.42] })),
]);
const sheepHeadGeo = mergeGeometries([
  mk(box(0.36, 0.34, 0.44), DARK, { p: [0, 0, 0.2] }),
  mk(box(0.2, 0.07, 0.12), 0x3a2c26, { p: [0.26, 0.08, 0.06], r: [0, 0, -0.4] }), mk(box(0.2, 0.07, 0.12), 0x3a2c26, { p: [-0.26, 0.08, 0.06], r: [0, 0, 0.4] }),
  mk(box(0.07, 0.07, 0.03), 0xf3e8cc, { p: [0.1, 0.07, 0.42] }), mk(box(0.07, 0.07, 0.03), 0xf3e8cc, { p: [-0.1, 0.07, 0.42] }),
  mk(ico(0.2, 1), WOOL, { p: [0, 0.22, 0.02], soft: true }),
]);
const SS = 1.8;
const HEAD_P = new THREE.Vector3(0, 0.78, 0.6);
const N_AI = 100, N = N_AI + 1;
const toonSheep = (() => { const d = new Uint8Array([176,170,160,255, 255,255,255,255]); const t = new THREE.DataTexture(d, 2, 1, THREE.RGBAFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const sheepMat = flat({ emissive: 0x4a3e30, gradientMap: toonSheep }); const bodyIM = new THREE.InstancedMesh(sheepBodyGeo, sheepMat, N); bodyIM.name = 'sheep'; bodyIM.castShadow = false; bodyIM.frustumCulled = false;
const headIM = new THREE.InstancedMesh(sheepHeadGeo, sheepMat, N); headIM.name = 'sheep-heads'; headIM.castShadow = false; headIM.frustumCulled = false;
{ const tints = [0xffffff, 0xfaf0dc, 0xefe2c6, 0xffffff, 0xf2e6cf, 0xe0d4bb]; const c = new THREE.Color();
  for (let i = 0; i < N; i++) { const j = i === 0 ? 13 : i, t = tints[(j * 7 + (j >> 2)) % tints.length]; c.setHex(t).multiplyScalar(0.92 + ((j * 37) % 17) / 17 * 0.1); bodyIM.setColorAt(i, c); headIM.setColorAt(i, new THREE.Color(0xffffff)); } }
const SZ = Array.from({ length: N }, (_, i) => 0.88 + (((i === 0 ? 13 : i) * 53) % 23) / 23 * 0.3);
scene.add(bodyIM, headIM);
const hullBody = mergeGeometries([mk(ico(0.5, 1), WOOL, { p: [0, 0.68, -0.02], s: [1.05, 0.95, 1.45], soft: true }), mk(ico(0.3, 0), WOOL, { p: [0, 0.4, 0], s: [1, 0.6, 1.6], soft: true })]);
const hullHead = mergeGeometries([mk(ico(0.28, 1), DARK, { p: [0, 0.02, 0.2], s: [1, 0.95, 1.2], soft: true })]);
{ const hull = (g, d) => { const h = g.clone(); h.deleteAttribute('color'); const p = h.attributes.position, n = h.attributes.normal; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + n.getX(i) * d, p.getY(i) + n.getY(i) * d, p.getZ(i) + n.getZ(i) * d); return h; };
  const im = new THREE.MeshBasicMaterial({ color: 0x2b211c, side: THREE.BackSide, fog: false });
  const ob = new THREE.InstancedMesh(hull(hullBody, 0.05), im, N), oh = new THREE.InstancedMesh(hull(hullHead, 0.04), im, N);
  ob.instanceMatrix = bodyIM.instanceMatrix; oh.instanceMatrix = headIM.instanceMatrix; { const pm = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }); const pb = new THREE.InstancedMesh(hullBody, pm, N), ph = new THREE.InstancedMesh(hullHead, pm, N); pb.instanceMatrix = bodyIM.instanceMatrix; ph.instanceMatrix = headIM.instanceMatrix; pb.name = 'sheep-shadow'; ph.name = 'sheep-heads-shadow'; pb.castShadow = ph.castShadow = true; pb.frustumCulled = ph.frustumCulled = false; scene.add(pb, ph); }
  ob.name = 'sheep-ink'; oh.name = 'sheep-heads-ink'; ob.frustumCulled = oh.frustumCulled = false; scene.add(ob, oh); }

// ───────────────────────── wolf ─────────────────────────
const wolf = { x: -10, z: 3, y: 0, yaw: 0.6, state: 'watch', pose: 'crouch', t: 0, bites: 3, cd: 5, sulk: 0, target: null, abort: 0, stalkT: 0, lookX: 0, lookZ: 0, phase: 0, onRock: true, shrug: 0, pitch: 0 };
const ROCK = { x: -10, z: 3, top: 4.1 };
const W = {};
{
  const grey = PAL.wolf, light = 0x1d1511, dk = 0x0e0a08;
  W.root = new THREE.Group(); W.root.name = 'wolf'; W.root.scale.setScalar(8);
  W.body = new THREE.Group(); W.root.add(W.body);
  const mat = new THREE.MeshBasicMaterial({ color: PAL.wolf, fog: false });
  const add = (parent, g) => { const m = new THREE.Mesh(g, mat); m.castShadow = true; parent.add(m); return m; };
  // smooth rounded masses only (WOLF.png: sleek long-snouted silhouette, tall ears, bush tail, slim legs)
  const blob = (sx, sy, sz, px, py, pz, rx = 0, ry = 0, rz = 0) => new THREE.SphereGeometry(0.5, 16, 12).scale(sx, sy, sz).rotateX(rx).rotateY(ry).rotateZ(rz).translate(px, py, pz);
  const taper = (r0, r1, len, px, py, pz, rx = 0, rz = 0) => new THREE.CylinderGeometry(r1, r0, len, 10).rotateX(rx).rotateZ(rz).translate(px, py, pz);
  add(W.body, mergeGeometries([
    blob(0.62, 0.62, 0.95, 0, 0.82, 0.5),      // deep chest
    blob(0.5, 0.52, 0.85, 0, 0.78, -0.35),     // rump
    blob(0.4, 0.4, 1.0, 0, 0.8, 0.1),          // waist link
    blob(0.4, 0.55, 0.55, 0, 0.98, 0.7, -0.5), // shoulder ruff
    taper(0.17, 0.11, 0.6, 0, 1.0, 0.98, 1.0), // neck
  ]));
  W.body.children[0].name = 'wolf-body';
  W.head = new THREE.Group(); W.head.name = 'wolf-head'; W.head.position.set(0, 1.12, 1.1); W.body.add(W.head);
  add(W.head, mergeGeometries([
    blob(0.42, 0.4, 0.55, 0, 0, 0.06),                        // skull
    taper(0.15, 0.06, 0.62, 0, -0.07, 0.5, Math.PI / 2 - 0.02), // long snout
    blob(0.1, 0.08, 0.12, 0, -0.03, 0.82),                    // nose
    new THREE.ConeGeometry(0.11, 0.42, 8).translate(0, 0.21, 0).rotateZ(-0.18).translate(0.14, 0.15, -0.04),
    new THREE.ConeGeometry(0.11, 0.42, 8).translate(0, 0.21, 0).rotateZ(0.18).translate(-0.14, 0.15, -0.04),
  ]));
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xe9c46a, fog: false });
  [-1, 1].forEach(sx => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6).scale(1.3, 0.8, 1), eyeMat); e.position.set(sx * 0.15, 0.06, 0.36); W.head.add(e); });
  W.legs = [];
  [[-1, 0.62], [1, 0.62], [-1, -0.55], [1, -0.55]].forEach(([sx, z]) => {
    const g = new THREE.Group(); g.name = 'wolf-leg'; g.position.set(sx * 0.2, 0.72, z); W.body.add(g);
    add(g, mergeGeometries([taper(0.1, 0.055, 0.7, 0, -0.34, 0), blob(0.13, 0.08, 0.26, 0, -0.69, 0.07)]));
    W.legs.push(g);
  });
  W.tail = new THREE.Group(); W.tail.name = 'wolf-tail'; W.tail.position.set(0, 0.85, -0.95); W.body.add(W.tail);
  add(W.tail, blob(0.22, 0.24, 0.95, 0, -0.28, -0.3, -0.55));
  scene.add(W.root);
}
// the rock the wolf watches from
const rockMat = flat();
{
  const g = mergeGeometries([
    mk(ico(2.2, 2), 0xa39a86, { p: [0, 0.4, 0], s: [1.2, 0.8, 1], soft: true }),
    mk(ico(1.5, 2), 0x8f8774, { p: [1.4, 0.5, 1.0], s: [1, 0.8, 1], soft: true }),
    mk(ico(1.2, 2), 0xb3aa94, { p: [-1.0, 0.9, -0.6], soft: true }),
  ]);
  const m = new THREE.Mesh(g, rockMat); m.position.set(ROCK.x, gh(ROCK.x, ROCK.z) + 0.2, ROCK.z); m.castShadow = m.receiveShadow = true; m.name = 'wolf-rock'; m.scale.setScalar(1.9); scene.add(m);
}

// ───────────────────────── scenery (instanced) ─────────────────────────
const dummy = new THREE.Object3D();
function scatterInst(geo, count, gen, { shadow = true, name = '' } = {}) {
  const im = new THREE.InstancedMesh(geo, /pine|tree/.test(name) ? treeMat() : flat(), count); im.name = name; im.castShadow = shadow; im.receiveShadow = true;
  let k = 0, tries = 0;
  while (k < count && tries++ < count * 60) {
    const o = gen(); if (!o) continue;
    dummy.position.set(o.x, o.y ?? gh(o.x, o.z), o.z); dummy.rotation.set(o.rx || 0, rnd(0, 6.28), o.rz || 0); dummy.scale.set(o.sx ?? o.s, o.sy ?? o.s, o.sx ?? o.s);
    dummy.updateMatrix(); im.setMatrixAt(k++, dummy.matrix);
  }
  im.count = k; im.instanceMatrix.needsUpdate = true; scene.add(im); return im;
}
const polar = (r0, r1) => { const a = rnd(0, 6.283), r = rnd(r0, r1); return [Math.cos(a) * r, Math.sin(a) * r]; };
// pines: dark triangle tiers (indigo-green), oaks: teardrop crowns, walls: dry-stone runs
const pineGeo = mergeGeometries([
  mk(cone(0.2, 0.9, 7), 0x3a2a20, { p: [0, 0.45, 0], soft: true }),
  mk(cone(1.15, 2.0, 11), 0x34503f, { p: [0, 1.7, 0], jit: 0.0, soft: true }), mk(cone(0.9, 1.8, 11), 0x3a5a45, { p: [0, 2.8, 0], soft: true }), mk(cone(0.6, 1.6, 11), 0x41644a, { p: [0, 3.8, 0], soft: true }),
]);
const pinesMesh = scatterInst(pineGeo, 32, () => { const [x, z] = polar(52, 130); if (z > 4) return null; const h = gh(x, z); const s = rnd(1.1, 2.4) * (Math.hypot(x, z) > 70 ? 1.6 : 1); return { x, z, s, sy: s * rnd(1.0, 1.5), y: h - 0.2 }; }, { name: 'pines' });
const roundTreeGeo = mergeGeometries([
  mk(cone(0.24, 2.0, 7), 0x4a3324, { p: [0, 1.0, 0], soft: true }),
  mk(ico(1.2, 2), 0x6f7d44, { p: [0, 2.9, 0], s: [1, 1.2, 1], soft: true }), mk(ico(0.85, 2), 0x84914f, { p: [0.7, 2.4, 0.25], soft: true }), mk(ico(0.75, 2), 0x5f6e3b, { p: [-0.65, 2.45, -0.2], soft: true }), mk(ico(0.6, 2), 0x93a05a, { p: [0.15, 3.7, 0.1], soft: true }),
]);
scatterInst(roundTreeGeo, 14, () => { const [x, z] = polar(33, 58); if (z > 2 || Math.hypot(x, z) < 33) return null; const s = rnd(1.1, 1.7); return { x, z, s }; }, { name: 'round-trees' });
// two big framing oaks at the meadow's edge
{ const im = new THREE.InstancedMesh(roundTreeGeo, treeMat(), 3); im.name = 'oaks'; im.castShadow = im.receiveShadow = true;
  [[-35, -8, 2.4], [37, -16, 2.2], [-14, -42, 2.8]].forEach(([x, z, s], i) => { dummy.position.set(x, gh(x, z) - 0.1, z); dummy.rotation.set(0, i * 2, 0); dummy.scale.setScalar(s); dummy.updateMatrix(); im.setMatrixAt(i, dummy.matrix); }); scene.add(im); }
const treeInk = im => { const h = im.geometry.clone(); h.deleteAttribute('color'); const p = h.attributes.position, n = h.attributes.normal; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + n.getX(i) * 0.07, p.getY(i) + n.getY(i) * 0.07, p.getZ(i) + n.getZ(i) * 0.07); const o = new THREE.InstancedMesh(h, new THREE.MeshBasicMaterial({ color: 0x2b211c, side: THREE.BackSide, fog: false }), im.count); o.instanceMatrix = im.instanceMatrix; o.name = im.name + '-ink'; o.frustumCulled = false; scene.add(o); };
treeInk(scene.getObjectByName('round-trees')); treeInk(scene.getObjectByName('oaks'));
const rockGeo = mergeGeometries([mk(ico(0.8, 1), 0xa39a86, { s: [1, 0.7, 1], soft: true }), mk(ico(0.5, 1), 0xb3aa94, { p: [0.6, -0.1, 0.2], soft: true })]);
scatterInst(rockGeo, 40, () => { const [x, z] = polar(18, 56); const h = gh(x, z); if (Math.hypot(x - ROCK.x, z - ROCK.z) < 5) return null; const s = rnd(0.5, 1.4) * (Math.hypot(x, z) > 32 ? 2.4 : 1); return { x, z, s, y: h + 0.2 * s }; }, { name: 'rocks' });
const bushGeo = mergeGeometries([mk(ico(0.6, 1), 0x74834a, { s: [1, 0.75, 1], soft: true }), mk(ico(0.45, 1), 0x86954f, { p: [0.45, -0.05, 0.1], soft: true }), mk(ico(0.4, 1), 0x66743f, { p: [-0.4, -0.05, -0.1], soft: true })]);
scatterInst(bushGeo, 34, () => { const [x, z] = polar(8, 33); if (Math.hypot(x - ROCK.x, z - ROCK.z) < 4) return null; return { x, z, s: rnd(0.6, 1.1), y: gh(x, z) + 0.25 }; }, { name: 'bushes' });
const tuftGeo = mergeGeometries([0, 1, 2].map(i => mk(cone(0.1, 0.55, 3), i === 1 ? 0xd2bd6c : 0x98a257, { p: [Math.cos(i * 2.1) * 0.12, 0.25, Math.sin(i * 2.1) * 0.12], r: [Math.sin(i * 2.1) * 0.35, 0, -Math.cos(i * 2.1) * 0.35], jit: 0.12 })));
scatterInst(tuftGeo, 180, () => { const [x, z] = polar(0, 33); return { x, z, s: rnd(0.7, 1.6), y: gh(x, z) - 0.05 }; }, { shadow: false, name: 'tufts' });
// dry-stone wall runs (merged, one mesh)
{
  const runs = [
    [[-46, -29], [-30, -34], [-12, -38.5], [6, -39], [22, -36]],
    [[37, -22], [41, -8], [40, 8], [36, 20]],
    [[-40, 16], [-37, 2], [-36, -12]],
  ];
  const parts = [];
  const sh = [0xa79f8c, 0x968d79, 0xb5ad98, 0x8d8573];
  runs.forEach(run => {
    for (let k = 0; k < run.length - 1; k++) {
      const [x0, z0] = run[k], [x1, z1] = run[k + 1], L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0);
      for (let d = 0; d < L; d += 0.75) {
        const x = lerp(x0, x1, d / L), z = lerp(z0, z1, d / L), y = gh(x, z);
        for (let row = 0; row < 3; row++) {
          const w = rnd(0.55, 0.8), hgt = 0.34 + rnd(0.002, 0.08), off = (row % 2) * 0.35;
          const px = x + Math.cos(a) * (off - 0.2) * 0, pz = z;
          parts.push(mk(box(rnd(0.9, 1.0), hgt, w), sh[(row + Math.floor(d * 3)) % 4], { p: [x, y + 0.12 + row * 0.4 + hgt / 2 - 0.12 + rnd(0, 0.01), pz], r: [0, a - Math.PI / 2 + rnd(-0.06, 0.06), 0], jit: 0.07 }));
        }
        if (Math.random() < 0.35) parts.push(mk(box(rnd(0.96, 1.04), 0.22, rnd(0.9, 0.98)), 0xbfb7a0, { p: [x, y + 1.35 + rnd(0.002, 0.03), z], r: [0, a - Math.PI / 2, 0], jit: 0.06 }));
      }
    }
  });
  const wm = new THREE.Mesh(mergeGeometries(parts), flat({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })); wm.name = 'walls'; wm.castShadow = wm.receiveShadow = true; scene.add(wm);
}
const clouds = [];

// ───────────────────────── clover patches ─────────────────────────
const clovers = [];
{
  const cm = flat(), star = new THREE.MeshBasicMaterial({ color: 0xfff6d0, transparent: true, opacity: 0, depthWrite: false, depthTest: false, fog: false });
  const geo = mergeGeometries([
    ...[0, 1, 2, 3, 4, 5].map(i => mk(ico(0.3, 0), i % 2 ? 0x6b7f38 : 0x7f9348, { p: [Math.cos(i * 1.05) * 0.5, 0.1, Math.sin(i * 1.05) * 0.5], s: [1, 0.45, 1], jit: 0.1 })),
    mk(ico(0.12, 0), 0xf3e8cc, { p: [0.2, 0.28, 0.1] }), mk(ico(0.12, 0), 0xd9a49a, { p: [-0.3, 0.26, -0.2] }), mk(ico(0.12, 0), 0xf3e8cc, { p: [0.0, 0.3, -0.5] }),
  ]);
  [[14, -5], [-3, 15], [-19, 8]].forEach(([x, z]) => {
    const g = new THREE.Group(); g.position.set(x, gh(x, z), z); g.name = 'clover';
    const m = new THREE.Mesh(geo, cm); m.receiveShadow = true; g.add(m);
    const sp = new THREE.Group(); sp.position.y = 2.2; sp.scale.setScalar(2);
    sp.add(new THREE.Mesh(box(0.1, 0.9, 0.02), star), new THREE.Mesh(box(0.7, 0.08, 0.02), star)); g.add(sp);
    const cr = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.9, 28).rotateX(-Math.PI / 2), star); cr.position.y = 0.25; cr.material = star; sp.userData.ring = cr; g.add(cr);
    const dm = new THREE.MeshBasicMaterial({ color: 0xf2b47a, transparent: true, opacity: 0.55, depthWrite: false, depthTest: false, fog: false });
    const outl = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.0, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2a1c12, transparent: true, opacity: 0.8, depthWrite: false, fog: false })); outl.position.y = 0.28; g.add(outl);
    const patch = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x4f6a2c, transparent: true, opacity: 0.9, depthWrite: false, fog: false })); patch.position.y = 0.27; g.add(patch);
    const disc = new THREE.Mesh(new THREE.RingGeometry(0, 1.9, 32).rotateX(-Math.PI / 2), dm); disc.position.y = 0.3; disc.renderOrder = 4; g.add(disc);
    scene.add(g); clovers.push({ x, z, g, mesh: m, star: sp, prog: 0, eaten: false });
  });
}

// ───────────────────────── markers & fx ─────────────────────────
const ringMat = c => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.4, depthWrite: false, fog: false });
const marker = new THREE.Mesh(new THREE.RingGeometry(0.85, 1.1, 28).rotateX(-Math.PI / 2), ringMat(0xf2b47a)); marker.name = 'player'; scene.add(marker);
const reach = new THREE.Mesh(new THREE.RingGeometry(4.4, 4.6, 40).rotateX(-Math.PI / 2), ringMat(0xb3261e)); reach.name = 'reach'; reach.visible = false; scene.add(reach);
const aim = new THREE.Mesh(new THREE.RingGeometry(2.4, 3.8, 32).rotateX(-Math.PI / 2), ringMat(0xe0a03a)); aim.material.opacity = 0.95; aim.material.depthTest = false; aim.renderOrder = 5; aim.name = 'aim'; { const am = new THREE.MeshBasicMaterial({ color: 0xb3261e, depthTest: false, fog: false }); const ar = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.8, 4).rotateX(Math.PI), am); ar.renderOrder = 6; ar.position.y = 5; ar.name = 'aimArrow'; aim.add(ar); const ar2 = new THREE.Mesh(new THREE.RingGeometry(1.5, 2.4, 32).rotateX(-Math.PI / 2), am); ar2.renderOrder = 5; aim.add(ar2); { const wm = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, fog: false, transparent: true, opacity: 0.9 }); const ro = new THREE.Mesh(new THREE.RingGeometry(3.8, 4.2, 32).rotateX(-Math.PI / 2), wm); ro.renderOrder = 5; aim.add(ro); } aim.userData.arrow = ar; } aim.visible = false; scene.add(aim);
const aimLine = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xb3261e, depthTest: false, fog: false, transparent: true, opacity: 0.8 })); aimLine.renderOrder = 4; aimLine.name = 'aimLine'; aimLine.visible = false; scene.add(aimLine);
const wolfRing = new THREE.Mesh(new THREE.RingGeometry(6.4, 7.8, 36).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe0a03a, depthTest: false, fog: false, transparent: true, opacity: 0.9 })); wolfRing.renderOrder = 6; wolfRing.name = 'wolfRing'; { const f = new THREE.Mesh(new THREE.CircleGeometry(6.3, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x8e9a58, depthTest: false, fog: false, transparent: true, opacity: 0.45 })); f.renderOrder = 6; f.name = 'wolfRingFill'; wolfRing.add(f); wolfRing.userData.fill = f; } wolfRing.visible = false; scene.add(wolfRing);
const outline = new THREE.Group(); outline.visible = false; outline.name = 'outline';
{
  const om = new THREE.MeshBasicMaterial({ color: 0xb3261e, side: THREE.BackSide, depthTest: false }); om.fog = false;
  const a = new THREE.Mesh(sheepBodyGeo, om), b = new THREE.Mesh(sheepHeadGeo, om); b.position.copy(HEAD_P); a.renderOrder = b.renderOrder = 20; outline.add(a, b); outline.userData = { a, b };
  scene.add(outline);
}
const wool = burst({ max: 500, seed: 7, size: 1.1, additive: false }); wool.name = 'wool'; scene.add(wool);
{ const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, '#fff'); g.addColorStop(0.7, '#fff'); g.addColorStop(1, '#fff0'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; wool.material.map = tex; wool.material.alphaTest = 0.02; wool.material.fog = false; wool.material.toneMapped = false; wool.material.depthWrite = false; wool.material.needsUpdate = true; }
const camShake = shake(camera, { seed: 3, decay: 5 });

// ───────────────────────── sound ─────────────────────────
sfx.define('baa', { frequency: 300, shape: 2, attack: 0.03, sustain: 0.22, release: 0.25, slide: -0.35, tremolo: 0.5, noise: 0.05, volume: 0.35, filter: -800 });
sfx.define('baa2', { frequency: 220, shape: 2, attack: 0.04, sustain: 0.3, release: 0.3, slide: -0.2, tremolo: 0.6, volume: 0.3, filter: -700 });
sfx.define('munch', { frequency: 120, shape: 4, attack: 0, sustain: 0.02, release: 0.07, noise: 0.7, volume: 0.45 });
sfx.define('wind', { frequency: 90, shape: 4, attack: 1.2, sustain: 1.6, release: 1.6, noise: 1.5, volume: 0.12, filter: -300 });
sfx.define('boom', { frequency: 50, shape: 0, attack: 0, sustain: 0.5, release: 0.9, slide: -0.1, volume: 1 });
sfx.define('stab1', { frequency: 233, shape: 2, attack: 0.02, sustain: 0.4, release: 0.5, volume: 0.35, filter: -1500 });
sfx.define('stab2', { frequency: 247, shape: 2, attack: 0.02, sustain: 0.4, release: 0.5, volume: 0.3, filter: -1500 });
sfx.define('stab3', { frequency: 349, shape: 2, attack: 0.02, sustain: 0.4, release: 0.5, volume: 0.25, filter: -1500 });
sfx.define('womp', { frequency: 180, shape: 2, attack: 0.02, sustain: 0.35, release: 0.2, slide: -0.4, volume: 0.35, filter: -1000 });
const play = (n, v = 1, w = 0) => { try { return sfx.play(n, v, w); } catch (e) { } };
const sting = () => { play('boom', 1); play('stab1', 1); play('stab2', 1); play('stab3', 0.9); };

// ───────────────────────── game state ─────────────────────────
const keys = new Set();
let mode = 'solo', T = 0, result = null, clock = 0, windT = 2, toastT = 0, startleT = 20, zoomT = 15, decoyI = 0, camHint = 0;
const flock = { angle: rnd(0, 6.28), target: 0, turnT: 12, vx: 0, vz: 0, moving: 0, running: 0, graze: 0 };
const sheep = [];
for (let i = 0; i < N; i++) sheep.push({ i, x: 0, z: 0, y: 0, vx: 0, vz: 0, yaw: 0, st: 'walk', t: 0, runT: 0, zoom: 0, susp: 0, still: 0, yawRate: 0, speedMax: 1, pitch: 0, phase: 0, frozen: false, immune: 0, hop: 0, hopV: 0, spin: 0, graze: false, player: i === 0, dir: 0 });
const P = sheep[0];
const pounce = { ph: null, t: 0 };
const cam = { x: 0, z: 0, punch: 0, close: 0, fov: 45, zoom: 1 };

function reset(newMode) {
  if (newMode) mode = newMode;
  T = 0; result = null; clock = 0; startleT = rnd(18, 24); zoomT = 16; decoyI = 0; pounce.ph = null; toastT = 0;
  flock.angle = rnd(0, 6.28); flock.target = flock.angle; flock.turnT = 12;
  // clusters of sheep
  const cl = []; for (let k = 0; k < 16; k++) { const [x, z] = polar(2, 26); cl.push([x, z]); }
  sheep.forEach((s, i) => {
    const [cx, cz] = cl[i % cl.length]; const [dx, dz] = polar(0, 9);
    let x = cx + dx, z = cz + dz; if (Math.hypot(x - ROCK.x, z - ROCK.z) < 4) { x += 6; z += 6; }
    if (Math.hypot(x, z) > 27) { x *= 0.8; z *= 0.8; }
    Object.assign(s, { x, z, vx: 0, vz: 0, yaw: rnd(0, 6.28), st: Math.random() < 0.5 ? 'graze' : 'walk', t: rnd(1, 6), runT: 0, zoom: 0, susp: 0, still: 0, yawRate: 0, speedMax: rnd(0.9, 1.4), pitch: 0, frozen: false, immune: 0, hop: 0, hopV: 0, spin: 0, graze: false, phase: rnd(0, 6) });
  });
  Object.assign(P, { x: 0, z: 1.5, yaw: Math.PI, st: 'walk' });
  Object.assign(wolf, { x: ROCK.x, z: ROCK.z, state: mode === 'solo' ? 'watch' : 'ctrl', pose: 'crouch', bites: 3, cd: 20, sulk: 0, target: null, abort: 0, onRock: mode === 'solo', yaw: 0.8, shrug: 0 });
  if (mode === 'local') { wolf.x = -5; wolf.z = -4; wolf.onRock = false; wolf.cd = 0; }
  clovers.forEach(c => { c.prog = 0; c.eaten = false; c.mesh.scale.setScalar(1); c.mesh.visible = true; });
  cam.x = P.x; cam.z = P.z; cam.punch = 0;
  hideReveal(); updateModeUI();
  if (mode === 'local') toast('Wolf: walk to the flock with arrows, get close, Enter to pounce', 4);
  $('rclv').style.display = mode === 'solo' ? '' : 'none'; $('rsus').style.display = mode === 'solo' ? '' : 'none';
  $('hud').style.minWidth = '200px';
}
const eatenCount = () => clovers.filter(c => c.eaten).length;

// ───────────────────────── UI ─────────────────────────
function updateModeUI() {
  $('mname').textContent = mode === 'solo' ? 'SOLO' : 'LOCAL 2-PLAYER';
  $('ctl').innerHTML = mode === 'solo'
    ? 'WASD / Arrows walk · Shift run (suspicious!)<br>E / Space graze · find the 3 clovers, hold E<br>R restart'
    : 'P1 sheep: WASD · Shift run · E graze<br>P2 wolf: Arrows move · RShift DASH · Enter POUNCE<br>R restart';
}
function toast(t, d = 2.2) { const e = $('toast'); e.textContent = t; e.style.opacity = 1; toastT = d; }
function hideReveal() {
  $('toast').style.opacity = 0; toastT = 0; $('rbig').style.fontSize = ''; splash.clear(); post.uniforms.freeze.value = 0; $('reveal').classList.remove('slam');
  $('reveal').style.opacity = 0; $('bubble').style.display = 'none'; $('tag').style.display = 'none'; $('cap').style.opacity = 0;
  $('bt').style.height = $('bb').style.height = '0'; $('vig').style.opacity = 0; outline.visible = false;
}
const caps = {
  stalk: ['The wolf is watching one sheep a little too closely.', 'Something about that sheep is... not quite sheep.', 'A sheep that jogs. How very curious.', 'Dusk is patient. The wolf is patient too.', 'That sheep walks as if it had somewhere to be.'],
  ai: ['And the wolf was wrong, as wolves so often are.', 'A perfectly innocent sheep. How awkward.', 'He bit, he chewed on his pride, he sulked.', 'Mistaken identity. The meadow keeps its secret.'],
  human: ['And so the hidden one was found.', 'Even at dusk, nobody blends in forever.', 'It had a name, and the name was Player One.'],
};
function caption(t) { const e = $('cap'); e.textContent = t; e.style.opacity = 1; }
function renderBites() {
  const e = $('pips'); const want = 3; let h = '';
  for (let i = 0; i < want; i++) h += `<span class="pip${i < wolf.bites ? '' : ' off'}"></span>`;
  if (e.dataset.v !== h) { e.innerHTML = h; e.dataset.v = h; }
}
function renderClovers() {
  let h = ''; const n = eatenCount(); for (let i = 0; i < 3; i++) h += `<span class="clv${i < n ? ' on' : ''}"></span>`;
  const e = $('clv'); if (e.dataset.v !== h) { e.innerHTML = h; e.dataset.v = h; }
}
function showResult(big, sub, kicker, color) {
  const stamp = color === '#ff3a2a' ? '#b3261e' : color === '#8e9a58' || color === '#8ee04a' ? '#4a5a24' : '#2a1c12';
  $('rbig').style.fontSize = big.length > 8 ? 'clamp(40px,7vw,110px)' : '';
  $('rk').textContent = kicker; $('rbig').textContent = big; $('rsub').textContent = sub; $('reveal').style.setProperty('--stampc', stamp);
  $('reveal').style.opacity = 1; $('reveal').classList.remove('slam'); void $('reveal').offsetWidth; $('reveal').classList.add('slam');
}
function endGame(kind, big, sub, kicker, color) { result = kind; $('cap').style.opacity = 0; $('toast').style.opacity = 0; showResult(big, sub + '   ·   R to play again · M to switch mode', kicker, color); }
// ink splash: a procedural blot, spatter and drips that burst across the screen on the bite
const splash = (() => {
  const cv = $('splash'), ctx = cv.getContext('2d'); let art = null, t0 = 0, burstT = 0, human = false;
  const blob = (cx, cy, r, k, rot) => { const pts = []; const n = 40, ph = [rnd(0, 6), rnd(0, 6), rnd(0, 6)]; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + rot; const rr = r * (1 + 0.22 * Math.sin(a * 3 + ph[0]) + 0.14 * Math.sin(a * 5 + ph[1]) + 0.09 * Math.sin(a * 9 + ph[2]) + (Math.sin(a * 13 + ph[0]) > 0.82 ? 0.45 : 0)); pts.push([cx + Math.cos(a) * rr * k, cy + Math.sin(a) * rr * k]); } return pts; };
  const poly = (pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); };
  function fire(isHuman, sx, sy) {
    human = isHuman; const w = cv.width = innerWidth, h = cv.height = innerHeight, m = Math.min(w, h) * (isHuman ? 1 : 0.72);
    const cx = w * 0.5 * 0.5 + sx * 0.5, cy = Math.max(h * 0.3, Math.min(h * 0.58, sy - h * 0.2)); const K = isHuman ? 1 : 0.68;
    art = { cx, cy, m, w, h, blots: [], spat: [], drips: [], rays: [] };
    art.blots.push({ r: m * 0.17, ox: 0, oy: 0, rot: rnd(0, 6), col: 0 });
    for (let i = 0; i < 9; i++) { const a = rnd(0, 6.283), d = m * rnd(0.12, 0.3); art.blots.push({ r: m * rnd(0.04, 0.1), ox: Math.cos(a) * d, oy: Math.sin(a) * d * 0.8, rot: rnd(0, 6), col: 0 }); }
    for (let i = 0; i < 90; i++) { const a = rnd(0, 6.283), d = m * (0.25 + Math.pow(Math.random(), 1.5) * 0.9); art.spat.push({ ox: Math.cos(a) * d * 1.3, oy: Math.sin(a) * d * 0.9, r: m * rnd(0.004, 0.022), col: Math.random() < 0.35 && isHuman ? 1 : 0 }); }
    for (let i = 0; i < 7; i++) art.drips.push({ ox: rnd(-0.18, 0.18) * m, w: m * rnd(0.012, 0.03), len: m * rnd(0.12, 0.38), delay: rnd(0, 0.3) });
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + rnd(-0.1, 0.1); art.rays.push({ a, l0: m * 0.2, l1: m * rnd(0.45, 0.8), wd: rnd(0.025, 0.07) }); }
    t0 = performance.now(); burstT = 0; cv.style.opacity = 1; draw(0);
  }
  function draw(t) {
    if (!art) return; const { cx, cy, w, h } = art; ctx.clearRect(0, 0, w, h);
    const e = 1 - Math.pow(1 - Math.min(1, t / 0.28), 3), ink = '#1b110b', red = '#b3261e';
    ctx.save(); ctx.translate(cx, cy);
    // rays: speed lines
    ctx.fillStyle = ink; art.rays.forEach(r => { const l1 = r.l0 + (r.l1 - r.l0) * e, a = r.a; ctx.beginPath(); ctx.moveTo(Math.cos(a - r.wd) * r.l0, Math.sin(a - r.wd) * r.l0); ctx.lineTo(Math.cos(a) * l1, Math.sin(a) * l1); ctx.lineTo(Math.cos(a + r.wd) * r.l0, Math.sin(a + r.wd) * r.l0); ctx.fill(); });
    art.blots.forEach((b, i) => { ctx.fillStyle = ink; poly(blob(b.ox * e, b.oy * e, b.r, 0.25 + 0.75 * e, b.rot)); });
    if (human) { ctx.fillStyle = red; art.blots.slice(1, 5).forEach(b => poly(blob(b.ox * e * 0.8, b.oy * e * 0.8 + b.r * 0.15, b.r * 0.55, 0.2 + 0.8 * e, b.rot + 1))); }
    art.spat.forEach(s => { ctx.fillStyle = s.col ? red : ink; ctx.beginPath(); ctx.arc(s.ox * e, s.oy * e, s.r * (0.3 + 0.7 * e), 0, 6.283); ctx.fill(); });
    ctx.fillStyle = ink; art.drips.forEach(d => { const k = Math.max(0, Math.min(1, (t - d.delay) / 0.9)); const L = d.len * (1 - Math.pow(1 - k, 2)); ctx.beginPath(); ctx.rect(d.ox - d.w / 2, 0, d.w, L); ctx.fill(); ctx.beginPath(); ctx.arc(d.ox, L, d.w * 0.75, 0, 6.283); ctx.fill(); });
    ctx.restore();
  }
  return { fire, clear() { art = null; cv.style.opacity = 0; ctx.clearRect(0, 0, cv.width, cv.height); }, update(t, op) { if (art) { draw(t); cv.style.opacity = op; } } };
})();
const vp = new THREE.Vector3();
function clampEl(el) { const r = el.getBoundingClientRect(), m = 8; let dx = 0; if (r.left < m) dx = m - r.left; else if (r.right > innerWidth - m) dx = innerWidth - m - r.right; if (dx) el.style.left = (parseFloat(el.style.left) + dx) + 'px'; }
function place(el, wx, wy, wz) { vp.set(wx, wy, wz).project(camera); el.style.left = (vp.x * 0.5 + 0.5) * innerWidth + 'px'; el.style.top = (-vp.y * 0.5 + 0.5) * innerHeight + 'px'; }

// ───────────────────────── input ─────────────────────────
const act = a => {
  if (a.action === 'pounce') { startPounce(a.target === 'human' ? P : sheep[1 + Math.floor(Math.random() * N_AI)]); return; }
  if (a.action === 'win') { endGame('win', 'YOU BLENDED IN', 'Three clovers. Three minutes. Zero bites.', 'The flock wins', '#8ee04a'); return; }
  if (a.action === 'lose') { endGame('lose', 'EATEN', 'The wolf got you', 'You were the human'); return; }
  if (a.action === 'startle') { startle(); return; }
  if (a.key === undefined) return;
  if (a.down === false) keys.delete(a.key);
  else { if (!keys.has(a.key)) keyEdge(a.key); keys.add(a.key); }
};
function keyEdge(code) {
  if (code === 'KeyM') reset(mode === 'solo' ? 'local' : 'solo');
  if (code === 'KeyR') reset();
  if (code === 'Enter' || code === 'NumpadEnter') { if (mode === 'local') localPounce(); }
}
addEventListener('keydown', e => { if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault(); act({ key: e.code }); });
addEventListener('keyup', e => act({ key: e.code, down: false }));
addEventListener('blur', () => keys.clear());
const kd = (...c) => c.some(k => keys.has(k));

// ───────────────────────── flock AI ─────────────────────────
function startle() {
  const a = rnd(0, 6.28); flock.angle = a; flock.target = a;
  sheep.forEach(s => { if (s.player || s.frozen) return; s.st = 'run'; s.runT = rnd(1.6, 2.6); s.dir = a + rnd(-0.3, 0.3); });
  toast('The flock spooks!', 1.8); play('baa', 1); play('baa2', 0.8, 0.1); play('baa', 0.7, 0.2); play('baa2', 0.6, 0.32);
}
function updateFlock(dt) {
  flock.turnT -= dt;
  if (flock.turnT <= 0) { flock.target = flock.angle + rnd(-1.6, 1.6); flock.turnT = rnd(14, 24); }
  flock.angle += angDiff(flock.angle, flock.target) * Math.min(1, dt * 0.4);
  const hx = Math.sin(flock.angle), hz = Math.cos(flock.angle);
  startleT -= dt; if (startleT <= 0 && !pounce.ph) { startle(); startleT = rnd(22, 36); }
  zoomT -= dt; if (zoomT <= 0 && mode === 'solo' && decoyI >= 2) { zoomT = rnd(16, 26); const c = sheep[1 + Math.floor(Math.random() * N_AI)]; if (!c.frozen) { c.zoom = 2.2; c.susp += 0.4; } }
  // neighbours
  for (const s of sheep) {
    if (s.frozen) continue;
    s.t -= dt; s.immune = Math.max(0, s.immune - dt);
    if (s.player) continue;
    if (s.zoom > 0) { s.zoom -= dt; s.st = 'zoom'; if (s.zoom <= 0) { s.st = 'walk'; s.t = rnd(2, 5); } }
    else if (s.st === 'run') { s.runT -= dt; if (s.runT <= 0) { s.st = 'walk'; s.t = rnd(2, 5); } }
    else if (s.t <= 0) {
      if (s.st === 'graze') { s.st = 'walk'; s.t = rnd(4, 9); } else { if (Math.random() < 0.6) { s.st = 'graze'; s.t = rnd(3, 8); } else s.t = rnd(3, 6); }
    }
    let cx = 0, cz = 0, ax = 0, az = 0, sx = 0, sz = 0, n = 0, an = 0;
    for (const o of sheep) {
      if (o === s) continue;
      const dx = o.x - s.x, dz = o.z - s.z, d2 = dx * dx + dz * dz;
      if (d2 > 49) continue;
      n++; cx += dx; cz += dz;
      if (!o.player && (Math.abs(o.vx) + Math.abs(o.vz)) > 0.2) { ax += o.vx; az += o.vz; an++; }
      if (d2 < 5.5) { const d = Math.sqrt(d2) + 0.05; sx -= dx / d * (2.4 - d); sz -= dz / d * (2.4 - d); }
    }
    let dx = hx * 0.55, dz = hz * 0.55;
    if (n) { dx += (cx / n) * 0.05; dz += (cz / n) * 0.05; }
    if (an) { const m = Math.hypot(ax, az) + 0.01; dx += ax / m * 0.35; dz += az / m * 0.35; }
    dx += sx * 0.9; dz += sz * 0.9;
    const wdx = s.x - ROCK.x, wdz = s.z - ROCK.z, wd = Math.hypot(wdx, wdz); if (wd < 5) { dx += wdx / wd * 1.4; dz += wdz / wd * 1.4; }
    const r = Math.hypot(s.x, s.z); if (r > 24) { dx -= s.x / r * (r - 24) * 0.35; dz -= s.z / r * (r - 24) * 0.35; }
    let spd = 0, ddx = dx, ddz = dz;
    if (s.st === 'walk') spd = s.speedMax;
    else if (s.st === 'run') { ddx = Math.sin(s.dir) + sx * 0.5; ddz = Math.cos(s.dir) + sz * 0.5; spd = 4.1; if (r > 26) { ddx -= s.x / r * 1.5; ddz -= s.z / r * 1.5; } }
    else if (s.st === 'zoom') { ddx = Math.sin(s.dir || (s.dir = rnd(0, 6.28))) - s.x / (r + 1) * 0.6; ddz = Math.cos(s.dir) - s.z / (r + 1) * 0.6; spd = 4.4; }
    else if (s.st === 'graze') spd = 0;
    const m = Math.hypot(ddx, ddz) || 1;
    const k = Math.min(1, dt * 3.5);
    s.vx += (ddx / m * spd - s.vx) * k; s.vz += (ddz / m * spd - s.vz) * k;
    s.graze = s.st === 'graze';
  }
}
function movePlayer(dt) {
  const s = P;
  if (s.frozen || result) { s.vx *= 0.8; s.vz *= 0.8; return; }
  const solo = mode === 'solo';
  const L = kd('KeyA') || (solo && kd('ArrowLeft')), R = kd('KeyD') || (solo && kd('ArrowRight')), U = kd('KeyW') || (solo && kd('ArrowUp')), D = kd('KeyS') || (solo && kd('ArrowDown'));
  const gz = kd('KeyE') || (solo && kd('Space'));
  const run = mode === 'solo' ? kd('ShiftLeft', 'ShiftRight') : kd('ShiftLeft');
  let ix = (R ? 1 : 0) - (L ? 1 : 0), iz = (D ? 1 : 0) - (U ? 1 : 0);
  const m = Math.hypot(ix, iz);
  s.graze = gz && !m;
  let spd = 0, tx = 0, tz = 0;
  if (m) { spd = run ? 5.2 : 1.9; tx = ix / m * spd; tz = iz / m * spd; }
  const k = Math.min(1, dt * 9);
  s.vx += (tx - s.vx) * k; s.vz += (tz - s.vz) * k;
}
function integrate(s, dt) {
  const sp = Math.hypot(s.vx, s.vz);
  if (s.frozen) { s.yawRate = 0; return; }
  s.x += s.vx * dt; s.z += s.vz * dt;
  const r = Math.hypot(s.x, s.z); if (r > PLAY_R) { s.x *= PLAY_R / r; s.z *= PLAY_R / r; }
  const rd = Math.hypot(s.x - ROCK.x, s.z - ROCK.z); if (rd < 2.6) { s.x = ROCK.x + (s.x - ROCK.x) / rd * 2.6; s.z = ROCK.z + (s.z - ROCK.z) / rd * 2.6; }
  if (sp > 0.25) {
    const want = Math.atan2(s.vx, s.vz), d = angDiff(s.yaw, want), maxT = (s.player ? 9 : 3.2) * dt;
    const step = clamp(d, -maxT, maxT); s.yaw += step; s.yawRate = Math.abs(step) / dt;
  } else s.yawRate = 0;
  s.phase += sp * dt * 3.2;
  const stand = sp < 0.15 && !s.graze;
  s.still = stand ? s.still + dt : 0;
}

// ───────────────────────── suspicion (the wolf's eye) ─────────────────────────
let topSusp = null;
function updateSuspicion(dt) {
  let mv = 0, rn = 0, gz = 0, fx = 0, fz = 0;
  for (let i = 1; i < N; i++) { const s = sheep[i], sp = Math.hypot(s.vx, s.vz); if (sp > 0.5) mv++; if (sp > 2.6) rn++; if (s.graze) gz++; fx += s.vx; fz += s.vz; }
  flock.moving = mv / N_AI; flock.running = rn / N_AI; flock.graze = gz / N_AI; flock.vx = fx / N_AI; flock.vz = fz / N_AI;
  const fm = Math.hypot(flock.vx, flock.vz);
  const watching = (wolf.state === 'watch' || wolf.state === 'return' || wolf.state === 'stalk') && mode === 'solo' && !pounce.ph;
  topSusp = null; let best = 0;
  for (const s of sheep) {
    let rate = 0; const sp = Math.hypot(s.vx, s.vz);
    if (watching && !s.frozen && s.immune <= 0 && Math.hypot(s.x - wolf.x, s.z - wolf.z) < 36) {
      if (sp > 2.8 && flock.running < 0.35) rate += 1.15;
      if (sp > 0.6 && fm > 0.3) { const dot = (s.vx * flock.vx + s.vz * flock.vz) / (sp * fm); if (dot < -0.25) rate += 0.55 * -dot; }
      if (s.yawRate > 5.5 && sp > 0.6 && flock.running < 0.35) rate += 0.6;
      if (s.still > 7 && flock.moving > 0.35 && !s.player) rate += 0.35;
      if (sp > 0.5 && sp < 2.8 && s.player && flock.graze > 0.6) rate += 0.18;   // strolling while everyone grazes
      if (s.player && sp > 1.5 && sp <= 2.8 && fm > 0.2 && flock.running < 0.3) rate += 0.1;   // too keen
    }
    s.susp = clamp(s.susp + rate * dt - (rate > 0 ? 0.12 : 0.28) * dt, 0, 3);
    if (s.immune <= 0 && s.susp > best && !s.frozen) { best = s.susp; topSusp = s; }
  }
}

// ───────────────────────── wolf AI + pounce ─────────────────────────
function wolfGround() { return wolf.onRock ? gh(ROCK.x, ROCK.z) + ROCK.top : gh(wolf.x, wolf.z); }
function startPounce(t) {
  if (pounce.ph || result) return;
  t.frozen = true; t.vx = t.vz = 0;
  const human = t.player;
  Object.assign(pounce, { ph: 'leap', t: 0, target: t, human, fx: wolf.x, fz: wolf.z, fy: wolf.y, tx: t.x, tz: t.z, dur: 1.3, slow: 0.13 });
  wolf.state = 'pounce'; wolf.pose = 'leap'; wolf.target = t;
  sting(); caption(pick(caps.stalk)); camHint = 0;
}
function localPounce() {
  if (pounce.ph || result || wolf.bites <= 0) return;
  let best = null, bd = 4.6;
  for (const s of sheep) { const d = Math.hypot(s.x - wolf.x, s.z - wolf.z); if (d < bd) { bd = d; best = s; } }
  if (best) startPounce(best); else toast('Nothing in reach: close in on a sheep!', 1.3);
}
function updateWolf(dt) {
  wolf.t += dt;
  if (wolf.state === 'pounce') return;
  const w = wolf;
  if (mode === 'local') {
    w.dashCd = Math.max(0, (w.dashCd || 0) - dt); w.dashT = w.dashT || 0;
    if (pounce.ph) return;
    const ix = (kd('ArrowRight') ? 1 : 0) - (kd('ArrowLeft') ? 1 : 0), iz = (kd('ArrowDown') ? 1 : 0) - (kd('ArrowUp') ? 1 : 0), m = Math.hypot(ix, iz);
    if (m && !result) { if (kd('ShiftRight') && w.dashCd <= 0) { w.dashT = 0.3; w.dashCd = 2.5; } if (w.dashT > 0) w.dashT -= dt; const sp = w.dashT > 0 ? 15 : 7; w.x += ix / m * sp * dt; w.z += iz / m * sp * dt; w.yaw += angDiff(w.yaw, Math.atan2(ix, iz)) * Math.min(1, dt * 10); w.phase += dt * 9; w.pose = 'walk'; } else w.pose = 'crouch';
    const r = Math.hypot(w.x, w.z); if (r > PLAY_R) { w.x *= PLAY_R / r; w.z *= PLAY_R / r; }
    w.y = lerp(w.y, wolfGround(), Math.min(1, dt * 12));
    return;
  }
  if (w.sulk > 0) { w.sulk -= dt; w.pose = 'sulk'; if (w.sulk <= 0) { w.bites = 3; w.pose = 'crouch'; toast('The wolf is back. Rested. Hungry.', 2); } return; }
  w.cd -= dt;
  if (w.state === 'watch') {
    w.pose = 'crouch';
    // decoys: the wolf is not perfect
    const times = [8, 30, 52];
    if (decoyI < times.length && T >= times[decoyI] && w.cd <= 0) {
      let best = null, bd = 1e9;
      for (let i = 1; i < N; i++) { const s = sheep[i]; if (s.frozen || s.immune > 0) continue; const dw = Math.hypot(s.x - w.x, s.z - w.z), dp = Math.hypot(s.x - P.x, s.z - P.z); if (dw > 8 && dw < 22 && dp > 4 && dp < bd) { bd = dp; best = s; } }
      if (best) { best.zoom = 2.4; best.dir = Math.atan2(best.x - w.x, best.z - w.z) * 0 + rnd(0, 6.28); best.susp += 0.5; decoyI++; }
    }
    const t = topSusp;
    if (t) { w.lookX = lerp(w.lookX, t.x, Math.min(1, dt * 4)); w.lookZ = lerp(w.lookZ, t.z, Math.min(1, dt * 4)); }
    else { w.lookX = w.x + Math.sin(w.t * 0.5) * 12; w.lookZ = w.z + 8 + Math.cos(w.t * 0.37) * 8; }
    w.yaw += angDiff(w.yaw, Math.atan2(w.lookX - w.x, w.lookZ - w.z)) * Math.min(1, dt * 2.5);
    if (t && t.susp >= 1.5 && w.cd <= 0) { w.state = 'stalk'; w.target = t; w.abort = 0; w.stalkT = 0; w.onRock = false; w.y = gh(w.x, w.z) + (w.y > 1 ? 0 : 0); caption(pick(caps.stalk)); play('wind', 0.6); if (mode === 'solo') { play('boom', 0.7); play('stab1', 0.8); } if (t.player) toast('! The wolf has noticed you: blend in, graze!', 1.8); }
  } else if (w.state === 'stalk') {
    const t = w.target; w.pose = 'walk'; w.stalkT += dt;
    if (!t || t.frozen) { w.state = 'return'; return; }
    const dx = t.x - w.x, dz = t.z - w.z, d = Math.hypot(dx, dz);
    w.yaw += angDiff(w.yaw, Math.atan2(dx, dz)) * Math.min(1, dt * 6);
    const sp = d > 6 ? 5 : 3.2; w.x += dx / d * sp * dt; w.z += dz / d * sp * dt; w.phase += dt * 7;
    w.y = lerp(w.y, wolfGround(), Math.min(1, dt * 6));
    if (t.susp < 0.6) w.abort += dt; else w.abort = 0;
    if (w.abort > 1.3 || w.stalkT > 9) { w.state = 'return'; $('cap').style.opacity = 0; toast('The wolf loses interest.', 1.6); w.cd = 3; }
    else if (d < 3.1) startPounce(t);
  } else if (w.state === 'return') {
    w.pose = 'walk';
    const dx = ROCK.x - w.x, dz = ROCK.z - w.z, d = Math.hypot(dx, dz);
    w.yaw += angDiff(w.yaw, Math.atan2(dx, dz)) * Math.min(1, dt * 6);
    w.x += dx / (d + 0.01) * 5.5 * dt; w.z += dz / (d + 0.01) * 5.5 * dt; w.phase += dt * 8;
    if (d < 2.3) { w.onRock = true; }
    w.y = lerp(w.y, wolfGround(), Math.min(1, dt * 5));
    if (d < 0.8) { w.state = 'watch'; w.cd = Math.max(w.cd, w.afterAI ? 14 : 3); w.afterAI = 0; w.x = ROCK.x; w.z = ROCK.z; $('cap').style.opacity = 0; }
  }
  if (w.state === 'watch') w.y = lerp(w.y, wolfGround(), Math.min(1, dt * 8));
}
const ease = u => u * u * (3 - 2 * u);
function updatePounce(rdt) {
  const p = pounce; if (!p.ph) { cam.punch = Math.max(0, cam.punch - rdt * 3); return 1; }
  p.t += rdt; const w = wolf, t = p.target;
  if (p.ph === 'leap') {
    const u = clamp(p.t / p.dur, 0, 1), e = ease(u);
    w.x = lerp(p.fx, p.tx - Math.sin(w.yaw) * 0.6, e); w.z = lerp(p.fz, p.tz - Math.cos(w.yaw) * 0.6, e);
    w.yaw += angDiff(w.yaw, Math.atan2(p.tx - w.x, p.tz - w.z)) * 0.3;
    const gy = Math.max(gh(w.x, w.z), 0.2); w.y = lerp(p.fy, gy, e) + Math.sin(u * Math.PI) * 3.4;
    w.pitch = lerp(-0.7, 0.9, u); w.onRock = false;
    cam.punch = Math.min(1, cam.punch + rdt * 2.2);
    $('bt').style.height = $('bb').style.height = 3 * cam.punch + 'vh';
    if (u >= 1) {
      p.ph = 'reveal'; p.t = 0; w.pose = 'land'; w.pitch = 0;
      for (const o of sheep) { if (o === t || o.player) continue; const dx = o.x - t.x, dz = o.z - t.z, d = Math.hypot(dx, dz); if (d < 6) { o.st = 'run'; o.runT = 1.4; o.dir = Math.atan2(dx, dz) + rnd(-0.3, 0.3); } }
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1.6, t.z), { count: 60, speed: 6, spread: Math.PI * 0.7, life: 1.2, gravity: 9, color: 0xfff6dc });
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1.6, t.z), { count: 12, speed: 3, spread: Math.PI, life: 1.2, gravity: 9, color: 0xffffff });
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1.8, t.z), { count: 30, speed: 7, spread: Math.PI, life: 1.3, gravity: 9, color: 0xffb8cc });
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1.8, t.z), { count: 24, speed: 5, spread: Math.PI, life: 1.3, gravity: 9, color: 0xffd9a0 });
      if (p.human) wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 2.2, t.z), { count: 40, speed: 8, spread: Math.PI, life: 1.5, gravity: 9, color: 0xfff0d0 });
      if (!p.human) wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1.2, t.z), { count: 50, speed: 6, spread: Math.PI * 0.9, life: 1.6, gravity: 9, color: 0xfff0d0 });
      camShake.kick(1.0); play('thud', 1); play('hit', 0.6); t.hopV = 6; t.spin = rnd(-6, 6);
      $('flash').style.opacity = 0.55;
      vp.set(t.x, gh(t.x, t.z) + 1.5, t.z).project(camera); p.sx = (vp.x * 0.5 + 0.5) * innerWidth; p.sy = (-vp.y * 0.5 + 0.5) * innerHeight;
      splash.fire(p.human, p.sx, p.sy);
      if (p.human) {
        outline.visible = true; wolf.pose = 'grin'; sting();
        camShake.kick(2.4); showResult('HUMAN', 'Gotcha! That was PLAYER 1.', 'Gotcha', '#ff3a2a'); $('rk').textContent = 'Gotcha'; $('rsub').textContent = 'PLAYER 1 has been found.'; $("vig").style.opacity = 0.2;
        $('tag').style.display = 'block'; caption(pick(caps.human));
      } else {
        showResult('SHEEP', 'Just a sheep. Bite lost.', 'baa?', '#2a1c12');
        $('bubble').style.display = 'block'; caption(pick(caps.ai)); play('womp', 1, 0.5); play('womp', 1, 0.8);
        play('baa', 0.9, 0.3); w.bites--; w.shrug = 1;
        wolf.pose = 'shrug';
      }
      $('reveal').style.opacity = 0; p.stamped = false;
    }
    return p.slow;
  }
  // reveal
  const dur = p.human ? 3.6 : 3.0, u = p.t / dur;
  $('flash').style.opacity = Math.max(0, 0.55 - p.t * 3.2);
  // bite beat: ink splash bursts, the frame is held in ink + paper, the stamp slams in at 0.3 s, all fades after ~2.1 s
  const hold = sm(0, 0.12, p.t) * (1 - sm(1.9, 2.3, p.t));
  post.uniforms.freeze.value = hold;
  splash.update(p.t, p.t < 1.9 ? 1 : Math.max(0, 1 - (p.t - 1.9) * 3));
  if (!p.stamped && p.t >= 0.3) { p.stamped = true; $('reveal').style.opacity = 1; $('reveal').classList.remove('slam'); void $('reveal').offsetWidth; $('reveal').classList.add('slam'); camShake.kick(p.human ? 1.6 : 0.8); play('thud', 1); play('hit', 0.8, 0.2); }
  if (p.stamped) $('reveal').style.opacity = p.t > 2.2 ? Math.max(0, 1 - (p.t - 2.2) * 4) : 1;
  if (p.t > 2.0) aimLine.visible = false;
  if (t.hop !== undefined) { t.hopV -= 14 * rdt * (p.t < 1 ? 0.5 : 1); t.hop = Math.max(0, t.hop + t.hopV * rdt); if (t.hop === 0 && t.hopV < 0) { t.hopV = 0; t.spin *= 0.8; } }
  if (p.human) { const g = bodyMatrixOf(t); outline.position.set(t.x, t.y + t.hop, t.z); outline.rotation.y = t.yaw + t.spin * 0.0; outline.scale.setScalar(SS * 1.1); place($('tag'), t.x, t.y + 3.6, t.z); { const r = $('tag').getBoundingClientRect(); if (r.top < innerHeight * 0.5 && r.top > innerHeight * 0.12) $('tag').style.top = innerHeight * 0.62 + 'px'; } clampEl($('tag')); }
  else { place($("bubble"), t.x, t.y + 4.2, t.z); { const bt = parseFloat($('bubble').style.top); if (bt < innerHeight * 0.6) $('bubble').style.top = innerHeight * 0.6 + 'px'; } clampEl($('bubble')); }
  if (!p.human) { w.shrug = 1; }
  if (!p.human && p.t < 1.9) cam.punch = 1; else if (u > 0.72) cam.punch = Math.max(0, cam.punch - rdt * 1.6);
  $('bt').style.height = $('bb').style.height = 3 * cam.punch + 'vh';
  if (u >= 1) {
    p.ph = null; t.frozen = false; w.target = null; hideReveal(); cam.punch = 0;
    if (p.human) {
      wolf.state = 'done'; t.frozen = true;
      if (mode === 'solo') endGame('lose', 'EATEN', 'The wolf got you · ' + eatenCount() + '/3 clovers', 'You were the human'); else endGame('wolf', 'WOLF WINS', 'Player 2 found PLAYER 1', 'Gotcha');
      outline.visible = true; $('tag').style.display = 'block'; $("vig").style.opacity = 0.25; $('bb').style.height = '0';
    } else {
      t.immune = 6; t.susp = 0; t.zoom = 1.2; t.dir = rnd(0, 6.28);
      w.pose = 'crouch'; w.shrug = 0;
      if (mode === 'solo') {
        w.state = 'return'; w.cd = 18; w.afterAI = 1;
        if (w.bites <= 0) { w.sulk = 18; w.state = 'watch'; w.cd = 5; toast('Out of bites! The wolf is sulking…', 2.4); w.x = w.x; }
      } else {
        w.state = 'ctrl';
        if (w.bites <= 0) endGame('sheep', 'SHEEP WIN', 'The wolf ran out of bites', 'Baa-ravo', '#8ee04a');
      }
    }
    return 1;
  }
  return p.t < 1.0 ? 0.015 : p.t < 1.3 ? 0.2 : lerp(0.2, 1, sm(1.3, 2.0, p.t));
}
function bodyMatrixOf() { return null; }

// ───────────────────────── clovers ─────────────────────────
let munchT = 0;
function updateClovers(dt) {
  if (mode !== 'solo') { clovers.forEach(c => c.g.visible = false); return; }
  clovers.forEach(c => {
    c.g.visible = true;
    const d = Math.hypot(P.x - c.x, P.z - c.z);
    const near = c.eaten ? 0 : sm(11, 3, d);
    c.star.children.concat(c.g.children.filter(o => o.geometry && o.geometry.type === 'RingGeometry')).forEach(m => m.material.opacity = (c.eaten ? 0 : 0.55 + 0.45 * near) * (0.75 + 0.25 * Math.sin(clock * 5 + c.x)));
    c.star.rotation.y = clock * 0.8; c.star.scale.setScalar(0.7 + 0.4 * Math.sin(clock * 5 + c.x) ** 2); c.star.position.y = 2.2 + Math.sin(clock * 2) * 0.15;
    if (c.eaten) return;
    if (d < 2.6 && P.graze && !P.frozen && !result) {
      c.prog += dt / 2.4; c.mesh.scale.setScalar(1 - 0.5 * c.prog); munchT -= dt;
      if (munchT <= 0) { play('munch', 1); munchT = 0.38; }
      if (c.prog >= 1) { c.eaten = true; c.mesh.scale.setScalar(0.25); toast(`Clover eaten! ${eatenCount()}/3`, 1.8); play('powerup', 0.5); checkWin(); }
    }
  });
}
function checkWin() {
  if (result || mode !== 'solo') return;
  if (eatenCount() >= 3 && T >= 180) endGame('win', 'YOU BLENDED IN', 'Three clovers. Three minutes. Zero bites.', 'The flock wins', '#8ee04a');
}

// ───────────────────────── rendering sheep ─────────────────────────
const mB = new THREE.Matrix4(), mH = new THREE.Matrix4(), mL = new THREE.Matrix4(), q = new THREE.Quaternion(), q2 = new THREE.Quaternion(), v3 = new THREE.Vector3(), sc = new THREE.Vector3(SS, SS, SS), e3 = new THREE.Euler();
const scK = new THREE.Vector3(), scZ = new THREE.Vector3();
function drawSheep(dt) {
  for (let i = 0; i < N; i++) {
    const s = sheep[i]; const sp = Math.hypot(s.vx, s.vz);
    s.y = gh(s.x, s.z);
    const tp = (s.graze ? 1.1 : 0); s.pitch += (tp - s.pitch) * Math.min(1, dt * 6);
    const bob = Math.abs(Math.sin(s.phase * 2)) * 0.07 * Math.min(1, sp);
    const roll = Math.sin(s.phase) * 0.06 * Math.min(1, sp);
    e3.set(s.hop > 0 ? s.spin * 0.1 : 0, s.yaw, roll, 'YXZ'); q.setFromEuler(e3);
    let k = 1; if (pounce.ph === 'reveal' && s !== pounce.target && Math.hypot(s.x - wolf.x, s.z - wolf.z) < (pounce.human ? 7 : 5.5)) k = Math.max(0.25, 1 - pounce.t * 4);
    if (k < 1) { scK.setScalar(SS * k * SZ[i]); mB.compose(v3.set(s.x, s.y + bob + s.hop, s.z), q, scK); } else
    mB.compose(v3.set(s.x, s.y + bob + s.hop, s.z), q, scZ.setScalar(SS * SZ[i]));
    bodyIM.setMatrixAt(i, mB);
    const nodding = s.graze ? Math.sin(clock * 5 + i) * 0.17 : 0;
    q2.setFromEuler(e3.set(s.pitch + nodding, 0, 0));
    mL.compose(v3.set(HEAD_P.x, HEAD_P.y - s.pitch * 0.25, HEAD_P.z + s.pitch * 0.1), q2, new THREE.Vector3(1, 1, 1));
    mH.multiplyMatrices(mB, mL); headIM.setMatrixAt(i, mH);
  }
  bodyIM.instanceMatrix.needsUpdate = true; headIM.instanceMatrix.needsUpdate = true;
  marker.position.set(P.x, P.y + 0.1, P.z); marker.material.opacity = 0.28 + 0.1 * Math.sin(clock * 3);
}
function drawWolf(dt) {
  const w = wolf, r = W.root, pz = w.pose;
  r.position.set(w.x, w.y, w.z); r.rotation.y = w.yaw;
  { const want = (pz === 'leap' || pz === 'land' || pz === 'shrug' || pz === 'grin') ? 2.4 : (pounce.ph || mode !== "solo" ? 4.4 : 8.4); r.scale.setScalar(r.scale.x + (want - r.scale.x) * Math.min(1, dt * 10 + 0.05)); }
  const ph = w.phase, t = clock;
  W.body.position.set(0, 0, 0); W.body.rotation.set(0, 0, 0); W.head.rotation.set(0, 0, 0); W.head.position.set(0, 0.88, 1.08);
  W.legs.forEach(l => l.rotation.set(0, 0, 0)); W.tail.rotation.set(0, 0, 0);
  if (pz === 'crouch') {
    W.body.position.y = -0.2 + Math.sin(t * 2) * 0.02; W.body.rotation.x = 0.1;
    W.head.rotation.x = 0.2; W.head.position.y = 0.7;
    W.legs.forEach((l, i) => { l.rotation.x = i < 2 ? -0.5 : 0.6; l.scale.y = 0.7; });
    W.tail.rotation.y = Math.sin(t * 1.5) * 0.2;
  } else if (pz === 'walk') {
    W.body.position.y = -0.15 + Math.abs(Math.sin(ph)) * 0.05; W.body.rotation.x = 0.12; W.head.rotation.x = 0.25; W.head.position.y = 0.72;
    W.legs.forEach((l, i) => { l.rotation.x = Math.sin(ph + (i % 2 ? Math.PI : 0) + (i > 1 ? 1.5 : 0)) * 0.7; l.scale.y = 0.8; });
    W.tail.rotation.y = Math.sin(ph) * 0.3;
  } else if (pz === 'leap') {
    W.body.rotation.x = w.pitch; W.head.rotation.x = -0.1;
    W.legs.forEach((l, i) => { l.rotation.x = i < 2 ? -1.1 : 1.2; l.scale.y = 0.6; });
  } else if (pz === 'land') {
    W.body.position.y = -0.3; W.body.rotation.x = 0.3; W.legs.forEach(l => l.scale.y = 0.6); W.head.rotation.x = 0.4;
  } else if (pz === 'grin') {
    const k = Math.sin(clock * 9);
    W.body.position.y = 0.2 + Math.abs(k) * 0.08; W.body.rotation.x = -0.3; W.head.rotation.x = -0.35; W.head.position.y = 1.0; W.head.rotation.z = Math.sin(clock * 5) * 0.12;
    W.legs.forEach((l, i) => { if (i < 2) { l.rotation.x = -0.9; l.rotation.z = (i ? 1 : -1) * 0.5; l.scale.y = 0.8; } else l.rotation.x = 0.3; });
    W.tail.rotation.y = Math.sin(clock * 14) * 0.9;
  } else if (pz === 'shrug') {
    const k = Math.sin(clock * 7);
    W.body.position.y = 0.15 + Math.abs(k) * 0.1; W.body.rotation.x = -0.05; W.head.rotation.z = Math.sin(clock * 3.5) * 0.7; W.head.rotation.x = 0.1;
    W.legs.forEach((l, i) => { if (i < 2) { l.rotation.x = -0.5; l.rotation.z = (i ? 1 : -1) * (0.6 + Math.abs(k) * 0.6); l.scale.y = 0.7; } else l.rotation.x = 0.5; });
    W.tail.rotation.y = Math.sin(clock * 6) * 0.6;
  } else if (pz === 'sulk') {
    W.body.position.y = -0.4; W.head.rotation.x = 0.7; W.head.position.y = 0.5; W.legs.forEach(l => l.scale.y = 0.4); W.body.rotation.z = 0.02;
  }
  if (pz !== 'crouch' && pz !== 'walk' && pz !== 'sulk') { /* legs scale reset handled each pose */ }
  if (pz !== 'land' && pz !== 'sulk' && pz !== 'crouch' && pz !== 'walk' && pz !== 'leap') W.legs.forEach(l => l.scale.y = 1);
  r.visible = true;
  // aim rings (local mode)
  const loc = mode === 'local';
  reach.visible = loc && !pounce.ph && !result; reach.position.set(w.x, gh(w.x, w.z) + 0.15, w.z);
  aim.visible = false; aimLine.visible = false;
  wolfRing.visible = loc && !pounce.ph && !result; if (wolfRing.visible) { wolfRing.position.set(w.x, gh(w.x, w.z) + 0.3, w.z); wolfRing.scale.setScalar(1 + 0.15 * Math.sin(clock * 8)); const rdy = 1 - Math.min(1, (w.dashCd || 0) / 2.5); wolfRing.userData.fill.scale.setScalar(Math.max(0.02, rdy)); wolfRing.userData.fill.material.color.setHex(rdy >= 1 ? 0x8e9a58 : 0xb3261e); }
  if (loc && !pounce.ph && !result) { let best = null, bd = 9; for (const s of sheep) { const d = Math.hypot(s.x - w.x, s.z - w.z); if (d < bd) { bd = d; best = s; } } if (best) { aim.visible = true; aim.position.set(best.x, best.y + 0.2, best.z); aim.scale.setScalar(1.5 + 0.2 * Math.sin(clock * 9)); aim.userData.arrow.position.y = 5 + Math.sin(clock * 7); { const dx = best.x - w.x, dz = best.z - w.z, L = Math.hypot(dx, dz) || 1; aimLine.visible = true; aimLine.position.set((w.x + best.x) / 2, best.y + 0.6, (w.z + best.z) / 2); aimLine.rotation.y = Math.atan2(-dz, dx); aimLine.scale.set(L, 1, 1); } const inR = bd < 4.6; aim.material.opacity = inR ? 0.7 + 0.25 * Math.sin(clock * 9) : 0.25; reach.material.color.setHex(inR ? 0xe0a03a : 0xb3261e); reach.scale.setScalar(inR ? 1.35 : 1); aim.userData.arrow.visible = inR; } }
}

// ───────────────────────── camera ─────────────────────────
function updateCamera(dt, rdt) {
  let tx = P.x, tz = P.z, zoom = 1;
  const dW = Math.hypot(wolf.x - P.x, wolf.z - P.z);
  if (mode === 'solo') { const k = dW < 32 ? (T < 12 ? 0.28 + 0.2 * (1 - T / 12) : 0.28) : 0; tx += (wolf.x - P.x) * k; tz += (wolf.z - P.z) * k; }
  else { tx += (wolf.x - P.x) * 0.5; tz += (wolf.z - P.z) * 0.5; zoom = 1 + clamp((dW - 14) / 30, 0, 0.55); }
  if (pounce.ph && pounce.target) { const m = pounce.target; tx = lerp(tx, (wolf.x + m.x) / 2, cam.punch); tz = lerp(tz, (wolf.z + m.z) / 2, cam.punch); }
  if (pounce.ph === 'reveal' && pounce.t < 2.0) { tx = wolf.x; tz = wolf.z - 2; }
  cam.close += ((pounce.ph === 'reveal' && pounce.t < 2.0 ? 1 : 0) - cam.close) * (1 - Math.exp(-rdt * (pounce.ph === 'reveal' ? 3.5 : 6)));
  rim.position.set(wolf.x + 1.5, 4, wolf.z + 4); rim.intensity = 90 * cam.close;
    const kf = 1 - Math.exp(-rdt * (cam.punch > 0.05 ? 7 : 2.4));
  cam.x += (tx - cam.x) * kf; cam.z += (tz - cam.z) * kf; cam.zoom += (zoom - cam.zoom) * kf;
  const sc2 = (1 - 0.52 * cam.punch - (pounce.target && !pounce.human ? 0.42 : 0.2) * cam.close) * cam.zoom;
  camera.position.set(cam.x, 16 * sc2 + 3 + (pounce.target && !pounce.human ? 5 * cam.close : 0), cam.z + 44 * sc2 + 8);
  camera.lookAt(cam.x, lerp(10.5, 3.0, Math.max(cam.close, cam.punch * 0.9)), cam.z - 8 * (1 - Math.max(cam.close, cam.punch * 0.9)) - 1 * cam.close);
  let fov = 42 - 16 * cam.punch - (pounce.ph === 'reveal' ? 9 * Math.max(0, 1 - pounce.t / 0.6) : 0); { const a = innerWidth / innerHeight; if (a < 1.4) fov = Math.min(80, (2 * Math.atan(Math.tan(fov * Math.PI / 360) * 1.4 / a)) * 180 / Math.PI); } if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }
  pinesMesh.visible = cam.close < 0.8;
  { const ly = camera.position.y; }
  camShake.update(rdt);
}

// ───────────────────────── main step ─────────────────────────
function step(rdt) {
  const slow = updatePounce(rdt);
  const dt = rdt * slow;
  if (!result) clock += dt; else clock += rdt;
  if (!result) {
    if (!pounce.ph || true) T += dt;
    if (mode === 'local' && !pounce.ph && T >= 180 && !result) endGame('sheep', 'SHEEP WIN', 'Survived 3:00 hidden in the flock', 'Baa-ravo', '#8ee04a');
    if (mode === 'solo' && T >= 180 && !result && eatenCount() < 3 && Math.floor(T) === 180) { /* overtime */ }
    if (mode === 'solo') checkWin();
  }
  movePlayer(dt);
  updateFlock(dt);
  for (const s of sheep) integrate(s, dt);
  if (!result || result === 'win') { updateSuspicion(dt); }
  if (!(result === 'win')) updateWolf(dt);
  updateClovers(dt);
  // sounds: wind + occasional baa
  windT -= dt; if (windT <= 0) { windT = rnd(4, 8); play('wind', 0.8); }
  if (Math.random() < dt * 0.35) play(Math.random() < 0.5 ? 'baa' : 'baa2', 0.35);
  wool.update(rdt);
  // ui
  const left = Math.max(0, 180 - T), m = Math.floor(left / 60), sec = Math.floor(left % 60);
  const tt = `${m}:${String(sec).padStart(2, '0')}`; if (!result && $('time').textContent !== tt) $('time').textContent = tt;
  renderBites(); renderClovers();
  $('sfill').style.width = clamp(P.susp / 1.5, 0, 1) * 100 + '%';
  if (toastT > 0) { toastT -= rdt; if (toastT <= 0) $('toast').style.opacity = 0; }
  if (mode === 'solo' && T > 175 && eatenCount() < 3 && !result) { $('time').style.color = '#ff6a5a'; } else $('time').style.color = '';
  if (!pounce.ph && wolf.state !== 'stalk' && !result) $('cap').style.opacity = 0;
  if (!pounce.ph && !result) $('vig').style.opacity = (wolf.state === 'stalk' && wolf.target && wolf.target.player && mode === 'solo') ? 0.45 + 0.25 * Math.sin(clock * 7) : 0;
  if (result && pounce.ph === null) { /* result overlay stays */ }
  if (!pounce.ph && !result) { $('bt').style.height = $('bb').style.height = 3 * cam.punch + 'vh'; }
  // clouds
  clouds.forEach((c, i) => { c.position.x += rdt * (0.8 + i * 0.1); if (c.position.x > 160) c.position.x = -160; });
  drawSheep(dt); drawWolf(dt); updateCamera(dt, rdt);
}

// ───────────────────────── loop ─────────────────────────
reset('solo'); renderBites(); renderClovers();
let last = null;
function loop(now) {
  requestAnimationFrame(loop);
  const rdt = last === null ? 1 / 60 : Math.min((now - last) / 1000, 0.1); last = now;
  step(rdt);
  post.uniforms.time.value = clock;
  renderer.setRenderTarget(rt); renderer.render(scene, camera); renderer.setRenderTarget(null); renderer.render(postScene, postCam);
  // let inspection tools see the main scene as the last render: a draw-nothing pass (empty layer, no clear, no shadow update)
  { const ac = renderer.autoClear, sa = renderer.shadowMap.autoUpdate, ml = camera.layers.mask; renderer.autoClear = false; renderer.shadowMap.autoUpdate = false; camera.layers.set(31); renderer.render(scene, camera); camera.layers.mask = ml; renderer.autoClear = ac; renderer.shadowMap.autoUpdate = sa; }
}
requestAnimationFrame(loop);

// ───────────────────────── window.__game ─────────────────────────
const r2 = v => +v.toFixed(2);
window.scene = scene; window.camera = camera; window.renderer = renderer;
window.__game = {
  scene, camera,
  subject: 'wolf',
  describe: () => ({
    name: 'Hide in the Flock', units: 'world units, y up, x right, z toward camera',
    keys: { KeyW: 'walk up', KeyA: 'walk left', KeyS: 'walk down', KeyD: 'walk right', ArrowKeys: 'solo: walk; local: move the wolf', ShiftLeft: 'run (suspicious)', KeyE: 'graze (hold on clover)', Space: 'graze (solo)', Enter: 'local: wolf pounce', KeyM: 'toggle Solo/Local', KeyR: 'restart' },
    actions: { pounce: '{action:"pounce", target:"human"|"ai"} forces a wolf pounce', startle: '{action:"startle"}' },
  }),
  observe: () => ({
    mode, t: r2(T), result, clovers: eatenCount(), bites: wolf.bites,
    player: { x: r2(P.x), z: r2(P.z), speed: r2(Math.hypot(P.vx, P.vz)), grazing: P.graze, susp: r2(P.susp) },
    wolf: { x: r2(wolf.x), z: r2(wolf.z), state: wolf.state, pose: wolf.pose },
    pounce: pounce.ph ? { ph: pounce.ph, t: r2(pounce.t), human: pounce.human } : null,
    flock: { moving: r2(flock.moving), running: r2(flock.running), graze: r2(flock.graze) },
    topSusp: topSusp ? { i: topSusp.i, s: r2(topSusp.susp), player: topSusp.player } : null,
    cloverProgress: clovers.map(c => r2(c.prog)),
    decoys: decoyI,
  }),
  act,
  setState: s => {
    if (s.mode && s.mode !== mode) reset(s.mode);
    if (s.t !== undefined) T = s.t;
    if (s.clovers !== undefined) clovers.forEach((c, i) => { c.eaten = i < s.clovers; c.mesh.scale.setScalar(c.eaten ? 0.25 : 1); });
    if (s.bites !== undefined) wolf.bites = s.bites;
    if (s.result === 'win') act({ action: 'win' }); else if (s.result === 'lose') act({ action: 'lose' });
    if (s.player) { Object.assign(P, s.player); }
    if (s.wolf) { Object.assign(wolf, s.wolf); wolf.onRock = Math.hypot(wolf.x - ROCK.x, wolf.z - ROCK.z) < 0.5; }
    if (s.susp !== undefined) P.susp = s.susp;
    if (s.pounce) startPounce(s.pounce === 'human' ? P : sheep[1 + Math.floor(Math.random() * N_AI)]);
  },
};

setTimeout(() => { const p = document.getElementById('paper'); if (p) { p.style.transition = 'opacity 1s'; p.style.opacity = 0; setTimeout(() => p.remove(), 1100); } }, 800);
