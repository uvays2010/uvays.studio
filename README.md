# UVAYS STUDIO — Motion Edition

Premium React + Vite developer portfolio with a Supabase-backed project CMS and password-only Admin API.

## Included

- Five main navigation areas: Home, Projects, Technologies, About, Contact
- UZ / RU / EN language switch and dark / light theme
- Supabase-powered published project list, project detail pages, search, category filter and sorting
- Password-only Admin Panel backed by the `admin-api` Supabase Edge Function
- Project create / edit / delete, multilingual descriptions, featured flag, status, tags and image upload
- Contact form writes to the Supabase `messages` table
- Motion layer: animated page transitions, scroll progress indicator, ambient gradient orbs, orbiting hero artwork, floating chips, 3D project-card hover, image sheen, animated technology cards, and admin micro-interactions
- `prefers-reduced-motion` support

## Requirements

- Node.js 20.19+ recommended
- npm
- Existing Supabase project

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

## Environment

The included `.env` is configured with this project's Supabase URL and publishable key. If you need to recreate it, copy `.env.example` to `.env` and set:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

A publishable/anon key is intended for browser use. Never put a Supabase `service_role` key or the Admin password in a `VITE_` variable.

## Supabase setup

The project uses a password-only Edge Function. The admin password is checked on the server, not in browser JavaScript.

If the database has not yet been initialized, run `supabase/schema.sql` once in Supabase Dashboard → SQL Editor. The Edge Function uses the project's built-in `SUPABASE_SERVICE_ROLE_KEY` server secret.

The deployed Edge Function is named `admin-api`. To deploy updates from this folder:

```powershell
npx supabase login
npx supabase link --project-ref htelftmepcdeiybjsfdo
npx supabase secrets set ADMIN_PASSWORD=YOUR_CHOSEN_ADMIN_PASSWORD
npx supabase functions deploy admin-api --no-verify-jwt
```

The current project already deployed this function and set the `ADMIN_PASSWORD` secret. Do not redeploy just to use the animation update; the frontend changes do not alter the Edge Function.

## Build

```powershell
npm run build
npm run preview
```

## Important

- The Admin password is stored as a Supabase Edge Function secret. Change it with `npx supabase secrets set ADMIN_PASSWORD=...` if needed.
- The Admin UI keeps the entered password in the current browser session only.
- The app's project records and uploaded images live in Supabase, not in this ZIP.
- This update preserves the existing Supabase project ID, publishable key, database schema, and Admin API source. No service-role key is included.
- Motion effects are intentionally disabled or reduced when the visitor has enabled reduced motion in their operating system.
