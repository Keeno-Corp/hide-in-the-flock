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

// ───────────────────────── terrain height ─────────────────────────
function gh(x, z) {
  const r = Math.hypot(x, z), a = Math.atan2(z, x);
  const edge = 47 + 3 * Math.sin(3 * a + 1) + 2 * Math.cos(5 * a);
  const d = r - edge;
  const base = 0.35 * Math.sin(x * 0.1) * Math.cos(z * 0.12) + 0.25 * Math.sin(x * 0.23 + z * 0.19);
  const w = clamp((-z + 5) / 25, 0, 1);
  const ridge = w * 5.5 * Math.exp(-(((r - 38) / 6) ** 2));
  const mount = 14 * Math.exp(-(((x - 26) ** 2 + (z + 42) ** 2) / 180)) + 11 * Math.exp(-(((x + 30) ** 2 + (z + 38) ** 2) / 150));
  let h = 1.1 + base + ridge + mount;
  h -= sm(-7, 1, d) * 4.5;
  return h;
}
const SEA = -0.35;
const PLAY_R = 30;

// ───────────────────────── renderer / scene ─────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xa6ecfb, 110, 300);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.5, 700);
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

// sky dome
{
  const g = new THREE.SphereGeometry(420, 24, 16);
  const c = [], top = new THREE.Color(0x6fd2f8), hor = new THREE.Color(0xa6ecfb), tmp = new THREE.Color();
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const t = clamp(p.getY(i) / 300, 0, 1); tmp.copy(hor).lerp(top, Math.pow(t, 0.6)); c.push(tmp.r, tmp.g, tmp.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
  const sky = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  sky.name = 'sky'; scene.add(sky);
}
const sun = new THREE.DirectionalLight(0xfff1d8, 2.8);
sun.position.set(-30, 55, 28);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -42, right: 42, top: 42, bottom: -42, near: 10, far: 130 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight(0xbfe8ff, 0x7fb83a, 1.35));

// ───────────────────────── terrain + sea ─────────────────────────
{
  const N = 130, S = 150;
  let g = new THREE.PlaneGeometry(S, S, N, N); g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, gh(p.getX(i), p.getZ(i)));
  g = g.toNonIndexed(); g.computeVertexNormals();
  const pos = g.attributes.position, nor = g.attributes.normal, col = new Float32Array(pos.count * 3);
  const grassA = new THREE.Color(0x8fc82a), grassB = new THREE.Color(0x79ac2c), sand = new THREE.Color(0xd9d79c), rock = new THREE.Color(0x777268), rock2 = new THREE.Color(0x8c877b), forest = new THREE.Color(0x5f8a3e), c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3, cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3, cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const ny = nor.getY(i), r = Math.hypot(cx, cz);
    const j = (Math.sin(cx * 12.9898 + cz * 78.233) * 43758.5453) % 1;
    c.copy(grassA).lerp(grassB, Math.abs(j) * 0.9 + 0.1 * Math.sin(cx * 0.3));
    if (r > 30 || cy > 3.5) c.lerp(forest, sm(30, 38, r) * 0.8);
    if (cy < 0.2 && r > 30) c.lerp(sand, sm(0.2, -0.2, cy));
    if (ny < 0.76 && cy > 0.4) c.copy(Math.abs(j) > 0.5 ? rock : rock2);
    if (cy > 9) c.lerp(rock2, 0.7);
    for (let k = 0; k < 3; k++) { col[(i + k) * 3] = c.r; col[(i + k) * 3 + 1] = c.g; col[(i + k) * 3 + 2] = c.b; }
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }));
  m.name = 'ground'; m.receiveShadow = true; scene.add(m);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2a98e0, roughness: 0.35, transparent: true, opacity: 0.86 }));
  sea.name = 'sea'; sea.position.y = SEA; scene.add(sea);
}

// ───────────────────────── geometry builder ─────────────────────────
function mk(geo, hex, { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1], jit = 0 } = {}) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...p), new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)), new THREE.Vector3(...s)));
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
const flat = (mat = {}) => new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, ...mat });

// ───────────────────────── sheep geometry (shared by all 101) ─────────────────────────
const WOOL = 0xfdfdec, DARK = 0x3a3030;
const sheepBodyGeo = mergeGeometries([
  mk(ico(0.5, 1), WOOL, { p: [0, 0.62, 0], s: [1, 0.82, 1.3], jit: 0.04 }),
  mk(ico(0.3, 0), WOOL, { p: [0.22, 0.98, 0.22], jit: 0.04 }), mk(ico(0.3, 0), WOOL, { p: [-0.22, 0.98, 0.1], jit: 0.04 }),
  mk(ico(0.3, 0), WOOL, { p: [0, 1.0, -0.3], jit: 0.04 }), mk(ico(0.26, 0), WOOL, { p: [0.3, 0.7, -0.62], jit: 0.04 }),
  mk(ico(0.26, 0), WOOL, { p: [-0.3, 0.7, -0.6], jit: 0.04 }),
  ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z]) => mk(box(0.13, 0.42, 0.13), DARK, { p: [x * 0.22, 0.21, z * 0.42] })),
]);
const sheepHeadGeo = mergeGeometries([
  mk(box(0.36, 0.34, 0.44), DARK, { p: [0, 0, 0.2] }),
  mk(box(0.2, 0.07, 0.12), 0x4a3a3a, { p: [0.26, 0.08, 0.06], r: [0, 0, -0.4] }), mk(box(0.2, 0.07, 0.12), 0x4a3a3a, { p: [-0.26, 0.08, 0.06], r: [0, 0, 0.4] }),
  mk(box(0.07, 0.07, 0.03), 0xffffff, { p: [0.1, 0.07, 0.42] }), mk(box(0.07, 0.07, 0.03), 0xffffff, { p: [-0.1, 0.07, 0.42] }),
  mk(ico(0.2, 0), WOOL, { p: [0, 0.22, 0.02] }),
]);
const SS = 1.3;
const HEAD_P = new THREE.Vector3(0, 0.78, 0.6);
const N_AI = 100, N = N_AI + 1;
const bodyIM = new THREE.InstancedMesh(sheepBodyGeo, flat(), N); bodyIM.name = 'sheep'; bodyIM.castShadow = true; bodyIM.frustumCulled = false;
const headIM = new THREE.InstancedMesh(sheepHeadGeo, flat(), N); headIM.name = 'sheep-heads'; headIM.castShadow = true; headIM.frustumCulled = false;
scene.add(bodyIM, headIM);

// ───────────────────────── wolf ─────────────────────────
const wolf = { x: -12, z: -9, y: 0, yaw: 0.6, state: 'watch', pose: 'crouch', t: 0, bites: 3, cd: 5, sulk: 0, target: null, abort: 0, stalkT: 0, lookX: 0, lookZ: 0, phase: 0, onRock: true, shrug: 0, pitch: 0 };
const ROCK = { x: -12, z: -9, top: 3.0 };
const W = {};
{
  const grey = 0x6b6a70, light = 0xa8a498, dk = 0x222222;
  W.root = new THREE.Group(); W.root.name = 'wolf'; W.root.scale.setScalar(2.8);
  W.body = new THREE.Group(); W.root.add(W.body);
  const mat = flat();
  const add = (parent, g) => { const m = new THREE.Mesh(g, mat); m.castShadow = true; parent.add(m); return m; };
  add(W.body, mergeGeometries([
    mk(ico(0.5, 1), grey, { p: [0, 0.7, 0], s: [0.7, 0.62, 1.7], jit: 0.08 }),
    mk(ico(0.5, 1), grey, { p: [0, 0.78, 0.62], s: [0.62, 0.62, 0.7], jit: 0.08 }),
    mk(ico(0.3, 0), light, { p: [0, 0.55, 0.45], s: [0.9, 0.6, 1.2] }),
    mk(ico(0.3, 0), 0x8f8c84, { p: [0, 0.85, -0.2], s: [1, 0.7, 1.4], jit: 0.1 }),
  ]));
  W.head = new THREE.Group(); W.head.position.set(0, 0.88, 1.08); W.body.add(W.head);
  add(W.head, mergeGeometries([
    mk(ico(0.5, 1), grey, { p: [0, 0, 0.05], s: [0.62, 0.55, 0.78], jit: 0.08 }),
    mk(box(0.22, 0.17, 0.46), light, { p: [0, -0.07, 0.45] }), mk(box(0.1, 0.09, 0.08), dk, { p: [0, -0.01, 0.7] }),
    mk(cone(0.1, 0.32, 4), grey, { p: [0.15, 0.3, -0.02], r: [-0.2, 0, -0.2] }), mk(cone(0.1, 0.32, 4), grey, { p: [-0.15, 0.3, -0.02], r: [-0.2, 0, 0.2] }),
    mk(box(0.07, 0.05, 0.03), 0xffd23a, { p: [0.15, 0.1, 0.34] }), mk(box(0.07, 0.05, 0.03), 0xffd23a, { p: [-0.15, 0.1, 0.34], }),
  ]));
  W.legs = [];
  [[-1, 0.62], [1, 0.62], [-1, -0.62], [1, -0.62]].forEach(([sx, z]) => {
    const g = new THREE.Group(); g.position.set(sx * 0.26, 0.72, z); W.body.add(g);
    add(g, mergeGeometries([mk(box(0.17, 0.62, 0.17), 0x6d6a62, { p: [0, -0.3, 0] }), mk(box(0.2, 0.08, 0.28), dk, { p: [0, -0.62, 0.05] })]));
    W.legs.push(g);
  });
  W.tail = new THREE.Group(); W.tail.position.set(0, 0.8, -0.95); W.body.add(W.tail);
  add(W.tail, mk(cone(0.14, 0.7, 5), grey, { p: [0, -0.12, -0.28], r: [-1.9, 0, 0] }));
  scene.add(W.root);
}
// the rock the wolf watches from
const rockMat = flat();
{
  const g = mergeGeometries([
    mk(ico(2.2, 1), 0x8c877b, { p: [0, 0.4, 0], s: [1.2, 0.8, 1], jit: 0.12 }),
    mk(ico(1.5, 1), 0x777268, { p: [1.4, 0.5, 1.0], s: [1, 0.8, 1], jit: 0.12 }),
    mk(ico(1.2, 1), 0x9a9487, { p: [-1.0, 0.9, -0.6], jit: 0.12 }),
  ]);
  const m = new THREE.Mesh(g, rockMat); m.position.set(ROCK.x, gh(ROCK.x, ROCK.z) + 0.2, ROCK.z); m.castShadow = m.receiveShadow = true; m.name = 'wolf-rock'; scene.add(m);
}

// ───────────────────────── scenery (instanced) ─────────────────────────
const dummy = new THREE.Object3D();
function scatterInst(geo, count, gen, { shadow = true, name = '' } = {}) {
  const im = new THREE.InstancedMesh(geo, flat(), count); im.name = name; im.castShadow = shadow; im.receiveShadow = true;
  let k = 0, tries = 0;
  while (k < count && tries++ < count * 60) {
    const o = gen(); if (!o) continue;
    dummy.position.set(o.x, o.y ?? gh(o.x, o.z), o.z); dummy.rotation.set(o.rx || 0, rnd(0, 6.28), o.rz || 0); dummy.scale.set(o.sx ?? o.s, o.sy ?? o.s, o.sx ?? o.s);
    dummy.updateMatrix(); im.setMatrixAt(k++, dummy.matrix);
  }
  im.count = k; im.instanceMatrix.needsUpdate = true; scene.add(im); return im;
}
const polar = (r0, r1) => { const a = rnd(0, 6.283), r = rnd(r0, r1); return [Math.cos(a) * r, Math.sin(a) * r]; };
const pineGeo = mergeGeometries([
  mk(cone(0.22, 1, 5), 0x5a3d26, { p: [0, 0.5, 0] }).clone(),
  mk(cone(1.1, 1.8, 6), 0x2f6a3a, { p: [0, 1.5, 0], jit: 0.1 }), mk(cone(0.85, 1.6, 6), 0x38783f, { p: [0, 2.5, 0], jit: 0.1 }), mk(cone(0.55, 1.4, 6), 0x42874a, { p: [0, 3.4, 0], jit: 0.1 }),
]);
scatterInst(pineGeo, 330, () => { const [x, z] = polar(29, 58); const h = gh(x, z); if (h < 0.9 || h > 10 || (z > 8 && Math.random() < 0.85)) return null; const s = rnd(0.9, 1.9); return { x, z, s, sy: s * rnd(0.9, 1.4), y: h - 0.2 }; }, { name: 'pines' });
const roundTreeGeo = mergeGeometries([
  mk(cone(0.2, 1.6, 5), 0x6b4a2c, { p: [0, 0.8, 0] }),
  mk(ico(1.0, 0), 0x5d9a2a, { p: [0, 2.1, 0], jit: 0.12 }), mk(ico(0.7, 0), 0x6aa930, { p: [0.55, 1.6, 0.2], jit: 0.12 }), mk(ico(0.6, 0), 0x4f8a28, { p: [-0.5, 1.7, -0.2], jit: 0.12 }),
]);
scatterInst(roundTreeGeo, 22, () => { const [x, z] = polar(26, 40); const h = gh(x, z); if (h < 0.9 || h > 6) return null; const s = rnd(1.0, 1.7); return { x, z, s }; }, { name: 'round-trees' });
const rockGeo = mergeGeometries([mk(ico(0.8, 0), 0x777268, { s: [1, 0.7, 1], jit: 0.15 }), mk(ico(0.5, 0), 0x8c877b, { p: [0.6, -0.1, 0.2], jit: 0.15 })]);
scatterInst(rockGeo, 60, () => { const [x, z] = polar(16, 56); const h = gh(x, z); if (h < 0.1) return null; if (Math.hypot(x - ROCK.x, z - ROCK.z) < 5) return null; const s = rnd(0.5, 1.5) * (Math.hypot(x, z) > 32 ? 3 : 1); return { x, z, s, y: h + 0.2 * s }; }, { name: 'rocks' });
const bushGeo = mergeGeometries([mk(ico(0.6, 0), 0x4e8f27, { jit: 0.15, s: [1, 0.75, 1] }), mk(ico(0.45, 0), 0x5da22e, { p: [0.45, -0.05, 0.1], jit: 0.15 }), mk(ico(0.4, 0), 0x3f7f22, { p: [-0.4, -0.05, -0.1], jit: 0.15 })]);
scatterInst(bushGeo, 45, () => { const [x, z] = polar(8, 33); if (Math.hypot(x - ROCK.x, z - ROCK.z) < 4) return null; return { x, z, s: rnd(0.6, 1.1), y: gh(x, z) + 0.25 }; }, { name: 'bushes' });
const tuftGeo = mergeGeometries([0, 1, 2].map(i => mk(cone(0.1, 0.55, 3), 0x6ea61c, { p: [Math.cos(i * 2.1) * 0.12, 0.25, Math.sin(i * 2.1) * 0.12], r: [Math.sin(i * 2.1) * 0.35, 0, -Math.cos(i * 2.1) * 0.35], jit: 0.15 })));
scatterInst(tuftGeo, 650, () => { const [x, z] = polar(0, 33); return { x, z, s: rnd(0.7, 1.6), y: gh(x, z) - 0.05 }; }, { shadow: false, name: 'tufts' });

// clouds
const clouds = [];
{
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xdfefff, emissiveIntensity: 0.5, flatShading: true, roughness: 1, fog: false });
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group();
    const n = 4 + Math.floor(Math.random() * 3);
    for (let k = 0; k < n; k++) { const m = new THREE.Mesh(ico(rnd(3, 5.5), 1), mat); m.position.set(k * 4.2 - n * 2, rnd(-0.6, 1), rnd(-1.5, 1.5)); m.scale.y = 0.7; g.add(m); }
    g.position.set(rnd(-130, 130), rnd(40, 62), rnd(-170, 10)); g.name = 'cloud'; scene.add(g); clouds.push(g);
  }
}

// ───────────────────────── clover patches ─────────────────────────
const clovers = [];
{
  const cm = flat(), star = new THREE.MeshBasicMaterial({ color: 0xfff7a0, transparent: true, opacity: 0, depthWrite: false, fog: false });
  const geo = mergeGeometries([
    ...[0, 1, 2, 3, 4, 5].map(i => mk(ico(0.3, 0), i % 2 ? 0x2f8a2a : 0x3fa534, { p: [Math.cos(i * 1.05) * 0.5, 0.1, Math.sin(i * 1.05) * 0.5], s: [1, 0.45, 1], jit: 0.1 })),
    mk(ico(0.12, 0), 0xffffff, { p: [0.2, 0.28, 0.1] }), mk(ico(0.12, 0), 0xffd1e6, { p: [-0.3, 0.26, -0.2] }), mk(ico(0.12, 0), 0xffffff, { p: [0.0, 0.3, -0.5] }),
  ]);
  [[14, -5], [-3, 15], [-19, 8]].forEach(([x, z]) => {
    const g = new THREE.Group(); g.position.set(x, gh(x, z), z); g.name = 'clover';
    const m = new THREE.Mesh(geo, cm); m.receiveShadow = true; g.add(m);
    const sp = new THREE.Group(); sp.position.y = 1.0;
    sp.add(new THREE.Mesh(box(0.08, 0.7, 0.02), star), new THREE.Mesh(box(0.7, 0.08, 0.02), star)); g.add(sp);
    scene.add(g); clovers.push({ x, z, g, mesh: m, star: sp, prog: 0, eaten: false });
  });
}

// ───────────────────────── markers & fx ─────────────────────────
const ringMat = c => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.4, depthWrite: false, fog: false });
const marker = new THREE.Mesh(new THREE.RingGeometry(0.85, 1.1, 28).rotateX(-Math.PI / 2), ringMat(0xfff2a0)); marker.name = 'player'; scene.add(marker);
const reach = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.6, 40).rotateX(-Math.PI / 2), ringMat(0xe0302a)); reach.name = 'reach'; reach.visible = false; scene.add(reach);
const aim = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.05, 20).rotateX(-Math.PI / 2), ringMat(0xe0302a)); aim.material.opacity = 0.9; aim.name = 'aim'; aim.visible = false; scene.add(aim);
const outline = new THREE.Group(); outline.visible = false; outline.name = 'outline';
{
  const om = new THREE.MeshBasicMaterial({ color: 0xff2a1a, side: THREE.BackSide, depthTest: false }); om.fog = false;
  const a = new THREE.Mesh(sheepBodyGeo, om), b = new THREE.Mesh(sheepHeadGeo, om); b.position.copy(HEAD_P); a.renderOrder = b.renderOrder = 20; outline.add(a, b); outline.userData = { a, b };
  scene.add(outline);
}
const wool = burst({ max: 500, seed: 7, size: 0.32, additive: false }); wool.name = 'wool'; scene.add(wool);
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
const cam = { x: 0, z: 0, punch: 0, fov: 45, zoom: 1 };

function reset(newMode) {
  if (newMode) mode = newMode;
  T = 0; result = null; clock = 0; startleT = rnd(18, 24); zoomT = 16; decoyI = 0; pounce.ph = null; toastT = 0;
  flock.angle = rnd(0, 6.28); flock.target = flock.angle; flock.turnT = 12;
  // clusters of sheep
  const cl = []; for (let k = 0; k < 9; k++) { const [x, z] = polar(2, 22); cl.push([x, z]); }
  sheep.forEach((s, i) => {
    const [cx, cz] = cl[i % cl.length]; const [dx, dz] = polar(0, 9);
    let x = cx + dx, z = cz + dz; if (Math.hypot(x - ROCK.x, z - ROCK.z) < 4) { x += 6; z += 6; }
    if (Math.hypot(x, z) > 27) { x *= 0.8; z *= 0.8; }
    Object.assign(s, { x, z, vx: 0, vz: 0, yaw: rnd(0, 6.28), st: Math.random() < 0.5 ? 'graze' : 'walk', t: rnd(1, 6), runT: 0, zoom: 0, susp: 0, still: 0, yawRate: 0, speedMax: rnd(0.9, 1.4), pitch: 0, frozen: false, immune: 0, hop: 0, hopV: 0, spin: 0, graze: false, phase: rnd(0, 6) });
  });
  Object.assign(P, { x: 0, z: 1.5, yaw: Math.PI, st: 'walk' });
  Object.assign(wolf, { x: ROCK.x, z: ROCK.z, state: mode === 'solo' ? 'watch' : 'ctrl', pose: 'crouch', bites: 3, cd: 5, sulk: 0, target: null, abort: 0, onRock: mode === 'solo', yaw: 0.8, shrug: 0 });
  if (mode === 'local') { wolf.x = -8; wolf.z = -6; wolf.onRock = false; wolf.cd = 0; }
  clovers.forEach(c => { c.prog = 0; c.eaten = false; c.mesh.scale.setScalar(1); c.mesh.visible = true; });
  cam.x = P.x; cam.z = P.z; cam.punch = 0;
  hideReveal(); updateModeUI();
  $('rclv').style.display = mode === 'solo' ? '' : 'none'; $('rsus').style.display = mode === 'solo' ? '' : 'none';
  $('hud').style.minWidth = '200px';
}
const eatenCount = () => clovers.filter(c => c.eaten).length;

// ───────────────────────── UI ─────────────────────────
function updateModeUI() {
  $('mname').textContent = mode === 'solo' ? 'SOLO' : 'LOCAL 2-PLAYER';
  $('ctl').innerHTML = mode === 'solo'
    ? 'WASD / Arrows walk · Shift run (suspicious!)<br>E / Space graze · hold E on clover<br>R restart'
    : 'P1 sheep: WASD · Shift run · E graze<br>P2 wolf: Arrows move · Enter POUNCE<br>R restart';
}
function toast(t, d = 2.2) { const e = $('toast'); e.textContent = t; e.style.opacity = 1; toastT = d; }
function hideReveal() {
  $('toast').style.opacity = 0; toastT = 0; $('rbig').style.fontSize = '';
  $('reveal').style.opacity = 0; $('bubble').style.display = 'none'; $('tag').style.display = 'none'; $('cap').style.opacity = 0;
  $('bt').style.height = $('bb').style.height = '0'; $('vig').style.opacity = 0; outline.visible = false;
}
const caps = {
  stalk: ['Observe: a sheep that jogs. Highly irregular.', 'Something about that sheep is... off.', 'The wolf has seen a sheep that walks like a human.', 'Nature is patient. Nature is also very judgemental.', 'That sheep walks like it has somewhere to be.'],
  ai: ['Mistaken identity. Nature is humbling.', 'The wolf reconsiders his life choices.', 'A completely innocent sheep. Awkward.', 'Bite wasted. The documentary crew looks away.'],
  human: ['Even in nature, nobody blends in forever.', 'It had a name. It was PLAYER 1.', 'And so the hidden one is found.'],
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
  $('rbig').style.fontSize = big.length > 8 ? 'clamp(40px,7vw,110px)' : '';
  $('rk').textContent = kicker; $('rbig').textContent = big; $('rsub').textContent = sub; $('rbig').style.color = color || '#fdfdec';
  $('reveal').style.opacity = 1; $('reveal').style.transform = 'scale(1)';
}
function endGame(kind, big, sub, kicker, color) { result = kind; $('cap').style.opacity = 0; $('toast').style.opacity = 0; showResult(big, sub + '   ·   R to play again · M to switch mode', kicker, color); }
const vp = new THREE.Vector3();
function place(el, wx, wy, wz) { vp.set(wx, wy, wz).project(camera); el.style.left = (vp.x * 0.5 + 0.5) * innerWidth + 'px'; el.style.top = (-vp.y * 0.5 + 0.5) * innerHeight + 'px'; }

// ───────────────────────── input ─────────────────────────
const act = a => {
  if (a.action === 'pounce') { startPounce(a.target === 'human' ? P : sheep[1 + Math.floor(Math.random() * N_AI)]); return; }
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
  const run = kd('ShiftLeft', 'ShiftRight');
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
      if (s.still > 7 && flock.moving > 0.35) rate += 0.35;
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
  let best = null, bd = 3.6;
  for (const s of sheep) { const d = Math.hypot(s.x - wolf.x, s.z - wolf.z); if (d < bd) { bd = d; best = s; } }
  if (best) startPounce(best); else toast('Nothing in reach: close in on a sheep!', 1.3);
}
function updateWolf(dt) {
  wolf.t += dt;
  if (wolf.state === 'pounce') return;
  const w = wolf;
  if (mode === 'local') {
    if (pounce.ph) return;
    const ix = (kd('ArrowRight') ? 1 : 0) - (kd('ArrowLeft') ? 1 : 0), iz = (kd('ArrowDown') ? 1 : 0) - (kd('ArrowUp') ? 1 : 0), m = Math.hypot(ix, iz);
    if (m && !result) { w.x += ix / m * 7 * dt; w.z += iz / m * 7 * dt; w.yaw += angDiff(w.yaw, Math.atan2(ix, iz)) * Math.min(1, dt * 10); w.phase += dt * 9; w.pose = 'walk'; } else w.pose = 'crouch';
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
    if (t && t.susp >= 1.5 && w.cd <= 0) { w.state = 'stalk'; w.target = t; w.abort = 0; w.stalkT = 0; w.onRock = false; w.y = gh(w.x, w.z) + (w.y > 1 ? 0 : 0); caption(pick(caps.stalk)); play('wind', 0.6); }
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
    if (d < 0.8) { w.state = 'watch'; w.cd = Math.max(w.cd, 3); w.x = ROCK.x; w.z = ROCK.z; $('cap').style.opacity = 0; }
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
    $('bt').style.height = $('bb').style.height = 9 * cam.punch + 'vh';
    if (u >= 1) {
      p.ph = 'reveal'; p.t = 0; w.pose = 'land'; w.pitch = 0;
      for (const o of sheep) { if (o === t || o.player) continue; const dx = o.x - t.x, dz = o.z - t.z, d = Math.hypot(dx, dz); if (d < 6) { o.st = 'run'; o.runT = 1.4; o.dir = Math.atan2(dx, dz) + rnd(-0.3, 0.3); } }
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1, t.z), { count: 90, speed: 6, spread: Math.PI * 0.7, life: 1.6, gravity: 5, color: 0xfff6dc });
      wool.emit(new THREE.Vector3(t.x, gh(t.x, t.z) + 1, t.z), { count: 30, speed: 3, spread: Math.PI, life: 2, gravity: 2, color: 0xffffff });
      camShake.kick(1.0); play('thud', 1); play('hit', 0.6); t.hopV = 6; t.spin = rnd(-6, 6);
      $('flash').style.opacity = 0.7;
      if (p.human) {
        outline.visible = true; wolf.pose = 'land'; sting();
        showResult('GOTCHA', 'HUMAN!  That was PLAYER 1.', 'HUMAN!', '#ff3a2a'); $('rk').textContent = 'HUMAN!'; $('rsub').textContent = 'PLAYER 1 has been found.'; $('vig').style.opacity = 0.55;
        $('tag').style.display = 'block'; caption(pick(caps.human));
      } else {
        showResult('AI SHEEP', 'Just a sheep.', 'Bite wasted', '#fdfdec'); $('rsub').textContent = 'Just a sheep. Bite wasted.';
        $('bubble').style.display = 'block'; caption(pick(caps.ai)); play('womp', 1, 0.5); play('womp', 1, 0.8);
        play('baa', 0.9, 0.3); w.bites--; w.shrug = 1;
        wolf.pose = 'shrug';
      }
    }
    return p.slow;
  }
  // reveal
  const dur = p.human ? 3.6 : 3.0, u = p.t / dur;
  $('flash').style.opacity = Math.max(0, 0.7 - p.t * 2.4);
  const pop = p.t < 0.35 ? 0.4 + 0.9 * ease(p.t / 0.35) : 1.0 + Math.sin(p.t * 3) * 0.02;
  $('reveal').style.transform = `scale(${pop * (p.human ? 1.05 : 1)})`;
  $('reveal').style.opacity = p.t < 0.1 ? p.t * 10 : 1;
  if (t.hop !== undefined) { t.hopV -= 14 * rdt * (p.t < 1 ? 0.5 : 1); t.hop = Math.max(0, t.hop + t.hopV * rdt); if (t.hop === 0 && t.hopV < 0) { t.hopV = 0; t.spin *= 0.8; } }
  if (p.human) { const g = bodyMatrixOf(t); outline.position.set(t.x, t.y + t.hop, t.z); outline.rotation.y = t.yaw + t.spin * 0.0; outline.scale.setScalar(SS * 1.1); place($('tag'), t.x, t.y + 3.6, t.z); { const r = $('tag').getBoundingClientRect(); if (r.top < innerHeight * 0.5 && r.top > innerHeight * 0.12) $('tag').style.top = innerHeight * 0.62 + 'px'; }; }
  else place($('bubble'), t.x, t.y + 3.2, t.z);
  if (!p.human) { w.shrug = 1; }
  if (u > 0.72) cam.punch = Math.max(0, cam.punch - rdt * 1.6);
  $('bt').style.height = $('bb').style.height = 9 * cam.punch + 'vh';
  if (u >= 1) {
    p.ph = null; t.frozen = false; w.target = null; hideReveal(); cam.punch = 0;
    if (p.human) {
      wolf.state = 'done'; t.frozen = true;
      if (mode === 'solo') endGame('lose', 'EATEN', 'The wolf got you · ' + eatenCount() + '/3 clovers', 'You were the human'); else endGame('wolf', 'WOLF WINS', 'Player 2 found PLAYER 1', 'Gotcha');
      outline.visible = true; $('tag').style.display = 'block'; $('vig').style.opacity = 0.6; $('bb').style.height = '0';
    } else {
      t.immune = 6; t.susp = 0; t.zoom = 1.2; t.dir = rnd(0, 6.28);
      w.pose = 'crouch'; w.shrug = 0;
      if (mode === 'solo') {
        w.state = 'return'; w.cd = 5;
        if (w.bites <= 0) { w.sulk = 18; w.state = 'watch'; w.cd = 5; toast('Out of bites! The wolf is sulking…', 2.4); w.x = w.x; }
      } else {
        w.state = 'ctrl';
        if (w.bites <= 0) endGame('sheep', 'SHEEP WIN', 'The wolf ran out of bites', 'Baa-ravo', '#8ee04a');
      }
    }
    return 1;
  }
  return p.t < 0.9 ? 0.2 : lerp(0.2, 1, sm(0.9, 1.6, p.t));
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
    c.star.children.forEach(m => m.material.opacity = near * (0.4 + 0.5 * Math.sin(clock * 5 + c.x)));
    c.star.rotation.y = clock * 0.8; c.star.scale.setScalar(0.7 + 0.4 * Math.sin(clock * 5 + c.x) ** 2); c.star.position.y = 1 + Math.sin(clock * 2) * 0.1;
    if (c.eaten) return;
    if (d < 1.9 && P.graze && !P.frozen && !result) {
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
function drawSheep(dt) {
  for (let i = 0; i < N; i++) {
    const s = sheep[i]; const sp = Math.hypot(s.vx, s.vz);
    s.y = gh(s.x, s.z);
    const tp = (s.graze ? 1.1 : 0); s.pitch += (tp - s.pitch) * Math.min(1, dt * 6);
    const bob = Math.abs(Math.sin(s.phase * 2)) * 0.07 * Math.min(1, sp);
    const roll = Math.sin(s.phase) * 0.06 * Math.min(1, sp);
    e3.set(s.hop > 0 ? s.spin * 0.1 : 0, s.yaw, roll, 'YXZ'); q.setFromEuler(e3);
    mB.compose(v3.set(s.x, s.y + bob + s.hop, s.z), q, sc);
    bodyIM.setMatrixAt(i, mB);
    const nodding = s.graze ? Math.sin(clock * 5 + i) * 0.08 : 0;
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
    W.legs.forEach((l, i) => { l.rotation.x = i < 2 ? -1.5 : 1.1; l.scale.y = 1; });
  } else if (pz === 'land') {
    W.body.position.y = -0.3; W.body.rotation.x = 0.3; W.legs.forEach(l => l.scale.y = 0.6); W.head.rotation.x = 0.4;
  } else if (pz === 'shrug') {
    const k = Math.sin(clock * 7);
    W.body.position.y = 0.1 + Math.abs(k) * 0.12; W.body.rotation.x = -0.35; W.head.rotation.z = Math.sin(clock * 3.5) * 0.45; W.head.rotation.x = -0.15;
    W.legs.forEach((l, i) => { if (i < 2) { l.rotation.x = -0.9 - Math.abs(k) * 0.4; l.rotation.z = (i ? 1 : -1) * (0.9 + Math.abs(k) * 0.3); } else l.rotation.x = 0.5; });
    W.tail.rotation.y = Math.sin(clock * 6) * 0.6;
  } else if (pz === 'sulk') {
    W.body.position.y = -0.4; W.head.rotation.x = 0.7; W.head.position.y = 0.5; W.legs.forEach(l => l.scale.y = 0.4); W.body.rotation.z = 0.02;
  }
  if (pz !== 'crouch' && pz !== 'walk' && pz !== 'sulk') { /* legs scale reset handled each pose */ }
  if (pz !== 'land' && pz !== 'sulk' && pz !== 'crouch' && pz !== 'walk') W.legs.forEach(l => l.scale.y = 1);
  r.visible = true;
  // aim rings (local mode)
  const loc = mode === 'local';
  reach.visible = loc && !pounce.ph && !result; reach.position.set(w.x, gh(w.x, w.z) + 0.15, w.z);
  aim.visible = false;
  if (loc && !pounce.ph && !result) { let best = null, bd = 3.6; for (const s of sheep) { const d = Math.hypot(s.x - w.x, s.z - w.z); if (d < bd) { bd = d; best = s; } } if (best) { aim.visible = true; aim.position.set(best.x, best.y + 0.2, best.z); aim.scale.setScalar(1 + 0.15 * Math.sin(clock * 9)); } }
}

// ───────────────────────── camera ─────────────────────────
function updateCamera(dt, rdt) {
  let tx = P.x, tz = P.z, zoom = 1;
  const dW = Math.hypot(wolf.x - P.x, wolf.z - P.z);
  if (mode === 'solo') { const k = dW < 32 ? 0.28 : 0; tx += (wolf.x - P.x) * k; tz += (wolf.z - P.z) * k; }
  else { tx += (wolf.x - P.x) * 0.5; tz += (wolf.z - P.z) * 0.5; zoom = 1 + clamp((dW - 14) / 30, 0, 0.55); }
  if (pounce.ph && pounce.target) { const m = pounce.target; tx = lerp(tx, (wolf.x + m.x) / 2, cam.punch); tz = lerp(tz, (wolf.z + m.z) / 2, cam.punch); }
  const kf = 1 - Math.exp(-rdt * (cam.punch > 0.05 ? 7 : 2.4));
  cam.x += (tx - cam.x) * kf; cam.z += (tz - cam.z) * kf; cam.zoom += (zoom - cam.zoom) * kf;
  const sc2 = (1 - 0.55 * cam.punch) * cam.zoom;
  camera.position.set(cam.x, 15 * sc2 + 3, cam.z + 32 * sc2 + 6);
  camera.lookAt(cam.x, 0, cam.z - 8);
  const fov = 50 - 16 * cam.punch; if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }
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
  const tt = `${m}:${String(sec).padStart(2, '0')}`; if ($('time').textContent !== tt) $('time').textContent = tt;
  renderBites(); renderClovers();
  $('sfill').style.width = clamp(P.susp / 1.5, 0, 1) * 100 + '%';
  if (toastT > 0) { toastT -= rdt; if (toastT <= 0) $('toast').style.opacity = 0; }
  if (mode === 'solo' && T > 175 && eatenCount() < 3 && !result) { $('time').style.color = '#ff6a5a'; } else $('time').style.color = '';
  if (!pounce.ph && wolf.state !== 'stalk' && !result) $('cap').style.opacity = 0;
  if (result && pounce.ph === null) { /* result overlay stays */ }
  if (!pounce.ph && !result) { $('bt').style.height = $('bb').style.height = 9 * cam.punch + 'vh'; }
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
  renderer.render(scene, camera);
}
requestAnimationFrame(loop);

// ───────────────────────── window.__game ─────────────────────────
const r2 = v => +v.toFixed(2);
window.__game = {
  subject: 'player',
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
    if (s.player) { Object.assign(P, s.player); }
    if (s.wolf) { Object.assign(wolf, s.wolf); wolf.onRock = Math.hypot(wolf.x - ROCK.x, wolf.z - ROCK.z) < 0.5; }
    if (s.susp !== undefined) P.susp = s.susp;
    if (s.pounce) startPounce(s.pounce === 'human' ? P : sheep[1 + Math.floor(Math.random() * N_AI)]);
  },
};
