import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getAdList,
  getAdDetail,
  createAd,
  updateAd,
  deleteAd,
  batchUpdateAdStatus,
  type AdListParams,
  type Ad,
} from '@/lib/api/ads';

/**
 * 获取广告列表
 */
export function useAdList(params: AdListParams) {
  return useQuery({
    queryKey: ['ads', params],
    queryFn: () => getAdList(params),
    enabled: !!params.advertiser_id,
    staleTime: 3 * 60 * 1000, // 3分钟
  });
}

/**
 * 获取广告详情
 */
export function useAdDetail(adId: number | null) {
  return useQuery({
    queryKey: ['ad', adId],
    queryFn: () => getAdDetail(adId!),
    enabled: !!adId,
  });
}

/**
 * 创建广告
 */
export function useCreateAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      message.success('创建成功');
    },
    onError: (error: any) => {
      message.error(error.message || '创建失败');
    },
  });
}

/**
 * 更新广告
 */
export function useUpdateAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adId, data }: { adId: number; data: Partial<Ad> }) =>
      updateAd(adId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ad', variables.adId] });
      message.success('更新成功');
    },
    onError: (error: any) => {
      message.error(error.message || '更新失败');
    },
  });
}

/**
 * 删除广告
 */
export function useDeleteAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      message.success('删除成功');
    },
    onError: (error: any) => {
      message.error(error.message || '删除失败');
    },
  });
}

/**
 * 批量更新广告状态
 */
export function useBatchUpdateAdStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adIds, status }: { adIds: number[]; status: string }) =>
      batchUpdateAdStatus(adIds, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      message.success('更新成功');
    },
    onError: (error: any) => {
      message.error(error.message || '更新失败');
    },
  });
}
