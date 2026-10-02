// All site content lives in this file. Edit here; the components just render it.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "Dhruv Desai",
  initials: "DD.",
  role: "Full-Stack Software Engineer & Creative UI/UX Designer",
  location: "Gold Coast, QLD, Australia",
  availability: "Available for roles in Australia / remote",
  workRights: "485 Graduate Visa, full Australian work rights",
  email: "dhruv.desai1706@gmail.com",
  phoneDisplay: "+61 432 781 706",
  phoneHref: "tel:+61432781706",
  linkedin: "https://linkedin.com/in/dhruvdesai1706",
  behance: "https://www.behance.net/dhruv-desai",
  github: "https://github.com/thedhruvdesai",
  resumeHref: `${basePath}/Dhruv_Desai_Resume.pdf`,
  hasResume: process.env.NEXT_PUBLIC_HAS_RESUME === "1",
  // Optional: paste a Formspree (or similar) endpoint in NEXT_PUBLIC_FORM_ENDPOINT
  // to have the contact form post directly. Without it the form opens the
  // visitor's email app with the message filled in.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
} as const;

export const hero = {
  badge: "Full-Stack Engineer & Interaction Designer | Based in Australia",
  headline:
    "Engineering fluid digital experiences at the intersection of design, code, and intelligence.",
  sub: "5+ years building scalable full-stack web & mobile applications, AI-integrated workflows, and high-performance design systems across Australia and India.",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProjectLink = { label: string; href: string; kind: "live" | "behance" | "github" };

export type Project = {
  slug: "traverse" | "tracker" | "matter" | "assurelife";
  name: string;
  kind: string;
  discipline: string;
  role?: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  highlights: string[];
  links: ProjectLink[];
  /** Behance project id, shown as an embedded case study in the drawer. */
  behanceId?: number;
  /** Optional screenshot. Without one the card shows its drawn preview. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "traverse",
    name: "Traverse",
    kind: "Travel planning and collaborative itinerary platform",
    discipline: "UX/UI and mobile engineering",
    summary:
      "A trip planner where a group builds one itinerary together. Researched and designed in Figma and FigJam, tested with three user cohorts, then engineered in SwiftUI.",
    stack: ["SwiftUI", "Figma", "FigJam", "Adobe XD", "User testing"],
    metrics: [
      { value: "40%", label: "approx. less trip-planning overhead than manual methods" },
      { value: "20+", label: "responsive screens engineered" },
      { value: "3", label: "user testing cohorts" },
    ],
    highlights: [
      "Cut trip-planning overhead by about 40% against manual methods, through iterative user testing across 3 cohorts.",
      "Engineered 20+ responsive screens applying Google UX principles.",
      "Built real-time collaboration and smart routing logic into the itinerary flow.",
    ],
    links: [
      {
        label: "View on Behance",
        href: "https://www.behance.net/gallery/171831609/Traverse-Plan-Your-Next-Trip",
        kind: "behance",
      },
    ],
    behanceId: 171831609,
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/cec5e6171831609.Y3JvcCwxOTIwLDE1MDEsMCww.png",
  },
  {
    slug: "tracker",
    name: "Invitation Rounds Tracker",
    kind: "Live AI-assisted data visualiser for Australian skilled migration",
    discipline: "Claude AI / LLM project",
    summary:
      "An interactive view of Australian visa invitation rounds, built and optimised with Claude AI. It gives skilled migration candidates a transparent, filterable read of each round.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Claude AI"],
    metrics: [
      { value: "Live", label: "deployed and running on Netlify" },
      { value: "Per round", label: "point threshold analysis" },
      { value: "Claude AI", label: "prompt pipelines used to build and optimise" },
    ],
    highlights: [
      "Rapidly architected and deployed an interactive migration invitation data visualiser using Claude AI prompt pipelines.",
      "Instant filtering and round-by-round point threshold analysis.",
      "Transparent data representation for skilled migration candidates.",
    ],
    links: [
      { label: "Open live site", href: "https://au-invitation-rounds.netlify.app/", kind: "live" },
    ],
  },
  {
    slug: "matter",
    name: "Matter",
    kind: "Electric mobility and next-gen tech platform",
    discipline: "Front-end engineering and UI system",
    role: "Web Developer & UI/UX Designer at Ways Software",
    summary:
      "Responsive web interfaces for an electric mobility brand, built at Ways Software. The work was translating a detailed Figma system into fast, reusable front-end components.",
    stack: ["React", "JavaScript", "SCSS / Tailwind", "RESTful microservices"],
    metrics: [
      { value: "Sub-second", label: "load times" },
      { value: "Mobile-first", label: "reusable component architecture" },
      { value: "Figma to code", label: "design tokens carried into components" },
    ],
    highlights: [
      "Collaborated on responsive web interfaces representing high-tech electric mobility.",
      "Bridged complex Figma design tokens into clean, performant, mobile-first code with a reusable component architecture.",
      "Kept transitions smooth and load times under a second.",
    ],
    links: [{ label: "Open matter.in", href: "https://matter.in/", kind: "live" }],
  },
  {
    slug: "assurelife",
    name: "AssureLife",
    kind: "Responsive insurance web application",
    discipline: "Front-end engineering",
    summary:
      "A mobile-first insurance web platform built on plain HTML, CSS and JavaScript, with accessibility and performance treated as requirements from the first commit.",
    stack: ["HTML5", "CSS3", "JavaScript", "REST APIs", "WCAG accessibility"],
    metrics: [
      { value: "95+", label: "Lighthouse for performance, accessibility and SEO" },
      { value: "6", label: "section production layout" },
      { value: "Mobile-first", label: "built from the smallest screen up" },
    ],
    highlights: [
      "Achieved 95+ Google Lighthouse scores across Performance, Accessibility and SEO.",
      "Delivered a clean 6-section production layout, built mobile-first.",
    ],
    links: [],
  },
];

export type BehanceProject = { id: number; title: string; slug: string; cover: string };

const cdn = "https://mir-s3-cdn-cf.behance.net/projects/404/";

export const behanceProjects: BehanceProject[] = [
  { id: 171831609, title: "Traverse: Plan Your Next Trip", slug: "Traverse-Plan-Your-Next-Trip", cover: `${cdn}cec5e6171831609.Y3JvcCwxOTIwLDE1MDEsMCww.png` },
  { id: 144348235, title: "Weather App", slug: "Weather-App", cover: `${cdn}b500b4144348235.Y3JvcCwxOTIwLDE1MDEsMCwxNDc.png` },
  { id: 121391669, title: "letsBOOKit", slug: "letsBOOKit", cover: `${cdn}fba633121391669.Y3JvcCwxMzA5LDEwMjQsNTEsMA.png` },
  { id: 120856489, title: "Treebo: Hotel Booking App", slug: "Treebo-Hotel-Booking-App", cover: `${cdn}166385120856489.Y3JvcCwxNTI3LDExOTUsMCww.png` },
  { id: 121182335, title: "Trippy App", slug: "Trippy-App", cover: `${cdn}0339d2121182335.Y3JvcCwxMzA5LDEwMjQsMCww.png` },
  { id: 120608139, title: "Food Delivery Mobile App", slug: "Food-Delivery-Mobile-App", cover: `${cdn}bdde67120608139.Y3JvcCwxNDQwLDExMjYsMCwxMDM.png` },
  { id: 116475013, title: "Travel App", slug: "Travel-App", cover: `${cdn}782136116475013.Y3JvcCwxNjQwLDEyODMsMTQyLDA.png` },
  { id: 116032945, title: "SoundWave Landing Page", slug: "SoundWave-Landing-Page", cover: `${cdn}64fc23116032945.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png` },
];

export const behanceUrl = (p: Pick<BehanceProject, "id" | "slug">) =>
  `https://www.behance.net/gallery/${p.id}/${p.slug}`;
export const behanceEmbed = (id: number) =>
  `https://www.behance.net/embed/project/${id}?ilo0=1`;

export const experience = [
  {
    company: "Chatstat",
    role: "Front-End Engineer",
    period: "Mar 2025 – Jul 2026",
    place: "Gold Coast, remote",
    points: [
      "Rebuilt the React and TypeScript frontend with OAuth2 and type-safe APIs, cutting defect rates by about 25%.",
      "Automated CI/CD delivery with Docker, n8n and GitHub Actions, cutting release overhead by about 30%.",
      "Contributor to the team named a Telstra Business Awards 2025 State Finalist.",
    ],
  },
  {
    company: "Digital Sauce",
    role: "Software Engineer (iOS & UX)",
    period: "Oct 2024 – Mar 2025",
    place: "Melbourne, remote",
    points: [
      "Led end-to-end UX engineering for Hydration Hero in SwiftUI, reaching a 4.7-star App Store rating across 18+ releases.",
      "Shipped the Apple Watch companion app, dark mode, Apple Health sync and widgets.",
    ],
  },
  {
    company: "V4 Services Group",
    role: "Desktop Support Technician",
    period: "Sep 2023 – Oct 2024",
    place: "Australia",
    points: ["Maintained SLA ticket resolutions through Zendesk."],
  },
  {
    company: "Ways Software",
    role: "Web Developer",
    period: "Dec 2021 – Aug 2023",
    place: "Rajkot, India",
    points: [
      "Engineered 10+ scalable product modules, including Matter.in platform interfaces, across retail and fintech using React, Node.js and Laravel.",
      "Optimised PostgreSQL and MySQL queries to cut backend latency by over 20%.",
    ],
  },
] as const;

export const stack = [
  {
    title: "Frontend & interaction",
    note: "Where most of my time goes",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Framer Motion", "Tailwind CSS", "SwiftUI", "Three.js", "WCAG 2.1 AAA"],
  },
  {
    title: "Backend & systems",
    note: "APIs, auth and data",
    items: ["Node.js", "Laravel (PHP)", "REST APIs", "OAuth2", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "AI & DevOps",
    note: "Automation and delivery",
    items: ["Claude API", "LLM engineering", "n8n automations", "Docker", "GitHub Actions", "AWS", "GCP"],
  },
  {
    title: "Product & design",
    note: "From wireframe to system",
    items: ["Figma", "FigJam", "System design", "Prototyping", "Wireframing", "Google UX methodologies"],
  },
] as const;

export const education = [
  {
    school: "Kaplan Business School",
    award: "Master of Information Technology (Web & Mobile Engineering)",
    detail: "Top 10% of cohort. GPA 6.3 / 7.0, with High Distinctions in Mobile Development and the Capstone.",
  },
  {
    school: "Performance Education",
    award: "Professional Year Program (Information Technology)",
    detail: "",
  },
  {
    school: "MEFGI",
    award: "Bachelor of Information Technology (Honours)",
    detail: "GPA 6.4 / 7.0.",
  },
] as const;
