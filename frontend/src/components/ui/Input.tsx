import { forwardRef, InputHTMLAttributes } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors ${
          props.className || ''
        }`}
      />
    )
  }
)

Input.displayName = 'Input'
