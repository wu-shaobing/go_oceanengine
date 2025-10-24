import { apiClient } from './client';

// 通用资产接口
export interface Asset {
  id: string;
  name: string;
  status?: string;
  advertiser_id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface AssetListParams {
  advertiser_id: string;
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
}

export interface AssetListResponse<T = Asset> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 通用资产API工厂函数
 */
function createAssetAPI<T extends Asset = Asset>(basePath: string) {
  return {
    /**
     * 获取列表
     */
    getList: async (params: AssetListParams): Promise<AssetListResponse<T>> => {
      return apiClient.get(basePath, { params });
    },

    /**
     * 获取详情
     */
    getDetail: async (id: string): Promise<T> => {
      return apiClient.get(`${basePath}/${id}`);
    },

    /**
     * 创建
     */
    create: async (data: Partial<T>): Promise<T> => {
      return apiClient.post(basePath, data);
    },

    /**
     * 更新
     */
    update: async (id: string, data: Partial<T>): Promise<T> => {
      return apiClient.put(`${basePath}/${id}`, data);
    },

    /**
     * 删除
     */
    delete: async (id: string): Promise<void> => {
      return apiClient.delete(`${basePath}/${id}`);
    },

    /**
     * 同步
     */
    sync: async (advertiserId: string): Promise<{ task_id: string }> => {
      return apiClient.post(`${basePath}/sync`, { advertiser_id: advertiserId });
    },

    /**
     * 批量导入
     */
    import: async (file: File, advertiserId: string): Promise<void> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('advertiser_id', advertiserId);
      return apiClient.post(`${basePath}/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },

    /**
     * 导出
     */
    export: async (params: AssetListParams): Promise<Blob> => {
      return apiClient.get(`${basePath}/export`, {
        params,
        responseType: 'blob',
      });
    },
  };
}

// 商品链接API
export const shopLinkAPI = createAssetAPI('/property/shop-links');

// 定向包API
export const audienceAPI = createAssetAPI('/property/audiences');

// 文案库API
export const titleLibraryAPI = createAssetAPI('/property/titles');

// 落地页API
export const landingPageAPI = createAssetAPI('/property/landing-pages');

// 资产分类API
export const assetCategoryAPI = createAssetAPI('/property/categories');

// 直达链接API
export const openUrlAPI = createAssetAPI('/property/open-urls');

// 监测活动API
export const activityAPI = createAssetAPI('/property/activities');

// 人群包API
export const audiencePackageAPI = createAssetAPI('/property/dmp-packages');

// 事件管理API
export const eventManagementAPI = createAssetAPI('/property/events');
