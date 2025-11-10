import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

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
