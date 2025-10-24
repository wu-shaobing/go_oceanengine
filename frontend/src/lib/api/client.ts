import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from './error';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证token
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // 添加请求ID
        config.headers['X-Request-ID'] = this.generateRequestId();
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data;
        
        // 巨量引擎API响应格式: { code: 0, message: "", data: {...}, request_id: "" }
        if (typeof data === 'object' && data !== null && 'code' in data) {
          // 检查业务错误码
          if (data.code !== 0) {
            throw new ApiError(
              data.code,
              data.message || '请求失败',
              data.request_id
            );
          }
          // 返回完整的response.data，让各个API模块自己处理
          // 这样可以兼容不同的数据格式
          return response.data;
        }
        
        // 兼容其他格式的响应
        return data;
      },
      (error) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: any): never {
    if (!error.response) {
      // 网络错误
      throw new ApiError(0, '网络连接失败,请检查网络设置');
    }

    const { status, data } = error.response;

    // 特殊状态码处理
    switch (status) {
      case 401:
        // 未授权,清除token并跳转登录
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        throw new ApiError(401, '登录已过期,请重新登录');
      
      case 403:
        throw new ApiError(403, '权限不足,无法访问');
      
      case 404:
        throw new ApiError(404, '请求的资源不存在');
      
      case 429: {
        const retryAfter = error.response.headers['retry-after'] || 60;
        throw new ApiError(429, `请求过于频繁,请${retryAfter}秒后重试`);
      }
      
      case 500:
      case 502:
      case 503:
        throw new ApiError(status, '服务暂时不可用,请稍后重试');
      
      default:
        // 使用后端返回的错误消息
        throw new ApiError(
          data.code || status,
          data.message || '操作失败,请重试'
        );
    }
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

export const apiClient = new ApiClient();
