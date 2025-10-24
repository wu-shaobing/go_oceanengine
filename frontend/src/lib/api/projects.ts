import { apiClient } from './client';

export interface Project {
  project_id: string;
  name: string;
  status: string;
  landing_type?: string;
  advertiser_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectListParams {
  advertiser_id: string;
  page?: number;
  pageSize?: number;
  status?: string;
  keyword?: string;
}

export interface ProjectListResponse {
  data: Project[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 获取项目列表
 */
export async function getProjectList(params: ProjectListParams): Promise<ProjectListResponse> {
  return apiClient.get('/projects', { params });
}

/**
 * 获取项目详情
 */
export async function getProjectDetail(projectId: string): Promise<Project> {
  return apiClient.get(`/projects/${projectId}`);
}

/**
 * 创建项目
 */
export async function createProject(data: Partial<Project>): Promise<Project> {
  return apiClient.post('/projects', data);
}

/**
 * 更新项目
 */
export async function updateProject(projectId: string, data: Partial<Project>): Promise<Project> {
  return apiClient.put(`/projects/${projectId}`, data);
}

/**
 * 删除项目
 */
export async function deleteProject(projectId: string): Promise<void> {
  return apiClient.delete(`/projects/${projectId}`);
}
