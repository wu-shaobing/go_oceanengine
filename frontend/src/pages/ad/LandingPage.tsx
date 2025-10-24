/**
 * 落地页页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, FileText, Eye, TrendingUp } from 'lucide-react';

const columns = [
  { title: '落地页ID', dataIndex: 'id' },
  { title: '落地页名称', dataIndex: 'name' },
  { title: 'URL', dataIndex: 'url' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '已发布' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '访问次数', dataIndex: 'visits' },
  { title: '转化率', dataIndex: 'cvr' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'LP001', name: '春季活动落地页', url: 'https://example.com/spring', status: '已发布', visits: '12,345', cvr: '8.5%', createTime: '2024-01-15' },
  { key: '2', id: 'LP002', name: '新品发布页面', url: 'https://example.com/new-product', status: '已发布', visits: '8,234', cvr: '6.2%', createTime: '2024-01-16' },
  { key: '3', id: 'LP003', name: '限时优惠页', url: 'https://example.com/sale', status: '草稿', visits: '0', cvr: '-', createTime: '2024-01-20' },
];

export default function LandingPagePage() {
  return (
    <PageTemplate
      title="落地页"
      breadcrumb={[{ label: '资产管理' }, { label: '落地页' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建落地页</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总落地页" 
          value={dataSource.length}
          icon={<FileText size={24} />}
        />
        <DataCard 
          title="总访问次数" 
          value="20,579"
          icon={<Eye size={24} />}
        />
        <DataCard 
          title="平均转化率" 
          value="7.4%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 12.5, direction: 'up' }}
        />
        <DataCard 
          title="已发布" 
          value="2"
          subtitle="草稿: 1"
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