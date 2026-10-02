"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      lead="Front-end, iOS and full-stack roles across Australia and India, most recent first."
      rail
    >
      <motion.ol variants={stagger} className="relative border-l border-line">
        {experience.map((job) => (
          <motion.li key={job.company} variants={fadeUp} className="relative pb-12 pl-7 last:pb-0 sm:pl-10">
            <span
              className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 ring-4 ring-canvas"
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-body">
              {job.period}
              <span className="mx-2 text-line" aria-hidden="true">
                /
              </span>
              {job.place}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{job.company}</h3>
            <p className="mt-1 font-medium text-ink">{job.role}</p>
            <ul className="mt-4 space-y-2.5">
              {job.points.map((point) => (
                <li key={point} className="max-w-2xl leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
