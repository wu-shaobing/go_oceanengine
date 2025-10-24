/**
 * 操作栏组件
 * 用于页面顶部的操作按钮区域
 */

import { ReactNode } from 'react';

interface ActionBarProps {
  title?: string;
  extra?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ActionBar({ title, extra, children, className }: ActionBarProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className || ''}`}>
      {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
      {children}
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
  );
}
