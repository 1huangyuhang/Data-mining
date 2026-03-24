import { axiosInstance } from './axiosInstance';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * API服务类
 * 封装RESTful API调用，支持请求取消、重试等功能
 */
class ApiService {
  private cancelTokenSources: Map<string, { cancel: (message?: string) => void; token: any }> = new Map();

  /**
   * 生成请求ID
   * @param url 请求URL
   * @param method 请求方法
   * @returns 请求ID
   */
  private generateRequestId(url: string, method: string): string {
    return `${method.toUpperCase()}:${url}`;
  }

  /**
   * 取消请求
   * @param url 请求URL
   * @param method 请求方法
   */
  cancelRequest(url: string, method: string = 'GET'): void {
    const requestId = this.generateRequestId(url, method);
    const source = this.cancelTokenSources.get(requestId);
    if (source) {
      source.cancel('Request cancelled by user');
      this.cancelTokenSources.delete(requestId);
    }
  }

  /**
   * 取消所有请求
   */
  cancelAllRequests(): void {
    this.cancelTokenSources.forEach((source) => {
      source.cancel('All requests cancelled');
    });
    this.cancelTokenSources.clear();
  }

  /**
   * 带重试机制的请求
   * @param config 请求配置
   * @param retryCount 重试次数
   * @param retryDelay 重试延迟(ms)
   * @returns Promise<any>
   */
  private async requestWithRetry<T = any>(
    config: AxiosRequestConfig,
    retryCount: number = 3,
    retryDelay: number = 1000
  ): Promise<T> {
    try {
      return await axiosInstance(config) as T;
    } catch (error: unknown) {
      const axiosError = error as any;
      if (retryCount > 0 && axiosError.code !== 'ECONNABORTED' && !axiosError.response) {
        // 只有网络错误才重试
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestWithRetry<T>(config, retryCount - 1, retryDelay * 2);
      }
      throw error;
    }
  }

  /**
   * GET请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise<any>
   */
  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const requestId = this.generateRequestId(url, 'GET');
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    try {
      const response = await this.requestWithRetry({
        ...config,
        url,
        method: 'GET',
        cancelToken: source.token,
      });

      this.cancelTokenSources.delete(requestId);
      return response as T;
    } catch (error: unknown) {
      this.cancelTokenSources.delete(requestId);
      throw error;
    }
  }

  /**
   * POST请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<any>
   */
  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const requestId = this.generateRequestId(url, 'POST');
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    try {
      const response = await this.requestWithRetry({
        ...config,
        url,
        method: 'POST',
        data,
        cancelToken: source.token,
      });

      this.cancelTokenSources.delete(requestId);
      return response as T;
    } catch (error: unknown) {
      this.cancelTokenSources.delete(requestId);
      throw error;
    }
  }

  /**
   * PUT请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<any>
   */
  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const requestId = this.generateRequestId(url, 'PUT');
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    try {
      const response = await this.requestWithRetry({
        ...config,
        url,
        method: 'PUT',
        data,
        cancelToken: source.token,
      });

      this.cancelTokenSources.delete(requestId);
      return response as T;
    } catch (error: unknown) {
      this.cancelTokenSources.delete(requestId);
      throw error;
    }
  }

  /**
   * DELETE请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise<any>
   */
  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const requestId = this.generateRequestId(url, 'DELETE');
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    try {
      const response = await this.requestWithRetry({
        ...config,
        url,
        method: 'DELETE',
        cancelToken: source.token,
      });

      this.cancelTokenSources.delete(requestId);
      return response as T;
    } catch (error: unknown) {
      this.cancelTokenSources.delete(requestId);
      throw error;
    }
  }

  /**
   * PATCH请求
   * @param url 请求URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<any>
   */
  async patch<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const requestId = this.generateRequestId(url, 'PATCH');
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    try {
      const response = await this.requestWithRetry({
        ...config,
        url,
        method: 'PATCH',
        data,
        cancelToken: source.token,
      });

      this.cancelTokenSources.delete(requestId);
      return response as T;
    } catch (error: unknown) {
      this.cancelTokenSources.delete(requestId);
      throw error;
    }
  }
}

// 导出API服务实例
export const apiService = new ApiService();
