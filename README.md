# FanZone — Framed Posters & Prints

FanZone is the online storefront for premium framed posters and prints — a curated collection celebrating football, basketball, Formula 1, movies and iconic cars. We combine museum-quality framing with eye-catching designs so fans can showcase their passion at home or in the office.

What we sell:

- Framed football posters (teams, legends, match art)
- Framed basketball posters (players, moments, graphics)
- Formula 1 prints (cars, drivers, classic races)
- Movie posters (classic and modern cinema art)
- Car posters (supercars, classics, racing posters)

**Why customers love FanZone**

- High-quality framing and print materials
- Ready-to-hang pieces in multiple sizes
- Local shipping and careful packaging

**Tech stack & structure**

- Frontend: React, TypeScript, Vite, MUI
- Backend: NestJS, TypeScript
- Email: Nodemailer (server-side contact form)

Project layout (top level):

- `app/` — front-end application (React + Vite)
- `server/` — API (NestJS)

Quick start (development)

```bash
npm install
cd app && npm install
cd ../server && npm install
```

You can start both services from the project root in two separate terminals:

```bash
# In terminal 1 (project root)
npm run app

# In terminal 2 (project root)
npm run server
```

Or start both services concurrently from the project root with a single command:

```bash
# From project root
npm run dev
```

Changelog
See `CHANGELOG.md` for notable releases and updates.
