import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import type { AssetListParams, Asset } from '@/lib/api/property';

/**
 * 通用资产hooks工厂函数
 */
export function createAssetHooks<T extends Asset = Asset>(
  resourceName: string,
  api: {
    getList: (params: AssetListParams) => Promise<any>;
    getDetail: (id: string) => Promise<T>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: string, data: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<void>;
    sync: (advertiserId: string) => Promise<{ task_id: string }>;
  }
) {
  /**
   * 获取列表
   */
  const useList = (params: AssetListParams) => {
    return useQuery({
      queryKey: [resourceName, params],
      queryFn: () => api.getList(params),
      enabled: !!params.advertiser_id,
      staleTime: 5 * 60 * 1000, // 5分钟
    });
  };

  /**
   * 获取详情
   */
  const useDetail = (id: string | null) => {
    return useQuery({
      queryKey: [resourceName, id],
      queryFn: () => api.getDetail(id!),
      enabled: !!id,
    });
  };

  /**
   * 创建
   */
  const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceName] });
        message.success('创建成功');
      },
      onError: (error: any) => {
        message.error(error.message || '创建失败');
      },
    });
  };

  /**
   * 更新
   */
  const useUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
        api.update(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [resourceName] });
        queryClient.invalidateQueries({ queryKey: [resourceName, variables.id] });
        message.success('更新成功');
      },
      onError: (error: any) => {
        message.error(error.message || '更新失败');
      },
    });
  };

  /**
   * 删除
   */
  const useDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: api.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceName] });
        message.success('删除成功');
      },
      onError: (error: any) => {
        message.error(error.message || '删除失败');
      },
    });
  };

  /**
   * 同步
   */
  const useSync = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: api.sync,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceName] });
        message.success('同步任务已启动');
      },
      onError: (error: any) => {
        message.error(error.message || '同步失败');
      },
    });
  };

  return {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
    useSync,
  };
}
