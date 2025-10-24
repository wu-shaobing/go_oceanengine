import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getProjectList,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
  type ProjectListParams,
  type Project,
} from '@/lib/api/projects';

/**
 * 获取项目列表
 */
export function useProjectList(params: ProjectListParams) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => getProjectList(params),
    enabled: !!params.advertiser_id,
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

/**
 * 获取项目详情
 */
export function useProjectDetail(projectId: string | null) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectDetail(projectId!),
    enabled: !!projectId,
  });
}

/**
 * 创建项目
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      message.success('创建成功');
    },
    onError: (error: any) => {
      message.error(error.message || '创建失败');
    },
  });
}

/**
 * 更新项目
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: Partial<Project> }) =>
      updateProject(projectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      message.success('更新成功');
    },
    onError: (error: any) => {
      message.error(error.message || '更新失败');
    },
  });
}

/**
 * 删除项目
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      message.success('删除成功');
    },
    onError: (error: any) => {
      message.error(error.message || '删除失败');
    },
  });
}
