import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { catppuccinNumber } from "@/lib/catppuccin";
import type { CanvasEdge, CanvasNode } from "@/lib/logic";

const NODE_W = 180;
const NODE_H = 72;

const EDGE_COLORS = [
  catppuccinNumber.mauve,
  catppuccinNumber.blue,
  catppuccinNumber.teal,
  catppuccinNumber.pink,
];

export default function CanvasThreeEdges({
  nodes,
  edges,
  width,
  height,
  currentKey,
}: {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  width: number;
  height: number;
  currentKey?: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (nodes.length === 0 || edges.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    let disposed = false;
    let paused = false;

    try {
      const scene = new THREE.Scene();
      // Use orthographic for pixel-perfect matching to DOM coordinates
      const frustumH = height;
      const frustumW = width;
      const camera = new THREE.OrthographicCamera(
        -frustumW / 2,
        frustumW / 2,
        frustumH / 2,
        -frustumH / 2,
        0.1,
        100,
      );
      camera.position.set(width / 2, height / 2, 10);
      camera.lookAt(width / 2, height / 2, 0);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const nodeMap = new Map<string, CanvasNode>();
      for (const n of nodes) nodeMap.set(n.key, n);

      const lines: THREE.Line[] = [];
      const dots: THREE.Mesh[] = [];
      const dotGeo = new THREE.SphereGeometry(3.2, 8, 8);

      for (let ei = 0; ei < edges.length; ei++) {
        const e = edges[ei]!;
        const from = nodeMap.get(e.from);
        const to = nodeMap.get(e.to);
        if (!from || !to) continue;
        const x1 = from.x + NODE_W;
        const y1 = from.y + NODE_H / 2;
        const x2 = to.x;
        const y2 = to.y + NODE_H / 2;
        const midX = (x1 + x2) / 2;
        // Bezier-ish curve: control point slightly offset in x to make horizontal S-curve
        const points: THREE.Vector3[] = [];
        const segs = 12;
        for (let s = 0; s <= segs; s++) {
          const t = s / segs;
          // cubic bezier horizontal
          const x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * midX + t ** 2 * x2;
          // slight y arch
          const y = (1 - t) * y1 + t * y2 + Math.sin(t * Math.PI) * 2;
          points.push(new THREE.Vector3(x, y, from.phaseIndex * 0.1));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const col = EDGE_COLORS[ei % EDGE_COLORS.length]!;
        const mat = new THREE.LineBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.55,
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        lines.push(line);

        // dot at midpoint
        const dotMat = new THREE.MeshBasicMaterial({
          color: EDGE_COLORS[(ei + 1) % EDGE_COLORS.length]!,
          transparent: true,
          opacity: 0.7,
        });
        const dot = new THREE.Mesh(dotGeo.clone(), dotMat);
        dot.position.set(midX, (y1 + y2) / 2, 0.6);
        (dot as unknown as { _ph: number })._ph = Math.random() * Math.PI * 2;
        scene.add(dot);
        dots.push(dot);
      }

      // current position glow particle near current node
      let currentGlow: THREE.Mesh | null = null;
      if (currentKey) {
        const cur = nodeMap.get(currentKey);
        if (cur) {
          const glowGeo = new THREE.SphereGeometry(9, 12, 12);
          const glowMat = new THREE.MeshBasicMaterial({
            color: catppuccinNumber.yellow,
            transparent: true,
            opacity: 0.32,
          });
          currentGlow = new THREE.Mesh(glowGeo, glowMat);
          currentGlow.position.set(cur.x + NODE_W / 2, cur.y + NODE_H / 2, 1);
          scene.add(currentGlow);
        }
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
            const ph = (d as unknown as { _ph: number })._ph;
            const m = d.material as THREE.MeshBasicMaterial;
            m.opacity = 0.5 + Math.sin(t * 1.2 + ph) * 0.25;
            d.scale.setScalar(0.9 + Math.sin(t * 0.9 + ph) * 0.18);
          }
          for (let i = 0; i < lines.length; i++) {
            const l = lines[i]!;
            const m = l.material as THREE.LineBasicMaterial;
            m.opacity = 0.35 + Math.sin(t * 0.7 + i) * 0.12;
          }
          if (currentGlow) {
            const s = 1 + Math.sin(t * 2) * 0.15;
            currentGlow.scale.setScalar(s);
            const m = currentGlow.material as THREE.MeshBasicMaterial;
            m.opacity = 0.26 + Math.sin(t * 1.6) * 0.08;
          }
        }
        renderer!.render(scene, camera);
      };
      animate();

      const onVisibility = () => {
        paused = document.hidden;
        if (!paused) clock.getDelta();
      };
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        disposed = true;
        cancelAnimationFrame(animationId);
        document.removeEventListener("visibilitychange", onVisibility);
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
            d.geometry.dispose();
            (d.material as THREE.Material).dispose();
          } catch {}
        }
        if (currentGlow) {
          try {
            currentGlow.geometry.dispose();
            (currentGlow.material as THREE.Material).dispose();
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
  }, [nodes, edges, width, height, currentKey]);

  if (failed) return null;
  if (nodes.length === 0 || edges.length === 0) return null;
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
