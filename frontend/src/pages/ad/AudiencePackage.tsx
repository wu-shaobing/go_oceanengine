/**
 * 定向包
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Download, RefreshCw, Package, Users, TrendingUp } from 'lucide-react';

const columns = [
  {
    "title": "定向包名称",
    "dataIndex": "name"
  },
  {
    "title": "定向条件",
    "dataIndex": "target"
  },
  {
    "title": "预估覆盖",
    "dataIndex": "coverage"
  },
  {
    "title": "使用次数",
    "dataIndex": "usage",
    render: (usage: number) => <Tag color="blue">{usage} 次</Tag>
  },
  {
    "title": "创建时间",
    "dataIndex": "createTime"
  }
];

const dataSource = [
  {
    "key": "1",
    "name": "女性用户-18-30岁",
    "target": "性别:女, 年龄:18-30",
    "coverage": "8,500万",
    "usage": 23,
    "createTime": "2024-01-10"
  },
  {
    "key": "2",
    "name": "一线城市-高消费",
    "target": "城市:一线, 消费:高",
    "coverage": "2,300万",
    "usage": 15,
    "createTime": "2024-01-12"
  },
  {
    "key": "3",
    "name": "兴趣-美妆护肤",
    "target": "兴趣:美妆/护肤",
    "coverage": "5,600万",
    "usage": 31,
    "createTime": "2024-01-15"
  }
];


export default function AudiencePackagePage() {
  return (
    <PageTemplate
      title="定向包管理"
      breadcrumb={[{ label: '高级功能' }, { label: '定向包' }]}
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
          title="总定向包" 
          value={dataSource.length}
          icon={<Package size={24} />}
        />
        <DataCard 
          title="预估覆盖" 
          value="1.64亿"
          icon={<Users size={24} />}
        />
        <DataCard 
          title="总使用次数" 
          value="69"
          icon={<TrendingUp size={24} />}
        />
        <DataCard 
          title="平均使用" 
          value="23 次/包"
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
