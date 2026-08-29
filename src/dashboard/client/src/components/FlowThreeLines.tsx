import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { catppuccinNumber } from "@/lib/catppuccin";

const CATPPUCCIN_LINE_COLORS = [
  catppuccinNumber.mauve,
  catppuccinNumber.blue,
  catppuccinNumber.teal,
];

interface FlowThreeLinesProps {
  /** number of arrow gaps; used to space glowing dots */
  count?: number;
}

/**
 * Decorative Three.js overlay for flow diagram gaps.
 * Renders a narrow vertical canvas with glowing dots and faint curved lines between nodes.
 * Purely decorative — DOM flow arrows remain visible when this fails.
 */
export default function FlowThreeLines({ count = 6 }: FlowThreeLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    let disposed = false;
    let paused = false;

    try {
      const width = canvas.clientWidth || 32;
      const height = canvas.clientHeight || 240;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / Math.max(height, 1), 0.1, 100);
      camera.position.set(0, 0, 30);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Create vertical faint lines (Tube-like via Line)
      const lines: THREE.Line[] = [];
      const dots: THREE.Mesh[] = [];
      const dotGeo = new THREE.SphereGeometry(0.9, 8, 8);

      const segments = Math.max(2, Math.min(count, 20));
      // Normalize to scene coords: map canvas height to ~40 units
      const sceneHeight = 40;
      const step = sceneHeight / segments;

      for (let i = 0; i < segments; i++) {
        const yTop = sceneHeight / 2 - i * step - step * 0.2;
        const yBottom = yTop - step * 0.6;

        // Curved line between nodes
        const points: THREE.Vector3[] = [];
        const steps = 16;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const y = THREE.MathUtils.lerp(yTop, yBottom, t);
          // slight S-curve in x
          const x = Math.sin(t * Math.PI) * 1.2;
          points.push(new THREE.Vector3(x, y, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const color = CATPPUCCIN_LINE_COLORS[i % CATPPUCCIN_LINE_COLORS.length]!;
        const mat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.42,
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        lines.push(line);

        // Glowing dot in the middle of the gap
        const dotColor = CATPPUCCIN_LINE_COLORS[(i + 1) % CATPPUCCIN_LINE_COLORS.length]!;
        const dotMat = new THREE.MeshBasicMaterial({
          color: dotColor,
          transparent: true,
          opacity: 0.78,
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(0, (yTop + yBottom) / 2, 0.5);
        (dot as unknown as { _phase: number })._phase = Math.random() * Math.PI * 2;
        scene.add(dot);
        dots.push(dot);
      }

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        if (paused || document.hidden) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        animationId = requestAnimationFrame(animate);
        if (!prefersReduced) {
          const t = clock.getElapsedTime();
          for (let i = 0; i < dots.length; i++) {
            const d = dots[i]!;
            const phase = (d as unknown as { _phase: number })._phase;
            const mat = d.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.55 + Math.sin(t * 1.1 + phase) * 0.28;
            d.scale.setScalar(0.95 + Math.sin(t * 0.9 + phase) * 0.18);
          }
          for (let i = 0; i < lines.length; i++) {
            const l = lines[i]!;
            const mat = l.material as THREE.LineBasicMaterial;
            mat.opacity = 0.28 + Math.sin(t * 0.6 + i) * 0.14;
          }
        }
        renderer!.render(scene, camera);
      };
      animate();

      const onVisibility = () => {
        if (document.hidden) paused = true;
        else {
          paused = false;
          clock.getDelta();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      const ro = new ResizeObserver(() => {
        if (disposed || !renderer || !canvas) return;
        const w = canvas.clientWidth || 32;
        const h = canvas.clientHeight || 240;
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      ro.observe(canvas);

      return () => {
        disposed = true;
        cancelAnimationFrame(animationId);
        document.removeEventListener("visibilitychange", onVisibility);
        ro.disconnect();
        try {
          renderer?.dispose();
        } catch {}
        for (const l of lines) {
          try {
            l.geometry.dispose();
            (l.material as THREE.Material).dispose();
          } catch {}
        }
        for (const d of dots) {
          try {
            (d.material as THREE.Material).dispose();
          } catch {}
        }
        try {
          dotGeo.dispose();
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
  }, [count]);

  if (failed) return null;

  // Canvas is absolute inside a relative wrapper. Height matches parent flow list.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "32px",
        height: "100%",
        pointerEvents: "none",
        display: "block",
        opacity: 0.95,
      }}
    />
  );
}
