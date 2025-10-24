/**
 * 监测链接页面
 */

import { Card, Table, Button, Space, Tag, Typography } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Link, MousePointerClick, Target } from 'lucide-react';

const { Text } = Typography;

const columns = [
  { title: '链接ID', dataIndex: 'id' },
  { title: '链接名称', dataIndex: 'name' },
  { 
    title: '监测URL', 
    dataIndex: 'url',
    render: (url: string) => <Text code copyable>{url}</Text>
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
    )
  },
  { title: '点击次数', dataIndex: 'clicks' },
  { title: '转化次数', dataIndex: 'conversions' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'ST001', name: '首页监测', url: 'https://track.example.com/home', status: '正常', clicks: '12,345', conversions: '1,234', createTime: '2024-01-10' },
  { key: '2', id: 'ST002', name: '活动页监测', url: 'https://track.example.com/promo', status: '正常', clicks: '8,234', conversions: '892', createTime: '2024-01-12' },
  { key: '3', id: 'ST003', name: '商品详情页', url: 'https://track.example.com/product', status: '正常', clicks: '15,678', conversions: '2,345', createTime: '2024-01-15' },
];

export default function SitePage() {
  return (
    <PageTemplate
      title="监测链接"
      breadcrumb={[{ label: '资产管理' }, { label: '监测链接' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建监测链接</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总链接" 
          value={dataSource.length}
          icon={<Link size={24} />}
        />
        <DataCard 
          title="总点击次数" 
          value="36,257"
          icon={<MousePointerClick size={24} />}
        />
        <DataCard 
          title="总转化次数" 
          value="4,471"
          icon={<Target size={24} />}
        />
        <DataCard 
          title="平均转化率" 
          value="12.3%"
          trend={{ value: 5.7, direction: 'up' }}
        />
      </div>

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