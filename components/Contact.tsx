"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, Mail, Phone, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { site } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";
import { BehanceIcon, GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Magnetic } from "./Magnetic";

type Fields = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "opened" | "failed";

const empty: Fields = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Partial<Fields> {
  const errors: Partial<Fields> = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter an email address like name@company.com.";
  if (values.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

function CopyChip({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the value is still visible to select */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-12 max-w-full items-center gap-3 rounded-full border border-line bg-surface pl-4 pr-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
    >
      {icon}
      <span className="truncate">{value}</span>
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/10" aria-hidden="true">
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : `Copy ${label}`}
      </span>
    </button>
  );
}

function Field({
  label,
  error,
  children,
  id,
}: {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-2 text-sm font-medium text-red-700 dark:text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const input =
  "block w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-body transition-colors focus:border-ink/50 aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400";

function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (errors[key]) setErrors(validate(next));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    if (!site.formEndpoint) {
      // No form backend configured: hand the message to the visitor's email app.
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("opened");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const notice: Record<Exclude<Status, "idle" | "sending">, string> = {
    sent: "Message sent. I'll reply to the email address you gave.",
    opened: "Your email app should now be open with the message ready to send.",
    failed: `The message didn't send. Email ${site.email} directly instead.`,
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id={`${uid}-name`} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={input}
          />
        </Field>
        <Field label="Email" id={`${uid}-email`} error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={input}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" id={`${uid}-message`} error={errors.message}>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            placeholder="The role, the team, and when you'd like to talk."
            className={`${input} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} disabled:opacity-60`}>
          <Send className="size-4" aria-hidden="true" />
          {status === "sending" ? "Sending message" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="min-h-5 flex-1 basis-56 text-sm font-medium text-ink">
          {status !== "idle" && status !== "sending" ? notice[status] : ""}
        </p>
      </div>
    </form>
  );
}

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
  { label: "Behance", href: site.behance, Icon: BehanceIcon },
  { label: "GitHub", href: site.github, Icon: GitHubIcon },
];

export function Contact() {
  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="border-t border-line py-20 sm:py-28"
    >
      <div className={container}>
        <motion.h2
          id="contact-title"
          variants={fadeUp}
          className="max-w-4xl text-balance font-display text-[clamp(2.25rem,5.6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink"
        >
          Let&rsquo;s build something remarkable together.
        </motion.h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed">
              Open to full-stack and front-end roles in Australia or remote. {site.workRights}.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <CopyChip label="email address" value={site.email} icon={<Mail className="size-4 shrink-0" aria-hidden="true" />} />
              <CopyChip label="phone number" value={site.phoneDisplay} icon={<Phone className="size-4 shrink-0" aria-hidden="true" />} />
            </div>

            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer me"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
                  >
                    <Icon className="size-4" />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            {site.hasResume && (
              <div className="mt-8">
                <Magnetic>
                  <a href={site.resumeHref} download className={btnSecondary}>
                    <Download className="size-4" aria-hidden="true" />
                    Download resume
                  </a>
                </Magnetic>
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-7">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
