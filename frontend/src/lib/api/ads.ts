import { apiClient } from './client';

export interface Ad {
  id: number;
  name: string;
  status: string;
  budget: number;
  landing_type: string;
  advertiser_id: string;
  project_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdListParams {
  advertiser_id: string;
  page?: number;
  pageSize?: number;
  status?: string;
  keyword?: string;
  project_id?: string;
}

export interface AdListResponse {
  data: Ad[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 获取广告列表
 */
export async function getAdList(params: AdListParams): Promise<AdListResponse> {
  return apiClient.get('/ads', { params });
}

/**
 * 获取广告详情
 */
export async function getAdDetail(adId: number): Promise<Ad> {
  return apiClient.get(`/ads/${adId}`);
}

/**
 * 创建广告
 */
export async function createAd(data: Partial<Ad>): Promise<Ad> {
  return apiClient.post('/ads', data);
}

/**
 * 更新广告
 */
export async function updateAd(adId: number, data: Partial<Ad>): Promise<Ad> {
  return apiClient.put(`/ads/${adId}`, data);
}

/**
 * 删除广告
 */
export async function deleteAd(adId: number): Promise<void> {
  return apiClient.delete(`/ads/${adId}`);
}

/**
 * 批量更新广告状态
 */
export async function batchUpdateAdStatus(adIds: number[], status: string): Promise<void> {
  return apiClient.post('/ads/batch-status', { adIds, status });
}
