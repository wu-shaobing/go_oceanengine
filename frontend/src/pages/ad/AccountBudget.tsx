/**
 * 预算管理页面
 */

import { Card, Table, Button, Space, Progress, Tag, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, DollarSign, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';

const columns = [
  { title: '预算名称', dataIndex: 'name' },
  { title: '预算总额', dataIndex: 'totalBudget' },
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
  { title: '周期', dataIndex: 'period' },
];

const dataSource = [
  { 
    key: '1', 
    name: '2024年Q1推广预算', 
    totalBudget: '¥500,000', 
    used: '¥345,678', 
    remaining: '¥154,322',
    progress: 69,
    status: '正常',
    period: '2024-01-01 ~ 2024-03-31'
  },
  { 
    key: '2', 
    name: '春季营销活动预算', 
    totalBudget: '¥200,000', 
    used: '¥178,234', 
    remaining: '¥21,766',
    progress: 89,
    status: '预警',
    period: '2024-02-01 ~ 2024-02-29'
  },
  { 
    key: '3', 
    name: '品牌曝光专项预算', 
    totalBudget: '¥300,000', 
    used: '¥156,789', 
    remaining: '¥143,211',
    progress: 52,
    status: '正常',
    period: '2024-01-15 ~ 2024-04-15'
  },
];

export default function AccountBudgetPage() {
  return (
    <PageTemplate
      title="预算管理"
      breadcrumb={[{ label: '账户管理' }, { label: '预算管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建预算</Button>
        </Space>
      }
    >
      {/* 预算概览 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard 
            title="总预算" 
            value="￥1,000,000" 
            icon={<DollarSign size={24} />}
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="已使用" 
            value="￥680,701" 
            icon={<TrendingUp size={24} />}
            trend={{ value: 68, direction: 'up' }} 
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="剩余预算" 
            value="￥319,299" 
            icon={<PiggyBank size={24} />}
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="预警项目" 
            value="1" 
            icon={<AlertTriangle size={24} />}
          />
        </Col>
      </Row>

      {/* 预算列表 */}
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
