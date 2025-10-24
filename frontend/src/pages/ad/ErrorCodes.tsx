/**
 * 错误码文档页面
 */

import { Card, Table, Input, Tag, Typography } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { useState } from 'react';

const { Search } = Input;
const { Text } = Typography;

const allErrorCodes = [
  { key: '1', code: '40000', message: '请求参数错误', level: '客户端错误', solution: '检查请求参数格式和必填字段' },
  { key: '2', code: '40001', message: '缺少必填参数', level: '客户端错误', solution: '补充缺失的必填参数' },
  { key: '3', code: '40002', message: '参数值无效', level: '客户端错误', solution: '检查参数值是否符合要求' },
  { key: '4', code: '40100', message: '未授权', level: '认证错误', solution: '检查Access Token是否有效' },
  { key: '5', code: '40101', message: 'Token已过期', level: '认证错误', solution: '刷新Access Token' },
  { key: '6', code: '40102', message: '权限不足', level: '认证错误', solution: '检查应用授权范围' },
  { key: '7', code: '40300', message: '访问被禁止', level: '权限错误', solution: '联系管理员开通权限' },
  { key: '8', code: '40400', message: '资源不存在', level: '客户端错误', solution: '检查资源ID是否正确' },
  { key: '9', code: '40900', message: '资源冲突', level: '客户端错误', solution: '检查是否存在重复操作' },
  { key: '10', code: '42900', message: '请求频率超限', level: '限流错误', solution: '降低请求频率，使用批量接口' },
  { key: '11', code: '50000', message: '服务器内部错误', level: '服务端错误', solution: '稍后重试或联系技术支持' },
  { key: '12', code: '50300', message: '服务暂不可用', level: '服务端错误', solution: '等待服务恢复' },
  { key: '13', code: '50400', message: '网关超时', level: '服务端错误', solution: '增加超时时间后重试' },
];

export default function ErrorCodesPage() {
  const [searchText, setSearchText] = useState('');
  const [dataSource, setDataSource] = useState(allErrorCodes);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (!value) {
      setDataSource(allErrorCodes);
    } else {
      const filtered = allErrorCodes.filter(
        item => 
          item.code.includes(value) || 
          item.message.includes(value) ||
          item.solution.includes(value)
      );
      setDataSource(filtered);
    }
  };

  const columns = [
    { 
      title: '错误码', 
      dataIndex: 'code',
      width: 100,
      render: (code: string) => <Text code>{code}</Text>
    },
    { title: '错误信息', dataIndex: 'message', width: 200 },
    { 
      title: '错误类型', 
      dataIndex: 'level',
      width: 120,
      render: (level: string) => {
        const colorMap: Record<string, string> = {
          '客户端错误': 'orange',
          '认证错误': 'red',
          '权限错误': 'red',
          '限流错误': 'purple',
          '服务端错误': 'blue',
        };
        return <Tag color={colorMap[level]}>{level}</Tag>;
      }
    },
    { title: '解决方案', dataIndex: 'solution' },
  ];

  return (
    <PageTemplate
      title="错误码文档"
      breadcrumb={[{ label: '高级功能' }, { label: '错误码文档' }]}
    >
      <Card>
        <Search
          placeholder="搜索错误码、错误信息或解决方案"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => !e.target.value && handleSearch('')}
          className="mb-4"
        />
        
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条错误码`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}