import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/syne";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { hero, site } from "@/lib/data";

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url.endsWith("/") ? site.url : `${site.url}/`) } : {}),
  title,
  description: hero.sub,
  authors: [{ name: site.name }],
  keywords: [
    "Dhruv Desai",
    "Full-Stack Software Engineer",
    "Front-End Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX Designer",
    "Gold Coast",
    "Australia",
  ],
  openGraph: {
    title,
    description: hero.sub,
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: { card: "summary", title, description: hero.sub },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Runs before first paint so the saved theme never flashes. Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t?t==="dark":true)}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Gold Coast", addressRegion: "QLD", addressCountry: "AU" },
  sameAs: [site.linkedin, site.behance, site.github],
  ...(site.url ? { url: site.url } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
