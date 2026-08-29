import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const CATPPUCCIN_COLORS = [0xcba6f7, 0x89b4fa, 0xf5c2e7, 0x94e2d5, 0xb4befe, 0x74c7ec];

function hexToRgb(hex: number): [number, number, number] {
  return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff].map((v) => v / 255) as [
    number,
    number,
    number,
  ];
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 60;

  const { positions, colors, phases, baseY, baseX } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const by = new Float32Array(count);
    const bx = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      bx[i] = x;
      by[i] = y;
      ph[i] = Math.random() * Math.PI * 2;
      const hex = CATPPUCCIN_COLORS[Math.floor(Math.random() * CATPPUCCIN_COLORS.length)]!;
      const [r, g, b] = hexToRgb(hex);
      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    return { positions: pos, colors: col, phases: ph, baseY: by, baseX: bx };
  }, []);

  // Animate via useFrame — respects prefers-reduced-motion externally
  useFrame((state) => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.hidden) return;
    const t = state.clock.getElapsedTime();
    const posAttr = (ref.current.geometry as THREE.BufferGeometry).getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const phase = phases[i]!;
      const y = baseY[i]! + Math.sin(t * 0.3 + phase) * 0.4;
      const x = baseX[i]! + Math.cos(t * 0.22 + phase * 0.7) * 0.18;
      posAttr.setXYZ(i, x, y, positions[i * 3 + 2]!);
    }
    posAttr.needsUpdate = true;
  });

  // Build geometry with colors
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors.slice(), 3));
    return geo;
  }, [positions, colors]);

  return (
    <Points ref={ref} geometry={geometry}>
      <PointMaterial
        transparent
        vertexColors
        size={0.14}
        sizeAttenuation
        depthWrite={false}
        opacity={0.62}
      />
    </Points>
  );
}

/**
 * R3F + drei background — declarative alternative to raw ThreeBackground.
 * Uses @react-three/fiber Canvas and @react-three/drei Points.
 * Falls back to CSS gradient if WebGL unavailable (handled by Canvas onCreated error).
 */
export default function R3FBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
        style={{ width: "100%", height: "100%", display: "block" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x1e1e2e, 0);
        }}
        fallback={
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust" />
        }
      >
        <ParticleField />
      </Canvas>
      {/* CSS gradient fallback underneath Canvas — visible if Canvas fails or is transparent */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust"
        style={{ zIndex: -2 }}
      />
    </div>
  );
}
