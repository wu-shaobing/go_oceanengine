import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  // 简单的className合并,如果需要tailwind-merge可以后续添加
  return clsx(inputs);
}
