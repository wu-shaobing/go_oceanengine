/**
 * 工具箱
 */

import { Card, Row, Col, Button } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import {
  ToolOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  ExportOutlined,
} from '@ant-design/icons';

const tools = [
  { icon: <FileTextOutlined />, title: '批量创建', desc: '批量创建广告计划', color: '#1890ff' },
  { icon: <CloudUploadOutlined />, title: '批量上传', desc: '批量上传素材', color: '#52c41a' },
  { icon: <BarChartOutlined />, title: '数据导出', desc: '导出报表数据', color: '#faad14' },
  { icon: <ExportOutlined />, title: '批量修改', desc: '批量修改广告状态', color: '#f5222d' },
  { icon: <SettingOutlined />, title: '定时任务', desc: '设置定时投放', color: '#722ed1' },
  { icon: <ToolOutlined />, title: '更多工具', desc: '敬请期待...', color: '#13c2c2' },
];

export default function ToolsPage() {
  return (
    <PageTemplate title="工具箱" breadcrumb={[{ label: '高级功能' }, { label: '工具箱' }]}>
      <Row gutter={[16, 16]}>
        {tools.map((tool, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="text-center"
              bodyStyle={{ padding: '40px 20px' }}
            >
              <div style={{ fontSize: '48px', color: tool.color, marginBottom: '16px' }}>
                {tool.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-500">{tool.desc}</p>
              <Button type="primary" className="mt-4">立即使用</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </PageTemplate>
  );
}
