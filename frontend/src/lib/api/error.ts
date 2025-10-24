/**
 * 统一的API错误类
 */
export class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  isNetworkError(): boolean {
    return this.code === 0;
  }

  isAuthError(): boolean {
    return this.code === 401 || this.code === 403;
  }

  isServerError(): boolean {
    return this.code >= 500;
  }

  isClientError(): boolean {
    return this.code >= 400 && this.code < 500;
  }
}
