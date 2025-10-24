/**
 * 订单列表
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { RefreshCw, Download, Plus, ShoppingCart, CheckCircle, Clock, DollarSign } from 'lucide-react';

const columns = [
  {
    "title": "订单号",
    "dataIndex": "orderNo"
  },
  {
    "title": "推广内容",
    "dataIndex": "content"
  },
  {
    "title": "投放金额",
    "dataIndex": "amount"
  },
  {
    "title": "推广目标",
    "dataIndex": "goal"
  },
  {
    "title": "状态",
    "dataIndex": "status",
    render: (status: string) => (
      <Tag color={status === '投放中' ? 'green' : 'blue'}>{status}</Tag>
    )
  },
  {
    "title": "创建时间",
    "dataIndex": "createTime"
  }
];

const dataSource = [
  {
    "key": "1",
    "orderNo": "DP20240120001",
    "content": "春季穿搭分享",
    "amount": "¥1,234",
    "goal": "播放量",
    "status": "投放中",
    "createTime": "2024-01-20 10:30"
  },
  {
    "key": "2",
    "orderNo": "DP20240119002",
    "content": "美食探店vlog",
    "amount": "¥987",
    "goal": "点赞数",
    "status": "已完成",
    "createTime": "2024-01-19 14:20"
  },
  {
    "key": "3",
    "orderNo": "DP20240118003",
    "content": "旅行打卡记录",
    "amount": "¥756",
    "goal": "粉丝数",
    "status": "已完成",
    "createTime": "2024-01-18 09:15"
  }
];


export default function OrderListPage() {
  return (
    <PageTemplate
      title="订单列表"
      breadcrumb={[{ label: '抖+' }, { label: '订单列表' }]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建</Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总订单" value={dataSource.length} icon={<ShoppingCart size={24} />} />
        <DataCard title="投放中" value="1" icon={<Clock size={24} />} />
        <DataCard title="已完成" value="2" icon={<CheckCircle size={24} />} />
        <DataCard title="总金额" value="￥2,977" icon={<DollarSign size={24} />} />
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
