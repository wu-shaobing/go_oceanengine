/**
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
                description={`级别: ${item.level}`}
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
}