"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Capture error when component mounts
    posthog.captureException(error)
    posthog.capture('Error Page Viewed', {
      error_message: error.message,
      error_digest: error.digest,
      error_stack: error.stack,
    })
  }, [error])

  const handleReset = () => {
    posthog.capture('Error Recovery Attempted', {
      error_message: error.message,
      error_digest: error.digest,
    })
    reset()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold">Ein Fehler ist aufgetreten</h2>
      <button
        onClick={handleReset}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
