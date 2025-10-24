/**
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
}