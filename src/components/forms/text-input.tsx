'use client'

import { forwardRef, useState } from 'react'
import { type FieldError, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import posthog from 'posthog-js'

interface TextInputProps {
  name: string
  label: string
  placeholder?: string
  helpText?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'number'
  className?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, placeholder, helpText, required, type = 'text', className }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const [hasInteracted, setHasInteracted] = useState(false)

    const { ref: registerRef, onChange, onBlur, ...fieldProps } = register(name)
    const fieldError = errors[name as keyof typeof errors] as FieldError | undefined

    const errorId = fieldError ? `${name}-error` : undefined
    const helpId = helpText ? `${name}-help` : undefined
    const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!hasInteracted) {
        setHasInteracted(true)
        posthog.capture('Form Field Changed', {
          field_name: name,
          field_type: type,
          field_label: label,
          is_first_interaction: true,
        })
      }
      onChange(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const hasValue = e.target.value && e.target.value.trim().length > 0
      posthog.capture('Form Field Changed', {
        field_name: name,
        field_type: type,
        field_label: label,
        field_completed: hasValue,
        value_length: e.target.value?.length || 0,
      })
      onBlur(e)
    }

    return (
      <div className={cn('space-y-1', className)}>
        <Label htmlFor={name} className="flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-sm text-destructive">*</span>}
        </Label>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={fieldError ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-required={required ? 'true' : undefined}
          {...fieldProps}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={(element) => {
            registerRef(element)
            if (typeof ref === 'function') {
              ref(element)
            } else if (ref) {
              ref.current = element
            }
          }}
        />
        {helpText && (
          <p id={helpId} className="text-sm text-muted-foreground">
            {helpText}
          </p>
        )}
        {fieldError?.message && (
          <p id={errorId} className="text-sm text-destructive">
            {fieldError.message}
          </p>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
