/**
 * API调试器页面
 */

import { Card, Form, Select, Input, Button, Space, message, Tabs, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Play, RotateCcw, Code, CheckCircle } from 'lucide-react';
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
      breadcrumb={[{ label: '巨量千川' }, { label: 'API调试器' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总请求" value="127" icon={<Code size={24} />} />
        <DataCard title="成功" value="125" icon={<CheckCircle size={24} />} />
        <DataCard title="失败" value="2" />
        <DataCard title="成功率" value="98.4%" />
      </div>

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
                  <Button type="primary" htmlType="submit" loading={loading} icon={<Play size={16} />}>
                    发送请求
                  </Button>
                  <Button onClick={() => form.resetFields()} icon={<RotateCcw size={16} />}>清空</Button>
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
}