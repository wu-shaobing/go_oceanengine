/**
 * 商品推广页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

const columns = [
  { title: '推广ID', dataIndex: 'id' },
  { title: '商品名称', dataIndex: 'productName' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '消耗', dataIndex: 'cost' },
  { title: 'ROI', dataIndex: 'roi' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '投放中' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'PP001', productName: '春季新款连衣裙', gmv: '¥89,234', cost: '¥5,678', roi: '15.7', status: '投放中', createTime: '2024-01-15' },
  { key: '2', id: 'PP002', productName: '护肤套装礼盒', gmv: '¥156,789', cost: '¥9,876', roi: '15.9', status: '投放中', createTime: '2024-01-16' },
  { key: '3', id: 'PP003', productName: '运动鞋系列', gmv: '¥45,678', cost: '¥3,234', roi: '14.1', status: '暂停', createTime: '2024-01-17' },
  { key: '4', id: 'PP004', productName: '智能手表', gmv: '¥123,456', cost: '¥8,234', roi: '15.0', status: '投放中', createTime: '2024-01-18' },
];

export default function ProductPromoPage() {
  return (
    <PageTemplate
      title="商品推广"
      breadcrumb={[{ label: '巨量千川' }, { label: '商品推广' }]}
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
          icon={<ShoppingBag size={24} />}
        />
        <DataCard 
          title="总GMV" 
          value="￥415,157"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="总消耗" 
          value="￥27,022"
          icon={<TrendingUp size={24} />}
        />
        <DataCard 
          title="平均ROI" 
          value="15.2"
          trend={{ value: 8.3, direction: 'up' }}
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
