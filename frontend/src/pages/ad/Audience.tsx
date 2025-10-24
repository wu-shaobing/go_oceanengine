/**
 * 人群包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Users, TrendingUp, Database } from 'lucide-react';

const columns = [
  { title: '人群包名称', dataIndex: 'name' },
  { title: '人群类型', dataIndex: 'type' },
  { title: '人群规模', dataIndex: 'scale' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : status === '生成中' ? 'blue' : 'red'}>{status}</Tag>
    )
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', name: '高价值客户', type: 'DMP人群', scale: '156万', status: '可用', usage: 8, createTime: '2024-01-10' },
  { key: '2', name: '潜在购买用户', type: '行为人群', scale: '234万', status: '可用', usage: 12, createTime: '2024-01-12' },
  { key: '3', name: '流失用户召回', type: 'CRM人群', scale: '89万', status: '生成中', usage: 0, createTime: '2024-01-20' },
  { key: '4', name: '新客户群体', type: 'DMP人群', scale: '567万', status: '可用', usage: 25, createTime: '2024-01-08' },
];

export default function AudiencePage() {
  return (
    <PageTemplate
      title="人群包"
      breadcrumb={[{ label: '资产管理' }, { label: '人群包' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建人群包</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总人群包" 
          value={dataSource.length}
          icon={<Database size={24} />}
        />
        <DataCard 
          title="人群总规模" 
          value="1046万"
          icon={<Users size={24} />}
        />
        <DataCard 
          title="可用" 
          value="3"
          subtitle="生成中: 1"
        />
        <DataCard 
          title="总使用次数" 
          value="45"
          icon={<TrendingUp size={24} />}
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