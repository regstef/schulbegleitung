# Technology Stack: Decari MVP

**Version:** 1.0
**Date:** 2025-11-10
**Status:** Active
**Owner:** Tech Lead

---

## Project Type

**Full-stack Web Application (Next.js)**

- Content & Marketing Website (SSG/ISR)
- Multi-step Funnel Application (SSR/Client)
- API Backend for Forms & Webhooks
- Integrated with external services (cal.com, PostHog, n8n)

---

## Core Technologies

### Primary Language(s)

- **Language:** TypeScript 5.3+
- **Runtime:** Node.js 20 LTS
- **Package Manager:** pnpm 8+

**Rationale:**
- TypeScript: Type-safety, excellent DX, catches errors at compile-time
- Node.js 20: Latest LTS, native ES Modules, best Vercel support
- pnpm: Schneller als npm, effizienter Disk-Usage, bessere Performance

### Frontend Framework

- **Framework:** Next.js 15+ (App Router)
- **React:** 19+ (Canary features: Server Actions)
- **Styling:** Tailwind CSS 4.0+ (neueste Version)
- **UI Components:**
  - **shadcn/ui** (Radix UI primitives) - Basis-Komponenten
  - **shadcnblocks** (pre-built components) - Vorgefertigte Section-Komponenten
- **Icons:** Lucide React

**Rationale:**
- Next.js App Router: Server Components, native streaming, best performance
- Tailwind 4: Neueste Version, bessere Performance, modernste Features
- shadcn/ui: Copy-paste components, full customization, accessibility built-in
- shadcnblocks: Pre-built sections, schnellere Entwicklung, konsistentes Design

**Design System:**
- **Tailwind Theme:** Custom Theme wird definiert in `tailwind.config.ts`
  - Brand Colors (Primary, Secondary, Accent)
  - Typography Scale
  - Spacing System
  - Border Radius
  - Shadows
- **Komponenten-Strategie:**
  - ✅ **AUSSCHLIESSLICH** shadcn/ui + shadcnblocks verwenden
  - ❌ **KEINE** anderen UI-Libraries (Material-UI, Chakra, etc.)
  - ❌ **KEINE** Custom-Komponenten ohne Shadcn-Basis
  - Workflow: AI Agent **wartet auf Shadcn Block-Auswahl** vor Implementierung

### Forms & Validation

- **Forms:** React Hook Form 7.5+
- **Validation:** Zod 3.22+
- **Form Components:** Custom forms-kit package (see Structure)

**Rationale:**
- React Hook Form: Uncontrolled forms, minimal re-renders, excellent performance
- Zod: TypeScript-first, runtime validation, type inference
- Shared schemas across frontend/backend ensure consistency

**Standard Form Patterns:**
```typescript
// Shared Zod Schema
const leadSchema = z.object({
  email: z.string().email(),
  plz: z.string().regex(/^\d{5}$/),
  schoolType: z.enum(['grundschule', 'gymnasium', 'realschule', 'gesamtschule']),
})

// React Hook Form Integration
const { register, handleSubmit } = useForm({
  resolver: zodResolver(leadSchema)
})
```

### Content Management

- **Content System:** Contentlayer 0.3+ or Velite 0.4+
- **Format:** MDX (Markdown + JSX)
- **Storage:** Git-based (in repo)
- **Frontmatter:** YAML for metadata

**Rationale:**
- Contentlayer: Type-safe content, build-time validation, excellent Next.js integration
- Alternative Velite: Lighter, more flexible, similar DX
- Git-based: Version control, no CMS complexity for MVP
- MDX: Allows custom React components in content

**Content Structure:**
```yaml
---
title: "Was ist Schulbegleitung?"
slug: "was-ist-schulbegleitung"
description: "Schulbegleitung Definition, Anspruch und Prozess erklärt"
keywords: ["schulbegleitung", "definition", "anspruch"]
publishedAt: "2025-11-10"
author: "Decari Team"
category: "ratgeber"
ogImage: "/images/og/schulbegleitung-definition.png"
---
```

### Institutions-Seiten-Architektur

**Zielseiten:** `/schulen`, `/traeger`, `/dienstleister`

**Architekturansatz:** Template-basiert, statisch generiert (SSG), vollständig type-safe

**Content-Management:**
- **Kein CMS, keine Datenbank, kein Markdown**
- Content als **typisierte TypeScript-Objekte** direkt im Code
- Ein Objekt pro Seite (z.B. `schulenContent.ts`, `traegerContent.ts`, `dienstleisterContent.ts`)
- Gespeichert in `src/content/institutions/` oder `src/lib/content/`

**Content-Struktur (TypeScript):**
```typescript
// src/lib/content/institution-page-content.ts
export interface InstitutionPageContent {
  hero: {
    headline: string
    subheadline: string
    ctaText: string
  }
  benefits: Array<{
    title: string
    description: string
    icon: string  // Icon-Name aus Lucide
  }>
  process: {
    title: string
    steps: Array<{
      step: number
      title: string
      description: string
    }>
  }
  faq: Array<{
    question: string
    answer: string
  }>
  cta: {
    headline: string
    ctaText: string
  }
}

// Beispiel: Content für /schulen
export const schulenContent: InstitutionPageContent = {
  hero: {
    headline: "Kooperationspartner für Schulen",
    subheadline: "Qualifizierte Schulbegleitung ohne Verwaltungsaufwand",
    ctaText: "Jetzt Kontakt aufnehmen"
  },
  benefits: [
    {
      title: "Effizientes Sourcing",
      description: "Zugriff auf Pool qualifizierter Schulbegleiter*innen",
      icon: "Users"
    },
    // ...
  ],
  // ...
}
```

**Template-Komponente:**
- Eine einzige, wiederverwendbare React-Komponente: `InstitutionPageTemplate.tsx`
- Nimmt `InstitutionPageContent` als Prop
- Rendert alle Sektionen dynamisch (Hero, Benefits, Process, FAQ, Kontaktformular)
- Vollständig type-safe durch TypeScript

**Routing (Next.js):**
```typescript
// app/schulen/page.tsx
import { InstitutionPageTemplate } from '@/components/templates/institution-page-template'
import { schulenContent } from '@/lib/content/schulen-content'

export default function SchulenPage() {
  return <InstitutionPageTemplate content={schulenContent} pageType="schulen" />
}

export const metadata = {
  title: schulenContent.hero.headline,
  description: schulenContent.hero.subheadline,
}
```

**Vorteile:**
- ✅ Extrem performant (statisch generiert, kein Runtime-Overhead)
- ✅ Type-safe (TypeScript prüft Content zur Build-Zeit)
- ✅ DRY-Prinzip (ein Template für alle drei Seiten)
- ✅ Wartbar (Änderungen am Template = alle Seiten aktualisiert)
- ✅ Kein CMS, keine Datenbank, keine Markdown-Verarbeitung
- ✅ Git-basiert (Änderungen versioniert, nachvollziehbar)

---

## Key Dependencies/Libraries

### Data Fetching & State

- **Server State:** TanStack Query 5+ (React Query)
- **Client State:** Zustand 4+ (for Wizard state)
- **Server Actions:** Native Next.js (form submissions)

### Date/Time

- **Library:** date-fns 3+
- **Timezone:** dayjs (if needed for cal.com integration)

### API Client

- **HTTP Client:** Native fetch (Next.js extended)
- **Webhooks:** Next.js API Routes

### Email Templates

- **Library:** React Email
- **Renderer:** @react-email/render

**Rationale:**
- React Email: JSX-based templates, renders to HTML, preview mode
- Used in n8n workflows via API endpoint

### Utilities

- **Class Names:** clsx + tailwind-merge (cn helper)
- **Slugify:** slugify
- **Markdown:** unified ecosystem (remark/rehype via Contentlayer)

---

## Application Architecture

### Architecture Pattern: **Hybrid SSG/SSR with Server Components**

```
┌─────────────────────────────────────────────────┐
│           Next.js App Router (Edge)             │
├─────────────────────────────────────────────────┤
│  Static Content (SSG)  │  Dynamic Funnel (SSR)  │
│  - Blog Posts          │  - Intake Wizard       │
│  - Info Pages          │  - Booking Flow        │
│  - Landing Page        │  - Result Screens      │
├─────────────────────────────────────────────────┤
│              API Routes (Serverless)             │
│  - /api/webhooks/form-submit                    │
│  - /api/webhooks/cal-booking                    │
│  - /api/email-templates/render                  │
├─────────────────────────────────────────────────┤
│                 External Services                │
│  PostHog │ cal.com │ n8n │ Vercel Postgres      │
└─────────────────────────────────────────────────┘
```

**Key Principles:**
1. **Server Components by default** (performance, SEO)
2. **Client Components only when needed** (interactivity, hooks)
3. **API Routes for webhooks** (external integrations)
4. **Static pages regenerate on-demand** (ISR)
5. **Database as safety net** (n8n remains primary processor)

---

## Data Storage

### Primary Storage: **Vercel Postgres** (powered by Neon)

- **Type:** Serverless PostgreSQL
- **Hosting:** Vercel Integration (1-click setup)
- **Plan:** Hobby Tier (256 MB, 60h compute/month)
- **Backup:** Automatic (Neon snapshots)

**Rationale:**
- Native Vercel integration (zero config)
- Serverless = no server maintenance
- Auto-scaling, connection pooling
- Sufficient for MVP (<1000 leads/month)

**Fallback if limits exceeded:**
- Neon Postgres directly (more generous free tier)
- Supabase Postgres (alternative)

### ORM: **Prisma 5.7+**

- **Schema:** `prisma/schema.prisma` (im Hauptverzeichnis)
- **Client:** `@prisma/client` (generated, type-safe)
- **Migrations:** `prisma migrate dev/deploy`
- **Studio:** `prisma studio` (GUI for DB inspection)

**Rationale:**
- TypeScript-native, full type inference
- Schema-first approach (single source of truth)
- Excellent DX (auto-completion, error messages)
- Industry standard, great community

**Database Role:**
- **Safety net:** Persist leads before n8n (if n8n down, data not lost)
- **Dedupe:** Check for existing lead by email (30-day window)
- **Audit log:** Timestamp, source tracking
- **NOT for business logic:** n8n remains primary processor

**Minimal Schema (MVP):**
```prisma
model Lead {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  phone         String?
  region        String   // PLZ
  schoolType    String   // enum handled in Zod
  needType      String
  timeframe     String?
  contactMethod String   // "termin" | "rueckruf" | "email"
  source        String?  // utm_source
  consentFlags  Json     // {essentiell: true, analytics: true}
  n8nProcessed  Boolean  @default(false)
  n8nJobId      String?  // reference to n8n execution
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([email])
  @@index([createdAt])
}

model Appointment {
  id            String   @id @default(cuid())
  leadEmail     String   // FK to Lead (not enforced for simplicity)
  calBookingId  String   @unique
  calEventId    String
  timeSlot      DateTime
  status        String   // "booked" | "confirmed" | "cancelled" | "no_show"
  rescheduleCount Int    @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([leadEmail])
  @@index([timeSlot])
}
```

### Caching

- **Strategy:** Next.js native (fetch caching, React Cache)
- **Static Assets:** Vercel Edge Network (automatic CDN)
- **API Responses:** No caching (always fresh data)

### Data Formats

- **API:** JSON (application/json)
- **Forms:** FormData → JSON
- **Content:** MDX → HTML (build-time)
- **Config:** TypeScript (runtime, type-safe)

---

## External Integrations

### 1. cal.com (Booking Widget & Webhooks)

**Purpose:** Termin-Buchung für Erstberatung

**Integration:**
- **Embed Widget:** `<Cal />` React component (client-side)
- **Webhooks:** `POST /api/webhooks/cal-booking`
  - Events: `booking.created`, `booking.rescheduled`, `booking.cancelled`
  - Signature validation: HMAC SHA256

**Authentication:** API Key (environment variable)

**Error Handling:**
- cal.com down → Fallback-Form "Terminwunsch"
- Webhook retry: 3 attempts with exponential backoff

### 2. PostHog (Analytics - Events only)

**Purpose:** Conversion Event Tracking (simplified, no advanced features in MVP)

**Integration:**
- **Client SDK:** `posthog-js` (CSR components only)
- ❌ **NO Server SDK** (not needed for MVP)
- **Region:** EU (eu.posthog.com)

**Events:** (see Product Steering for full list)
- page_view, cta_click, funnel_start/step/complete, lead_submit, booking_*, consent_*

**Consent-Handling:**
- User opts out → disable tracking completely
- Opt-in → Event tracking only (no recordings, no heatmaps)

**MVP Limitations:**
- ✅ **Event Tracking** (Conversions)
- ✅ **Funnels** (Landing → Lead → Termin)
- ❌ **NO Session Recording** (DSGVO-intensiv, Phase 5)
- ❌ **NO Heatmaps** (Phase 5)
- ❌ **NO Feature Flags** (A/B-Testing in Phase 5)
- ❌ **NO Error Tracking** (console.log reicht, Sentry in Phase 5)

### 2a. Meta Ads (Pixel & Conversions API via PostHog)

**Purpose:** Conversion-Tracking für Meta Ads (Facebook/Instagram) via hybriden Ansatz

**Integration - Hybrid Tracking (Pixel + CAPI):**

PostHog bietet native Meta-Integration über zwei Kanäle:

**1. Client-Side: Meta Pixel (via PostHog)**
- **Aktivierung:** Meta Pixel-Integration in PostHog aktivieren
- **PostHog sendet automatisch:** `PageView`-Events und Browser-Daten an Meta
- **Benefit:** Erfasst Client-Side-Daten (Cookies, Browser-Context, User-Agent)
- **Setup:** Meta Pixel ID in PostHog Dashboard hinterlegen

**2. Server-Side: Conversions API (via PostHog Destination)**
- **Aktivierung:** PostHog Destination für Meta Conversions API konfigurieren
- **PostHog sendet automatisch:** Server-Events (z.B. `lead_submit`) an Meta CAPI
- **Benefit:**
  - Zuverlässiger (unabhängig von Ad-Blockern, Cookie-Opt-Outs)
  - Bessere Datenpersistenz
  - Höhere Event-Qualität für Meta's Algorithmus
- **Setup:** Meta Access Token + Dataset ID in PostHog Destination hinterlegen

**3. Event-Deduplizierung (kritisch für korrekte Metriken):**

Problem: Dasselbe Event (z.B. Lead-Submit) wird sowohl client-seitig (Pixel) als auch server-seitig (CAPI) gesendet → Duplikate in Meta Ads Manager.

**Lösung:**
- **Client-seitig:** Bei Event-Tracking (z.B. `lead_submit`) generiere eine eindeutige `event_id` (z.B. UUID)
  ```tsx
  posthog.capture('lead_submit', {
    event_id: crypto.randomUUID(),  // Client-generiert
    lead_id: "...",
    // ...
  })
  ```
- **Server-seitig:** Backend liest die `event_id` aus der Lead-Submit-Anfrage und inkludiert sie beim Event-Send via PostHog
  ```ts
  // API Route: /api/leads/submit
  const eventId = req.body.event_id  // Von Client übernommen

  posthog.capture('lead_submit', {
    distinctId: lead.email,
    event_id: eventId,  // Dieselbe ID wie Client
    lead_id: lead.id,
    // ...
  })
  ```
- **Meta dedupliziert:** Events mit identischer `event_id` werden nur einmal gezählt

**Data Flow (Hybrid Setup):**
```
User-Aktion (z.B. Lead-Submit)
   ↓
1. Client: posthog.capture('lead_submit', { event_id: "abc-123", ... })
   ↓
   ├─→ PostHog Meta Pixel Destination
   │   └─→ Meta Ads Manager (Client-Event mit event_id: "abc-123")
   │
2. Server: API speichert Lead in DB
   ↓
   Server: posthog.capture('lead_submit', { event_id: "abc-123", ... })
   ↓
   └─→ PostHog Meta CAPI Destination
       └─→ Meta Ads Manager (Server-Event mit event_id: "abc-123")

Meta dedupliziert anhand event_id → Nur 1 Conversion gezählt ✅
```

**DSGVO-Konformität:**
- **User opt-out (Analytics abgelehnt):**
  - ❌ Kein PostHog-Tracking
  - ❌ Kein Meta Pixel-Event (da via PostHog)
  - ✅ Server-Side CAPI läuft weiter (kein Client-Consent erforderlich, da keine Cookies)
- **Transparenz:** Privacy Policy beschreibt hybriden Tracking-Ansatz:
  - "Wir nutzen Meta Pixel und Conversions API zur Kampagnen-Optimierung"
  - "Sie können Browser-basiertes Tracking ablehnen, server-seitige Conversion-Messung bleibt aktiv"

**Setup-Schritte (PostHog Dashboard):**
1. **Integrations → Meta Pixel:** Pixel ID hinterlegen
2. **Destinations → Meta Conversions API:**
   - Access Token (von Meta Business Manager)
   - Dataset ID (Pixel-ID)
   - Event-Mapping konfigurieren (z.B. `lead_submit` → `Lead`)
3. **Event Properties:** `event_id` als Standard-Property hinzufügen

**Vorteile dieses Ansatzes:**
- ✅ **Redundanz:** Wenn Client-Tracking blockiert wird, CAPI fängt auf
- ✅ **Höhere Datenqualität:** Server-Events sind zuverlässiger
- ✅ **Meta's Empfehlung:** Hybrid-Setup ist Best Practice
- ✅ **Einfache Implementierung:** PostHog managed die Komplexität
- ✅ **Keine separate Meta SDK-Integration nötig**

### 3. n8n (Workflow Automation - Fire-and-Forget)

**Purpose:** Lead-Processing (außerhalb unseres Projekts)

**Integration:**
- **Webhook:** Wir triggern n8n Webhook nach DB-Speicherung
- **Method:** POST (fire-and-forget, keine Response-Erwartung)
- **URL:** Environment Variable `N8N_WEBHOOK_URL`

**Data Format:**
```json
{
  "leadId": "cluXXXXXXXX",
  "email": "anna@example.com",
  "name": "Anna Müller",
  "phone": "+49...",
  "region": "10115",
  "schoolType": "grundschule",
  "needType": "lernfoerderung",
  "genehmigungsstatus": "not_approved",  // "approved" or "not_approved"
  "entryPoint": "eltern",
  "consentFlags": { "essentiell": true, "analytics": true },
  "source": "organic",
  "utm_campaign": "seo",
  "timestamp": "2025-11-10T12:34:56Z"
}
```

**Unser Project Scope:**
- ✅ Lead in DB speichern
- ✅ n8n Webhook triggern (1 retry bei Fehler)
- ❌ **KEIN** Warten auf n8n Response
- ❌ **KEIN** DB-Update von n8n zurück
- ❌ **KEINE** Email-Verwaltung in unserer App

**n8n Processing (außerhalb):**
- Emails (Bestätigung, Checkliste, Reminder)
- Slack-Benachrichtigungen
- CRM-Sync (Sheets/Airtable/HubSpot - whatever)
- Alle weiteren Automationen

**Error Handling:**
- n8n nicht erreichbar → Lead bereits in DB ✅
- 1x Retry nach 5 Sek (simple setTimeout)
- Kein komplexes Retry-System (KISS!)

### 4. Consent Management (Vanilla Cookie Consent)

**Purpose:** DSGVO-konformes Consent-Banner

**Tool:** https://github.com/orestbida/cookieconsent
- Leichtgewichtiges JavaScript-Plugin
- Keine Dependencies, kein Framework nötig
- DSGVO-compliant out-of-the-box

**Categories (2 only):**
1. **Essentiell** (always active): Funktionalität, keine Cookies
2. **Analytics** (opt-in): PostHog Event-Tracking

**Integration:**
- Vanilla JS Script in `<head>`
- Config in `app/lib/consent-config.ts`
- PostHog init nur bei Analytics-Consent

---

## Monitoring & Dashboard Technologies

### Analytics: PostHog (Events & Funnels only)

- **Dashboard:** Web-based (eu.posthog.com)
- **Visualization:** Funnels, Trends (no Session Recordings, no Heatmaps)
- **Sharing:** Read-only Links für Stakeholder

**MVP Scope:**
- ✅ Event-Tracking (Conversions)
- ✅ Funnels (Landing → Lead → Termin)
- ❌ NO Live View / Session Recordings
- ❌ NO Heatmaps
- ❌ NO Feature Flags

### Error Tracking: Console.log (MVP)

- **MVP:** `console.error()` reicht
- **Vercel Logs:** Function Logs für API-Errors
- ❌ **NO PostHog Error-Tracking** (nicht kritisch)
- ❌ **NO Sentry** (Phase 5)

**Begründung:** Einfachheit > Perfektion. Errors manuell prüfen reicht für MVP.

### Uptime Monitoring: Vercel Status (native)

- **Tool:** Vercel Status-Page (automatisch)
- ❌ **NO UptimeRobot** (unnecessary für MVP)
- ❌ **NO separate Monitoring-Tool**

**Begründung:** Vercel hat eigenes Monitoring. Zusätzliches Tool = unnötige Komplexität.

### Performance Monitoring: Vercel Analytics (included)

- **Web Vitals:** LCP, FID, CLS (Real User Monitoring)
- **Audience:** Traffic, Devices, Locations
- **Speed Insights:** Page-by-Page Performance
- **Cost:** Kostenlos im Hobby-Tier

---

## Development Environment

### Build & Development Tools

- **Build System:** Next.js (native)
- **Package Manager:** pnpm 8+
- **Dev Server:** Next.js dev (hot reload, fast refresh)
- **Scripts:**
  - `pnpm dev` → Start dev mode
  - `pnpm build` → Build for production
  - `pnpm test` → Run all tests
  - `pnpm lint` → ESLint + Prettier

### Code Quality Tools

**Linting & Formatting:**
- **Linter:** ESLint 8+ mit Next.js Config
  - Standard Next.js Regeln
  - TypeScript-ESLint Plugin
  - React Hooks Plugin
- **AI-Linting:** Ultracite (https://www.ultracite.ai/)
  - AI-powered code review
  - Keine Konfiguration nötig
  - Ideal für AI-Agenten
  - Automatische Integration über GitHub App
- **Formatter:** Prettier 3+
  - Automatisches Formatting
  - Integration mit ESLint
- **EditorConfig:** `.editorconfig` (indent, line-endings)

**Rationale:**
- ESLint: Industry Standard für syntaktische Regeln
- Ultracite: AI-powered Review für Code-Qualität und Best Practices
- Perfekt für AI-Agent-Workflows (keine Setup-Komplexität)
- Prettier: Konsistentes Code-Formatting

**Type-Checking:**
- **TypeScript:** `tsc --noEmit` (CI step)
- **Prisma:** `prisma generate && prisma validate`

**Testing Frameworks:**
- **Unit/Integration:** Vitest 1.0+ (fast, ESM-native, compatible with Jest)
- **Component Testing:** React Testing Library
- **E2E:** Playwright 1.40+ (cross-browser, headless)
- **Coverage:** Vitest coverage (target: ~60-70%)

**Testing Strategy (MVP - Minimal):**

**YAGNI-Prinzip:** Fokus auf kritischen Geschäftswert mit minimalem Zeitaufwand vor Launch.

**Priorität 1: E2E-Tests (Playwright) - Happy Paths nur**
- Eltern-Funnel: Landing → PLZ → Genehmigungsstatus → Schulform → Bedarf → Kontakt → Success (1-2 Tests)
- Institutionen-Formular: Schulen-Seite → Formular ausfüllen → Success (1 Test)
- **Ziel:** Sicherstellen, dass die kritischen User-Flows funktionieren
- **Umfang:** Desktop + Mobile (2 Tests pro Flow)
- **Frequenz:** Manuell vor Production-Deploy

**Priorität 2: Unit-Tests (Vitest) - Validierung nur**
- Zod-Schemas: plzSchema, emailSchema, phoneSchema, leadSchema
- **Ziel:** Kritische Validierungslogik abdecken
- **Umfang:** Edge-Cases, Error-Messages
- **Frequenz:** Im CI (automatisch)

**Aufgeschoben bis Phase 5:**
- ❌ Component-Tests (React Testing Library)
- ❌ Integration-Tests (API Routes)
- ❌ Error-Scenario-Tests (cal.com down, invalid inputs)
- ❌ Umfassende Browser-Testing (nur Chrome + Mobile Chrome im MVP)
- ❌ Coverage-Ziele (keine feste Prozent-Vorgabe)

**Begründung:** Dies sichert den kritischen Geschäftswert (Funnel funktioniert, Leads kommen an) mit minimalem Zeitaufwand. Eine umfassende Testabdeckung ist ein Ziel für Phase 5 ("Optimize & Scale").

**Testing-Commands:**
```bash
# E2E Tests (manuell vor Deploy)
pnpm e2e                    # Run all E2E tests
pnpm e2e:ui                 # Run with UI (debugging)

# Unit Tests (automatisch im CI)
pnpm test                   # Run unit tests (watch mode)
pnpm test:coverage          # Generate coverage report (optional)
```

**Documentation:**
- **Tool:** TSDoc comments for public APIs
- **Generators:** Typedoc (if needed, likely overkill for MVP)
- **Docs:** Markdown in `/docs` folder

### Version Control & Collaboration

- **VCS:** Git (GitHub)
- **Branching Strategy:** GitHub Flow
  - `main` → Production (protected, requires PR + CI pass)
  - `feature/*` → Feature branches
  - `fix/*` → Bugfix branches
- **Commit Convention:** Conventional Commits
  - `feat:`, `fix:`, `chore:`, `docs:`, `test:`
  - Example: `feat(intake): add PLZ validation`
- **Code Review:** GitHub PRs
  - Required: 1 approval (if team >1)
  - Ultracite auto-review (AI-powered feedback)
  - CI must pass (lint, type-check, tests, build)

### CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run test
      - run: pnpm run build
```

**Deployment:**
- **Platform:** Vercel (Git-based, automatic)
- **Trigger:** Push to `main` → Production deploy
- **Preview:** Every PR → Preview URL (automatic)
- **Environment Variables:** Managed in Vercel Dashboard
- **Build Command:** `pnpm run build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install --frozen-lockfile`

---

## Deployment & Distribution

### Target Platform

- **Hosting:** Vercel (Hobby Plan, free)
- **Edge Network:** Vercel CDN (automatic)
- **Functions:** Vercel Serverless (Node.js 20)
- **Database:** Vercel Postgres (Hobby, 256 MB)

### Environments

1. **Development (Local):**
   - `.env.local` (not in Git)
   - Local Postgres (optional, via Docker) OR Vercel Dev Postgres
   - n8n webhooks → ngrok/localhost-tunnels

2. **Preview (Vercel Branch Deploys):**
   - Every PR gets unique URL: `decari-mvp-pr-123.vercel.app`
   - Separate DB (Vercel Postgres Preview)
   - PostHog test project
   - n8n development workflows

3. **Production (Vercel Main Branch):**
   - Custom Domain: `decari.de` (via Vercel DNS)
   - Production DB (Vercel Postgres)
   - PostHog production project
   - n8n production workflows

### Distribution Method

- **End Users:** Web-based (URL: https://decari.de)
- **No installation required:** Progressive Web App (PWA) optional Phase 5+

### Update Mechanism

- **Code:** Git push → Vercel auto-deploy (<2 min)
- **Content:** Markdown commit → Build → ISR invalidation
- **Database Schema:** Prisma migration (`prisma migrate deploy` in CI)

---

## Technical Requirements & Constraints

### Performance Requirements

- **Page Load (LCP):** <2,5s (Lighthouse, 3G Mobile)
- **Interactivity (INP):** <200ms (user clicks → feedback)
- **Visual Stability (CLS):** <0,1 (no layout shifts)
- **Bundle Size:** <150KB gzipped (initial load)
- **API Response Time:** <300ms P95 (server response)
- **TTFB:** <200ms P95 (Vercel Edge)

**Strategies:**
- Server Components (reduce client JS)
- Code-Splitting (dynamic imports for wizard)
- Image Optimization (next/image, WebP, lazy-loading)
- Prefetching (critical resources, cal.com script)
- Font Optimization (next/font, self-hosted)

### Compatibility Requirements

**Browser Support:**
- Modern browsers (last 2 versions): Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari 15+, Chrome Android 100+
- **NO IE11 support** (Next.js 15 drops support)

**Platform Support:**
- Desktop: macOS, Windows, Linux
- Mobile: iOS, Android
- Tablet: iPad, Android Tablets

**Responsive Breakpoints (Tailwind):**
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet portrait)
- `lg`: 1024px (tablet landscape / small desktop)
- `xl`: 1280px (desktop)

### Security & Compliance

**Security Requirements:**
- **HTTPS:** Enforced (Vercel automatic)
- **CSRF Protection:** Next.js built-in (Server Actions)
- **Rate Limiting:** API routes (10 req/min per IP)
- **Spam Protection:** Honeypot-Feld (unsichtbar für Nutzer, sichtbar für Bots)
  - Einfacher, leichtgewichtiger Ansatz ohne externe Dependencies
  - CSS-hidden Input-Feld im Formular
  - Server-seitige Validierung: Request abgelehnt, wenn Feld gefüllt
  - Upgrade zu hCaptcha/reCAPTCHA nur bei Bedarf (Phase 5)
- **Input Validation:** Zod schemas on frontend + backend
- **SQL Injection:** Prevented (Prisma parameterized queries)
- **XSS Prevention:** React escapes by default, dangerouslySetInnerHTML avoided
- **Secrets Management:** Environment variables (Vercel encrypted)

**Security Headers:**
```typescript
// next.config.js
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  },
],
```

**Content Security Policy (CSP):**
- Strict CSP for static pages
- Relaxed for cal.com embed (allowed domains)
- PostHog script allowed (eu.posthog.com)

**DSGVO Compliance:**
- **Consent Management:** Custom banner (granular opt-in)
- **Cookie Policy:** Documented, accessible
- **Privacy Policy:** Generated via legal templates, linked in footer
- **Data Minimization:** Only essential data collected
- **Data Retention:** Leads >12 months inactive → auto-delete (Prisma Cron)
- **Right to Erasure:** API endpoint `/api/user/delete` (verify email, then purge)
- **AVV (Auftragsverarbeitungsvertrag):**
  - Vercel, PostHog, cal.com, Email-Provider
  - Links in Privacy Policy

### Scalability & Reliability

**Expected Load:**
- **Traffic:** 5-10k pageviews/month (MVP)
- **Leads:** 100-200/month
- **Concurrent Users:** <50 at peak
- **Database:** <1000 records (MVP)

**Scaling Strategy:**
- **Horizontal:** Vercel Serverless (auto-scales)
- **Database:** Connection pooling (Prisma + Neon)
- **Static Assets:** CDN (Vercel Edge, 300+ PoPs)
- **n8n:** Queue-based (burst-handling)

**Availability Requirements:**
- **Uptime:** ≥99,9% (Vercel SLA: 99,99% on paid plans)
- **Backup:** Neon automatic snapshots (daily)
- **Disaster Recovery:** Vercel automatic rollback (previous deployment)

**Monitoring:**
- **Uptime:** UptimeRobot (5-min checks)
- **Errors:** PostHog (real-time alerts)
- **Performance:** Vercel Analytics (Web Vitals)

---

## Technical Decisions & Rationale

### Decision Log

#### 1. **Next.js 15 (App Router) vs. Pages Router**

**Chosen:** App Router

**Rationale:**
- Server Components reduce client JS (better performance)
- Streaming & Suspense built-in (better UX)
- Future-proof (Pages Router maintenance mode)
- Better SEO (more content server-rendered)

**Trade-offs:**
- Steeper learning curve (new paradigms)
- Some libraries not yet compatible (rare)

---

#### 2. **Vercel Postgres (Neon) vs. Supabase vs. PlanetScale**

**Chosen:** Vercel Postgres

**Rationale:**
- Native Vercel integration (zero-config)
- Serverless (no cold starts, auto-scaling)
- Hobby tier sufficient (256 MB, 60h compute)
- Same provider = simpler billing

**Alternatives considered:**
- **Supabase:** More features (auth, storage), but overkill for MVP
- **PlanetScale:** Great, but no free tier anymore

---

#### 3. **Prisma vs. Drizzle ORM**

**Chosen:** Prisma

**Rationale:**
- Better TypeScript integration (full type inference)
- Prisma Studio (GUI for debugging)
- Industry standard (more examples, community)
- Schema-first approach (clear source of truth)

**Trade-offs:**
- Slightly heavier (Drizzle is lighter)
- More "magic" (Drizzle is closer to raw SQL)

---

#### 4. **Contentlayer vs. Velite vs. MDX directly**

**Chosen:** Contentlayer (or Velite if issues)

**Rationale:**
- Type-safe content (compile-time validation)
- Auto-generates TypeScript types from content
- Excellent Next.js integration
- Build-time processing (no runtime overhead)

**Fallback:** Velite (lighter, more flexible, similar API)

---

#### 5. **React Hook Form + Zod vs. Formik + Yup**

**Chosen:** React Hook Form + Zod

**Rationale:**
- Better performance (uncontrolled, fewer re-renders)
- Zod: TypeScript-first, type inference
- Modern, actively maintained
- Smaller bundle size than Formik

---

#### 6. **Vitest vs. Jest**

**Chosen:** Vitest

**Rationale:**
- Faster (native ESM, no transpilation)
- Compatible with Jest API (easy migration)
- Better Vite/Next.js integration
- Built-in coverage (no separate tool)

---

#### 7. **Single Package vs. Monorepo (Turborepo)**

**Chosen:** Single Package (Standard Next.js App)

**Rationale (YAGNI-Prinzip):**
- MVP benötigt keine separate Packages (database, types, ui, forms-kit)
- Alle Logik kann direkt in `src/lib/*` und `src/components/*` integriert werden
- Keine zusätzliche Komplexität durch Turborepo/Workspaces
- Schnellere Entwicklung, einfachere Wartung
- Upgrade zu Monorepo jederzeit möglich, wenn tatsächlich benötigt (Phase 5+)

**Trade-offs:**
- Weniger Modularität (aber für MVP nicht nötig)
- Schwieriger zu skalieren bei stark wachsendem Team (aber unwahrscheinlich im MVP)

**Integration der ursprünglichen Packages:**
- `packages/database` → `src/lib/db` + `prisma/schema.prisma`
- `packages/forms-kit` → `src/lib/forms` + `src/components/forms`
- `packages/ui` → `src/components/ui` (shadcn/ui)
- `packages/types` → `src/types`

---

#### 8. **PostHog (only) vs. PostHog + Sentry**

**Chosen:** PostHog only (MVP)

**Rationale:**
- PostHog has basic error tracking (sufficient for MVP)
- Cost: PostHog free tier generous, Sentry adds cost
- Simplicity: One tool fewer
- Upgrade path: Add Sentry in Phase 5 if needed

---

#### 9. **ESLint + Prettier + Ultracite**

**Chosen:** ESLint + Prettier + Ultracite (Komplementär)

**Rationale:**
- ESLint: Industry Standard für syntaktische Regeln und Code-Standards
- Prettier: Konsistentes Code-Formatting, Auto-Fix
- Ultracite: AI-powered Code Review, ideal für AI-Agent-Workflows
- **Keine Konfiguration nötig**: Ultracite funktioniert out-of-the-box
- **AI-Agent-friendly**: Perfekt für automatisierte Code-Generierung
- **Komplementär**: ESLint für Syntax, Ultracite für Qualität & Best Practices

**Vorteile für AI-Agents:**
- Automatisches Feedback zu generiertem Code
- Keine manuelle Setup-Komplexität
- Erkennt logische Fehler und Code-Smells
- Verbessert Code-Qualität über syntaktische Prüfungen hinaus

**Integration:**
- GitHub App: Automatische PR-Reviews
- Keine lokale Installation nötig
- Keine CI/CD-Anpassungen erforderlich

---

#### 10. **Vercel Hobby (free) vs. Pro ($20/mo)**

**Chosen:** Hobby (MVP)

**Rationale:**
- Sufficient for MVP (<100k requests/month)
- Unlimited bandwidth (Hobby tier)
- Upgrade when needed (post-launch, if traffic grows)

**Pro benefits (upgrade triggers):**
- Analytics (Web Vitals, more granular)
- More team members
- Advanced build features (prioritized builds)

---

## Known Limitations

### 1. **Vercel Hobby Tier Limits**

**Limitation:**
- 100 GB bandwidth/month
- 100 hours serverless function execution
- 6,000 build minutes/month

**Impact:**
- Sufficient for MVP (<10k pageviews/month)
- May hit limits if viral campaign

**Mitigation:**
- Monitor usage in Vercel Dashboard
- Upgrade to Pro ($20/mo) if approaching limits
- Optimize images/bundles to reduce bandwidth

---

### 2. **Vercel Postgres Hobby Tier**

**Limitation:**
- 256 MB storage
- 60 hours compute/month
- 10,000 rows (estimated)

**Impact:**
- Sufficient for ~1000 leads
- Compute hours may run out with many queries

**Mitigation:**
- Connection pooling (Prisma)
- Query optimization (indexes)
- Upgrade to Pro if needed ($0.10/GB + compute)

---

### 3. **No Automated E2E Tests in CI (MVP)**

**Limitation:**
- Playwright tests run manually (too slow for every PR)

**Impact:**
- Risk of regressions not caught

**Mitigation:**
- Run E2E tests before production deploy (manual)
- Phase 5: Add E2E to CI with selective runs (main flows only)

---

### 4. **Basic Error Tracking (console.log only)**

**Limitation:**
- Nur console.error() und Vercel Function Logs
- Keine strukturierten Error-Events, keine Stack-Traces, keine Alerts

**Impact:**
- Errors müssen manuell in Vercel Logs gesucht werden
- Keine proaktive Error-Benachrichtigung

**Mitigation:**
- MVP: Manual monitoring (Vercel Dashboard)
- Phase 5: Add Sentry für bessere Error-Tracking
- Begründung: KISS - Errors sind bei MVP-Traffic überschaubar

---

### 5. **Single Region (Vercel EU)**

**Limitation:**
- Hosting in EU (Frankfurt/Amsterdam)
- Users outside EU may have higher latency

**Impact:**
- MVP targets German users (DACH region), so minimal
- Global users may see +50-100ms latency

**Mitigation:**
- Vercel Edge Network mitigates (CDN)
- Phase 5: Multi-region if expanding internationally

---

### 6. **No Multi-Tenancy / White-Label**

**Limitation:**
- Single-tenant app (Decari only)

**Impact:**
- Cannot easily offer white-label solution to partners

**Mitigation:**
- Out of scope for MVP
- Phase 5+: Refactor for multi-tenancy if needed

---

## Future Technical Enhancements

### Phase 5+ (Post-MVP)

**Performance:**
- Service Worker (offline support, faster repeat visits)
- Partial Prerendering (Next.js 15 feature, static + dynamic mix)
- Image CDN (Cloudinary for better compression)

**Developer Experience:**
- Storybook (component library documentation)
- Chromatic (visual regression testing)
- Automated E2E in CI (Playwright with parallelization)

**Infrastructure:**
- Redis for caching (if needed for high traffic)
- Separate API service (if API grows beyond Next.js routes)
- Database read replicas (if query load increases)

**Observability:**
- Sentry for advanced error tracking
- DataDog / New Relic for APM (if needed)
- Custom Grafana dashboards (if Vercel Analytics insufficient)

---

## Appendix: Environment Variables

### Required Environment Variables

**Development:**
```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/decari_dev"

# PostHog (Analytics + Meta Integration)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://eu.posthog.com"
# POSTHOG_API_KEY="..."  # Nur wenn Server-SDK genutzt wird (aktuell nicht im MVP)

# Meta Ads (via PostHog - konfiguriert im PostHog Dashboard, keine Env Vars nötig)
# Meta Pixel ID und CAPI Access Token werden direkt in PostHog Integrations/Destinations hinterlegt

# cal.com (nur Embed + Webhook)
NEXT_PUBLIC_CAL_LINK="https://cal.com/decari/erstberatung"
CAL_WEBHOOK_SECRET="whsec_..."  # Für Webhook-Signatur-Validierung

# n8n (nur Webhook)
N8N_WEBHOOK_URL="https://n8n.decari.de/webhook/lead-submit"
N8N_WEBHOOK_SECRET="whsec_..."  # Für Webhook-Signatur-Validierung (optional)

# KEINE Email-API (n8n verschickt Emails)
# KEIN Cal.com API Key (nur Embed Widget)
# KEIN N8N API Key (nur Webhook-Empfang)
```

**Production:** (managed in Vercel Dashboard)
- Same keys, but production values
- Secrets encrypted at rest

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-10 | Tech Team | Initial Tech Steering based on alignment discussion |
| 1.1 | 2025-11-10 | Tech Team | KISS/DRY-Simplification: Vanilla cookieconsent, PostHog nur Events (keine Session Recording/Heatmaps/Feature Flags/Error-Tracking), n8n fire-and-forget (kein DB-Update zurück, keine Email-Verwaltung in App), kein UptimeRobot, console.log für Errors, Known Limitations aktualisiert |
| 1.2 | 2025-11-10 | Tech Team | YAGNI/KISS-Simplification: Monorepo entfernt (Standard Next.js App), Honeypot statt Captcha, Ultracite entfernt (nur ESLint/Prettier), Institutions-Seiten-Architektur spezifiziert (Template-basiert mit TypeScript-Objekten), Prisma-Schema-Pfad angepasst, CI/CD aktualisiert |
| 1.3 | 2025-11-10 | Tech Team | Package Manager & Design System: pnpm statt npm, Tailwind 4.0+, shadcn/ui + shadcnblocks (AUSSCHLIESSLICH), Tailwind Theme definiert, Unnötige API Keys entfernt (Resend, N8N API, Cal.com API - nur Webhooks), CI/CD für pnpm aktualisiert |
| 1.4 | 2025-11-10 | Tech Team | Ultracite Re-Added: Ultracite wieder eingeführt als AI-powered Code Review (komplementär zu ESLint/Prettier), ideal für AI-Agent-Workflows, keine Konfiguration nötig, GitHub App Integration |
| 1.5 | 2025-11-10 | Tech Team | YAGNI-Optimierung Testing: Testing-Strategie radikal fokussiert (Priorität 1: E2E Happy Paths für Eltern-Funnel + Institutionen-Formular, Priorität 2: Unit-Tests nur für Zod-Schemas, Phase 5: Umfassende Testabdeckung), Coverage-Ziel entfernt |
| 1.6 | 2025-11-10 | Tech Team | Meta Ads Integration: Hybrid Tracking-Strategie definiert (Meta Pixel + Conversions API via PostHog native Destinations), Event-Deduplizierung über client-generierte event_id, DSGVO-konforme Implementierung beschrieben, Environment Variables aktualisiert |

---

**Related Documents:**
- [Roadmap](.spec-workflow/steering/roadmap.md)
- [Product Steering](.spec-workflow/steering/product.md)
- [Structure Steering](.spec-workflow/steering/structure.md)
