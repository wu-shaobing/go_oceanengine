/**
 * 佣金管理页面
 */

import { Card, Table, Button, Space, Tag, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const columns = [
  { title: '结算单号', dataIndex: 'id' },
  { title: '达人名称', dataIndex: 'kolName' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '佣金比例', dataIndex: 'rate' },
  { title: '佣金金额', dataIndex: 'commission' },
  { 
    title: '结算状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已结算': 'green',
        '待结算': 'orange',
        '结算中': 'blue',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '结算时间', dataIndex: 'settleTime' },
];

const dataSource = [
  { 
    key: '1', 
    id: 'CM001', 
    kolName: '时尚小仙女', 
    gmv: '¥89,234',
    rate: '10%',
    commission: '¥8,923',
    status: '已结算',
    settleTime: '2024-01-20'
  },
  { 
    key: '2', 
    id: 'CM002', 
    kolName: '好物推荐官', 
    gmv: '¥156,789',
    rate: '12%',
    commission: '¥18,815',
    status: '待结算',
    settleTime: '-'
  },
];

export default function CommissionPage() {
  return (
    <PageTemplate
      title="佣金管理"
      breadcrumb={[{ label: '巨量千川' }, { label: '佣金管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出账单</Button>
          <Button type="primary" icon={<Plus size={16} />}>批量结算</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="总佣金" value="￥156,789" icon={<DollarSign size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="待结算" value="￥45,678" icon={<Clock size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="已结算" value="￥111,111" icon={<CheckCircle size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="本月佣金" value="￥27,738" icon={<TrendingUp size={24} />} />
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}