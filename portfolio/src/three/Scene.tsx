import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* The site's vibrant accents, one per arm */
const ARM_COLORS = ["#6c4cf1", "#f4502a", "#0e9be9", "#65b30e", "#6c4cf1", "#f4502a"];
const ARM_COUNT = ARM_COLORS.length;

/**
 * A 3D asterisk — the designer's mark, the spark of an idea.
 * Anchored in the hero: it tilts toward the cursor, spins as you scroll,
 * and its arms burst outward with scroll velocity. Fades once you move on.
 */
function Spark() {
  const group = useRef<THREE.Group>(null!);
  const armRefs = useRef<(THREE.Group | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  useFrame((state, delta) => {
    const { progress, velocity, mouseX, mouseY } = scrollState;
    const g = group.current;
    const t = state.clock.elapsedTime;

    /* Belongs to the hero: fades as you scroll on, never travels */
    const presence = clamp01(1 - (progress - 0.06) / 0.08);

    /* Tilt toward the cursor + slow idle turn */
    const rx = -mouseY * 0.4 + Math.sin(t * 0.4) * 0.08;
    const ry = 0.25 + mouseX * 0.45 + t * 0.06;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 2, delta);

    /* Scrolling spins the asterisk like a turbine */
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, progress * Math.PI * 6, 2.5, delta);

    const s = (0.86 + presence * 0.14) * (1 + Math.sin(t * 1.2) * 0.015);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 3, delta));

    /* Arms burst outward with scroll velocity, breathe softly at rest */
    const burst = Math.min(0.5, Math.abs(velocity) * 1.2);
    armRefs.current.forEach((arm, i) => {
      if (!arm) return;
      const wave = Math.sin(t * 1.6 + i * 1.1) * 0.035;
      const reach = 0.78 + wave + burst;
      const angle = (i / ARM_COUNT) * Math.PI * 2;
      arm.position.x = Math.cos(angle) * reach;
      arm.position.y = Math.sin(angle) * reach;
    });
    matRefs.current.forEach((mat) => {
      if (mat) mat.opacity = presence;
    });
  });

  return (
    <group ref={group} position={[2.5, 0.1, -1]}>
      {ARM_COLORS.map((color, i) => {
        const angle = (i / ARM_COUNT) * Math.PI * 2;
        return (
          <group
            key={i}
            ref={(el) => {
              armRefs.current[i] = el;
            }}
            position={[Math.cos(angle) * 0.78, Math.sin(angle) * 0.78, 0]}
            rotation={[0, 0, angle - Math.PI / 2]}
          >
            <mesh>
              <capsuleGeometry args={[0.21, 1.05, 12, 24]} />
              <meshStandardMaterial
                ref={(el) => {
                  matRefs.current[i] = el;
                }}
                color={color}
                roughness={0.18}
                metalness={0.15}
                transparent
                opacity={1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    const { mouseX, mouseY } = scrollState;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, mouseX * 0.12, 2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -mouseY * 0.08, 2, delta);
    cam.lookAt(0.6, 0, -1);
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
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} />
        <pointLight position={[-4, -2, 3]} intensity={10} color="#ffffff" />
        <Spark />
        <CameraRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
