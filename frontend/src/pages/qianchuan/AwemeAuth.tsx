/**
 * 抖音号授权
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, Video, Users, CheckCircle } from 'lucide-react';

const columns = [
  {
    "title": "抖音号",
    "dataIndex": "awemeId"
  },
  {
    "title": "昵称",
    "dataIndex": "nickname"
  },
  {
    "title": "粉丝数",
    "dataIndex": "fans"
  },
  {
    "title": "授权状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '已授权' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  {
    "title": "授权时间",
    "dataIndex": "authTime"
  }
];

const dataSource = [
  {
    "key": "1",
    "awemeId": "DY12345678",
    "nickname": "时尚小仙女",
    "fans": "125.6万",
    "status": "已授权",
    "authTime": "2024-01-10"
  },
  {
    "key": "2",
    "awemeId": "DY87654321",
    "nickname": "美妆达人",
    "fans": "89.2万",
    "status": "已授权",
    "authTime": "2024-01-12"
  },
  {
    "key": "3",
    "awemeId": "DY11223344",
    "nickname": "好物推荐官",
    "fans": "56.8万",
    "status": "待授权",
    "authTime": "-"
  }
];


export default function AwemeAuthPage() {
  return (
    <PageTemplate
      title="抖音号授权"
      breadcrumb={[{ label: '巨量千川' }, { label: '抖音号授权' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总抖音号" value={dataSource.length} icon={<Video size={24} />} />
        <DataCard title="已授权" value="2" icon={<CheckCircle size={24} />} />
        <DataCard title="总粉丝" value="271.6万" icon={<Users size={24} />} />
        <DataCard title="待授权" value="1" />
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
