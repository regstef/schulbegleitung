# Design Document: Foundation Setup

## Overview

The Foundation Setup establishes the complete technical infrastructure for the Decari MVP. This design document translates the 12 requirements into concrete technical decisions, file structures, configurations, and implementation patterns that will serve as the foundation for all subsequent feature development.

**Scope:** This is a greenfield project setup with no existing codebase. All components, configurations, and patterns defined here will be the initial implementation. Future features will leverage and extend these foundations.

**Key Design Principle:** YAGNI (You Aren't Gonna Need It) - We implement only what's needed for the MVP. No premature abstractions, no unused frameworks, no "future-proofing" beyond what the steering documents explicitly require.

## Steering Document Alignment

### Technical Standards (tech.md)

**Stack Adherence:**
- ✅ Next.js 15+ with App Router (not Pages Router)
- ✅ React 19+ (with Server Components as default)
- ✅ TypeScript 5.3+ (strict mode enabled)
- ✅ Tailwind CSS 4.0+ (no other CSS frameworks)
- ✅ pnpm 8+ as package manager (not npm or yarn)
- ✅ shadcn/ui exclusively (no Material-UI, Chakra, or other UI libraries)
- ✅ Prisma 5.7+ with Vercel Postgres (not Drizzle, not Supabase)
- ✅ Zod 3.22+ for validation (not Yup, not Joi)
- ✅ React Hook Form 7.5+ (not Formik)
- ✅ Vitest 1.0+ for unit tests (not Jest)
- ✅ Playwright 1.40+ for E2E tests

**Quality Tools:**
- ESLint + Prettier (standard configs, no custom rules in MVP)
- Ultracite AI code review (GitHub App, no config needed)
- No Sentry in MVP (console.log sufficient per tech.md v1.5)

**Database Schema:**
- Implements minimal MVP schema from `tech.md` lines 317-352
- Lead model (11 fields + indexes)
- Appointment model (8 fields + indexes)
- No additional models in foundation (YAGNI principle)

**Analytics:**
- PostHog client-only (no server SDK in MVP)
- EU region (eu.posthog.com)
- Event tracking only (no session recording, heatmaps, feature flags per tech.md v1.6)
- Meta Ads integration via PostHog Dashboard (no code changes in foundation)

### Project Structure (structure.md)

**Directory Organization (structure.md "Directory Organization"):**
```
schulbegleitung/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Route group (placeholder structure)
│   ├── (funnel)/           # Route group (placeholder structure)
│   ├── api/                # API routes (placeholder)
│   ├── layout.tsx          # Root layout (implemented)
│   ├── page.tsx            # Home page (temporary/placeholder)
│   ├── not-found.tsx       # 404 page
│   └── error.tsx           # Error boundary
│
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (8 base components)
│   │   └── forms/          # Form components
│   │       └── text-input.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   └── client.ts   # Prisma singleton
│   │   ├── forms/
│   │   │   └── schemas/
│   │   │       ├── common.ts
│   │   │       └── lead-schema.ts
│   │   ├── analytics/
│   │   │   └── posthog.ts
│   │   ├── utils/
│   │   │   └── cn.ts       # clsx + tailwind-merge
│   │   └── env.ts          # Type-safe env validation
│   │
│   └── types/
│       └── index.ts        # Shared types (if needed)
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history (versioned in git)
│
├── tests/
│   ├── unit/
│   │   └── schemas/
│   │       └── lead-schema.test.ts
│   └── e2e/
│       └── home.spec.ts
│
├── public/                 # Static assets
│   └── ... (fonts, images)
│
├── .env.example            # Documented env vars
├── .env.local              # Actual env vars (not in git)
├── .gitignore
├── .editorconfig
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── README.md
```

**Naming Conventions (structure.md "Naming Conventions"):**
- Files: `kebab-case.tsx` (e.g., `lead-schema.ts`, `text-input.tsx`)
- Components: `PascalCase` (e.g., `TextInput`, `RootLayout`)
- Functions: `camelCase` (e.g., `validatePlz`, `submitLead`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `API_BASE_URL`)
- Types/Interfaces: `PascalCase`, no prefix (e.g., `LeadInput`, not `ILeadInput`)

## Code Reuse Analysis

**Note:** This is a greenfield setup. There is no existing codebase to reuse. However, we establish patterns that future features will reuse:

### Patterns Established (for future reuse)

**Validation Pattern:**
- All Zod schemas in `src/lib/forms/schemas/`
- Common validators exported from `common.ts` (reusable across features)
- Each entity gets its own schema file (e.g., `lead-schema.ts`, `appointment-schema.ts`)

**Form Component Pattern:**
- Reusable form components in `src/components/forms/`
- All use React Hook Form + Zod resolver
- All integrate with `useFormContext` for nested forms
- All display inline validation errors

**Database Access Pattern:**
- Single Prisma client instance in `src/lib/db/client.ts`
- Future query helpers in `src/lib/db/queries.ts` (not created in foundation)
- All database operations use Prisma (no raw SQL)

**Utility Pattern:**
- Small, focused utilities in `src/lib/utils/`
- `cn()` helper for className merging (used in all components)
- Future utilities follow same pattern (one file per concern)

### Integration Points (for future features)

**Database:**
- Lead model ready for API routes (future: `/api/leads/submit`)
- Appointment model ready for cal.com webhook integration
- Indexes optimized for common queries (email lookup, timeSlot filtering)

**Analytics:**
- PostHog initialized and ready for custom events
- Event capture helper available: `posthog.capture(eventName, props)`
- Consent management ready (checks before tracking)

**UI Components:**
- 8 shadcn/ui base components ready for composition
- TextInput form component as template for other form inputs
- Tailwind theme ready for consistent styling

## Architecture

### Overall Architecture Pattern: **Hybrid SSG/SSR with Server Components**

Following `tech.md` "Application Architecture":
- Server Components by default (performance, SEO)
- Client Components only when needed (interactivity, hooks)
- API Routes for webhooks and data mutations
- Static generation where possible (ISR for content)

### Layered Architecture

```mermaid
graph TD
    subgraph "Presentation Layer (app/)"
        A[Root Layout] --> B[Page Components]
        B --> C[Route Groups]
    end

    subgraph "Component Layer (src/components/)"
        D[UI Primitives<br/>shadcn/ui] --> E[Form Components]
        E --> F[Feature Components<br/>future]
    end

    subgraph "Business Logic Layer (src/lib/)"
        G[Validation<br/>Zod Schemas] --> H[Database<br/>Prisma Client]
        I[Analytics<br/>PostHog] --> J[Utilities<br/>Helpers]
    end

    subgraph "Data Layer (prisma/)"
        K[Schema<br/>Prisma Models] --> L[Database<br/>Postgres]
    end

    B --> D
    B --> G
    E --> G
    F --> G
    F --> I
    H --> K

    style A fill:#e1f5e1
    style K fill:#e3f2fd
    style G fill:#fff4e6
```

### Modular Design Principles

**Single File Responsibility:**
- `lead-schema.ts` only defines Lead validation (not Appointment, not Institution)
- `posthog.ts` only handles PostHog initialization (not Meta Ads, not GA4)
- `text-input.tsx` only implements text input form field (not select, not textarea)

**Component Isolation:**
- shadcn/ui components in `src/components/ui/` (never modified directly)
- Custom form components in `src/components/forms/` (compose shadcn primitives)
- Future feature components in `src/components/[feature]/` (e.g., `src/components/funnel/`)

**Service Layer Separation:**
- Data access: `src/lib/db/` (Prisma queries, no business logic)
- Validation: `src/lib/forms/schemas/` (pure validation, no side effects)
- Analytics: `src/lib/analytics/` (tracking only, no business logic)
- Utilities: `src/lib/utils/` (pure functions, no dependencies)

**Utility Modularity:**
- One utility file per concern (e.g., `cn.ts` for className merging only)
- Future utilities: `date-helpers.ts`, `format-helpers.ts` (not created in foundation per YAGNI)

## Components and Interfaces

### 1. Root Layout (`app/layout.tsx`)

**Purpose:** Provides root HTML structure, global styles, font loading, and PostHog initialization.

**Interfaces:**
```typescript
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element
```

**Responsibilities:**
- Load Inter font via `next/font/google`
- Apply Tailwind global styles
- Initialize PostHog on client-side
- Set HTML metadata (title, description)

**Dependencies:**
- `next/font/google` (font loading)
- `src/lib/analytics/posthog.ts` (analytics initialization)
- `app/globals.css` (Tailwind directives)

**Reuses:** N/A (first component in project)

---

### 2. Prisma Client (`src/lib/db/client.ts`)

**Purpose:** Provides a singleton Prisma Client instance with hot-reload handling for development.

**Interfaces:**
```typescript
import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient

export { prisma }
```

**Responsibilities:**
- Instantiate PrismaClient
- Prevent multiple instances in development (hot reload issue)
- Use global variable to persist instance across HMR

**Pattern:**
```typescript
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Dependencies:**
- `@prisma/client` (generated from Prisma schema)

**Reuses:** N/A (foundational utility)

---

### 3. Zod Schemas (`src/lib/forms/schemas/`)

**Purpose:** Define reusable, type-safe validation schemas for all user inputs.

**Interfaces:**

**Common Validators (`common.ts`):**
```typescript
import { z } from 'zod'

export const plzSchema: z.ZodString
export const emailSchema: z.ZodString
export const phoneSchema: z.ZodString
export const nameSchema: z.ZodString
export const schoolTypeSchema: z.ZodEnum<[...]>
export const needTypeSchema: z.ZodEnum<[...]>
export const consentFlagsSchema: z.ZodObject<{...}>
```

**Lead Schema (`lead-schema.ts`):**
```typescript
import { z } from 'zod'

export const leadSchema: z.ZodObject<{
  email: z.ZodString
  name: z.ZodOptional<z.ZodString>
  phone: z.ZodOptional<z.ZodString>
  region: z.ZodString
  schoolType: z.ZodEnum
  needType: z.ZodEnum
  timeframe: z.ZodOptional<z.ZodEnum>
  contactMethod: z.ZodEnum
  consentFlags: z.ZodObject
  source: z.ZodOptional<z.ZodString>
  notes: z.ZodOptional<z.ZodString>
}>

export type LeadInput = z.infer<typeof leadSchema>
```

**Responsibilities:**
- Validate user input on both client and server
- Provide German error messages
- Infer TypeScript types from schemas

**Dependencies:**
- `zod` (validation library)

**Reuses:** Common validators composed into entity schemas

---

### 4. Form Components (`src/components/forms/text-input.tsx`)

**Purpose:** Reusable text input component integrated with React Hook Form and Zod validation.

**Interfaces:**
```typescript
interface TextInputProps {
  name: string
  label: string
  placeholder?: string
  helpText?: string
  required?: boolean
}

export const TextInput: React.ForwardRefExoticComponent<TextInputProps>
```

**Responsibilities:**
- Integrate with `useFormContext` from React Hook Form
- Display label, input field, help text
- Show validation errors inline
- Support required indicator (red asterisk)

**Dependencies:**
- `react-hook-form` (form context)
- `src/components/ui/input.tsx` (shadcn Input primitive)

**Reuses:**
- shadcn/ui Input component
- useFormContext hook

**Pattern:**
```tsx
const { register, formState: { errors } } = useFormContext()

return (
  <div>
    <label>{label} {required && <span>*</span>}</label>
    <Input {...register(name)} placeholder={placeholder} />
    {errors[name] && <p>{errors[name]?.message}</p>}
  </div>
)
```

---

### 5. PostHog Analytics (`src/lib/analytics/posthog.ts`)

**Purpose:** Initialize PostHog for event tracking with consent management.

**Interfaces:**
```typescript
export function initPostHog(): void
export function trackEvent(eventName: string, properties?: Record<string, any>): void
```

**Responsibilities:**
- Initialize PostHog with API key and host from environment
- Check for client-side execution (`typeof window !== 'undefined'`)
- Respect consent flags (only track if analytics consent given)
- Disable session recording, heatmaps, feature flags (MVP scope)
- Generate unique `event_id` for Meta Ads deduplication

**Pattern:**
```typescript
import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      session_recording: { enabled: false },
      autocapture: false,
      capture_pageview: true,
    })
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && hasAnalyticsConsent()) {
    posthog.capture(eventName, {
      event_id: crypto.randomUUID(), // For Meta Ads deduplication
      ...properties,
    })
  }
}
```

**Dependencies:**
- `posthog-js` (PostHog client SDK)

**Reuses:** N/A (foundational analytics setup)

---

### 6. Environment Variables (`src/lib/env.ts`)

**Purpose:** Type-safe access to environment variables with build-time validation.

**Interfaces:**
```typescript
export const env: {
  DATABASE_URL: string
  NEXT_PUBLIC_POSTHOG_KEY: string
  NEXT_PUBLIC_POSTHOG_HOST: string
  NEXT_PUBLIC_CAL_LINK: string
  CAL_WEBHOOK_SECRET: string
  N8N_WEBHOOK_URL: string
  N8N_WEBHOOK_SECRET?: string
}
```

**Implementation Note (from requirements):**
- Can use `@t3-oss/env-nextjs` for best-practice implementation
- Validates required vars at build time
- Provides clear error messages if vars are missing

**Pattern (with @t3-oss/env-nextjs):**
```typescript
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    CAL_WEBHOOK_SECRET: z.string().min(1),
    N8N_WEBHOOK_URL: z.string().url(),
    N8N_WEBHOOK_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
    NEXT_PUBLIC_CAL_LINK: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    // ... map all vars
  },
})
```

**Dependencies:**
- `@t3-oss/env-nextjs` (optional, recommended)
- `zod` (validation)

**Reuses:** Zod schemas for validation

---

### 7. shadcn/ui Components (`src/components/ui/`)

**Purpose:** Provide accessible, customizable UI primitives (8 base components for MVP).

**Components:**
1. `button.tsx` - Button with variants (default, destructive, outline, ghost, link)
2. `card.tsx` - Card container with header, content, footer
3. `input.tsx` - Text input field
4. `label.tsx` - Form label
5. `dialog.tsx` - Modal dialog
6. `select.tsx` - Dropdown select
7. `checkbox.tsx` - Checkbox input
8. `radio-group.tsx` - Radio button group

**Interfaces:** Each component exports its own props interface (generated by shadcn CLI).

**Customization:**
- All components use Tailwind CSS variables from `globals.css`
- Theme colors applied via CSS custom properties
- No modifications to component code (extend via composition)

**Dependencies:**
- `@radix-ui/*` (accessible primitives)
- `class-variance-authority` (variant styling)
- `src/lib/utils/cn.ts` (className merging)

**Reuses:** CN utility for className composition

---

### 8. CN Utility (`src/lib/utils/cn.ts`)

**Purpose:** Merge Tailwind class names with proper precedence handling.

**Interfaces:**
```typescript
import { type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string
```

**Implementation:**
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage Example:**
```tsx
<Button className={cn("base-classes", isActive && "active-classes", className)}>
```

**Dependencies:**
- `clsx` (conditional classes)
- `tailwind-merge` (deduplicates Tailwind classes)

**Reuses:** N/A (foundational utility)

## Data Models

### 1. Lead Model (Prisma Schema)

**Purpose:** Store lead information from intake funnel before passing to n8n.

**Schema:**
```prisma
model Lead {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  phone         String?
  region        String   // PLZ (5 digits)
  schoolType    String   // enum: grundschule, gymnasium, etc.
  needType      String   // enum: lernfoerderung, sozial-emotional, etc.
  timeframe     String?  // enum: sofort, 1-3-monate, etc.
  contactMethod String   // enum: termin, rueckruf, email
  source        String?  // utm_source
  consentFlags  Json     // {essentiell: true, analytics: boolean}
  notes         String?  // optional notes (max 500 chars)
  n8nProcessed  Boolean  @default(false)
  n8nJobId      String?  // reference to n8n execution
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([email])
  @@index([createdAt])
}
```

**Field Constraints:**
- `email`: Unique, validated with Zod emailSchema
- `region`: 5-digit PLZ, validated with Zod plzSchema
- `schoolType`: Must match schoolTypeSchema enum
- `needType`: Must match needTypeSchema enum
- `consentFlags`: JSON object with essentiell (always true) and analytics (boolean)
- `notes`: Max 500 characters (validated in Zod schema)

**Indexes:**
- `email`: Fast lookup for deduplication checks
- `createdAt`: Efficient querying by date range

**Usage:**
- Created in API route `/api/leads/submit` (future implementation)
- Passed to n8n webhook after DB save
- Dedupe check: query by email before insert

---

### 2. Appointment Model (Prisma Schema)

**Purpose:** Store booking information from cal.com webhooks.

**Schema:**
```prisma
model Appointment {
  id              String   @id @default(cuid())
  leadEmail       String   // FK to Lead (not enforced for simplicity)
  calBookingId    String   @unique
  calEventId      String
  timeSlot        DateTime
  status          String   // enum: booked, confirmed, cancelled, no_show
  rescheduleCount Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([leadEmail])
  @@index([timeSlot])
}
```

**Field Constraints:**
- `calBookingId`: Unique identifier from cal.com
- `leadEmail`: Links to Lead (soft FK, not enforced)
- `status`: Enum-like string (not Prisma enum for flexibility)
- `rescheduleCount`: Incremented on each reschedule event

**Indexes:**
- `leadEmail`: Link appointments to leads
- `timeSlot`: Query appointments by date range

**Usage:**
- Created in API route `/api/webhooks/cal-booking` (future implementation)
- Updated on reschedule/cancel events from cal.com
- No direct JOIN with Lead (queried separately by email)

## Error Handling

### Error Scenarios

#### 1. Missing Environment Variables

**Description:** Required environment variables are not set or invalid.

**Handling:**
- `src/lib/env.ts` validates all env vars at build time
- If missing or invalid: **build fails** with clear error message
- Error message format: `Missing environment variable: DATABASE_URL`

**User Impact:**
- Developer sees build error immediately
- Cannot deploy without fixing (Vercel deploy will fail)
- Clear guidance on which vars are missing

**Prevention:**
- `.env.example` documents all required vars
- Build-time validation (not runtime)

---

#### 2. Database Connection Failure

**Description:** Cannot connect to Postgres database (wrong URL, network issue, etc.).

**Handling:**
- Prisma Client throws `PrismaClientInitializationError`
- API routes return 500 Internal Server Error
- Error logged to console (MVP: no Sentry)

**User Impact:**
- API calls fail with generic error message
- Frontend shows error state (future implementation)

**Recovery:**
- Check DATABASE_URL in environment
- Verify Vercel Postgres is running
- Restart app/deployment

---

#### 3. Zod Validation Failure (Client-Side)

**Description:** User submits invalid form data (e.g., invalid PLZ, missing required field).

**Handling:**
- React Hook Form + Zod resolver catches errors before submission
- Inline error messages displayed below invalid fields
- Submit button disabled until form is valid

**User Impact:**
- Immediate feedback on invalid input
- Clear, German error messages (e.g., "Bitte geben Sie eine gültige 5-stellige PLZ ein")
- Cannot submit form until valid

**Prevention:**
- Real-time validation as user types
- Required field indicators (red asterisk)

---

#### 4. Zod Validation Failure (Server-Side / API Route)

**Description:** API receives invalid data (bypassed client validation or direct API call).

**Handling:**
- API route validates with Zod schema
- On error: return `{ error: zodError.errors }` with 400 Bad Request
- Log error to console

**User Impact:**
- API returns structured error response
- Frontend displays error message (future implementation)

**Prevention:**
- Always validate on server even if client validates
- Treat client validation as UX enhancement, not security

---

#### 5. PostHog Initialization Failure

**Description:** PostHog fails to initialize (invalid API key, network block, etc.).

**Handling:**
- Fail silently (non-critical for core functionality)
- Check `posthog.isFeatureEnabled()` before capturing events
- Log error to console (not user-visible)

**User Impact:**
- No impact on core functionality
- Events not tracked (invisible to user)

**Recovery:**
- Check NEXT_PUBLIC_POSTHOG_KEY in environment
- Verify PostHog endpoint is reachable
- Check browser console for errors

---

#### 6. Prisma Migration Failure

**Description:** Migration cannot be applied (schema conflict, DB locked, etc.).

**Handling:**
- `prisma migrate deploy` fails in CI/CD
- Deployment blocked (Vercel build fails)
- Error message shows SQL error details

**User Impact:**
- No user impact (fails before deployment)
- Developer must fix migration before deploying

**Recovery:**
- Review migration file in `prisma/migrations/`
- Fix schema conflicts
- Test migration locally before deploying

## Testing Strategy

Following the YAGNI-focused testing strategy from `tech.md` v1.5:

### Unit Testing (Vitest) - Validation Only

**Scope:** Critical validation logic (Zod schemas)

**Tests to Implement:**
```
tests/unit/schemas/lead-schema.test.ts
  ✓ Valid lead data passes validation
  ✓ Invalid email fails with correct error message
  ✓ Invalid PLZ (4 digits) fails
  ✓ Invalid PLZ (letters) fails
  ✓ Missing required fields fail
  ✓ Optional fields can be omitted
  ✓ consentFlags requires essentiell: true
  ✓ notes exceeding 500 chars fail
```

**Test Pattern:**
```typescript
import { describe, it, expect } from 'vitest'
import { leadSchema } from '@/lib/forms/schemas/lead-schema'

describe('leadSchema', () => {
  it('should validate a valid lead', () => {
    const validLead = {
      email: 'anna@example.com',
      region: '10115',
      schoolType: 'grundschule',
      needType: 'lernfoerderung',
      contactMethod: 'termin',
      consentFlags: { essentiell: true, analytics: true },
    }

    const result = leadSchema.safeParse(validLead)
    expect(result.success).toBe(true)
  })

  it('should fail on invalid PLZ', () => {
    const invalidLead = { /* ... */, region: '1234' } // 4 digits

    const result = leadSchema.safeParse(invalidLead)
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toContain('5-stellige PLZ')
  })
})
```

**Coverage Goal:** Zod schemas only (no coverage percentage target)

**Frequency:** Run in CI on every commit (`pnpm test`)

---

### Integration Testing - NONE in Foundation

**Rationale:** No API routes or database operations in foundation setup. Integration tests will be added with first feature (e.g., lead submission).

**Future Scope (Phase 5):**
- API route `/api/leads/submit` with mocked database
- Database queries with test fixtures

---

### End-to-End Testing (Playwright) - Minimal

**Scope:** Verify basic setup and home page rendering.

**Test to Implement:**
```
tests/e2e/home.spec.ts
  ✓ Home page loads successfully
  ✓ Displays "Decari MVP" heading
  ✓ Has no console errors
```

**Test Pattern:**
```typescript
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Decari/)
  await expect(page.locator('h1')).toContainText('Decari MVP')
})

test('no console errors on load', async ({ page }) => {
  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  await page.goto('/')
  expect(errors).toHaveLength(0)
})
```

**Frequency:** Manual before production deploy (not in CI for MVP)

**Browsers:** Chromium + Mobile Chrome only (per tech.md v1.5)

---

### Component Testing - NONE in Foundation

**Rationale:** Per tech.md v1.5, component tests are deferred to Phase 5. Foundation setup establishes the testing infrastructure (Vitest config) but no component tests are written.

**Future Scope (Phase 5):**
- Form components (TextInput, SelectInput, etc.)
- Wizard step components
- Error/success states

---

### Testing Infrastructure (Established in Foundation)

**Files Created:**
- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- `tests/unit/` directory structure
- `tests/e2e/` directory structure
- Example unit test (lead-schema.test.ts)
- Example E2E test (home.spec.ts)

**npm Scripts:**
- `pnpm test` - Run unit tests (watch mode)
- `pnpm test:coverage` - Generate coverage report
- `pnpm e2e` - Run E2E tests (headless)
- `pnpm e2e:ui` - Run E2E tests with UI

**Dependencies Installed:**
- vitest, @testing-library/react, @testing-library/jest-dom
- playwright

## Configuration Files

### 1. `package.json`

**Key Fields:**
- `packageManager`: "pnpm@8.15.0" (enforces pnpm)
- `scripts`: 18 scripts for dev, build, test, db operations
- `dependencies`: Production dependencies (Next.js, React, Prisma, Zod, etc.)
- `devDependencies`: Dev tools (TypeScript, ESLint, Prettier, Vitest, Playwright)

**Script Naming Convention:**
- `dev`, `build`, `start` - Next.js standard
- `lint`, `format` - Code quality
- `test`, `e2e` - Testing
- `db:*` - Database operations (Prisma)

---

### 2. `tsconfig.json`

**Key Config:**
- `strict: true` - Strict TypeScript mode
- `target: "ES2022"` - Modern JS features
- `lib: ["ES2022", "DOM"]` - Browser + modern JS APIs
- `jsx: "preserve"` - Next.js handles JSX
- `moduleResolution: "bundler"` - Next.js requirement
- `paths`: Path aliases (`@/*` → `./src/*`)

**Path Aliases:**
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/types/*": ["./src/types/*"]
  }
}
```

---

### 3. `tailwind.config.ts`

**Custom Theme:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...', // 10 shades
          // ...
          950: '#...',
        },
        secondary: { /* ... */ },
        accent: { /* ... */ },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'theme-sm': '0.25rem',
        'theme-md': '0.5rem',
        'theme-lg': '1rem',
      },
    },
  },
  plugins: [],
}
```

**CSS Variables (globals.css):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: 210 100% 50%;
    --color-secondary: 140 60% 45%;
    --color-accent: 25 95% 50%;
  }
}
```

---

### 4. `.eslintrc.json`

**Configuration:**
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {}
}
```

**Rationale:** Standard Next.js config, no custom rules in MVP (KISS principle)

---

### 5. `.prettierrc`

**Configuration:**
```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

### 6. `.editorconfig`

**Configuration:**
```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

---

### 7. `.gitignore`

**Key Exclusions:**
```
# Dependencies
node_modules/

# Next.js build output
.next/
out/

# Environment variables
.env
.env.local
.env*.local

# OS files
.DS_Store

# Logs
*.log

# IMPORTANT: prisma/migrations/ is NOT ignored (must be in git)
```

---

### 8. `.env.example`

**Documented Variables:**
```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/decari_dev"

# PostHog (Analytics + Meta Integration)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://eu.posthog.com"

# Meta Ads (configured in PostHog Dashboard, no env vars needed)

# cal.com
NEXT_PUBLIC_CAL_LINK="https://cal.com/decari/erstberatung"
CAL_WEBHOOK_SECRET="whsec_..."

# n8n
N8N_WEBHOOK_URL="https://n8n.decari.de/webhook/lead-submit"
N8N_WEBHOOK_SECRET="whsec_..."  # Optional
```

## Implementation Sequence

**Order of Implementation (Optimized for TDD-like Flow with Immediate Feedback Loops):**

1. **Project Initialization**
   - Run `pnpm create next-app@latest`
   - Configure package.json, tsconfig.json
   - Install core dependencies

2. **Configuration Files**
   - .editorconfig, .gitignore, .env.example
   - ESLint, Prettier configs

3. **Testing Infrastructure** *(Moved up for TDD-light approach)*
   - Configure Vitest and Playwright
   - Create test directory structure
   - **Benefit:** Enables writing tests immediately when schemas are created (Step 8)

4. **Basic Routing** *(Moved up for immediate runnable app)*
   - Create app/layout.tsx
   - Create app/page.tsx (temporary home)
   - Create app/not-found.tsx
   - Create app/error.tsx
   - Create route group directories
   - **Benefit:** After this step, `pnpm dev` starts a working app. All subsequent components can be visually tested immediately.

5. **Tailwind CSS Setup**
   - Install Tailwind 4.0+
   - Configure tailwind.config.ts
   - Create globals.css with theme

6. **shadcn/ui Setup**
   - Run `pnpm dlx shadcn-ui@latest init`
   - Install 8 base components
   - Create cn() utility

7. **Database Setup**
   - Create prisma/schema.prisma
   - Define Lead and Appointment models
   - Run initial migration
   - Create prisma client singleton

8. **Validation Schemas**
   - Create common.ts with reusable validators
   - Create lead-schema.ts
   - **Write unit tests immediately:** `tests/unit/schemas/lead-schema.test.ts` (testing infrastructure already available from Step 3)

9. **Form Components**
   - Create TextInput component
   - Integrate with React Hook Form
   - **Visual validation:** Render TextInput on `page.tsx` and test in browser (app is running from Step 4)

10. **Environment Variables**
    - Create .env.local (from .env.example)
    - Create src/lib/env.ts with validation

11. **Analytics Setup**
    - Create src/lib/analytics/posthog.ts
    - Initialize in RootLayout

12. **README & Documentation**
    - Update README.md with setup instructions
    - Document npm scripts
    - Add development workflow guide

**Total Estimated Files:** ~40 files (including config files, components, tests)

**Critical Path:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 (everything else can be parallelized after this)

**Advantage of this Sequence:**
- **Immediate Feedback Loops:** After Step 4, there's a running app where every new component can be integrated and tested visually.
- **TDD-Light Approach:** Test infrastructure available early (Step 3), enabling tests to be written alongside or before implementation.
- **Agile & Iterative:** No long stretches of "invisible" configuration work. Each step produces visible, testable results.
