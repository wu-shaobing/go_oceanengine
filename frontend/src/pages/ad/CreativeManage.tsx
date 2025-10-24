/**
 * 创意管理页面（顶部导航）
 */

import { Button, Table, Space, Tag, Image } from 'antd';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const mockData = [
  {
    key: '1',
    id: 'CR001',
    title: '春季新品创意-A',
    type: '大图',
    status: '已通过',
    image: 'https://via.placeholder.com/80x80?text=Image',
    impressions: 125678,
    clicks: 3567,
    ctr: '2.84%',
    cvr: '1.23%',
    created_at: '2024-01-20 10:30',
  },
  {
    key: '2',
    id: 'CR002',
    title: '视频创意-促销活动',
    type: '视频',
    status: '已通过',
    image: 'https://via.placeholder.com/80x80?text=Video',
    impressions: 234567,
    clicks: 6789,
    ctr: '2.89%',
    cvr: '1.45%',
    created_at: '2024-01-19 14:20',
  },
  {
    key: '3',
    id: 'CR003',
    title: '组图创意-生活场景',
    type: '组图',
    status: '审核中',
    image: 'https://via.placeholder.com/80x80?text=Gallery',
    impressions: 89456,
    clicks: 2345,
    ctr: '2.62%',
    cvr: '1.15%',
    created_at: '2024-01-18 09:15',
  },
  {
    key: '4',
    id: 'CR004',
    title: '品牌故事创意',
    type: '大图',
    status: '未通过',
    image: 'https://via.placeholder.com/80x80?text=Image',
    impressions: 0,
    clicks: 0,
    ctr: '0%',
    cvr: '0%',
    created_at: '2024-01-17 16:45',
  },
];

const statusColorMap: Record<string, string> = {
  '已通过': 'green',
  '审核中': 'blue',
  '未通过': 'red',
  '草稿': 'gray',
};

export default function CreativeManagePage() {
  const columns = [
    {
      title: '创意ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '预览',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (url: string) => <Image src={url} width={60} height={60} />,
    },
    {
      title: '创意标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: '展示次数',
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '点击次数',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 80,
    },
    {
      title: '转化率',
      dataIndex: 'cvr',
      key: 'cvr',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">预览</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate
      title="创意管理"
      breadcrumb={[
        { label: '创意管理' },
      ]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建创意</Button>
        </Space>
      }
    >
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="创意总数" value="1,856" />
        <DataCard title="审核通过" value="1,623" trend={{ value: 8.5, direction: 'up' }} />
        <DataCard title="平均点击率" value="2.68%" trend={{ value: 0.15, direction: 'up' }} />
        <DataCard title="平均转化率" value="1.32%" trend={{ value: 0.08, direction: 'up' }} />
      </div>

      {/* 数据表格 */}
      <Table
        dataSource={mockData}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </PageTemplate>
  );
}
