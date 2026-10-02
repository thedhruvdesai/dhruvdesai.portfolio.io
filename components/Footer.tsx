import { site } from "@/lib/data";
import { container } from "@/lib/ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className={`${container} flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed &amp; Engineered with Next.js &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
