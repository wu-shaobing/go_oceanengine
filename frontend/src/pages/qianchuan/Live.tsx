/**
 * 直播管理
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Radio, Eye, DollarSign } from 'lucide-react';

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
    "title": "GMV",
    "dataIndex": "gmv"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '直播中' ? 'red' : 'default'}>{status}</Tag>
    )
  },
  {
    "title": "开播时间",
    "dataIndex": "startTime"
  }
];

const dataSource = [
  {
    "key": "1",
    "id": "LV001",
    "title": "春季新品发布会",
    "viewers": "23.5万",
    "gmv": "¥456,789",
    "status": "直播中",
    "startTime": "2024-01-20 19:00"
  },
  {
    "key": "2",
    "id": "LV002",
    "title": "限时秒杀专场",
    "viewers": "15.8万",
    "gmv": "¥234,567",
    "status": "已结束",
    "startTime": "2024-01-19 20:00"
  },
  {
    "key": "3",
    "id": "LV003",
    "title": "会员专享福利",
    "viewers": "12.3万",
    "gmv": "¥189,234",
    "status": "已结束",
    "startTime": "2024-01-18 21:00"
  }
];


export default function LivePage() {
  return (
    <PageTemplate
      title="直播管理"
      breadcrumb={[{ label: '巨量千川' }, { label: '直播管理' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总直播场次" 
          value={dataSource.length}
          icon={<Radio size={24} />}
        />
        <DataCard 
          title="总观看" 
          value="51.6万"
          icon={<Eye size={24} />}
        />
        <DataCard 
          title="总GMV" 
          value="￥880,590"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="直播中" 
          value="1"
          subtitle="已结束: 2"
        />
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
