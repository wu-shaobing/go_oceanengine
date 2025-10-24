/**
 * 定向包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Target, Users, CheckCircle } from 'lucide-react';

const columns = [
  { title: '定向包名称', dataIndex: 'name' },
  { title: '定向条件', dataIndex: 'conditions' },
  { title: '预估覆盖', dataIndex: 'coverage' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', name: '女性用户-18-30岁', conditions: '性别:女, 年龄:18-30, 城市:一二线', coverage: '8,500万', status: '可用', usage: 23, createTime: '2024-01-10' },
  { key: '2', name: '高消费人群', conditions: '消费能力:高, 兴趣:奢侈品', coverage: '2,300万', status: '可用', usage: 15, createTime: '2024-01-12' },
  { key: '3', name: '美妆护肤爱好者', conditions: '兴趣:美妆/护肤/个护', coverage: '5,600万', status: '可用', usage: 31, createTime: '2024-01-15' },
  { key: '4', name: '母婴用户群体', conditions: '生活阶段:育儿期, 性别:女', coverage: '3,200万', status: '可用', usage: 18, createTime: '2024-01-17' },
];

export default function TargetingPage() {
  return (
    <PageTemplate
      title="定向包"
      breadcrumb={[{ label: '资产管理' }, { label: '定向包' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建定向包</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总定向包" 
          value={dataSource.length}
          icon={<Target size={24} />}
        />
        <DataCard 
          title="预估覆盖" 
          value="1.96亿"
          icon={<Users size={24} />}
        />
        <DataCard 
          title="可用" 
          value={dataSource.length}
          icon={<CheckCircle size={24} />}
        />
        <DataCard 
          title="总使用次数" 
          value="87"
          trend={{ value: 15.3, direction: 'up' }}
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