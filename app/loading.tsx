export default function Loading() {
  return (
    <>
      {/* Header Skeleton */}
      <section className="mb-8 flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-56 rounded-lg bg-zinc-800" />
          <div className="h-4 w-72 rounded-md bg-zinc-800" />
        </div>

        <div className="h-10 w-32 rounded-xl bg-zinc-800" />
      </section>

      {/* Cards Grid Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="h-55 w-full bg-zinc-800" />

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
              <div className="h-5 w-2/3 rounded-md bg-zinc-800" />

              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-zinc-800" />
                <div className="h-3 w-5/6 rounded bg-zinc-800" />
                <div className="h-3 w-2/3 rounded bg-zinc-800" />
              </div>

              {/* Actions Skeleton */}
              <div className="flex gap-3 pt-2">
                <div className="h-8 w-20 rounded-lg bg-zinc-800" />
                <div className="h-8 w-20 rounded-lg bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
