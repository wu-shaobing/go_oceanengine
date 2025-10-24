/**
 * 资金明细
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const columns = [
  {
    "title": "时间",
    "dataIndex": "time"
  },
  {
    "title": "交易类型",
    "dataIndex": "type"
  },
  {
    "title": "金额",
    "dataIndex": "amount",
    render: (amount: string) => {
      const isPositive = amount.startsWith('+');
      return <span style={{ color: isPositive ? '#52c41a' : '#ff4d4f' }}>{amount}</span>;
    }
  },
  {
    "title": "余额",
    "dataIndex": "balance"
  },
  {
    "title": "备注",
    "dataIndex": "remark"
  }
];

const dataSource = [
  {
    "key": "1",
    "time": "2024-01-20 14:23",
    "type": "充值",
    "amount": "+¥10,000",
    "balance": "¥125,678",
    "remark": "银行转账"
  },
  {
    "key": "2",
    "time": "2024-01-20 10:15",
    "type": "消耗",
    "amount": "-¥3,245",
    "balance": "¥115,678",
    "remark": "广告投放"
  },
  {
    "key": "3",
    "time": "2024-01-19 16:45",
    "type": "消耗",
    "amount": "-¥2,987",
    "balance": "¥118,923",
    "remark": "广告投放"
  }
];


export default function AccountFundsPage() {
  return (
    <PageTemplate
      title="资金明细"
      breadcrumb={[{ label: '账户管理' }, { label: '资金明细' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>充值</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="当前余额" 
          value="￥125,678"
          icon={<Wallet size={24} />}
        />
        <DataCard 
          title="今日充值" 
          value="￥10,000"
          icon={<TrendingUp size={24} />}
          trend={{ value: 100, direction: 'up' }}
        />
        <DataCard 
          title="今日消耗" 
          value="￥6,232"
          icon={<TrendingDown size={24} />}
        />
        <DataCard 
          title="交易记录" 
          value={dataSource.length}
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
