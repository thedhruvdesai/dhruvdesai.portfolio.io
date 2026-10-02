# Dhruv Desai — Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion + Lucide. Builds to a fully static site and deploys itself to GitHub Pages on every push.

## How it goes online (GitHub Pages)

The site lives at **https://dhruvdesai.com.au**.

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch. GitHub Pages serves that branch.

The custom domain is set by `public/CNAME`. The domain's DNS (at VentraIP) points at GitHub Pages with A records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. To go back to the plain `github.io` address, delete `public/CNAME`.

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
