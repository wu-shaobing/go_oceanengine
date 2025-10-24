/**
 * 素材中心页面
 */

import { Card, Tabs, Upload, Button, Space, message, Table, Image } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { InboxOutlined } from '@ant-design/icons';
import { Upload as UploadIcon, Image as ImageIcon, Video, File } from 'lucide-react';

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
        message.success(`${info.file.name} 上传成功`);
      }
    },
  };

  return (
    <PageTemplate
      title="素材中心"
      breadcrumb={[{ label: '巨量千川' }, { label: '素材中心' }]}
      extra={<Button type="primary" icon={<UploadIcon size={16} />}>批量上传</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="图片素材" 
          value={imageData.length}
          icon={<ImageIcon size={24} />}
        />
        <DataCard 
          title="视频素材" 
          value="0"
          icon={<Video size={24} />}
        />
        <DataCard 
          title="总存储" 
          value="3.2 GB"
          icon={<File size={24} />}
        />
        <DataCard 
          title="总使用次数" 
          value="20"
        />
      </div>

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
}