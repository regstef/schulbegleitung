"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { TextInput } from "@/components/forms/text-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import posthog from "posthog-js"

const testSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
})

type TestFormValues = z.infer<typeof testSchema>

export default function Home() {
  const methods = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onSubmit = (data: TestFormValues) => {
    console.log("Form data:", data)

    // Identify user with their email
    posthog.identify(data.email, {
      email: data.email,
      name: data.name,
    })

    // Track successful form submission
    posthog.capture('Lead Form Submitted', {
      name: data.name,
      email: data.email,
      form_type: 'test_form',
    })

    alert("Form submitted! Check console.")
  }

  const onError = (errors: Record<string, { message?: string }>) => {
    // Track validation failures
    const errorFields = Object.keys(errors)
    posthog.capture('Lead Form Validation Failed', {
      error_fields: errorFields,
      error_count: errorFields.length,
      errors: errorFields.map((field) => ({
        field,
        message: errors[field]?.message,
      })),
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Decari MVP</h1>
        <p className="text-xl text-muted-foreground">Foundation Setup – Form Component Test</p>
        <p className="text-sm text-muted-foreground">
          Next.js 16 • React 19 • TypeScript • Tailwind CSS 4 • React Hook Form + Zod
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Form Component Test</CardTitle>
          <CardDescription>React Hook Form + Zod + TextInput</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="space-y-4">
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
              <Button type="submit" className="w-full">
                Absenden
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </main>
  )
}
