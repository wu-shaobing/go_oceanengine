/**
 * 账户资金页面
 */

import { Card, Table, Button, Space, Tabs, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Plus, Wallet, TrendingDown, Calendar } from 'lucide-react';

const { TabPane } = Tabs;

const transColumns = [
  { title: '时间', dataIndex: 'time' },
  { title: '交易类型', dataIndex: 'type' },
  { title: '金额', dataIndex: 'amount' },
  { title: '余额', dataIndex: 'balance' },
  { title: '备注', dataIndex: 'remark' },
];

const transData = [
  { key: '1', time: '2024-01-20 14:30', type: '充值', amount: '+¥50,000', balance: '¥256,789', remark: '银行转账' },
  { key: '2', time: '2024-01-20 10:15', type: '消耗', amount: '-¥8,234', balance: '¥206,789', remark: '推广消耗' },
  { key: '3', time: '2024-01-19 16:20', type: '消耗', amount: '-¥5,678', balance: '¥215,023', remark: '推广消耗' },
];

export default function AccountFundsPage() {
  return (
    <PageTemplate
      title="账户资金"
      breadcrumb={[{ label: '巨量千川' }, { label: '账户资金' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>充值</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="账户余额" value="￥256,789" icon={<Wallet size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="今日消耗" value="￥8,234" icon={<TrendingDown size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="本月消耗" value="￥156,789" icon={<TrendingDown size={24} />} />
        </Col>
        <Col span={6}>
          <DataCard title="预估可用天数" value="31天" icon={<Calendar size={24} />} />
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="交易记录" key="1">
            <Table columns={transColumns} dataSource={transData} />
          </TabPane>
          <TabPane tab="充值记录" key="2">
            <div className="text-center py-10 text-gray-500">暂无充值记录</div>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}