/**
 * 人群包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, RefreshCw, Users, Database } from 'lucide-react';

const columns = [
  { title: '人群包名称', dataIndex: 'name' },
  { title: '人群类型', dataIndex: 'type' },
  { title: '人群规模', dataIndex: 'scale' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '使用次数', dataIndex: 'usage' },
];

const dataSource = [
  { key: '1', name: '高价值用户', type: 'DMP人群', scale: '156万', status: '可用', createTime: '2024-01-10', usage: 8 },
  { key: '2', name: '潜在购买用户', type: '行为人群', scale: '234万', status: '可用', createTime: '2024-01-12', usage: 12 },
  { key: '3', name: '流失用户召回', type: 'CRM人群', scale: '89万', status: '生成中', createTime: '2024-01-20', usage: 0 },
];

export default function AudiencePage() {
  return (
    <PageTemplate
      title="人群包"
      breadcrumb={[{ label: '巨量千川' }, { label: '人群包' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建人群包</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总人群包" value={dataSource.length} icon={<Database size={24} />} />
        <DataCard title="人群总规模" value="479万" icon={<Users size={24} />} />
        <DataCard title="可用" value="2" />
        <DataCard title="总使用" value="20" />
      </div>
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}