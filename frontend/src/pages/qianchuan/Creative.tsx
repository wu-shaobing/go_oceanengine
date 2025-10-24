/**
 * 创意素材页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, RefreshCw, Image, CheckCircle } from 'lucide-react';

const columns = [
  { title: '创意ID', dataIndex: 'id' },
  { title: '创意名称', dataIndex: 'name' },
  { title: '创意类型', dataIndex: 'type' },
  { 
    title: '审核状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已通过': 'green',
        '审核中': 'blue',
        '未通过': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'CR001', name: '春季新品创意', type: '图文', status: '已通过', usage: 15, createTime: '2024-01-15' },
  { key: '2', id: 'CR002', name: '限时秒杀视频', type: '视频', status: '已通过', usage: 23, createTime: '2024-01-16' },
  { key: '3', id: 'CR003', name: '品牌故事长图', type: '图文', status: '审核中', usage: 0, createTime: '2024-01-20' },
];

export default function CreativePage() {
  return (
    <PageTemplate
      title="创意素材"
      breadcrumb={[{ label: '巨量千川' }, { label: '创意素材' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建创意</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总创意" value={dataSource.length} icon={<Image size={24} />} />
        <DataCard title="已通过" value="2" icon={<CheckCircle size={24} />} />
        <DataCard title="审核中" value="1" />
        <DataCard title="总使用" value="38" />
      </div>
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}