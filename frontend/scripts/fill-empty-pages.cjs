#!/usr/bin/env node

/**
 * 批量更新空模板页面，填充真实业务内容
 */

const fs = require('fs');
const path = require('path');

const pages = {
  // 巨量广告 - 项目管理
  'Project.tsx': `/**
 * 项目管理页面
 */

import { Button, Table, Space, Tag, Progress } from 'antd';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const mockData = [
  {
    key: '1',
    id: 'PRJ001',
    name: '春季营销活动',
    status: 'running',
    budget: 50000,
    cost: 32500,
    campaigns: 15,
    ctr: '2.35%',
    cvr: '1.25%',
    created_at: '2024-01-15 10:30',
  },
  {
    key: '2',
    id: 'PRJ002',
    name: '品牌推广计划',
    status: 'running',
    budget: 80000,
    cost: 45600,
    campaigns: 23,
    ctr: '1.89%',
    cvr: '0.98%',
    created_at: '2024-01-12 14:20',
  },
  {
    key: '3',
    id: 'PRJ003',
    name: '新品发布预热',
    status: 'paused',
    budget: 30000,
    cost: 18900,
    campaigns: 8,
    ctr: '3.12%',
    cvr: '1.67%',
    created_at: '2024-01-10 09:15',
  },
  {
    key: '4',
    id: 'PRJ004',
    name: '双十一大促',
    status: 'completed',
    budget: 120000,
    cost: 119800,
    campaigns: 45,
    ctr: '2.78%',
    cvr: '1.45%',
    created_at: '2023-10-15 16:30',
  },
];

const statusMap: Record<string, { text: string; color: string }> = {
  running: { text: '进行中', color: 'green' },
  paused: { text: '已暂停', color: 'orange' },
  completed: { text: '已完成', color: 'blue' },
  archived: { text: '已归档', color: 'gray' },
};

export default function ProjectPage() {
  const columns = [
    {
      title: '项目ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>
      ),
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      render: (val: number) => \`¥\${val.toLocaleString()}\`,
    },
    {
      title: '消耗',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      render: (val: number) => \`¥\${val.toLocaleString()}\`,
    },
    {
      title: '预算执行率',
      key: 'progress',
      width: 150,
      render: (_: any, record: any) => {
        const percent = Math.round((record.cost / record.budget) * 100);
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: '广告计划数',
      dataIndex: 'campaigns',
      key: 'campaigns',
      width: 100,
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 80,
    },
    {
      title: '转化率',
      dataIndex: 'cvr',
      key: 'cvr',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate
      title="项目管理"
      breadcrumb={[
        { label: '项目管理' },
      ]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建项目</Button>
        </Space>
      }
    >
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="项目总数" value="45" />
        <DataCard title="进行中" value="23" trend={{ value: 12.5, direction: 'up' }} />
        <DataCard title="总预算" value="¥856万" />
        <DataCard title="总消耗" value="¥542万" trend={{ value: 15.8, direction: 'up' }} />
      </div>

      {/* 数据表格 */}
      <Table
        dataSource={mockData}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{
          showTotal: (total) => \`共 \${total} 条\`,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </PageTemplate>
  );
}
`,

  // 巨量广告 - 创意管理
  'CreativeManage.tsx': `/**
 * 创意管理页面（顶部导航）
 */

import { Button, Table, Space, Tag, Image } from 'antd';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const mockData = [
  {
    key: '1',
    id: 'CR001',
    title: '春季新品创意-A',
    type: '大图',
    status: '已通过',
    image: 'https://via.placeholder.com/80x80?text=Image',
    impressions: 125678,
    clicks: 3567,
    ctr: '2.84%',
    cvr: '1.23%',
    created_at: '2024-01-20 10:30',
  },
  {
    key: '2',
    id: 'CR002',
    title: '视频创意-促销活动',
    type: '视频',
    status: '已通过',
    image: 'https://via.placeholder.com/80x80?text=Video',
    impressions: 234567,
    clicks: 6789,
    ctr: '2.89%',
    cvr: '1.45%',
    created_at: '2024-01-19 14:20',
  },
  {
    key: '3',
    id: 'CR003',
    title: '组图创意-生活场景',
    type: '组图',
    status: '审核中',
    image: 'https://via.placeholder.com/80x80?text=Gallery',
    impressions: 89456,
    clicks: 2345,
    ctr: '2.62%',
    cvr: '1.15%',
    created_at: '2024-01-18 09:15',
  },
  {
    key: '4',
    id: 'CR004',
    title: '品牌故事创意',
    type: '大图',
    status: '未通过',
    image: 'https://via.placeholder.com/80x80?text=Image',
    impressions: 0,
    clicks: 0,
    ctr: '0%',
    cvr: '0%',
    created_at: '2024-01-17 16:45',
  },
];

const statusColorMap: Record<string, string> = {
  '已通过': 'green',
  '审核中': 'blue',
  '未通过': 'red',
  '草稿': 'gray',
};

export default function CreativeManagePage() {
  const columns = [
    {
      title: '创意ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '预览',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (url: string) => <Image src={url} width={60} height={60} />,
    },
    {
      title: '创意标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: '展示次数',
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '点击次数',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 80,
    },
    {
      title: '转化率',
      dataIndex: 'cvr',
      key: 'cvr',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">预览</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate
      title="创意管理"
      breadcrumb={[
        { label: '创意管理' },
      ]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建创意</Button>
        </Space>
      }
    >
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="创意总数" value="1,856" />
        <DataCard title="审核通过" value="1,623" trend={{ value: 8.5, direction: 'up' }} />
        <DataCard title="平均点击率" value="2.68%" trend={{ value: 0.15, direction: 'up' }} />
        <DataCard title="平均转化率" value="1.32%" trend={{ value: 0.08, direction: 'up' }} />
      </div>

      {/* 数据表格 */}
      <Table
        dataSource={mockData}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{
          showTotal: (total) => \`共 \${total} 条\`,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </PageTemplate>
  );
}
`,

  // 巨量广告 - 素材上传（保留上传功能，添加素材列表）
  'MaterialUpload.tsx': `/**
 * 素材上传中心
 */

import { Card, Upload, Button, Space, message, Tabs, Table, Image, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { TabPane } = Tabs;

// 图片素材列表
const imageMaterials = [
  {
    key: '1',
    id: 'IMG001',
    name: '春季新品海报.jpg',
    size: '2.3 MB',
    dimensions: '1920x1080',
    status: '已审核',
    url: 'https://via.placeholder.com/100x100?text=Image1',
    uploadTime: '2024-01-20 10:30',
  },
  {
    key: '2',
    id: 'IMG002',
    name: '品牌宣传图.png',
    size: '1.8 MB',
    dimensions: '1080x1080',
    status: '已审核',
    url: 'https://via.placeholder.com/100x100?text=Image2',
    uploadTime: '2024-01-19 14:20',
  },
  {
    key: '3',
    id: 'IMG003',
    name: '产品详情图.jpg',
    size: '3.5 MB',
    dimensions: '1920x1080',
    status: '待审核',
    url: 'https://via.placeholder.com/100x100?text=Image3',
    uploadTime: '2024-01-18 09:15',
  },
];

// 视频素材列表
const videoMaterials = [
  {
    key: '1',
    id: 'VID001',
    name: '产品介绍视频.mp4',
    size: '45.6 MB',
    duration: '00:01:30',
    status: '已审核',
    uploadTime: '2024-01-20 11:30',
  },
  {
    key: '2',
    id: 'VID002',
    name: '品牌故事.mp4',
    size: '78.2 MB',
    duration: '00:02:15',
    status: '已审核',
    uploadTime: '2024-01-19 15:20',
  },
  {
    key: '3',
    id: 'VID003',
    name: '用户评价合集.mp4',
    size: '32.4 MB',
    duration: '00:00:45',
    status: '待审核',
    uploadTime: '2024-01-18 10:15',
  },
];

export default function MaterialUploadPage() {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(\`\${info.file.name} 上传成功\`);
      } else if (status === 'error') {
        message.error(\`\${info.file.name} 上传失败\`);
      }
    },
  };

  const imageColumns = [
    {
      title: '素材ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '预览',
      dataIndex: 'url',
      key: 'url',
      width: 120,
      render: (url: string) => <Image src={url} width={80} height={80} />,
    },
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '尺寸',
      dataIndex: 'dimensions',
      key: 'dimensions',
      width: 120,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '已审核' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: () => (
        <Space>
          <Button type="link" size="small">下载</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const videoColumns = [
    {
      title: '素材ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '已审核' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small">预览</Button>
          <Button type="link" size="small">下载</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate title="素材上传中心" breadcrumb={[{ label: '素材上传' }]}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="图片上传" key="1">
          <Card className="mb-4">
            <Dragger {...uploadProps} accept="image/*">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
              <p className="ant-upload-hint">
                支持 JPG、PNG、GIF 格式，单个文件不超过 5MB，建议尺寸 1920x1080
              </p>
            </Dragger>
          </Card>
          <Card title="图片素材库">
            <Table
              dataSource={imageMaterials}
              columns={imageColumns}
              pagination={{
                showTotal: (total) => \`共 \${total} 个素材\`,
                pageSize: 10,
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab="视频上传" key="2">
          <Card className="mb-4">
            <Dragger {...uploadProps} accept="video/*">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽视频到此区域上传</p>
              <p className="ant-upload-hint">
                支持 MP4、AVI、MOV 格式，单个文件不超过 100MB，时长不超过 5 分钟
              </p>
            </Dragger>
          </Card>
          <Card title="视频素材库">
            <Table
              dataSource={videoMaterials}
              columns={videoColumns}
              pagination={{
                showTotal: (total) => \`共 \${total} 个素材\`,
                pageSize: 10,
              }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
}
`,

  // 抖+ - 数据中心
  'Data.tsx': `/**
 * 数据中心页面
 */

import { Button, Table, Space, Tag } from 'antd';
import { Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';

const mockData = [
  {
    key: '1',
    id: 'DT001',
    contentTitle: '春季穿搭分享',
    type: '视频加热',
    views: 456789,
    likes: 12345,
    comments: 3456,
    shares: 1234,
    cost: 1234,
    roi: '3.2',
    date: '2024-01-20',
  },
  {
    key: '2',
    id: 'DT002',
    contentTitle: '美食探店vlog',
    type: '视频加热',
    views: 234567,
    likes: 8901,
    comments: 2345,
    shares: 890,
    cost: 987,
    roi: '2.8',
    date: '2024-01-19',
  },
  {
    key: '3',
    id: 'DT003',
    contentTitle: '新品发布会直播',
    type: '直播加热',
    views: 189234,
    likes: 6543,
    comments: 1890,
    shares: 654,
    cost: 2345,
    roi: '4.1',
    date: '2024-01-18',
  },
  {
    key: '4',
    id: 'DT004',
    contentTitle: '旅行打卡记录',
    type: '视频加热',
    views: 123456,
    likes: 5432,
    comments: 1234,
    shares: 543,
    cost: 756,
    roi: '2.5',
    date: '2024-01-17',
  },
];

export default function DataPage() {
  const columns = [
    {
      title: '数据ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '内容标题',
      dataIndex: 'contentTitle',
      key: 'contentTitle',
      width: 200,
    },
    {
      title: '推广类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={type === '视频加热' ? 'blue' : 'purple'}>{type}</Tag>
      ),
    },
    {
      title: '播放量',
      dataIndex: 'views',
      key: 'views',
      width: 120,
      render: (val: number) => val.toLocaleString(),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '分享数',
      dataIndex: 'shares',
      key: 'shares',
      width: 100,
      render: (val: number) => val.toLocaleString(),
    },
    {
      title: '消耗(元)',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (val: number) => \`¥\${val.toLocaleString()}\`,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      width: 80,
      sorter: (a: any, b: any) => parseFloat(a.roi) - parseFloat(b.roi),
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">导出</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTemplate
      title="数据中心"
      breadcrumb={[
        { label: '数据中心' },
      ]}
      extra={
        <Space>
          <Button icon={<RefreshCw size={16} />}>刷新</Button>
          <Button icon={<Download size={16} />}>导出报表</Button>
        </Space>
      }
    >
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard title="总播放量" value="1,234万" trend={{ value: 15.5, direction: 'up' }} />
        <DataCard title="总点赞数" value="56.7万" trend={{ value: 8.3, direction: 'up' }} />
        <DataCard title="总消耗" value="¥12,345" trend={{ value: 5.2, direction: 'up' }} />
        <DataCard title="平均ROI" value="3.2" trend={{ value: 0.5, direction: 'up' }} />
      </div>

      {/* 数据表格 */}
      <Table
        dataSource={mockData}
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={{
          showTotal: (total) => \`共 \${total} 条数据\`,
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </PageTemplate>
  );
}
`,
};

// 写入文件
const pagesDir = path.join(__dirname, '../src/pages');

console.log('🔄 开始更新空模板页面...\n');

let successCount = 0;
let failCount = 0;

// 更新巨量广告页面
['Project.tsx', 'CreativeManage.tsx', 'MaterialUpload.tsx'].forEach(file => {
  const filePath = path.join(pagesDir, 'ad', file);
  try {
    fs.writeFileSync(filePath, pages[file], 'utf-8');
    console.log(\`✅ 更新成功: ad/\${file}\`);
    successCount++;
  } catch (err) {
    console.error(\`❌ 更新失败: ad/\${file}\`, err.message);
    failCount++;
  }
});

// 更新抖+页面
const dpFilePath = path.join(pagesDir, 'douplus', 'Data.tsx');
try {
  fs.writeFileSync(dpFilePath, pages['Data.tsx'], 'utf-8');
  console.log('✅ 更新成功: douplus/Data.tsx');
  successCount++;
} catch (err) {
  console.error('❌ 更新失败: douplus/Data.tsx', err.message);
  failCount++;
}

console.log(\`\n✅ 完成！成功: \${successCount}, 失败: \${failCount}\`);
