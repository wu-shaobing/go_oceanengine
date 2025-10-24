/**
 * ROI目标
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, Target, TrendingUp, CheckCircle } from 'lucide-react';

const columns = [
  {
    "title": "计划名称",
    "dataIndex": "name"
  },
  {
    "title": "目标ROI",
    "dataIndex": "targetRoi"
  },
  {
    "title": "实际ROI",
    "dataIndex": "actualRoi"
  },
  {
    "title": "完成率",
    "dataIndex": "rate"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '达成' ? 'green' : 'orange'}>{status}</Tag>
    )
  }
];

const dataSource = [
  {
    "key": "1",
    "name": "直播带货-春季专场",
    "targetRoi": "15.0",
    "actualRoi": "15.3",
    "rate": "102%",
    "status": "达成"
  },
  {
    "key": "2",
    "name": "短视频推广-新品",
    "targetRoi": "18.0",
    "actualRoi": "15.8",
    "rate": "88%",
    "status": "未达成"
  },
  {
    "key": "3",
    "name": "商品卡推广",
    "targetRoi": "16.0",
    "actualRoi": "16.4",
    "rate": "103%",
    "status": "达成"
  }
];


export default function ROIGoalPage() {
  return (
    <PageTemplate
      title="ROI目标"
      breadcrumb={[{ label: '巨量千川' }, { label: 'ROI目标' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总计划" value={dataSource.length} icon={<Target size={24} />} />
        <DataCard title="达成" value="2" icon={<CheckCircle size={24} />} />
        <DataCard title="平均ROI" value="15.8" icon={<TrendingUp size={24} />} />
        <DataCard title="达成率" value="67%" />
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
