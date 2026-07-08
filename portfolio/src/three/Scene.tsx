import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

/* Section accent colors the scene morphs through while scrolling */
const PALETTE = ["#c6f24e", "#7c5cff", "#ff6b4a", "#5cc8ff", "#c6f24e"];

const paletteColors = PALETTE.map((c) => new THREE.Color(c));

function lerpPalette(target: THREE.Color, t: number) {
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * (paletteColors.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  target
    .copy(paletteColors[i])
    .lerp(paletteColors[Math.min(i + 1, paletteColors.length - 1)], f);
}

/** The hero blob — a distorted sphere that morphs, drifts and re-colors with scroll */
function MorphBlob() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<never>(null!);
  const color = useMemo(() => new THREE.Color(PALETTE[0]), []);

  useFrame((_, delta) => {
    const { progress, velocity, mouseX, mouseY } = scrollState;
    const m = mesh.current;

    // Journey across the page: right → left → center, receding into depth
    const px = Math.cos(progress * Math.PI * 2.2) * (2.4 + progress * 1.6);
    const py = Math.sin(progress * Math.PI * 1.6) * 1.6 - progress * 0.4;
    const pz = -1.5 - Math.sin(progress * Math.PI) * 3.5 - progress * 2.5;

    m.position.x = THREE.MathUtils.damp(m.position.x, px + mouseX * 0.35, 3, delta);
    m.position.y = THREE.MathUtils.damp(m.position.y, py + mouseY * 0.25, 3, delta);
    m.position.z = THREE.MathUtils.damp(m.position.z, pz, 3, delta);

    // Tumble faster while the user scrolls
    m.rotation.x += delta * (0.15 + Math.abs(velocity) * 1.4);
    m.rotation.y += delta * (0.2 + Math.abs(velocity) * 2.2);

    // Big in the hero, shrinks into a supporting accent as the story unfolds
    const s = 1.35 - progress * 0.55 + Math.sin(progress * Math.PI * 2) * 0.15;
    m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, s, 3, delta));

    lerpPalette(color, progress);
    const material = mat.current as unknown as {
      color: THREE.Color;
      distort: number;
      emissive?: THREE.Color;
    };
    material.color.lerp(color, 1 - Math.exp(-3 * delta));
    material.distort = Math.min(
      0.62,
      0.32 + Math.abs(velocity) * 0.35 + Math.abs(mouseX) * 0.1
    );
  });

  return (
    <mesh ref={mesh} position={[2.4, 0, -1.5]}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        ref={mat}
        color={PALETTE[0]}
        roughness={0.12}
        metalness={0.35}
        distort={0.32}
        speed={2}
      />
    </mesh>
  );
}

/** Wireframe torus that counter-rotates against scroll */
function OrbitRing() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshBasicMaterial>(null!);
  const color = useMemo(() => new THREE.Color(PALETTE[1]), []);

  useFrame((state, delta) => {
    const { progress, velocity, mouseX } = scrollState;
    const m = mesh.current;
    m.rotation.x = progress * Math.PI * 3 + state.clock.elapsedTime * 0.08;
    m.rotation.y -= delta * (0.1 + Math.abs(velocity) * 1.5);
    m.position.x = THREE.MathUtils.damp(m.position.x, -2.6 + Math.sin(progress * Math.PI * 2) * 3.5 - mouseX * 0.4, 2.5, delta);
    m.position.y = THREE.MathUtils.damp(m.position.y, -0.6 + progress * 2.2, 2.5, delta);
    lerpPalette(color, 1 - progress);
    mat.current.color.lerp(color, 1 - Math.exp(-2.5 * delta));
    mat.current.opacity = 0.5 + Math.abs(velocity) * 0.4;
  });

  return (
    <mesh ref={mesh} position={[-2.6, -0.6, -2.5]}>
      <torusGeometry args={[1.6, 0.015, 16, 120]} />
      <meshBasicMaterial ref={mat} color={PALETTE[1]} transparent opacity={0.5} wireframe />
    </mesh>
  );
}

/** Small floating geometric satellites */
function Satellites() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        pos: [
          Math.sin(i * 2.4) * 4.2,
          Math.cos(i * 1.7) * 2.4,
          -2.5 - (i % 3) * 1.4,
        ] as [number, number, number],
        scale: 0.1 + (i % 3) * 0.07,
        color: PALETTE[i % 4],
        kind: i % 3,
        speed: 0.5 + (i % 4) * 0.35,
      })),
    []
  );

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed * 2} rotationIntensity={2.2} floatIntensity={2.4}>
          <SatelliteMesh {...s} seed={i} />
        </Float>
      ))}
    </>
  );
}

function SatelliteMesh({
  pos,
  scale,
  color,
  kind,
  seed,
}: {
  pos: [number, number, number];
  scale: number;
  color: string;
  kind: number;
  speed: number;
  seed: number;
}) {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const { progress, mouseX, mouseY } = scrollState;
    const g = group.current;
    // Each satellite drifts on its own orbit as the page scrolls
    const angle = progress * Math.PI * 2 * (seed % 2 === 0 ? 1 : -1) + seed;
    const tx = pos[0] + Math.cos(angle) * 1.1 + mouseX * (0.15 + seed * 0.04);
    const ty = pos[1] + Math.sin(angle) * 0.9 + mouseY * (0.1 + seed * 0.03);
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 2, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 2, delta);
    g.position.z = pos[2];
  });

  return (
    <group ref={group} position={pos}>
      <mesh scale={scale}>
        {kind === 0 ? (
          <octahedronGeometry args={[1, 0]} />
        ) : kind === 1 ? (
          <tetrahedronGeometry args={[1, 0]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.55} />
      </mesh>
    </group>
  );
}

/** Star-dust particle field, parallaxed by scroll & mouse */
function Particles({ count = 350 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = -Math.random() * 8 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const { progress, mouseX } = scrollState;
    const p = points.current;
    p.rotation.z = progress * Math.PI * 0.4;
    p.rotation.y = THREE.MathUtils.damp(p.rotation.y, mouseX * 0.08, 2, delta);
    p.position.y = progress * 3;
    const material = p.material as THREE.PointsMaterial;
    material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#f4f3ee" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/** Camera rig — subtle dolly + look-at driven by scroll and cursor */
function CameraRig() {
  useFrame((state, delta) => {
    const { progress, mouseX, mouseY } = scrollState;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, mouseX * 0.3, 2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -mouseY * 0.2, 2, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 5 - Math.sin(progress * Math.PI) * 0.8, 2, delta);
    cam.lookAt(0, 0, -2);
  });
  return null;
}

export default function Scene() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-5, -2, 2]} intensity={18} color="#7c5cff" />
        <pointLight position={[5, 3, 1]} intensity={12} color="#c6f24e" />
        <MorphBlob />
        <OrbitRing />
        <Satellites />
        <Particles />
        <CameraRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
