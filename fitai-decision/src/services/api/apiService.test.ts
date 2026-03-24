import { apiService } from './apiService';
import { axiosInstance } from './axiosInstance';
import axios from 'axios';

// 模拟axiosInstance
jest.mock('./axiosInstance', () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    CancelToken: {
      source: jest.fn(() => ({
        token: 'cancel-token',
        cancel: jest.fn(),
      })),
    },
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('get方法应该调用axiosInstance.get', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const response = await apiService.get('/test');

    expect(mockAxiosInstance.get).toHaveBeenCalledWith({
      url: '/test',
      method: 'GET',
      cancelToken: 'cancel-token',
    });
    expect(response).toEqual(mockResponse);
  });

  test('post方法应该调用axiosInstance.post', async () => {
    const mockData = { name: 'Test' };
    const mockResponse = { data: { id: 1, ...mockData } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const response = await apiService.post('/test', mockData);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith({
      url: '/test',
      method: 'POST',
      data: mockData,
      cancelToken: 'cancel-token',
    });
    expect(response).toEqual(mockResponse);
  });

  test('put方法应该调用axiosInstance.put', async () => {
    const mockData = { name: 'Updated Test' };
    const mockResponse = { data: { id: 1, ...mockData } };
    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const response = await apiService.put('/test/1', mockData);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith({
      url: '/test/1',
      method: 'PUT',
      data: mockData,
      cancelToken: 'cancel-token',
    });
    expect(response).toEqual(mockResponse);
  });

  test('delete方法应该调用axiosInstance.delete', async () => {
    const mockResponse = { data: { success: true } };
    mockAxiosInstance.delete.mockResolvedValue(mockResponse);

    const response = await apiService.delete('/test/1');

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith({
      url: '/test/1',
      method: 'DELETE',
      cancelToken: 'cancel-token',
    });
    expect(response).toEqual(mockResponse);
  });

  test('patch方法应该调用axiosInstance.patch', async () => {
    const mockData = { name: 'Patched Test' };
    const mockResponse = { data: { id: 1, ...mockData } };
    mockAxiosInstance.patch.mockResolvedValue(mockResponse);

    const response = await apiService.patch('/test/1', mockData);

    expect(mockAxiosInstance.patch).toHaveBeenCalledWith({
      url: '/test/1',
      method: 'PATCH',
      data: mockData,
      cancelToken: 'cancel-token',
    });
    expect(response).toEqual(mockResponse);
  });

  test('cancelRequest方法应该取消指定请求', () => {
    const mockCancel = jest.fn();
    (axios.CancelToken.source as jest.Mock).mockReturnValue({
      token: 'cancel-token',
      cancel: mockCancel,
    });

    // 先发起一个请求
    apiService.get('/test');
    // 取消请求
    apiService.cancelRequest('/test');

    expect(mockCancel).toHaveBeenCalledWith('Request cancelled by user');
  });

  test('cancelAllRequests方法应该取消所有请求', () => {
    const mockCancel1 = jest.fn();
    const mockCancel2 = jest.fn();

    (axios.CancelToken.source as jest.Mock)
      .mockReturnValueOnce({ token: 'cancel-token-1', cancel: mockCancel1 })
      .mockReturnValueOnce({ token: 'cancel-token-2', cancel: mockCancel2 });

    // 发起两个请求
    apiService.get('/test1');
    apiService.get('/test2');
    // 取消所有请求
    apiService.cancelAllRequests();

    expect(mockCancel1).toHaveBeenCalledWith('All requests cancelled');
    expect(mockCancel2).toHaveBeenCalledWith('All requests cancelled');
  });
});
