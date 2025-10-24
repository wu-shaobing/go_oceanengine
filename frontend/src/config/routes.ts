/**
 * 路由配置
 * 定义所有页面的路由路径和懒加载
 */

import { lazy, ComponentType } from 'react';
import type { ProductId } from './products';

export interface RouteConfig {
  path: string;
  component: ComponentType;
  productId?: ProductId;
  pageId: string;
  title: string;
}

/**
 * 巨量广告路由
 */
export const jlAdRoutes: RouteConfig[] = [
  {
    path: '/ad/overview',
    component: lazy(() => import('../pages/ad/Overview.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-overview',
    title: '概览',
  },
  {
    path: '/ad/project',
    component: lazy(() => import('../pages/ad/Project.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-project',
    title: '项目管理',
  },
  {
    path: '/ad/campaign',
    component: lazy(() => import('../pages/ad/Campaign.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-campaign',
    title: '广告管理',
  },
  {
    path: '/ad/creative-manage',
    component: lazy(() => import('../pages/ad/CreativeManage.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-creative-manage',
    title: '创意管理',
  },
  {
    path: '/ad/report',
    component: lazy(() => import('../pages/ad/Report.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-report',
    title: '报表查询',
  },
  {
    path: '/ad/tools',
    component: lazy(() => import('../pages/ad/Tools.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-tools',
    title: '工具',
  },
  {
    path: '/ad/account',
    component: lazy(() => import('../pages/ad/Account.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-account',
    title: '账户',
  },
  {
    path: '/ad/material-upload',
    component: lazy(() => import('../pages/ad/MaterialUpload.tsx')),
    productId: 'jl-ad',
    pageId: 'material-upload',
    title: '素材上传中心',
  },
  {
    path: '/ad/landing-page',
    component: lazy(() => import('../pages/ad/LandingPage.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-landing-page',
    title: '落地页',
  },
  {
    path: '/ad/creative',
    component: lazy(() => import('../pages/ad/Creative.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-creative',
    title: '创意管理',
  },
  {
    path: '/ad/targeting',
    component: lazy(() => import('../pages/ad/Targeting.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-targeting',
    title: '定向包',
  },
  {
    path: '/ad/audience',
    component: lazy(() => import('../pages/ad/Audience.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-audience',
    title: '人群包',
  },
  {
    path: '/ad/site',
    component: lazy(() => import('../pages/ad/Site.tsx')),
    productId: 'jl-ad',
    pageId: 'ad-site',
    title: '监测链接',
  },
  {
    path: '/ad/negative-keywords',
    component: lazy(() => import('../pages/ad/NegativeWords.tsx')),
    productId: 'jl-ad',
    pageId: 'negative-keywords',
    title: '否定关键词',
  },
  {
    path: '/ad/account-funds',
    component: lazy(() => import('../pages/ad/AccountFunds.tsx')),
    productId: 'jl-ad',
    pageId: 'account-funds',
    title: '账户资金',
  },
  {
    path: '/ad/account-budget',
    component: lazy(() => import('../pages/ad/AccountBudget.tsx')),
    productId: 'jl-ad',
    pageId: 'account-budget',
    title: '预算管理',
  },
  {
    path: '/ad/shared-wallet',
    component: lazy(() => import('../pages/ad/SharedWallet.tsx')),
    productId: 'jl-ad',
    pageId: 'shared-wallet',
    title: '共享钱包',
  },
  {
    path: '/ad/async-report',
    component: lazy(() => import('../pages/ad/AsyncReport.tsx')),
    productId: 'jl-ad',
    pageId: 'async-report',
    title: '异步报表',
  },
  {
    path: '/ad/oauth-manage',
    component: lazy(() => import('../pages/ad/OAuthManage.tsx')),
    productId: 'jl-ad',
    pageId: 'oauth-manage',
    title: 'OAuth授权',
  },
  {
    path: '/ad/security-compliance',
    component: lazy(() => import('../pages/ad/SecurityCompliance.tsx')),
    productId: 'jl-ad',
    pageId: 'security-compliance',
    title: '安全合规',
  },
  {
    path: '/ad/best-practices',
    component: lazy(() => import('../pages/ad/BestPractices.tsx')),
    productId: 'jl-ad',
    pageId: 'best-practices',
    title: '最佳实践',
  },
  {
    path: '/ad/error-codes',
    component: lazy(() => import('../pages/ad/ErrorCodes.tsx')),
    productId: 'jl-ad',
    pageId: 'error-codes',
    title: '错误码文档',
  },
  {
    path: '/ad/service-market',
    component: lazy(() => import('../pages/ad/ServiceMarket.tsx')),
    productId: 'jl-ad',
    pageId: 'service-market',
    title: '服务市场',
  },
];

/**
 * 巨量千川路由
 */
export const qianchuanRoutes: RouteConfig[] = [
  {
    path: '/qc/overview',
    component: lazy(() => import('../pages/qianchuan/Overview.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-overview',
    title: '概览',
  },
  {
    path: '/qc/plan',
    component: lazy(() => import('../pages/qianchuan/Plan.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-plan',
    title: '推广计划',
  },
  {
    path: '/qc/product-promo',
    component: lazy(() => import('../pages/qianchuan/ProductPromo.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-product-promo',
    title: '商品推广',
  },
  {
    path: '/qc/live-promo',
    component: lazy(() => import('../pages/qianchuan/LivePromo.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-live-promo',
    title: '直播间推广',
  },
  {
    path: '/qc/report',
    component: lazy(() => import('../pages/qianchuan/Report.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-report',
    title: '报表',
  },
  {
    path: '/qc/account',
    component: lazy(() => import('../pages/qianchuan/Account.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-account',
    title: '账户',
  },
  {
    path: '/qc/product',
    component: lazy(() => import('../pages/qianchuan/Product.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-product',
    title: '商品管理',
  },
  {
    path: '/qc/live',
    component: lazy(() => import('../pages/qianchuan/Live.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-live',
    title: '直播间管理',
  },
  {
    path: '/qc/aweme',
    component: lazy(() => import('../pages/qianchuan/AwemeAuth.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-aweme',
    title: '抖音号管理',
  },
  {
    path: '/qc/order',
    component: lazy(() => import('../pages/qianchuan/Order.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-order',
    title: '订单管理',
  },
  {
    path: '/qc/roi-goal',
    component: lazy(() => import('../pages/qianchuan/ROIGoal.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-roi-goal',
    title: 'ROI目标',
  },
  // SDK配置
  {
    path: '/qc/sdk-config',
    component: lazy(() => import('../pages/qianchuan/SDKConfig.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-sdk-config',
    title: 'SDK配置与认证',
  },
  {
    path: '/qc/api-debugger',
    component: lazy(() => import('../pages/qianchuan/ApiDebugger.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-api-debugger',
    title: 'API调试器',
  },
  // 电商资产
  {
    path: '/qc/shop',
    component: lazy(() => import('../pages/qianchuan/Shop.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-shop',
    title: '店铺设置',
  },
  {
    path: '/qc/material',
    component: lazy(() => import('../pages/qianchuan/Material.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-material',
    title: '素材中心',
  },
  {
    path: '/qc/creative',
    component: lazy(() => import('../pages/qianchuan/Creative.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-creative',
    title: '创意素材',
  },
  {
    path: '/qc/audience',
    component: lazy(() => import('../pages/qianchuan/Audience.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-audience',
    title: '人群包',
  },
  // 达人管理
  {
    path: '/qc/kol',
    component: lazy(() => import('../pages/qianchuan/KOL.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-kol',
    title: '达人列表',
  },
  {
    path: '/qc/kol-cooperation',
    component: lazy(() => import('../pages/qianchuan/KOLCooperation.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-kol-cooperation',
    title: '合作记录',
  },
  {
    path: '/qc/commission',
    component: lazy(() => import('../pages/qianchuan/Commission.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-commission',
    title: '佣金管理',
  },
  // 账户管理
  {
    path: '/qc/account-funds',
    component: lazy(() => import('../pages/qianchuan/AccountFunds.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-account-funds',
    title: '账户资金',
  },
  {
    path: '/qc/account-budget',
    component: lazy(() => import('../pages/qianchuan/AccountBudget.tsx')),
    productId: 'qianchuan',
    pageId: 'qc-account-budget',
    title: '预算管理',
  },
];

/**
 * 抖+ 路由
 */
export const douplusRoutes: RouteConfig[] = [
  {
    path: '/dp/overview',
    component: lazy(() => import('../pages/douplus/Overview.tsx')),
    productId: 'douplus',
    pageId: 'dp-overview',
    title: '概览',
  },
  {
    path: '/dp/video-promo',
    component: lazy(() => import('../pages/douplus/VideoPromo.tsx')),
    productId: 'douplus',
    pageId: 'dp-video-promo',
    title: '视频加热',
  },
  {
    path: '/dp/live-promo',
    component: lazy(() => import('../pages/douplus/LivePromo.tsx')),
    productId: 'douplus',
    pageId: 'dp-live-promo',
    title: '直播加热',
  },
  {
    path: '/dp/order-list',
    component: lazy(() => import('../pages/douplus/OrderList.tsx')),
    productId: 'douplus',
    pageId: 'dp-order-list',
    title: '订单列表',
  },
  {
    path: '/dp/data',
    component: lazy(() => import('../pages/douplus/Data.tsx')),
    productId: 'douplus',
    pageId: 'dp-data',
    title: '数据中心',
  },
  // 快捷工具
  {
    path: '/dp/quick-boost',
    component: lazy(() => import('../pages/douplus/QuickBoost.tsx')),
    productId: 'douplus',
    pageId: 'dp-quick-boost',
    title: '快速加热',
  },
  {
    path: '/dp/api-tools',
    component: lazy(() => import('../pages/douplus/ApiTools.tsx')),
    productId: 'douplus',
    pageId: 'dp-api-tools',
    title: 'API工具',
  },
  // 内容管理
  {
    path: '/dp/video',
    component: lazy(() => import('../pages/douplus/Video.tsx')),
    productId: 'douplus',
    pageId: 'dp-video',
    title: '视频管理',
  },
  {
    path: '/dp/live',
    component: lazy(() => import('../pages/douplus/Live.tsx')),
    productId: 'douplus',
    pageId: 'dp-live',
    title: '直播管理',
  },
  // 订单中心
  {
    path: '/dp/order',
    component: lazy(() => import('../pages/douplus/OrderList.tsx')),
    productId: 'douplus',
    pageId: 'dp-order',
    title: '订单列表',
  },
  {
    path: '/dp/order-detail',
    component: lazy(() => import('../pages/douplus/OrderDetail.tsx')),
    productId: 'douplus',
    pageId: 'dp-order-detail',
    title: '订单详情',
  },
];

/**
 * SDK 路由
 */
export const sdkRoutes: RouteConfig[] = [
  {
    path: '/sdk/quickstart',
    component: lazy(() => import('../pages/sdk/Quickstart.tsx')),
    pageId: 'sdk-quickstart',
    title: 'SDK快速开始',
  },
  {
    path: '/sdk/config',
    component: lazy(() => import('../pages/sdk/Config.tsx')),
    pageId: 'sdk-config',
    title: 'SDK配置与认证',
  },
  {
    path: '/sdk/api-list',
    component: lazy(() => import('../pages/sdk/ApiList.tsx')),
    pageId: 'api-list',
    title: 'API接口列表',
  },
  {
    path: '/sdk/api-debugger',
    component: lazy(() => import('../pages/sdk/ApiDebugger.tsx')),
    pageId: 'api-debugger',
    title: 'API调试器',
  },
  {
    path: '/sdk/batch-operations',
    component: lazy(() => import('../pages/sdk/BatchOperations.tsx')),
    pageId: 'batch-operations',
    title: '批量操作',
  },
];

/**
 * 所有路由
 */
export const allRoutes: RouteConfig[] = [
  ...jlAdRoutes,
  ...qianchuanRoutes,
  ...douplusRoutes,
  ...sdkRoutes,
];

/**
 * 默认路由（首页）
 */
export const defaultRoute = '/ad/overview';

/**
 * 根据 pageId 获取路由路径
 */
export function getRouteByPageId(pageId: string): string | undefined {
  const route = allRoutes.find((r) => r.pageId === pageId);
  return route?.path;
}

/**
 * 根据路径获取路由配置
 */
export function getRouteByPath(path: string): RouteConfig | undefined {
  return allRoutes.find((r) => r.path === path);
}
