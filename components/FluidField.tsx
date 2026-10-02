"use client";

import { useEffect, useRef } from "react";

type Dot = { ox: number; oy: number; x: number; y: number; vx: number; vy: number };

const GAP = 26;
const REACH = 170;

/**
 * The hero backdrop: a grid of points that behaves like a liquid surface.
 * A slow swell moves through it on its own, and the pointer pushes the
 * points aside and tints them indigo to cyan. Drawn on one canvas, paused
 * when off screen, and static for visitors who prefer reduced motion.
 */
export function FluidField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let dark = root.classList.contains("dark");
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const offX = (width - (cols - 1) * GAP) / 2;
      const offY = (height - (rows - 1) * GAP) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offX + c * GAP;
          const oy = offY + r * GAP;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);
      const base = dark ? [161, 161, 170] : [113, 113, 122];
      const baseAlpha = dark ? 0.2 : 0.28;

      for (const d of dots) {
        // Slow diagonal swell.
        const swell = Math.sin(d.ox * 0.0065 + d.oy * 0.011 - t * 0.7);
        const crest = Math.max(0, swell);

        // Pointer pushes points away; a spring pulls them home.
        let heat = 0;
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < REACH) {
            const force = (1 - dist / REACH) ** 2;
            d.vx += (dx / dist) * force * 2.2;
            d.vy += (dy / dist) * force * 2.2;
            heat = force;
          }
        }
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy + (reduced ? 0 : swell * 0.12);

        const glow = Math.min(1, crest * 0.55 + heat * 1.4);
        const mix = Math.min(1, d.ox / Math.max(width, 1) + heat * 0.3);
        // indigo #6366f1 -> cyan #06b6d4 across the field
        const r = Math.round(base[0] + (99 + (6 - 99) * mix - base[0]) * glow);
        const g = Math.round(base[1] + (102 + (182 - 102) * mix - base[1]) * glow);
        const b = Math.round(base[2] + (241 + (212 - 241) * mix - base[2]) * glow);
        const alpha = baseAlpha + glow * (dark ? 0.75 : 0.7);
        const radius = 1 + crest * 0.9 + heat * 1.8;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(2400);
      else raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y > -REACH && pointer.y < rect.height + REACH;
      if (reduced) draw(2400);
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const resize = new ResizeObserver(() => {
      build();
      start();
    });
    resize.observe(canvas);

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    seen.observe(canvas);

    const theme = new MutationObserver(() => {
      dark = root.classList.contains("dark");
      if (reduced) draw(2400);
    });
    theme.observe(root, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      seen.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
