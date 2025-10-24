/**
 * 素材上传中心
 */

import { Card, Upload, Button, Space, message, Tabs, Table, Image, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { InboxOutlined } from '@ant-design/icons';
import { Image as ImageIcon, Video, File } from 'lucide-react';

const { Dragger } = Upload;
const { TabPane } = Tabs;

const imageMaterials = [
  { key: '1', id: 'IMG001', name: '春季新品海报.jpg', size: '2.3 MB', dimensions: '1920x1080', status: '已审核', url: 'https://via.placeholder.com/100x100?text=Image1', uploadTime: '2024-01-20 10:30' },
  { key: '2', id: 'IMG002', name: '品牌宣传图.png', size: '1.8 MB', dimensions: '1080x1080', status: '已审核', url: 'https://via.placeholder.com/100x100?text=Image2', uploadTime: '2024-01-19 14:20' },
  { key: '3', id: 'IMG003', name: '产品详情图.jpg', size: '3.5 MB', dimensions: '1920x1080', status: '待审核', url: 'https://via.placeholder.com/100x100?text=Image3', uploadTime: '2024-01-18 09:15' },
];

const videoMaterials = [
  { key: '1', id: 'VID001', name: '产品介绍视频.mp4', size: '45.6 MB', duration: '00:01:30', status: '已审核', uploadTime: '2024-01-20 11:30' },
  { key: '2', id: 'VID002', name: '品牌故事.mp4', size: '78.2 MB', duration: '00:02:15', status: '已审核', uploadTime: '2024-01-19 15:20' },
  { key: '3', id: 'VID003', name: '用户评价合集.mp4', size: '32.4 MB', duration: '00:00:45', status: '待审核', uploadTime: '2024-01-18 10:15' },
];

export default function MaterialUploadPage() {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const imageColumns = [
    { title: '素材ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '预览', dataIndex: 'url', key: 'url', width: 120, render: (url: string) => <Image src={url} width={80} height={80} /> },
    { title: '文件名', dataIndex: 'name', key: 'name' },
    { title: '尺寸', dataIndex: 'dimensions', key: 'dimensions', width: 120 },
    { title: '大小', dataIndex: 'size', key: 'size', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={status === '已审核' ? 'green' : 'orange'}>{status}</Tag> },
    { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime', width: 160 },
    { title: '操作', key: 'action', width: 120, render: () => <Space><Button type="link" size="small">下载</Button><Button type="link" size="small" danger>删除</Button></Space> },
  ];

  const videoColumns = [
    { title: '素材ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '文件名', dataIndex: 'name', key: 'name' },
    { title: '时长', dataIndex: 'duration', key: 'duration', width: 100 },
    { title: '大小', dataIndex: 'size', key: 'size', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={status === '已审核' ? 'green' : 'orange'}>{status}</Tag> },
    { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime', width: 160 },
    { title: '操作', key: 'action', width: 150, render: () => <Space><Button type="link" size="small">预览</Button><Button type="link" size="small">下载</Button><Button type="link" size="small" danger>删除</Button></Space> },
  ];

  return (
    <PageTemplate title="素材上传中心" breadcrumb={[{ label: '资产管理' }, { label: '素材上传' }]}>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="图片素材" 
          value={imageMaterials.length}
          icon={<ImageIcon size={24} />}
        />
        <DataCard 
          title="视频素材" 
          value={videoMaterials.length}
          icon={<Video size={24} />}
        />
        <DataCard 
          title="总存储" 
          value="186.5 MB"
          icon={<File size={24} />}
        />
        <DataCard 
          title="已审核" 
          value="4"
          subtitle="待审核: 2"
        />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="图片上传" key="1">
          <Card className="mb-4">
            <Dragger {...uploadProps} accept="image/*">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
              <p className="ant-upload-hint">支持 JPG、PNG、GIF 格式，单个文件不超过 5MB，建议尺寸 1920x1080</p>
            </Dragger>
          </Card>
          <Card title="图片素材库">
            <Table dataSource={imageMaterials} columns={imageColumns} pagination={{ showTotal: (total) => `共 ${total} 个素材`, pageSize: 10 }} />
          </Card>
        </TabPane>

        <TabPane tab="视频上传" key="2">
          <Card className="mb-4">
            <Dragger {...uploadProps} accept="video/*">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">点击或拖拽视频到此区域上传</p>
              <p className="ant-upload-hint">支持 MP4、AVI、MOV 格式，单个文件不超过 100MB，时长不超过 5 分钟</p>
            </Dragger>
          </Card>
          <Card title="视频素材库">
            <Table dataSource={videoMaterials} columns={videoColumns} pagination={{ showTotal: (total) => `共 ${total} 个素材`, pageSize: 10 }} />
          </Card>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
}
