/**
 * 数据报表
 */

import { useState, useMemo } from 'react';
import { Card, Table, Button, Space, DatePicker, Spin, Alert, Row, Col } from 'antd';
import { RefreshCw, Download } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useReport } from '@/hooks/useReport';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export default function ReportPage() {
  const advertiserId = '123456789';
  
  // 日期范围状态
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  
  const startDate = dateRange[0].format('YYYY-MM-DD');
  const endDate = dateRange[1].format('YYYY-MM-DD');
  
  // 获取报表数据
  const { reportData, summary, isLoading, error, refetch } = useReport({
    advertiser_id: advertiserId,
    startDate,
    endDate,
    dimension: 'date',
  });
  
  // 处理日期变化
  const handleDateChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    }
  };
  
  const handleRefresh = () => {
    refetch();
  };
  
  // 表格列
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '展现',
      dataIndex: 'show',
      key: 'show',
      width: 120,
      render: (val: number) => val?.toLocaleString() || '-',
    },
    {
      title: '点击',
      dataIndex: 'click',
      key: 'click',
      width: 120,
      render: (val: number) => val?.toLocaleString() || '-',
    },
    {
      title: '消耗',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      render: (val: number) => val ? `¥${val.toLocaleString()}` : '-',
    },
    {
      title: 'CTR',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 100,
      render: (val: number) => val ? `${val.toFixed(2)}%` : '-',
    },
    {
      title: 'CPC',
      dataIndex: 'cpc',
      key: 'cpc',
      width: 100,
      render: (val: number) => val ? `¥${val.toFixed(2)}` : '-',
    },
    {
      title: '转化',
      dataIndex: 'conversion',
      key: 'conversion',
      width: 100,
      render: (val: number) => val?.toLocaleString() || '-',
    },
  ];
  
  // 准备表格数据
  const tableData = useMemo(() => {
    return (reportData || []).map((item: any, index: number) => ({
      ...item,
      key: index,
    }));
  }, [reportData]);
  
  // 准备图表数据
  const chartData = useMemo(() => {
    return (reportData || []).map((item: any) => ({
      date: dayjs(item.date).format('MM-DD'),
      消耗: item.cost,
      点击: item.click,
      转化: item.conversion,
    }));
  }, [reportData]);
  return (
    <PageTemplate
      title="数据报表"
      breadcrumb={[{ label: '报表' }]}
      extra={
        <Space>
          <RangePicker
            value={dateRange}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
          <Button
            icon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            loading={isLoading}
          >
            刷新
          </Button>
          <Button icon={<Download size={16} />} type="primary">导出</Button>
        </Space>
      }
    >
      {error && (
        <Alert
          message="加载失败"
          description={(error as any)?.message || '获取报表数据失败'}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}

      <Spin spinning={isLoading}>
        {/* 核心指标 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="总展现" value={summary?.show?.toLocaleString() || '0'} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="总点击" value={summary?.click?.toLocaleString() || '0'} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="总消耗" value={summary?.cost ? `¥${summary.cost.toLocaleString()}` : '¥0'} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard 
              title="总CTR" 
              value={summary?.ctr ? `${summary.ctr.toFixed(2)}%` : '0%'} 
            />
          </Col>
        </Row>

        {/* 数据趋势图表 */}
        <Card title="数据趋势" className="mb-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="消耗" stroke="#1890ff" strokeWidth={2} />
              <Line type="monotone" dataKey="点击" stroke="#52c41a" strokeWidth={2} />
              <Line type="monotone" dataKey="转化" stroke="#faad14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 数据表格 */}
        <Card>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              total: tableData.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </Card>
      </Spin>
    </PageTemplate>
  );
}
