/**
 * SDK配置与认证页面
 */

import { Card, Form, Input, Select, Button, Space, message, Divider, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Settings, Key, CheckCircle } from 'lucide-react';

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
      breadcrumb={[{ label: '巨量千川' }, { label: 'SDK配置' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="配置状态" value="未配置" icon={<Settings size={24} />} />
        <DataCard title="App ID" value="-" icon={<Key size={24} />} />
        <DataCard title="认证状态" value="未认证" />
        <DataCard title="环境" value="生产" icon={<CheckCircle size={24} />} />
      </div>

      <Alert
        message="千川SDK配置说明"
        description="配置千川SDK的App ID和Secret，用于调用千川相关API接口。请确保您的应用已在千川开放平台注册。"
        type="info"
        showIcon
        className="mb-6"
      />

      <Card className="mb-6" title="OAuth授权">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="第一步：OAuth授权"
            description="在配置SDK之前，您需要先完成OAuth授权以获取Access Token"
            type="warning"
            showIcon
          />
          <Button 
            type="primary" 
            size="large"
            onClick={() => {
              const oauthUrl = 'https://qianchuan.jinritemai.com/openapi/qc/audit/oauth.html?' + 
                'app_id=1846842779198378&' +
                'state=qianchuan_auth&' +
                'material_auth=1&' +
                'redirect_uri=http://localhost:8080/callback';
              window.open(oauthUrl, '_blank', 'width=800,height=600');
              message.info('请在弹出窗口中完成授权');
            }}
          >
            启动千川OAuth授权
          </Button>
        </Space>
      </Card>

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
}