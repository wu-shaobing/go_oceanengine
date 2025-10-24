/**
 * 千川计划
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, FileText, DollarSign, TrendingUp } from 'lucide-react';

const columns = [
  {
    "title": "计划ID",
    "dataIndex": "id"
  },
  {
    "title": "计划名称",
    "dataIndex": "name"
  },
  {
    "title": "GMV",
    "dataIndex": "gmv"
  },
  {
    "title": "消耗",
    "dataIndex": "cost"
  },
  {
    "title": "ROI",
    "dataIndex": "roi"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '投放中' ? 'green' : 'orange'}>{status}</Tag>
    )
  }
];

const dataSource = [
  {
    "key": "1",
    "id": "QC001",
    "name": "直播带货-春季专场",
    "gmv": "¥125,678",
    "cost": "¥8,234",
    "roi": "15.3",
    "status": "投放中"
  },
  {
    "key": "2",
    "id": "QC002",
    "name": "短视频推广-新品",
    "gmv": "¥89,456",
    "cost": "¥5,678",
    "roi": "15.8",
    "status": "投放中"
  },
  {
    "key": "3",
    "id": "QC003",
    "name": "商品卡推广",
    "gmv": "¥56,789",
    "cost": "¥3,456",
    "roi": "16.4",
    "status": "暂停"
  }
];


export default function PlanPage() {
  return (
    <PageTemplate
      title="千川计划"
      breadcrumb={[{ label: '巨量千川' }, { label: '计划管理' }]}
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
          title="总计划" 
          value={dataSource.length}
          icon={<FileText size={24} />}
        />
        <DataCard 
          title="总GMV" 
          value="￥271,923"
          icon={<DollarSign size={24} />}
        />
        <DataCard 
          title="总消耗" 
          value="￥17,368"
          icon={<TrendingUp size={24} />}
        />
        <DataCard 
          title="平均ROI" 
          value="15.8"
          trend={{ value: 12.3, direction: 'up' }}
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
