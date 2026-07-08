import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Violet system, back (lightest) → front (deepest) */
const LAYER_COLORS = ["#ddd6fc", "#b3a5f8", "#8d76f4", "#6c4cf1", "#4f30c9"];

/**
 * "Every screen a scene" — a stack of app screens (design layers).
 * It stays anchored in place: it tilts toward the cursor and the layers
 * fan apart as you start scrolling, like an exploded view in a design tool.
 */
function ScreenStack() {
  const group = useRef<THREE.Group>(null!);
  const layerRefs = useRef<(THREE.Group | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  useFrame((state, delta) => {
    const { progress, velocity, mouseX, mouseY } = scrollState;
    const g = group.current;
    const t = state.clock.elapsedTime;

    /* Belongs to the hero: fades as you move on, but never travels */
    const presence = clamp01(1 - (progress - 0.06) / 0.08);
    /* Layers fan apart during the first stretch of scrolling */
    const fan = clamp01(progress / 0.09);

    const rx = 0.34 - mouseY * 0.22 + Math.sin(t * 0.6) * 0.035;
    const ry = -0.68 + mouseX * 0.3 + Math.cos(t * 0.45) * 0.035;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 3, delta);

    const s = 0.82 + presence * 0.08;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 3, delta));

    const n = LAYER_COLORS.length;
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const centered = i - (n - 1) / 2;
      /* Visibly cascaded even at rest, exploding further as you scroll */
      const spread = 0.42 + fan * 0.5 + Math.abs(velocity) * 0.3;
      const stagger = 0.3 + fan * 0.2;
      layer.position.z = THREE.MathUtils.damp(layer.position.z, centered * spread, 4, delta);
      layer.position.y = THREE.MathUtils.damp(layer.position.y, centered * stagger * 0.75, 4, delta);
      layer.position.x = THREE.MathUtils.damp(layer.position.x, centered * stagger, 4, delta);
      layer.rotation.z = THREE.MathUtils.damp(
        layer.rotation.z,
        centered * (0.02 + fan * 0.06),
        4,
        delta
      );
    });
    matRefs.current.forEach((mat) => {
      if (mat) mat.opacity = presence;
    });
  });

  return (
    <group ref={group} position={[2.05, -0.05, -1]} rotation={[0.34, -0.68, 0]}>
      {LAYER_COLORS.map((color, i) => (
        <group
          key={color}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
        >
          <RoundedBox args={[2.35, 1.55, 0.07]} radius={0.09} smoothness={6}>
            <meshStandardMaterial
              ref={(el) => {
                matRefs.current[i] = el;
              }}
              color={color}
              roughness={0.38}
              metalness={0.08}
              transparent
              opacity={1}
            />
          </RoundedBox>
        </group>
      ))}
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
        <pointLight position={[-4, -2, 3]} intensity={10} color="#9a86f6" />
        <ScreenStack />
        <CameraRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
