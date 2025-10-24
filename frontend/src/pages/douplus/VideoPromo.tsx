/**
 * 视频推广
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, Video, Eye, ThumbsUp, DollarSign } from 'lucide-react';

const columns = [
  {
    "title": "视频ID",
    "dataIndex": "id"
  },
  {
    "title": "视频标题",
    "dataIndex": "title"
  },
  {
    "title": "播放量",
    "dataIndex": "plays"
  },
  {
    "title": "点赞数",
    "dataIndex": "likes"
  },
  {
    "title": "消耗",
    "dataIndex": "cost"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '投放中' ? 'green' : 'blue'}>{status}</Tag>
    )
  }
];

const dataSource = [
  {
    "key": "1",
    "id": "VD001",
    "title": "春季穿搭分享",
    "plays": "456.7万",
    "likes": "12.3万",
    "cost": "¥1,234",
    "status": "投放中"
  },
  {
    "key": "2",
    "id": "VD002",
    "title": "美食探店vlog",
    "plays": "234.5万",
    "likes": "8.9万",
    "cost": "¥987",
    "status": "投放中"
  },
  {
    "key": "3",
    "id": "VD003",
    "title": "旅行打卡记录",
    "plays": "189.2万",
    "likes": "6.5万",
    "cost": "¥756",
    "status": "已完成"
  }
];


export default function VideoPromoPage() {
  return (
    <PageTemplate
      title="视频推广"
      breadcrumb={[{ label: '抖+' }, { label: '视频推广' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总视频" value={dataSource.length} icon={<Video size={24} />} />
        <DataCard title="总播放" value="880.4万" icon={<Eye size={24} />} />
        <DataCard title="总点赞" value="27.7万" icon={<ThumbsUp size={24} />} />
        <DataCard title="总消耗" value="￥2,977" icon={<DollarSign size={24} />} />
      </div>

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}
