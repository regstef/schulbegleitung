import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Decari MVP</h1>
        <p className="text-xl text-muted-foreground">Foundation Setup Complete</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Next.js 16 • React 19 • TypeScript • Tailwind CSS 4 • shadcn/ui
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>shadcn/ui Component Test</CardTitle>
          <CardDescription>
            Testing 8 base components with Spring Bouquet theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input + Label */}
          <div className="space-y-2">
            <Label htmlFor="test-input">Test Input</Label>
            <Input id="test-input" placeholder="Type something..." />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="font-normal cursor-pointer">
              Accept terms and conditions
            </Label>
          </div>

          {/* Radio Group */}
          <div className="space-y-2">
            <Label>Choose an option</Label>
            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="option1" />
                <Label htmlFor="option1" className="font-normal cursor-pointer">
                  Option 1
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="option2" />
                <Label htmlFor="option2" className="font-normal cursor-pointer">
                  Option 2
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
