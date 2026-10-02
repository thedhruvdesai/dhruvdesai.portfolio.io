# Dhruv Desai — Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion + Lucide. Builds to a fully static site and deploys itself to GitHub Pages on every push.

## How it goes online (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch. GitHub Pages serves that branch.

- Repo named `thedhruvdesai.github.io` → site at `https://thedhruvdesai.github.io/`
- Any other repo name → site at `https://thedhruvdesai.github.io/<repo-name>/`

The workflow works out the right path from the repo name, so there is nothing to configure. If the site does not appear, check **Settings → Pages** and make sure the source is **Deploy from a branch → gh-pages → / (root)**.

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
