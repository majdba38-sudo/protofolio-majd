# THE IDEA LAB — Majd Faisal Portfolio

A bilingual (English / Arabic, RTL) creative portfolio built with React, Vite, Tailwind CSS, GSAP + ScrollTrigger and Framer Motion.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # local development at http://localhost:5173
npm run build    # type-check and production build into dist/
npm run preview  # preview the production build
```

## Where to edit content

All content lives in `src/content/`. Components never contain project text, so you can update the site without touching the layout code.

| File | What it controls |
| --- | --- |
| `site.ts` | Brand name, tagline, page title, **contact email**, **contact form endpoint** |
| `creator.ts` | Profile name, title, intro paragraphs, strengths |
| `projects.ts` | The 9 brand identity and poster projects (name, category, description, creative direction, design details, mockup scenes) |
| `digital.ts` | Digital projects (name, category, description, **live URL**, **status**, preview image, highlights) |
| `process.ts` | The 5 process steps and the 7 services |
| `ui.ts` | Interface text in English and Arabic (menus, buttons, labels) |

Every text field is bilingual: `{ en: '...', ar: '...' }`. Arabic text in `creator.ts`, `projects.ts`, `digital.ts`, `process.ts` and `ui.ts` was written as a translation of the English copy. Please review it before publishing.

### Add a project

1. Put the original file in `public/media/experiments/` (JPG, PNG or WebP). Keep the original file unchanged.
2. Add an entry to `experiments` in `src/content/projects.ts`. Use a unique `id` and point `image` at the file.
3. The project appears in the gallery automatically.

### Add a digital project

Add an entry to `digitalProjects` in `src/content/digital.ts`.

- `url`: the exact live link. Leave it empty if the project has no public URL yet. The site will show COMING SOON.
- `status`: `'live'` shows VISIT WEBSITE (opens in a new tab). `'coming-soon'` shows a disabled button.
- `preview`: a screenshot path in `public/media/digital/`. Leave it empty to show a labelled placeholder.

### Contact details

Set `contact.email` in `src/content/site.ts`. The form works in one of two ways:

- **Form endpoint (recommended).** Set `contact.formEndpoint` to a service that accepts JSON POST requests, for example Formspree (`https://formspree.io/f/your-id`). Submissions are sent there and the visitor sees a confirmation.
- **Email fallback.** If no endpoint is set but `email` is, the form opens the visitor's mail app with the inquiry filled in.

If neither is set, the form shows a message saying it is not connected yet. It does not pretend to send.

## Uploading images (logos, posters, mockups, previews)

Every image slot in the site has an **Upload / Replace** button: the creator portrait, each project's original design, its mockup slots, the extra image slots, and digital project previews.

- **On the local dev server (`npm run dev`)**, uploads are saved permanently:
  - the file goes to `public/uploads/...`
  - the mapping is recorded in `public/media-manifest.json`
- **On a deployed build**, the upload stays as a preview for the current visit only. To make a file permanent, put it in `public/uploads/` yourself and add the path to `public/media-manifest.json`, using the slot key as the key (for example `"experiments/mishkat/mockup/quran-covers": "/uploads/mishkat/cover.jpg"`). Then redeploy.

Upload keys used by the site:

- `creator/portrait`
- `experiments/<project-id>/original`
- `experiments/<project-id>/mockup/<scene-id>`
- `experiments/<project-id>/extra-1` and `extra-2`
- `digital/<project-id>/preview`

Accepted types are PNG, JPG, WebP, AVIF and GIF, up to 20 MB.

## Logo and mockup rules

- Original logos and posters are displayed exactly as uploaded, with no redrawing, recolouring, cropping or filters. They use `object-contain`, so the full composition is always visible.
- Mockups are presented as conceptual visuals. Each mockup section carries the note *"not real client-approved applications"*.
- **AI mockup generation is not included.** Generating mockups needs a server-side API key, and image models tend to redraw Arabic letterforms, which breaks the logo-preservation rules. Mockups are added through the upload slots instead. Each slot's title names the environment to create (for example *Quran covers* or *Classroom signs*).

## Structure

```
src/
  content/        editable project and site data (start here)
  components/     page sections and reusable pieces
  lib/            language (EN/AR), media uploads, zoom viewer, GSAP and tilt helpers
  index.css       palette, glass surfaces, motion
cms/uploadPlugin.ts   dev-only upload endpoint used by the upload buttons
public/media/         original logos, posters and previews
public/uploads/       files uploaded through the dev server
```

## Accessibility and performance

- Reduced motion: when the visitor's system asks for reduced motion, scroll and transform animations are removed and the particle field is static.
- Keyboard: all controls are buttons or links with visible focus states. The modal closes with Escape, and a skip link is included.
- Images are lazy-loaded with explicit alt text.
- The particle field pauses when the hero is off-screen.

## Deployment notes

- `npm run build` creates a static site in `dist/`. Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
- The page is a client-rendered app. Titles, descriptions and structured data are in `index.html` and `site.ts`. For stronger search-engine results later, consider pre-rendering or moving to Next.js.
- Once the final design is ready, add an Open Graph image (`og:image`) in `index.html` and your canonical URL.
