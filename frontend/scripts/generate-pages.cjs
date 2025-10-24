// 批量生成重构后的资产管理页面
const fs = require('fs');
const path = require('path');

const pageConfigs = [
  {
    name: 'ShopLink',
    title: '商品链接',
    columns: ['name', 'status', 'url', 'advertiserName', 'createdAt'],
  },
  {
    name: 'Audience',
    title: '定向包',
    columns: ['name', 'status', 'type', 'advertiserName', 'createdAt'],
  },
  {
    name: 'TitleLibrary',
    title: '文案库',
    columns: ['title', 'status', 'category', 'createdAt'],
  },
  {
    name: 'LandingPage',
    title: '落地页',
    columns: ['name', 'status', 'url', 'type', 'createdAt'],
  },
  {
    name: 'AssetCategory',
    title: '资产分类',
    columns: ['name', 'parentName', 'createdAt'],
  },
  {
    name: 'OpenUrl',
    title: '直达链接',
    columns: ['name', 'status', 'deeplinkUrl', 'ulinkUrl', 'createdAt'],
  },
  {
    name: 'Activity',
    title: '监测活动',
    columns: ['name', 'status', 'productName', 'advertiserName', 'createdAt'],
  },
  {
    name: 'AudiencePackage',
    title: '自定义人群包',
    columns: ['name', 'packageStatus', 'uploadCount', 'coverageCount', 'syncAt'],
  },
  {
    name: 'EventManagement',
    title: '事件管理',
    columns: ['name', 'optimizationGoal', 'callbackMethod', 'advertiserName', 'syncAt'],
  },
];

const template = (config) => `import { useState } from 'react';
import { Table, Button, Form, Select, Input, Space, Card, Tag, message } from 'antd';
import { PlusOutlined, ReloadOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TablePage } from '@/components/business';

interface ${config.name}Data {
  id: string;
  [key: string]: any;
}

const { Option } = Select;

export default function ${config.name}Page() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<${config.name}Data[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  // 表格列配置
  const columns: ColumnsType<${config.name}Data> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    ${config.columns.map(col => `{
      title: '${col}',
      dataIndex: '${col}',
      key: '${col}',
      width: 150,
    }`).join(',\n    ')},
    {
      title: '操作',
      key: 'operation',
      width: 150,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  // 搜索
  const handleSearch = () => {
    setLoading(true);
    // TODO: 调用API
    setTimeout(() => {
      setData([]);
      setLoading(false);
      message.info('暂无数据');
    }, 500);
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
    setData([]);
  };

  // 筛选表单
  const filterForm = (
    <Form form={form} layout="inline" onFinish={handleSearch}>
      <Form.Item name="keyword" label="关键词">
        <Input placeholder="请输入" style={{ width: 200 }} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button onClick={handleReset} icon={<ReloadOutlined />}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  // 表格
  const table = (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={pagination}
      onChange={(newPagination) => setPagination(newPagination as any)}
      scroll={{ x: 1200 }}
    />
  );

  return (
    <TablePage
      filterForm={filterForm}
      actions={[
        { label: '新建', type: 'primary', icon: <PlusOutlined /> },
        { label: '导入', icon: <PlusOutlined /> },
        { label: '同步', icon: <SyncOutlined /> },
      ]}
      table={table}
    />
  );
}
`;

// 生成所有页面
pageConfigs.forEach((config) => {
  const filePath = path.join(__dirname, '../src/pages/property', `${config.name}.tsx`);
  const content = template(config);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated ${config.name}.tsx`);
});

console.log(`\n✓ All ${pageConfigs.length} pages generated successfully!`);
