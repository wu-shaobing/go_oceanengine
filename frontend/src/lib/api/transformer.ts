/**
 * API响应数据转换器
 * 统一处理不同格式的API响应，转换为前端期望的格式
 */

export interface StandardPaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 转换分页响应数据
 * 支持多种后端返回格式：
 * 1. { data: { list: [], page_info: {...} } }  - 项目API格式
 * 2. { data: { data: [], total, page, pageSize } } - 广告API格式
 * 3. 直接返回数组 [] - 简单格式
 */
export function transformPaginatedResponse<T>(response: any): StandardPaginatedResponse<T> {
  // 如果response本身就是标准格式
  if (response && response.list && typeof response.total === 'number') {
    return {
      list: response.list,
      total: response.total,
      page: Number(response.page) || 1,
      pageSize: Number(response.pageSize) || 20,
    };
  }
  
  // 处理嵌套data的情况
  const data = response?.data || response;
  
  // 格式1: { list: [], page_info: {...} }
  if (data?.list && data?.page_info) {
    return {
      list: data.list,
      total: data.page_info.total_number || 0,
      page: Number(data.page_info.page) || 1,
      pageSize: Number(data.page_info.page_size) || 20,
    };
  }
  
  // 格式2: { data: [], total, page, pageSize }
  if (data?.data && Array.isArray(data.data)) {
    return {
      list: data.data,
      total: data.total || 0,
      page: Number(data.page) || 1,
      pageSize: Number(data.pageSize) || 20,
    };
  }
  
  // 格式3: 直接是数组
  if (Array.isArray(data)) {
    return {
      list: data,
      total: data.length,
      page: 1,
      pageSize: data.length,
    };
  }
  
  // 默认返回空数组
  return {
    list: [],
    total: 0,
    page: 1,
    pageSize: 20,
  };
}

/**
 * 转换报表响应数据
 * 处理报表特有的格式
 */
export function transformReportResponse<T>(response: any): {
  data: T[];
  summary: any;
} {
  const rawData = response?.data || response;
  
  return {
    data: rawData?.data || rawData || [],
    summary: rawData?.summary || {},
  };
}

/**
 * 安全地获取嵌套属性值
 */
export function safeGet<T = any>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return result === undefined ? (defaultValue as T) : result;
}

/**
 * 转换数字类型（处理字符串数字）
 */
export function toNumber(value: any, defaultValue: number = 0): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }
  return defaultValue;
}
