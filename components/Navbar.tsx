"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { ease, fadeUp, overlayLinks } from "@/lib/motion";
import { useDialog } from "@/lib/useDialog";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

function StatusDot() {
  return (
    <span className="relative flex size-2.5" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-3 rounded-lg" title={site.availability}>
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">{site.initials}</span>
      <StatusDot />
      <span className="hidden font-mono text-xs text-body xl:inline">{site.availability}</span>
      <span className="sr-only xl:hidden">{site.availability}</span>
    </a>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(onClose);
  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)" }}
      animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.75rem) 2.5rem)" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease }}
      className="fixed inset-0 z-[60] flex flex-col bg-canvas px-5 pb-8 pt-3 md:hidden"
    >
      <div className="flex h-14 items-center justify-between pl-4 pr-2">
        <span className="font-display text-xl font-extrabold tracking-tight text-ink">{site.initials}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-10 place-items-center rounded-full border border-line text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <motion.ul variants={overlayLinks} initial="hidden" animate="show" className="mt-8 flex flex-1 flex-col gap-1 px-4">
        {nav.map((item) => (
          <motion.li key={item.href} variants={fadeUp}>
            <a
              href={item.href}
              onClick={onClose}
              className="block border-b border-line py-4 font-display text-4xl font-bold tracking-tight text-ink"
            >
              {item.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <div className="flex flex-col gap-4 px-4">
        <p className="flex items-center gap-3 font-mono text-xs text-body">
          <StatusDot />
          {site.availability}
        </p>
        {site.hasResume && (
          <a
            href={site.resumeHref}
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-canvas"
          >
            <Download className="size-4" aria-hidden="true" />
            Download resume
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Highlight the link for whichever section is crossing the middle of the screen.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    // Back in the hero, no link is current.
    const top = document.getElementById("top");
    const atTop = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive("");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    if (top) atTop.observe(top);
    return () => {
      observer.disconnect();
      atTop.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-line bg-canvas/70 pl-4 pr-2 backdrop-blur-xl"
        >
          <Brand />

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const current = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      current ? "text-ink" : "text-body hover:text-ink"
                    }`}
                  >
                    {current && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-ink/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {site.hasResume && (
              <Magnetic className="hidden sm:inline-flex">
                <a
                  href={site.resumeHref}
                  download
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-canvas transition-opacity hover:opacity-85"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download resume
                </a>
              </Magnetic>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line text-ink md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
