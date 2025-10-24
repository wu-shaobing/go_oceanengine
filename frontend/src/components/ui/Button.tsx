import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'link' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className = '', variant = 'default', size = 'md', ...props }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    link: 'text-blue-600 hover:underline p-0',
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant !== 'link' && sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  )
}
