/**
 * API工具
 */

import { Card, Tabs, Form, Input, Button, Select, Space, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Code, Key, FileText, Play, Copy, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function ApiToolsPage() {
  const [response, setResponse] = useState('');

  return (
    <PageTemplate
      title="API工具"
      breadcrumb={[{ label: '抖+' }, { label: 'API工具' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="总API" value="15" icon={<Code size={24} />} />
        <DataCard title="调用次数" value="1,234" />
        <DataCard title="成功率" value="99.5%" />
        <DataCard title="App ID" value="dp_123456" icon={<Key size={24} />} />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><Code size={14} className="mr-1" />接口调试</span>} key="1">
          <Card>
            <Form layout="vertical">
              <Form.Item label="接口地址" name="endpoint">
                <Select placeholder="选择API接口">
                  <Select.Option value="/douplus/video/create">创建视频加热订单</Select.Option>
                  <Select.Option value="/douplus/live/create">创建直播加热订单</Select.Option>
                  <Select.Option value="/douplus/order/query">查询订单状态</Select.Option>
                  <Select.Option value="/douplus/data/report">获取数据报表</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="请求参数" name="params">
                <TextArea
                  rows={6}
                  placeholder='{"key": "value"}'
                  defaultValue='{"video_id": "123456", "budget": 500}'
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<Play size={16} />} onClick={() => setResponse('{"code": 0, "message": "success", "data": {"order_id": "DP20240120001", "status": "running"}}')}>
                  发送请求
                </Button>
              </Form.Item>

              {response && (
                <Form.Item label="响应结果">
                  <TextArea rows={8} value={response} readOnly />
                </Form.Item>
              )}
            </Form>
          </Card>
        </TabPane>

        <TabPane tab={<span><Key size={14} className="mr-1" />访问凭证</span>} key="2">
          <Card>
            <Alert
              message="API访问凭证"
              description="请妥善保管您的API密钥，不要泄露给他人"
              type="info"
              showIcon
              className="mb-4"
            />
            <Form layout="vertical">
              <Form.Item label="App ID">
                <Input value="douplus_app_123456" readOnly />
              </Form.Item>
              <Form.Item label="App Secret">
                <Input.Password value="sk_live_abc123def456ghi789" readOnly />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button icon={<RotateCcw size={16} />}>重新生成</Button>
                  <Button icon={<Copy size={16} />}>复制密钥</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab={<span><FileText size={14} className="mr-1" />接口文档</span>} key="3">
          <Card>
            <div className="prose max-w-none">
              <h3>抖+API接口文档</h3>
              <h4>1. 创建视频加热订单</h4>
              <pre className="bg-gray-100 p-4 rounded">
POST /douplus/video/create
{`{
  "video_id": "视频ID",
  "budget": 500,
  "goal": "views"
}`}
              </pre>
              
              <h4>2. 查询订单状态</h4>
              <pre className="bg-gray-100 p-4 rounded">
GET /douplus/order/query?order_id=DP20240120001
              </pre>

              <h4>3. 获取数据报表</h4>
              <pre className="bg-gray-100 p-4 rounded">
GET /douplus/data/report?start_date=2024-01-01&end_date=2024-01-31
              </pre>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
}
