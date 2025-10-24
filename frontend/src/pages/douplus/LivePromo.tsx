/**
 * 直播推广
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, Radio, Eye, MessageCircle, DollarSign } from 'lucide-react';

const columns = [
  {
    "title": "直播间ID",
    "dataIndex": "id"
  },
  {
    "title": "直播标题",
    "dataIndex": "title"
  },
  {
    "title": "观看人数",
    "dataIndex": "viewers"
  },
  {
    "title": "互动次数",
    "dataIndex": "interactions"
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
    "id": "LV001",
    "title": "新品发布会",
    "viewers": "23.5万",
    "interactions": "5.6万",
    "cost": "¥2,345",
    "status": "投放中"
  },
  {
    "key": "2",
    "id": "LV002",
    "title": "限时秒杀",
    "viewers": "15.8万",
    "interactions": "3.2万",
    "cost": "¥1,678",
    "status": "已完成"
  },
  {
    "key": "3",
    "id": "LV003",
    "title": "粉丝福利日",
    "viewers": "12.3万",
    "interactions": "2.8万",
    "cost": "¥1,234",
    "status": "已完成"
  }
];


export default function LivePromoPage() {
  return (
    <PageTemplate
      title="直播推广"
      breadcrumb={[{ label: '抖+' }, { label: '直播推广' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总直播" value={dataSource.length} icon={<Radio size={24} />} />
        <DataCard title="总观看" value="51.6万" icon={<Eye size={24} />} />
        <DataCard title="总互动" value="11.6万" icon={<MessageCircle size={24} />} />
        <DataCard title="总消耗" value="￥5,257" icon={<DollarSign size={24} />} />
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
