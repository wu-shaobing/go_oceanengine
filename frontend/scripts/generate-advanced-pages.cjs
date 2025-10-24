/**
 * 批量生成高级功能页面
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages/ad');

// 页面配置
const pages = [
  {
    filename: 'SecurityCompliance.tsx',
    title: '安全合规',
    content: `/**
 * 安全合规页面
 */

import { Card, Collapse, Alert, List, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { Panel } = Collapse;

const complianceItems = [
  { title: 'HTTPS加密传输', status: '已启用', level: '必须' },
  { title: 'Access Token安全存储', status: '已启用', level: '必须' },
  { title: 'API请求频率限制', status: '已配置', level: '建议' },
  { title: '敏感信息脱敏', status: '已启用', level: '必须' },
  { title: '日志审计', status: '已启用', level: '建议' },
];

export default function SecurityCompliancePage() {
  return (
    <PageTemplate
      title="安全合规"
      breadcrumb={[{ label: '高级功能' }, { label: '安全合规' }]}
    >
      <Alert
        message="安全提示"
        description="请严格遵守API使用规范，确保数据安全和用户隐私保护。"
        type="warning"
        showIcon
        className="mb-6"
      />

      <Card title="安全规范检查" className="mb-6">
        <List
          dataSource={complianceItems}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={\`级别: \${item.level}\`}
              />
              <Tag color={item.status.includes('已') ? 'green' : 'orange'}>
                {item.status}
              </Tag>
            </List.Item>
          )}
        />
      </Card>

      <Card title="安全最佳实践">
        <Collapse>
          <Panel header="1. API密钥管理" key="1">
            <ul>
              <li>定期轮换Access Token</li>
              <li>不要在前端代码中硬编码密钥</li>
              <li>使用环境变量存储敏感信息</li>
            </ul>
          </Panel>
          <Panel header="2. 数据传输安全" key="2">
            <ul>
              <li>所有API请求必须使用HTTPS</li>
              <li>敏感参数需要加密传输</li>
              <li>避免在URL中传递敏感信息</li>
            </ul>
          </Panel>
          <Panel header="3. 权限控制" key="3">
            <ul>
              <li>遵循最小权限原则</li>
              <li>定期审查授权应用</li>
              <li>及时撤销不必要的权限</li>
            </ul>
          </Panel>
        </Collapse>
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'BestPractices.tsx',
    title: '最佳实践',
    content: `/**
 * 最佳实践页面
 */

import { Card, Tabs, Typography, Divider, Tag } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

export default function BestPracticesPage() {
  return (
    <PageTemplate
      title="最佳实践"
      breadcrumb={[{ label: '高级功能' }, { label: '最佳实践' }]}
    >
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="API调用" key="1">
            <Title level={4}>API调用最佳实践</Title>
            <Divider />
            
            <Title level={5}>1. 错误处理 <Tag color="red">重要</Tag></Title>
            <Paragraph>
              <ul>
                <li>始终检查API响应的code字段</li>
                <li>实现重试机制（建议指数退避）</li>
                <li>记录错误日志便于排查</li>
              </ul>
            </Paragraph>

            <Title level={5}>2. 性能优化 <Tag color="orange">建议</Tag></Title>
            <Paragraph>
              <ul>
                <li>使用批量接口减少请求次数</li>
                <li>合理设置请求超时时间</li>
                <li>启用HTTP持久连接</li>
              </ul>
            </Paragraph>

            <Title level={5}>3. 频率控制 <Tag color="blue">必须</Tag></Title>
            <Paragraph>
              <ul>
                <li>遵守API频率限制规则</li>
                <li>实现客户端限流</li>
                <li>使用异步报表处理大批量数据</li>
              </ul>
            </Paragraph>
          </TabPane>

          <TabPane tab="广告投放" key="2">
            <Title level={4}>广告投放最佳实践</Title>
            <Divider />
            
            <Title level={5}>1. 定向策略</Title>
            <Paragraph>
              <ul>
                <li>使用定向包提高效率</li>
                <li>避免过度定向导致流量不足</li>
                <li>定期优化定向条件</li>
              </ul>
            </Paragraph>

            <Title level={5}>2. 预算管理</Title>
            <Paragraph>
              <ul>
                <li>设置合理的日预算</li>
                <li>使用共享钱包统一管理</li>
                <li>监控消耗异常及时调整</li>
              </ul>
            </Paragraph>
          </TabPane>

          <TabPane tab="数据分析" key="3">
            <Title level={4}>数据分析最佳实践</Title>
            <Divider />
            
            <Title level={5}>1. 报表查询</Title>
            <Paragraph>
              <ul>
                <li>使用异步报表处理大数据量</li>
                <li>合理设置查询时间范围</li>
                <li>选择必要的维度和指标</li>
              </ul>
            </Paragraph>

            <Title level={5}>2. 数据解读</Title>
            <Paragraph>
              <ul>
                <li>关注CTR、CVR等核心指标</li>
                <li>对比不同维度数据找规律</li>
                <li>结合业务目标分析ROI</li>
              </ul>
            </Paragraph>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'ErrorCodes.tsx',
    title: '错误码文档',
    content: `/**
 * 错误码文档页面
 */

import { Card, Table, Input, Tag, Typography } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { useState } from 'react';

const { Search } = Input;
const { Text } = Typography;

const allErrorCodes = [
  { key: '1', code: '40000', message: '请求参数错误', level: '客户端错误', solution: '检查请求参数格式和必填字段' },
  { key: '2', code: '40001', message: '缺少必填参数', level: '客户端错误', solution: '补充缺失的必填参数' },
  { key: '3', code: '40002', message: '参数值无效', level: '客户端错误', solution: '检查参数值是否符合要求' },
  { key: '4', code: '40100', message: '未授权', level: '认证错误', solution: '检查Access Token是否有效' },
  { key: '5', code: '40101', message: 'Token已过期', level: '认证错误', solution: '刷新Access Token' },
  { key: '6', code: '40102', message: '权限不足', level: '认证错误', solution: '检查应用授权范围' },
  { key: '7', code: '40300', message: '访问被禁止', level: '权限错误', solution: '联系管理员开通权限' },
  { key: '8', code: '40400', message: '资源不存在', level: '客户端错误', solution: '检查资源ID是否正确' },
  { key: '9', code: '40900', message: '资源冲突', level: '客户端错误', solution: '检查是否存在重复操作' },
  { key: '10', code: '42900', message: '请求频率超限', level: '限流错误', solution: '降低请求频率，使用批量接口' },
  { key: '11', code: '50000', message: '服务器内部错误', level: '服务端错误', solution: '稍后重试或联系技术支持' },
  { key: '12', code: '50300', message: '服务暂不可用', level: '服务端错误', solution: '等待服务恢复' },
  { key: '13', code: '50400', message: '网关超时', level: '服务端错误', solution: '增加超时时间后重试' },
];

export default function ErrorCodesPage() {
  const [searchText, setSearchText] = useState('');
  const [dataSource, setDataSource] = useState(allErrorCodes);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (!value) {
      setDataSource(allErrorCodes);
    } else {
      const filtered = allErrorCodes.filter(
        item => 
          item.code.includes(value) || 
          item.message.includes(value) ||
          item.solution.includes(value)
      );
      setDataSource(filtered);
    }
  };

  const columns = [
    { 
      title: '错误码', 
      dataIndex: 'code',
      width: 100,
      render: (code: string) => <Text code>{code}</Text>
    },
    { title: '错误信息', dataIndex: 'message', width: 200 },
    { 
      title: '错误类型', 
      dataIndex: 'level',
      width: 120,
      render: (level: string) => {
        const colorMap: Record<string, string> = {
          '客户端错误': 'orange',
          '认证错误': 'red',
          '权限错误': 'red',
          '限流错误': 'purple',
          '服务端错误': 'blue',
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      }
    },
    { title: '解决方案', dataIndex: 'solution' },
  ];

  return (
    <PageTemplate
      title="错误码文档"
      breadcrumb={[{ label: '高级功能' }, { label: '错误码文档' }]}
    >
      <Card>
        <Search
          placeholder="搜索错误码、错误信息或解决方案"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => !e.target.value && handleSearch('')}
          className="mb-4"
        />
        
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条错误码\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}`,
  },
  {
    filename: 'ServiceMarket.tsx',
    title: '服务市场',
    content: `/**
 * 服务市场页面
 */

import { Card, Row, Col, Button, Tag, Rate } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const services = [
  {
    id: 1,
    name: '智能出价服务',
    category: 'AI优化',
    price: '¥5,000/月',
    rating: 4.8,
    users: 1234,
    description: '基于机器学习的智能出价算法，帮助您优化广告ROI',
    tags: ['AI', '出价优化', '热门'],
  },
  {
    id: 2,
    name: '创意自动生成',
    category: '创意工具',
    price: '¥3,000/月',
    rating: 4.6,
    users: 856,
    description: '自动生成多样化的广告创意，提升点击率',
    tags: ['创意', 'AI生成', '推荐'],
  },
  {
    id: 3,
    name: '数据大屏服务',
    category: '数据可视化',
    price: '¥2,000/月',
    rating: 4.9,
    users: 2345,
    description: '实时数据大屏展示，支持自定义配置',
    tags: ['数据', '可视化', '热门'],
  },
  {
    id: 4,
    name: 'API监控告警',
    category: '运维工具',
    price: '¥1,000/月',
    rating: 4.7,
    users: 678,
    description: 'API调用监控和异常告警，保障系统稳定',
    tags: ['监控', '告警', '新品'],
  },
  {
    id: 5,
    name: '自动化投放',
    category: 'AI优化',
    price: '¥8,000/月',
    rating: 4.5,
    users: 456,
    description: '全自动广告投放管理，节省人力成本',
    tags: ['自动化', 'AI', '推荐'],
  },
  {
    id: 6,
    name: '竞品分析工具',
    category: '数据分析',
    price: '¥4,000/月',
    rating: 4.4,
    users: 789,
    description: '竞品广告投放数据分析，洞察市场趋势',
    tags: ['分析', '竞品', '专业'],
  },
];

export default function ServiceMarketPage() {
  return (
    <PageTemplate
      title="服务市场"
      breadcrumb={[{ label: '高级功能' }, { label: '服务市场' }]}
    >
      <Row gutter={[16, 16]}>
        {services.map((service) => (
          <Col key={service.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              title={service.name}
              extra={<Tag color="blue">{service.category}</Tag>}
            >
              <div className="mb-3">
                <Rate disabled defaultValue={service.rating} />
                <span className="ml-2 text-gray-500">
                  {service.rating} ({service.users}人使用)
                </span>
              </div>
              
              <p className="text-gray-600 mb-4" style={{ minHeight: '60px' }}>
                {service.description}
              </p>
              
              <div className="mb-4">
                {service.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">
                  {service.price}
                </span>
                <Button type="primary">立即购买</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </PageTemplate>
  );
}`,
  },
];

// 批量生成文件
let successCount = 0;
let failCount = 0;

console.log('🚀 开始生成高级功能页面...\n');

pages.forEach((page) => {
  try {
    const filePath = path.join(PAGES_DIR, page.filename);
    fs.writeFileSync(filePath, page.content, 'utf-8');
    console.log(`✅ ${page.filename} - ${page.title}`);
    successCount++;
  } catch (error) {
    console.error(`❌ ${page.filename} - ${error.message}`);
    failCount++;
  }
});

console.log(`\n✨ 页面生成完成！`);
console.log(`成功: ${successCount} 个`);
console.log(`失败: ${failCount} 个`);
console.log(`\n💡 运行 'npm run build' 验证构建\n`);
