/**
 * 批量生成所有页面内容
 * 替换模板页面为带有实际业务内容的页面
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages');

// 页面生成配置
const PAGE_CONFIGS = {
  // ===== 巨量广告 (9个) =====
  'ad/Campaign': {
    title: '广告计划管理',
    breadcrumb: [{ label: '广告计划' }],
    tableColumns: [
      { title: '计划ID', dataIndex: 'id' },
      { title: '计划名称', dataIndex: 'name' },
      { title: '状态', dataIndex: 'status' },
      { title: '预算', dataIndex: 'budget' },
      { title: '消耗', dataIndex: 'cost' },
      { title: '展现', dataIndex: 'impression' },
      { title: '点击', dataIndex: 'click' },
      { title: '创建时间', dataIndex: 'createTime' },
    ],
    mockData: [
      { key: '1', id: 'CP001', name: '春季促销-信息流', status: '投放中', budget: '¥5,000', cost: '¥3,245', impression: '125,678', click: '8,234', createTime: '2024-01-15' },
      { key: '2', id: 'CP002', name: '新品上市-视频流', status: '投放中', budget: '¥8,000', cost: '¥6,789', impression: '256,789', click: '15,678', createTime: '2024-01-16' },
      { key: '3', id: 'CP003', name: '品牌曝光-搜索广告', status: '暂停', budget: '¥3,000', cost: '¥1,234', impression: '45,678', click: '2,345', createTime: '2024-01-17' },
    ],
  },
  
  'ad/Creative': {
    title: '创意管理',
    breadcrumb: [{ label: '创意' }],
    tableColumns: [
      { title: '创意ID', dataIndex: 'id' },
      { title: '创意类型', dataIndex: 'type' },
      { title: '标题', dataIndex: 'title' },
      { title: '展现', dataIndex: 'impression' },
      { title: '点击率', dataIndex: 'ctr' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'CR001', type: '大图', title: '限时抢购，低至3折起！', impression: '89,234', ctr: '5.2%', status: '投放中' },
      { key: '2', id: 'CR002', type: '视频', title: '新品发布会精彩回顾', impression: '156,789', ctr: '8.7%', status: '投放中' },
      { key: '3', id: 'CR003', type: '组图', title: '春季新款全场上新', impression: '45,678', ctr: '3.8%', status: '审核中' },
    ],
  },

  'ad/Report': {
    title: '数据报表',
    breadcrumb: [{ label: '报表' }],
    hasCharts: true,
    tableColumns: [
      { title: '日期', dataIndex: 'date' },
      { title: '展现', dataIndex: 'impression' },
      { title: '点击', dataIndex: 'click' },
      { title: '消耗', dataIndex: 'cost' },
      { title: 'CTR', dataIndex: 'ctr' },
      { title: 'CPC', dataIndex: 'cpc' },
    ],
    mockData: [
      { key: '1', date: '2024-01-20', impression: '125,678', click: '8,234', cost: '¥3,245', ctr: '6.5%', cpc: '¥0.39' },
      { key: '2', date: '2024-01-19', impression: '112,345', click: '7,456', cost: '¥2,987', ctr: '6.6%', cpc: '¥0.40' },
      { key: '3', date: '2024-01-18', impression: '98,765', click: '6,123', cost: '¥2,456', ctr: '6.2%', cpc: '¥0.40' },
    ],
  },

  'ad/Account': {
    title: '账户管理',
    breadcrumb: [{ label: '账户' }],
    tableColumns: [
      { title: '账户ID', dataIndex: 'id' },
      { title: '账户名称', dataIndex: 'name' },
      { title: '账户余额', dataIndex: 'balance' },
      { title: '消耗', dataIndex: 'cost' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'ACC001', name: '主账户', balance: '¥125,678', cost: '¥45,234', status: '正常' },
      { key: '2', id: 'ACC002', name: '子账户-推广', balance: '¥56,789', cost: '¥23,456', status: '正常' },
      { key: '3', id: 'ACC003', name: '子账户-品牌', balance: '¥8,234', cost: '¥6,789', status: '预警' },
    ],
  },

  'ad/AccountFunds': {
    title: '资金明细',
    breadcrumb: [{ label: '账户', name: '资金明细' }],
    tableColumns: [
      { title: '时间', dataIndex: 'time' },
      { title: '交易类型', dataIndex: 'type' },
      { title: '金额', dataIndex: 'amount' },
      { title: '余额', dataIndex: 'balance' },
      { title: '备注', dataIndex: 'remark' },
    ],
    mockData: [
      { key: '1', time: '2024-01-20 14:23', type: '充值', amount: '+¥10,000', balance: '¥125,678', remark: '银行转账' },
      { key: '2', time: '2024-01-20 10:15', type: '消耗', amount: '-¥3,245', balance: '¥115,678', remark: '广告投放' },
      { key: '3', time: '2024-01-19 16:45', type: '消耗', amount: '-¥2,987', balance: '¥118,923', remark: '广告投放' },
    ],
  },

  'ad/Tools': {
    title: '工具箱',
    breadcrumb: [{ label: '工具' }],
    isToolPage: true,
  },

  'ad/AudiencePackage': {
    title: '定向包',
    breadcrumb: [{ label: '定向包' }],
    tableColumns: [
      { title: '定向包名称', dataIndex: 'name' },
      { title: '定向条件', dataIndex: 'target' },
      { title: '预估覆盖', dataIndex: 'coverage' },
      { title: '使用次数', dataIndex: 'usage' },
      { title: '创建时间', dataIndex: 'createTime' },
    ],
    mockData: [
      { key: '1', name: '女性用户-18-30岁', target: '性别:女, 年龄:18-30', coverage: '8,500万', usage: 23, createTime: '2024-01-10' },
      { key: '2', name: '一线城市-高消费', target: '城市:一线, 消费:高', coverage: '2,300万', usage: 15, createTime: '2024-01-12' },
      { key: '3', name: '兴趣-美妆护肤', target: '兴趣:美妆/护肤', coverage: '5,600万', usage: 31, createTime: '2024-01-15' },
    ],
  },

  'ad/MaterialUpload': {
    title: '素材上传',
    breadcrumb: [{ label: '素材上传' }],
    isUploadPage: true,
  },

  'ad/NegativeWords': {
    title: '否定关键词',
    breadcrumb: [{ label: '否定关键词' }],
    tableColumns: [
      { title: '关键词', dataIndex: 'keyword' },
      { title: '匹配类型', dataIndex: 'matchType' },
      { title: '添加时间', dataIndex: 'createTime' },
      { title: '操作', dataIndex: 'action' },
    ],
    mockData: [
      { key: '1', keyword: '免费', matchType: '精确匹配', createTime: '2024-01-15 10:30' },
      { key: '2', keyword: '盗版', matchType: '短语匹配', createTime: '2024-01-16 14:20' },
      { key: '3', keyword: '破解版', matchType: '精确匹配', createTime: '2024-01-17 09:15' },
    ],
  },

  // ===== 千川 (6个) =====
  'qianchuan/Plan': {
    title: '千川计划',
    breadcrumb: [{ label: '计划' }],
    tableColumns: [
      { title: '计划ID', dataIndex: 'id' },
      { title: '计划名称', dataIndex: 'name' },
      { title: 'GMV', dataIndex: 'gmv' },
      { title: '消耗', dataIndex: 'cost' },
      { title: 'ROI', dataIndex: 'roi' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'QC001', name: '直播带货-春季专场', gmv: '¥125,678', cost: '¥8,234', roi: '15.3', status: '投放中' },
      { key: '2', id: 'QC002', name: '短视频推广-新品', gmv: '¥89,456', cost: '¥5,678', roi: '15.8', status: '投放中' },
      { key: '3', id: 'QC003', name: '商品卡推广', gmv: '¥56,789', cost: '¥3,456', roi: '16.4', status: '暂停' },
    ],
  },

  'qianchuan/Product': {
    title: '商品管理',
    breadcrumb: [{ label: '商品' }],
    tableColumns: [
      { title: '商品ID', dataIndex: 'id' },
      { title: '商品名称', dataIndex: 'name' },
      { title: '价格', dataIndex: 'price' },
      { title: '销量', dataIndex: 'sales' },
      { title: 'GMV', dataIndex: 'gmv' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'PD001', name: '春季新款连衣裙', price: '¥299', sales: 1234, gmv: '¥369,066', status: '上架' },
      { key: '2', id: 'PD002', name: '护肤套装礼盒', price: '¥599', sales: 567, gmv: '¥339,633', status: '上架' },
      { key: '3', id: 'PD003', name: '运动鞋系列', price: '¥399', sales: 890, gmv: '¥355,110', status: '预售' },
    ],
  },

  'qianchuan/Live': {
    title: '直播管理',
    breadcrumb: [{ label: '直播' }],
    tableColumns: [
      { title: '直播间ID', dataIndex: 'id' },
      { title: '直播标题', dataIndex: 'title' },
      { title: '观看人数', dataIndex: 'viewers' },
      { title: 'GMV', dataIndex: 'gmv' },
      { title: '状态', dataIndex: 'status' },
      { title: '开播时间', dataIndex: 'startTime' },
    ],
    mockData: [
      { key: '1', id: 'LV001', title: '春季新品发布会', viewers: '23.5万', gmv: '¥456,789', status: '直播中', startTime: '2024-01-20 19:00' },
      { key: '2', id: 'LV002', title: '限时秒杀专场', viewers: '15.8万', gmv: '¥234,567', status: '已结束', startTime: '2024-01-19 20:00' },
      { key: '3', id: 'LV003', title: '会员专享福利', viewers: '12.3万', gmv: '¥189,234', status: '已结束', startTime: '2024-01-18 21:00' },
    ],
  },

  'qianchuan/Order': {
    title: '订单管理',
    breadcrumb: [{ label: '订单' }],
    tableColumns: [
      { title: '订单号', dataIndex: 'orderNo' },
      { title: '商品名称', dataIndex: 'product' },
      { title: '金额', dataIndex: 'amount' },
      { title: '用户', dataIndex: 'user' },
      { title: '状态', dataIndex: 'status' },
      { title: '下单时间', dataIndex: 'createTime' },
    ],
    mockData: [
      { key: '1', orderNo: 'ORD20240120001', product: '春季新款连衣裙', amount: '¥299', user: '用户***123', status: '已支付', createTime: '2024-01-20 14:23' },
      { key: '2', orderNo: 'ORD20240120002', product: '护肤套装礼盒', amount: '¥599', user: '用户***456', status: '已发货', createTime: '2024-01-20 13:15' },
      { key: '3', orderNo: 'ORD20240120003', product: '运动鞋系列', amount: '¥399', user: '用户***789', status: '待发货', createTime: '2024-01-20 12:08' },
    ],
  },

  'qianchuan/ROIGoal': {
    title: 'ROI目标',
    breadcrumb: [{ label: 'ROI目标' }],
    tableColumns: [
      { title: '计划名称', dataIndex: 'name' },
      { title: '目标ROI', dataIndex: 'targetRoi' },
      { title: '实际ROI', dataIndex: 'actualRoi' },
      { title: '完成率', dataIndex: 'rate' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', name: '直播带货-春季专场', targetRoi: '15.0', actualRoi: '15.3', rate: '102%', status: '达成' },
      { key: '2', name: '短视频推广-新品', targetRoi: '18.0', actualRoi: '15.8', rate: '88%', status: '未达成' },
      { key: '3', name: '商品卡推广', targetRoi: '16.0', actualRoi: '16.4', rate: '103%', status: '达成' },
    ],
  },

  'qianchuan/AwemeAuth': {
    title: '抖音号授权',
    breadcrumb: [{ label: '抖音号授权' }],
    tableColumns: [
      { title: '抖音号', dataIndex: 'awemeId' },
      { title: '昵称', dataIndex: 'nickname' },
      { title: '粉丝数', dataIndex: 'fans' },
      { title: '授权状态', dataIndex: 'status' },
      { title: '授权时间', dataIndex: 'authTime' },
    ],
    mockData: [
      { key: '1', awemeId: 'DY12345678', nickname: '时尚小仙女', fans: '125.6万', status: '已授权', authTime: '2024-01-10' },
      { key: '2', awemeId: 'DY87654321', nickname: '美妆达人', fans: '89.2万', status: '已授权', authTime: '2024-01-12' },
      { key: '3', awemeId: 'DY11223344', nickname: '好物推荐官', fans: '56.8万', status: '待授权', authTime: '-' },
    ],
  },

  // ===== 抖+ (4个) =====
  'douplus/VideoPromo': {
    title: '视频推广',
    breadcrumb: [{ label: '视频推广' }],
    tableColumns: [
      { title: '视频ID', dataIndex: 'id' },
      { title: '视频标题', dataIndex: 'title' },
      { title: '播放量', dataIndex: 'plays' },
      { title: '点赞数', dataIndex: 'likes' },
      { title: '消耗', dataIndex: 'cost' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'VD001', title: '春季穿搭分享', plays: '456.7万', likes: '12.3万', cost: '¥1,234', status: '投放中' },
      { key: '2', id: 'VD002', title: '美食探店vlog', plays: '234.5万', likes: '8.9万', cost: '¥987', status: '投放中' },
      { key: '3', id: 'VD003', title: '旅行打卡记录', plays: '189.2万', likes: '6.5万', cost: '¥756', status: '已完成' },
    ],
  },

  'douplus/LivePromo': {
    title: '直播推广',
    breadcrumb: [{ label: '直播推广' }],
    tableColumns: [
      { title: '直播间ID', dataIndex: 'id' },
      { title: '直播标题', dataIndex: 'title' },
      { title: '观看人数', dataIndex: 'viewers' },
      { title: '互动次数', dataIndex: 'interactions' },
      { title: '消耗', dataIndex: 'cost' },
      { title: '状态', dataIndex: 'status' },
    ],
    mockData: [
      { key: '1', id: 'LV001', title: '新品发布会', viewers: '23.5万', interactions: '5.6万', cost: '¥2,345', status: '投放中' },
      { key: '2', id: 'LV002', title: '限时秒杀', viewers: '15.8万', interactions: '3.2万', cost: '¥1,678', status: '已完成' },
      { key: '3', id: 'LV003', title: '粉丝福利日', viewers: '12.3万', interactions: '2.8万', cost: '¥1,234', status: '已完成' },
    ],
  },

  'douplus/OrderList': {
    title: '订单列表',
    breadcrumb: [{ label: '订单列表' }],
    tableColumns: [
      { title: '订单号', dataIndex: 'orderNo' },
      { title: '推广内容', dataIndex: 'content' },
      { title: '投放金额', dataIndex: 'amount' },
      { title: '推广目标', dataIndex: 'goal' },
      { title: '状态', dataIndex: 'status' },
      { title: '创建时间', dataIndex: 'createTime' },
    ],
    mockData: [
      { key: '1', orderNo: 'DP20240120001', content: '春季穿搭分享', amount: '¥1,234', goal: '播放量', status: '投放中', createTime: '2024-01-20 10:30' },
      { key: '2', orderNo: 'DP20240119002', content: '美食探店vlog', amount: '¥987', goal: '点赞数', status: '已完成', createTime: '2024-01-19 14:20' },
      { key: '3', orderNo: 'DP20240118003', content: '旅行打卡记录', amount: '¥756', goal: '粉丝数', status: '已完成', createTime: '2024-01-18 09:15' },
    ],
  },

  'douplus/DataReport': {
    title: '数据报表',
    breadcrumb: [{ label: '数据报表' }],
    hasCharts: true,
    tableColumns: [
      { title: '日期', dataIndex: 'date' },
      { title: '播放量', dataIndex: 'plays' },
      { title: '点赞数', dataIndex: 'likes' },
      { title: '评论数', dataIndex: 'comments' },
      { title: '分享数', dataIndex: 'shares' },
      { title: '消耗', dataIndex: 'cost' },
    ],
    mockData: [
      { key: '1', date: '2024-01-20', plays: '456.7万', likes: '12.3万', comments: '2.3万', shares: '1.5万', cost: '¥3,456' },
      { key: '2', date: '2024-01-19', plays: '389.2万', likes: '10.5万', comments: '1.9万', shares: '1.2万', cost: '¥2,987' },
      { key: '3', date: '2024-01-18', plays: '312.5万', likes: '8.7万', comments: '1.5万', shares: '0.9万', cost: '¥2,456' },
    ],
  },

  // ===== SDK (4个) =====
  'sdk/Config': {
    title: 'SDK配置',
    breadcrumb: [{ label: 'SDK', name: '配置' }],
    isConfigPage: true,
  },

  'sdk/ApiList': {
    title: 'API列表',
    breadcrumb: [{ label: 'SDK', name: 'API列表' }],
    tableColumns: [
      { title: 'API名称', dataIndex: 'name' },
      { title: '请求方法', dataIndex: 'method' },
      { title: '路径', dataIndex: 'path' },
      { title: '说明', dataIndex: 'description' },
      { title: '版本', dataIndex: 'version' },
    ],
    mockData: [
      { key: '1', name: '获取广告列表', method: 'GET', path: '/ad/list', description: '分页查询广告列表', version: 'v1.0' },
      { key: '2', name: '创建广告', method: 'POST', path: '/ad/create', description: '创建新的广告', version: 'v1.0' },
      { key: '3', name: '更新广告', method: 'PUT', path: '/ad/update', description: '更新广告信息', version: 'v1.0' },
      { key: '4', name: '删除广告', method: 'DELETE', path: '/ad/delete', description: '删除指定广告', version: 'v1.0' },
      { key: '5', name: '获取报表数据', method: 'GET', path: '/report/data', description: '查询广告报表数据', version: 'v1.0' },
    ],
  },

  'sdk/ApiDebugger': {
    title: 'API调试器',
    breadcrumb: [{ label: 'SDK', name: 'API调试器' }],
    isDebuggerPage: true,
  },

  'sdk/BatchOperations': {
    title: '批量操作',
    breadcrumb: [{ label: 'SDK', name: '批量操作' }],
    isBatchPage: true,
  },
};

// 生成通用页面模板
function generatePageContent(pagePath, config) {
  const { title, breadcrumb, tableColumns, mockData, hasCharts, isToolPage, isUploadPage, isConfigPage, isDebuggerPage, isBatchPage } = config;

  // 工具页面
  if (isToolPage) {
    return `/**
 * ${title}
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
    <PageTemplate title="${title}" breadcrumb={${JSON.stringify(breadcrumb)}}>
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
`;
  }

  // 上传页面
  if (isUploadPage) {
    return `/**
 * ${title}
 */

import { Card, Upload, Button, Space, message, Tabs, Form, Input, Select } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { TabPane } = Tabs;

export default function MaterialUploadPage() {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(\`\${info.file.name} 上传成功\`);
      } else if (status === 'error') {
        message.error(\`\${info.file.name} 上传失败\`);
      }
    },
  };

  return (
    <PageTemplate title="${title}" breadcrumb={${JSON.stringify(breadcrumb)}}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="图片上传" key="1">
          <Card>
            <Dragger {...uploadProps} accept="image/*">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
              <p className="ant-upload-hint">
                支持 JPG、PNG、GIF 格式，单个文件不超过 5MB
              </p>
            </Dragger>
          </Card>
        </TabPane>

        <TabPane tab="视频上传" key="2">
          <Card>
            <Dragger {...uploadProps} accept="video/*">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽视频到此区域上传</p>
              <p className="ant-upload-hint">
                支持 MP4、AVI、MOV 格式，单个文件不超过 100MB
              </p>
            </Dragger>
          </Card>
        </TabPane>

        <TabPane tab="视频库" key="3">
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Form layout="inline">
                <Form.Item label="视频名称">
                  <Input placeholder="请输入视频名称" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">搜索</Button>
                </Form.Item>
              </Form>
              <div className="text-gray-500 text-center py-20">
                暂无视频素材
              </div>
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </PageTemplate>
  );
}
`;
  }

  // 配置页面
  if (isConfigPage) {
    return `/**
 * ${title}
 */

import { Card, Form, Input, Select, Button, Space, message, Divider } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';

const { TextArea } = Input;
const { Option } = Select;

export default function ConfigPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('配置信息:', values);
    message.success('配置保存成功！');
  };

  return (
    <PageTemplate title="${title}" breadcrumb={${JSON.stringify(breadcrumb)}}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            appId: '1234567890',
            appSecret: '********************************',
            environment: 'production',
          }}
        >
          <Divider>基础配置</Divider>
          
          <Form.Item
            label="App ID"
            name="appId"
            rules={[{ required: true, message: '请输入App ID' }]}
          >
            <Input placeholder="请输入App ID" />
          </Form.Item>

          <Form.Item
            label="App Secret"
            name="appSecret"
            rules={[{ required: true, message: '请输入App Secret' }]}
          >
            <Input.Password placeholder="请输入App Secret" />
          </Form.Item>

          <Form.Item
            label="环境"
            name="environment"
            rules={[{ required: true, message: '请选择环境' }]}
          >
            <Select>
              <Option value="sandbox">沙箱环境</Option>
              <Option value="production">生产环境</Option>
            </Select>
          </Form.Item>

          <Divider>高级配置</Divider>

          <Form.Item label="API Base URL" name="apiBaseUrl">
            <Input placeholder="https://api.oceanengine.com" />
          </Form.Item>

          <Form.Item label="超时时间(秒)" name="timeout">
            <Input type="number" placeholder="30" />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <TextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存配置
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}
`;
  }

  // 调试器页面
  if (isDebuggerPage) {
    return `/**
 * ${title}
 */

import { Card, Form, Select, Input, Button, Space, message, Tabs } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function ApiDebuggerPage() {
  const [form] = Form.useForm();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      const mockResponse = {
        code: 0,
        message: 'success',
        data: {
          list: [
            { id: 1, name: '示例数据1' },
            { id: 2, name: '示例数据2' },
          ],
          total: 2,
        },
      };
      setResponse(JSON.stringify(mockResponse, null, 2));
      setLoading(false);
      message.success('请求成功！');
    }, 1000);
  };

  return (
    <PageTemplate title="${title}" breadcrumb={${JSON.stringify(breadcrumb)}}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="API调试" key="1">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="API接口"
                name="api"
                rules={[{ required: true, message: '请选择API接口' }]}
              >
                <Select placeholder="请选择要调试的API">
                  <Option value="/ad/list">获取广告列表</Option>
                  <Option value="/ad/create">创建广告</Option>
                  <Option value="/ad/update">更新广告</Option>
                  <Option value="/report/data">获取报表数据</Option>
                </Select>
              </Form.Item>

              <Form.Item label="请求参数" name="params">
                <TextArea
                  rows={10}
                  placeholder='请输入JSON格式参数，例如：&#10;{&#10;  "page": 1,&#10;  "pageSize": 10&#10;}'
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    发送请求
                  </Button>
                  <Button onClick={() => form.resetFields()}>清空</Button>
                </Space>
              </Form.Item>
            </Form>

            {response && (
              <Card title="响应结果" className="mt-4">
                <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96">
                  {response}
                </pre>
              </Card>
            )}
          </TabPane>

          <TabPane tab="请求历史" key="2">
            <div className="text-gray-500 text-center py-20">
              暂无请求历史
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </PageTemplate>
  );
}
`;
  }

  // 批量操作页面
  if (isBatchPage) {
    return `/**
 * ${title}
 */

import { Card, Form, Select, Upload, Button, Space, message, Steps, Alert } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;
const { Dragger } = Upload;
const { Step } = Steps;

export default function BatchOperationsPage() {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls,.csv',
    beforeUpload: (file: File) => {
      message.success(\`\${file.name} 上传成功\`);
      setCurrentStep(1);
      return false;
    },
  };

  return (
    <PageTemplate title="${title}" breadcrumb={${JSON.stringify(breadcrumb)}}>
      <Card>
        <Steps current={currentStep} className="mb-8">
          <Step title="上传文件" description="上传批量操作文件" />
          <Step title="数据验证" description="验证数据格式" />
          <Step title="执行操作" description="批量执行操作" />
          <Step title="查看结果" description="查看执行结果" />
        </Steps>

        <Alert
          message="批量操作说明"
          description="支持批量创建、更新、删除广告。请下载模板文件，按照模板格式填写数据后上传。"
          type="info"
          showIcon
          className="mb-6"
        />

        <Form form={form} layout="vertical">
          <Form.Item
            label="操作类型"
            name="operationType"
            rules={[{ required: true, message: '请选择操作类型' }]}
          >
            <Select placeholder="请选择操作类型">
              <Option value="create">批量创建</Option>
              <Option value="update">批量更新</Option>
              <Option value="delete">批量删除</Option>
            </Select>
          </Form.Item>

          <Form.Item label="上传文件">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持 Excel (.xlsx, .xls) 和 CSV (.csv) 格式
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" disabled={currentStep === 0}>
                开始执行
              </Button>
              <Button href="/templates/batch-template.xlsx" download>
                下载模板
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageTemplate>
  );
}
`;
  }

  // 标准表格页面
  const imports = hasCharts
    ? `import { Card, Table, Button, Space, DatePicker } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';`
    : `import { Card, Table, Button, Space } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';`;

  const chartData = hasCharts
    ? `
const chartData = [
  { date: '01-15', value: 1200 },
  { date: '01-16', value: 1800 },
  { date: '01-17', value: 1500 },
  { date: '01-18', value: 2200 },
  { date: '01-19', value: 2800 },
  { date: '01-20', value: 3200 },
];`
    : '';

  const chartSection = hasCharts
    ? `
      {/* 数据趋势图表 */}
      <Card title="数据趋势" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
`
    : '';

  return `/**
 * ${title}
 */

${imports}

const columns = ${JSON.stringify(tableColumns, null, 2)};

const dataSource = ${JSON.stringify(mockData, null, 2)};
${chartData}

export default function ${pagePath.split('/')[1]}Page() {
  return (
    <PageTemplate
      title="${title}"
      breadcrumb={${JSON.stringify(breadcrumb)}}
      extra={
        <Space>
          <Button>刷新</Button>
          <Button>导出</Button>
          <Button type="primary">新建</Button>
        </Space>
      }
    >
${chartSection}
      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => \`共 \${total} 条\`,
          }}
        />
      </Card>
    </PageTemplate>
  );
}
`;
}

// 批量生成所有页面
function generateAllPages() {
  let successCount = 0;
  let failCount = 0;

  console.log('🚀 开始批量生成页面内容...\n');

  Object.entries(PAGE_CONFIGS).forEach(([pagePath, config]) => {
    try {
      const filePath = path.join(PAGES_DIR, `${pagePath}.tsx`);
      const content = generatePageContent(pagePath, config);
      
      // 确保目录存在
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${pagePath}.tsx`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${pagePath}.tsx - ${error.message}`);
      failCount++;
    }
  });

  console.log(`\n✨ 页面生成完成！`);
  console.log(`成功: ${successCount} 个`);
  console.log(`失败: ${failCount} 个`);
  console.log(`\n💡 运行 'npm run dev' 查看效果\n`);
}

// 执行生成
generateAllPages();
