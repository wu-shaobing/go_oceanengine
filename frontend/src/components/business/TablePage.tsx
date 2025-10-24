import { ReactNode } from 'react';
import { Card, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface TablePageProps {
  title?: string;
  filterForm?: ReactNode;
  actions?: Array<{
    label: string;
    type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
    icon?: ReactNode;
    onClick?: () => void;
    danger?: boolean;
  }>;
  table: ReactNode;
  extra?: ReactNode;
}

/**
 * 通用表格页面布局组件
 * 包含筛选区、操作按钮区、表格区
 */
export function TablePage({
  title,
  filterForm,
  actions = [],
  table,
  extra,
}: TablePageProps) {
  return (
    <div>
      {/* 筛选表单区 */}
      {filterForm && (
        <Card bordered={false} style={{ marginBottom: 16 }}>
          {filterForm}
        </Card>
      )}

      {/* 表格卡片 */}
      <Card bordered={false} title={title} extra={extra}>
        {/* 操作按钮 */}
        {actions.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Space>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  type={action.type || 'default'}
                  icon={action.icon}
                  onClick={action.onClick}
                  danger={action.danger}
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          </div>
        )}

        {/* 表格 */}
        {table}
      </Card>
    </div>
  );
}
