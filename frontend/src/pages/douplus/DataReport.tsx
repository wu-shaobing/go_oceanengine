/**
 * 数据报表
 */

import { Card, Table, Button, Space, DatePicker } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, BarChart3, Eye, ThumbsUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const columns = [
  {
    "title": "日期",
    "dataIndex": "date"
  },
  {
    "title": "播放量",
    "dataIndex": "plays"
  },
  {
    "title": "点赞数",
    "dataIndex": "likes"
  },
  {
    "title": "评论数",
    "dataIndex": "comments"
  },
  {
    "title": "分享数",
    "dataIndex": "shares"
  },
  {
    "title": "消耗",
    "dataIndex": "cost"
  }
];

const dataSource = [
  {
    "key": "1",
    "date": "2024-01-20",
    "plays": "456.7万",
    "likes": "12.3万",
    "comments": "2.3万",
    "shares": "1.5万",
    "cost": "¥3,456"
  },
  {
    "key": "2",
    "date": "2024-01-19",
    "plays": "389.2万",
    "likes": "10.5万",
    "comments": "1.9万",
    "shares": "1.2万",
    "cost": "¥2,987"
  },
  {
    "key": "3",
    "date": "2024-01-18",
    "plays": "312.5万",
    "likes": "8.7万",
    "comments": "1.5万",
    "shares": "0.9万",
    "cost": "¥2,456"
  }
];

const chartData = [
  { date: '01-15', value: 1200 },
  { date: '01-16', value: 1800 },
  { date: '01-17', value: 1500 },
  { date: '01-18', value: 2200 },
  { date: '01-19', value: 2800 },
  { date: '01-20', value: 3200 },
];

export default function DataReportPage() {
  return (
    <PageTemplate
      title="数据报表"
      breadcrumb={[{ label: '抖+' }, { label: '数据报表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总播放" value="1158.4万" icon={<Eye size={24} />} />
        <DataCard title="总点赞" value="31.5万" icon={<ThumbsUp size={24} />} />
        <DataCard title="总消耗" value="￥8,899" icon={<DollarSign size={24} />} />
        <DataCard title="总报表" value="3" icon={<BarChart3 size={24} />} />
      </div>

      {/* 数据趋势图表 */}
      <Card title="数据趋势" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1890ff" />
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
