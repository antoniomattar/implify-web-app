export default function LoadingSkeleton() {
    return (
      <div className="flex min-h-[100dvh] flex-col">
        <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6">
          <div className="flex h-8 w-32 animate-pulse rounded-md bg-muted" />
          <div className="ml-auto flex h-8 w-24 animate-pulse rounded-md bg-muted" />
        </header>
        <main className="flex-1 px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="h-48 w-full animate-pulse rounded-md bg-muted" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-40 animate-pulse rounded-md bg-muted" />
              <div className="h-40 animate-pulse rounded-md bg-muted" />
              <div className="h-40 animate-pulse rounded-md bg-muted" />
              <div className="h-40 animate-pulse rounded-md bg-muted" />
              <div className="h-40 animate-pulse rounded-md bg-muted" />
              <div className="h-40 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </main>
        <footer className="flex h-16 w-full shrink-0 items-center px-4 md:px-6">
          <div className="flex h-8 w-32 animate-pulse rounded-md bg-muted" />
          <div className="ml-auto flex h-8 w-24 animate-pulse rounded-md bg-muted" />
        </footer>
      </div>
    )
  }