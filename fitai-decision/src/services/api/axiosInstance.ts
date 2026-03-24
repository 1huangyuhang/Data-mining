import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

/**
 * 自定义Axios实例配置
 */
interface CustomAxiosConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
  cancelToken?: any;
}

/**
 * 创建并配置Axios实例
 * @returns 配置好的Axios实例
 */
export const createAxiosInstance = (): AxiosInstance => {
  // 创建Axios实例
  const instance = axios.create({
    baseURL:
      (import.meta as any).env?.VITE_API_BASE_URL ||
      'http://localhost:8080/api',
    timeout: 10000, // 默认10秒超时
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 可以在这里添加认证token等
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // 捕获请求配置错误
      console.error('请求配置错误:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 统一处理响应数据
      return response.data;
    },
    (error: AxiosError) => {
      // 统一处理错误
      if (error.response) {
        // 服务器返回错误状态码
        switch (error.response.status) {
          case 401:
            // 未授权，可能需要重新登录
            console.error('未授权，请重新登录');
            break;
          case 403:
            // 禁止访问
            console.error('禁止访问');
            break;
          case 404:
            // 资源不存在
            console.error('请求的资源不存在');
            break;
          case 500:
            // 服务器错误
            console.error('服务器内部错误');
            break;
          default:
            console.error(`请求失败: ${error.response.status}`);
        }
      } else if (error.request) {
        // 请求已发送但没有收到响应
        console.error('网络错误，未收到响应');
      } else {
        // 请求配置出错
        console.error('请求配置错误:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// 导出配置好的Axios实例
export const axiosInstance = createAxiosInstance();
