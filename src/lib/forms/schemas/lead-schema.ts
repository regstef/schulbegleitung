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
