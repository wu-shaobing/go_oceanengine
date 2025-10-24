/**
 * 项目管理页面
 */

import { useState } from 'react';
import { Button, Table, Space, Tag, Alert, Spin } from 'antd';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { useProjectList } from '@/hooks/useProjects';

const statusMap: Record<string, { text: string; color: string }> = {
  'AD_STATUS_DELIVERY_OK': { text: '投放中', color: 'green' },
  'running': { text: '进行中', color: 'green' },
  'paused': { text: '已暂停', color: 'orange' },
  'completed': { text: '已完成', color: 'blue' },
  'archived': { text: '已归档', color: 'gray' },
};

export default function ProjectPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 使用 React Query Hook 获取项目列表
  const { data, isLoading, error, refetch } = useProjectList({
    advertiser_id: '123456789', // TODO: 从认证状态获取
    page,
    pageSize,
  });
  
  // 处理刷新
  const handleRefresh = () => {
    refetch();
  };
  // 表格列配置
  const columns = [
    {
      title: '项目ID',
      dataIndex: 'project_id',
      key: 'project_id',
      width: 100,
    },
    {
      title: '项目名称',
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
      title: '落地页类型',
      dataIndex: 'landing_type',
      key: 'landing_type',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 120,
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
  
  // 准备表格数据
  const tableData = data?.data?.map((item: any) => ({
    ...item,
    key: item.project_id,
  })) || [];

  return (
    <PageTemplate
      title="项目管理"
      breadcrumb={[
        { label: '项目管理' },
      ]}
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
          <Button type="primary" icon={<Plus size={16} />}>新建项目</Button>
        </Space>
      }
    >
      {/* 错误提示 */}
      {error && (
        <Alert
          message="加载失败"
          description={(error as any)?.message || '获取项目列表失败，请稍后重试'}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}
      
      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataCard 
          title="项目总数" 
          value={data?.page_info?.total_number?.toString() || '0'} 
        />
        <DataCard 
          title="进行中" 
          value={tableData.filter((p: any) => p.status === 'AD_STATUS_DELIVERY_OK').length.toString()} 
        />
        <DataCard title="总预算" value="-" />
        <DataCard title="总消耗" value="-" />
      </div>

      {/* 数据表格 */}
      <Spin spinning={isLoading}>
        <Table
          dataSource={tableData}
          columns={columns}
          scroll={{ x: 800 }}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: data?.page_info?.total_number || 0,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              if (newPageSize) setPageSize(newPageSize);
            },
          }}
        />
      </Spin>
    </PageTemplate>
  );
}
