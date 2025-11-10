"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

export default function NotFound() {
  useEffect(() => {
    // Track 404 page views
    posthog.capture('404 Page Viewed', {
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold">404 - Seite nicht gefunden</h2>
      <p className="text-gray-600">Diese Seite existiert nicht.</p>
    </div>
  )
}
