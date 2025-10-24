/**
 * 巨量引擎 API 类型定义
 * 参考文档: https://open.oceanengine.com/doc/
 */

// ==================== 通用类型 ====================

/**
 * 巨量引擎API通用响应格式
 */
export interface OceanEngineResponse<T = unknown> {
  code: number // 0表示成功
  message: string
  data?: T
  request_id?: string
}

/**
 * 分页信息
 */
export interface PageInfo {
  total_number: number
  total_page?: number
  page?: number
  page_size?: number
}

// ==================== 项目相关 ====================

/**
 * 项目信息
 */
export interface Project {
  project_id: string
  name: string
  status: string
  landing_type?: string
  operation?: string
}

/**
 * 获取项目列表 - 请求参数
 */
export interface ProjectListReq {
  advertiser_id: number
  fields?: string[]
  page?: number
  page_size?: number
  filtering?: {
    status?: string
    landing_type?: string
  }
}

/**
 * 获取项目列表 - 响应数据
 */
export interface ProjectListData {
  list: Project[]
  page_info?: PageInfo
}

/**
 * 获取项目列表 - 完整响应
 */
export type ProjectListResp = OceanEngineResponse<ProjectListData>

// ==================== 广告相关 ====================

/**
 * 广告计划信息
 */
export interface Ad {
  id: number
  name: string
  status: string
  budget: number
  landing_type: string
  operation?: string
}

/**
 * 广告状态枚举
 */
export enum AdStatus {
  DELIVERY_OK = 'AD_STATUS_DELIVERY_OK', // 投放中
  NOT_DELETE = 'AD_STATUS_NOT_DELETE', // 已暂停
  AUDIT = 'AD_STATUS_AUDIT', // 审核中
  DISABLED = 'AD_STATUS_DISABLED', // 已禁用
}

/**
 * 获取广告列表 - 请求参数
 */
export interface AdListReq {
  advertiser_id: number
  page?: number
  page_size?: number
  filtering?: {
    status?: string
    campaign_id?: string
  }
}

/**
 * 获取广告列表 - 响应数据
 */
export interface AdListData {
  list: Ad[]
  page_info: PageInfo
}

/**
 * 获取广告列表 - 完整响应
 */
export type AdListResp = OceanEngineResponse<AdListData>

// ==================== 报表相关 ====================

/**
 * 报表数据
 */
export interface ReportData {
  date: string // 日期 YYYY-MM-DD
  stat_time?: string // 统计时间（可选）
  cost: number // 消耗金额
  show: number // 展示数
  click: number // 点击数
  convert: number // 转化数
  ctr?: number // 点击率（可选）
  cpm?: number // 千次展示成本（可选）
}

/**
 * 获取数据报表 - 请求参数
 */
export interface ReportReq {
  advertiser_id: number
  start_date: string // YYYY-MM-DD
  end_date: string // YYYY-MM-DD
  group_by?: string[] // 分组维度，如 ['stat_time']
  filtering?: {
    campaign_id?: string
    ad_id?: string
  }
}

/**
 * 获取数据报表 - 响应数据
 */
export interface ReportListData {
  list: ReportData[]
  page_info?: PageInfo
}

/**
 * 获取数据报表 - 完整响应
 */
export type ReportResp = OceanEngineResponse<ReportListData>

// ==================== 创意相关（待实现）====================

/**
 * 创意信息
 */
export interface Creative {
  creative_id: string
  name: string
  status: string
  image_url?: string
  video_url?: string
}

/**
 * 获取创意列表 - 请求参数
 */
export interface CreativeListReq {
  advertiser_id: number
  page?: number
  page_size?: number
}

// ==================== 账户相关（待实现）====================

/**
 * 账户余额信息
 */
export interface AccountBalance {
  advertiser_id: number
  balance: number // 余额（单位：分）
  cash: number // 现金（单位：分）
  grant: number // 赠款（单位：分）
}

/**
 * 获取账户余额 - 请求参数
 */
export interface AccountBalanceReq {
  advertiser_ids: number[]
}
