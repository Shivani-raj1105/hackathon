# HYPERION — 24-Hour Interdisciplinary Hackathon

Comic-book-styled landing page and registration system for HYPERION, the inaugural hackathon at Sri Venkateshwara College of Engineering (SVCE), Bengaluru.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Prisma 5 · PostgreSQL · Zod 3

---

## Quick Start (local dev)

### 1. Prerequisites

- Node.js 18+
- pnpm 12 (`npm i -g pnpm`)
- Docker Desktop (for the local Postgres)

### 2. Clone and install

```bash
git clone <repo-url>
cd hyperion
pnpm install --config.dangerouslyAllowAllBuilds=true
```

> The `--config.dangerouslyAllowAllBuilds=true` flag is required on first install
> because pnpm 12 blocks post-install scripts by default and Prisma needs them.
> After the first install the flag is no longer needed for `pnpm install`.

### 3. Environment variables

```bash
cp .env.example .env
# Edit .env — the defaults work with docker-compose out of the box.
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ADMIN_TOKEN` | ✅ | Secret header for admin API (min 16 chars) |
| `NODE_ENV` | — | `development` / `production` |
| `ENABLE_EMAIL` | — | `true` to send confirmation emails |
| `SMTP_*` | if email | SMTP credentials |

### 4. Start the database

```bash
docker-compose up -d
```

This starts a PostgreSQL 16 container on `localhost:5432`.

### 5. Run migrations

```bash
pnpm db:migrate
# When prompted, give the migration a name, e.g. "init"
```

### 6. (Optional) Seed with sample data

```bash
pnpm db:seed
```

### 7. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the landing page.  
Open [http://localhost:3000/register](http://localhost:3000/register) — the registration form.

---

## Opening / closing registration

All registration state is controlled from **`lib/site-config.ts`** — no code changes needed elsewhere.

```ts
// lib/site-config.ts

registrationOpensAt: '2027-02-01T09:00:00+05:30',  // ISO 8601 with TZ
registrationClosesAt: '2027-02-13T23:59:59+05:30',  // null = no closing date
maxTeams: 100,                                        // null = unlimited
registrationUrl: '/register',                         // or a Google Form URL
```

| State | Config | UI |
|---|---|---|
| Not open | `registrationOpensAt: null` | "REGISTRATION OPENING SOON" (disabled) |
| Open | `registrationOpensAt` set, within window | "REGISTER NOW" (active link) |
| Closed by date | Past `registrationClosesAt` | "REGISTRATIONS CLOSED" (disabled) |
| Full | `maxTeams` reached | "ALL SLOTS FILLED" (disabled) |

After changing the config, redeploy (or restart dev server) for the change to take effect.

---

## Database commands

```bash
pnpm db:generate   # Regenerate Prisma client after schema changes
pnpm db:migrate    # Apply migrations to the database (creates migration files)
pnpm db:push       # Push schema without migration files (dev only)
pnpm db:studio     # Open Prisma Studio (visual DB browser) at localhost:5555
pnpm db:seed       # Populate with sample data (clears existing data first)
```

---

## Admin API

All admin endpoints require the `x-admin-token` header matching `ADMIN_TOKEN`.

### List registrations

```bash
curl http://localhost:3000/api/admin/registrations \
  -H "x-admin-token: your-admin-token" \
  "?page=1&perPage=25&search=circuit"
```

### Export as CSV

```bash
curl http://localhost:3000/api/admin/registrations/export \
  -H "x-admin-token: your-admin-token" \
  -o registrations.csv
```

---

## Public API

```bash
# Registration status
GET /api/register/status
# → { status: "not_open" | "open" | "closed" | "full", spotsLeft?, totalTeams?, maxTeams? }

# Submit a registration
POST /api/register
Content-Type: application/json
# → 201 { ok: true, registrationId: "HYP-XXXXXX" }
# → 422 { ok: false, error: { code, message, fieldErrors } }
# → 409 { ok: false, error: { code: "DUPLICATE_*", fieldErrors } }
# → 429 { ok: false, error: { code: "RATE_LIMITED" } }

# Public summary (no PII)
GET /api/register/HYP-XXXXXX
# → { registration: { registrationCode, teamName, teamSize, members: [...] } }
```

---

## Deployment (Vercel + Neon/Supabase)

1. Push to GitHub and connect to Vercel.
2. Create a Postgres database on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
3. Add `DATABASE_URL` and `ADMIN_TOKEN` to Vercel environment variables.
4. Run `pnpm db:migrate` locally pointing at the production DB:
   ```bash
   DATABASE_URL="<prod-url>" pnpm db:migrate --name init
   ```
5. Deploy.

---

## Project structure (registration-related files)

```
app/
  api/
    register/
      route.ts                 POST /api/register
      status/route.ts          GET  /api/register/status
      [registrationId]/route.ts GET /api/register/:id
    admin/
      registrations/
        route.ts               GET  /api/admin/registrations
        export/route.ts        GET  /api/admin/registrations/export
  register/
    layout.tsx                 Layout (header + footer, no intro cover)
    page.tsx                   /register page (server component)
    RegisterForm.tsx            Client form component

components/
  form/
    ComicInput.tsx
    ComicSelect.tsx
    ComicTextarea.tsx
    ComicCheckbox.tsx
    FieldError.tsx
    SubmitButton.tsx

lib/
  db/client.ts                 Prisma singleton
  env.ts                       Validated env vars
  rate-limit.ts                In-memory per-IP rate limiter
  services/
    registration.service.ts    Business logic
  validation/
    registration.ts            Shared Zod schema (client + server)

prisma/
  schema.prisma                DB schema (teams, members, events)
  seed.ts                      Dev seed script

docker-compose.yml             Local Postgres
.env.example                   Environment variable template
```
