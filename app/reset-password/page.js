import { Suspense } from 'react'

function ResetPasswordLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Loading...</p>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordClient />
    </Suspense>
  )
}

// Async load Client Component
async function ResetPasswordClient() {
  const Component = (await import('./ClientForm')).default
  return <Component />
}