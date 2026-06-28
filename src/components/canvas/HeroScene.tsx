import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type { Group } from "three";
import ArcadeCabinet from "./ArcadeCabinet";

/**
 * HeroScene — fixed-camera arcade monitor.
 *
 * No OrbitControls, no autorotate. The camera faces the cabinet head-on; the
 * cabinet only does a subtle mouse-follow tilt so it feels alive but stays put
 * (and never swings across the screen). The clickable menu is an HTML overlay
 * in Hero.tsx, positioned over the screen — this scene is purely visual.
 *
 * Lazy-loaded by Hero.tsx to keep Three.js out of the initial bundle.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.2], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 4]} intensity={35} color="#2de2e6" />
      <pointLight position={[-3, 2, 3]} intensity={28} color="#ff3cac" />
      <pointLight position={[0, -2, 4]} intensity={12} color="#ffb627" />

      <TiltGroup>
        <ArcadeCabinet />
      </TiltGroup>

      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}

/**
 * TiltGroup — gently tilts its children toward the mouse pointer.
 * Uses the normalized pointer from R3F state and lerps for smoothness.
 */
function TiltGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    // Map pointer (-1..1) to a small rotation range.
    const targetY = pointer.x * 0.25;
    const targetX = -pointer.y * 0.12;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.06;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.06;
  });

  return <group ref={ref}>{children}</group>;
}
