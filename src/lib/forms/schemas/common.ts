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
