interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'danger' | 'info' | 'secondary' | 'default'
  size?: 'sm' | 'md'
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900',
    warning: 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900',
    error: 'bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-900',
    danger: 'bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-900',
    info: 'bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}
