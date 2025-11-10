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

  it('should validate all school types', () => {
    const schoolTypes = [
      'grundschule',
      'gymnasium',
      'realschule',
      'gesamtschule',
      'foerderschule',
      'sonstige',
    ]

    schoolTypes.forEach((type) => {
      const lead = {
        email: 'anna@example.com',
        region: '10115',
        schoolType: type,
        needType: 'lernfoerderung',
        contactMethod: 'termin',
        consentFlags: { essentiell: true, analytics: true },
      }

      const result = leadSchema.safeParse(lead)
      expect(result.success).toBe(true)
    })
  })

  it('should validate all need types', () => {
    const needTypes = [
      'lernfoerderung',
      'sozial-emotional',
      'koerperlich-motorisch',
      'mehrfachbedarf',
    ]

    needTypes.forEach((type) => {
      const lead = {
        email: 'anna@example.com',
        region: '10115',
        schoolType: 'grundschule',
        needType: type,
        contactMethod: 'termin',
        consentFlags: { essentiell: true, analytics: true },
      }

      const result = leadSchema.safeParse(lead)
      expect(result.success).toBe(true)
    })
  })

  it('should validate all contact methods', () => {
    const contactMethods = ['termin', 'rueckruf', 'email']

    contactMethods.forEach((method) => {
      const lead = {
        email: 'anna@example.com',
        region: '10115',
        schoolType: 'grundschule',
        needType: 'lernfoerderung',
        contactMethod: method,
        consentFlags: { essentiell: true, analytics: true },
      }

      const result = leadSchema.safeParse(lead)
      expect(result.success).toBe(true)
    })
  })

  it('should validate all timeframe options', () => {
    const timeframes = ['sofort', '1-3-monate', '3-6-monate', 'flexibel']

    timeframes.forEach((timeframe) => {
      const lead = {
        email: 'anna@example.com',
        region: '10115',
        schoolType: 'grundschule',
        needType: 'lernfoerderung',
        contactMethod: 'termin',
        consentFlags: { essentiell: true, analytics: true },
        timeframe,
      }

      const result = leadSchema.safeParse(lead)
      expect(result.success).toBe(true)
    })
  })

  it('should require essentiell consent to be true', () => {
    const invalidLead = {
      email: 'anna@example.com',
      region: '10115',
      schoolType: 'grundschule',
      needType: 'lernfoerderung',
      contactMethod: 'termin',
      consentFlags: { essentiell: false, analytics: true },
    }

    const result = leadSchema.safeParse(invalidLead)
    expect(result.success).toBe(false)
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

  it('should fail on 6-digit PLZ', () => {
    expect(plzSchema.safeParse('123456').success).toBe(false)
  })
})

describe('emailSchema', () => {
  it('should validate correct email', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true)
  })

  it('should fail on invalid email format', () => {
    expect(emailSchema.safeParse('not-an-email').success).toBe(false)
  })

  it('should fail on missing @', () => {
    expect(emailSchema.safeParse('testexample.com').success).toBe(false)
  })

  it('should fail on missing domain', () => {
    expect(emailSchema.safeParse('test@').success).toBe(false)
  })
})
