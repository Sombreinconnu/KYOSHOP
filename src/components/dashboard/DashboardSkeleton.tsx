export function DashboardSkeleton() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8 lg:p-10">
      <div className="w-full max-w-2xl space-y-6 animate-pulse">
        <div className="h-4 w-32 rounded-full bg-zinc-200/80" />
        <div className="h-10 w-3/4 rounded-2xl bg-zinc-200/80" />
        <div className="h-4 w-full rounded-xl bg-zinc-100" />
        <div className="h-4 w-5/6 rounded-xl bg-zinc-100" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="h-28 rounded-3xl bg-zinc-200/60" />
          <div className="h-28 rounded-3xl bg-zinc-200/60" />
          <div className="h-28 rounded-3xl bg-zinc-200/60" />
        </div>
      </div>
    </main>
  );
}
