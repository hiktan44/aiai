export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 animate-pulse rounded-lg bg-surface-elevated" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-surface" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-2xl border border-border bg-surface" />
    </div>
  );
}
