/**
 * 达人列表页面
 */

import { Card, Table, Button, Space, Tag, Avatar } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, RefreshCw, Users, Star, DollarSign } from 'lucide-react';

const columns = [
  { 
    title: '达人', 
    dataIndex: 'name',
    render: (name: string, record: any) => (
      <Space>
        <Avatar src={record.avatar} />
        <span>{name}</span>
      </Space>
    )
  },
  { title: '抖音号', dataIndex: 'douyin' },
  { title: '粉丝数', dataIndex: 'fans' },
  { title: '类目', dataIndex: 'category' },
  { 
    title: '合作状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '合作中': 'green',
        '待邀约': 'blue',
        '已结束': 'gray',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '带货GMV', dataIndex: 'gmv' },
];

const dataSource = [
  { 
    key: '1', 
    name: '时尚小仙女', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@fashion_girl',
    fans: '125.6万',
    category: '美妆',
    status: '合作中',
    gmv: '¥456,789'
  },
  { 
    key: '2', 
    name: '好物推荐官', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@good_things',
    fans: '89.2万',
    category: '生活',
    status: '合作中',
    gmv: '¥234,567'
  },
  { 
    key: '3', 
    name: '美食探店家', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@food_lover',
    fans: '56.8万',
    category: '美食',
    status: '待邀约',
    gmv: '-'
  },
];

export default function KOLPage() {
  return (
    <PageTemplate
      title="达人列表"
      breadcrumb={[{ label: '巨量千川' }, { label: '达人列表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>邀约达人</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总达人" value={dataSource.length} icon={<Users size={24} />} />
        <DataCard title="合作中" value="2" icon={<Star size={24} />} />
        <DataCard title="总GMV" value="￥691,356" icon={<DollarSign size={24} />} />
        <DataCard title="待邀约" value="1" />
      </div>
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}