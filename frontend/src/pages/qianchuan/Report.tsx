/**
 * 千川报表页面
 */

import { Card, Table, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, BarChart, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: '01-15', gmv: 456789, cost: 28234 },
  { date: '01-16', gmv: 523456, cost: 31245 },
  { date: '01-17', gmv: 489234, cost: 29876 },
  { date: '01-18', gmv: 612345, cost: 38234 },
  { date: '01-19', gmv: 578923, cost: 35678 },
  { date: '01-20', gmv: 689456, cost: 42345 },
];

const columns = [
  { title: '日期', dataIndex: 'date' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '订单数', dataIndex: 'orders' },
  { title: '消耗', dataIndex: 'cost' },
  { title: 'ROI', dataIndex: 'roi' },
  { title: '点击量', dataIndex: 'clicks' },
];

const dataSource = [
  { key: '1', date: '2024-01-20', gmv: '¥689,456', orders: '2,345', cost: '¥42,345', roi: '16.3', clicks: '98,765' },
  { key: '2', date: '2024-01-19', gmv: '¥578,923', orders: '2,123', cost: '¥35,678', roi: '16.2', clicks: '87,654' },
  { key: '3', date: '2024-01-18', gmv: '¥612,345', orders: '2,234', cost: '¥38,234', roi: '16.0', clicks: '91,234' },
  { key: '4', date: '2024-01-17', gmv: '¥489,234', orders: '1,876', cost: '¥29,876', roi: '16.4', clicks: '76,543' },
];

export default function ReportPage() {
  return (
    <PageTemplate
      title="千川报表"
      breadcrumb={[{ label: '巨量千川' }, { label: '数据报表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总GMV" 
          value="￥3,849,858"
          icon={<BarChart size={24} />}
        />
        <DataCard 
          title="总订单" 
          value="8,578"
          icon={<ShoppingCart size={24} />}
        />
        <DataCard 
          title="总消耗" 
          value="￥234,367"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="平均ROI" 
          value="16.4"
          icon={<TrendingUp size={24} />}
          trend={{ value: 5.2, direction: 'up' }}
        />
      </div>

      {/* 数据趋势图表 */}
      <Card title="GMV趋势" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="gmv" stroke="#1890ff" name="GMV" />
            <Line type="monotone" dataKey="cost" stroke="#52c41a" name="消耗" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

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
