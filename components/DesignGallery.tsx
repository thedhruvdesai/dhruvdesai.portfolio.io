"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { behanceEmbed, behanceProjects, behanceUrl, site, type BehanceProject } from "@/lib/data";
import { fade, fadeUp, pop, spring, stagger } from "@/lib/motion";
import { btnSecondary } from "@/lib/ui";
import { useDialog } from "@/lib/useDialog";
import { BehanceIcon } from "./BrandIcons";
import { Section } from "./Section";

function Cover({ project }: { project: BehanceProject }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-indigo-500/25 to-cyan-500/25 text-ink">
        <BehanceIcon className="size-10 opacity-70" />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.cover}
      alt=""
      width={404}
      height={316}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

function Viewer({ project, onClose }: { project: BehanceProject; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(onClose);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-8">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        exit="hidden"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="behance-viewer-title"
        variants={pop}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative flex h-full max-h-[900px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-line bg-canvas"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <h3 id="behance-viewer-title" className="truncate font-display text-lg font-bold text-ink">
            {project.title}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={behanceUrl(project)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-xs font-semibold text-ink transition-colors hover:bg-surface"
            >
              <BehanceIcon className="size-4" />
              <span className="hidden sm:inline">Open on Behance</span>
              <span className="sr-only sm:hidden">Open on Behance</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe
          src={behanceEmbed(project.id)}
          title={`${project.title} on Behance`}
          allowFullScreen
          className="block w-full flex-1 bg-surface"
        />
      </motion.div>
    </div>
  );
}

export function DesignGallery() {
  const [openId, setOpenId] = useState<number | null>(null);
  const open = behanceProjects.find((project) => project.id === openId);

  return (
    <Section
      id="case-studies"
      title="Design case studies"
      lead="Product and interface design from my Behance. Each one opens here, in full, without leaving the page."
    >
      <motion.ul variants={stagger} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {behanceProjects.map((project) => (
          <motion.li key={project.id} variants={fadeUp} whileHover={{ y: -4 }} transition={spring}>
            <button
              type="button"
              onClick={() => setOpenId(project.id)}
              aria-haspopup="dialog"
              className="group block w-full rounded-2xl text-left"
            >
              <span className="relative block aspect-[404/316] overflow-hidden rounded-2xl border border-line bg-surface">
                <Cover project={project} />
              </span>
              <span className="mt-3 block text-sm font-semibold text-ink sm:text-base">{project.title}</span>
              <span className="sr-only">: open the project</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={fadeUp} className="mt-10">
        <a href={site.behance} target="_blank" rel="noreferrer" className={btnSecondary}>
          <BehanceIcon className="size-4" />
          See everything on Behance
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </motion.div>

      <AnimatePresence>
        {open && <Viewer key={open.id} project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>
  );
}
