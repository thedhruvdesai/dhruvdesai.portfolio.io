import { existsSync } from "node:fs";

// On GitHub Pages a project site lives at /<repo-name>. The deploy workflow
// passes that in as PAGES_BASE_PATH; locally it is empty.
const basePath = process.env.PAGES_BASE_PATH || "";

// The resume buttons only render when the PDF is actually in /public,
// so the site never ships a broken download link.
const hasResume = existsSync(new URL("./public/Dhruv_Desai_Resume.pdf", import.meta.url));
if (!hasResume) {
  console.warn(
    "\n[portfolio] public/Dhruv_Desai_Resume.pdf not found — the Download resume buttons are hidden until you add it.\n"
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_HAS_RESUME: hasResume ? "1" : "",
  },
};

export default nextConfig;
