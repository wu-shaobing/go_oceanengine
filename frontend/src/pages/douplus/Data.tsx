/**
 * 数据中心页面
 */

import { Button, Table, Space, Tag } from 'antd';
import { Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const mockData = [
  {
    key: '1',
    id: 'DT001',
    contentTitle: '春季穿搭分享',
    type: '视频加热',
    views: 456789,
    likes: 12345,
    comments: 3456,
    shares: 1234,
    cost: 1234,
    roi: '3.2',
    date: '2024-01-20',
  },
  {
    key: '2',
    id: 'DT002',
    contentTitle: '美食探店vlog',
    type: '视频加热',
    views: 234567,
    likes: 8901,
    comments: 2345,
    shares: 890,
    cost: 987,
    roi: '2.8',
    date: '2024-01-19',
  },
  {
    key: '3',
    id: 'DT003',
    contentTitle: '新品发布会直播',
    type: '直播加热',
    views: 189234,
    likes: 6543,
    comments: 1890,
    shares: 654,
    cost: 2345,
    roi: '4.1',
    date: '2024-01-18',
  },
  {
    key: '4',
    id: 'DT004',
    contentTitle: '旅行打卡记录',
    type: '视频加热',
    views: 123456,
    likes: 5432,
    comments: 1234,
    shares: 543,
    cost: 756,
    roi: '2.5',
    date: '2024-01-17',
  },
];

export default function DataPage() {
  const columns = [
    {
      title: '数据ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '内容标题',
      dataIndex: 'contentTitle',
      key: 'contentTitle',
      width: 200,
    },
    {
      title: '推广类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={type === '视频加热' ? 'blue' : 'purple'}>{type}</Tag>
      ),
    },
    {
      title: '播放量',
      dataIndex: 'views',
      key: 'views',
      width: 120,
      render: (val: number) => val.toLocaleString(),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '分享数',
      dataIndex: 'shares',
      key: 'shares',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '消耗(元)',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      width: 80,
      sorter: (a: any, b: any) => parseFloat(a.roi) - parseFloat(b.roi),
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">导出</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate
      title="数据中心"
      breadcrumb={[
        { label: '抖+' },
        { label: '数据中心' },
      ]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出报表</Button>
        </Space>
      }
    >
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="总播放量" value="1,234万" trend={{ value: 15.5, direction: 'up' }} />
        <DataCard title="总点赞数" value="56.7万" trend={{ value: 8.3, direction: 'up' }} />
        <DataCard title="总消耗" value="¥12,345" trend={{ value: 5.2, direction: 'up' }} />
        <DataCard title="平均ROI" value="3.2" trend={{ value: 0.5, direction: 'up' }} />
      </div>

      {/* 数据表格 */}
      <Table
        dataSource={mockData}
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={{
          showTotal: (total) => `共 ${total} 条数据`,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </PageTemplate>
  );
}
