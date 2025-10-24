/**
 * 店铺设置页面
 */

import { Card, Form, Input, Button, Space, Switch, Select, Divider } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Store, Settings } from 'lucide-react';

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
      breadcrumb={[{ label: '巨量千川' }, { label: '店铺设置' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="店铺状态" value="正常" icon={<Store size={24} />} />
        <DataCard title="店铺类型" value="旗舰店" icon={<Settings size={24} />} />
        <DataCard title="商品数" value="156" />
        <DataCard title="订单量" value="2,345" />
      </div>
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
}