/**
 * 批量操作
 */

import { Card, Form, Select, Upload, Button, Space, message, Steps, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Upload as UploadIcon, Download, Play, CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';

const { Option } = Select;
const { Dragger } = Upload;
const { Step } = Steps;

export default function BatchOperationsPage() {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls,.csv',
    beforeUpload: (file: File) => {
      message.success(`${file.name} 上传成功`);
      setCurrentStep(1);
      return false;
    },
  };

  return (
    <PageTemplate title="批量操作" breadcrumb={[{ label: 'SDK' }, { label: '批量操作' }]}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="待上传" value="0" icon={<UploadIcon size={24} />} />
        <DataCard title="已完成" value="12" icon={<CheckCircle size={24} />} />
        <DataCard title="总记录" value="1,234" icon={<FileText size={24} />} />
        <DataCard title="成功率" value="98.5%" />
      </div>

      <Card>
        <Steps current={currentStep} className="mb-8">
          <Step title="上传文件" description="上传批量操作文件" />
          <Step title="数据验证" description="验证数据格式" />
          <Step title="执行操作" description="批量执行操作" />
          <Step title="查看结果" description="查看执行结果" />
        </Steps>

        <Alert
          message="批量操作说明"
          description="支持批量创建、更新、删除广告。请下载模板文件，按照模板格式填写数据后上传。"
          type="info"
          showIcon
          className="mb-6"
        />

        <Form form={form} layout="vertical">
          <Form.Item
            label="操作类型"
            name="operationType"
            rules={[{ required: true, message: '请选择操作类型' }]}
          >
            <Select placeholder="请选择操作类型">
              <Option value="create">批量创建</Option>
              <Option value="update">批量更新</Option>
              <Option value="delete">批量删除</Option>
            </Select>
          </Form.Item>

          <Form.Item label="上传文件">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <UploadIcon size={48} className="mx-auto text-gray-400" />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持 Excel (.xlsx, .xls) 和 CSV (.csv) 格式
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" disabled={currentStep === 0} icon={<Play size={16} />}>
                开始执行
              </Button>
              <Button href="/templates/batch-template.xlsx" download icon={<Download size={16} />}>
                下载模板
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}
