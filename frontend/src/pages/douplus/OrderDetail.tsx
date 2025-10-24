/**
 * 订单详情
 */

import { Card, Descriptions, Tag, Steps, Table, Space, Button } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { ArrowLeft, ShoppingCart, DollarSign, Target, TrendingUp } from 'lucide-react';

const orderData = {
  orderNo: 'DP20240120001',
  contentTitle: '春季穿搭分享',
  contentType: '视频加热',
  status: 'running',
  budget: 1234,
  spent: 856,
  goal: '播放量',
  targetValue: 100000,
  currentValue: 68500,
  createTime: '2024-01-20 10:30:00',
  startTime: '2024-01-20 11:00:00',
  endTime: '2024-01-22 11:00:00',
};

const dataHistory = [
  { key: '1', date: '2024-01-20', views: 25680, likes: 1234, comments: 456, shares: 234, spent: 312 },
  { key: '2', date: '2024-01-21', views: 28450, likes: 1456, comments: 523, shares: 267, spent: 356 },
  { key: '3', date: '2024-01-22', views: 14370, likes: 689, comments: 234, shares: 123, spent: 188 },
];

export default function OrderDetailPage() {
  const columns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '播放量', dataIndex: 'views', key: 'views', render: (val: number) => val.toLocaleString() },
    { title: '点赞数', dataIndex: 'likes', key: 'likes', render: (val: number) => val.toLocaleString() },
    { title: '评论数', dataIndex: 'comments', key: 'comments' },
    { title: '分享数', dataIndex: 'shares', key: 'shares' },
    { title: '消耗(元)', dataIndex: 'spent', key: 'spent', render: (val: number) => `¥${val}` },
  ];

  return (
    <PageTemplate
      title="订单详情"
      breadcrumb={[{ label: '抖+' }, { label: '订单列表' }, { label: '订单详情' }]}
      extra={<Button icon={<ArrowLeft size={16} />}>返回列表</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="订单状态" value="投放中" icon={<ShoppingCart size={24} />} />
        <DataCard title="总预算" value="￥1,234" icon={<DollarSign size={24} />} />
        <DataCard title="已消耗" value="￥856" icon={<TrendingUp size={24} />} />
        <DataCard title="完成率" value="69%" icon={<Target size={24} />} />
      </div>

      <Card title="订单信息" className="mb-4">
        <Descriptions column={2}>
          <Descriptions.Item label="订单号">{orderData.orderNo}</Descriptions.Item>
          <Descriptions.Item label="订单状态"><Tag color="green">投放中</Tag></Descriptions.Item>
          <Descriptions.Item label="推广内容">{orderData.contentTitle}</Descriptions.Item>
          <Descriptions.Item label="推广类型">{orderData.contentType}</Descriptions.Item>
          <Descriptions.Item label="推广目标">{orderData.goal}</Descriptions.Item>
          <Descriptions.Item label="目标值">{orderData.targetValue.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="当前完成">{orderData.currentValue.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="完成率">{Math.round((orderData.currentValue / orderData.targetValue) * 100)}%</Descriptions.Item>
          <Descriptions.Item label="投放预算">¥{orderData.budget}</Descriptions.Item>
          <Descriptions.Item label="已消耗">¥{orderData.spent}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{orderData.createTime}</Descriptions.Item>
          <Descriptions.Item label="投放时间">{orderData.startTime} ~ {orderData.endTime}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="投放进度" className="mb-4">
        <Steps current={1} items={[
          { title: '创建订单', description: orderData.createTime },
          { title: '投放中', description: '正在推广' },
          { title: '待完成', description: '预计2024-01-22完成' },
        ]} />
      </Card>

      <Card title="数据历史">
        <Table dataSource={dataHistory} columns={columns} pagination={false} />
      </Card>
    </PageTemplate>
  );
}
