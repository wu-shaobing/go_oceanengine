import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import ErrorMessage from '@/components/ErrorMessage'

interface QueryBoundaryProps<T> {
  query: {
    isLoading: boolean
    isError: boolean
    error?: Error & { userMessage?: string }
    data?: T
    refetch: () => void
  }
  skeleton?: React.ReactNode
  empty?: React.ReactNode
  children: React.ReactNode
  emptyCheck?: (data: T | undefined) => boolean
}

export function QueryBoundary<T = unknown>({
  query,
  skeleton,
  empty,
  children,
  emptyCheck,
}: QueryBoundaryProps<T>) {
  if (query.isLoading) {
    return <>{skeleton ?? <LoadingSkeleton rows={6} />}</>
  }

  if (query.isError) {
    const errorMsg = query.error?.userMessage || query.error?.message || '查询失败'
    return <ErrorMessage message={errorMsg} />
  }

  // Default empty check: no data or empty array
  const isEmpty = emptyCheck
    ? emptyCheck(query.data)
    : !query.data ||
      (Array.isArray(query.data) && query.data.length === 0) ||
      (query.data &&
        typeof query.data === 'object' &&
        'list' in query.data &&
        Array.isArray((query.data as { list: unknown[] }).list) &&
        (query.data as { list: unknown[] }).list.length === 0)

  if (isEmpty) {
    return <>{empty ?? <EmptyState message="暂无数据" />}</>
  }

  return <>{children}</>
}
