"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Procedural hero centerpiece in the img2threejs style: the whole model is
 * generated from Three.js primitives (no imported meshes/textures), built by
 * a factory function, and animated through per-object `userData.tick`
 * callbacks collected by the render loop.
 *
 * Scene: an isometric platform holding a tower of pooled capital (coins),
 * a floating peso coin, and ascending growth bars — the reference artwork's
 * crypto elements recast for Aurora's funding/vault story, in the site
 * palette from `app/globals.css`.
 */

const PALETTE = {
  mint: '#90F0D8',
  teal: '#2AD9B7',
  indigo: '#5018C8',
  violet: '#7828E8',
  card: '#13132A',
  elevated: '#1A1A38',
  background: '#090916',
};

type Tick = (t: number) => void;

function standard(opts: THREE.MeshStandardMaterialParameters) {
  return new THREE.MeshStandardMaterial({ metalness: 0.25, roughness: 0.45, ...opts });
}

function roundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  shape.moveTo(-w + radius, -h);
  shape.lineTo(w - radius, -h);
  shape.absarc(w - radius, -h + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(w, h - radius);
  shape.absarc(w - radius, h - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(-w + radius, h);
  shape.absarc(-w + radius, h - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(-w, -h + radius);
  shape.absarc(-w + radius, -h + radius, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
}

/** Flat rounded slab lying on the XZ plane, base at y=0. */
function slab(width: number, depth: number, thickness: number, radius: number, material: THREE.Material) {
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape(width, depth, radius), {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  geometry.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geometry, material);
}

/** A coin: cylinder with a darker rim than its faces, like the reference art. */
function coin(radius: number, height: number, faceColor: THREE.Color, rimColor: THREE.Color) {
  const side = standard({ color: rimColor, metalness: 0.4, roughness: 0.35 });
  const cap = standard({ color: faceColor, metalness: 0.35, roughness: 0.3 });
  return new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 48), [side, cap, cap]);
}

/** Peso glyph (₱) from primitives: stem, half-torus bowl, two crossbars. */
function pesoGlyph(color: string) {
  const group = new THREE.Group();
  const material = standard({ color, metalness: 0.15, roughness: 0.4 });
  const stem = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.88, 0.06), material);
  stem.position.set(-0.14, 0, 0);
  const bowl = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.065, 12, 32, Math.PI), material);
  bowl.rotation.z = -Math.PI / 2; // top half-arc -> right half (the bowl of the P)
  bowl.position.set(-0.14, 0.2, 0);
  const barTop = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.06), material);
  barTop.position.set(-0.03, 0.32, 0);
  const barBottom = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.06), material);
  barBottom.position.set(-0.03, 0.12, 0);
  group.add(stem, bowl, barTop, barBottom);
  return group;
}

function circuitTrace(points: [number, number][], color: string) {
  const group = new THREE.Group();
  const material = standard({ color, emissive: color, emissiveIntensity: 0.7, roughness: 0.6 });
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, z1] = points[i];
    const [x2, z2] = points[i + 1];
    const length = Math.hypot(x2 - x1, z2 - z1);
    const segment = new THREE.Mesh(new THREE.BoxGeometry(length + 0.07, 0.025, 0.07), material);
    segment.position.set((x1 + x2) / 2, 0.015, (z1 + z2) / 2);
    segment.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    group.add(segment);
  }
  const [nx, nz] = points[points.length - 1];
  const node = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), material);
  node.position.set(nx, 0.03, nz);
  group.add(node);
  return group;
}

/** Builds the full model. Returns a group whose subtree carries `userData.tick` animators. */
function buildCapitalPlatform() {
  const model = new THREE.Group();
  const mint = new THREE.Color(PALETTE.mint);
  const teal = new THREE.Color(PALETTE.teal);
  const indigo = new THREE.Color(PALETTE.indigo);
  const violet = new THREE.Color(PALETTE.violet);

  // --- Platform: dark slabs with a glowing teal seam between them ---
  const base = slab(5.4, 5.4, 0.42, 0.7, standard({ color: PALETTE.elevated, roughness: 0.55 }));
  const seam = slab(4.95, 4.95, 0.07, 0.62, standard({
    color: PALETTE.teal,
    emissive: PALETTE.teal,
    emissiveIntensity: 1.1,
  }));
  seam.position.y = 0.44;
  const top = slab(4.7, 4.7, 0.2, 0.55, standard({ color: PALETTE.card, roughness: 0.5 }));
  top.position.y = 0.52;
  base.receiveShadow = top.receiveShadow = true;
  model.add(base, seam, top);
  const platformTop = 0.78;

  // --- Central tower of pooled capital: teal -> mint gradient coins ---
  const coinHeight = 0.27;
  const coinGap = 0.045;
  for (let i = 0; i < 6; i++) {
    const face = teal.clone().lerp(mint, i / 5);
    const rim = face.clone().multiplyScalar(0.65);
    const piece = coin(1.05, coinHeight, face, rim);
    piece.position.y = platformTop + coinHeight / 2 + i * (coinHeight + coinGap);
    piece.rotation.y = i * 0.35;
    piece.castShadow = true;
    model.add(piece);
  }
  const towerTop = platformTop + 6 * (coinHeight + coinGap);

  // Pulsing halo ring around the tower base.
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.03, 10, 64),
    standard({ color: PALETTE.mint, emissive: PALETTE.mint, emissiveIntensity: 0.8 }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = platformTop + 0.03;
  halo.userData.tick = ((t: number) => {
    (halo.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + 0.5 * Math.sin(t * 1.6);
  }) satisfies Tick;
  model.add(halo);

  // --- Floating peso coin: bobs and slowly spins above the tower ---
  const floater = new THREE.Group();
  const floaterBaseY = towerTop + 1.35;
  floater.position.y = floaterBaseY;
  const pesoCoin = coin(0.95, 0.16, teal.clone().lerp(mint, 0.35), teal.clone().multiplyScalar(0.6));
  pesoCoin.rotation.x = Math.PI / 2; // stand the coin upright, face out
  pesoCoin.castShadow = true;
  const rimGlow = new THREE.Mesh(
    new THREE.TorusGeometry(0.96, 0.035, 10, 64),
    standard({ color: PALETTE.mint, emissive: PALETTE.mint, emissiveIntensity: 1.2 }),
  );
  const front = pesoGlyph(PALETTE.background);
  front.position.z = 0.12;
  const back = pesoGlyph(PALETTE.background);
  back.rotation.y = Math.PI;
  back.position.z = -0.12;
  floater.add(pesoCoin, rimGlow, front, back);
  floater.userData.tick = ((t: number) => {
    floater.position.y = floaterBaseY + Math.sin(t * 0.9) * 0.16;
    floater.rotation.y = t * 0.6;
  }) satisfies Tick;
  model.add(floater);

  // --- Growth bars (ascending, like the reference charts) ---
  // Box bars on the platform's left edge, teal -> mint.
  for (let i = 0; i < 5; i++) {
    const height = 0.5 + i * 0.34;
    const geometry = new THREE.BoxGeometry(0.32, height, 0.32);
    geometry.translate(0, height / 2, 0); // base-anchored so pulsing grows upward
    const bar = new THREE.Mesh(geometry, standard({ color: teal.clone().lerp(mint, i / 4) }));
    bar.position.set(-1.78, platformTop, 1.0 - i * 0.5);
    bar.castShadow = true;
    bar.userData.tick = ((t: number) => {
      bar.scale.y = 1 + Math.sin(t * 1.2 + i * 0.8) * 0.05;
    }) satisfies Tick;
    model.add(bar);
  }
  // Cylinder bars on the ground to the right, indigo -> violet.
  for (let i = 0; i < 4; i++) {
    const height = 1.5 - i * 0.3;
    const geometry = new THREE.CylinderGeometry(0.26, 0.26, height, 32);
    geometry.translate(0, height / 2, 0);
    const bar = new THREE.Mesh(geometry, standard({ color: indigo.clone().lerp(violet, i / 3) }));
    bar.position.set(3.35, 0, -1.15 + i * 0.68);
    bar.castShadow = true;
    bar.userData.tick = ((t: number) => {
      bar.scale.y = 1 + Math.sin(t * 1.2 + 2 + i * 0.8) * 0.05;
    }) satisfies Tick;
    model.add(bar);
  }

  // --- Corner deposit stacks on the ground, indigo/violet with a mint "logo" cap ---
  const cornerStacks: Array<{ x: number; z: number; count: number }> = [
    { x: -3.35, z: 2.5, count: 4 },
    { x: 3.5, z: 2.1, count: 3 },
  ];
  for (const { x, z, count } of cornerStacks) {
    for (let i = 0; i < count; i++) {
      const face = indigo.clone().lerp(violet, i / Math.max(count - 1, 1));
      const piece = coin(0.58, 0.2, face, face.clone().multiplyScalar(0.6));
      piece.position.set(x, 0.1 + i * 0.235, z);
      piece.rotation.y = i * 0.5;
      piece.castShadow = true;
      model.add(piece);
      if (i === count - 1) {
        const logo = new THREE.Mesh(
          new THREE.CircleGeometry(0.3, 32),
          standard({ color: PALETTE.mint, emissive: PALETTE.mint, emissiveIntensity: 0.8 }),
        );
        logo.rotation.x = -Math.PI / 2;
        logo.position.set(x, 0.1 + i * 0.235 + 0.101, z);
        model.add(logo);
      }
    }
  }

  // --- Circuit traces radiating from the platform ---
  const traces: Array<{ points: [number, number][]; color: string }> = [
    { points: [[2.6, 0.2], [4.3, 0.2], [4.3, 1.5]], color: PALETTE.teal },
    { points: [[0.6, 2.6], [0.6, 3.8], [1.9, 3.8]], color: PALETTE.violet },
    { points: [[-2.6, -0.6], [-4.2, -0.6]], color: PALETTE.violet },
    { points: [[-1.3, -2.6], [-1.3, -3.9], [-2.4, -3.9]], color: PALETTE.teal },
    { points: [[1.9, -2.6], [1.9, -3.5], [3.2, -3.5]], color: PALETTE.violet },
    { points: [[-2.6, 1.6], [-3.9, 1.6], [-3.9, 3.0]], color: PALETTE.teal },
  ];
  for (const { points, color } of traces) model.add(circuitTrace(points, color));

  // Ground plane that only renders received shadows.
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.ShadowMaterial({ opacity: 0.28 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  model.add(ground);

  return model;
}

interface CapitalPlatform3DProps {
  className?: string;
}

export default function CapitalPlatform3D({ className }: CapitalPlatform3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      console.warn('CapitalPlatform3D: WebGL context creation failed', err);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    const cameraDirection = new THREE.Vector3(1, 0.74, 1.35).normalize();
    const lookAt = new THREE.Vector3(0, 1.9, 0);

    // Studio lights, per the img2threejs viewer: key + fill + hemisphere,
    // plus a teal accent near the floating coin.
    const hemisphere = new THREE.HemisphereLight('#8a7bd8', PALETTE.background, 0.55);
    const key = new THREE.DirectionalLight('#ffffff', 2.4);
    key.position.set(6, 10, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = key.shadow.camera.bottom = -8;
    key.shadow.camera.right = key.shadow.camera.top = 8;
    const fill = new THREE.DirectionalLight(PALETTE.violet, 0.6);
    fill.position.set(-6, 4, -4);
    const accent = new THREE.PointLight(PALETTE.teal, 14, 12);
    accent.position.set(0, 4.6, 1.5);
    scene.add(hemisphere, key, fill, accent);

    const model = buildCapitalPlatform();
    scene.add(model);

    const tickers: Tick[] = [];
    model.traverse((object) => {
      if (typeof object.userData.tick === 'function') tickers.push(object.userData.tick);
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      // Dolly out on narrow viewports so the model keeps fitting.
      const distance = 14 * THREE.MathUtils.clamp(1.35 / camera.aspect, 1, 1.9);
      camera.position.copy(cameraDirection).multiplyScalar(distance);
      camera.lookAt(lookAt);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseleave', onMouseLeave);

    let parallax = 0;
    let frameId: number;
    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      const t = reducedMotion ? 0 : now * 0.001;
      for (const tick of tickers) tick(t);
      parallax += (mouseRef.current.x - parallax) * 0.06;
      model.rotation.y = t * 0.12 + parallax * 0.4;
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseleave', onMouseLeave);
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
