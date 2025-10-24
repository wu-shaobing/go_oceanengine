/**
 * 订单管理
 */

import { Card, Table, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  {
    "title": "订单号",
    "dataIndex": "orderNo"
  },
  {
    "title": "商品名称",
    "dataIndex": "product"
  },
  {
    "title": "金额",
    "dataIndex": "amount"
  },
  {
    "title": "用户",
    "dataIndex": "user"
  },
  {
    "title": "状态",
    "dataIndex": "status"
  },
  {
    "title": "下单时间",
    "dataIndex": "createTime"
  }
];

const dataSource = [
  {
    "key": "1",
    "orderNo": "ORD20240120001",
    "product": "春季新款连衣裙",
    "amount": "¥299",
    "user": "用户***123",
    "status": "已支付",
    "createTime": "2024-01-20 14:23"
  },
  {
    "key": "2",
    "orderNo": "ORD20240120002",
    "product": "护肤套装礼盒",
    "amount": "¥599",
    "user": "用户***456",
    "status": "已发货",
    "createTime": "2024-01-20 13:15"
  },
  {
    "key": "3",
    "orderNo": "ORD20240120003",
    "product": "运动鞋系列",
    "amount": "¥399",
    "user": "用户***789",
    "status": "待发货",
    "createTime": "2024-01-20 12:08"
  }
];


export default function OrderPage() {
  return (
    <PageTemplate
      title="订单管理"
      breadcrumb={[{"label":"订单"}]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">新建</Button>
        </Space>
      }
    >

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
