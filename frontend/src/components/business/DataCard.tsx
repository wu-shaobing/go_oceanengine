import { Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';

interface DataCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  precision?: number;
  trend?: 'up' | 'down' | 'none';
  change?: string;
  loading?: boolean;
  style?: CSSProperties;
  valueStyle?: CSSProperties;
}

export function DataCard({
  title,
  value,
  suffix,
  prefix,
  precision = 2,
  trend = 'none',
  change,
  loading = false,
  style,
  valueStyle,
}: DataCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') {
      return <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />;
    }
    if (trend === 'down') {
      return <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />;
    }
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return '#52c41a';
    if (trend === 'down') return '#ff4d4f';
    return '#999';
  };

  return (
    <Card loading={loading} bordered={false} style={{ ...style }}>
      <Statistic
        title={title}
        value={value}
        suffix={suffix}
        prefix={prefix}
        precision={typeof value === 'number' ? precision : 0}
        valueStyle={{ fontSize: 24, fontWeight: 600, ...valueStyle }}
      />
      {change && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: getTrendColor(),
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {getTrendIcon()}
          <span>环比 {change}</span>
        </div>
      )}
    </Card>
  );
}

// 数据卡片组 - 一行显示多个卡片
interface DataCardGroupProps {
  cards: Array<Omit<DataCardProps, 'style'>>;
  loading?: boolean;
  gutter?: number;
}

export function DataCardGroup({ cards, loading = false, gutter = 16 }: DataCardGroupProps) {
  return (
    <Row gutter={gutter}>
      {cards.map((card, index) => (
        <Col key={index} xs={24} sm={12} md={12} lg={6}>
          <DataCard {...card} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
