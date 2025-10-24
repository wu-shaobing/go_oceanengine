/**
 * 广告计划管理
 */

import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Alert, Spin } from 'antd';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { useAdList } from '@/hooks/useAds';

const statusMap: Record<string, { text: string; color: string }> = {
  'AD_STATUS_DELIVERY_OK': { text: '投放中', color: 'green' },
  '投放中': { text: '投放中', color: 'green' },
  '暂停': { text: '暂停', color: 'orange' },
};

export default function CampaignPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 使用 React Query Hook 获取广告列表
  const { data, isLoading, error, refetch } = useAdList({
    advertiser_id: '123456789',
    page,
    pageSize,
  });
  
  const handleRefresh = () => {
    refetch();
  };
  
  const columns = [
    {
      title: '广告ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={statusMap[status]?.color || 'default'}>
          {statusMap[status]?.text || status}
        </Tag>
      ),
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      render: (val: number) => val ? `¥${val.toLocaleString()}` : '-',
    },
    {
      title: '落地页类型',
      dataIndex: 'landing_type',
      key: 'landing_type',
      width: 120,
    },
    {
      title: '项目ID',
      dataIndex: 'project_id',
      key: 'project_id',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: () => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];
  
  const tableData = data?.data?.map((item: any) => ({
    ...item,
    key: item.id,
  })) || [];
  return (
    <PageTemplate
      title="广告计划管理"
      breadcrumb={[{ label: '广告计划' }]}
      extra={
        <Space>
          <Button 
            icon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            loading={isLoading}
          >
            刷新
          </Button>
          <Button icon={<Download size={16} />}>导出</Button>
          <Button type="primary" icon={<Plus size={16} />}>新建广告</Button>
        </Space>
      }
    >
      {error && (
        <Alert
          message="加载失败"
          description={(error as any)?.message || '获取广告列表失败'}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}

      <Card>
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1000 }}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: data?.total || 0,
              showTotal: (total) => `共 ${total} 条`,
              showSizeChanger: true,
              onChange: (newPage, newPageSize) => {
                setPage(newPage);
                if (newPageSize) setPageSize(newPageSize);
              },
            }}
          />
        </Spin>
      </Card>
    </PageTemplate>
  );
}
