# Tasks Document: Foundation Setup

## Task Overview

This document breaks down the Foundation Setup into **12 sequential tasks** following the optimized implementation sequence from the Design Document. Each task is atomic (1-3 files), includes detailed prompts for AI agents, and references the specific requirements it implements.

**Total Estimated Time:** 8-12 hours (for experienced developer or AI agent)
**Total Files:** ~40 files

---

## Task 1: Project Initialization

- [x] **1. Initialize Next.js 15 project with pnpm and TypeScript**
  - **Files to create:**
    - Root project structure (via `pnpm create next-app@latest`)
    - `package.json` (with pnpm packageManager field)
    - `tsconfig.json` (with strict mode and path aliases)
    - Initial `next.config.js`
  - **Purpose:** Create base Next.js 15 project with App Router and TypeScript
  - **Leverage:** None (greenfield initialization)
  - **Requirements:** Requirement 1 (Project Initialization)
  - **Success Criteria:**
    - `pnpm create next-app@latest` runs successfully
    - Project uses Next.js 15+, React 19+, TypeScript 5.3+
    - `packageManager` field set to "pnpm@8.15.0" in package.json
    - `tsconfig.json` has strict mode enabled and path aliases configured
    - `pnpm dev` starts development server successfully

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Full-stack Developer with expertise in Next.js, TypeScript, and pnpm

    Task: Initialize a new Next.js 15 project with App Router, TypeScript strict mode, and pnpm as the package manager. Configure path aliases for clean imports (@/* → ./src/*). Follow Requirement 1 from requirements.md.

    Steps:
    1. Run `pnpm create next-app@latest` with options:
       - TypeScript: Yes
       - ESLint: Yes
       - Tailwind CSS: Yes (we'll configure custom theme later)
       - `src/` directory: Yes
       - App Router: Yes
       - Import alias: @/*
    2. Add `"packageManager": "pnpm@8.15.0"` to package.json
    3. Verify tsconfig.json has:
       - `"strict": true`
       - Path aliases: `"@/*": ["./src/*"]`
    4. Install core dependencies:
       - next@^15.0.0
       - react@^19.0.0
       - react-dom@^19.0.0
       - typescript@^5.3.0
    5. Test: Run `pnpm dev` and verify server starts on http://localhost:3000

    Restrictions:
    - Do NOT use npm or yarn, only pnpm
    - Do NOT use Pages Router, only App Router
    - Do NOT disable TypeScript strict mode
    - Do NOT skip the src/ directory option

    Success:
    - `pnpm dev` starts without errors
    - TypeScript compilation succeeds
    - Path aliases work (can import with @/...)
    - Project follows structure.md "Directory Organization"

    After completion:
    - Mark this task as in-progress in tasks.md: Change [ ] to [-]
    - After completing implementation and testing, use log-implementation tool with:
      - taskId: "1"
      - summary: "Initialized Next.js 15 project with pnpm, TypeScript strict mode, and App Router. Configured path aliases and verified dev server starts successfully."
      - filesModified: ["package.json", "tsconfig.json", "next.config.js"]
      - filesCreated: [".gitignore", "README.md", "app/page.tsx", "app/layout.tsx", "app/globals.css"]
      - statistics: {linesAdded: ~200, linesRemoved: 0}
      - artifacts: {
          "components": [],
          "functions": [],
          "classes": [],
          "apiEndpoints": [],
          "integrations": []
        }
    - Then mark task as complete in tasks.md: Change [-] to [x]
    ```

---

## Task 2: Configuration Files

- [x] **2. Create project configuration files (.editorconfig, .gitignore, .env.example, ESLint, Prettier)**
  - **Files to create:**
    - `.editorconfig`
    - `.gitignore` (update existing)
    - `.env.example`
    - `.eslintrc.json` (update existing)
    - `.prettierrc`
    - `package.json` (update with Prettier plugin)
  - **Purpose:** Establish code quality standards and document environment variables
  - **Leverage:** Existing .gitignore from create-next-app
  - **Requirements:** Requirement 7 (Development Scripts), Requirement 8 (ESLint & Prettier), Requirement 10 (Environment Variables)
  - **Success Criteria:**
    - `.editorconfig` defines indent, line endings, charset
    - `.gitignore` excludes build artifacts but DOES NOT ignore prisma/migrations/
    - `.env.example` documents all required env vars
    - ESLint extends next/core-web-vitals
    - Prettier configured with Tailwind plugin
    - `pnpm lint` and `pnpm format` work

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: DevOps Engineer with expertise in project configuration and code quality tools

    Task: Create and configure all project-level configuration files for code quality, environment variables, and editor consistency. Follow Requirements 7, 8, and 10 from requirements.md.

    Steps:
    1. Create `.editorconfig`:
       - indent_style = space, indent_size = 2
       - end_of_line = lf, charset = utf-8
       - trim_trailing_whitespace = true, insert_final_newline = true

    2. Update `.gitignore` (IMPORTANT - per requirements.md Requirement 7 AC 4):
       - Add: node_modules/, .next/, out/
       - Add: .env, .env.local, .env*.local
       - Add: .DS_Store, *.log
       - **CRITICAL:** Ensure prisma/migrations/ is NOT in .gitignore (must be committed)

    3. Create `.env.example`:
       ```
       # Database
       DATABASE_URL="postgresql://user:pass@localhost:5432/decari_dev"

       # PostHog (Analytics + Meta Integration)
       NEXT_PUBLIC_POSTHOG_KEY="phc_..."
       NEXT_PUBLIC_POSTHOG_HOST="https://eu.posthog.com"

       # cal.com
       NEXT_PUBLIC_CAL_LINK="https://cal.com/decari/erstberatung"
       CAL_WEBHOOK_SECRET="whsec_..."

       # n8n
       N8N_WEBHOOK_URL="https://n8n.decari.de/webhook/lead-submit"
       N8N_WEBHOOK_SECRET="whsec_..."
       ```

    4. Update `.eslintrc.json`:
       ```json
       {
         "extends": ["next/core-web-vitals"],
         "rules": {}
       }
       ```

    5. Create `.prettierrc`:
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

    6. Install Prettier and plugin:
       `pnpm add -D prettier prettier-plugin-tailwindcss`

    7. Add npm scripts to package.json:
       - "format": "prettier --write ."
       - "format:check": "prettier --check ."

    8. Test: Run `pnpm lint` and `pnpm format`

    Restrictions:
    - Do NOT add prisma/migrations/ to .gitignore
    - Do NOT modify core Next.js ESLint rules
    - Do NOT add custom ESLint rules (KISS principle)
    - Ensure .env.example is committed (but .env.local is not)

    Success:
    - `pnpm lint` runs without errors
    - `pnpm format` formats all files consistently
    - `.env.example` documents all required variables
    - prisma/migrations/ will be committed to git
    - Editor respects .editorconfig settings

    After completion:
    - Use log-implementation tool with taskId "2"
    - Mark task as complete in tasks.md
    ```

---

## Task 3: Testing Infrastructure

- [x] **3. Configure Vitest and Playwright for unit and E2E testing**
  - **Files to create:**
    - `vitest.config.ts`
    - `playwright.config.ts`
    - `tests/unit/.gitkeep`
    - `tests/e2e/.gitkeep`
    - `package.json` (update with test scripts)
  - **Purpose:** Establish testing infrastructure early for TDD-light approach
  - **Leverage:** None (first testing setup)
  - **Requirements:** Requirement 9 (Testing Framework Setup)
  - **Success Criteria:**
    - Vitest configured with jsdom environment
    - Playwright configured for chromium + mobile chrome
    - Test directories created
    - `pnpm test` and `pnpm e2e` scripts work
    - Dependencies installed

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: QA Engineer with expertise in testing frameworks (Vitest, Playwright)

    Task: Configure Vitest for unit testing and Playwright for E2E testing. Create test directory structure. Follow Requirement 9 from requirements.md and testing strategy from design.md.

    Steps:
    1. Install testing dependencies:
       ```bash
       pnpm add -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
       pnpm add -D playwright @playwright/test
       ```

    2. Create `vitest.config.ts`:
       ```typescript
       import { defineConfig } from 'vitest/config'
       import react from '@vitejs/plugin-react'
       import path from 'path'

       export default defineConfig({
         plugins: [react()],
         test: {
           environment: 'jsdom',
           setupFiles: ['./tests/setup.ts'],
         },
         resolve: {
           alias: {
             '@': path.resolve(__dirname, './src'),
           },
         },
       })
       ```

    3. Create `tests/setup.ts`:
       ```typescript
       import '@testing-library/jest-dom'
       ```

    4. Create `playwright.config.ts`:
       ```typescript
       import { defineConfig, devices } from '@playwright/test'

       export default defineConfig({
         testDir: './tests/e2e',
         fullyParallel: true,
         use: {
           baseURL: 'http://localhost:3000',
         },
         projects: [
           {
             name: 'chromium',
             use: { ...devices['Desktop Chrome'] },
           },
           {
             name: 'mobile-chrome',
             use: { ...devices['Pixel 5'] },
           },
         },
         webServer: {
           command: 'pnpm dev',
           url: 'http://localhost:3000',
           reuseExistingServer: !process.env.CI,
         },
       })
       ```

    5. Create test directories:
       - `tests/unit/schemas/` (for Zod schema tests later)
       - `tests/e2e/` (for Playwright tests)

    6. Add npm scripts to package.json:
       - "test": "vitest"
       - "test:coverage": "vitest --coverage"
       - "e2e": "playwright test"
       - "e2e:ui": "playwright test --ui"

    7. Install Playwright browsers: `pnpm exec playwright install`

    Restrictions:
    - Follow YAGNI testing strategy from tech.md (minimal tests in foundation)
    - Do NOT configure complex coverage thresholds
    - Do NOT add unnecessary testing plugins

    Success:
    - `pnpm test` runs (even with no tests yet)
    - `pnpm e2e` can be run (will add tests later)
    - Test directories exist and are ready for tests
    - Vitest and Playwright configs are valid

    After completion:
    - Use log-implementation tool with taskId "3"
    - Mark task as complete in tasks.md
    ```

---

## Task 4: Basic Routing (App Shell)

- [x] **4. Create basic Next.js App Router structure (RootLayout, home page, error pages)**
  - **Files to create/modify:**
    - `app/layout.tsx` (update existing)
    - `app/page.tsx` (update existing)
    - `app/not-found.tsx`
    - `app/error.tsx`
    - `app/globals.css` (update existing)
    - `app/(marketing)/.gitkeep`
    - `app/(funnel)/.gitkeep`
    - `app/api/.gitkeep`
  - **Purpose:** Create runnable app shell - after this task, `pnpm dev` shows a working app
  - **Leverage:** Existing app/layout.tsx and app/page.tsx from create-next-app
  - **Requirements:** Requirement 11 (Basic Layout & Routing Structure)
  - **Success Criteria:**
    - RootLayout includes metadata and basic HTML structure
    - Home page shows "Decari MVP - Foundation Setup Complete"
    - 404 and error pages exist
    - Route group directories created
    - App runs without errors (`pnpm dev`)

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Frontend Developer with expertise in Next.js App Router and React

    Task: Create basic App Router structure with RootLayout, home page, and error boundaries. Establish route group directories for future features. Follow Requirement 11 from requirements.md.

    Steps:
    1. Update `app/layout.tsx`:
       ```tsx
       import type { Metadata } from 'next'
       import { Inter } from 'next/font/google'
       import './globals.css'

       const inter = Inter({ subsets: ['latin'] })

       export const metadata: Metadata = {
         title: 'Decari - Schulbegleitung einfach finden',
         description: 'Qualifizierte Schulbegleitung für Ihr Kind. Schnell, transparent, professionell.',
       }

       export default function RootLayout({
         children,
       }: {
         children: React.ReactNode
       }) {
         return (
           <html lang="de">
             <body className={inter.className}>{children}</body>
           </html>
         )
       }
       ```

    2. Update `app/page.tsx`:
       ```tsx
       export default function Home() {
         return (
           <main className="flex min-h-screen flex-col items-center justify-center p-24">
             <div className="text-center">
               <h1 className="text-4xl font-bold mb-4">Decari MVP</h1>
               <p className="text-xl text-gray-600">Foundation Setup Complete</p>
               <p className="text-sm text-gray-500 mt-4">
                 Next.js 15 • React 19 • TypeScript • Tailwind CSS 4
               </p>
             </div>
           </main>
         )
       }
       ```

    3. Create `app/not-found.tsx`:
       ```tsx
       export default function NotFound() {
         return (
           <div className="flex min-h-screen flex-col items-center justify-center">
             <h2 className="text-2xl font-bold mb-2">404 - Seite nicht gefunden</h2>
             <p className="text-gray-600">Diese Seite existiert nicht.</p>
           </div>
         )
       }
       ```

    4. Create `app/error.tsx`:
       ```tsx
       'use client'

       export default function Error({
         error,
         reset,
       }: {
         error: Error & { digest?: string }
         reset: () => void
       }) {
         return (
           <div className="flex min-h-screen flex-col items-center justify-center">
             <h2 className="text-2xl font-bold mb-2">Ein Fehler ist aufgetreten</h2>
             <button
               onClick={() => reset()}
               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
             >
               Erneut versuchen
             </button>
           </div>
         )
       }
       ```

    5. Create route group directories:
       - `app/(marketing)/` - for public pages (landing, ratgeber, etc.)
       - `app/(funnel)/` - for intake funnel
       - `app/api/` - for API routes
       (Add .gitkeep files to preserve empty directories)

    6. Test: Run `pnpm dev` and visit http://localhost:3000

    Restrictions:
    - Do NOT add complex layouts yet (just basic structure)
    - Do NOT add navigation/header/footer yet
    - Use Tailwind classes only (no custom CSS beyond globals.css)
    - Keep it simple (KISS principle)

    Success:
    - `pnpm dev` starts without errors
    - Home page displays "Decari MVP" heading
    - 404 page works (try http://localhost:3000/nonexistent)
    - Error boundary can be tested
    - Route group directories exist and ready for future features

    After completion:
    - Use log-implementation tool with taskId "4"
    - Mark task as complete in tasks.md
    ```

---

## Task 5: Tailwind CSS Custom Theme

- [x] **5. Configure Tailwind CSS 4 with custom theme (colors, fonts, spacing)**
  - **Files to create/modify:**
    - `tailwind.config.ts` (update existing)
    - `app/globals.css` (update existing)
  - **Purpose:** Establish design system foundation with brand colors and typography
  - **Leverage:** Existing tailwind.config.ts from create-next-app
  - **Requirements:** Requirement 2 (Tailwind CSS 4 Setup)
  - **Success Criteria:**
    - Custom theme colors defined (primary, secondary, accent)
    - Font families configured
    - CSS variables defined in globals.css
    - Theme tokens work in components
    - Tailwind 4.0+ installed

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: UI/UX Developer with expertise in Tailwind CSS and design systems

    Task: Configure Tailwind CSS 4 with custom theme including brand colors, typography, and design tokens. Follow Requirement 2 from requirements.md and design.md configuration section.

    Steps:
    1. Verify Tailwind 4.0+ is installed: `pnpm list tailwindcss`
       If not 4.0+: `pnpm add -D tailwindcss@latest`

    2. Update `tailwind.config.ts`:
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
                 50: '#eff6ff',
                 100: '#dbeafe',
                 200: '#bfdbfe',
                 300: '#93c5fd',
                 400: '#60a5fa',
                 500: '#3b82f6',  // Base primary
                 600: '#2563eb',
                 700: '#1d4ed8',
                 800: '#1e40af',
                 900: '#1e3a8a',
                 950: '#172554',
               },
               secondary: {
                 50: '#f0fdf4',
                 100: '#dcfce7',
                 200: '#bbf7d0',
                 300: '#86efac',
                 400: '#4ade80',
                 500: '#22c55e',  // Base secondary
                 600: '#16a34a',
                 700: '#15803d',
                 800: '#166534',
                 900: '#14532d',
                 950: '#052e16',
               },
               accent: {
                 50: '#fff7ed',
                 100: '#ffedd5',
                 200: '#fed7aa',
                 300: '#fdba74',
                 400: '#fb923c',
                 500: '#f97316',  // Base accent
                 600: '#ea580c',
                 700: '#c2410c',
                 800: '#9a3412',
                 900: '#7c2d12',
                 950: '#431407',
               },
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

       export default config
       ```

    3. Update `app/globals.css`:
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

         * {
           @apply border-border;
         }

         body {
           @apply bg-white text-gray-900;
           font-feature-settings: 'rlig' 1, 'calt' 1;
         }
       }
       ```

    4. Test theme on home page (update app/page.tsx temporarily):
       Add: `<div className="bg-primary-500 text-white p-4 rounded-theme-md">Theme Test</div>`

    5. Verify: Run `pnpm dev` and check that custom colors work

    Restrictions:
    - Use Tailwind 4.0+ only (not older versions)
    - Do NOT add unnecessary Tailwind plugins (KISS)
    - Follow the exact color palette structure (50-950 shades)
    - Do NOT use inline styles or CSS Modules

    Success:
    - Custom colors work (text-primary-500, bg-secondary-100, etc.)
    - Font family applies (Inter via next/font)
    - Border radius tokens work (rounded-theme-md)
    - CSS variables defined and accessible
    - Tailwind IntelliSense shows custom theme tokens

    After completion:
    - Use log-implementation tool with taskId "5"
    - Mark task as complete in tasks.md
    ```

---

## Task 6: shadcn/ui Component Library

- [x] **6. Install and configure shadcn/ui with 8 base components**
  - **Files to create:**
    - `src/components/ui/button.tsx`
    - `src/components/ui/card.tsx`
    - `src/components/ui/input.tsx`
    - `src/components/ui/label.tsx`
    - `src/components/ui/dialog.tsx`
    - `src/components/ui/select.tsx`
    - `src/components/ui/checkbox.tsx`
    - `src/components/ui/radio-group.tsx`
    - `src/lib/utils/cn.ts`
    - `components.json` (shadcn config)
  - **Purpose:** Establish accessible UI component library for all features
  - **Leverage:** Tailwind theme from Task 5
  - **Requirements:** Requirement 3 (shadcn/ui Component Library)
  - **Success Criteria:**
    - shadcn/ui initialized
    - 8 base components installed
    - cn() utility created
    - Components use custom theme
    - All components render without errors

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Frontend Developer with expertise in shadcn/ui and React component libraries

    Task: Initialize shadcn/ui and install 8 base components (button, card, input, label, dialog, select, checkbox, radio-group). Create cn() utility for className merging. Follow Requirement 3 from requirements.md.

    Steps:
    1. Initialize shadcn/ui:
       ```bash
       pnpm dlx shadcn-ui@latest init
       ```
       Select options:
       - Style: Default
       - Base color: Slate
       - CSS variables: Yes
       - Components directory: src/components/ui
       - Utils location: src/lib/utils
       - React Server Components: Yes

    2. Install 8 base components:
       ```bash
       pnpm dlx shadcn-ui@latest add button
       pnpm dlx shadcn-ui@latest add card
       pnpm dlx shadcn-ui@latest add input
       pnpm dlx shadcn-ui@latest add label
       pnpm dlx shadcn-ui@latest add dialog
       pnpm dlx shadcn-ui@latest add select
       pnpm dlx shadcn-ui@latest add checkbox
       pnpm dlx shadcn-ui@latest add radio-group
       ```

    3. Verify `src/lib/utils/cn.ts` was created:
       ```typescript
       import { type ClassValue, clsx } from 'clsx'
       import { twMerge } from 'tailwind-merge'

       export function cn(...inputs: ClassValue[]) {
         return twMerge(clsx(inputs))
       }
       ```

    4. Test components on home page (app/page.tsx):
       ```tsx
       import { Button } from '@/components/ui/button'
       import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
       import { Input } from '@/components/ui/input'
       import { Label } from '@/components/ui/label'

       // Add to page:
       <Card className="max-w-md mt-8">
         <CardHeader>
           <CardTitle>shadcn/ui Test</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
           <div>
             <Label htmlFor="test">Test Input</Label>
             <Input id="test" placeholder="Type something..." />
           </div>
           <Button>Test Button</Button>
         </CardContent>
       </Card>
       ```

    5. Verify all components render correctly at http://localhost:3000

    Restrictions:
    - Use ONLY shadcn/ui components (no Material-UI, Chakra, etc.)
    - Do NOT modify component source code in src/components/ui
    - Do NOT install unnecessary shadcn components beyond the 8 listed
    - Follow CLAUDE.md design system rules strictly

    Success:
    - All 8 components installed and render without errors
    - cn() utility works for className merging
    - Components use custom Tailwind theme (primary, secondary colors)
    - TypeScript types are correct
    - Components are accessible (WCAG AA compliant)

    After completion:
    - Use log-implementation tool with taskId "6" including component artifacts
    - Mark task as complete in tasks.md
    ```

---

## Task 7: Database Setup (Prisma + Postgres)

- [x] **7. Configure Prisma with Lead and Appointment models, run initial migration**
  - **Files to create:**
    - `prisma/schema.prisma`
    - `prisma/migrations/` (via prisma migrate)
    - `src/lib/db/client.ts`
    - `.env.local` (copy from .env.example)
  - **Purpose:** Establish database layer with type-safe Prisma client
  - **Leverage:** .env.example from Task 2
  - **Requirements:** Requirement 4 (Database Setup - Prisma + Postgres)
  - **Success Criteria:**
    - Prisma schema defines Lead and Appointment models
    - Initial migration created and applied
    - Prisma client singleton works
    - `pnpm db:generate` and `pnpm db:studio` work
    - Database connection succeeds

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Backend Developer with expertise in Prisma ORM and PostgreSQL

    Task: Set up Prisma with Lead and Appointment models matching tech.md database schema. Create Prisma client singleton with hot-reload handling. Follow Requirement 4 from requirements.md and design.md data models section.

    Steps:
    1. Install Prisma:
       ```bash
       pnpm add @prisma/client
       pnpm add -D prisma
       ```

    2. Create `prisma/schema.prisma`:
       ```prisma
       generator client {
         provider = "prisma-client-js"
       }

       datasource db {
         provider = "postgresql"
         url      = env("DATABASE_URL")
       }

       model Lead {
         id            String   @id @default(cuid())
         email         String   @unique
         name          String?
         phone         String?
         region        String
         schoolType    String
         needType      String
         timeframe     String?
         contactMethod String
         source        String?
         consentFlags  Json
         notes         String?
         n8nProcessed  Boolean  @default(false)
         n8nJobId      String?
         createdAt     DateTime @default(now())
         updatedAt     DateTime @updatedAt

         @@index([email])
         @@index([createdAt])
       }

       model Appointment {
         id              String   @id @default(cuid())
         leadEmail       String
         calBookingId    String   @unique
         calEventId      String
         timeSlot        DateTime
         status          String
         rescheduleCount Int      @default(0)
         createdAt       DateTime @default(now())
         updatedAt       DateTime @updatedAt

         @@index([leadEmail])
         @@index([timeSlot])
       }
       ```

    3. Create `.env.local` (copy from .env.example):
       ```bash
       cp .env.example .env.local
       ```
       Update DATABASE_URL with real Postgres connection string

    4. Create `src/lib/db/client.ts`:
       ```typescript
       import { PrismaClient } from '@prisma/client'

       const globalForPrisma = global as unknown as { prisma: PrismaClient }

       export const prisma = globalForPrisma.prisma || new PrismaClient()

       if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
       ```

    5. Add npm scripts to package.json:
       ```json
       {
         "db:generate": "prisma generate",
         "db:migrate": "prisma migrate dev",
         "db:migrate:deploy": "prisma migrate deploy",
         "db:studio": "prisma studio",
         "db:reset": "prisma migrate reset"
       }
       ```

    6. Generate Prisma client and create initial migration:
       ```bash
       pnpm db:generate
       pnpm db:migrate --name init
       ```

    7. Test Prisma Studio: `pnpm db:studio` (opens http://localhost:5555)

    Restrictions:
    - Follow exact schema from tech.md lines 317-352
    - Do NOT use Drizzle ORM or other ORMs
    - Ensure prisma/migrations/ is committed to git (not in .gitignore)
    - Use cuid() for IDs (not uuid or autoincrement)

    Success:
    - Prisma client generates without errors
    - Migration applies successfully to database
    - Prisma Studio opens and shows Lead/Appointment tables
    - TypeScript types are inferred (Lead, Appointment)
    - Singleton pattern prevents multiple instances in dev

    After completion:
    - Use log-implementation tool with taskId "7" including database schema artifacts
    - Mark task as complete in tasks.md
    ```

---

## Task 8: Validation Schemas (Zod)

- [ ] **8. Create Zod validation schemas (common validators + leadSchema) with unit tests**
  - **Files to create:**
    - `src/lib/forms/schemas/common.ts`
    - `src/lib/forms/schemas/lead-schema.ts`
    - `tests/unit/schemas/lead-schema.test.ts`
  - **Purpose:** Establish type-safe validation for all user inputs
  - **Leverage:** Testing infrastructure from Task 3
  - **Requirements:** Requirement 5 (Validation Schemas - Zod), Requirement 9 (Unit Tests for schemas)
  - **Success Criteria:**
    - Common validators exported (plz, email, phone, name, enums, consent)
    - leadSchema defined and typed
    - Unit tests pass with good coverage
    - German error messages
    - `pnpm test` runs successfully

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Backend Developer with expertise in Zod validation and TypeScript

    Task: Create reusable Zod validation schemas for common inputs (PLZ, email, phone) and Lead entity. Write comprehensive unit tests. Follow Requirement 5 from requirements.md and design.md Zod schemas section.

    Steps:
    1. Install Zod: `pnpm add zod`

    2. Create `src/lib/forms/schemas/common.ts`:
       ```typescript
       import { z } from 'zod'

       // Reusable validators
       export const plzSchema = z
         .string()
         .regex(/^\d{5}$/, 'Bitte geben Sie eine gültige 5-stellige PLZ ein')

       export const emailSchema = z
         .string()
         .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')

       export const phoneSchema = z
         .string()
         .regex(
           /^(\+49|0)[1-9]\d{1,14}$/,
           'Bitte geben Sie eine gültige Telefonnummer ein'
         )
         .optional()

       export const nameSchema = z
         .string()
         .min(2, 'Name muss mindestens 2 Zeichen lang sein')
         .max(100, 'Name darf maximal 100 Zeichen lang sein')

       // School types
       export const schoolTypeSchema = z.enum([
         'grundschule',
         'gymnasium',
         'realschule',
         'gesamtschule',
         'foerderschule',
         'sonstige',
       ])

       // Need types
       export const needTypeSchema = z.enum([
         'lernfoerderung',
         'sozial-emotional',
         'koerperlich-motorisch',
         'mehrfachbedarf',
       ])

       // Consent
       export const consentFlagsSchema = z.object({
         essentiell: z.literal(true),
         analytics: z.boolean(),
       })
       ```

    3. Create `src/lib/forms/schemas/lead-schema.ts`:
       ```typescript
       import { z } from 'zod'
       import {
         plzSchema,
         emailSchema,
         phoneSchema,
         nameSchema,
         schoolTypeSchema,
         needTypeSchema,
         consentFlagsSchema,
       } from './common'

       export const leadSchema = z.object({
         email: emailSchema,
         name: nameSchema.optional(),
         phone: phoneSchema,
         region: plzSchema,
         schoolType: schoolTypeSchema,
         needType: needTypeSchema,
         timeframe: z
           .enum(['sofort', '1-3-monate', '3-6-monate', 'flexibel'])
           .optional(),
         contactMethod: z.enum(['termin', 'rueckruf', 'email']),
         consentFlags: consentFlagsSchema,
         source: z.string().optional(),
         notes: z.string().max(500).optional(),
       })

       export type LeadInput = z.infer<typeof leadSchema>
       ```

    4. Create `tests/unit/schemas/lead-schema.test.ts`:
       ```typescript
       import { describe, it, expect } from 'vitest'
       import { leadSchema, plzSchema, emailSchema } from '@/lib/forms/schemas'

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

         it('should fail on invalid email', () => {
           const invalidLead = {
             email: 'not-an-email',
             region: '10115',
             schoolType: 'grundschule',
             needType: 'lernfoerderung',
             contactMethod: 'termin',
             consentFlags: { essentiell: true, analytics: true },
           }

           const result = leadSchema.safeParse(invalidLead)
           expect(result.success).toBe(false)
         })

         it('should fail on invalid PLZ (4 digits)', () => {
           const invalidLead = {
             email: 'anna@example.com',
             region: '1234',
             schoolType: 'grundschule',
             needType: 'lernfoerderung',
             contactMethod: 'termin',
             consentFlags: { essentiell: true, analytics: true },
           }

           const result = leadSchema.safeParse(invalidLead)
           expect(result.success).toBe(false)
           if (!result.success) {
             expect(result.error.issues[0].message).toContain('5-stellige PLZ')
           }
         })

         it('should fail if notes exceed 500 chars', () => {
           const invalidLead = {
             email: 'anna@example.com',
             region: '10115',
             schoolType: 'grundschule',
             needType: 'lernfoerderung',
             contactMethod: 'termin',
             consentFlags: { essentiell: true, analytics: true },
             notes: 'a'.repeat(501),
           }

           const result = leadSchema.safeParse(invalidLead)
           expect(result.success).toBe(false)
         })

         it('should allow optional fields to be omitted', () => {
           const minimalLead = {
             email: 'anna@example.com',
             region: '10115',
             schoolType: 'grundschule',
             needType: 'lernfoerderung',
             contactMethod: 'termin',
             consentFlags: { essentiell: true, analytics: false },
           }

           const result = leadSchema.safeParse(minimalLead)
           expect(result.success).toBe(true)
         })
       })

       describe('plzSchema', () => {
         it('should validate 5-digit PLZ', () => {
           expect(plzSchema.safeParse('10115').success).toBe(true)
         })

         it('should fail on 4-digit PLZ', () => {
           expect(plzSchema.safeParse('1234').success).toBe(false)
         })

         it('should fail on letters in PLZ', () => {
           expect(plzSchema.safeParse('1234a').success).toBe(false)
         })
       })
       ```

    5. Run tests: `pnpm test`

    Restrictions:
    - Use Zod only (not Yup, Joi, or other validation libraries)
    - Error messages must be in German
    - Follow exact field definitions from requirements.md
    - Test both success and failure scenarios

    Success:
    - All unit tests pass (`pnpm test`)
    - leadSchema matches Prisma Lead model
    - German error messages work
    - Type inference works (LeadInput type)
    - Edge cases covered in tests

    After completion:
    - Use log-implementation tool with taskId "8" including validation schema artifacts
    - Mark task as complete in tasks.md
    ```

---

## Task 9: Form Components (React Hook Form + Zod)

- [ ] **9. Create TextInput component integrated with React Hook Form, render on home page**
  - **Files to create:**
    - `src/components/forms/text-input.tsx`
    - Update `app/page.tsx` to test component visually
  - **Purpose:** Create reusable form input component as template for future forms
  - **Leverage:** shadcn/ui Input from Task 6, Zod schemas from Task 8
  - **Requirements:** Requirement 6 (Form Handling Setup - React Hook Form)
  - **Success Criteria:**
    - TextInput component works with useFormContext
    - Displays label, input, helpText, and errors
    - Visual test on home page shows component
    - TypeScript types are correct
    - Accessible (ARIA attributes)

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Frontend Developer with expertise in React Hook Form and accessible forms

    Task: Create reusable TextInput form component integrated with React Hook Form and shadcn/ui Input. Test visually on home page. Follow Requirement 6 from requirements.md and design.md form components section.

    Steps:
    1. Install React Hook Form:
       ```bash
       pnpm add react-hook-form @hookform/resolvers
       ```

    2. Create `src/components/forms/text-input.tsx`:
       ```tsx
       'use client'

       import { forwardRef } from 'react'
       import { useFormContext } from 'react-hook-form'
       import { Input } from '@/components/ui/input'
       import { Label } from '@/components/ui/label'

       interface TextInputProps {
         name: string
         label: string
         placeholder?: string
         helpText?: string
         required?: boolean
         type?: 'text' | 'email' | 'tel' | 'number'
       }

       export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
         ({ name, label, placeholder, helpText, required, type = 'text' }, ref) => {
           const {
             register,
             formState: { errors },
           } = useFormContext()

           return (
             <div className="space-y-1">
               <Label htmlFor={name}>
                 {label}
                 {required && <span className="text-red-500 ml-1">*</span>}
               </Label>
               <Input
                 id={name}
                 type={type}
                 {...register(name)}
                 ref={ref}
                 placeholder={placeholder}
                 aria-invalid={errors[name] ? 'true' : 'false'}
                 aria-describedby={errors[name] ? `${name}-error` : undefined}
               />
               {helpText && <p className="text-sm text-gray-500">{helpText}</p>}
               {errors[name] && (
                 <p id={`${name}-error`} className="text-sm text-red-500">
                   {errors[name]?.message as string}
                 </p>
               )}
             </div>
           )
         }
       )

       TextInput.displayName = 'TextInput'
       ```

    3. Update `app/page.tsx` to test component visually:
       ```tsx
       'use client'

       import { FormProvider, useForm } from 'react-hook-form'
       import { zodResolver } from '@hookform/resolvers/zod'
       import { z } from 'zod'
       import { TextInput } from '@/components/forms/text-input'
       import { Button } from '@/components/ui/button'
       import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

       const testSchema = z.object({
         name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
         email: z.string().email('Ungültige E-Mail-Adresse'),
       })

       export default function Home() {
         const methods = useForm({
           resolver: zodResolver(testSchema),
         })

         const onSubmit = (data: any) => {
           console.log('Form data:', data)
           alert('Form submitted! Check console.')
         }

         return (
           <main className="flex min-h-screen flex-col items-center justify-center p-24">
             <div className="text-center mb-8">
               <h1 className="text-4xl font-bold mb-4">Decari MVP</h1>
               <p className="text-xl text-gray-600">Foundation Setup - Form Test</p>
             </div>

             <Card className="max-w-md w-full">
               <CardHeader>
                 <CardTitle>Form Component Test</CardTitle>
               </CardHeader>
               <CardContent>
                 <FormProvider {...methods}>
                   <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                     <TextInput
                       name="name"
                       label="Name"
                       placeholder="Ihr Name"
                       helpText="Mindestens 2 Zeichen"
                       required
                     />
                     <TextInput
                       name="email"
                       label="E-Mail"
                       type="email"
                       placeholder="ihre@email.de"
                       required
                     />
                     <Button type="submit">Absenden</Button>
                   </form>
                 </FormProvider>
               </CardContent>
             </Card>
           </main>
         )
       }
       ```

    4. Test visually:
       - Visit http://localhost:3000
       - Try submitting empty form (should show errors)
       - Enter invalid email (should show error)
       - Enter valid data (should log to console)

    Restrictions:
    - Use useFormContext (not useForm directly in component)
    - Integrate with shadcn/ui Input (do not create custom input)
    - Include ARIA attributes for accessibility
    - Display inline validation errors

    Success:
    - TextInput renders correctly with label and input
    - Validation errors display inline
    - Required indicator shows (red asterisk)
    - Form submission works with valid data
    - Accessible (ARIA attributes present)

    After completion:
    - Use log-implementation tool with taskId "9" including form component artifacts
    - Mark task as complete in tasks.md
    ```

---

## Task 10: Environment Variables (Type-Safe)

- [ ] **10. Create type-safe environment variable validation with @t3-oss/env-nextjs**
  - **Files to create:**
    - `src/lib/env.ts`
  - **Purpose:** Ensure all required env vars are validated at build time
  - **Leverage:** .env.example from Task 2, Zod from Task 8
  - **Requirements:** Requirement 10 (Environment Variables & Configuration)
  - **Success Criteria:**
    - All env vars validated at build time
    - TypeScript types inferred
    - Build fails if required vars missing
    - Type-safe access throughout app
    - Clear error messages

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: DevOps Engineer with expertise in environment configuration and TypeScript

    Task: Create type-safe environment variable validation using @t3-oss/env-nextjs. Ensure all required vars from .env.example are validated at build time. Follow Requirement 10 from requirements.md.

    Steps:
    1. Install @t3-oss/env-nextjs:
       ```bash
       pnpm add @t3-oss/env-nextjs
       ```

    2. Create `src/lib/env.ts`:
       ```typescript
       import { createEnv } from '@t3-oss/env-nextjs'
       import { z } from 'zod'

       export const env = createEnv({
         /**
          * Server-side environment variables (not exposed to client)
          */
         server: {
           DATABASE_URL: z.string().url(),
           CAL_WEBHOOK_SECRET: z.string().min(1),
           N8N_WEBHOOK_URL: z.string().url(),
           N8N_WEBHOOK_SECRET: z.string().optional(),
         },

         /**
          * Client-side environment variables (exposed via NEXT_PUBLIC_*)
          */
         client: {
           NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
           NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
           NEXT_PUBLIC_CAL_LINK: z.string().url(),
         },

         /**
          * Runtime environment variables mapping
          */
         runtimeEnv: {
           // Server
           DATABASE_URL: process.env.DATABASE_URL,
           CAL_WEBHOOK_SECRET: process.env.CAL_WEBHOOK_SECRET,
           N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
           N8N_WEBHOOK_SECRET: process.env.N8N_WEBHOOK_SECRET,

           // Client
           NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
           NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
           NEXT_PUBLIC_CAL_LINK: process.env.NEXT_PUBLIC_CAL_LINK,
         },

         /**
          * Skip validation in dev if needed (optional)
          */
         skipValidation: !!process.env.SKIP_ENV_VALIDATION,
       })
       ```

    3. Test validation:
       - Temporarily remove DATABASE_URL from .env.local
       - Run `pnpm build`
       - Should fail with clear error message
       - Restore DATABASE_URL
       - Run `pnpm build` again - should succeed

    4. Example usage in code:
       ```typescript
       // In a server component or API route:
       import { env } from '@/lib/env'

       const dbUrl = env.DATABASE_URL  // Type-safe, validated
       const posthogKey = env.NEXT_PUBLIC_POSTHOG_KEY  // Also accessible client-side
       ```

    Restrictions:
    - Use @t3-oss/env-nextjs (recommended in requirements.md)
    - Do NOT skip validation in production
    - Server vars must NOT be exposed to client
    - Follow exact var names from .env.example

    Success:
    - Build-time validation works (pnpm build fails if vars missing)
    - TypeScript autocomplete works for env vars
    - Clear error messages if vars missing
    - Type-safe access (env.DATABASE_URL is typed)
    - No runtime errors for missing vars

    After completion:
    - Use log-implementation tool with taskId "10"
    - Mark task as complete in tasks.md
    ```

---

## Task 11: PostHog Analytics Initialization

- [ ] **11. Create PostHog initialization with consent management and event_id generation**
  - **Files to create:**
    - `src/lib/analytics/posthog.ts`
    - Update `app/layout.tsx` to initialize PostHog
  - **Purpose:** Set up analytics infrastructure for event tracking
  - **Leverage:** Environment variables from Task 10
  - **Requirements:** Requirement 12 (PostHog Analytics Initialization)
  - **Success Criteria:**
    - PostHog initializes client-side only
    - Consent check before tracking
    - event_id generation for Meta Ads deduplication
    - Session recording/heatmaps/feature flags disabled
    - page_view events captured automatically

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Analytics Engineer with expertise in PostHog and GDPR-compliant tracking

    Task: Initialize PostHog for event tracking with consent management and Meta Ads deduplication support. Follow Requirement 12 from requirements.md and tech.md Meta Ads integration section.

    Steps:
    1. Install PostHog:
       ```bash
       pnpm add posthog-js
       ```

    2. Create `src/lib/analytics/posthog.ts`:
       ```typescript
       'use client'

       import posthog from 'posthog-js'
       import { env } from '@/lib/env'

       export function initPostHog() {
         if (typeof window !== 'undefined') {
           posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
             api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
             loaded: (posthog) => {
               if (process.env.NODE_ENV === 'development') posthog.debug()
             },
             capture_pageview: true,
             capture_pageleave: true,
             // Disable MVP-excluded features per tech.md v1.6
             session_recording: {
               enabled: false,
             },
             autocapture: false,
             disable_session_recording: true,
           })
         }
       }

       export function trackEvent(
         eventName: string,
         properties?: Record<string, any>
       ) {
         if (typeof window !== 'undefined' && hasAnalyticsConsent()) {
           posthog.capture(eventName, {
             event_id: crypto.randomUUID(), // For Meta Ads deduplication
             ...properties,
           })
         }
       }

       // Simple consent check (will be replaced with real consent banner later)
       function hasAnalyticsConsent(): boolean {
         if (typeof window === 'undefined') return false
         // Placeholder: check localStorage or cookie
         // For now, default to true (will be implemented with consent banner)
         return true
       }

       export { posthog }
       ```

    3. Update `app/layout.tsx` to initialize PostHog:
       ```tsx
       'use client'

       import { useEffect } from 'react'
       import { initPostHog } from '@/lib/analytics/posthog'

       // Add this component
       function PostHogProvider({ children }: { children: React.ReactNode }) {
         useEffect(() => {
           initPostHog()
         }, [])

         return <>{children}</>
       }

       // Wrap children in RootLayout:
       export default function RootLayout({
         children,
       }: {
         children: React.ReactNode
       }) {
         return (
           <html lang="de">
             <body className={inter.className}>
               <PostHogProvider>{children}</PostHogProvider>
             </body>
           </html>
         )
       }
       ```

    4. Test PostHog:
       - Ensure NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are in .env.local
       - Run `pnpm dev`
       - Open browser DevTools → Network tab
       - Filter for "posthog" or "eu.posthog.com"
       - Visit http://localhost:3000
       - Should see page_view event sent to PostHog

    Restrictions:
    - Initialize ONLY on client-side (typeof window check)
    - Disable session recording, heatmaps, feature flags (MVP scope)
    - Generate unique event_id for every event (Meta Ads deduplication)
    - Respect consent flags (trackEvent checks consent)

    Success:
    - PostHog initializes without errors
    - page_view events sent automatically
    - event_id generated for each event
    - Session recording disabled
    - Consent check works (placeholder for now)

    After completion:
    - Use log-implementation tool with taskId "11" including analytics setup artifacts
    - Mark task as complete in tasks.md
    ```

---

## Task 12: Documentation & README

- [ ] **12. Update README.md with setup instructions, npm scripts, and development workflow**
  - **Files to modify:**
    - `README.md`
  - **Purpose:** Document project setup for developers and AI agents
  - **Leverage:** All previous tasks
  - **Requirements:** Requirement 7 (Development Scripts & Configuration)
  - **Success Criteria:**
    - README explains project purpose
    - Setup instructions complete (clone → run)
    - All npm scripts documented
    - Environment variables documented
    - Development workflow explained

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: Technical Writer with expertise in developer documentation

    Task: Create comprehensive README.md documenting project setup, npm scripts, environment variables, and development workflow. Follow requirements.md Requirement 7 and design.md.

    Steps:
    1. Update `README.md`:
       ```markdown
       # Decari MVP

       Content- und Funnel-Website für qualifizierte Schulbegleitung. Hilft Eltern, Schulen und Institutionen schnell die passende Unterstützung zu finden.

       ## Tech Stack

       - **Framework:** Next.js 15 (App Router)
       - **Language:** TypeScript 5.3+ (strict mode)
       - **Styling:** Tailwind CSS 4.0+
       - **UI Components:** shadcn/ui (Radix UI primitives)
       - **Database:** PostgreSQL via Prisma 5.7+
       - **Validation:** Zod 3.22+
       - **Forms:** React Hook Form 7.5+
       - **Analytics:** PostHog (EU region)
       - **Package Manager:** pnpm 8+
       - **Testing:** Vitest (unit) + Playwright (E2E)

       ## Prerequisites

       - Node.js 20 LTS
       - pnpm 8+
       - PostgreSQL database (local or Vercel Postgres)

       ## Setup

       1. **Clone repository:**
          ```bash
          git clone <repo-url>
          cd schulbegleitung
          ```

       2. **Install dependencies:**
          ```bash
          pnpm install
          ```

       3. **Set up environment variables:**
          ```bash
          cp .env.example .env.local
          ```
          Fill in real values in `.env.local`:
          - `DATABASE_URL` - Postgres connection string
          - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key
          - `NEXT_PUBLIC_POSTHOG_HOST` - `https://eu.posthog.com`
          - Other vars as needed (see `.env.example`)

       4. **Set up database:**
          ```bash
          pnpm db:generate        # Generate Prisma client
          pnpm db:migrate         # Run migrations
          ```

       5. **Run development server:**
          ```bash
          pnpm dev
          ```
          Open [http://localhost:3000](http://localhost:3000)

       ## Available Scripts

       ### Development
       - `pnpm dev` - Start development server (http://localhost:3000)
       - `pnpm build` - Build for production
       - `pnpm start` - Start production server

       ### Code Quality
       - `pnpm lint` - Run ESLint
       - `pnpm format` - Format code with Prettier
       - `pnpm format:check` - Check formatting (CI)
       - `pnpm type-check` - Run TypeScript type checking

       ### Testing
       - `pnpm test` - Run unit tests (Vitest, watch mode)
       - `pnpm test:coverage` - Generate coverage report
       - `pnpm e2e` - Run E2E tests (Playwright, headless)
       - `pnpm e2e:ui` - Run E2E tests with UI

       ### Database
       - `pnpm db:generate` - Generate Prisma client
       - `pnpm db:migrate` - Create & apply migration (dev)
       - `pnpm db:migrate:deploy` - Apply migrations (production)
       - `pnpm db:studio` - Open Prisma Studio (GUI)
       - `pnpm db:reset` - Reset database (dev only)

       ## Project Structure

       ```
       schulbegleitung/
       ├── app/                    # Next.js App Router
       │   ├── (marketing)/        # Public pages
       │   ├── (funnel)/           # Intake funnel
       │   ├── api/                # API routes
       │   ├── layout.tsx          # Root layout
       │   └── page.tsx            # Home page
       │
       ├── src/
       │   ├── components/
       │   │   ├── ui/             # shadcn/ui components
       │   │   └── forms/          # Form components
       │   ├── lib/
       │   │   ├── db/             # Prisma client
       │   │   ├── forms/schemas/  # Zod schemas
       │   │   ├── analytics/      # PostHog
       │   │   └── utils/          # Utilities
       │   └── types/              # TypeScript types
       │
       ├── prisma/
       │   ├── schema.prisma       # Database schema
       │   └── migrations/         # Migration history
       │
       ├── tests/
       │   ├── unit/               # Unit tests
       │   └── e2e/                # E2E tests
       │
       └── .spec-workflow/         # Specification docs
       ```

       ## Development Workflow

       1. **Create feature branch:** `git checkout -b feature/my-feature`
       2. **Make changes and test:**
          - Run `pnpm dev` for live reload
          - Run `pnpm test` for unit tests
          - Run `pnpm lint` before commit
       3. **Commit:** Follow Conventional Commits (`feat:`, `fix:`, etc.)
       4. **Push and create PR:** CI will run tests and linting
       5. **Ultracite AI Review:** Automatic code review via GitHub App

       ## Steering Documents

       See `.spec-workflow/steering/` for:
       - `product.md` - Product vision and requirements
       - `tech.md` - Technology stack and decisions
       - `structure.md` - Code organization and naming conventions

       ## License

       Proprietary - Decari © 2025
       ```

    2. Verify all links and commands work

    Restrictions:
    - Keep README concise but complete
    - Document ALL npm scripts from package.json
    - Ensure setup instructions are step-by-step
    - Reference steering documents

    Success:
    - New developer can clone and run project following README
    - All npm scripts are documented
    - Project structure is clear
    - Environment variables are explained
    - README is well-formatted and easy to read

    After completion:
    - Use log-implementation tool with taskId "12"
    - Mark task as complete in tasks.md
    - Foundation setup is COMPLETE! 🎉
    ```

---

## E2E Test Example (Bonus Task - Optional)

- [ ] **13. Create basic E2E test for home page (Optional, can be done later)**
  - **Files to create:**
    - `tests/e2e/home.spec.ts`
  - **Purpose:** Verify foundation setup with automated E2E test
  - **Leverage:** Playwright from Task 3, home page from Task 4
  - **Requirements:** Requirement 9 (Testing Framework - E2E)
  - **Success Criteria:**
    - E2E test passes
    - Verifies home page loads
    - Checks for no console errors
    - `pnpm e2e` runs successfully

  - **_Prompt:**
    ```
    Implement the task for spec foundation-setup, first run spec-workflow-guide to get the workflow guide then implement the task:

    Role: QA Engineer with expertise in Playwright E2E testing

    Task: Create basic end-to-end test for home page to verify foundation setup. Follow testing strategy from design.md.

    Steps:
    1. Create `tests/e2e/home.spec.ts`:
       ```typescript
       import { test, expect } from '@playwright/test'

       test.describe('Home Page', () => {
         test('should load successfully', async ({ page }) => {
           await page.goto('/')

           // Check title
           await expect(page).toHaveTitle(/Decari/)

           // Check heading
           await expect(page.locator('h1')).toContainText('Decari MVP')

           // Check description
           await expect(page.locator('text=Foundation Setup')).toBeVisible()
         })

         test('should have no console errors', async ({ page }) => {
           const errors: string[] = []

           page.on('console', (msg) => {
             if (msg.type() === 'error') {
               errors.push(msg.text())
             }
           })

           await page.goto('/')

           // Wait for page to fully load
           await page.waitForLoadState('networkidle')

           // Check for errors
           expect(errors).toHaveLength(0)
         })

         test('should load PostHog', async ({ page }) => {
           // Intercept PostHog requests
           let posthogLoaded = false

           page.on('request', (request) => {
             if (request.url().includes('posthog') || request.url().includes('eu.posthog.com')) {
               posthogLoaded = true
             }
           })

           await page.goto('/')
           await page.waitForLoadState('networkidle')

           // PostHog should have loaded (if env vars are set)
           expect(posthogLoaded).toBe(true)
         })
       })
       ```

    2. Run E2E tests:
       ```bash
       pnpm e2e
       ```

    3. If tests fail, debug with UI:
       ```bash
       pnpm e2e:ui
       ```

    Restrictions:
    - Keep tests simple (only verify foundation works)
    - Test only critical paths (home page load)
    - Do NOT test features not yet implemented

    Success:
    - `pnpm e2e` passes all tests
    - Home page loads without errors
    - PostHog initialization verified
    - Tests run reliably in CI

    After completion:
    - Use log-implementation tool with taskId "13"
    - Mark task as complete in tasks.md
    ```

---

## Task Completion Checklist

After all tasks are complete:

- [ ] All 12 main tasks marked as [x] in tasks.md
- [ ] `pnpm dev` starts without errors
- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes (with Zod schema tests)
- [ ] `pnpm lint` and `pnpm format` succeed
- [ ] `pnpm db:studio` shows Lead and Appointment tables
- [ ] PostHog events visible in dashboard (if API key configured)
- [ ] README.md is complete and accurate
- [ ] All log-implementation entries created with detailed artifacts
- [ ] Foundation is ready for feature development! 🚀

---

**Note for AI Agents:**

Each task includes a detailed `_Prompt` field with:
- **Role:** Specialized developer role for the task
- **Task:** Clear description with context references
- **Steps:** Exact implementation steps with code snippets
- **Restrictions:** What NOT to do, constraints to follow
- **Success:** Specific completion criteria

**Workflow per task:**
1. Mark task as in-progress in tasks.md: `[ ]` → `[-]`
2. Follow the _Prompt instructions exactly
3. Test the implementation
4. Use `log-implementation` tool with detailed artifacts (APIs, components, functions, etc.)
5. Mark task as complete in tasks.md: `[-]` → `[x]`

**Critical:** Use `get-implementation-logs` with keywords BEFORE implementing to discover existing code and avoid duplication.
