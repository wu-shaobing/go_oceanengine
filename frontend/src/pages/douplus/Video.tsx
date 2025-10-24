/**
 * 视频管理
 */

import { Table, Button, Space, Tag, Image } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Video as VideoIcon, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

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
    <PageTemplate title="视频管理" breadcrumb={[{ label: '抖+' }, { label: '视频管理' }]} extra={<Space><Button icon={<RefreshCw size={16} />}>刷新</Button><Button icon={<Download size={16} />}>导出</Button></Space>}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总视频" value={mockData.length} icon={<VideoIcon size={24} />} />
        <DataCard title="总播放" value="880.6万" icon={<Eye size={24} />} />
        <DataCard title="总点赞" value="27.8万" icon={<ThumbsUp size={24} />} />
        <DataCard title="总评论" value="7.7万" icon={<MessageCircle size={24} />} />
      </div>
      <Table dataSource={mockData} columns={columns} scroll={{ x: 1300 }} pagination={{ showTotal: (total) => `共 ${total} 个视频`, showSizeChanger: true, defaultPageSize: 10 }} />
    </PageTemplate>
  );
}
