/**
 * 产品线配置
 * 包含巨量广告、巨量千川、抖+ 三大产品线的完整导航结构
 */

export type ProductId = 'jl-ad' | 'qianchuan' | 'douplus';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  page?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
  color?: string;
}

export interface NavItem {
  id: string;
  label: string;
  page: string;
}

export interface Product {
  id: ProductId;
  name: string;
  color: string;
  navItems: NavItem[];
  sidebarSections: MenuSection[];
}

/**
 * 产品线配置
 */
export const PRODUCTS: Record<ProductId, Product> = {
  'jl-ad': {
    id: 'jl-ad',
    name: '巨量广告',
    color: '#1e6eff',
    navItems: [
      { id: 'ad-overview', label: '概览', page: 'ad-overview' },
      { id: 'ad-project', label: '项目管理', page: 'ad-project' },
      { id: 'ad-campaign', label: '广告管理', page: 'ad-campaign' },
      { id: 'ad-creative-manage', label: '创意管理', page: 'ad-creative-manage' },
      { id: 'ad-report', label: '报表', page: 'ad-report' },
      { id: 'ad-tools', label: '工具', page: 'ad-tools' },
      { id: 'ad-account', label: '账户', page: 'ad-account' },
    ],
    sidebarSections: [
      {
        id: 'sdk',
        title: 'SDK配置',
        icon: '⚙️',
        color: '#1e6eff',
        items: [
          { id: 'sdk-quickstart', label: 'SDK快速开始', page: 'sdk-quickstart' },
          { id: 'sdk-config', label: 'SDK配置与认证', page: 'sdk-config' },
          { id: 'api-list', label: 'API接口列表', page: 'api-list' },
          { id: 'api-debugger', label: 'API调试器', page: 'api-debugger' },
          { id: 'batch-operations', label: '批量操作', page: 'batch-operations' },
        ],
      },
      {
        id: 'project-ad',
        title: '项目广告',
        icon: '📋',
        color: '#1e6eff',
        items: [
          { id: 'ad-project', label: '项目管理', page: 'ad-project' },
          { id: 'ad-campaign', label: '广告管理', page: 'ad-campaign' },
          { id: 'ad-creative-manage', label: '创意管理', page: 'ad-creative-manage' },
          { id: 'ad-report', label: '报表查询', page: 'ad-report' },
        ],
      },
      {
        id: 'asset',
        title: '资产管理',
        icon: '💼',
        color: '#1e6eff',
        items: [
          { id: 'material-upload', label: '素材上传中心', page: 'material-upload' },
          { id: 'ad-landing-page', label: '落地页', page: 'ad-landing-page' },
          { id: 'ad-creative', label: '创意管理', page: 'ad-creative' },
          { id: 'ad-targeting', label: '定向包', page: 'ad-targeting' },
          { id: 'ad-audience', label: '人群包', page: 'ad-audience' },
          { id: 'ad-site', label: '监测链接', page: 'ad-site' },
          { id: 'negative-keywords', label: '否定关键词', page: 'negative-keywords' },
        ],
      },
      {
        id: 'account',
        title: '账户管理',
        icon: '👤',
        color: '#1e6eff',
        items: [
          { id: 'account-funds', label: '账户资金', page: 'account-funds' },
          { id: 'account-budget', label: '预算管理', page: 'account-budget' },
          { id: 'shared-wallet', label: '共享钱包', page: 'shared-wallet' },
        ],
      },
      {
        id: 'advanced',
        title: '高级功能',
        icon: '🔧',
        color: '#1e6eff',
        items: [
          { id: 'async-report', label: '异步报表', page: 'async-report' },
          { id: 'oauth-manage', label: 'OAuth授权', page: 'oauth-manage' },
          { id: 'security-compliance', label: '安全合规', page: 'security-compliance' },
          { id: 'best-practices', label: '最佳实践', page: 'best-practices' },
          { id: 'error-codes', label: '错误码文档', page: 'error-codes' },
          { id: 'service-market', label: '服务市场', page: 'service-market' },
        ],
      },
    ],
  },

  qianchuan: {
    id: 'qianchuan',
    name: '巨量千川',
    color: '#ff6b00',
    navItems: [
      { id: 'qc-overview', label: '概览', page: 'qc-overview' },
      { id: 'qc-plan', label: '推广计划', page: 'qc-plan' },
      { id: 'qc-product-promo', label: '商品推广', page: 'qc-product-promo' },
      { id: 'qc-live-promo', label: '直播间推广', page: 'qc-live-promo' },
      { id: 'qc-report', label: '报表', page: 'qc-report' },
      { id: 'qc-material', label: '素材', page: 'qc-material' },
      { id: 'qc-account', label: '账户', page: 'qc-account' },
    ],
    sidebarSections: [
      {
        id: 'qc-sdk',
        title: 'SDK配置',
        icon: '⚙️',
        color: '#ff6b00',
        items: [
          { id: 'qc-sdk-config', label: 'SDK配置与认证', page: 'qc-sdk-config' },
          { id: 'qc-api-debugger', label: 'API调试器', page: 'qc-api-debugger' },
        ],
      },
      {
        id: 'qc-ecom',
        title: '电商资产',
        icon: '🛒',
        color: '#ff6b00',
        items: [
          { id: 'qc-product', label: '商品管理', page: 'qc-product' },
          { id: 'qc-live', label: '直播间管理', page: 'qc-live' },
          { id: 'qc-aweme', label: '抖音号管理', page: 'qc-aweme' },
          { id: 'qc-shop', label: '店铺设置', page: 'qc-shop' },
          { id: 'qc-material', label: '素材中心', page: 'qc-material' },
          { id: 'qc-creative', label: '创意素材', page: 'qc-creative' },
          { id: 'qc-audience', label: '人群包', page: 'qc-audience' },
        ],
      },
      {
        id: 'qc-kol',
        title: '达人管理',
        icon: '⭐',
        color: '#ff6b00',
        items: [
          { id: 'qc-kol', label: '达人列表', page: 'qc-kol' },
          { id: 'qc-kol-cooperation', label: '合作记录', page: 'qc-kol-cooperation' },
          { id: 'qc-commission', label: '佣金管理', page: 'qc-commission' },
        ],
      },
      {
        id: 'qc-account',
        title: '账户管理',
        icon: '👤',
        color: '#ff6b00',
        items: [
          { id: 'qc-account-funds', label: '账户资金', page: 'qc-account-funds' },
          { id: 'qc-account-budget', label: '预算管理', page: 'qc-account-budget' },
        ],
      },
    ],
  },

  douplus: {
    id: 'douplus',
    name: '抖+',
    color: '#00d4ff',
    navItems: [
      { id: 'dp-overview', label: '概览', page: 'dp-overview' },
      { id: 'dp-video-promo', label: '视频加热', page: 'dp-video-promo' },
      { id: 'dp-live-promo', label: '直播加热', page: 'dp-live-promo' },
      { id: 'dp-order-list', label: '订单列表', page: 'dp-order-list' },
      { id: 'dp-data', label: '数据中心', page: 'dp-data' },
    ],
    sidebarSections: [
      {
        id: 'dp-tools',
        title: '快捷工具',
        icon: '🚀',
        color: '#00d4ff',
        items: [
          { id: 'dp-quick-boost', label: '快速加热', page: 'dp-quick-boost' },
          { id: 'dp-api-tools', label: 'API工具', page: 'dp-api-tools' },
        ],
      },
      {
        id: 'dp-content',
        title: '内容管理',
        icon: '📹',
        color: '#00d4ff',
        items: [
          { id: 'dp-video', label: '视频管理', page: 'dp-video' },
          { id: 'dp-live', label: '直播管理', page: 'dp-live' },
        ],
      },
      {
        id: 'dp-order',
        title: '订单中心',
        icon: '📦',
        color: '#00d4ff',
        items: [
          { id: 'dp-order', label: '订单列表', page: 'dp-order' },
          { id: 'dp-order-detail', label: '订单详情', page: 'dp-order-detail' },
        ],
      },
    ],
  },
};

/**
 * 页面名称映射
 */
export const PAGE_NAMES: Record<string, string> = {
  // 巨量广告
  'ad-overview': '概览',
  'ad-project': '项目管理',
  'ad-campaign': '广告管理',
  'ad-creative-manage': '创意管理',
  'ad-report': '报表查询',
  'ad-tools': '工具',
  'ad-account': '账户',
  'ad-landing-page': '落地页',
  'ad-creative': '创意管理',
  'ad-targeting': '定向包',
  'ad-audience': '人群包',
  'ad-site': '监测链接',
  'negative-keywords': '否定关键词',

  // SDK相关
  'sdk-config': 'SDK配置与认证',
  'sdk-quickstart': 'SDK快速开始',
  'api-list': 'API接口列表',
  'api-debugger': 'API调试器',
  'batch-operations': '批量操作',
  'material-upload': '素材上传中心',

  // 账户管理
  'account-funds': '账户资金',
  'account-budget': '预算管理',
  'shared-wallet': '共享钱包',

  // 高级功能
  'async-report': '异步报表',
  'oauth-manage': 'OAuth授权',
  'security-compliance': '安全合规',
  'service-market': '服务市场',
  'best-practices': '最佳实践',
  'error-codes': '错误码文档',

  // 巨量千川
  'qc-overview': '概览',
  'qc-plan': '推广计划',
  'qc-product-promo': '商品推广',
  'qc-live-promo': '直播间推广',
  'qc-report': '报表',
  'qc-material': '素材',
  'qc-account': '账户',
  'qc-product': '商品管理',
  'qc-live': '直播间管理',
  'qc-aweme': '抖音号管理',
  'qc-shop': '店铺设置',
  'qc-creative': '创意素材',
  'qc-audience': '人群包',
  'qc-sdk-config': 'SDK配置',
  'qc-api-debugger': 'API调试器',
  'qc-kol': '达人列表',
  'qc-kol-cooperation': '合作记录',
  'qc-commission': '佣金管理',
  'qc-account-funds': '账户资金',
  'qc-account-budget': '预算管理',

  // 抖+
  'dp-overview': '概览',
  'dp-video-promo': '视频加热',
  'dp-live-promo': '直播加热',
  'dp-order-list': '订单列表',
  'dp-data': '数据中心',
  'dp-video': '视频管理',
  'dp-live': '直播管理',
  'dp-order': '订单管理',
  'dp-order-detail': '订单详情',
  'dp-quick-boost': '快速加热',
  'dp-api-tools': 'API工具',
};
