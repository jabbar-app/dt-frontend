export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-700 rounded-lg p-4 space-y-3">
      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      <div className="h-8 bg-gray-600 rounded w-1/2"></div>
      <div className="h-2 bg-gray-600 rounded w-full"></div>
      <div className="flex gap-2">
        <div className="h-3 bg-gray-600 rounded w-12"></div>
        <div className="h-3 bg-gray-600 rounded w-12"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
