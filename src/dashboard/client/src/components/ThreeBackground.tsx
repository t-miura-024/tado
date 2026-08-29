import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CATPPUCCIN_COLORS = [0xcba6f7, 0x89b4fa, 0xf5c2e7, 0x94e2d5, 0xb4befe, 0x74c7ec];

function hexToRgb(hex: number): [number, number, number] {
  return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff].map((v) => v / 255) as [
    number,
    number,
    number,
  ];
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Respect reduced motion: if user prefers, render static fallback without animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    let disposed = false;
    let paused = false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(1);
      renderer.setClearColor(0x1e1e2e, 0);

      const count = 60;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const baseY = new Float32Array(count);
      const baseX = new Float32Array(count);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 140;
        const y = (Math.random() - 0.5) * 90;
        const z = (Math.random() - 0.5) * 20;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        baseX[i] = x;
        baseY[i] = y;
        phases[i] = Math.random() * Math.PI * 2;
        const hex = CATPPUCCIN_COLORS[Math.floor(Math.random() * CATPPUCCIN_COLORS.length)]!;
        const [r, g, b] = hexToRgb(hex);
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.58,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        if (paused || document.hidden) {
          // Skip frame but keep loop alive via timeout check; use rAF anyway but don't update
          animationId = requestAnimationFrame(animate);
          return;
        }
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (!prefersReduced) {
          const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
          for (let i = 0; i < count; i++) {
            const phase = phases[i]!;
            const y = baseY[i]! + Math.sin(t * 0.3 + phase) * 4;
            const x = baseX[i]! + Math.cos(t * 0.22 + phase * 0.7) * 1.8;
            posAttr.setXYZ(i, x, y, positions[i * 3 + 2]!);
          }
          posAttr.needsUpdate = true;
          // subtle opacity pulse uniformly
          material.opacity = 0.48 + Math.sin(t * 0.5) * 0.12;
        }
        renderer!.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (disposed || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const onVisibility = () => {
        if (document.hidden) {
          paused = true;
        } else {
          paused = false;
          // Ensure clock doesn't jump
          clock.getDelta();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        disposed = true;
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        try {
          renderer?.dispose();
        } catch {}
        try {
          geometry.dispose();
        } catch {}
        try {
          material.dispose();
        } catch {}
      };
    } catch {
      setFailed(true);
      if (renderer) {
        try {
          renderer.dispose();
        } catch {}
      }
    }
    return () => {
      disposed = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        try {
          renderer.dispose();
        } catch {}
      }
    };
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
