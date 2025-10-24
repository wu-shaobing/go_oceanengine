/**
 * OAuth授权管理页面
 */

import { Card, Table, Button, Space, Tag, Steps, Descriptions } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Plus, Shield, Key, CheckCircle } from 'lucide-react';

const { Step } = Steps;

const columns = [
  { title: '应用名称', dataIndex: 'appName' },
  { title: 'App ID', dataIndex: 'appId' },
  { title: '授权范围', dataIndex: 'scope' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '已授权' ? 'green' : 'red'}>{status}</Tag>
    )
  },
  { title: '授权时间', dataIndex: 'authTime' },
  { title: '过期时间', dataIndex: 'expireTime' },
  {
    title: '操作',
    render: () => (
      <Space>
        <Button type="link" size="small">刷新Token</Button>
        <Button type="link" size="small" danger>撤销授权</Button>
      </Space>
    ),
  },
];

const dataSource = [
  { 
    key: '1', 
    appName: '营销管理系统', 
    appId: '1234567890',
    scope: '广告管理、数据查询',
    status: '已授权',
    authTime: '2024-01-01 10:00',
    expireTime: '2025-01-01 10:00'
  },
  { 
    key: '2', 
    appName: '数据分析平台', 
    appId: '0987654321',
    scope: '报表查询',
    status: '已授权',
    authTime: '2024-01-15 14:30',
    expireTime: '2025-01-15 14:30'
  },
];

export default function OAuthManagePage() {
  return (
    <PageTemplate
      title="OAuth授权"
      breadcrumb={[{ label: '高级功能' }, { label: 'OAuth授权' }]}
      extra={
        <Button type="primary" icon={<Plus size={16} />}>新建授权</Button>
      }
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="已授权应用" 
          value={dataSource.length}
          icon={<Shield size={24} />}
        />
        <DataCard 
          title="有效授权" 
          value={dataSource.length}
          icon={<CheckCircle size={24} />}
        />
        <DataCard 
          title="授权范围" 
          value="4 项"
          icon={<Key size={24} />}
        />
        <DataCard 
          title="Token有效期" 
          value="1 年"
        />
      </div>

      {/* OAuth流程说明 */}
      <Card title="OAuth 2.0 授权流程" className="mb-6">
        <Steps current={-1}>
          <Step title="获取Code" description="用户同意授权" />
          <Step title="换取Token" description="使用Code获取Access Token" />
          <Step title="调用API" description="使用Access Token调用接口" />
          <Step title="刷新Token" description="Token过期前刷新" />
        </Steps>
      </Card>

      {/* 配置信息 */}
      <Card title="OAuth配置信息" className="mb-6">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="授权地址">
            https://api.oceanengine.com/oauth2/authorize
          </Descriptions.Item>
          <Descriptions.Item label="Token地址">
            https://api.oceanengine.com/oauth2/token
          </Descriptions.Item>
          <Descriptions.Item label="Scope范围">
            ad_read, ad_write, report_read, account_read
          </Descriptions.Item>
          <Descriptions.Item label="Token有效期">
            1年
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 授权列表 */}
      <Card title="已授权应用">
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
