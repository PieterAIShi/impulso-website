"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * "Digitaal team" — a slowly rotating 3D node network rendered on a plain
 * canvas (no WebGL dependency, same technique as the hero). Monochrome
 * connecting lines, terracotta nodes — agents collaborating as one team.
 */
const TERRACOTTA = "#B4442A";

function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    let rafId = 0;
    let angle = 0;
    const mouse = { x: 0, y: 0, active: false };

    const NODE_COUNT = 46;
    const LINK_DIST = 0.62;   // 3D distance threshold for drawing a link
    const FOCAL = 2.6;        // perspective focal length

    // Distribute nodes on a lightly jittered sphere for an even spread.
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.78 + Math.random() * 0.22;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        // A subset of nodes are terracotta; the rest near-black.
        accent: Math.random() < 0.4,
        pulse: Math.random() * Math.PI * 2,
      };
    });

    function resize() {
      if (!canvas || !wrap) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      if (!ctx) return;
      angle += 0.0016; // slow rotation
      const tilt = 0.42 + (mouse.active ? mouse.y * 0.25 : 0);
      const yaw = angle + (mouse.active ? mouse.x * 0.4 : 0);

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.42;

      const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
      const cosX = Math.cos(tilt), sinX = Math.sin(tilt);

      // Project every node to screen space.
      const proj = nodes.map((n) => {
        // rotate around Y
        let x = n.x * cosY + n.z * sinY;
        let z = -n.x * sinY + n.z * cosY;
        let y = n.y;
        // rotate around X
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2; z = z2;
        const scale = FOCAL / (FOCAL - z);
        return {
          sx: cx + x * scale * radius,
          sy: cy + y * scale * radius,
          depth: z,        // -1 (back) .. 1 (front)
          scale,
          accent: n.accent,
          pulse: n.pulse,
        };
      });

      // Links — monochrome, fade with 3D distance and depth.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > LINK_DIST) continue;
          const pa = proj[i], pb = proj[j];
          const closeness = 1 - d / LINK_DIST;
          const depth = (pa.depth + pb.depth) / 2; // -1..1
          const alpha = closeness * 0.28 * (0.45 + (depth + 1) / 2 * 0.55);
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.strokeStyle = `rgba(20,20,20,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Nodes — terracotta accents + near-black, sized/faded by depth.
      const t = angle * 60;
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        const depthN = (p.depth + 1) / 2; // 0 back .. 1 front
        const pulse = 0.85 + Math.sin(t * 0.03 + p.pulse) * 0.15;
        const size = (p.accent ? 3.0 : 2.1) * p.scale * pulse;
        const alpha = 0.35 + depthN * 0.65;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.6, size), 0, Math.PI * 2);
        if (p.accent) {
          ctx.fillStyle = `rgba(180,68,42,${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(17,17,17,${(alpha * 0.85).toFixed(3)})`;
        }
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    resize();
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default function TeamNetwork() {
  const { language } = useLanguage();
  const isNL = language === "nl";

  return (
    <section className="py-24 sm:py-32 bg-background border-t border-foreground/10">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8"
            >
              {isNL ? "Samenwerkende agents" : "Collaborating agents"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6"
            >
              {isNL ? (
                <>Eén team.<br />Altijd in sync.</>
              ) : (
                <>One team.<br />Always in sync.</>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed max-w-md"
            >
              {isNL
                ? "Onze AI-agents delegeren, overleggen en voeren samen uit — als één goed geolied digitaal team."
                : "Our AI agents delegate, confer and execute together — like one well-oiled digital team."}
            </motion.p>
          </div>

          {/* 3D node network */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <NodeNetwork />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
