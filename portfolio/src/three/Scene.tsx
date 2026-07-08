import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * A single glossy blob living in the hero. It follows the cursor,
 * distorts with scroll velocity, and dives away once you leave the hero —
 * no other floating elements, so the content stays in focus.
 */
function HeroBlob() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<never>(null!);

  useFrame((state, delta) => {
    const { progress, velocity, mouseX, mouseY } = scrollState;
    const m = mesh.current;
    const material = mat.current as unknown as {
      distort: number;
      opacity: number;
    };

    // Visible only during the hero; dives down and fades as you scroll on
    const presence = clamp01(1 - (progress - 0.05) / 0.09);
    material.opacity = THREE.MathUtils.damp(material.opacity, presence, 6, delta);

    const tx = 2.35 + mouseX * 0.45;
    const ty = 0.1 - progress * 6 + mouseY * 0.35;
    m.position.x = THREE.MathUtils.damp(m.position.x, tx, 3, delta);
    m.position.y = THREE.MathUtils.damp(m.position.y, ty, 3, delta);

    m.rotation.x += delta * (0.12 + Math.abs(velocity) * 0.8);
    m.rotation.y += delta * (0.18 + Math.abs(velocity) * 1.2);

    const s = 1.5 * (0.7 + presence * 0.3);
    m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, s, 3, delta));

    material.distort = Math.min(
      0.55,
      0.3 + Math.abs(velocity) * 0.3 + Math.abs(mouseX) * 0.12
    );

    // Idle breathing so it never feels static
    m.position.z = -1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <mesh ref={mesh} position={[2.35, 0.1, -1.2]}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        ref={mat}
        color="#6c4cf1"
        roughness={0.16}
        metalness={0.25}
        distort={0.3}
        speed={1.8}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    const { mouseX, mouseY } = scrollState;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, mouseX * 0.18, 2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -mouseY * 0.12, 2, delta);
    cam.lookAt(0.6, 0, -1.2);
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
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} />
        <pointLight position={[-4, -2, 2]} intensity={14} color="#f4502a" />
        <HeroBlob />
        <CameraRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
