/**
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
}