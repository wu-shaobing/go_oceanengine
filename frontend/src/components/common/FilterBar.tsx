/**
 * 筛选条组件
 * 用于页面顶部的筛选区域
 */

import { ReactNode } from 'react';
import { Card } from 'antd';

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <Card className={`mb-4 ${className || ''}`}>
      <div className="flex flex-wrap gap-4 items-center">
        {children}
      </div>
    </Card>
  );
}
