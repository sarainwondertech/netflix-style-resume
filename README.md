# Netflix Resume

A Next.js template that tells a career as a Netflix show. Each chapter becomes a "show" with cover art, episodes, a trailer, and a photo gallery — rendered as carousels on a Netflix-style homepage.

## Features

- Looping hero trailer, horizontal carousels, show detail modal
- Data-driven — edit three files and the whole site changes
- Per-show cover, header, and photo gallery
- Framer Motion hover + modal transitions
- Responsive phone → 4K, with LAN dev support for mobile testing
- Image optimization via `next/image` (WebP/AVIF, per-device sizing)

## Tech stack

Next.js 16 · React 19 · Tailwind v4 · Framer Motion · TypeScript

## Quick start

```bash
git clone https://github.com/sarainwondertech/netflix-style-resume.git
cd netflix-style-resume
npm install

# Copy example data (gitignored, so your content stays local)
cp data/profile.example.ts data/profile.ts
cp data/shows.example.ts   data/shows.ts
cp data/rows.example.ts    data/rows.ts

# Optional: enable phone testing on same wifi
cp .env.example .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing your resume

### `data/profile.ts` — who you are

Hero section and site metadata. Full contract in `types/profile.ts`:

| Field | Notes |
|---|---|
| `name`, `tagline`, `genres` | Hero title, subtitle, skill tags |
| `siteTitle`, `siteDescription` | SEO + social cards |
| `trailerUrl`, `trailerUrlLandscape` | Background hero video (portrait for phones, landscape for desktop) |

### `data/shows.ts` — your career chapters

Each "show" is one chapter. Full type in `types/resume.ts`:

- `id` — kebab-case; also the folder name under `public/photos/`
- `title`, `subtitle`, `movieInspiration`, `synopsis`
- `episodes` — key moments, e.g. `[{ number: "E1", title: "The Leap" }]`
- `timePeriod`, `locations[]`, `genreTags[]`
- `accentColor` + `gradient` — the show's visual identity
- `coverImage`, `headerImage`, `photos[]`

### `data/rows.ts` — how chapters are grouped

Each row is one carousel: a `title`, an optional `badge`, and a list of `showIds` matching IDs in `shows.ts`.

### Photos

One folder per show `id` under `public/photos/`:

```
public/photos/your-show-id/
  cover.jpg       → coverImage
  header.jpg      → headerImage
  photo-01.jpg    → photos array
```

`public/photos/` is gitignored (except `.gitkeep`), so personal photos never get committed. Square-ish works for cards; landscape for modal headers.

## Deploy

### Vercel (recommended)

1. Push your fork to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy — zero config

Populate `data/*.ts` and photos first, or the build will fail.

### Self-host

```bash
npm run build
npm run start
```

## Project structure

```
app/              Next.js App Router pages + layout
components/       Hero, Carousel, ShowCard, DetailModal, TrailerModal, Navbar
hooks/            Shared React hooks
types/            Profile, Show, Episode, CarouselRow contracts
data/             (gitignored) Your personal content
  *.example.ts    Templates — copy these to get started
public/photos/    (gitignored except .gitkeep) Your photos, per show id
```

## Environment variables

| Variable | Purpose |
|---|---|
| `DEV_LAN_ORIGIN` | Optional. Your laptop's LAN IP (e.g. `192.168.1.42`) in `.env.local` to allow HMR from a phone on the same wifi. Find it with `ipconfig getifaddr en0` on macOS. |

## License

MIT — see [LICENSE](./LICENSE). Fork freely, make it yours.

## Disclaimer

This template is inspired by the visual design language of streaming platforms. It is not affiliated with, endorsed by, or sponsored by Netflix, Inc. "Netflix" is a registered trademark of Netflix, Inc., used here descriptively to indicate the aesthetic style the template is inspired by.
