"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { behanceEmbed, projects, type Project, type ProjectLink } from "@/lib/data";
import { fade, fadeUp, sheet, spring, stagger } from "@/lib/motion";
import { btnPrimary, chip } from "@/lib/ui";
import { useDialog } from "@/lib/useDialog";
import { BehanceIcon, GitHubIcon } from "./BrandIcons";
import { ProjectArt } from "./ProjectArt";
import { Section } from "./Section";

function LinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  if (kind === "behance") return <BehanceIcon className="size-4" />;
  if (kind === "github") return <GitHubIcon className="size-4" />;
  return <ArrowUpRight className="size-4" aria-hidden="true" />;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={spring}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-ink/25"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
        <ProjectArt project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-mono text-xs text-body">{project.discipline}</p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:rounded-3xl"
          >
            {project.name}
            <span className="sr-only">: read the case study</span>
          </button>
        </h3>
        <p className="mt-2 leading-relaxed">{project.kind}</p>

        <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-line pt-5">
          {project.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-xl font-bold text-ink sm:text-2xl">{metric.value}</span>
                <span className="mt-1 block text-sm leading-snug">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((tag) => (
            <li key={tag} className={chip}>
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink" aria-hidden="true">
            Read case study
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <div className="relative z-10 flex items-center gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-canvas px-3.5 text-xs font-semibold text-ink transition-colors hover:bg-surface"
              >
                <LinkIcon kind={link.kind} />
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(onClose);
  const titleId = `case-${project.slug}`;

  return (
    <div className="fixed inset-0 z-[70]">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        exit="hidden"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        variants={sheet}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col overflow-y-auto overscroll-contain border-l border-line bg-canvas"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-canvas/85 px-5 py-3 backdrop-blur sm:px-10">
          <p className="font-mono text-xs text-body">Case study</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="px-5 pb-16 pt-8 sm:px-10">
          <motion.p variants={fadeUp} className="font-mono text-xs text-body">
            {project.discipline}
          </motion.p>
          <motion.h3
            id={titleId}
            variants={fadeUp}
            className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl"
          >
            {project.name}
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-lg text-ink">
            {project.kind}
          </motion.p>
          {project.role && (
            <motion.p variants={fadeUp} className="mt-2">
              Role: {project.role}
            </motion.p>
          )}
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed">
            {project.summary}
          </motion.p>

          <motion.dl variants={fadeUp} className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-surface p-5">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-ink">{metric.value}</span>
                  <span className="mt-1.5 block text-sm leading-snug">{metric.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="mt-10">
            <h4 className="font-display text-xl font-bold text-ink">What I delivered</h4>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h4 className="font-display text-xl font-bold text-ink">Stack</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <li key={tag} className={chip}>
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>

          {project.links.length > 0 && (
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={btnPrimary}>
                  <LinkIcon kind={link.kind} />
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </motion.div>
          )}

          {project.behanceId && (
            <motion.div variants={fadeUp} className="mt-12">
              <h4 className="font-display text-xl font-bold text-ink">Full design walkthrough</h4>
              <p className="mt-2">The complete project, straight from Behance.</p>
              <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
                <iframe
                  src={behanceEmbed(project.behanceId)}
                  title={`${project.name} on Behance`}
                  loading="lazy"
                  allowFullScreen
                  className="block h-[70dvh] min-h-[420px] w-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Work() {
  const [openSlug, setOpenSlug] = useState<Project["slug"] | null>(null);
  const open = projects.find((project) => project.slug === openSlug);

  return (
    <Section
      id="work"
      title="Selected work"
      lead="Four projects across product design, front-end engineering and AI-assisted builds. Open any card for the full case study."
    >
      <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={() => setOpenSlug(project.slug)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {open && <CaseStudy key={open.slug} project={open} onClose={() => setOpenSlug(null)} />}
      </AnimatePresence>
    </Section>
  );
}
