/**
 * 共享钱包页面
 */

import { Card, Table, Button, Space, Tag, Tabs, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, ArrowRightLeft, Wallet, DollarSign, TrendingDown, Users } from 'lucide-react';

const { TabPane } = Tabs;

const walletColumns = [
  { title: '钱包ID', dataIndex: 'id' },
  { title: '钱包名称', dataIndex: 'name' },
  { title: '余额', dataIndex: 'balance' },
  { title: '共享账户数', dataIndex: 'accountCount' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
    )
  },
  { title: '创建时间', dataIndex: 'createTime' },
];

const walletData = [
  { 
    key: '1', 
    id: 'SW001', 
    name: '主钱包', 
    balance: '¥256,789', 
    accountCount: 5,
    status: '正常',
    createTime: '2024-01-01'
  },
  { 
    key: '2', 
    id: 'SW002', 
    name: '营销活动专用钱包', 
    balance: '¥89,234', 
    accountCount: 3,
    status: '正常',
    createTime: '2024-01-15'
  },
];

const transactionColumns = [
  { title: '时间', dataIndex: 'time' },
  { title: '交易类型', dataIndex: 'type' },
  { title: '金额', dataIndex: 'amount' },
  { title: '关联账户', dataIndex: 'account' },
  { title: '余额', dataIndex: 'balance' },
  { title: '备注', dataIndex: 'remark' },
];

const transactionData = [
  { 
    key: '1', 
    time: '2024-01-20 14:30', 
    type: '转入', 
    amount: '+¥50,000',
    account: '主账户',
    balance: '¥256,789',
    remark: '充值'
  },
  { 
    key: '2', 
    time: '2024-01-20 10:15', 
    type: '分配', 
    amount: '-¥10,000',
    account: '子账户A',
    balance: '¥206,789',
    remark: '预算分配'
  },
  { 
    key: '3', 
    time: '2024-01-19 16:20', 
    type: '消耗', 
    amount: '-¥3,456',
    account: '子账户B',
    balance: '¥216,789',
    remark: '广告投放'
  },
];

export default function SharedWalletPage() {
  return (
    <PageTemplate
      title="共享钱包"
      breadcrumb={[{ label: '账户管理' }, { label: '共享钱包' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<ArrowRightLeft size={16} />}>转账</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建钱包</Button>
        </Space>
      }
    >
      {/* 钱包概览 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard 
            title="钱包总数" 
            value="2" 
            icon={<Wallet size={24} />}
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="总余额" 
            value="￥346,023" 
            icon={<DollarSign size={24} />}
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="今日消耗" 
            value="￥12,345" 
            icon={<TrendingDown size={24} />}
          />
        </Col>
        <Col span={6}>
          <DataCard 
            title="共享账户" 
            value="8" 
            icon={<Users size={24} />}
          />
        </Col>
      </Row>

      {/* 钱包管理 */}
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="钱包列表" key="1">
            <Table
              columns={walletColumns}
              dataSource={walletData}
              pagination={{
                total: walletData.length,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
            />
          </TabPane>
          
          <TabPane tab="交易记录" key="2">
            <Table
              columns={transactionColumns}
              dataSource={transactionData}
              pagination={{
                total: transactionData.length,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}
