/**
 * 抖+概览页面
 */

import { Card, Row, Col, Button, Space } from 'antd';
import { RefreshCw, Download } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { date: '01/01', value: 1200, value2: 800 },
  { date: '01/02', value: 1800, value2: 1200 },
  { date: '01/03', value: 1500, value2: 1000 },
  { date: '01/04', value: 2200, value2: 1600 },
  { date: '01/05', value: 2800, value2: 2000 },
  { date: '01/06', value: 2400, value2: 1800 },
  { date: '01/07', value: 3200, value2: 2400 },
];

export default function OverviewPage() {
  return (
    <PageTemplate
      title="抖+概览"
      breadcrumb={[{ label: '抖+' }, { label: '概览' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新数据</Button>
          <Button type="primary" icon={<Download size={16} />}>导出报表</Button>
        </Space>
      }
    >
      {/* 核心数据指标 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}><DataCard title="播放量" value="2,345,678" trend={{ value: 32.5, direction: 'up' }} /></Col>
        <Col span={6}><DataCard title="点赞数" value="123,456" trend={{ value: 28.3, direction: 'up' }} /></Col>
        <Col span={6}><DataCard title="订单数" value="8,765" trend={{ value: 15.2, direction: 'up' }} /></Col>
        <Col span={6}><DataCard title="消耗" value="¥12,345" trend={{ value: 5.7, direction: 'up' }} /></Col>
      </Row>

      {/* 趋势图表 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={12}>
          <Card title="数据趋势" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#1890ff" fill="#e6f7ff" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="对比分析" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1890ff" />
                <Line type="monotone" dataKey="value2" stroke="#52c41a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 快捷操作 */}
      <Card title="快捷操作" bordered={false}>
        <Space size="large">
          <Button type="primary" size="large">创建新抖+</Button>
          <Button size="large">批量管理</Button>
          <Button size="large">数据报表</Button>
          <Button size="large">设置</Button>
        </Space>
      </Card>
    </PageTemplate>
  );
}
