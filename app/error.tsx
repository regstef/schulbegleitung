"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold">Ein Fehler ist aufgetreten</h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
