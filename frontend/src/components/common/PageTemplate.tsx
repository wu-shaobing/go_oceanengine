/**
 * 页面通用模板
 * 提供统一的页面结构
 */

import { ReactNode } from 'react';
import { Breadcrumb, Card } from 'antd';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageTemplateProps {
  title: string;
  breadcrumb?: Array<{ label: string; path?: string }>;
  extra?: ReactNode;
  children: ReactNode;
}

export function PageTemplate({ title, breadcrumb, extra, children }: PageTemplateProps) {
  return (
    <div className="space-y-4">
      {/* 面包屑 */}
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <Home size={14} />
                </Link>
              ),
            },
            ...breadcrumb.map((item) => ({
              title: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
            })),
          ]}
        />
      )}

      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {extra && <div className="flex items-center gap-2">{extra}</div>}
      </div>

      {/* 页面内容 */}
      {children}
    </div>
  );
}
