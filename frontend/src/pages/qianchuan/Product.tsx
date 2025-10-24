/**
 * 商品管理
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';

const columns = [
  {
    "title": "商品ID",
    "dataIndex": "id"
  },
  {
    "title": "商品名称",
    "dataIndex": "name"
  },
  {
    "title": "价格",
    "dataIndex": "price"
  },
  {
    "title": "销量",
    "dataIndex": "sales"
  },
  {
    "title": "GMV",
    "dataIndex": "gmv"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '上架' ? 'green' : 'orange'}>{status}</Tag>
    )
  }
];

const dataSource = [
  {
    "key": "1",
    "id": "PD001",
    "name": "春季新款连衣裙",
    "price": "¥299",
    "sales": 1234,
    "gmv": "¥369,066",
    "status": "上架"
  },
  {
    "key": "2",
    "id": "PD002",
    "name": "护肤套装礼盒",
    "price": "¥599",
    "sales": 567,
    "gmv": "¥339,633",
    "status": "上架"
  },
  {
    "key": "3",
    "id": "PD003",
    "name": "运动鞋系列",
    "price": "¥399",
    "sales": 890,
    "gmv": "¥355,110",
    "status": "预售"
  }
];


export default function ProductPage() {
  return (
    <PageTemplate
      title="商品管理"
      breadcrumb={[{ label: '巨量千川' }, { label: '商品管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总商品" 
          value={dataSource.length}
          icon={<Package size={24} />}
        />
        <DataCard 
          title="总销量" 
          value="2,691"
          icon={<ShoppingCart size={24} />}
        />
        <DataCard 
          title="总GMV" 
          value="￥1,063,809"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="上架商品" 
          value="2"
          icon={<TrendingUp size={24} />}
        />
      </div>

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
