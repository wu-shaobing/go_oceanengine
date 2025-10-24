/**
 * 创意管理页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Image, MousePointerClick, TrendingUp } from 'lucide-react';

const columns = [
  { title: '创意ID', dataIndex: 'id' },
  { title: '创意标题', dataIndex: 'title' },
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
  { title: '点击率', dataIndex: 'ctr' },
  { title: '转化率', dataIndex: 'cvr' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'CR001', title: '春季新品大促', type: '大图', status: '已通过', ctr: '5.2%', cvr: '2.8%', createTime: '2024-01-15' },
  { key: '2', id: 'CR002', title: '限时秒杀活动', type: '视频', status: '已通过', ctr: '8.7%', cvr: '4.3%', createTime: '2024-01-16' },
  { key: '3', id: 'CR003', title: '品牌故事传播', type: '组图', status: '审核中', ctr: '-', cvr: '-', createTime: '2024-01-20' },
  { key: '4', id: 'CR004', title: '会员日专享', type: '大图', status: '已通过', ctr: '6.3%', cvr: '3.1%', createTime: '2024-01-18' },
];

export default function CreativePage() {
  return (
    <PageTemplate
      title="创意管理"
      breadcrumb={[{ label: '资产管理' }, { label: '创意管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建创意</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总创意" 
          value={dataSource.length}
          icon={<Image size={24} />}
        />
        <DataCard 
          title="已通过" 
          value="3"
          subtitle="审核中: 1"
        />
        <DataCard 
          title="平均点击率" 
          value="6.8%"
          icon={<MousePointerClick size={24} />}
        />
        <DataCard 
          title="平均转化率" 
          value="3.4%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 8.2, direction: 'up' }}
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