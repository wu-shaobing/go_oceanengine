/**
 * 快速加热
 */

import { Card, Form, Input, InputNumber, Button, Select, Radio, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Zap, RotateCcw, Video, Radio as RadioIcon, DollarSign, CheckCircle } from 'lucide-react';

export default function QuickBoostPage() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('提交数据:', values);
  };

  return (
    <PageTemplate
      title="快速加热"
      breadcrumb={[{ label: '抖+' }, { label: '快速加热' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="今日加热" value="8" icon={<Zap size={24} />} />
        <DataCard title="视频加热" value="5" icon={<Video size={24} />} />
        <DataCard title="直播加热" value="3" icon={<RadioIcon size={24} />} />
        <DataCard title="消耗" value="￥6,234" icon={<DollarSign size={24} />} />
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            goal: 'views',
            targetType: 'video',
          }}
        >
          <Form.Item label="推广类型" name="targetType" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="video">视频加热</Radio>
              <Radio value="live">直播加热</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="内容链接"
            name="contentUrl"
            rules={[{ required: true, message: '请输入内容链接' }]}
          >
            <Input placeholder="请输入抖音视频或直播间链接" />
          </Form.Item>

          <Form.Item label="推广目标" name="goal" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="views">播放量</Select.Option>
              <Select.Option value="likes">点赞数</Select.Option>
              <Select.Option value="comments">评论数</Select.Option>
              <Select.Option value="fans">粉丝数</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="投放预算 (元)"
            name="budget"
            rules={[{ required: true, message: '请输入投放预算' }]}
          >
            <InputNumber min={100} max={10000} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="定向设置" name="targeting">
            <Select mode="multiple" placeholder="选择定向人群">
              <Select.Option value="gender-male">性别：男</Select.Option>
              <Select.Option value="gender-female">性别：女</Select.Option>
              <Select.Option value="age-18-24">年龄：18-24岁</Select.Option>
              <Select.Option value="age-25-30">年龄：25-30岁</Select.Option>
              <Select.Option value="city-tier1">地域：一线城市</Select.Option>
              <Select.Option value="city-tier2">地域：二线城市</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<Zap size={16} />}>
                立即投放
              </Button>
              <Button icon={<RotateCcw size={16} />}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}
