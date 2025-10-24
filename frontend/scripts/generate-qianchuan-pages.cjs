/**
 * 批量生成千川缺失页面
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages/qianchuan');

// 页面配置
const pages = [
  // SDK配置
  {
    filename: 'SDKConfig.tsx',
    title: 'SDK配置与认证',
    type: 'config',
  },
  {
    filename: 'ApiDebugger.tsx',
    title: 'API调试器',
    type: 'debugger',
  },
  
  // 电商资产
  {
    filename: 'Shop.tsx',
    title: '店铺设置',
    content: `/**
 * 店铺设置页面
 */

import { Card, Form, Input, Button, Space, Switch, Select, Divider } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { TextArea } = Input;
const { Option } = Select;

export default function ShopPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('店铺设置:', values);
  };

  return (
    <PageTemplate
      title="店铺设置"
      breadcrumb={[{ label: '电商资产' }, { label: '店铺设置' }]}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            shopName: '时尚潮流旗舰店',
            shopType: 'flagship',
            autoReply: true,
            serviceTime: '9:00-21:00',
          }}
        >
          <Divider>基本信息</Divider>
          
          <Form.Item label="店铺名称" name="shopName" rules={[{ required: true }]}>
            <Input placeholder="请输入店铺名称" />
          </Form.Item>

          <Form.Item label="店铺类型" name="shopType" rules={[{ required: true }]}>
            <Select>
              <Option value="flagship">旗舰店</Option>
              <Option value="specialty">专卖店</Option>
              <Option value="franchise">专营店</Option>
            </Select>
          </Form.Item>

          <Form.Item label="店铺简介" name="description">
            <TextArea rows={4} placeholder="请输入店铺简介" />
          </Form.Item>

          <Divider>运营设置</Divider>

          <Form.Item label="客服时间" name="serviceTime">
            <Input placeholder="如：9:00-21:00" />
          </Form.Item>

          <Form.Item label="自动回复" name="autoReply" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">保存设置</Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'Material.tsx',
    title: '素材中心',
    content: `/**
 * 素材中心页面
 */

import { Card, Tabs, Upload, Button, Space, message, Table, Image } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { InboxOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Dragger } = Upload;

const imageColumns = [
  { title: '素材ID', dataIndex: 'id', width: 100 },
  { 
    title: '预览', 
    dataIndex: 'url',
    width: 100,
    render: (url: string) => <Image src={url} width={60} height={60} />
  },
  { title: '素材名称', dataIndex: 'name' },
  { title: '尺寸', dataIndex: 'size' },
  { title: '上传时间', dataIndex: 'uploadTime' },
  { title: '使用次数', dataIndex: 'usageCount' },
];

const imageData = [
  { key: '1', id: 'IMG001', url: 'https://via.placeholder.com/60', name: '春季新品海报', size: '800x600', uploadTime: '2024-01-20', usageCount: 12 },
  { key: '2', id: 'IMG002', url: 'https://via.placeholder.com/60', name: '限时促销Banner', size: '1200x600', uploadTime: '2024-01-19', usageCount: 8 },
];

export default function MaterialPage() {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(\`\${info.file.name} 上传成功\`);
      }
    },
  };

  return (
    <PageTemplate
      title="素材中心"
      breadcrumb={[{ label: '电商资产' }, { label: '素材中心' }]}
      extra={<Button type="primary">批量上传</Button>}
    >
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="图片素材" key="1">
            <Dragger {...uploadProps} accept="image/*" className="mb-4">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
              <p className="ant-upload-hint">支持 JPG、PNG、GIF 格式</p>
            </Dragger>
            <Table columns={imageColumns} dataSource={imageData} />
          </TabPane>
          
          <TabPane tab="视频素材" key="2">
            <Dragger {...uploadProps} accept="video/*" className="mb-4">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">点击或拖拽视频到此区域上传</p>
              <p className="ant-upload-hint">支持 MP4、AVI 格式</p>
            </Dragger>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'Creative.tsx',
    title: '创意素材',
    content: `/**
 * 创意素材页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '创意ID', dataIndex: 'id' },
  { title: '创意名称', dataIndex: 'name' },
  { title: '创意类型', dataIndex: 'type' },
  { 
    title: '审核状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已通过': 'green',
        '审核中': 'blue',
        '未通过': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'CR001', name: '春季新品创意', type: '图文', status: '已通过', usage: 15, createTime: '2024-01-15' },
  { key: '2', id: 'CR002', name: '限时秒杀视频', type: '视频', status: '已通过', usage: 23, createTime: '2024-01-16' },
  { key: '3', id: 'CR003', name: '品牌故事长图', type: '图文', status: '审核中', usage: 0, createTime: '2024-01-20' },
];

export default function CreativePage() {
  return (
    <PageTemplate
      title="创意素材"
      breadcrumb={[{ label: '电商资产' }, { label: '创意素材' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button type="primary">创建创意</Button>
        </Space>
      }
    >
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'Audience.tsx',
    title: '人群包',
    content: `/**
 * 人群包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '人群包名称', dataIndex: 'name' },
  { title: '人群类型', dataIndex: 'type' },
  { title: '人群规模', dataIndex: 'scale' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '使用次数', dataIndex: 'usage' },
];

const dataSource = [
  { key: '1', name: '高价值用户', type: 'DMP人群', scale: '156万', status: '可用', createTime: '2024-01-10', usage: 8 },
  { key: '2', name: '潜在购买用户', type: '行为人群', scale: '234万', status: '可用', createTime: '2024-01-12', usage: 12 },
  { key: '3', name: '流失用户召回', type: 'CRM人群', scale: '89万', status: '生成中', createTime: '2024-01-20', usage: 0 },
];

export default function AudiencePage() {
  return (
    <PageTemplate
      title="人群包"
      breadcrumb={[{ label: '电商资产' }, { label: '人群包' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button type="primary">创建人群包</Button>
        </Space>
      }
    >
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
  
  // 达人管理
  {
    filename: 'KOL.tsx',
    title: '达人列表',
    content: `/**
 * 达人列表页面
 */

import { Card, Table, Button, Space, Tag, Avatar } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { 
    title: '达人', 
    dataIndex: 'name',
    render: (name: string, record: any) => (
      <Space>
        <Avatar src={record.avatar} />
        <span>{name}</span>
      </Space>
    )
  },
  { title: '抖音号', dataIndex: 'douyin' },
  { title: '粉丝数', dataIndex: 'fans' },
  { title: '类目', dataIndex: 'category' },
  { 
    title: '合作状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '合作中': 'green',
        '待邀约': 'blue',
        '已结束': 'gray',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '带货GMV', dataIndex: 'gmv' },
];

const dataSource = [
  { 
    key: '1', 
    name: '时尚小仙女', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@fashion_girl',
    fans: '125.6万',
    category: '美妆',
    status: '合作中',
    gmv: '¥456,789'
  },
  { 
    key: '2', 
    name: '好物推荐官', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@good_things',
    fans: '89.2万',
    category: '生活',
    status: '合作中',
    gmv: '¥234,567'
  },
  { 
    key: '3', 
    name: '美食探店家', 
    avatar: 'https://via.placeholder.com/32',
    douyin: '@food_lover',
    fans: '56.8万',
    category: '美食',
    status: '待邀约',
    gmv: '-'
  },
];

export default function KOLPage() {
  return (
    <PageTemplate
      title="达人列表"
      breadcrumb={[{ label: '达人管理' }, { label: '达人列表' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button type="primary">邀约达人</Button>
        </Space>
      }
    >
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'KOLCooperation.tsx',
    title: '合作记录',
    content: `/**
 * 达人合作记录页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '合作ID', dataIndex: 'id' },
  { title: '达人名称', dataIndex: 'kolName' },
  { title: '合作商品', dataIndex: 'product' },
  { title: '合作类型', dataIndex: 'type' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '佣金', dataIndex: 'commission' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '进行中': 'blue',
        '已完成': 'green',
        '已取消': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '开始时间', dataIndex: 'startTime' },
];

const dataSource = [
  { 
    key: '1', 
    id: 'CO001', 
    kolName: '时尚小仙女', 
    product: '春季新款连衣裙',
    type: '直播带货',
    gmv: '¥89,234',
    commission: '¥8,923',
    status: '已完成',
    startTime: '2024-01-15'
  },
  { 
    key: '2', 
    id: 'CO002', 
    kolName: '好物推荐官', 
    product: '护肤套装',
    type: '短视频种草',
    gmv: '¥156,789',
    commission: '¥15,679',
    status: '进行中',
    startTime: '2024-01-18'
  },
];

export default function KOLCooperationPage() {
  return (
    <PageTemplate
      title="合作记录"
      breadcrumb={[{ label: '达人管理' }, { label: '合作记录' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
        </Space>
      }
    >
      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'Commission.tsx',
    title: '佣金管理',
    content: `/**
 * 佣金管理页面
 */

import { Card, Table, Button, Space, Tag, Statistic, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const columns = [
  { title: '结算单号', dataIndex: 'id' },
  { title: '达人名称', dataIndex: 'kolName' },
  { title: 'GMV', dataIndex: 'gmv' },
  { title: '佣金比例', dataIndex: 'rate' },
  { title: '佣金金额', dataIndex: 'commission' },
  { 
    title: '结算状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已结算': 'green',
        '待结算': 'orange',
        '结算中': 'blue',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '结算时间', dataIndex: 'settleTime' },
];

const dataSource = [
  { 
    key: '1', 
    id: 'CM001', 
    kolName: '时尚小仙女', 
    gmv: '¥89,234',
    rate: '10%',
    commission: '¥8,923',
    status: '已结算',
    settleTime: '2024-01-20'
  },
  { 
    key: '2', 
    id: 'CM002', 
    kolName: '好物推荐官', 
    gmv: '¥156,789',
    rate: '12%',
    commission: '¥18,815',
    status: '待结算',
    settleTime: '-'
  },
];

export default function CommissionPage() {
  return (
    <PageTemplate
      title="佣金管理"
      breadcrumb={[{ label: '达人管理' }, { label: '佣金管理' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出账单</Button>
          <Button type="primary">批量结算</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="总佣金" value="¥156,789" />
        </Col>
        <Col span={6}>
          <DataCard title="待结算" value="¥45,678" />
        </Col>
        <Col span={6}>
          <DataCard title="已结算" value="¥111,111" />
        </Col>
        <Col span={6}>
          <DataCard title="本月佣金" value="¥27,738" />
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
  
  // 账户管理
  {
    filename: 'AccountFunds.tsx',
    title: '账户资金',
    content: `/**
 * 账户资金页面
 */

import { Card, Table, Button, Space, Tabs, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const { TabPane } = Tabs;

const transColumns = [
  { title: '时间', dataIndex: 'time' },
  { title: '交易类型', dataIndex: 'type' },
  { title: '金额', dataIndex: 'amount' },
  { title: '余额', dataIndex: 'balance' },
  { title: '备注', dataIndex: 'remark' },
];

const transData = [
  { key: '1', time: '2024-01-20 14:30', type: '充值', amount: '+¥50,000', balance: '¥256,789', remark: '银行转账' },
  { key: '2', time: '2024-01-20 10:15', type: '消耗', amount: '-¥8,234', balance: '¥206,789', remark: '推广消耗' },
  { key: '3', time: '2024-01-19 16:20', type: '消耗', amount: '-¥5,678', balance: '¥215,023', remark: '推广消耗' },
];

export default function AccountFundsPage() {
  return (
    <PageTemplate
      title="账户资金"
      breadcrumb={[{ label: '账户管理' }, { label: '账户资金' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button type="primary">充值</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="账户余额" value="¥256,789" />
        </Col>
        <Col span={6}>
          <DataCard title="今日消耗" value="¥8,234" />
        </Col>
        <Col span={6}>
          <DataCard title="本月消耗" value="¥156,789" />
        </Col>
        <Col span={6}>
          <DataCard title="预估可用天数" value="31天" />
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="交易记录" key="1">
            <Table columns={transColumns} dataSource={transData} />
          </TabPane>
          <TabPane tab="充值记录" key="2">
            <div className="text-center py-10 text-gray-500">暂无充值记录</div>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'AccountBudget.tsx',
    title: '预算管理',
    content: `/**
 * 预算管理页面
 */

import { Card, Table, Button, Space, Progress, Tag, Row, Col } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const columns = [
  { title: '预算名称', dataIndex: 'name' },
  { title: '预算总额', dataIndex: 'total' },
  { title: '已使用', dataIndex: 'used' },
  { title: '剩余', dataIndex: 'remaining' },
  { 
    title: '使用进度', 
    dataIndex: 'progress',
    render: (progress: number) => <Progress percent={progress} size="small" />
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const color = status === '正常' ? 'green' : status === '预警' ? 'orange' : 'red';
      return <Tag color={color}>{status}</Tag>;
    }
  },
];

const dataSource = [
  { 
    key: '1', 
    name: '千川推广预算', 
    total: '¥300,000', 
    used: '¥178,234', 
    remaining: '¥121,766',
    progress: 59,
    status: '正常'
  },
  { 
    key: '2', 
    name: '达人合作预算', 
    total: '¥150,000', 
    used: '¥134,567', 
    remaining: '¥15,433',
    progress: 90,
    status: '预警'
  },
];

export default function AccountBudgetPage() {
  return (
    <PageTemplate
      title="预算管理"
      breadcrumb={[{ label: '账户管理' }, { label: '预算管理' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button type="primary">创建预算</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <DataCard title="总预算" value="¥450,000" />
        </Col>
        <Col span={6}>
          <DataCard title="已使用" value="¥312,801" />
        </Col>
        <Col span={6}>
          <DataCard title="剩余预算" value="¥137,199" />
        </Col>
        <Col span={6}>
          <DataCard title="预警项目" value="1" />
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </PageTemplate>
  );
}`,
  },
];

// 生成SDK配置和API调试器页面（复用巨量广告的）
const sdkConfigContent = `/**
 * SDK配置与认证页面
 */

import { Card, Form, Input, Select, Button, Space, message, Divider, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { TextArea } = Input;
const { Option } = Select;

export default function SDKConfigPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('配置信息:', values);
    message.success('配置保存成功！');
  };

  return (
    <PageTemplate
      title="SDK配置与认证"
      breadcrumb={[{ label: 'SDK配置' }, { label: 'SDK配置与认证' }]}
    >
      <Alert
        message="千川SDK配置说明"
        description="配置千川SDK的App ID和Secret，用于调用千川相关API接口。请确保您的应用已在千川开放平台注册。"
        type="info"
        showIcon
        className="mb-6"
      />

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            appId: '',
            appSecret: '',
            environment: 'production',
          }}
        >
          <Divider>基础配置</Divider>
          
          <Form.Item
            label="App ID"
            name="appId"
            rules={[{ required: true, message: '请输入App ID' }]}
          >
            <Input placeholder="请输入千川App ID" />
          </Form.Item>

          <Form.Item
            label="App Secret"
            name="appSecret"
            rules={[{ required: true, message: '请输入App Secret' }]}
          >
            <Input.Password placeholder="请输入App Secret" />
          </Form.Item>

          <Form.Item
            label="环境"
            name="environment"
            rules={[{ required: true, message: '请选择环境' }]}
          >
            <Select>
              <Option value="sandbox">沙箱环境</Option>
              <Option value="production">生产环境</Option>
            </Select>
          </Form.Item>

          <Divider>高级配置</Divider>

          <Form.Item label="API Base URL" name="apiBaseUrl">
            <Input placeholder="https://api.qianchuan.com" />
          </Form.Item>

          <Form.Item label="超时时间(秒)" name="timeout">
            <Input type="number" placeholder="30" />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <TextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存配置
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}`;

const apiDebuggerContent = `/**
 * API调试器页面
 */

import { Card, Form, Select, Input, Button, Space, message, Tabs, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function ApiDebuggerPage() {
  const [form] = Form.useForm();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      const mockResponse = {
        code: 0,
        message: 'success',
        data: {
          list: [
            { id: 1, name: '千川推广计划示例1', gmv: 123456 },
            { id: 2, name: '千川推广计划示例2', gmv: 234567 },
          ],
          total: 2,
        },
      };
      setResponse(JSON.stringify(mockResponse, null, 2));
      setLoading(false);
      message.success('请求成功！');
    }, 1000);
  };

  return (
    <PageTemplate
      title="API调试器"
      breadcrumb={[{ label: 'SDK配置' }, { label: 'API调试器' }]}
    >
      <Alert
        message="千川API调试工具"
        description="在此调试千川API接口，支持推广计划、商品管理、直播管理等接口调试。"
        type="info"
        showIcon
        className="mb-6"
      />

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="API调试" key="1">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="API接口"
                name="api"
                rules={[{ required: true, message: '请选择API接口' }]}
              >
                <Select placeholder="请选择要调试的API">
                  <Option value="/qc/plan/list">获取推广计划列表</Option>
                  <Option value="/qc/product/list">获取商品列表</Option>
                  <Option value="/qc/live/list">获取直播间列表</Option>
                  <Option value="/qc/report/data">获取数据报表</Option>
                </Select>
              </Form.Item>

              <Form.Item label="请求参数" name="params">
                <TextArea
                  rows={10}
                  placeholder='请输入JSON格式参数，例如：&#10;{&#10;  "page": 1,&#10;  "pageSize": 10&#10;}'
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    发送请求
                  </Button>
                  <Button onClick={() => form.resetFields()}>清空</Button>
                </Space>
              </Form.Item>
            </Form>

            {response && (
              <Card title="响应结果" className="mt-4">
                <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96">
                  {response}
                </pre>
              </Card>
            )}
          </TabPane>

          <TabPane tab="请求历史" key="2">
            <div className="text-gray-500 text-center py-20">
              暂无请求历史
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}`;

// 批量生成文件
let successCount = 0;
let failCount = 0;

console.log('🚀 开始生成千川页面...\n');

// 生成SDK配置
try {
  fs.writeFileSync(path.join(PAGES_DIR, 'SDKConfig.tsx'), sdkConfigContent, 'utf-8');
  console.log('✅ SDKConfig.tsx - SDK配置与认证');
  successCount++;
} catch (error) {
  console.error(`❌ SDKConfig.tsx - ${error.message}`);
  failCount++;
}

// 生成API调试器
try {
  fs.writeFileSync(path.join(PAGES_DIR, 'ApiDebugger.tsx'), apiDebuggerContent, 'utf-8');
  console.log('✅ ApiDebugger.tsx - API调试器');
  successCount++;
} catch (error) {
  console.error(`❌ ApiDebugger.tsx - ${error.message}`);
  failCount++;
}

// 生成其他页面
pages.forEach((page) => {
  if (page.content) {
    try {
      const filePath = path.join(PAGES_DIR, page.filename);
      fs.writeFileSync(filePath, page.content, 'utf-8');
      console.log(`✅ ${page.filename} - ${page.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${page.filename} - ${error.message}`);
      failCount++;
    }
  }
});

console.log(`\n✨ 页面生成完成！`);
console.log(`成功: ${successCount} 个`);
console.log(`失败: ${failCount} 个`);
console.log(`\n💡 运行 'npm run build' 验证构建\n`);
