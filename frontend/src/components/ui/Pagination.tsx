import { Button } from './Button'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  hasNextPage?: boolean
  totalItems?: number
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  onPageChange,
  hasNextPage = true,
  totalItems,
  isLoading = false
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {totalItems !== undefined && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          共 {totalItems} 条
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          上一页
        </Button>
        <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
          第 {currentPage} 页
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
        >
          下一页
        </Button>
      </div>
    </div>
  )
}
