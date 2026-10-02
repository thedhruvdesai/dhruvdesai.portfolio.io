"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { PointerEvent } from "react";
import { stack } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { Section } from "./Section";

type Group = (typeof stack)[number];

/** A card whose border lights up under the cursor. */
function StackCard({ group }: { group: Group }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(99 102 241 / 0.55), rgb(6 182 212 / 0.25) 45%, transparent 72%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      variants={fadeUp}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className="group relative rounded-3xl bg-line p-px"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-surface p-6 sm:p-7">
        <h3 className="font-display text-xl font-bold tracking-tight text-ink">{group.title}</h3>
        <p className="mt-1 text-sm">{group.note}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-canvas px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink/40"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Stack" lead="The tools I reach for, grouped by the job they do." rail>
      <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
        {stack.map((group) => (
          <StackCard key={group.title} group={group} />
        ))}
      </motion.div>
    </Section>
  );
}
