/**
 * 更新资产管理页面内容
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages/ad');

const pages = {
  'LandingPage.tsx': `/**
 * 落地页页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '落地页ID', dataIndex: 'id' },
  { title: '落地页名称', dataIndex: 'name' },
  { title: 'URL', dataIndex: 'url' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '已发布' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '访问次数', dataIndex: 'visits' },
  { title: '转化率', dataIndex: 'cvr' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'LP001', name: '春季活动落地页', url: 'https://example.com/spring', status: '已发布', visits: '12,345', cvr: '8.5%', createTime: '2024-01-15' },
  { key: '2', id: 'LP002', name: '新品发布页面', url: 'https://example.com/new-product', status: '已发布', visits: '8,234', cvr: '6.2%', createTime: '2024-01-16' },
  { key: '3', id: 'LP003', name: '限时优惠页', url: 'https://example.com/sale', status: '草稿', visits: '0', cvr: '-', createTime: '2024-01-20' },
];

export default function LandingPagePage() {
  return (
    <PageTemplate
      title="落地页"
      breadcrumb={[{ label: '资产管理' }, { label: '落地页' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">创建落地页</Button>
        </Space>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,

  'Creative.tsx': `/**
 * 创意管理页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '创意ID', dataIndex: 'id' },
  { title: '创意标题', dataIndex: 'title' },
  { title: '创意类型', dataIndex: 'type' },
  { 
    title: '审核状态', 
    dataIndex: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        '已通过': 'green',
        '审核中': 'blue',
        '未通过': 'red',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    }
  },
  { title: '点击率', dataIndex: 'ctr' },
  { title: '转化率', dataIndex: 'cvr' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'CR001', title: '春季新品大促', type: '大图', status: '已通过', ctr: '5.2%', cvr: '2.8%', createTime: '2024-01-15' },
  { key: '2', id: 'CR002', title: '限时秒杀活动', type: '视频', status: '已通过', ctr: '8.7%', cvr: '4.3%', createTime: '2024-01-16' },
  { key: '3', id: 'CR003', title: '品牌故事传播', type: '组图', status: '审核中', ctr: '-', cvr: '-', createTime: '2024-01-20' },
  { key: '4', id: 'CR004', title: '会员日专享', type: '大图', status: '已通过', ctr: '6.3%', cvr: '3.1%', createTime: '2024-01-18' },
];

export default function CreativePage() {
  return (
    <PageTemplate
      title="创意管理"
      breadcrumb={[{ label: '资产管理' }, { label: '创意管理' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">创建创意</Button>
        </Space>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,

  'Targeting.tsx': `/**
 * 定向包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '定向包名称', dataIndex: 'name' },
  { title: '定向条件', dataIndex: 'conditions' },
  { title: '预估覆盖', dataIndex: 'coverage' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : 'orange'}>{status}</Tag>
    )
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', name: '女性用户-18-30岁', conditions: '性别:女, 年龄:18-30, 城市:一二线', coverage: '8,500万', status: '可用', usage: 23, createTime: '2024-01-10' },
  { key: '2', name: '高消费人群', conditions: '消费能力:高, 兴趣:奢侈品', coverage: '2,300万', status: '可用', usage: 15, createTime: '2024-01-12' },
  { key: '3', name: '美妆护肤爱好者', conditions: '兴趣:美妆/护肤/个护', coverage: '5,600万', status: '可用', usage: 31, createTime: '2024-01-15' },
  { key: '4', name: '母婴用户群体', conditions: '生活阶段:育儿期, 性别:女', coverage: '3,200万', status: '可用', usage: 18, createTime: '2024-01-17' },
];

export default function TargetingPage() {
  return (
    <PageTemplate
      title="定向包"
      breadcrumb={[{ label: '资产管理' }, { label: '定向包' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">创建定向包</Button>
        </Space>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,

  'Audience.tsx': `/**
 * 人群包页面
 */

import { Card, Table, Button, Space, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const columns = [
  { title: '人群包名称', dataIndex: 'name' },
  { title: '人群类型', dataIndex: 'type' },
  { title: '人群规模', dataIndex: 'scale' },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '可用' ? 'green' : status === '生成中' ? 'blue' : 'red'}>{status}</Tag>
    )
  },
  { title: '使用次数', dataIndex: 'usage' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', name: '高价值客户', type: 'DMP人群', scale: '156万', status: '可用', usage: 8, createTime: '2024-01-10' },
  { key: '2', name: '潜在购买用户', type: '行为人群', scale: '234万', status: '可用', usage: 12, createTime: '2024-01-12' },
  { key: '3', name: '流失用户召回', type: 'CRM人群', scale: '89万', status: '生成中', usage: 0, createTime: '2024-01-20' },
  { key: '4', name: '新客户群体', type: 'DMP人群', scale: '567万', status: '可用', usage: 25, createTime: '2024-01-08' },
];

export default function AudiencePage() {
  return (
    <PageTemplate
      title="人群包"
      breadcrumb={[{ label: '资产管理' }, { label: '人群包' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">创建人群包</Button>
        </Space>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,

  'Site.tsx': `/**
 * 监测链接页面
 */

import { Card, Table, Button, Space, Tag, Typography } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { Text } = Typography;

const columns = [
  { title: '链接ID', dataIndex: 'id' },
  { title: '链接名称', dataIndex: 'name' },
  { 
    title: '监测URL', 
    dataIndex: 'url',
    render: (url: string) => <Text code copyable>{url}</Text>
  },
  { 
    title: '状态', 
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
    )
  },
  { title: '点击次数', dataIndex: 'clicks' },
  { title: '转化次数', dataIndex: 'conversions' },
  { title: '创建时间', dataIndex: 'createTime' },
];

const dataSource = [
  { key: '1', id: 'ST001', name: '首页监测', url: 'https://track.example.com/home', status: '正常', clicks: '12,345', conversions: '1,234', createTime: '2024-01-10' },
  { key: '2', id: 'ST002', name: '活动页监测', url: 'https://track.example.com/promo', status: '正常', clicks: '8,234', conversions: '892', createTime: '2024-01-12' },
  { key: '3', id: 'ST003', name: '商品详情页', url: 'https://track.example.com/product', status: '正常', clicks: '15,678', conversions: '2,345', createTime: '2024-01-15' },
];

export default function SitePage() {
  return (
    <PageTemplate
      title="监测链接"
      breadcrumb={[{ label: '资产管理' }, { label: '监测链接' }]}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">创建监测链接</Button>
        </Space>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,
};

let successCount = 0;
let failCount = 0;

console.log('🚀 开始更新资产管理页面...\n');

Object.entries(pages).forEach(([filename, content]) => {
  try {
    const filePath = path.join(PAGES_DIR, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${filename}`);
    successCount++;
  } catch (error) {
    console.error(`❌ ${filename} - ${error.message}`);
    failCount++;
  }
});

console.log(`\n✨ 页面更新完成！`);
console.log(`成功: ${successCount} 个`);
console.log(`失败: ${failCount} 个`);
console.log(`\n💡 运行 'npm run build' 验证构建\n`);
