# Dhruv Desai — Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion + Lucide. Builds to a fully static site and deploys itself to GitHub Pages on every push.

## Put it online (GitHub Pages)

1. Create a new **public** repository on GitHub. Name it either
   - `thedhruvdesai.github.io` → site lives at `https://thedhruvdesai.github.io/`, or
   - anything else, e.g. `portfolio` → site lives at `https://thedhruvdesai.github.io/portfolio/`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/thedhruvdesai/<repo-name>.git
   git push -u origin main
   ```
4. Open the **Actions** tab. When "Deploy to GitHub Pages" goes green (about a minute), the site is live.

The workflow in `.github/workflows/deploy.yml` works out the right URL path for either repo name, so there is nothing to configure.

## Before you publish

- **Resume:** save your PDF as `public/Dhruv_Desai_Resume.pdf`. The "Download resume" buttons (navbar, hero, contact) appear automatically once the file is there, and stay hidden while it is missing.
- **Screenshots (optional):** put images in `public/projects/` and set `image` on the project in `lib/data.ts`. Projects without an image show a drawn preview.

## Edit the content

Everything on the page (name, links, projects, experience, stack, education, Behance projects) is in **`lib/data.ts`**. Components only render it.

To add a Behance project, add an entry to `behanceProjects` with its id (the number in the Behance URL), title, slug and cover image URL.

## Contact form

By default, submitting the form opens the visitor's email app with their message addressed to you. To have messages delivered without that step, create a free form endpoint (for example Formspree), then add it in the repo under **Settings → Secrets and variables → Actions → Variables** as `FORM_ENDPOINT` and re-run the deploy.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Where things are

```
app/            layout, page, global styles, favicon
components/     Navbar, Hero, FluidField (hero canvas), Work, DesignGallery,
                Experience, Stack, Education, Contact, Footer
lib/data.ts     all content
lib/motion.ts   typed Framer Motion variants
```
