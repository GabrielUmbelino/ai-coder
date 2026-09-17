# Gabriel Umbelino — Personal Site

A dark, editorial portfolio site. Enterprise structure (strict grid, hairline
rules, monospace metadata) with an edgy accent (acid-lime signal colour, giant
display type, serif italic counterpoints).

## Run it

```bash
npm install     # first time only
npm run dev     # http://localhost:3000
```

The Digital Twin chat works immediately with no setup (offline mode). To turn on
the real model, see **Digital Twin** below.

Production:

```bash
npm run build
npm start
```

## Structure

| Path | What it is |
| --- | --- |
| `src/lib/data.ts` | **All content lives here** — bio, jobs, skills, projects, links |
| `src/app/globals.css` | Design tokens + component classes (`.card`, `.btn`, `.eyebrow`, reveal utilities) |
| `src/app/layout.tsx` | Fonts (Inter / JetBrains Mono / Instrument Serif), metadata, grain overlay |
| `src/components/Hero.tsx` | Landing: staggered type reveal, cursor spotlight, drifting glows |
| `src/components/About.tsx` | Bio, at-a-glance panel, stats, education, certifications |
| `src/components/Journey.tsx` | Career timeline with scroll-linked rail and active-node tracking |
| `src/components/Capabilities.tsx` | Skill matrix + positioning cards |
| `src/components/Work.tsx` | Portfolio placeholders, ready for real case studies |
| `src/components/TwinSection.tsx` | Digital Twin pitch + entry points |
| `src/components/DigitalTwin.tsx` | The chat panel itself (launcher, stream, composer) |
| `src/app/api/chat/route.ts` | Streaming chat endpoint |
| `src/lib/twin.ts` | System prompt, provider config, offline responder |
| `src/components/Contact.tsx` | CTA + contact channels |
| `public/gabriel-umbelino-cv.pdf` | Résumé served at `/gabriel-umbelino-cv.pdf` |

## Editing content

Everything user-facing is in `src/lib/data.ts`. Add a job to `jobs[]` and the
timeline picks it up. Add an entry to `projects[]` and the Work grid grows.

To turn a portfolio placeholder into a real case study, give the project a
`href` and wrap the card in a link — the hover states are already built.

## Digital Twin

An AI that answers questions about the career on Gabriel's behalf. Open it from
the **Ask AI** section, the floating launcher, or by pressing `/` anywhere.

**Two modes.**

- **Offline (default, zero config).** No API key set → answers come from a
  deterministic keyword responder in `src/lib/twin.ts`, built from the same
  `data.ts` facts. Real answers, just not generative. The feature is never
  broken, it only gets better with a key.
- **Live.** With a key set, questions go to a hosted LLM with a system prompt
  that grounds it strictly in `data.ts` and tells it to decline anything it
  doesn't know. Responses stream back word by word. If the provider errors or
  rate-limits, it silently falls back to offline mode rather than failing.

**Turning on the live model.** Copy `.env.example` to `.env.local` and add a key:

```bash
cp .env.example .env.local
```

```bash
AI_PROVIDER=google       # google | groq | openrouter | openai
AI_API_KEY=...
```

**Google Gemini is the default** and has the most capable genuinely-free API
tier — get a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
Groq and OpenRouter also have free tiers and work by changing one env var.
Any OpenAI-compatible endpoint works via `AI_BASE_URL`.

Restart `npm run dev` after editing `.env.local`. Check the `X-Twin-Mode`
response header on `/api/chat` (`live` / `offline` / `offline-fallback`) to
confirm which mode is active.

**Safety rails already in place:** the API key stays server-side, requests are
rate-limited per IP (25 per 10 minutes, in-memory), history is capped at 12
messages and 1200 characters each, and the system prompt refuses instructions
that try to override it.

**Editing what it knows.** The twin reads from `src/lib/data.ts` — add a job
there and it can talk about it. Tune tone and rules in `SYSTEM_PROMPT`, and the
offline answers in the `CANNED` array, both in `src/lib/twin.ts`.

## Design tokens

Defined in `@theme` at the top of `src/app/globals.css`:

- `--color-ink` `#08090b` — page ground
- `--color-line` `#1c2028` — hairlines
- `--color-text` / `--color-muted` / `--color-dim` — type hierarchy
- `--color-accent` `#d7ff3e` — the single signal colour; used sparingly on
  purpose. Change it here and it propagates everywhere.

## Notes

- Motion is CSS-only (IntersectionObserver + transitions) — no animation
  library, and everything collapses gracefully under
  `prefers-reduced-motion: reduce`.
- Fully responsive: 390px → 2560px, with a full-screen mobile nav.
- Structured data (schema.org `Person`) is emitted from `src/app/page.tsx`.
  Before deploying, swap `http://localhost:3000` there and in
  `layout.tsx`'s `metadataBase` for the real domain.
