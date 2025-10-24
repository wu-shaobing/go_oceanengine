/**
 * 商品链接数据模型
 */
export interface ShopLink {
  id: string;
  name: string;                    // 商品链接组名称
  productId: string;               // 商品ID
  platform: ShopLinkPlatform;      // 电商平台
  landingPageUrl: string;          // 落地页链接
  deeplink?: string;               // Deeplink直达链接
  validTouchLink?: string;         // 有效触点链接
  displayTrackLink?: string;       // 展示检测链接
  mediaAccount: string;            // 媒体账户
  creator: string;                 // 创建人
  createdAt: string;               // 创建时间
  relatedPlanCount: number;        // 关联计划数
  status: ShopLinkStatus;          // 状态
}

/**
 * 电商平台枚举
 */
export enum ShopLinkPlatform {
  TAOBAO = 'taobao',
  JD = 'jd',
  PINDUODUO = 'pinduoduo',
  DOUYIN = 'douyin',
}

/**
 * 商品链接状态
 */
export enum ShopLinkStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SYNCING = 'syncing',
}

/**
 * 筛选条件
 */
export interface ShopLinkFilters {
  platform?: ShopLinkPlatform | 'all';
  status?: ShopLinkStatus | 'all';
  mediaAccount?: string | 'all';
  keyword?: string;
  category?: string;
}

/**
 * 列表查询参数
 */
export interface ShopLinkListParams extends ShopLinkFilters {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 列表响应数据
 */
export interface ShopLinkListResponse {
  list: ShopLink[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 创建/更新商品链接数据
 */
export interface CreateShopLinkData {
  name: string;
  productId: string;
  platform: ShopLinkPlatform;
  landingPageUrl: string;
  deeplink?: string;
  validTouchLink?: string;
  displayTrackLink?: string;
  mediaAccount: string;
}
