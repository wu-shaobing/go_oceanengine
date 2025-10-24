import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, onChange, onValueChange, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full h-8 pl-3 pr-10 rounded border border-gray-300',
              'text-sm text-gray-900 appearance-none bg-white',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            onChange={(e) => {
              onChange?.(e.target.value);
              onValueChange?.(e.target.value);
            }}
            {...props}
          >
            {placeholder && (
              <option value="">{placeholder}</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
