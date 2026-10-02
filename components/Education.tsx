"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education & credentials" rail>
      <motion.ul variants={stagger} className="divide-y divide-line border-y border-line">
        {education.map((item) => (
          <motion.li key={item.school} variants={fadeUp} className="grid gap-2 py-7 sm:grid-cols-5 sm:gap-8">
            <p className="font-mono text-sm text-body sm:col-span-2 sm:pt-1">{item.school}</p>
            <div className="sm:col-span-3">
              <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink">{item.award}</h3>
              {item.detail && <p className="mt-2 leading-relaxed">{item.detail}</p>}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
