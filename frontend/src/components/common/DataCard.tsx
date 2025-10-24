/**
 * 数据卡片组件
 * 用于展示统计数据
 */

import { ReactNode } from 'react';
import { Card } from 'antd';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  loading?: boolean;
  className?: string;
}

export function DataCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  loading,
  className,
}: DataCardProps) {
  return (
    <Card loading={loading} className={className} hoverable>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-gray-500 text-sm mb-2">{title}</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
          
          {trend && (
            <div
              className={`flex items-center text-xs mt-2 ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
