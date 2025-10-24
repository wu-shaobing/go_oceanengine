import { apiClient } from './client';

export interface ReportMetrics {
  cost: number;
  show: number;
  click: number;
  ctr: number;
  conversion: number;
  cpc: number;
  cpm: number;
}

export interface ReportData extends ReportMetrics {
  date: string;
  project_id?: string;
  ad_id?: number;
}

export interface ReportParams {
  advertiser_id: string;
  start_date: string;
  end_date: string;
  dimension?: 'date' | 'project' | 'ad';
  project_ids?: string[];
  ad_ids?: number[];
}

export interface ReportResponse {
  data: ReportData[];
  summary: ReportMetrics;
}

/**
 * 获取报表数据
 */
export async function getReport(params: ReportParams): Promise<ReportResponse> {
  return apiClient.get('/report', { params });
}

/**
 * 导出报表
 */
export async function exportReport(params: ReportParams): Promise<Blob> {
  return apiClient.get('/report/export', { 
    params,
    responseType: 'blob' 
  });
}

/**
 * 获取实时数据
 */
export async function getRealtimeData(advertiserId: string): Promise<ReportMetrics> {
  return apiClient.get('/report/realtime', { params: { advertiser_id: advertiserId } });
}
