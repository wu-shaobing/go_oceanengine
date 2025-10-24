/**
 * SDK配置
 */

import { Card, Form, Input, Select, Button, Space, message, Divider } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Save, RotateCcw, Key, Settings, CheckCircle, Globe } from 'lucide-react';

const { TextArea } = Input;
const { Option } = Select;

export default function ConfigPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('配置信息:', values);
    message.success('配置保存成功！');
  };

  return (
    <PageTemplate title="SDK配置" breadcrumb={[{ label: 'SDK' }, { label: '配置' }]}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="App ID" value="123...890" icon={<Key size={24} />} />
        <DataCard title="环境" value="生产" icon={<Globe size={24} />} />
        <DataCard title="配置状态" value="已配置" icon={<CheckCircle size={24} />} />
        <DataCard title="超时" value="30s" icon={<Settings size={24} />} />
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            appId: '1234567890',
            appSecret: '********************************',
            environment: 'production',
          }}
        >
          <Divider>基础配置</Divider>
          
          <Form.Item
            label="App ID"
            name="appId"
            rules={[{ required: true, message: '请输入App ID' }]}
          >
            <Input placeholder="请输入App ID" />
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
            <Input placeholder="https://api.oceanengine.com" />
          </Form.Item>

          <Form.Item label="超时时间(秒)" name="timeout">
            <Input type="number" placeholder="30" />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <TextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<Save size={16} />}>
                保存配置
              </Button>
              <Button onClick={() => form.resetFields()} icon={<RotateCcw size={16} />}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}
