import { FileX2, Plus } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  message?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon = <FileX2 className="w-16 h-16 text-gray-400" />,
  message = '暂无数据',
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon}
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        {message}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  )
}
