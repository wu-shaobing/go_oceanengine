/**
 * 广告概览页面
 */

import { useMemo } from 'react';
import { Card, Row, Col, Button, Space, Spin, Alert } from 'antd';
import { RefreshCw, Download, Plus } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProjectList } from '@/hooks/useProjects';
import { useAdList } from '@/hooks/useAds';
import { useReport } from '@/hooks/useReport';
import { useAdvertiser } from '@/hooks/useAdvertiser';
import { transformPaginatedResponse } from '@/lib/api/transformer';
import dayjs from 'dayjs';

export default function OverviewPage() {
  const { advertiserId } = useAdvertiser();
  
  // 获取项目数据
  const { data: projectData, isLoading: projectLoading } = useProjectList({
    advertiser_id: advertiserId,
    page: 1,
    pageSize: 100,
  });
  
  // 获取广告数据
  const { data: adData, isLoading: adLoading } = useAdList({
    advertiser_id: advertiserId,
    page: 1,
    pageSize: 100,
  });
  
  // 获取近7天报表数据
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  
  const { reportData, summary, isLoading: reportLoading, refetch } = useReport({
    advertiser_id: advertiserId,
    startDate,
    endDate,
    dimension: 'date',
  });
  
  const isLoading = projectLoading || adLoading || reportLoading;
  
  // 计算核心指标
  const metrics = useMemo(() => {
    const totalShow = summary?.show || 0;
    const totalClick = summary?.click || 0;
    const totalCost = summary?.cost || 0;
    const totalConversion = summary?.conversion || 0;
    
    const ctr = totalShow > 0 ? ((totalClick / totalShow) * 100).toFixed(2) : '0';
    const roi = totalCost > 0 ? (totalConversion / totalCost * 100).toFixed(1) : '0';
    
    return {
      show: totalShow.toLocaleString(),
      click: totalClick.toLocaleString(),
      cost: `¥${totalCost.toLocaleString()}`,
      roi: roi,
      ctr: `${ctr}%`,
    };
  }, [summary]);
  
  // 准备图表数据
  const chartData = useMemo(() => {
    if (!Array.isArray(reportData)) return [];
    return reportData.map((item: any) => ({
      date: dayjs(item.date).format('MM/DD'),
      cost: item.cost,
      click: item.click,
      show: item.show,
      conversion: item.conversion,
    }));
  }, [reportData]);
  
  const handleRefresh = () => {
    refetch();
  };
  return (
    <PageTemplate
      title="广告概览"
      breadcrumb={[{ label: '概览' }]}
      extra={
        <Space>
          <Button 
            icon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            loading={isLoading}
          >
            刷新数据
          </Button>
          <Button icon={<Download size={16} />} type="primary">导出报表</Button>
        </Space>
      }
    >
      <Spin spinning={isLoading}>
        {/* 核心数据指标 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="展现量" value={metrics.show} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="点击量" value={metrics.click} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="消耗金额" value={metrics.cost} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DataCard title="ROI" value={metrics.roi} />
          </Col>
        </Row>

        {/* 趋势图表 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card title="消耗趋势" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cost" stroke="#1890ff" fill="#e6f7ff" name="消耗" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="点击与转化" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="click" stroke="#1890ff" name="点击" />
                  <Line type="monotone" dataKey="conversion" stroke="#52c41a" name="转化" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* 快捷操作 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="快捷操作" bordered={false}>
              <Space size="large" wrap>
                <Button type="primary" size="large" icon={<Plus size={20} />}>创建新广告</Button>
                <Button size="large">批量管理</Button>
                <Button size="large">数据报表</Button>
                <Button size="large">设置</Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="概览信息" bordered={false}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>项目总数：<strong>{transformPaginatedResponse(projectData || {}).total}</strong></div>
                <div>广告总数：<strong>{transformPaginatedResponse(adData || {}).total}</strong></div>
                <div>点击率：<strong>{metrics.ctr}</strong></div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageTemplate>
  );
}
