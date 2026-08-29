import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { catppuccinNumber } from "@/lib/catppuccin";

const PARTICLE_COLORS = [
  catppuccinNumber.mauve,
  catppuccinNumber.blue,
  catppuccinNumber.pink,
  catppuccinNumber.teal,
  catppuccinNumber.lavender,
  catppuccinNumber.sapphire,
];

function hexToRgb(hex: number): [number, number, number] {
  return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff].map((v) => v / 255) as [
    number,
    number,
    number,
  ];
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const pausedRef = useRef(false);
  const count = 60;

  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

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
      const hex = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!;
      const [r, g, b] = hexToRgb(hex);
      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    return { positions: pos, colors: col, phases: ph, baseY: by, baseX: bx };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    if (pausedRef.current || document.hidden) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
 * R3F + drei 装飾背景 — M2最小実装
 * - 60 Points / BufferGeometry で軽量化
 * - catppuccin.ts で色一元化
 * - prefers-reduced-motion / visibilitychange で省電力
 * - WebGL失敗時はCSSグラデーションフォールバック
 */
export default function R3FBackground() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // 同期的にWebGL非対応を検出したらフォールバック
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setFailed(true);
    } catch {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust"
        aria-hidden="true"
      />
    );
  }

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
          try {
            gl.setClearColor(catppuccinNumber.base, 0);
          } catch {
            setFailed(true);
          }
        }}
        fallback={
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust" />
        }
      >
        <ParticleField />
      </Canvas>
      {/* CSSグラデーションフォールバック — Canvasが透明または失敗時に表示 */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust"
        style={{ zIndex: -2 }}
      />
    </div>
  );
}
