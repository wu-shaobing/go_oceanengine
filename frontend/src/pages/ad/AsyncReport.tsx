/**
 * 异步报表页面
 */

import { Card, Table, Button, Space, Tag, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, RefreshCw, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const columns = [
  { title: '任务ID', dataIndex: 'id' },
  { title: '报表名称', dataIndex: 'name' },
  { title: '查询维度', dataIndex: 'dimension' },
  { title: '时间范围', dataIndex: 'timeRange' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已完成': 'green',
        '生成中': 'blue',
        '排队中': 'orange',
        '失败': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '创建时间', dataIndex: 'createTime' },
  {
    title: '操作',
    render: (_: any, record: any) => (
      <Space>
        {record.status === '已完成' && <Button type="link" size="small">下载</Button>}
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    ),
  },
];

const dataSource = [
  { 
    key: '1', 
    id: 'AR001', 
    name: '广告效果月度报表', 
    dimension: '广告计划',
    timeRange: '2024-01-01 ~ 2024-01-31',
    status: '已完成',
    createTime: '2024-01-20 10:30'
  },
  { 
    key: '2', 
    id: 'AR002', 
    name: '创意数据分析报表', 
    dimension: '创意',
    timeRange: '2024-01-15 ~ 2024-01-20',
    status: '生成中',
    createTime: '2024-01-20 14:20'
  },
  { 
    key: '3', 
    id: 'AR003', 
    name: '账户消耗明细', 
    dimension: '账户',
    timeRange: '2024-01-01 ~ 2024-01-20',
    status: '排队中',
    createTime: '2024-01-20 15:10'
  },
];

export default function AsyncReportPage() {
  return (
    <PageTemplate
      title="异步报表"
      breadcrumb={[{ label: '高级功能' }, { label: '异步报表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button type="primary" icon={<Plus size={16} />}>创建报表任务</Button>
        </Space>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="总任务" 
          value={dataSource.length}
          icon={<FileText size={24} />}
        />
        <DataCard 
          title="已完成" 
          value="1"
          icon={<CheckCircle size={24} />}
        />
        <DataCard 
          title="生成中" 
          value="1"
          icon={<Clock size={24} />}
        />
        <DataCard 
          title="失败" 
          value="0"
          icon={<XCircle size={24} />}
        />
      </div>

      <Alert
        message="异步报表说明"
        description="异步报表适用于大批量数据查询，创建任务后系统将在后台生成报表，完成后可下载查看。单个报表最多支持1000万条数据。"
        type="info"
        showIcon
        className="mb-6"
      />

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
