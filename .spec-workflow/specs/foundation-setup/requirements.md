# Requirements Document: Foundation Setup

## Introduction

The Foundation Setup establishes the core technical infrastructure for the Decari MVP, a content and funnel website that helps parents, schools, and institutions find qualified school support services (Schulbegleitung). This foundation provides the essential project structure, build tools, database setup, validation schemas, UI component library, and basic configuration needed for all subsequent features.

**Purpose:** Create a production-ready Next.js application with TypeScript, Tailwind CSS 4, Prisma ORM, Zod validation, and shadcn/ui components that follows the architecture defined in the steering documents.

**Value:** Enables rapid feature development by providing a consistent, type-safe, and well-structured codebase that all team members and AI agents can build upon with confidence.

## Alignment with Product Vision

From `product.md`:
- **Primary Objective:** Enable rapid MVP launch with ≥100 qualified leads/month and ≥3% landing-to-lead conversion
- **Product Principle "Handlungsfähigkeit in <5 Minuten":** Fast, reliable technical foundation ensures quick page loads and smooth user experience
- **Product Principle "Datenbasierte Iteration":** Proper analytics setup (PostHog) from day one enables data-driven optimization

From `tech.md`:
- **Tech Stack:** Next.js 15+ (App Router), React 19+, TypeScript 5.3+, Tailwind CSS 4.0+, Prisma 5.7+, pnpm 8+
- **Design System:** shadcn/ui (exclusively), Tailwind custom theme, no other UI libraries
- **Database:** Vercel Postgres (Neon), Prisma ORM, minimal MVP schema (Lead, Appointment models)
- **Quality Tools:** ESLint, Prettier, Ultracite (AI code review), Vitest, Playwright

From `structure.md`:
- **Architecture:** Standard Next.js App Router structure (no monorepo)
- **Organization:** `app/`, `src/components/`, `src/lib/`, `src/types/`, `prisma/`
- **Naming:** kebab-case files, PascalCase components, camelCase functions

## Requirements

### Requirement 1: Project Initialization

**User Story:** As a developer, I want a properly initialized Next.js 15 project with pnpm and TypeScript, so that I can start building features immediately with modern tooling.

#### Acceptance Criteria

1. WHEN running `pnpm create next-app@latest` THEN the system SHALL create a Next.js 15+ project with App Router enabled
2. WHEN the project is initialized THEN the system SHALL use pnpm as the package manager (version 8+)
3. WHEN TypeScript is configured THEN the system SHALL use `tsconfig.json` with strict mode enabled and path aliases (`@/*` → `./src/*`)
4. WHEN dependencies are installed THEN the system SHALL include:
   - next@^15.0.0
   - react@^19.0.0
   - react-dom@^19.0.0
   - typescript@^5.3.0
5. WHEN the project structure is created THEN the system SHALL follow the standard Next.js App Router structure as defined in the "Directory Organization" section of `structure.md`

### Requirement 2: Tailwind CSS 4 Setup

**User Story:** As a developer, I want Tailwind CSS 4 configured with a custom theme, so that I can build UI components with consistent branding and design tokens.

#### Acceptance Criteria

1. WHEN Tailwind CSS is installed THEN the system SHALL use version 4.0 or higher
2. WHEN `tailwind.config.ts` is created THEN the system SHALL define custom theme extensions:
   - Brand colors (primary, secondary, accent with full shade ranges)
   - Typography scale (display, body font families)
   - Spacing system (consistent with 8px grid)
   - Border radius tokens (theme-sm, theme-md, theme-lg)
   - Shadow definitions
3. WHEN `globals.css` is configured THEN the system SHALL:
   - Include Tailwind directives (@tailwind base, components, utilities)
   - Define CSS custom properties for theme colors
   - Set base font size to 16px minimum (mobile-first, accessibility)
4. WHEN running `pnpm dev` THEN the system SHALL hot-reload Tailwind changes without full page refresh
5. IF Tailwind Prettier plugin is installed THEN class names SHALL be automatically sorted

### Requirement 3: shadcn/ui Component Library

**User Story:** As a developer, I want shadcn/ui components installed and configured, so that I can build accessible, customizable UI components without reinventing common patterns.

#### Acceptance Criteria

1. WHEN shadcn/ui is initialized THEN the system SHALL run `pnpm dlx shadcn-ui@latest init` with:
   - Style: Default
   - Base color: Slate (or custom from theme)
   - CSS variables: Yes
   - Components directory: `src/components/ui`
2. WHEN base components are installed THEN the system SHALL include at minimum:
   - button, card, input, label, dialog, select, checkbox, radio-group
3. WHEN a shadcn component is used THEN the system SHALL:
   - Apply Tailwind theme colors via CSS variables
   - Support all variants defined in the component (default, destructive, outline, ghost, link)
4. WHEN `src/lib/utils/cn.ts` is created THEN the system SHALL export a `cn` helper combining clsx + tailwind-merge
5. IF a component is customized THEN changes SHALL remain in `src/components/ui` (no modifications to node_modules)

### Requirement 4: Database Setup (Prisma + Postgres)

**User Story:** As a developer, I want Prisma configured with a minimal MVP schema, so that I can persist leads and appointments with type-safe queries.

#### Acceptance Criteria

1. WHEN Prisma is installed THEN the system SHALL include:
   - @prisma/client@^5.7.0
   - prisma@^5.7.0 (dev dependency)
2. WHEN `prisma/schema.prisma` is created THEN the system SHALL define:
   - datasource: postgresql with DATABASE_URL from env
   - generator: prisma-client-js
   - Models: Lead and Appointment (as per `tech.md` lines 317-352)
3. WHEN the Lead model is defined THEN the system SHALL include fields:
   - id (cuid), email (unique), name, phone, region (PLZ)
   - schoolType, needType, timeframe, contactMethod
   - consentFlags (Json with essentiell + analytics)
   - source, n8nProcessed, n8nJobId
   - createdAt, updatedAt
   - Indexes on email and createdAt
4. WHEN the Appointment model is defined THEN the system SHALL include fields:
   - id (cuid), leadEmail (string), calBookingId (unique), calEventId
   - timeSlot (DateTime), status, rescheduleCount
   - createdAt, updatedAt
   - Indexes on leadEmail and timeSlot
5. WHEN `src/lib/db/client.ts` is created THEN the system SHALL:
   - Export a singleton PrismaClient instance
   - Handle hot-reload in development (prevent multiple instances)
   - Use connection pooling (Prisma default)
6. WHEN running `pnpm db:generate` THEN Prisma Client SHALL be generated with full type safety
7. WHEN running `pnpm db:migrate` THEN migrations SHALL be created and applied to the database

### Requirement 5: Validation Schemas (Zod)

**User Story:** As a developer, I want reusable Zod schemas for common validations, so that I can validate user input consistently across frontend and backend.

#### Acceptance Criteria

1. WHEN Zod is installed THEN the system SHALL include zod@^3.22.0
2. WHEN `src/lib/forms/schemas/common.ts` is created THEN the system SHALL export:
   - plzSchema: 5-digit German postal code regex
   - emailSchema: valid email format
   - phoneSchema: German phone number format (optional)
   - nameSchema: 2-100 characters
   - schoolTypeSchema: enum of school types (grundschule, gymnasium, realschule, gesamtschule, foerderschule, sonstige)
   - needTypeSchema: enum of need types (lernfoerderung, sozial-emotional, koerperlich-motorisch, mehrfachbedarf)
   - consentFlagsSchema: object with essentiell (always true) and analytics (boolean)
3. WHEN `src/lib/forms/schemas/lead-schema.ts` is created THEN the system SHALL:
   - Import common schemas
   - Export leadSchema combining all lead fields
   - Export LeadInput type (inferred from leadSchema)
4. WHEN a schema is used in a form THEN the system SHALL provide German error messages (e.g., "Bitte geben Sie eine gültige PLZ ein")
5. WHEN a schema is used in an API route THEN validation errors SHALL return structured error objects (400 Bad Request)

### Requirement 6: Form Handling Setup (React Hook Form)

**User Story:** As a developer, I want React Hook Form configured with Zod resolver, so that I can build performant forms with automatic validation.

#### Acceptance Criteria

1. WHEN React Hook Form is installed THEN the system SHALL include:
   - react-hook-form@^7.5.0
   - @hookform/resolvers@^3.3.0
2. WHEN a form component uses `useForm` THEN the system SHALL:
   - Accept a Zod schema via zodResolver
   - Provide type-safe form data (inferred from schema)
   - Support uncontrolled inputs (minimal re-renders)
3. WHEN `src/components/forms/text-input.tsx` is created THEN the system SHALL:
   - Use forwardRef for input element
   - Integrate with useFormContext from react-hook-form
   - Display validation errors inline
   - Support required indicator (red asterisk)
   - Support helpText for additional context
4. WHEN a form is submitted THEN validation SHALL occur before the onSubmit handler is called
5. IF validation fails THEN error messages SHALL appear below the corresponding input field

### Requirement 7: Development Scripts & Configuration

**User Story:** As a developer, I want npm scripts for common tasks, so that I can run dev server, build, lint, format, test, and database operations with simple commands.

#### Acceptance Criteria

1. WHEN `package.json` is configured THEN the scripts section SHALL include:
   - `dev`: next dev (start dev server)
   - `build`: next build (production build)
   - `start`: next start (production server)
   - `lint`: next lint (ESLint)
   - `format`: prettier --write . (format code)
   - `format:check`: prettier --check . (CI check)
   - `type-check`: tsc --noEmit (TypeScript check)
   - `test`: vitest (unit tests)
   - `test:coverage`: vitest --coverage (coverage report)
   - `e2e`: playwright test (E2E tests)
   - `e2e:ui`: playwright test --ui (E2E with UI)
   - `db:generate`: prisma generate (generate client)
   - `db:migrate`: prisma migrate dev (create migration)
   - `db:migrate:deploy`: prisma migrate deploy (apply migrations)
   - `db:studio`: prisma studio (database GUI)
2. WHEN `package.json` is configured THEN the packageManager field SHALL be set to "pnpm@8.15.0"
3. WHEN `.editorconfig` is created THEN the system SHALL define:
   - indent_style = space
   - indent_size = 2
   - end_of_line = lf
   - charset = utf-8
   - trim_trailing_whitespace = true
   - insert_final_newline = true
4. WHEN `.gitignore` is configured THEN the system SHALL exclude standard build artifacts and secrets:
   - node_modules/, .next/, out/
   - .env, .env.local, .env*.local
   - .DS_Store, *.log
   - **IMPORTANT:** The `prisma/migrations/` directory SHALL EXPLICITLY NOT be ignored and MUST be committed to version control to ensure schema history is tracked for reproducibility across environments and team members
5. WHEN running `pnpm dev` THEN the system SHALL start on http://localhost:3000 with hot reload enabled

### Requirement 8: ESLint & Prettier Configuration

**User Story:** As a developer, I want ESLint and Prettier configured with consistent rules, so that code quality is maintained automatically across the team.

#### Acceptance Criteria

1. WHEN ESLint is configured THEN `.eslintrc.json` SHALL extend:
   - next/core-web-vitals
   - Standard Next.js rules
2. WHEN Prettier is configured THEN `.prettierrc` SHALL define:
   - semi: false (no semicolons)
   - singleQuote: false (double quotes)
   - tabWidth: 2
   - printWidth: 100
   - trailingComma: "es5"
3. WHEN `prettier-plugin-tailwindcss` is installed THEN Tailwind classes SHALL be automatically sorted
4. WHEN code is committed THEN the system SHOULD run lint and format checks (optional pre-commit hook)
5. WHEN running `pnpm lint` THEN ESLint SHALL report errors and warnings
6. WHEN running `pnpm format` THEN Prettier SHALL format all files

### Requirement 9: Testing Framework Setup

**User Story:** As a developer, I want Vitest and Playwright configured with minimal test scaffolding, so that I can add tests as features are implemented.

#### Acceptance Criteria

1. WHEN Vitest is installed THEN the system SHALL include:
   - vitest@^1.0.0
   - @testing-library/react@^14.0.0
   - @testing-library/jest-dom@^6.0.0
2. WHEN `vitest.config.ts` is created THEN the system SHALL:
   - Configure test environment as jsdom (for React components)
   - Setup path aliases matching tsconfig.json
   - Enable coverage collection (optional)
3. WHEN Playwright is installed THEN the system SHALL include playwright@^1.40.0
4. WHEN `playwright.config.ts` is created THEN the system SHALL:
   - Define projects for chromium and mobile chrome
   - Set baseURL to http://localhost:3000
   - Configure test directory as `tests/e2e/`
5. WHEN initial test files are created THEN the system SHALL include:
   - `tests/unit/schemas/lead-schema.test.ts` (example Zod schema test)
   - `tests/e2e/home.spec.ts` (example E2E test for home page)
6. WHEN running `pnpm test` THEN Vitest SHALL execute unit tests in watch mode
7. WHEN running `pnpm e2e` THEN Playwright SHALL execute E2E tests headlessly

### Requirement 10: Environment Variables & Configuration

**User Story:** As a developer, I want environment variables properly configured with type-safe access, so that I can manage secrets and configuration without hardcoding values.

#### Acceptance Criteria

1. WHEN `.env.example` is created THEN the system SHALL document all required environment variables:
   - DATABASE_URL (Postgres connection string)
   - NEXT_PUBLIC_POSTHOG_KEY (PostHog API key)
   - NEXT_PUBLIC_POSTHOG_HOST (https://eu.posthog.com)
   - NEXT_PUBLIC_CAL_LINK (cal.com booking URL)
   - CAL_WEBHOOK_SECRET (for webhook signature validation)
   - N8N_WEBHOOK_URL (n8n webhook endpoint)
   - N8N_WEBHOOK_SECRET (optional, for webhook validation)
2. WHEN `.env.local` is created (not in git) THEN developers SHALL copy from `.env.example` and fill in real values
3. WHEN `src/lib/env.ts` is created THEN the system SHALL:
   - Export type-safe environment variable accessors
   - Validate required env vars at build time
   - Provide clear error messages if vars are missing
   - **Implementation Note:** Can be achieved using `@t3-oss/env-nextjs` library for best-practice type-safe env validation with zero boilerplate
4. WHEN environment variables are accessed in code THEN the system SHALL use `process.env.NEXT_PUBLIC_*` for client-side and `process.env.*` for server-side
5. WHEN the app is deployed to Vercel THEN environment variables SHALL be configured in Vercel Dashboard (not committed to git)

### Requirement 11: Basic Layout & Routing Structure

**User Story:** As a developer, I want a root layout with basic navigation structure, so that pages can be added without duplicating layout code.

#### Acceptance Criteria

1. WHEN `app/layout.tsx` is created THEN the system SHALL:
   - Define RootLayout component as default export
   - Include <html> and <body> tags
   - Load custom fonts via next/font (e.g., Inter)
   - Apply Tailwind global styles
   - Include metadata (title, description)
2. WHEN `app/page.tsx` is created THEN the system SHALL render a temporary home page with:
   - Heading: "Decari MVP"
   - Subheading: "Foundation Setup Complete"
   - Link to dashboard (placeholder)
3. WHEN route groups are defined THEN the system SHALL create:
   - `app/(marketing)/` for public pages (landing, ratgeber, kontakt)
   - `app/(funnel)/` for intake funnel pages
   - `app/api/` for API routes
4. WHEN `app/not-found.tsx` is created THEN the system SHALL render a 404 page
5. WHEN `app/error.tsx` is created THEN the system SHALL render an error boundary

### Requirement 12: PostHog Analytics Initialization

**User Story:** As a product manager, I want PostHog analytics set up for event tracking, so that I can measure conversions and optimize the funnel.

#### Acceptance Criteria

1. WHEN PostHog is installed THEN the system SHALL include posthog-js@^1.0.0
2. WHEN `src/lib/analytics/posthog.ts` is created THEN the system SHALL:
   - Export PostHog initialization function
   - Read NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST from env
   - Initialize PostHog with EU region (eu.posthog.com)
   - Disable session recording, heatmaps, feature flags (MVP scope per `tech.md`)
3. WHEN PostHog is initialized in RootLayout THEN the system SHALL:
   - Only initialize on client-side (check typeof window !== 'undefined')
   - Respect consent flags (only track if analytics consent is given)
   - Capture page_view events automatically
4. WHEN a custom event is tracked THEN the system SHALL use `posthog.capture(eventName, properties)`
5. IF user opts out of analytics THEN PostHog SHALL be disabled entirely (no events sent)
6. WHEN generating event_id for deduplication THEN the system SHALL:
   - Use `crypto.randomUUID()` to generate unique event IDs client-side
   - Pass the same event_id to both client and server events for Meta Ads deduplication (as per `tech.md` Meta Ads integration)
   - **Note:** Meta Ads Pixel and Conversions API integration will be configured in PostHog Dashboard (no code changes needed in foundation setup)

## Non-Functional Requirements

### Code Architecture and Modularity
- **Single Responsibility Principle**: Each file has one clear purpose (e.g., `lead-schema.ts` only defines Lead validation)
- **Modular Design**: Components in `src/components/`, utilities in `src/lib/`, types in `src/types/`
- **Dependency Management**: No circular dependencies (enforced by ESLint plugin)
- **Clear Interfaces**: Zod schemas serve as contracts between frontend/backend

### Performance
- **Build Time:** `pnpm build` SHALL complete in <60 seconds on modern hardware (M1 Mac or equivalent)
- **Bundle Size:** Initial client JS bundle SHALL be <200KB gzipped (Next.js default optimizations)
- **Dev Server Start:** `pnpm dev` SHALL start in <10 seconds
- **Hot Reload:** Code changes SHALL reflect in browser within 2 seconds

### Security
- **Environment Variables:** Secrets (DATABASE_URL, WEBHOOK_SECRET) SHALL never be committed to git
- **Dependencies:** All npm packages SHALL be from trusted sources with active maintenance
- **HTTPS:** Production deployment (Vercel) SHALL enforce HTTPS automatically
- **Input Validation:** All user input SHALL be validated with Zod schemas on both client and server

### Reliability
- **Type Safety:** TypeScript strict mode SHALL catch type errors at compile time
- **Database Migrations:** Prisma migrations SHALL be versioned and applied atomically
- **Error Handling:** Failed builds SHALL prevent deployment (CI checks)

### Usability
- **Developer Experience:** Clear npm scripts for all common tasks (dev, build, test, db:*)
- **Documentation:** `.env.example` documents all required environment variables
- **Consistency:** ESLint and Prettier enforce consistent code style across the team
- **Accessibility:** shadcn/ui components are WCAG AA compliant by default

### Testability
- **Unit Tests:** Zod schemas SHALL have test coverage (example provided in foundation)
- **E2E Tests:** Playwright setup SHALL allow testing critical user flows
- **Test Isolation:** Tests SHALL not depend on external services (mocked where needed)
