# ranjbar.dev

Personal site for **Amir Ranjbar** — a bold, dark, motion-led single-page
scroller. Built with Vite + React 18 + TypeScript, Tailwind CSS v4 and Framer
Motion. See [PRD.md](PRD.md) for the full product spec.

## Local development

```bash
nvm use            # Node 20 (see .nvmrc)
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build -> dist/
npm run preview    # serve the production build locally
```

## Portrait photo

The hero references `public/amir.jpg` (a treated duotone portrait). A clearly
labelled placeholder is committed so the build works out of the box. To use the
real photo:

1. Drop the source image in the repo root as `amir.jpg`.
2. Run the optimizer (writes an optimized 4:5 WebP to `public/amir.jpg`):

   ```bash
   python scripts/optimize-portrait.py amir.jpg
   ```

## Things to replace before launch

- **Portrait** — replace the placeholder `public/amir.jpg` (see above).
- **GitHub repo count** — `GITHUB_REPO_COUNT` in `src/lib/site.ts` (currently 56).
- **OG image** — `public/og.png` is an auto-generated typographic placeholder.

## Project structure

```
src/
  components/      one file per section + shared MagneticButton / ScrollProgress
  lib/
    motion.ts      shared Framer Motion variants + reduced-motion sets
    site.ts        links, email, skill groups, repo count (single source)
  index.css        Tailwind v4 + design tokens (@theme)
public/            favicon.svg, og.png, amir.jpg
scripts/           optimize-portrait.py
```

## Deployment — Cloudflare Pages (GitHub Actions)

Deploys run via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

- **Push to `main`** → production deploy.
- **Open a PR against `main`** → unique preview URL.

The workflow installs deps, runs `npm run build` (output `dist/`), ensures the
Pages project exists on first run, then deploys with `wrangler` to the
`ranjbar-dev` Pages project.

### One-time setup

1. **Create a Cloudflare API token** — [dash → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   → *Create Token* → use the **"Edit Cloudflare Workers"** template (or a custom
   token with the **Account › Cloudflare Pages › Edit** permission).
2. **Find your Account ID** — Cloudflare dashboard → *Workers & Pages* (right
   sidebar / URL).
3. **Add repo secrets** — GitHub repo → *Settings → Secrets and variables →
   Actions → New repository secret*:

   | Secret                  | Value                      |
   | ----------------------- | -------------------------- |
   | `CLOUDFLARE_API_TOKEN`  | the API token from step 1  |
   | `CLOUDFLARE_ACCOUNT_ID` | the Account ID from step 2 |

   (`GITHUB_TOKEN` is provided automatically — no setup needed.)
4. Push to `main`. The first run creates the `ranjbar-dev` Pages project and
   deploys it.

> The Pages project name is `ranjbar-dev` (Cloudflare names can't contain dots).
> If you already created a project under a different name, update the two
> `--project-name` / `pages project create` references in the workflow.

### Custom domain

In the Pages project → *Custom domains*, add `ranjbar.dev` (and `www.ranjbar.dev`).
Cloudflare manages DNS and SSL automatically.

> **Note:** if you previously enabled Cloudflare's built-in Git integration for
> this repo, disable it so it doesn't deploy in parallel with this workflow.
