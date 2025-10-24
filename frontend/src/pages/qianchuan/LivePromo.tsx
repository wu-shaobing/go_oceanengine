/**
 * 直播间推广页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Radio, Eye, DollarSign, TrendingUp } from 'lucide-react';

const columns = [
  { title: '推广ID', dataIndex: 'id' },
  { title: '直播间', dataIndex: 'liveName' },
  { title: '观看人数', dataIndex: 'viewers' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '消耗', dataIndex: 'cost' },
  { title: 'ROI', dataIndex: 'roi' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '直播中' ? 'red' : 'default'}>{status}</Tag>
    )
  },
  { title: '开播时间', dataIndex: 'startTime' },
];

const dataSource = [
  { key: '1', id: 'LP001', liveName: '春季新品发布会', viewers: '23.5万', gmv: '¥456,789', cost: '¥28,234', roi: '16.2', status: '直播中', startTime: '2024-01-20 19:00' },
  { key: '2', id: 'LP002', liveName: '限时秒杀专场', viewers: '15.8万', gmv: '¥234,567', cost: '¥15,678', roi: '15.0', status: '已结束', startTime: '2024-01-19 20:00' },
  { key: '3', id: 'LP003', liveName: '会员专享福利', viewers: '12.3万', gmv: '¥189,234', cost: '¥12,345', roi: '15.3', status: '已结束', startTime: '2024-01-18 21:00' },
  { key: '4', id: 'LP004', liveName: '品牌日活动', viewers: '18.6万', gmv: '¥312,456', cost: '¥19,876', roi: '15.7', status: '已结束', startTime: '2024-01-17 20:30' },
];

export default function LivePromoPage() {
  return (
    <PageTemplate
      title="直播间推广"
      breadcrumb={[{ label: '巨量千川' }, { label: '直播间推广' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建推广</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总推广" 
          value={dataSource.length}
          icon={<Radio size={24} />}
        />
        <DataCard 
          title="总观看" 
          value="70.2万"
          icon={<Eye size={24} />}
        />
        <DataCard 
          title="总GMV" 
          value="￥1,193,046"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="平均ROI" 
          value="15.8"
          icon={<TrendingUp size={24} />}
          trend={{ value: 6.5, direction: 'up' }}
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
