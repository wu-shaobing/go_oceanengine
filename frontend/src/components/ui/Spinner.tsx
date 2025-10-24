interface SpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ text = '加载中...', size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <svg className={`animate-spin ${sizeClasses[size]} text-blue-600 dark:text-blue-400`} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      {text && <span>{text}</span>}
    </div>
  )
}
