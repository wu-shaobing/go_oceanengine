#!/bin/bash

# 页面内容批量生成脚本
# 用于将模板页面替换为带有特定业务内容的页面

BASE_DIR="/Users/wushaobing911/Desktop/go/frontend/src/pages"

echo "🚀 开始批量生成页面内容..."
echo ""

# 统计
total=0
generated=0

# 生成概览页面（通用模板）
generate_overview_page() {
    local dir=$1
    local title=$2
    local metrics=$3
    
    cat > "${BASE_DIR}/${dir}/Overview.tsx" << 'EOF'
/**
 * ${TITLE}概览页面
 */

import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { date: '01/01', value: 1200, value2: 800 },
  { date: '01/02', value: 1800, value2: 1200 },
  { date: '01/03', value: 1500, value2: 1000 },
  { date: '01/04', value: 2200, value2: 1600 },
  { date: '01/05', value: 2800, value2: 2000 },
  { date: '01/06', value: 2400, value2: 1800 },
  { date: '01/07', value: 3200, value2: 2400 },
];

export default function OverviewPage() {
  return (
    <PageTemplate
      title="${TITLE}概览"
      breadcrumb={[{ label: '概览' }]}
      extra={
        <Space>
          <Button>刷新数据</Button>
          <Button type="primary">导出报表</Button>
        </Space>
      }
    >
      {/* 核心数据指标 */}
      <Row gutter={[16, 16]} className="mb-6">
        ${METRICS}
      </Row>

      {/* 趋势图表 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={12}>
          <Card title="数据趋势" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#1890ff" fill="#e6f7ff" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="对比分析" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1890ff" />
                <Line type="monotone" dataKey="value2" stroke="#52c41a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 快捷操作 */}
      <Card title="快捷操作" bordered={false}>
        <Space size="large">
          <Button type="primary" size="large">创建新${TITLE}</Button>
          <Button size="large">批量管理</Button>
          <Button size="large">数据报表</Button>
          <Button size="large">设置</Button>
        </Space>
      </Card>
    </PageTemplate>
  );
}
EOF
    
    # 替换变量
    sed -i '' "s/\${TITLE}/$title/g" "${BASE_DIR}/${dir}/Overview.tsx"
    sed -i '' "s/\${METRICS}/$metrics/g" "${BASE_DIR}/${dir}/Overview.tsx"
    
    echo "✅ 生成 ${dir}/Overview.tsx"
    ((generated++))
}

# 生成各产品线概览页面
echo "📊 生成概览页面..."

# 巨量广告概览
METRICS='<Col span={6}><DataCard title="展现量" value="1,234,567" trend={{ value: 12.5, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="点击量" value="98,765" trend={{ value: 8.3, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="消耗金额" value="¥45,678" trend={{ value: 5.2, direction: '"'"'down'"'"' }} /></Col>
        <Col span={6}><DataCard title="ROI" value="3.2" trend={{ value: 15.7, direction: '"'"'up'"'"' }} /></Col>'
generate_overview_page "ad" "广告" "$METRICS"

# 千川概览
METRICS='<Col span={6}><DataCard title="GMV" value="¥1,234,567" trend={{ value: 22.5, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="订单数" value="12,345" trend={{ value: 18.3, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="消耗" value="¥56,789" trend={{ value: 8.2, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="ROI" value="21.7" trend={{ value: 12.7, direction: '"'"'up'"'"' }} /></Col>'
generate_overview_page "qianchuan" "千川" "$METRICS"

# 抖+概览  
METRICS='<Col span={6}><DataCard title="播放量" value="2,345,678" trend={{ value: 32.5, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="点赞数" value="123,456" trend={{ value: 28.3, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="订单数" value="8,765" trend={{ value: 15.2, direction: '"'"'up'"'"' }} /></Col>
        <Col span={6}><DataCard title="消耗" value="¥12,345" trend={{ value: 5.7, direction: '"'"'up'"'"' }} /></Col>'
generate_overview_page "douplus" "抖+" "$METRICS"

((total+=3))

echo ""
echo "✨ 页面生成完成！"
echo "总计: $total 个页面"
echo "生成: $generated 个"
echo ""
echo "💡 提示: 运行 'npm run dev' 查看效果"
EOF

chmod +x /Users/wushaobing911/Desktop/go/frontend/scripts/generate-pages.sh
