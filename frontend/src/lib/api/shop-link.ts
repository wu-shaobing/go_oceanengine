import { apiClient } from './client';
import type {
  ShopLink,
  ShopLinkListParams,
  ShopLinkListResponse,
  CreateShopLinkData,
} from '@/types/models/shop-link';

export const shopLinkApi = {
  /**
   * 获取商品链接列表
   */
  list: async (params: ShopLinkListParams): Promise<ShopLinkListResponse> => {
    const response = await apiClient.get('/property/shop-links', { params });
    return response;
  },

  /**
   * 获取单个商品链接详情
   */
  get: async (id: string): Promise<ShopLink> => {
    const response = await apiClient.get(`/property/shop-links/${id}`);
    return response;
  },

  /**
   * 创建商品链接
   */
  create: async (data: CreateShopLinkData): Promise<ShopLink> => {
    const response = await apiClient.post('/property/shop-links', data);
    return response;
  },

  /**
   * 更新商品链接
   */
  update: async (id: string, data: Partial<CreateShopLinkData>): Promise<ShopLink> => {
    const response = await apiClient.put(`/property/shop-links/${id}`, data);
    return response;
  },

  /**
   * 删除商品链接
   */
  delete: async (ids: string[]): Promise<void> => {
    await apiClient.delete('/property/shop-links', { data: { ids } });
  },

  /**
   * 同步商品链接
   */
  sync: async (): Promise<{ syncedCount: number }> => {
    const response = await apiClient.post('/property/shop-links/sync');
    return response;
  },

  /**
   * 批量导入
   */
  import: async (file: File): Promise<{ importedCount: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/property/shop-links/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  },

  /**
   * 导出数据
   */
  export: async (params: ShopLinkListParams): Promise<Blob> => {
    const response = await apiClient.get('/property/shop-links/export', {
      params,
      responseType: 'blob',
    });
    return response;
  },
};
