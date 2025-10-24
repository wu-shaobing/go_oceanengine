/**
 * 否定关键词
 */

import { Card, Table, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Ban, Shield } from 'lucide-react';

const columns = [
  {
    "title": "关键词",
    "dataIndex": "keyword"
  },
  {
    "title": "匹配类型",
    "dataIndex": "matchType"
  },
  {
    "title": "添加时间",
    "dataIndex": "createTime"
  },
  {
    "title": "操作",
    "dataIndex": "action"
  }
];

const dataSource = [
  {
    "key": "1",
    "keyword": "免费",
    "matchType": "精确匹配",
    "createTime": "2024-01-15 10:30"
  },
  {
    "key": "2",
    "keyword": "盗版",
    "matchType": "短语匹配",
    "createTime": "2024-01-16 14:20"
  },
  {
    "key": "3",
    "keyword": "破解版",
    "matchType": "精确匹配",
    "createTime": "2024-01-17 09:15"
  }
];


export default function NegativeWordsPage() {
  return (
    <PageTemplate
      title="否定关键词"
      breadcrumb={[{ label: '资产管理' }, { label: '否定关键词' }]}
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
          title="总关键词" 
          value={dataSource.length}
          icon={<Ban size={24} />}
        />
        <DataCard 
          title="精确匹配" 
          value="2"
          icon={<Shield size={24} />}
        />
        <DataCard 
          title="短语匹配" 
          value="1"
          icon={<Shield size={24} />}
        />
        <DataCard 
          title="有效拦截" 
          value="100%"
          subtitle="已拦截: 0 次"
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
