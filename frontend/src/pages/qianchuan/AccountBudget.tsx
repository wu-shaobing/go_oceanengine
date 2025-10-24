/**
 * 预算管理页面
 */

import { Card, Table, Button, Space, Progress, Tag, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Plus, DollarSign, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';

const columns = [
  { title: '预算名称', dataIndex: 'name' },
  { title: '预算总额', dataIndex: 'total' },
  { title: '已使用', dataIndex: 'used' },
  { title: '剩余', dataIndex: 'remaining' },
  { 
    title: '使用进度', 
    dataIndex: 'progress',
    render: (progress: number) => <Progress percent={progress} size="small" />
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const color = status === '正常' ? 'green' : status === '预警' ? 'orange' : 'red';
      return <Tag color={color}>{status}</Tag>;
    }
  },
];

const dataSource = [
  { 
    key: '1', 
    name: '千川推广预算', 
    total: '¥300,000', 
    used: '¥178,234', 
    remaining: '¥121,766',
    progress: 59,
    status: '正常'
  },
  { 
    key: '2', 
    name: '达人合作预算', 
    total: '¥150,000', 
    used: '¥134,567', 
    remaining: '¥15,433',
    progress: 90,
    status: '预警'
  },
];

export default function AccountBudgetPage() {
  return (
    <PageTemplate
      title="预算管理"
      breadcrumb={[{ label: '巨量千川' }, { label: '预算管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建预算</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="总预算" value="￥450,000" icon={<DollarSign size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="已使用" value="￥312,801" icon={<TrendingUp size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="剩余预算" value="￥137,199" icon={<PiggyBank size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="预警项目" value="1" icon={<AlertTriangle size={24} />} />
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}