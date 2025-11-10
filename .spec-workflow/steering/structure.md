# Project Structure: Decari MVP

**Version:** 1.0
**Date:** 2025-11-10
**Status:** Active
**Owner:** Tech Lead

---

## Directory Organization

### Standard Next.js Application Structure

```
schulbegleitung/
├── app/                              # Next.js App Router
│   ├── (marketing)/                  # Route Group: Public pages
│   │   ├── page.tsx                  # Landing page (/)
│   │   ├── begleitung-erhalten/      # Main Eltern-Landingpage
│   │   │   └── page.tsx
│   │   ├── ratgeber/                 # Content Hub
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx       # Dynamic blog posts
│   │   ├── schulen/                  # Institutions-Seiten
│   │   │   └── page.tsx
│   │   ├── traeger/
│   │   │   └── page.tsx
│   │   ├── dienstleister/
│   │   │   └── page.tsx
│   │   ├── kontakt/
│   │   │   └── page.tsx
│   │   └── ueber-uns/
│   │       └── page.tsx
│   │
│   ├── (funnel)/                     # Route Group: Intake funnel
│   │   ├── intake/                   # Unified Intake-Funnel
│   │   │   ├── [step]/page.tsx       # Dynamic step routes
│   │   │   └── result/page.tsx       # Result screen
│   │   └── booking/                  # Booking flow (optional)
│   │       └── page.tsx
│   │
│   ├── api/                          # API Routes
│   │   ├── leads/
│   │   │   └── submit/route.ts       # Lead submission
│   │   ├── webhooks/
│   │   │   ├── form-submit/route.ts
│   │   │   └── cal-booking/route.ts
│   │   └── email-templates/
│   │       └── route.ts
│   │
│   ├── layout.tsx                    # Root layout
│   ├── not-found.tsx                 # 404 page
│   └── error.tsx                     # Error boundary
│
├── src/                              # Source code
│   ├── components/                   # React Components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── forms/                    # Form components
│   │   │   ├── text-input.tsx
│   │   │   ├── select-input.tsx
│   │   │   ├── radio-group.tsx
│   │   │   └── checkbox-input.tsx
│   │   ├── templates/                # Page templates
│   │   │   └── institution-page-template.tsx
│   │   ├── marketing/                # Marketing components
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   └── testimonials.tsx
│   │   ├── funnel/                   # Funnel components
│   │   │   ├── intake-wizard.tsx
│   │   │   ├── step-indicator.tsx
│   │   │   └── steps/
│   │   │       ├── plz-step.tsx
│   │   │       ├── schulform-step.tsx
│   │   │       └── ...
│   │   └── layout/                   # Layout components
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── nav.tsx
│   │
│   ├── lib/                          # Utilities & Config
│   │   ├── db/                       # Database utilities
│   │   │   ├── client.ts             # Prisma client
│   │   │   └── queries.ts            # Reusable queries
│   │   ├── forms/                    # Form logic & schemas
│   │   │   ├── schemas/
│   │   │   │   ├── lead-schema.ts
│   │   │   │   ├── appointment-schema.ts
│   │   │   │   └── common.ts
│   │   │   └── validation-helpers.ts
│   │   ├── content/                  # Content objects (TypeScript)
│   │   │   ├── institutions/
│   │   │   │   ├── schulen-content.ts
│   │   │   │   ├── traeger-content.ts
│   │   │   │   └── dienstleister-content.ts
│   │   │   └── institution-page-content.ts  # Type definitions
│   │   ├── utils/                    # Helper functions
│   │   │   ├── date-helpers.ts
│   │   │   ├── format-helpers.ts
│   │   │   └── cn.ts                 # className utility
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── use-intake-state.ts
│   │   │   └── use-consent.ts
│   │   ├── api/                      # API client functions
│   │   │   ├── lead.ts
│   │   │   └── appointment.ts
│   │   └── constants.ts              # App constants
│   │
│   └── types/                        # TypeScript types
│       ├── api.ts                    # API types
│       ├── content.ts                # Content types
│       ├── lead.ts
│       ├── appointment.ts
│       └── index.ts
│
├── prisma/                           # Prisma (Database)
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration files
│   └── seed.ts                       # Seed script
│
├── content/                          # MDX Content (Contentlayer)
│   ├── ratgeber/                     # Blog posts
│   │   ├── was-ist-schulbegleitung.mdx
│   │   └── ...
│   └── pages/                        # Static page content
│
├── public/                           # Static Assets
│   ├── images/
│   ├── fonts/
│   └── robots.txt
│
├── .spec-workflow/                   # Specification docs
│   ├── steering/
│   ├── specs/
│   ├── approvals/
│   ├── archive/
│   └── templates/
│
├── docs/                             # Project documentation
│   ├── project-plan.md
│   └── architecture.md
│
├── .github/                          # GitHub config
│   └── workflows/
│       └── ci.yml
│
├── contentlayer.config.ts            # Contentlayer config
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── .eslintrc.json                    # ESLint config
├── .prettierrc                       # Prettier config
├── .gitignore
├── .editorconfig
├── package.json                      # Dependencies
├── package-lock.json
└── README.md
```

---

## Naming Conventions

### Files & Directories

#### Components (React)
- **Format:** `kebab-case.tsx`
- **Examples:**
  - `intake-wizard.tsx`
  - `booking-calendar.tsx`
  - `consent-banner.tsx`

**Rationale:** Lowercase, URL-friendly, consistent with Next.js file routing

#### Server Components vs. Client Components
- **Server (default):** No special naming
- **Client:** Add `"use client"` directive at top of file

**Example:**
```tsx
// components/funnel/intake-wizard.tsx
"use client"  // Client component (uses hooks)

export function IntakeWizard() { ... }
```

#### Utility Files
- **Format:** `kebab-case.ts`
- **Examples:**
  - `date-helpers.ts`
  - `form-validation.ts`
  - `api-client.ts`

#### Types/Interfaces
- **Format:** `kebab-case.ts`
- **Examples:**
  - `lead.ts`
  - `appointment.ts`
  - `funnel-config.ts`

#### API Routes (Next.js)
- **Format:** `kebab-case/route.ts`
- **Examples:**
  - `api/webhooks/form-submit/route.ts`
  - `api/email-templates/route.ts`

#### Content (MDX)
- **Format:** `kebab-case.mdx`
- **Examples:**
  - `was-ist-schulbegleitung.mdx`
  - `schulbegleitung-beantragen.mdx`

#### Configuration Files
- **Format:** `lowercase.config.ts` or `.lowercase`
- **Examples:**
  - `next.config.js`
  - `tailwind.config.ts`
  - `.prettierrc`

---

### Code (TypeScript/JavaScript)

#### Components
- **Format:** `PascalCase`
- **Examples:**
  ```tsx
  export function IntakeWizard() { ... }
  export function LeadForm() { ... }
  export function ConsentBanner() { ... }
  ```

#### Functions
- **Format:** `camelCase`
- **Examples:**
  ```ts
  function submitLead() { ... }
  function validatePlz() { ... }
  async function sendEmail() { ... }
  ```

#### Hooks
- **Format:** `useCamelCase`
- **Examples:**
  ```ts
  function useIntakeState() { ... }
  function useLeadMutation() { ... }
  function useConsent() { ... }
  ```

#### Constants
- **Format:** `UPPER_SNAKE_CASE`
- **Examples:**
  ```ts
  const MAX_INTAKE_STEPS = 5
  const DEFAULT_REGION = "10115"
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ```

#### Types & Interfaces
- **Format:** `PascalCase`
- **Prefix:** `I` for interfaces (optional), `T` for type aliases (optional)
- **Examples:**
  ```ts
  interface Lead { ... }
  type LeadInput = { ... }

  // Or with prefix (if team prefers):
  interface ILead { ... }
  type TLeadInput = { ... }
  ```

**Decision:** No prefix (cleaner), unless ambiguity arises

#### Enums
- **Format:** `PascalCase` (enum name), `PascalCase` (members)
- **Examples:**
  ```ts
  enum SchoolType {
    Grundschule = "grundschule",
    Gymnasium = "gymnasium",
    Realschule = "realschule",
  }
  ```

**Alternative:** Zod enums or const objects (preferred for better type inference)

```ts
const SCHOOL_TYPES = {
  GRUNDSCHULE: "grundschule",
  GYMNASIUM: "gymnasium",
  REALSCHULE: "realschule",
} as const

// Or Zod enum
const schoolTypeSchema = z.enum(["grundschule", "gymnasium", "realschule"])
type SchoolType = z.infer<typeof schoolTypeSchema>
```

---

## Import Patterns

### Import Order (Enforced by Prettier Plugin)

```tsx
// 1. React & Next.js
import { useState } from "react"
import Link from "next/link"

// 2. External dependencies (alphabetical)
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// 3. Local absolute imports (from project root)
import { Button } from "@/components/ui/button"
import { leadSchema } from "@/lib/forms/schemas/lead-schema"
import { db } from "@/lib/db/client"
import { submitLead } from "@/lib/api/lead"
import { IntakeStep } from "@/components/funnel/intake-step"

// 4. Relative imports
import { StepIndicator } from "./step-indicator"
import type { WizardProps } from "./types"

// 5. Styles (if using CSS Modules)
import styles from "./intake-wizard.module.css"
```

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],                           // src/*
      "@/components/*": ["./src/components/*"],     // src/components/*
      "@/lib/*": ["./src/lib/*"],                   // src/lib/*
      "@/types/*": ["./src/types/*"]                // src/types/*
    }
  }
}
```

**Beispiel-Imports:**
```tsx
// UI-Komponenten
import { Button } from "@/components/ui/button"
import { TextInput } from "@/components/forms/text-input"

// Forms & Schemas
import { leadSchema } from "@/lib/forms/schemas/lead-schema"
import { funnelConfig } from "@/lib/forms/funnel-config"

// Database
import { db } from "@/lib/db/client"

// Utilities
import { cn } from "@/lib/utils/cn"
import { formatDate } from "@/lib/utils/date-helpers"

// Types
import type { Lead } from "@/types/lead"
import type { InstitutionPageContent } from "@/lib/content/institution-page-content"
```

---

## Code Structure Patterns

### File Organization (React Components)

```tsx
// components/funnel/intake-wizard.tsx

// 1. Imports (see Import Order above)
import { useState } from "react"
import { useForm } from "react-hook-form"
// ...

// 2. Types & Interfaces (if not in separate file)
interface IntakeWizardProps {
  initialStep?: number
  onComplete: (data: LeadInput) => void
}

// 3. Constants (component-scoped)
const STEPS = [
  { id: "plz", label: "Postleitzahl" },
  { id: "schulform", label: "Schulform" },
  // ...
] as const

// 4. Helper functions (component-scoped)
function getNextStep(current: number): number {
  return Math.min(current + 1, STEPS.length - 1)
}

// 5. Main component
export function IntakeWizard({ initialStep = 0, onComplete }: IntakeWizardProps) {
  // Hooks at the top
  const [step, setStep] = useState(initialStep)
  const form = useForm({ ... })

  // Event handlers
  const handleNext = () => { ... }
  const handleBack = () => { ... }

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 6. Sub-components (if small and tightly coupled)
function StepIndicator({ current, total }: { current: number; total: number }) {
  return <div>{current + 1} / {total}</div>
}

// 7. Exports (default or named)
export default IntakeWizard  // if default export preferred
```

### API Route Organization

```ts
// app/api/webhooks/form-submit/route.ts

// 1. Imports
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@decari/database"
import { leadSchema } from "@decari/forms-kit/schemas"

// 2. Validation schema
const requestSchema = z.object({
  type: z.literal("lead_submit"),
  data: leadSchema,
  metadata: z.object({
    source: z.string(),
    timestamp: z.string().datetime(),
  }),
})

// 3. Helper functions
async function sendToN8N(data: LeadInput) {
  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("n8n webhook failed")
}

// 4. Route handlers
export async function POST(req: NextRequest) {
  try {
    // Parse & validate
    const body = await req.json()
    const validated = requestSchema.parse(body)

    // Check for duplicates
    const existing = await db.lead.findUnique({
      where: { email: validated.data.email },
    })
    if (existing) {
      return NextResponse.json({ error: "Duplicate lead" }, { status: 409 })
    }

    // Save to DB
    const lead = await db.lead.create({ data: validated.data })

    // Send to n8n
    await sendToN8N(validated.data)

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Form submit error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

// Rate limiting (optional, via middleware or edge config)
export const runtime = "edge"  // or "nodejs"
export const dynamic = "force-dynamic"
```

---

## Code Organization Principles

### 1. Single Responsibility Principle

Each file should have **one clear purpose**.

**Good:**
```
components/funnel/
├── intake-wizard.tsx       # Orchestrates wizard flow
├── plz-step.tsx            # PLZ input step
├── schulform-step.tsx      # Schulform selection step
└── result-screen.tsx       # Final result display
```

**Bad:**
```
components/
└── funnel.tsx              # 1000 lines, all steps in one file
```

### 2. Colocation

Keep related files close together.

**Good:**
```
components/funnel/
├── intake-wizard.tsx
├── intake-wizard.test.tsx   # Test next to component
├── intake-wizard.module.css # Styles next to component (if not using Tailwind)
└── types.ts                 # Types used only in this module
```

### 3. Composition over Inheritance

Prefer composing small components over complex inheritance hierarchies.

**Example:**
```tsx
// Good: Composition
<Form>
  <TextInput name="plz" />
  <SelectInput name="schulform" options={...} />
  <Button type="submit">Weiter</Button>
</Form>

// Avoid: Deep inheritance
class AdvancedForm extends BaseForm extends SuperForm { ... }
```

### 4. Abstraction Layers

Separate concerns into clear layers:

```
app/                  # Routing & Pages (thin, delegates to components)
  └── (funnel)/intake/[step]/page.tsx

components/           # UI Logic (presentation, user interaction)
  └── funnel/intake-wizard.tsx

lib/                  # Business Logic (validation, state management)
  └── funnels/intake-config.ts

packages/database/    # Data Layer (persistence, queries)
  └── src/lead.ts
```

---

## Forms Module (Detailed)

### Purpose

Zentrale Form-Logik, Components und Schemas in `src/lib/forms/` und `src/components/forms/` für **Konsistenz über alle Funnels**.

### Direkter Code-Ansatz (YAGNI-Prinzip)

**Für den MVP:** Keine abstrakten Konfigurationsdateien. Die Logik wird direkt in den Komponenten implementiert.

**Begründung:** Für einen einzigen, linearen MVP-Funnel ist eine Konfigurations-Abstraktion unnötiger Overhead. Ein direkter Ansatz ist einfacher zu lesen und zu implementieren.

### Implementierung

**Wizard-Komponente (`IntakeWizard`):**
- Die Logik und Reihenfolge der Funnel-Schritte wird direkt in der `<IntakeWizard>`-Komponente implementiert
- Als einfaches Array oder direkt in der JSX-Struktur
- Beispiel:
  ```tsx
  // src/components/funnel/intake-wizard.tsx
  const STEPS = [
    { id: "plz", component: PlzStep, title: "Ihre Region" },
    { id: "genehmigung", component: GenehmigungStep, title: "Genehmigungsstatus" },
    { id: "schulform", component: SchulformStep, title: "Schulform" },
    { id: "bedarf", component: BedarfStep, title: "Art des Bedarfs" },
    { id: "kontakt", component: KontaktStep, title: "Kontaktdaten" },
  ]
  ```

**Form-Komponenten:**
- Formular-Komponenten definieren ihre Props spezifisch und direkt
- Keine Vererbung von generischen Typen wie `BaseQuestion`
- Props sind explizit für den jeweiligen Use-Case definiert
- Beispiel:
  ```tsx
  // src/components/funnel/steps/plz-step.tsx
  interface PlzStepProps {
    value: string
    onChange: (value: string) => void
    onNext: () => void
    error?: string
  }
  ```

### Standard Form Components (Simplified)

```tsx
// src/components/forms/text-input.tsx

import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"

interface TextInputProps {
  name: string
  label: string
  placeholder?: string
  helpText?: string
  required?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, placeholder, helpText, required }, ref) => {
    const { register, formState: { errors } } = useFormContext()

    return (
      <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Input
          id={name}
          {...register(name)}
          ref={ref}
          placeholder={placeholder}
          aria-invalid={errors[name] ? "true" : "false"}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
        {errors[name] && (
          <p id={`${name}-error`} className="text-sm text-red-500">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    )
  }
)

TextInput.displayName = "TextInput"
```

### Standard Schemas (Reusable)

```tsx
// src/lib/forms/schemas/common.ts

import { z } from "zod"

// Reusable validators
export const plzSchema = z
  .string()
  .regex(/^\d{5}$/, "Bitte geben Sie eine gültige 5-stellige PLZ ein")

export const emailSchema = z
  .string()
  .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")

export const phoneSchema = z
  .string()
  .regex(/^(\+49|0)[1-9]\d{1,14}$/, "Bitte geben Sie eine gültige Telefonnummer ein")
  .optional()

export const nameSchema = z
  .string()
  .min(2, "Name muss mindestens 2 Zeichen lang sein")
  .max(100, "Name darf maximal 100 Zeichen lang sein")

// School types
export const schoolTypeSchema = z.enum([
  "grundschule",
  "gymnasium",
  "realschule",
  "gesamtschule",
  "foerderschule",
  "sonstige",
])

// Need types
export const needTypeSchema = z.enum([
  "lernfoerderung",
  "sozial-emotional",
  "koerperlich-motorisch",
  "mehrfachbedarf",
])

// Consent
export const consentFlagsSchema = z.object({
  essentiell: z.literal(true),  // always true
  analytics: z.boolean(),
})
```

```tsx
// src/lib/forms/schemas/lead-schema.ts

import { z } from "zod"
import {
  plzSchema,
  emailSchema,
  phoneSchema,
  nameSchema,
  schoolTypeSchema,
  needTypeSchema,
  consentFlagsSchema,
} from "./common"

export const leadSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  phone: phoneSchema,
  region: plzSchema,
  schoolType: schoolTypeSchema,
  needType: needTypeSchema,
  timeframe: z.enum(["sofort", "1-3-monate", "3-6-monate", "flexibel"]).optional(),
  contactMethod: z.enum(["termin", "rueckruf", "email"]),
  consentFlags: consentFlagsSchema,
  source: z.string().optional(),  // utm_source
  notes: z.string().max(500).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
```

---

## Module Boundaries

### Clear Separation of Concerns

```
┌──────────────────────────────────────────┐
│  app/  (Routing & Pages)                 │
│  - Next.js App Router                    │
│  - Route definitions                     │
│  - Page-level components (thin)          │
│  - API routes                            │
└──────────────────────────────────────────┘
              ↓ imports
┌──────────────────────────────────────────┐
│  src/components/  (UI Layer)             │
│  - React Components                      │
│  - UI primitives (shadcn/ui)             │
│  - Form components                       │
│  - Page templates                        │
│  - Layout components                     │
└──────────────────────────────────────────┘
              ↓ imports
┌──────────────────────────────────────────┐
│  src/lib/  (Business Logic Layer)        │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  forms/                          │   │
│  │  - Schemas (Zod)                 │   │
│  │  - Validation helpers            │   │
│  │  - No abstractions (direct code) │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  db/                             │   │
│  │  - Prisma client                 │   │
│  │  - Database queries              │   │
│  │  - No UI dependencies            │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  content/                        │   │
│  │  - TypeScript content objects    │   │
│  │  - Institutions page content     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  utils/                          │   │
│  │  - Helper functions              │   │
│  │  - Formatters                    │   │
│  │  - cn() utility                  │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
              ↓ imports
┌──────────────────────────────────────────┐
│  src/types/  (Type Definitions)          │
│  - Pure TypeScript types                 │
│  - No dependencies                       │
│  - Shared across all layers              │
└──────────────────────────────────────────┘
              ↓ imports
┌──────────────────────────────────────────┐
│  prisma/  (Data Layer)                   │
│  - Schema definitions                    │
│  - Migrations                            │
│  - Seed scripts                          │
└──────────────────────────────────────────┘
```

**Rules:**
- `app/` kann von allen `src/*` importieren
- `src/components/` kann von `src/lib/*` und `src/types/*` importieren
- `src/lib/*` kann von anderen `src/lib/*` Modulen importieren (aber keine UI-Komponenten)
- **Keine zirkulären Abhängigkeiten** (ESLint Plugin zur Prüfung)
- `src/types/` hat **keine Abhängigkeiten** (pure types)
- `src/lib/db/` hängt nur von `src/types/*` ab (keine UI)

---

## Code Size Guidelines

### File Size
- **Target:** <300 lines per file
- **Hard Limit:** 500 lines (trigger refactor)
- **Exception:** Config files (can be longer)

**If file exceeds limit:**
- Split into multiple files (e.g., separate component per step)
- Extract helper functions to utils
- Move types to separate `types.ts`

### Function/Method Size
- **Target:** <30 lines per function
- **Hard Limit:** 50 lines (consider breaking down)

**If function exceeds limit:**
- Extract sub-functions
- Use early returns to reduce nesting

### Class/Module Complexity
- **Cyclomatic Complexity:** <10 per function (Ultracite will flag)
- **Nesting Depth:** Max 4 levels

**Example (too nested):**
```tsx
// Bad: 5 levels of nesting
if (condition1) {
  if (condition2) {
    if (condition3) {
      if (condition4) {
        if (condition5) {
          // ...
        }
      }
    }
  }
}

// Good: Early returns
if (!condition1) return
if (!condition2) return
if (!condition3) return
// ...
```

---

## Documentation Standards

### Component Documentation (TSDoc)

```tsx
/**
 * Multi-step intake wizard for lead qualification.
 *
 * Guides users through PLZ, Schulform, Bedarf, and Kontakt steps.
 * Supports A/B testing via PostHog feature flags.
 *
 * @example
 * ```tsx
 * <IntakeWizard
 *   initialStep={0}
 *   onComplete={(data) => submitLead(data)}
 * />
 * ```
 *
 * @param props - Component props
 * @param props.initialStep - Starting step index (default: 0)
 * @param props.onComplete - Callback when wizard is completed
 */
export function IntakeWizard(props: IntakeWizardProps) { ... }
```

### Function Documentation

```tsx
/**
 * Validates a German PLZ (5 digits).
 *
 * @param plz - The postal code to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```ts
 * validatePlz("10115")  // true
 * validatePlz("1234")   // false
 * ```
 */
function validatePlz(plz: string): boolean {
  return /^\d{5}$/.test(plz)
}
```

### README per Package

Dokumentation für interne Module kann in Form von TSDoc-Kommentaren erfolgen.

---

## npm Scripts

### `package.json`

```json
{
  "name": "schulbegleitung",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@8.15.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^5.7.0",
    "react-hook-form": "^7.5.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.0.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "playwright": "^1.40.0",
    "prisma": "^5.7.0",
    "tsx": "^4.0.0"
  }
}
```

**Häufig verwendete Commands:**

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
pnpm type-check             # TypeScript type checking

# Testing
pnpm test                   # Run unit tests (watch mode)
pnpm test:coverage          # Generate coverage report
pnpm e2e                    # Run E2E tests (Playwright)

# Database
pnpm db:generate            # Generate Prisma client
pnpm db:migrate             # Create & apply migration
pnpm db:studio              # Open Prisma Studio
pnpm db:seed                # Seed database

# UI Components (shadcn/ui)
pnpm dlx shadcn-ui@latest add button    # Add shadcn component
pnpm dlx shadcn-ui@latest add card      # Add shadcn component
```

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-10 | Tech Team | Initial Structure Steering |
| 1.1 | 2025-11-10 | Tech Team | YAGNI-Simplification: Monorepo-Struktur entfernt, Standard Next.js-App-Struktur implementiert, Verzeichnisse von packages/* nach src/* verschoben, Import-Patterns vereinfacht, Module Boundaries aktualisiert, npm Scripts statt Turborepo |
| 1.2 | 2025-11-10 | Tech Team | Package Manager Update: pnpm Scripts, Tailwind 4 in Dependencies, shadcn/ui Commands hinzugefügt, packageManager field in package.json |
| 1.3 | 2025-11-10 | Tech Team | YAGNI-Optimierung: Formular-Architektur vereinfacht (funnel-config.ts und question-types.ts entfernt, direkter Code-Ansatz in IntakeWizard), Consent-Schema auf 2 Felder reduziert (essentiell + analytics) |
| 1.4 | 2025-11-10 | Tech Team | Finale YAGNI/KISS-Optimierung: Directory Organization aktualisiert (funnel-config.ts vollständig entfernt), Module Boundaries präzisiert (forms/ - No abstractions), Code-Beispiele für direkten Ansatz erweitert (STEPS-Array mit allen 5 Schritten, PlzStepProps-Beispiel) |

---

**Related Documents:**
- [Roadmap](.spec-workflow/steering/roadmap.md)
- [Product Steering](.spec-workflow/steering/product.md)
- [Tech Steering](.spec-workflow/steering/tech.md)
