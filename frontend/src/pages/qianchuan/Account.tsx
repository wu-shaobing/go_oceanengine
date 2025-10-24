/**
 * 千川账户概览
 */

import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Wallet, CreditCard } from 'lucide-react';

export default function QianchuanAccountPage() {
  return (
    <PageTemplate
      title="账户概览"
      breadcrumb={[{ label: '巨量千川' }, { label: '账户概览' }]}
      extra={
        <Space>
          <Button icon={<Wallet size={16} />}>充值</Button>
          <Button type="primary" icon={<CreditCard size={16} />}>账户设置</Button>
        </Space>
      }
    >
      {/* 账户余额卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="账户余额" value="¥125,678" />
        <DataCard title="今日消耗" value="¥12,345" trend={{ value: 8.5, direction: 'up' }} />
        <DataCard title="本月消耗" value="¥345,678" trend={{ value: 15.2, direction: 'up' }} />
        <DataCard title="预算剩余" value="¥54,322" trend={{ value: 5.8, direction: 'down' }} />
      </div>

      <Row gutter={16} className="mb-6">
        {/* 账户信息 */}
        <Col xs={24} lg={12}>
          <Card title="账户信息" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">账户ID</span>
                <span className="font-medium">QC20240120001</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">账户类型</span>
                <span className="font-medium">千川推广账户</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">账户状态</span>
                <span className="text-green-600 font-medium">正常</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">认证状态</span>
                <span className="text-green-600 font-medium">已认证</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">开户时间</span>
                <span className="font-medium">2024-01-15</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* 消耗统计 */}
        <Col xs={24} lg={12}>
          <Card title="消耗统计" className="h-full">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="今日消耗"
                  value={12345}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix="¥"
                  suffix={<ArrowUpOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="昨日消耗"
                  value={11234}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix="¥"
                  suffix={<ArrowDownOutlined />}
                />
              </Col>
            </Row>
            <Row gutter={16} className="mt-8">
              <Col span={12}>
                <Statistic
                  title="本月消耗"
                  value={345678}
                  precision={2}
                  prefix="¥"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="上月消耗"
                  value={298765}
                  precision={2}
                  prefix="¥"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 快捷入口 */}
      <Card title="快捷入口">
        <Row gutter={16}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>账户资金</Button>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>预算管理</Button>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>消费记录</Button>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>充值记录</Button>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>账户设置</Button>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Button type="link" block>发票管理</Button>
          </Col>
        </Row>
      </Card>
    </PageTemplate>
  );
}
