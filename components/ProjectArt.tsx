"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

/**
 * Card previews. A project with an `image` shows that image; otherwise it
 * gets a small drawing of what the project is about. To use a real
 * screenshot, drop the file in /public/projects and set `image` in lib/data.ts.
 */

const frame = "absolute inset-0 size-full";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="480" y2="300">
        <stop offset="0" stopColor="#6366f1" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  );
}

function TrackerArt() {
  const bars = [46, 62, 54, 78, 70, 92, 84, 66, 104, 88, 120, 96, 132, 112, 148, 126];
  return (
    <svg viewBox="0 0 480 300" className={frame} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Defs id="tracker-g" />
      {[90, 150, 210].map((y) => (
        <line key={y} x1="40" x2="440" y1={y} y2={y} className="stroke-line" strokeWidth="1" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 24.5}
          y={250 - h}
          width="14"
          height={h}
          rx="4"
          fill={i >= 10 ? "url(#tracker-g)" : "currentColor"}
          className={i >= 10 ? "" : "text-ink/15"}
        />
      ))}
      <line x1="40" x2="440" y1="128" y2="128" stroke="url(#tracker-g)" strokeWidth="1.5" strokeDasharray="5 6" />
      <line x1="40" x2="440" y1="250" y2="250" className="stroke-ink/30" strokeWidth="1" />
    </svg>
  );
}

function MatterArt() {
  return (
    <svg viewBox="0 0 480 300" className={frame} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Defs id="matter-g" />
      {[60, 110, 160, 210, 260, 310].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="300"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? "url(#matter-g)" : "currentColor"}
          strokeWidth={i % 2 === 0 ? 2 : 1}
          className={i % 2 === 0 ? "" : "text-ink/15"}
          strokeDasharray={i === 2 ? "2 10" : undefined}
          strokeLinecap="round"
        />
      ))}
      <path d="M40 232 H250" stroke="url(#matter-g)" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 252 H180" className="stroke-ink/25" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 272 H120" className="stroke-ink/15" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function AssureLifeArt() {
  const gauges = ["Performance", "Accessibility", "SEO"];
  const circumference = 2 * Math.PI * 44;
  return (
    <svg viewBox="0 0 480 300" className={frame} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Defs id="assure-g" />
      {gauges.map((label, i) => {
        const cx = 100 + i * 140;
        return (
          <g key={label}>
            <circle cx={cx} cy="132" r="44" fill="none" className="stroke-ink/12" strokeWidth="7" />
            <circle
              cx={cx}
              cy="132"
              r="44"
              fill="none"
              stroke="url(#assure-g)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.95} ${circumference}`}
              transform={`rotate(-90 ${cx} 132)`}
            />
            <text x={cx} y="141" textAnchor="middle" className="fill-ink font-display text-[26px] font-bold">
              95+
            </text>
            <text x={cx} y="212" textAnchor="middle" className="fill-body font-mono text-[12px]">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TraverseArt() {
  return (
    <svg viewBox="0 0 480 300" className={frame} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Defs id="traverse-g" />
      <path
        d="M60 230 C 130 120, 190 260, 250 160 S 370 60, 420 110"
        fill="none"
        stroke="url(#traverse-g)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 11"
      />
      {[
        [60, 230],
        [250, 160],
        [420, 110],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" className="fill-canvas stroke-ink/25" strokeWidth="1" />
          <circle cx={x} cy={y} r="6" fill="url(#traverse-g)" />
        </g>
      ))}
    </svg>
  );
}

const drawings: Record<Project["slug"], () => React.JSX.Element> = {
  traverse: TraverseArt,
  tracker: TrackerArt,
  matter: MatterArt,
  assurelife: AssureLifeArt,
};

export function ProjectArt({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const Drawing = drawings[project.slug];

  if (project.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`${project.name} preview`}
        width={808}
        height={632}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }
  return <Drawing />;
}
