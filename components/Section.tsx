"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion";
import { container } from "@/lib/ui";

/**
 * Page section with its heading. `rail` puts the heading in a sticky left
 * column on wide screens; otherwise the heading sits above full-width content.
 */
export function Section({
  id,
  title,
  lead,
  rail = false,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  rail?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="border-t border-line py-20 sm:py-28"
    >
      <div className={`${container} ${rail ? "grid gap-10 lg:grid-cols-12 lg:gap-12" : ""}`}>
        <motion.header
          variants={fadeUp}
          className={rail ? "lg:sticky lg:top-28 lg:col-span-4 lg:self-start" : "max-w-3xl"}
        >
          <h2
            id={`${id}-title`}
            className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl"
          >
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">{lead}</p>}
        </motion.header>
        <div className={rail ? "lg:col-span-8" : "mt-12"}>{children}</div>
      </div>
    </motion.section>
  );
}
