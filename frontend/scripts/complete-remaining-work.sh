#!/bin/bash

echo "🚀 开始完成剩余工作..."

# 1. 创建 ApiTools.tsx
cat > src/pages/douplus/ApiTools.tsx << 'EOF'
/**
 * API工具
 */

import { Card, Tabs, Form, Input, Button, Select, Space, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { ApiOutlined, KeyOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function ApiToolsPage() {
  const [response, setResponse] = useState('');

  return (
    <PageTemplate
      title="API工具"
      breadcrumb={[{ label: '快捷工具' }, { label: 'API工具' }]}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><ApiOutlined />接口调试</span>} key="1">
          <Card>
            <Form layout="vertical">
              <Form.Item label="接口地址" name="endpoint">
                <Select placeholder="选择API接口">
                  <Select.Option value="/douplus/video/create">创建视频加热订单</Select.Option>
                  <Select.Option value="/douplus/live/create">创建直播加热订单</Select.Option>
                  <Select.Option value="/douplus/order/query">查询订单状态</Select.Option>
                  <Select.Option value="/douplus/data/report">获取数据报表</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="请求参数" name="params">
                <TextArea
                  rows={6}
                  placeholder='{"key": "value"}'
                  defaultValue='{"video_id": "123456", "budget": 500}'
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={() => setResponse('{"code": 0, "message": "success", "data": {"order_id": "DP20240120001", "status": "running"}}')}>
                  发送请求
                </Button>
              </Form.Item>

              {response && (
                <Form.Item label="响应结果">
                  <TextArea rows={8} value={response} readOnly />
                </Form.Item>
              )}
            </Form>
          </Card>
        </TabPane>

        <TabPane tab={<span><KeyOutlined />访问凭证</span>} key="2">
          <Card>
            <Alert
              message="API访问凭证"
              description="请妥善保管您的API密钥，不要泄露给他人"
              type="info"
              showIcon
              className="mb-4"
            />
            <Form layout="vertical">
              <Form.Item label="App ID">
                <Input value="douplus_app_123456" readOnly />
              </Form.Item>
              <Form.Item label="App Secret">
                <Input.Password value="sk_live_abc123def456ghi789" readOnly />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button>重新生成</Button>
                  <Button>复制密钥</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab={<span><FileTextOutlined />接口文档</span>} key="3">
          <Card>
            <div className="prose max-w-none">
              <h3>抖+API接口文档</h3>
              <h4>1. 创建视频加热订单</h4>
              <pre className="bg-gray-100 p-4 rounded">
POST /douplus/video/create
{`{
  "video_id": "视频ID",
  "budget": 500,
  "goal": "views"
}`}
              </pre>
              
              <h4>2. 查询订单状态</h4>
              <pre className="bg-gray-100 p-4 rounded">
GET /douplus/order/query?order_id=DP20240120001
              </pre>

              <h4>3. 获取数据报表</h4>
              <pre className="bg-gray-100 p-4 rounded">
GET /douplus/data/report?start_date=2024-01-01&end_date=2024-01-31
              </pre>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
}
EOF

echo "✅ 1/6 ApiTools.tsx 创建完成"

# 2. 创建 OrderDetail.tsx
cat > src/pages/douplus/OrderDetail.tsx << 'EOF'
/**
 * 订单详情
 */

import { Card, Descriptions, Tag, Steps, Table, Space, Button } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { ArrowLeft } from 'lucide-react';

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
      breadcrumb={[{ label: '订单中心' }, { label: '订单列表' }, { label: '订单详情' }]}
      extra={<Button icon={<ArrowLeft size={16} />}>返回列表</Button>}
    >
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
EOF

echo "✅ 2/6 OrderDetail.tsx 创建完成"

# 3. 创建 Video.tsx
cat > src/pages/douplus/Video.tsx << 'EOF'
/**
 * 视频管理
 */

import { Table, Button, Space, Tag, Image } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { RefreshCw, Download } from 'lucide-react';

const mockData = [
  { key: '1', id: 'VD001', title: '春季穿搭分享', cover: 'https://via.placeholder.com/100x100?text=Video1', duration: '00:01:30', views: 456789, likes: 12345, comments: 3456, status: 'published', createTime: '2024-01-20 10:30' },
  { key: '2', id: 'VD002', title: '美食探店vlog', cover: 'https://via.placeholder.com/100x100?text=Video2', duration: '00:02:15', views: 234567, likes: 8901, comments: 2345, status: 'published', createTime: '2024-01-19 14:20' },
  { key: '3', id: 'VD003', title: '旅行打卡记录', cover: 'https://via.placeholder.com/100x100?text=Video3', duration: '00:01:45', views: 189234, likes: 6543, comments: 1890, status: 'reviewing', createTime: '2024-01-18 09:15' },
];

const statusMap: Record<string, { text: string; color: string }> = {
  published: { text: '已发布', color: 'green' },
  reviewing: { text: '审核中', color: 'blue' },
  rejected: { text: '未通过', color: 'red' },
  draft: { text: '草稿', color: 'gray' },
};

export default function VideoPage() {
  const columns = [
    { title: '视频ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '封面', dataIndex: 'cover', key: 'cover', width: 120, render: (url: string) => <Image src={url} width={80} height={80} /> },
    { title: '视频标题', dataIndex: 'title', key: 'title', width: 200 },
    { title: '时长', dataIndex: 'duration', key: 'duration', width: 100 },
    { title: '播放量', dataIndex: 'views', key: 'views', width: 120, render: (val: number) => val.toLocaleString(), sorter: (a: any, b: any) => a.views - b.views },
    { title: '点赞数', dataIndex: 'likes', key: 'likes', width: 100, render: (val: number) => val.toLocaleString() },
    { title: '评论数', dataIndex: 'comments', key: 'comments', width: 100, render: (val: number) => val.toLocaleString() },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag> },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 160 },
    { title: '操作', key: 'action', width: 150, fixed: 'right' as const, render: () => <Space><Button type="link" size="small">加热</Button><Button type="link" size="small">数据</Button><Button type="link" size="small">编辑</Button></Space> },
  ];

  return (
    <PageTemplate title="视频管理" breadcrumb={[{ label: '内容管理' }, { label: '视频管理' }]} extra={<Space><Button icon={<RefreshCw size={16} />}>刷新</Button><Button icon={<Download size={16} />}>导出</Button></Space>}>
      <Table dataSource={mockData} columns={columns} scroll={{ x: 1300 }} pagination={{ showTotal: (total) => `共 ${total} 个视频`, showSizeChanger: true, defaultPageSize: 10 }} />
    </PageTemplate>
  );
}
EOF

echo "✅ 3/6 Video.tsx 创建完成"

# 4. 创建 Live.tsx
cat > src/pages/douplus/Live.tsx << 'EOF'
/**
 * 直播管理
 */

import { Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { RefreshCw, Download } from 'lucide-react';

const mockData = [
  { key: '1', id: 'LV001', title: '新品发布会直播', status: 'live', viewers: 235680, maxViewers: 45678, likes: 12345, comments: 5678, duration: '02:30:15', startTime: '2024-01-20 10:00' },
  { key: '2', id: 'LV002', title: '限时秒杀活动', status: 'ended', viewers: 0, maxViewers: 32456, likes: 8901, comments: 3456, duration: '01:45:20', startTime: '2024-01-19 14:00' },
  { key: '3', id: 'LV003', title: '粉丝福利日', status: 'ended', viewers: 0, maxViewers: 28934, likes: 7654, comments: 2890, duration: '02:00:00', startTime: '2024-01-18 15:00' },
];

const statusMap: Record<string, { text: string; color: string }> = {
  live: { text: '直播中', color: 'red' },
  ended: { text: '已结束', color: 'gray' },
  scheduled: { text: '预告中', color: 'blue' },
};

export default function LivePage() {
  const columns = [
    { title: '直播间ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '直播标题', dataIndex: 'title', key: 'title', width: 200 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag> },
    { title: '当前观看', dataIndex: 'viewers', key: 'viewers', width: 120, render: (val: number, record: any) => record.status === 'live' ? val.toLocaleString() : '-' },
    { title: '最高在线', dataIndex: 'maxViewers', key: 'maxViewers', width: 120, render: (val: number) => val.toLocaleString() },
    { title: '点赞数', dataIndex: 'likes', key: 'likes', width: 100, render: (val: number) => val.toLocaleString() },
    { title: '评论数', dataIndex: 'comments', key: 'comments', width: 100, render: (val: number) => val.toLocaleString() },
    { title: '直播时长', dataIndex: 'duration', key: 'duration', width: 120 },
    { title: '开播时间', dataIndex: 'startTime', key: 'startTime', width: 160 },
    { title: '操作', key: 'action', width: 150, fixed: 'right' as const, render: (_: any, record: any) => <Space>{record.status === 'live' ? <Button type="link" size="small" danger>结束直播</Button> : <><Button type="link" size="small">加热</Button><Button type="link" size="small">数据</Button></>}</Space> },
  ];

  return (
    <PageTemplate title="直播管理" breadcrumb={[{ label: '内容管理' }, { label: '直播管理' }]} extra={<Space><Button icon={<RefreshCw size={16} />}>刷新</Button><Button icon={<Download size={16} />}>导出</Button></Space>}>
      <Table dataSource={mockData} columns={columns} scroll={{ x: 1300 }} pagination={{ showTotal: (total) => `共 ${total} 场直播`, showSizeChanger: true, defaultPageSize: 10 }} />
    </PageTemplate>
  );
}
EOF

echo "✅ 4/6 Live.tsx 创建完成"

echo ""
echo "✅ 所有抖+页面创建完成！"
echo "📝 接下来需要更新 MaterialUpload.tsx 和 routes.ts"
