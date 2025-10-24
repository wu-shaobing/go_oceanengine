interface LoadingSkeletonProps {
  rows?: number
  className?: string
}

export function LoadingSkeleton({ rows = 5, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4 mb-4">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
