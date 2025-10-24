/**
 * 直播管理
 */

import { Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Radio as RadioIcon, Users, ThumbsUp, MessageCircle } from 'lucide-react';

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
    <PageTemplate title="直播管理" breadcrumb={[{ label: '抖+' }, { label: '直播管理' }]} extra={<Space><Button icon={<RefreshCw size={16} />}>刷新</Button><Button icon={<Download size={16} />}>导出</Button></Space>}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总直播" value={mockData.length} icon={<RadioIcon size={24} />} />
        <DataCard title="最高在线" value="10.7万" icon={<Users size={24} />} />
        <DataCard title="总点赞" value="2.9万" icon={<ThumbsUp size={24} />} />
        <DataCard title="总评论" value="1.2万" icon={<MessageCircle size={24} />} />
      </div>
      <Table dataSource={mockData} columns={columns} scroll={{ x: 1300 }} pagination={{ showTotal: (total) => `共 ${total} 场直播`, showSizeChanger: true, defaultPageSize: 10 }} />
    </PageTemplate>
  );
}
