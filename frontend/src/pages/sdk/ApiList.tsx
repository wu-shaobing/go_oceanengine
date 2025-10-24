/**
 * API列表
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, Code, CheckCircle, FileText } from 'lucide-react';

const columns = [
  {
    "title": "API名称",
    "dataIndex": "name"
  },
  {
    "title": "请求方法",
    "dataIndex": "method",
    render: (method: string) => {
      const colorMap: Record<string, string> = {
        GET: 'blue',
        POST: 'green',
        PUT: 'orange',
        DELETE: 'red',
      };
      return <Tag color={colorMap[method]}>{method}</Tag>;
    }
  },
  {
    "title": "路径",
    "dataIndex": "path"
  },
  {
    "title": "说明",
    "dataIndex": "description"
  },
  {
    "title": "版本",
    "dataIndex": "version"
  }
];

const dataSource = [
  {
    "key": "1",
    "name": "获取广告列表",
    "method": "GET",
    "path": "/ad/list",
    "description": "分页查询广告列表",
    "version": "v1.0"
  },
  {
    "key": "2",
    "name": "创建广告",
    "method": "POST",
    "path": "/ad/create",
    "description": "创建新的广告",
    "version": "v1.0"
  },
  {
    "key": "3",
    "name": "更新广告",
    "method": "PUT",
    "path": "/ad/update",
    "description": "更新广告信息",
    "version": "v1.0"
  },
  {
    "key": "4",
    "name": "删除广告",
    "method": "DELETE",
    "path": "/ad/delete",
    "description": "删除指定广告",
    "version": "v1.0"
  },
  {
    "key": "5",
    "name": "获取报表数据",
    "method": "GET",
    "path": "/report/data",
    "description": "查询广告报表数据",
    "version": "v1.0"
  }
];


export default function ApiListPage() {
  return (
    <PageTemplate
      title="API列表"
      breadcrumb={[{ label: 'SDK' }, { label: 'API列表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总API" value={dataSource.length} icon={<Code size={24} />} />
        <DataCard title="GET" value="2" />
        <DataCard title="POST" value="1" icon={<CheckCircle size={24} />} />
        <DataCard title="PUT/DELETE" value="2" icon={<FileText size={24} />} />
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
