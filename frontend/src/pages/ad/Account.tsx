/**
 * 账户管理
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const columns = [
  {
    "title": "账户ID",
    "dataIndex": "id"
  },
  {
    "title": "账户名称",
    "dataIndex": "name"
  },
  {
    "title": "账户余额",
    "dataIndex": "balance"
  },
  {
    "title": "消耗",
    "dataIndex": "cost"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '正常' ? 'green' : 'orange'}>{status}</Tag>
    )
  }
];

const dataSource = [
  {
    "key": "1",
    "id": "ACC001",
    "name": "主账户",
    "balance": "¥125,678",
    "cost": "¥45,234",
    "status": "正常"
  },
  {
    "key": "2",
    "id": "ACC002",
    "name": "子账户-推广",
    "balance": "¥56,789",
    "cost": "¥23,456",
    "status": "正常"
  },
  {
    "key": "3",
    "id": "ACC003",
    "name": "子账户-品牌",
    "balance": "¥8,234",
    "cost": "¥6,789",
    "status": "预警"
  }
];


export default function AccountPage() {
  return (
    <PageTemplate
      title="账户管理"
      breadcrumb={[{ label: '账户管理' }, { label: '账户概览' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总账户" 
          value={dataSource.length}
          icon={<CreditCard size={24} />}
        />
        <DataCard 
          title="总余额" 
          value="￥190,701"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="总消耗" 
          value="￥75,479"
          icon={<TrendingUp size={24} />}
          trend={{ value: 12.3, direction: 'up' }}
        />
        <DataCard 
          title="预警账户" 
          value="1"
          icon={<AlertCircle size={24} />}
        />
      </div>

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}
