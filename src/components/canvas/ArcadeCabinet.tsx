import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group, MeshStandardMaterial } from "three";

/**
 * ArcadeCabinet — stylized low-poly arcade machine from primitives.
 *
 * The cabinet is now a "monitor": it faces the viewer head-on and does NOT
 * rotate freely. The interactive menu lives as an HTML overlay (in Hero.tsx)
 * positioned over the screen area — that keeps it accessible and reliably
 * clickable, which raycasting tiny 3D text cannot guarantee.
 *
 * The 3D screen here is just a dark, softly-glowing panel that sits behind the
 * HTML menu. The marquee shows the name (baked as geometry isn't needed; the
 * HTML overlay shows readable text). We keep the body, controls, and glow for
 * the physical arcade look, plus a gentle marquee pulse for life.
 */
export default function ArcadeCabinet() {
  const marquee = useRef<MeshStandardMaterial>(null);
  const group = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (marquee.current) {
      marquee.current.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.25;
    }
    // Tiny breathing float only (no rotation — camera/cabinet stay fixed).
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.04;
    }
  });

  return (
    <group ref={group}>
      {/* Cabinet body */}
      <RoundedBox args={[2.2, 3.6, 1.4]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#15151f" metalness={0.4} roughness={0.5} />
      </RoundedBox>

      {/* Side neon strips */}
      {[-1.12, 1.12].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.05, 3.4, 1.36]} />
          <meshStandardMaterial
            color="#ff3cac"
            emissive="#ff3cac"
            emissiveIntensity={2.0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Marquee header (glow only; readable text is in HTML overlay) */}
      <mesh position={[0, 1.55, 0.71]}>
        <planeGeometry args={[1.95, 0.5]} />
        <meshStandardMaterial
          ref={marquee}
          color="#2de2e6"
          emissive="#2de2e6"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Screen panel (HTML menu overlays this) */}
      <mesh position={[0, 0.55, 0.71]}>
        <planeGeometry args={[1.85, 1.45]} />
        <meshStandardMaterial
          color="#04040a"
          emissive="#0a2a33"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
      {/* Screen border glow */}
      <mesh position={[0, 0.55, 0.7]}>
        <planeGeometry args={[1.95, 1.55]} />
        <meshStandardMaterial
          color="#2de2e6"
          emissive="#2de2e6"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Control panel */}
      <group position={[0, -1.0, 0.78]} rotation={[-0.5, 0, 0]}>
        <RoundedBox args={[2.0, 0.7, 0.1]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#1c1c2a" metalness={0.3} roughness={0.6} />
        </RoundedBox>

        {/* Joystick */}
        <mesh position={[-0.55, 0, 0.08]}>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#0a0a0f" />
        </mesh>
        <mesh position={[-0.55, 0.12, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.55, 0.24, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ff3cac"
            emissive="#ff3cac"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>

        {/* Buttons */}
        {[
          { x: 0.1, c: "#2de2e6" },
          { x: 0.4, c: "#ffb627" },
          { x: 0.7, c: "#ff3cac" },
        ].map(({ x, c }) => (
          <mesh key={x} position={[x, 0.02, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 20]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Base */}
      <mesh position={[0, -1.95, 0]}>
        <boxGeometry args={[2.25, 0.2, 1.45]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
    </group>
  );
}
