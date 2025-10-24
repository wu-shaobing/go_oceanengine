/**
 * 达人合作记录页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Handshake, DollarSign } from 'lucide-react';

const columns = [
  { title: '合作ID', dataIndex: 'id' },
  { title: '达人名称', dataIndex: 'kolName' },
  { title: '合作商品', dataIndex: 'product' },
  { title: '合作类型', dataIndex: 'type' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '佣金', dataIndex: 'commission' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '进行中': 'blue',
        '已完成': 'green',
        '已取消': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '开始时间', dataIndex: 'startTime' },
];

const dataSource = [
  { 
    key: '1', 
    id: 'CO001', 
    kolName: '时尚小仙女', 
    product: '春季新款连衣裙',
    type: '直播带货',
    gmv: '¥89,234',
    commission: '¥8,923',
    status: '已完成',
    startTime: '2024-01-15'
  },
  { 
    key: '2', 
    id: 'CO002', 
    kolName: '好物推荐官', 
    product: '护肤套装',
    type: '短视频种草',
    gmv: '¥156,789',
    commission: '¥15,679',
    status: '进行中',
    startTime: '2024-01-18'
  },
];

export default function KOLCooperationPage() {
  return (
    <PageTemplate
      title="合作记录"
      breadcrumb={[{ label: '巨量千川' }, { label: '合作记录' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总合作" value={dataSource.length} icon={<Handshake size={24} />} />
        <DataCard title="总GMV" value="￥246,023" icon={<DollarSign size={24} />} />
        <DataCard title="总佣金" value="￥24,602" />
        <DataCard title="进行中" value="1" />
      </div>
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}