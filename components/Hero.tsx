"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { hero, site } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";
import { FluidField } from "./FluidField";
import { Magnetic } from "./Magnetic";

const facts = [
  { term: "Based in", detail: site.location },
  { term: "Work rights", detail: site.workRights },
  { term: "Status", detail: site.availability },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <FluidField className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(115%_95%_at_82%_24%,black_22%,transparent_76%)]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`${container} pb-16 pt-36 sm:pt-44 lg:pb-20`}
      >
        <motion.p
          variants={fadeUp}
          className="inline-flex max-w-full rounded-2xl border border-line bg-canvas/60 px-4 py-2 font-mono text-xs text-body backdrop-blur"
        >
          {hero.badge}
        </motion.p>

        <motion.h1
          id="hero-title"
          variants={fadeUp}
          className="mt-7 max-w-5xl text-balance font-display text-[clamp(2.35rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          {hero.headline}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl">
          {hero.sub}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#work" className={btnPrimary}>
              Explore selected works
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </Magnetic>
          {site.hasResume && (
            <Magnetic>
              <a href={site.resumeHref} download className={btnSecondary}>
                <Download className="size-4" aria-hidden="true" />
                Download resume
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <a href="#contact" className={btnSecondary}>
              <Mail className="size-4" aria-hidden="true" />
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          className="mt-16 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-3 lg:mt-24"
        >
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="font-mono text-xs text-body">{fact.term}</dt>
              <dd className="mt-1.5 text-sm font-medium text-ink sm:text-base">{fact.detail}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
