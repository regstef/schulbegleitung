# Decari MVP

Content- und Funnel-Website für qualifizierte Schulbegleitung. Hilft Eltern, Schulen und Institutionen schnell die passende Unterstützung zu finden.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5+ (strict mode)
- **Styling:** Tailwind CSS 4+
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Database:** PostgreSQL via Prisma 6+
- **Validation:** Zod 4+
- **Forms:** React Hook Form 7+
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
   - `NEXT_PUBLIC_CAL_LINK` - cal.com booking link
   - `CAL_WEBHOOK_SECRET` - cal.com webhook secret
   - `N8N_WEBHOOK_URL` - n8n webhook URL
   - `N8N_WEBHOOK_SECRET` - n8n webhook secret (optional)

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
│   │   ├── forms/          # Form components
│   │   └── providers/      # React providers
│   ├── lib/
│   │   ├── db/             # Prisma client
│   │   ├── forms/schemas/  # Zod schemas
│   │   ├── analytics/      # PostHog
│   │   ├── env.ts          # Environment validation
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

## Key Features

### Type-Safe Environment Variables
Environment variables are validated at build time using `@t3-oss/env-nextjs`. The build will fail if required variables are missing. Access via:
```typescript
import { env } from "@/lib/env"
const dbUrl = env.DATABASE_URL  // Type-safe!
```

### Zod Validation Schemas
Reusable validation schemas for all user inputs with German error messages:
```typescript
import { leadSchema, plzSchema, emailSchema } from "@/lib/forms/schemas"
```

### Prisma Database
Type-safe database access with Prisma ORM:
- Lead management
- Appointment tracking
- Automatic TypeScript types

### PostHog Analytics
Event tracking with Meta Ads integration:
- Automatic page view tracking
- Custom event tracking with `event_id` for deduplication
- GDPR-compliant consent management

## Steering Documents

See `.spec-workflow/steering/` for:
- `product.md` - Product vision and requirements
- `tech.md` - Technology stack and decisions
- `structure.md` - Code organization and naming conventions

## Foundation Setup Tasks

The foundation is established through 12 tasks documented in `.spec-workflow/specs/foundation-setup/`:
- ✅ Tasks 1-8: Project initialization, config, testing, routing, Tailwind, shadcn/ui, database, validation
- ✅ Task 9: Form components (completed by other dev)
- ✅ Task 10: Type-safe environment variables
- ⏳ Task 11: PostHog analytics (in progress)
- ⏳ Task 12: Documentation (this file)

## License

Proprietary - Decari © 2025
